import {$, $$, ElementFinder, ElementArrayFinder } from "protractor";
import { Actions } from "../../support/actions";


export class Google {
    private searchInput: ElementFinder;
    private searchButton: ElementFinder;
    private results: ElementArrayFinder;

    constructor() {
        this.searchInput = $('[name="q"]');
        this.searchButton = $$('input[name="btnK"]').first();
        this.results = $$('a > h3')
    };

    async search (phrase: string) { 
        await Actions.sendKeys(this.searchInput, phrase);   
        await Actions.click(this.searchButton); 
    };

    async getResult (idx: number) { 
        let arrayElementOffset = 1
        return await this.results.get(idx -  arrayElementOffset).getText();
    };

}
