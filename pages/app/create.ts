import { $, ElementFinder } from "protractor";
import { Actions } from "../../support/actions";
import { BrowserActions } from "../../support/browser";

export class Create {

    private firstName: ElementFinder;
    private lastName: ElementFinder;
    private companyName: ElementFinder;
    private email: ElementFinder;
    private submit: ElementFinder;

    constructor() {
        this.firstName = $('input[name="firstName"]');
        this.lastName = $('input[name="lastName"]');
        this.companyName = $('input[name="companyName"]');
        this.email = $('input[name="email"]');
        this.submit = $('button[type="submit"]')
    }

    navigateTo() {
        return BrowserActions.get('/#/login/create');
    }

    fillCreateAccountForm(firstName: string, lastName: string, companyName: string, email: string) {
        Actions.sendKeys(this.firstName, firstName);
        Actions.sendKeys(this.lastName, lastName);
        Actions.sendKeys(this.companyName, companyName);
        Actions.sendKeys(this.email, email);
        Actions.click(this.submit);
    }
}