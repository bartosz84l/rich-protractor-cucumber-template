import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

class Actions {

    static MEDIUM_TIMEOUT = 15000;
    static SLOW_DOWN = 500;
    static FILE_DOWNLOAD_TIMEOUT = 5000;

    public static async waitForUrl(url) {
        debugger;
        browser.ignoreSynchronization = true;
        await browser.waitForAngularEnabled(false);
        await browser.get(url);
        
        debugger;
        await browser.wait(browser.ExpectedConditions.urlContains(url), 5000);
    }

    public static async attachScreenshot(t) {
        const screenShot = await browser.takeScreenshot();
        t.attach(screenShot, "image/png");
    }

    public static attachComment(t, comment) {
        t.attach(comment);
    }

    public static async waitToClick(element, ms: number) {
        await browser.wait(browser.ExpectedConditions.elementToBeClickable(element), ms);
    };

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

        await browser.wait(browser.ExpectedConditions.visibilityOf(element), this.MEDIUM_TIMEOUT, "Waiting for: " + element.locator() + " fails");
        await this.highlightElement(element);
        await browser.wait(safeClick(element), this.MEDIUM_TIMEOUT, "Timeout in safeClick");
    };

    public static async dragAndDrop(element: any, horizontalOffset: number) {
        await browser.wait(browser.ExpectedConditions.visibilityOf(element), this.MEDIUM_TIMEOUT);
        await this.highlightElement(element);
        await browser.actions().mouseMove(element).perform();
        await browser.actions().mouseDown(element).perform();
        await browser.sleep(700);
        await browser.actions().mouseMove({ x: horizontalOffset, y: 0 }).perform();
        await browser.actions().mouseUp(element).perform();

    }

    public static async clickRelativeToLeftEdge(element: any, horizontalOffsetPercent: number) {
        await browser.wait(browser.ExpectedConditions.visibilityOf(element), this.MEDIUM_TIMEOUT);
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

    public static async downloadImage(element) {
        await this.click(element);
        await browser.sleep(this.FILE_DOWNLOAD_TIMEOUT);
    };

    public static async waitToBeVisible(element, ms: number) {
        await browser.wait(browser.ExpectedConditions.visibilityOf(element), ms);
    };

    public static async sendKeys(element, text: string) {
        await this.waitToBeVisible(element, this.MEDIUM_TIMEOUT);
        await element.sendKeys(text);
    };

    public static async clearTextArea(element) {
        await this.click(element);
        await element.clear();
    };

    public static async getFilteredElement(elements, name) {
        return await elements.filter(async function (element) {
            return await element.getText() === name;
        }).get(0);
    };

    public static async getElementWidth(element: any) {
        const size = await element.getSize();
        return size.width;
    }
    public static async getDesiredSocialAccount(name) {
        return await this.click(element(by.xpath(`//div[@id="add-account-widget"]//div[@data-title='${name}']`)));
    };
}

export { Actions };