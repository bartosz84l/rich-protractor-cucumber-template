const { Status, After, Before } = require("cucumber");

import { testConfig } from "../data/test-config";
import { Actions } from "./actions";
import { BrowserActions } from "./browser";

var { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(99999 * 1000);

Before(async function () {
    await BrowserActions.get(testConfig.baseUrl);
    await Actions.attachScreenshot(this);
});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        await Actions.attachScreenshot(this);
    }
});
