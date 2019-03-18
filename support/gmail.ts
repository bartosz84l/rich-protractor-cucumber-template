const { google } = require('googleapis');
import * as fs from "fs";
import * as readline  from 'readline';


class GmailClient {

    oAuth2Client
    constructor(credentials, token) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.oAuth2Client.setCredentials(token);
    }
    listMessages() {
        return new Promise((resolve, reject) => {
            const gmail = google.gmail({ version: 'v1', auth: this.oAuth2Client });
            gmail.users.messages.list({
                userId: 'me',
            }, (err, res) => {
                if (err) return reject('The API returned an error: ' + err);
                resolve(res.data.messages);
            }
            )
        });
    }

    getMessage(id) {
        return new Promise((resolve, reject) => {
            const gmail = google.gmail({ version: 'v1', auth: this.oAuth2Client });
            gmail.users.messages.get({
                userId: 'me', id
            }, (err, res) => {
                if (err) return reject('The API returned an error: ' + err);
                resolve(res.data);
            });
        });
    }

    deleteMessage(id) {
        return new Promise((resolve, reject) => {
            const gmail = google.gmail({ version: 'v1', auth: this.oAuth2Client });
            gmail.users.messages.delete({
                userId: 'me', id
            }, (err, res) => {
                if (err) return reject('The API returned an error: ' + err);
                resolve(res.data);
            });
        });
    }

    deleteLastMessage() {
        return this.listMessages().then((messages) => {
            return this.deleteMessage(messages[0].id)
        })
    }
}

export { GmailClient }

// If modifying these scopes, delete token.json.
const SCOPES = ['https://mail.google.com/'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = process.argv[3];

// Load client secrets from a local file.
fs.readFile(process.argv[2], (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content.toString('utf8')), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token.toString('utf8')));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  return new Promise((resolve, reject) => {
    const gmail = google.gmail({ version: 'v1', auth: auth });
    gmail.users.messages.list({
      userId: 'me',
    }, (err, res) => {
      if (err) return reject('The API returned an error: ' + err);
      resolve(res.data.messages);
    }
    )
  });
};

