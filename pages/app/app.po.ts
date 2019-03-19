import {browser, by, element, protractor} from 'protractor';
import {resolve} from 'path';
import {Key} from "selenium-webdriver";
import {FileDetector} from "selenium-webdriver/remote";

export const RANDOM_NUMBER = Math.floor(Math.random() * 100000000000000000).toString();

export const TEST_EMAIL = `e2e_test_email_${RANDOM_NUMBER}@test.io`;
export const FIRST_NAME = 'test_first';
export const LAST_NAME = 'test_last';
export const COMPANY_NAME = 'TEST';
export const COMPANY_LEGAL_NAME = `test_e2e_legal_${RANDOM_NUMBER}`;
export const PHONE_NUMBER = '777777777';
export const CHANGED_PHONE_NUMBER = '777777778';
export const ADRESS = 'test_adress';
export const CHANGED_ADRESS = 'test_adress_changed';
export const CITY = 'New York';
export const POSTAL_CODE = '10001';
export const TAX_ID = '123456789';
export const PASSWORD = 'pass';
export const ROUNTING_NUM = '211274450';
export const ACCOUNT_NUM = '1111111111111111111111';
export const CHANGED_ACCOUNT_NUM = '1111111111111111111112';

export let SUPP_INVITE_NAME;
export let SUPP_INVITE_EMAIL;
export let AMAZON_INVITE_LINK = 'https://sellercentral.amazon.com/gp/account-manager/home.html';

export const AMAZON_EMAIL = 'paulina@payability.com';
export const AMAZON_PASS = 'pinkcow';

export const SUPPLIER_EMAIL = 'info@purveyor15.com'; // << Główny użytkownik 
export const SUPPLIER_PASS = 'lasvegas';
export const SUPPLIER_FIRST_NAME = 'Matthew';
export const FILTER_DATE_START = '2017-03-30';
export const FILTER_DATE_END = '2017-04-20';
export const FILTER_DATE_START_RESULT = '03/30/2017';
export const FILTER_DATE_END_RESULT = '04/20/2017';

export const SUPPLIER_RECONCILIATION_EMAIL = 'jack.zibak@sapphiretrading.us';
export const SUPPLIER_RECONCILIATION_PASS = 'lasvegas';
export const SUPPLIER_RECONCILIATION_FIRST_NAME = 'jack';

export const SUPPLIER_SELLER_CARD = '1carpentersdaughter@gmail.com';
export const SUPPLIER_SELLER_CARD_FIRST_NAME = 'Aida';

