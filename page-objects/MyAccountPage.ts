import { Page, Locator, expect } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";
import { PageRoutes } from "../utils/constants";
import { TestDataGenerator } from "../utils/TestDataGenerator";

export class MyAccountPage {
	private readonly page: Page;
	readonly HeaderComponent: HeaderComponent;
	readonly pageBreadcrumbs: Locator;
	readonly pageHeader: Locator;

	constructor(page) {
		this.page = page;
		this.HeaderComponent = new HeaderComponent(this.page);
        this.pageHeader = page.getByRole('heading', {name: "My Account"})
		this.pageBreadcrumbs = page.getByLabel("breadcrumb");
	}
	async goto() {
		await this.page.goto(PageRoutes.MY_ACCOUNT);
	}
	async expectOnPage(): Promise<void> {
		await this.page.waitForURL(`**/${PageRoutes.MY_ACCOUNT}`);
		await expect(this.pageBreadcrumbs).toContainText(/Account/);
        await expect(this.pageHeader).toBeVisible();
	}
}
