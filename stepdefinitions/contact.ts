import { Given, When, Then } from "cucumber";
import { ContactPage } from "../pages/app/contactPage";


const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const contact: ContactPage = new ContactPage();


Given(/^User is on a contact page$/, async function () {
    await contact.open();
});

When(/^User fills out all the relevant fields ([^"]+), (.+), (.+) and click submit button$/, async function (name: string, email: string, msg: string) {
    await contact.fillForm(name, email, msg);
});

Then(/^After user should see the message$/, async function () {
    expect(await contact.getMessageAfterSubmit()).to.contain('Your message has been sent.');
});

