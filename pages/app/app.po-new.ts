import {browser, by, element, protractor} from 'protractor';
import {resolve} from 'path';


export const RANDOM_NUMBER = Math.floor(Math.random() * 100000000000000000).toString();

export const TEST_EMAIL = `e2e_test_email_${RANDOM_NUMBER}@test.io`;
export const FIRST_NAME = 'joel';
export const LAST_NAME = 'goldberger';
export const COMPANY_NAME = 'Nadam Corp.';
export const COMPANY_LEGAL_NAME = `test_e2e_legal_${RANDOM_NUMBER}`;
export const PHONE_NUMBER = '777777777';
export const CHANGED_PHONE_NUMBER = '777777778';
export const ADRESS = 'test_adress';
export const CHANGED_ADRESS = 'test_adress_changed';
export const CITY = 'New York';
export const STATE = 'Alabama';
export const POSTAL_CODE = '10001';
export const TAX_ID = '104804123';
export const EIN = '813788075';
export const PASSWORD = 'Password1';
export const ROUNTING_NUM = '211274450';
export const ACCOUNT_NUM = '1111111111111111111111';
export const CHANGED_ACCOUNT_NUM = '1111111111111111111112';
export const BASE_URL = 'https://test-supplier.payability.com/';
export const TWO_STEP_CODE = '1234567'
export const DATE = '12/12/2012'

let path = './e2e/img/test.png';
path = resolve(path);
const EC = protractor.ExpectedConditions;
var platform;

browser.driver.getCapabilities().then(function(caps){
    platform = caps.get('platform');
});

export class SupplierClient {
    navigateTo() {
        return browser.get('/');
    }

    clickSubmit() {
        element.all(by.css('button[type="submit"]')).first().click();
    }

    clickSave() {
        element(by.cssContainingText('button.btn-success', 'SAVE')).click();
    }

    isMobile()
    {
        platform = platform.toLowerCase();
        if(platform == 'android' || platform == 'ios') return true;
        else return false;
    }

    getHeader(headerName) {
        expect(element(by.css('div.main-header')).getText()).toContain(headerName);
    }

    getFinalHeader() {
        expect(element(by.css('div.final-header')).getText()).toContain('Thanks for signing up for Payability!');
    }

    // LOGIN
    login() {
        element(by.css('input[name="email"]')).sendKeys(TEST_EMAIL);
        element(by.css('input[name="password"]')).sendKeys(PASSWORD);
        element.all(by.css('button[type="submit"]')).first().click();
    }

    // LOGOUT
    logout() {
        element(by.css('.current-session-menu .dropdown.open-on-click a.session-menu-toggle')).click();
        browser.sleep(1500);
        element(by.cssContainingText('li a', 'Logout')).click();
    }

    getLoginButtonText() {
        return element(by.css('div.form-group>p>a[href="#/login/reset-password"]')).getText();
    }

    //CHANGE PASSWORD
    changePassword() {
        element(by.css('.current-session-menu .dropdown.open-on-click a.session-menu-toggle')).click();
        browser.sleep(1500);
        element(by.cssContainingText('li a', 'Change Password')).click();
        this.getHeader('Create Password');
        element(by.css('input[name="old_password"]')).sendKeys(PASSWORD);
        element(by.css('input[name="new_password"]')).sendKeys(PASSWORD);
        this.clickSubmit();
    }

    // CREATE ACCOUNT
    goToCreateAccount() {
        element.all(by.cssContainingText('.text-left a', 'Sign-up')).first().click();
    }

    fillCreateAccountForm() {
        element(by.css('input[name="firstName"]')).sendKeys(FIRST_NAME);
        element(by.css('input[name="lastName"]')).sendKeys(LAST_NAME);
        element(by.css('input[name="companyName"]')).sendKeys(COMPANY_NAME);
        element(by.css('input[name="email"]')).sendKeys(TEST_EMAIL);
        this.clickSubmit();
    }

    fillYourInformationForm() {
        element.all(by.css('input[name="phoneNumber"]')).first().sendKeys(PHONE_NUMBER);
        element.all(by.css('#dateOfBirth')).first().sendKeys(DATE);
        element.all(by.css('#taxId')).first().sendKeys(TAX_ID)
    }

    fillBusinessAddress() {
        element.all(by.css('input[name="address.addr1"]')).first().sendKeys(ADRESS);
        element.all(by.css('input[name="address.city"]')).first().sendKeys(CITY);
        element.all(by.css('select[name="address.state"]')).first().click();
        element.all(by.cssContainingText('option', 'Alaska')).first().click();
        element.all(by.css('#zipCodeTesting')).first().sendKeys(POSTAL_CODE);
    }

    fillBusinessInformation() {
        element.all(by.css('#businessTypeCodeTest')).first().click();
        element.all(by.cssContainingText('option', 'Corporation')).first().click();;
        element.all(by.css('#businessStartDateTest')).first().sendKeys(DATE);
        element.all(by.css('select[name="stateOfIncorporation"]')).first().click();
        element.all(by.css('select[name="stateOfIncorporation"] option[label="Alaska"]')).first().click();
        element.all(by.css('input[name="taxId"]')).first().sendKeys(EIN);
        element.all(by.cssContainingText('button.btn-success', 'NEXT')).first().click();
    }

