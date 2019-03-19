const { google } = require('googleapis');

const currentCredentials = {
  "installed": {
    "client_id": "219972998567-7c2uu2lik1n8qifjbo9l254ner3a249u.apps.googleusercontent.com",
    "project_id": "quickstart-1550221378572",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "69_B9ozoLYi3bvCB3qFiL9sD",
    "redirect_uris": [
      "urn:ietf:wg:oauth:2.0:oob",
      "http://localhost"
    ]
  }
}

var currentToken = {
  "access_token": "ya29.Glu0BqgPlA_3cWoqwwmTkSZIy_TDx3ovO9OX8pKDfs3biV7R0KgImqnGn2vANIE_9JBtO6jEm0kvsZsdPf-I4TWpTD-xAYTr77VnbZJmTj7PC4Sus7QKyAmSeo_f",
  "refresh_token": "1/tQbss3Bv6L-IJJTrI2t8hiePk5pLfpMEUNzjN9p4ocHnkX1bG-eOkG80Uk0PtQ78",
  "scope": "https://mail.google.com/",
  "token_type": "Bearer",
  "expiry_date": 1550484644738
}

class SampleClient {

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

export { SampleClient, currentCredentials, currentToken }
