import { Page, expect } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";
import { PageRoutes } from "../utils/constants";

export class HomePage {
    readonly page: Page;
	readonly HeaderComponent: HeaderComponent;
    
	constructor(page: Page) {
		this.page = page;
		this.HeaderComponent = new HeaderComponent(this.page);
	}

	async goto() {
		await this.page.goto(PageRoutes.HOME);
		await expect(this.page).toHaveTitle(/Your Store/); 
	}
}
