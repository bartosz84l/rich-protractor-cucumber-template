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