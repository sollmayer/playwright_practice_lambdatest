import { Page, expect } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";

export class HomePage {
    readonly page: Page;
	readonly HeaderComponent: HeaderComponent;
    
	constructor(page: Page) {
		this.page = page;
		this.HeaderComponent = new HeaderComponent(this.page);
	}

	async goto() {
		await this.page.goto('https://ecommerce-playground.lambdatest.io/');
		await expect(this.page).toHaveTitle(/Your Store/); 
	}
}
