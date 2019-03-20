import { When, Then } from "cucumber";
import { Google } from "../pages/app/google";
import { Actions } from "../support/actions";
import { ImageCompare } from "../support/imageCompare";
import { $ } from "protractor";

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const googlePage: Google = new Google();
const imageCompare: ImageCompare = new ImageCompare();

When(/^I enter "([^"]+)" phrase$/, async function (phrase: string) {
    await Actions.attachScreenshot(this);
    await googlePage.search(phrase);
});

Then(/^I should see "([^"]+)" page in the (.+) row of the results$/, async function(expectedPhrase, resultRowIdx) {
    await Actions.attachScreenshot(this);
    expect(await googlePage.getResult(resultRowIdx)).to.contain(expectedPhrase);
});

Then(/^We should get a Google page$/, async function () {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkFullPageScreen('googlePage')).to.equal(0);
})

Then(/^We should see a Google search field$/, async function () {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkElement($('div.RNNXgb'), 'googleSearch')).to.equal(0);
})

Then(/^We should get a TestArmy header on Google page$/, async function () {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkElement($('div.kp-header'), 'testArmyHeaderGoogle')).to.equal(0);
})

Then(/^This should be fail$/, async function () {
    await Actions.attachScreenshot(this);
    expect(await imageCompare.checkElement($('#hplogo'), 'googleLogoFail')).to.not.equal(0); // To make it failing just remove "not"
})