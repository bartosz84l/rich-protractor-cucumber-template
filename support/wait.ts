import { browser, ExpectedConditions, ElementFinder } from 'protractor';

class CustomWait {

    public static async waitForTextInElement(element, text: string, ms: number) {
        await browser.wait(browser.ExpectedConditions.textToBePresentInElement(element, text), ms);
    };

    public static async waitForNewHandlerToLoad(ms: number) {
        await browser.sleep(ms);
    };

    public static async waitForLoad(ms: number) {
        await browser.sleep(ms);
    };
    public static async waitForEmail(ms: number) {
        await browser.sleep(ms);
    };

    public static async waitForInvisibility(element, ms: number) {
        await browser.wait(browser.ExpectedConditions.invisibilityOf(element), ms);
    };

    public static async waitForAttributeToContain(item: ElementFinder, attribute: string) {
       return await browser.wait(async function() {
            return await item.getAttribute(attribute);
        }, 5000);
    };
}

export { CustomWait };