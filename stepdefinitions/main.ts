import { When, Then, Given } from "cucumber";
import { Goolge } from "../pages/app/google";
import { Actions } from "../support/actions";
import { Create } from "../pages/app/create";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const googlePage: Goolge = new Goolge();


When(/^I enter "([^"]+)" phrase$/, async function (phrase: string) {
    await Actions.attachScreenshot(this);
    await googlePage.search(phrase);
});

Then(/^I should see "([^"]+)" page in the (.+) row of the results$/, async function(expectedPhrase, resultRowIdx) {
    await Actions.attachScreenshot(this);
    expect(await googlePage.getResult(resultRowIdx)).to.contain(expectedPhrase);
});

Given(/user visits sign up page/, async function (){
    let create: Create = new Create();
    create.fillCreateAccountForm('sample', 'samle', 'sample', 'sample')
})