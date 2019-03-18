import { $, ElementFinder } from "protractor";
import { BrowserActions } from "../../support/browser";


export class IframePage {
    
    public contentPage: ElementFinder;
    
    constructor() {
        this.contentPage = $('.page-content');
    };

    async switchToIframe() {
        await BrowserActions.switchTo(this.contentPage);  
    };

    async switchOffIframe () {
        await BrowserActions.switchToDefault();
    };
}
