import { When, Then } from "cucumber";
import { Goolge } from "../pages/app/google";
import { Actions } from "../support/actions";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const googlePage: Goolge = new Goolge();

/**
 * DO NOT USE ARROW FUNCTIONS FOR STEP DEFINITION - TO MAKE "THIS" THE RIGHT "THIS"
 */

When(/^I enter "([^"]+)" phrase$/, async function (phrase: string) {
    await Actions.attachScreenshot(this);
    await googlePage.search(phrase);
});

Then(/^I should see "([^"]+)" page in the (.+) row of the results$/, async function(expectedPhrase, resultRowIdx) {
    await Actions.attachScreenshot(this);
    expect(await googlePage.getResult(resultRowIdx)).to.contain(expectedPhrase);
});