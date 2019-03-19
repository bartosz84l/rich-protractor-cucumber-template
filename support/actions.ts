import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';
import { logger } from './logger'
import { logThisMethod } from './logging-decorator';

class Actions {

    static MEDIUM_TIMEOUT = 15000;
    static SLOW_DOWN = 500;
    static FILE_DOWNLOAD_TIMEOUT = 20000;

    @logThisMethod
    public static async waitForUrl(url) {
        debugger;
        browser.ignoreSynchronization = true;
        await browser.waitForAngularEnabled(false);
        await browser.get(url);

        debugger;
        await browser.wait(browser.ExpectedConditions.urlContains(url), 5000);
    }

    public static log(...message: any[]) {
        logger.debug(message)
    };


    public static async attachScreenshot(world) {
        const screenShot = await browser.takeScreenshot();
        world.attach(screenShot, "image/png");
    }

    public static attachComment(world, comment) {
        world.attach(comment);
    }

    @logThisMethod
    public static async waitToClick(element, ms: number) {
        await browser.wait(browser.ExpectedConditions.elementToBeClickable(element), ms);
    };


    @logThisMethod
    public static async dragAndDrop(element: any, horizontalOffset: number) {
        await this.waitToBeVisible(element, this.MEDIUM_TIMEOUT);
        await this.highlightElement(element);
        await browser.actions().mouseMove(element).perform();
        await browser.actions().mouseDown(element).perform();
        await browser.sleep(700);
        await browser.actions().mouseMove({ x: horizontalOffset, y: 0 }).perform();
        await browser.actions().mouseUp(element).perform();

    }

    @logThisMethod
    public static async clickRelativeToLeftEdge(element: any, horizontalOffsetPercent: number) {
        await this.waitToBeVisible(element, this.MEDIUM_TIMEOUT);
        await this.highlightElement(element);
        const elementWidth = await this.getElementWidth(element);
        console.log(elementWidth);
        const pixelPositionToClick = (elementWidth * horizontalOffsetPercent) / 100
        console.log(pixelPositionToClick);
        await browser.actions().mouseMove(element).perform();
        await browser.actions().mouseMove(element, { x: Math.round(pixelPositionToClick), y: 0 }).perform();
        await browser.actions().click().perform();
    }

    public static async highlightElement(element) {
        await browser.executeScript("arguments[0].style.border='3px solid #FFA500'", element);
    }

    @logThisMethod
    public static async downloadImage(element) {
        await this.click(element);
        await browser.sleep(this.FILE_DOWNLOAD_TIMEOUT);
    };

    @logThisMethod
    public static async waitToBeVisible(element, ms: number) {
        try {
            await browser.wait(browser.ExpectedConditions.visibilityOf(element), ms);
        } catch (error) {
            throw new Error(`Failed while waiting ${ms}ms for element ${element}`)
        }
    };

    @logThisMethod
    public static async sendKeys(element: ElementFinder, text: string) {
        await this.waitToBeVisible(element, this.MEDIUM_TIMEOUT);
        await element.sendKeys(text);
    };

    @logThisMethod
    public static async clickAndWait(element: ElementFinder, timeout: number) {

        var safeClick = (el) => {
            return el.click()
                .then(() => {
                    return true
                },
                    function () {
                        return false
                    }
                );
        };

        await this.waitToBeVisible(element, timeout);
        await this.highlightElement(element);
        await browser.wait(safeClick(element), timeout, "Timeout in safeClick");
    };


    @logThisMethod
    public static async click(element: ElementFinder) {

        var safeClick = (el) => {
            return el.click()
                .then(() => {
                    return true
                },
                    function () {
                        return false
                    }
                );
        };

        await this.waitToBeVisible(element, this.MEDIUM_TIMEOUT);
        await this.highlightElement(element);
        await browser.wait(safeClick(element), this.MEDIUM_TIMEOUT, "Timeout in safeClick");
    };

    @logThisMethod
    public static async clearTextArea(element) {
        await this.click(element);
        await element.clear();
    };

    @logThisMethod
    public static async getElementByText(elements, name) {
        return await elements.filter(async function (element) {
            return await element.getText() === name;
        }).get(0);
    };

    @logThisMethod
    public static async getElementWidth(element: any) {
        const size = await element.getSize();
        return size.width;
    }

    @logThisMethod
    public static async getDesiredSocialAccount(name) {
        return await this.click(element(by.xpath(`//div[@id="add-account-widget"]//div[@data-title='${name}']`)));
    };
}

export { Actions };