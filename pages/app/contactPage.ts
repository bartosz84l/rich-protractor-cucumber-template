
import { $, $$, ElementFinder, element, ElementArrayFinder } from "protractor";
import { Actions } from "../../support/actions";
import { CustomWait } from "../../support/wait";
import { testConfig } from "../../config/test-config";

export class ContactPage {


  private TIMEOUT: number = 10000;
  private findName: ElementFinder;
  private findEmail: ElementFinder;
  private findMessage: ElementFinder;
  private searchButton: ElementFinder;
  private menuItems: ElementArrayFinder;
  private messagePage: string;
  private messageVisible: ElementFinder;

  constructor() {
    this.findName = $('#name');
    this.findEmail = $('#email');
    this.findMessage= $('#content');
    this.searchButton = $('button[type = "submit"]');
    this.menuItems = $$('ul.nav > li > a');
    this.messageVisible = $('.message h3');
    this.messagePage = 'Your message has been sent.';

  };


  async fillForm(name: string, email: string, msg: string) {
    await Actions.sendKeys(this.findName, name);
    await Actions.sendKeys(this.findEmail, email);
    await Actions.sendKeys(this.findMessage, msg);
    await Actions.click(this.searchButton); 
    
  
  };

 async open() {
 await Actions.click(this.menuItems.get(4));
 };



  
  async getExpectedMessage(){
    await CustomWait.waitForTextInElement(this.messageVisible, this.messagePage, this.TIMEOUT  )
    return this.messageVisible.getText();
  
    }


  };