    fillAdditionalOwnerForm(suffix) {
        element(by.css('input[name="firstName"]')).sendKeys(FIRST_NAME);
        element(by.css('input[name="lastName"]')).sendKeys(LAST_NAME);
        element(by.css('input[name="emailAddress"]')).sendKeys(TEST_EMAIL + suffix);
        element(by.css('input[name="phoneNumber"]')).sendKeys(PHONE_NUMBER);
        element(by.css('input[name="address"]')).sendKeys(ADRESS + suffix);
        element(by.css('select[id="country"]')).click();
        element.all(by.css('option[label="United States"]')).first().click();
        element(by.css('input[name="city"]')).sendKeys(CITY + suffix);
        element(by.css('select[name="stateCode"]')).click();
        element(by.css('option[label="Alaska"]')).click();
        element(by.css('input[name="zipPostalCode"]')).sendKeys(POSTAL_CODE);
        element(by.css('input[name="SSN"]')).sendKeys(TAX_ID)
        element(by.css('input[name="dateOfBirth"]')).sendKeys(DATE);
    }

    setPassword() {
        element(by.css('input[name="new_password"]')).sendKeys(PASSWORD);
        this.clickSubmit();
    }

    // setAccountDetails() {
    //     element(by.css('input[name="phoneNumber"]')).sendKeys(PHONE_NUMBER);
    //     element(by.css('input[name="address.addr1"]')).sendKeys(ADRESS);
    //     element.all(by.css('input[name="address.city"]')).first().sendKeys(CITY);
    //     element.all(by.css('select[name="address.state"]')).first().click();
    //     element.all(by.css('option[label="New York"]')).first().click();
    //     element.all(by.css('input[name="address.postalCode"]')).first().sendKeys(POSTAL_CODE);
    //     element(by.cssContainingText('.view-controls button', 'CONTINUE')).click();
    // }

    // addMarketplace() {
    //     browser.sleep(1500);
    //     element(by.css('select[name="estimatedMonthlyRevenue"]')).click();
    //     element(by.css('option[label="Between $2,000 and $10,000 per month"]')).click();
    //     element(by.css('select[name="lengthTimeSelling"]')).click();
    //     element(by.css('option[label="Between 90 days and 1 year"]')).click();
    //     element(by.cssContainingText('.view-controls button', 'ADD')).click();
    //     browser.waitForAngular();
    // }

    // verifyInfo() {
    //     element(by.css('select[name="businessTypeCode"]')).click();
    //     element(by.css('option[label="Limited Liability Company"]')).click();
    //     element(by.css('input[name="legalName"]')).clear();
    //     element(by.css('input[name="legalName"]')).sendKeys(COMPANY_LEGAL_NAME);
    //     element(by.css('label[for="incorporated-yes"]')).click();
    //     element(by.css('select[name="stateOfIncorporation"]')).click();
    //     element(by.css('option[label="New York"]')).click();
    //     element(by.css('input[name="taxId"]')).clear();
    //     element(by.css('input[name="taxId"]')).sendKeys(TAX_ID);
    // }

    //CLICK THROUGH DOCUSIGN
    async passDocuSign(instantAdvance = false) {
        var thisElement = this;
        await browser.sleep(3000);
        await browser.wait(EC.visibilityOf(element.all(by.css('svg.tab-image.tab-image-for-initials')).first()), 30000);
        await element.all(by.css('svg.tab-image.tab-image-for-initials')).each(function (initialSign, index)
        {
            initialSign.click();
            browser.sleep(3000);

            if(!instantAdvance && index == 0)
            {
                browser.wait(EC.visibilityOf(thisElement.getFirstVisibleProtractorElement('.footer button[data-group-item="initials"]')), 30000);
                thisElement.getFirstVisibleProtractorElement('.footer button[data-group-item="initials"]').click();
                browser.sleep(3000);
            }
        });

        await browser.wait(EC.visibilityOf(element.all(by.css('svg.tab-image.tab-image-for-signature')).first()), 30000);
        await element.all(by.css('svg.tab-image.tab-image-for-signature')).each(function (signature, index)
        {
            signature.click();
            browser.sleep(3000);
        });
        await browser.sleep(3000);

        return element(by.css('button[id="action-bar-btn-finish"]')).click();
    }

    async uploadFile() {
        browser.sleep(1000);
        const e = element(by.css('input[id="file-upload-input"]'));
        browser.sleep(1000);
        browser.setFileDetector(new FileDetector());
        browser.sleep(1000);
        e.sendKeys(path);
        browser.sleep(3000);
    }

    // addPaymentSettings() {
    //     element(by.css('select[id="selectedCountry"]')).click();
    //     element.all(by.css('option[label="United States"]')).first().click();
    //     element(by.cssContainingText('label', 'ACH (free)')).click();
    //     element(by.css('input[id="achRoutingNumber"]')).sendKeys(ROUNTING_NUM);
    //     element(by.css('input[pyb-floating-label="\'Account number\'"]')).sendKeys(ACCOUNT_NUM);
    //     element(by.css('input[id="address.addr1"]')).sendKeys(ADRESS);
    //     element(by.css('select[id="address.country"]')).click();
    //     element.all(by.css('option[label="United States"]')).first().click();
    //     element(by.css('input[id="address.city"]')).sendKeys(CITY);
    //     element(by.css('select[id="address.state"]')).click();
    //     element(by.css('option[label="New York"]')).click();
    //     element(by.css('input[id="address.postalCode"]')).sendKeys(POSTAL_CODE);
    //     element(by.cssContainingText('button', 'CONTINUE')).click();
    // }

    expandDropdownMenu() {
        element(by.cssContainingText('li.dropdown', 'Settings')).click();
        browser.sleep(2000);
    }

    async getAccessTitle() {
        await browser.sleep(4000);
        return element(by.css('.marketplace-access-onboard-view form>h3')).getText();
    }

    //get first visible element
    getFirstVisibleProtractorElement(selector) {
        var allElementsOfSelector = element.all(by.css(selector));
        return allElementsOfSelector.filter(function (elem) {
            return elem.isDisplayed().then(function (displayedElement) {
                return displayedElement;
            });
        }).first();
    };
}
