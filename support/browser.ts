import { browser, ExpectedConditions, element } from 'protractor';
import { CustomWait } from "../support/wait";
import { logThisMethod } from "../support/logging-decorator"
import { logger } from './logger'
import { testConfig } from "../config/test-config";

class BrowserActions {

    static MEDIUM_TIMEOUT = 10000;
    static SLOW_DOWN = 500;

    @logThisMethod
    public static async get(url) {
        await browser.get(testConfig.baseUrl + url);
        await browser.wait(browser.ExpectedConditions.urlContains(url), this.MEDIUM_TIMEOUT);
    }

    @logThisMethod
    public static async switchTo(element) {
        await browser.switchTo().frame(element.getWebElement());
    };

    @logThisMethod
    public static async switchToDefault() {
        await browser.switchTo().defaultContent();
    };

    @logThisMethod
    public static async switchToTab(tabIdx: number) {
        var handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[tabIdx]);
        await CustomWait.waitForNewHandlerToLoad(this.SLOW_DOWN);
    };

    @logThisMethod
    public static async scrollBottom(element) {
        await browser.executeScript("var p = arguments[0]; p.scrollTop=p.scrollHeights;", element);
    };

    @logThisMethod
    public static async closeTab() {
        await browser.manage().deleteAllCookies();
        await browser.close();
    };

    @logThisMethod
    public static async refreshPage() {
        await browser.sleep(5000);
        await browser.refresh();
    };

    @logThisMethod
    public static async clearBrowserData() {
        await browser.manage().deleteAllCookies();
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
    }

    @logThisMethod
    public static async getConsoleErrors() {
        let caps = await browser.driver.getCapabilities();
        var browserName = caps.get('browserName');
        if (browserName !== 'internet explorer' && browserName !== 'MicrosoftEdge' && browserName !== 'safari') {
            let browserLog = await browser.manage().logs().get('browser');
            browserLog = browserLog.filter(log => log.level.value > 900);
            browserLog.forEach(log => logger.error('ERROR: ', log.message));
            if (browserLog.length > 0) {
                throw Error(`There are ${browserLog.length} errors in the Chrome console`);
            }
        }
    }

}

export { BrowserActions };