const {  Status, After, Before } = require("cucumber");

import { browser } from "protractor";
import { testConfig } from "../config/test-config";
import { Actions } from "./actions";
import { BrowserActions } from "./browser";

var { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(99999 * 1000);

Before(async function (scenario) {
    await BrowserActions.get(testConfig.baseUrl);
    await Actions.attachScreenshot(this);
    await Actions.log(`Loaded ${testConfig.baseUrl}`);

});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        await Actions.attachScreenshot(this);
    }
    await browser.manage().deleteAllCookies();
    await browser.executeScript('window.sessionStorage.clear();');
    await browser.executeScript('window.localStorage.clear();');
});