export const BASE_URL = 'https://test-supplier.payability.com/';

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


    async getAccessTitle() {
        await browser.sleep(4000);
        return element(by.css('.marketplace-access-onboard-view form>h3')).getText();
    }


    // LOGIN
    login() {
        element(by.css('input[name="email"]')).sendKeys(TEST_EMAIL);
        element(by.css('input[name="password"]')).sendKeys(PASSWORD);
        element.all(by.css('button[type="submit"]')).first().click();
    }


    // LOGOUT
    logout() {
        browser.sleep(5000)
        element(by.css('li[id="TestDropdownCurrentSessionMenu"]')).click()
        //element(by.css('.current-session-menu .dropdown.open-on-click a.session-menu-toggle')).click();
        browser.sleep(1500);
        element(by.css('a[id="TestLogout"]')).click()
        //element(by.cssContainingText('li a', 'Logout')).click();
    }

    getLoginButtonText() {
        return element(by.css('div.form-group>p>a[href="#/login/reset-password"]')).getText();
    }


    //CHANGE PASSWORD
    changePassword() {
        element(by.css('.current-session-menu .dropdown.open-on-click a.session-menu-toggle')).click();
        browser.sleep(1500);
        element(by.cssContainingText('li a', 'Change Password')).click();
        element(by.css('input[name="old_password"]')).sendKeys(PASSWORD);
        element(by.css('input[name="new_password"]')).sendKeys(PASSWORD);
        element(by.css('input[name="passwordRepeat"]')).sendKeys(PASSWORD);
        this.clickSubmit();
    }


    // CREATE ACCOUNT
    goToCreateAccount() {
        element(by.cssContainingText('.text-center a', 'Sign-up')).click();
    }

    fillCreateAccountForm() {
        element(by.css('input[name="firstName"]')).sendKeys(FIRST_NAME);
        element(by.css('input[name="lastName"]')).sendKeys(LAST_NAME);
        element(by.css('input[name="companyName"]')).sendKeys(COMPANY_NAME);
        element(by.css('input[name="email"]')).sendKeys(TEST_EMAIL);
        this.clickSubmit();
    }

    setPassword() {
        element(by.css('input[name="new_password"]')).sendKeys(PASSWORD);
        element(by.css('input[name="passwordRepeat"]')).sendKeys(PASSWORD);
        this.clickSubmit();
    }

    setAccountDetails() {
        element(by.css('input[name="phoneNumber"]')).sendKeys(PHONE_NUMBER);
        element(by.css('input[name="address.addr1"]')).sendKeys(ADRESS);
        element.all(by.css('input[name="address.city"]')).first().sendKeys(CITY);
        element.all(by.css('select[name="address.state"]')).first().click();
        element.all(by.css('option[label="New York"]')).first().click();
        element.all(by.css('input[name="address.postalCode"]')).first().sendKeys(POSTAL_CODE);
        element(by.cssContainingText('.view-controls button', 'CONTINUE')).click();
    }

    addMarketplace() {
        browser.sleep(1500);
        element(by.css('select[name="estimatedMonthlyRevenue"]')).click();
        element(by.css('option[label="Between $2,000 and $10,000 per month"]')).click();
        element(by.css('select[name="lengthTimeSelling"]')).click();
        element(by.css('option[label="Between 90 days and 1 year"]')).click();
        element(by.cssContainingText('.view-controls button', 'ADD')).click();
        browser.waitForAngular();
    }

    getVerificationTitle() {
        return element(by.css('form.docusign-launch-form h3')).getText();
    }

    verifyInfo() {
        element(by.css('select[name="businessTypeCode"]')).click();
        element(by.css('option[label="Limited Liability Company"]')).click();
        element(by.css('input[name="legalName"]')).clear();
        element(by.css('input[name="legalName"]')).sendKeys(COMPANY_LEGAL_NAME);
        element(by.css('label[for="incorporated-yes"]')).click();
        element(by.css('select[name="stateOfIncorporation"]')).click();
        element(by.css('option[label="New York"]')).click();
        element(by.css('input[name="taxId"]')).clear();
        element(by.css('input[name="taxId"]')).sendKeys(TAX_ID);
    }


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


    //CONFIGURE ACCOUNT
    skipInvitationEmail() {
        element(by.cssContainingText('.navbar-help-block a.help-content', 'Skip')).click();
    }

    async uploadFile() {
        const e = element(by.css('input[id="file-upload-input"]'));
        browser.setFileDetector(new FileDetector());
        e.sendKeys(path);
        browser.sleep(5000);
        element(by.cssContainingText('button.btn-success', 'CONTINUE')).click();
    }

    addPaymentSettings() {
        element(by.css('select[id="selectedCountry"]')).click();
        element.all(by.css('option[label="United States"]')).first().click();
        element(by.cssContainingText('label', 'ACH (free)')).click();
        element(by.css('input[id="achRoutingNumber"]')).sendKeys(ROUNTING_NUM);
        element(by.css('input[pyb-floating-label="\'Account number\'"]')).sendKeys(ACCOUNT_NUM);
        element(by.css('input[id="address.addr1"]')).sendKeys(ADRESS);
        element(by.css('select[id="address.country"]')).click();
        element.all(by.css('option[label="United States"]')).first().click();
        element(by.css('input[id="address.city"]')).sendKeys(CITY);
        element(by.css('select[id="address.state"]')).click();
        element(by.css('option[label="New York"]')).click();
        element(by.css('input[id="address.postalCode"]')).sendKeys(POSTAL_CODE);
        element(by.cssContainingText('button', 'CONTINUE')).click();
    }

    //SEND AMAZON INVITATION
    async saveSuppInvitationData() {
        SUPP_INVITE_NAME = await element(by.cssContainingText('form h4.invite-mail', 'Name:')).getText();
        SUPP_INVITE_NAME = SUPP_INVITE_NAME.replace('Name: ', '');
        SUPP_INVITE_EMAIL = await element(by.cssContainingText('form h4.invite-mail', 'Email:')).getText();
        SUPP_INVITE_EMAIL = SUPP_INVITE_EMAIL.replace('Email: ', '');
    }

    navigateToAmazon() {
        browser.get(AMAZON_INVITE_LINK);
        browser.sleep(5000);
    }

    loginToAmazon() {
        element(by.css('input[name="email"]')).sendKeys(AMAZON_EMAIL);
        element(by.css('input[name="password"]')).sendKeys(AMAZON_PASS);
        element(by.css('input[name="password"]')).sendKeys(Key.ENTER);
        browser.sleep(5000);
    }

    sendAmazonInvitation() {
        element(by.cssContainingText('tbody', 'Add a New Seller Central User')).element(by.css('input[name="displayName"]')).sendKeys(SUPP_INVITE_NAME);
        element(by.cssContainingText('tbody', 'Add a New Seller Central User')).element(by.css('input[name="emailAddress"]')).sendKeys(SUPP_INVITE_EMAIL);
        element(by.cssContainingText('tbody', 'Add a New Seller Central User')).element(by.cssContainingText('span', 'Send Invitation')).click();
        browser.sleep(5000);
    }

    navigateToSupplier() {
        browser.get('https://test4-supplier.payability.com/#/widget/marketplace/provide-permissions');
    }

    checkInvitation() {
        // TODO: Uncomment below after backend bug is fixed:
        // element(by.cssContainingText('.form-group', 'Has the invite been sent?')).click();
        element(by.cssContainingText('nav.marketplace-controls a', 'Skip')).click();
    }


    //CLICK THROUGH NAVBAR SETTNIGS MENU
    checkMainUserNav() {
        //element(by.cssContainingText('li', 'Statement View')).click();
        //browser.sleep(2000);
        element(by.cssContainingText('ul.navbar-left li', 'Your Account')).click();
    }

    expandDropdownMenu() {
        element(by.cssContainingText('li.dropdown', 'Settings')).click();
        browser.sleep(2000);
    }

    checkDocumentation() {
        this.expandDropdownMenu();
        element(by.cssContainingText('li a', 'Documentation')).click();
        browser.sleep(5000);
        element(by.cssContainingText('button.btn-warning', 'Remove')).click();
        element(by.css('input[id="file-upload-input"]')).sendKeys(path);
        browser.sleep(5000);
    }

    checkMarketplaces() {
        this.expandDropdownMenu();
        element(by.cssContainingText('li a', 'Marketplaces')).click();
        element(by.cssContainingText('a.btn', 'Marketplace Access')).click();
        element(by.cssContainingText('a.btn', 'Marketplaces')).click();
    }

    showAllMarketplaces() {
        element(by.css('button[title="Add a new marketplace"]')).click();
        element(by.cssContainingText('button', 'Show all')).click();
    }

    suggestMarketplace() {
        element(by.cssContainingText('label', 'Suggest one')).click();
        element(by.css('input[id="marketplaceName"]')).sendKeys('test_marketplace');
        element(by.css('input[id="estimatedMonthlyRevenue"]')).sendKeys('200000');
        browser.sleep(2000);
        this.clickSubmit();
    }

    checkPayments() {
        this.expandDropdownMenu();
        element(by.cssContainingText('li a', 'Transfer Settings')).click();
    }

    updatePaymentsConfig() {
        element(by.cssContainingText('ul.payconfig-list li', 'XXXX')).click();
        element(by.cssContainingText('button.btn-warning', 'Edit')).click();
        element(by.css('input[id="achRoutingNumber"]')).clear();
        element(by.css('input[id="achRoutingNumber"]')).sendKeys(ROUNTING_NUM);
        element(by.css('input[pyb-floating-label="\'Account number\'"]')).sendKeys(CHANGED_ACCOUNT_NUM);
        this.clickSave();
        element(by.css('div.close')).click();
    }

    async updatePaymentsContact() {
        this.expandDropdownMenu();
        await element(by.cssContainingText('li a', 'Contact Information')).click();
        await element(by.css('input[name="address.addr1"]')).clear();
        await element(by.css('input[name="address.addr1"]')).sendKeys(CHANGED_ADRESS);
        await browser.executeScript('window.scrollTo(0,400);');
        await browser.sleep(3000);
        await this.clickSave();
        await browser.sleep(3000);
    }

    checkAuth() {
        this.expandDropdownMenu();
        element(by.cssContainingText('li a', 'Two-Factor Authentication')).click();
    }


    // REFER A FRIEND
    async referFriend() {
        await browser.sleep(3000);
        await element(by.cssContainingText('ul.sticky-contact-links a.link span', 'Refer a Friend')).click();
        await browser.sleep(3000);
        await element(by.cssContainingText('a[supported="supported"]', 'Copy Link')).click();
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

    // SUPLIER DASHBOARD TESTS
    loginForDailySummary() {
        element(by.css('input[name="email"]')).sendKeys(SUPPLIER_EMAIL);
        element(by.css('input[name="password"]')).sendKeys(SUPPLIER_PASS);
        element(by.css('input[name="password"]')).sendKeys(Key.ENTER);
    }

    loginForReconciliation() {
        element(by.css('input[name="email"]')).sendKeys(SUPPLIER_RECONCILIATION_EMAIL);
        element(by.css('input[name="password"]')).sendKeys(SUPPLIER_RECONCILIATION_PASS);
        element(by.css('input[name="password"]')).sendKeys(Key.ENTER);
    }

    loginToSupplier(email) {
        element(by.css('input[name="email"]')).sendKeys(email);
        element(by.css('input[name="password"]')).sendKeys(SUPPLIER_PASS);
        element(by.css('input[name="password"]')).sendKeys(Key.ENTER);
    }

     dailySummaryFilterByDate() {
        if(this.isMobile())
        {
            element(by.css('.main-user-nav .current-section')).click();
        }
        element(by.css('a[title="Daily Summary"]')).click();
        element.all(by.css('input[ng-model="dailySummary.datepicker_startMomentDate"]')).first().sendKeys(FILTER_DATE_START);
        element.all(by.css('input[ng-model="dailySummary.datepicker_endMomentDate"]')).first().sendKeys(FILTER_DATE_END);
        //element(by.css('.table-title')).click();
        element.all(by.css('.filter-title-ds')).first().click();
        browser.sleep(1000);
        element(by.css('span[id="TestExpandAll"]')).click();
        element(by.css('span[id="TestShowExpandedVersion"]')).click();
        //element.all(by.css('span[ng-if="!dailySummary.isExpanded"]')).first().click();
    }

    checkTransactionDetails()
    {
        element.all(by.css('a[ng-href*="/reports/transaction-details"]')).first().click();
    }

    checkMarketplacePayments()
    {
        element.all(by.css('a[ng-href*="/reports/marketplace-payments"]')).first().click();
    }

    checkPaymentRequests()
    {
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
        browser.sleep(25000);
        element.all(by.css('a[ng-href*="/reports/payment-requests"]')).first().click();
    }
}
