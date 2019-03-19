import { browser, ElementFinder } from "protractor";
import { logThisMethod } from "./logging-decorator";

export class ImageCompare {

    @logThisMethod
    async checkScreen(screen: String) {
        return await browser.protractorImageComparison.checkScreen(screen);
    }

    @logThisMethod
    async checkElement(el: ElementFinder, name: String) {
        return await browser.protractorImageComparison.checkElement(el, name);
    }

    @logThisMethod
    async checkFullPageScreen(name: String) {
        return await browser.protractorImageComparison.checkFullPageScreen(name);
    }

    @logThisMethod
    async saveScreen(screen: String) {
        return await browser.protractorImageComparison.saveScreen(screen);
    }

    @logThisMethod
    async saveElement(el: ElementFinder, name: String) {
        return await browser.protractorImageComparison.saveElement(el, name);
    }

    @logThisMethod
    async saveFullPageScreen(name: String) {
        return await browser.protractorImageComparison.saveFullPageScreen(name);
    }
    
}