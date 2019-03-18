import { browser, ExpectedConditions, element } from 'protractor';
import { CustomWait } from "../support/wait";
import { Actions } from './actions';

class BrowserActions {

    static MEDIUM_TIMEOUT = 10000;
    static SLOW_DOWN = 500;

    public static async switchTo(element) {
        await browser.switchTo().frame(element.getWebElement());
    };

    public static async switchToDefault() {
        await browser.switchTo().defaultContent();
    };

    public static async switchToTab(tabIdx: number) {
        var handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[tabIdx]);
        await CustomWait.waitForNewHandlerToLoad(this.SLOW_DOWN);
    };

    public static async scrollBottom(element) {
        await browser.executeScript("var p = arguments[0]; p.scrollTop=p.scrollHeights;", element);
    };

    public static async dragAndDrop(element) {
        await Actions.click(element);
        await browser.actions().dragAndDrop(element, {x:200, y:0}).perform();
    };

    public static async slide(element) {
        await browser.actions().dragAndDrop(element, {x:50, y:0}).perform();
    };

    public static async closeTab() {
        await browser.manage().deleteAllCookies();
        await browser.close();
    };

    public static async refreshPage() {
        await browser.sleep(5000);
        await browser.refresh();
    };

    public static async get(url) {
        await browser.get(url);
    };

}

export { BrowserActions };