import { Page, Locator, expect } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";
import { PageRoutes } from "../utils/constants";

export class AccountSuccessPage {
	readonly page: Page;
	readonly header: HeaderComponent;
	readonly pageBreadcrumbs: Locator;
	readonly pageHeader: Locator;
	readonly successMessageParagraphs: Locator;
	readonly continueButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.header = new HeaderComponent(this.page);
		this.pageBreadcrumbs = page.getByLabel("breadcrumb");
		this.pageHeader = page.getByRole("heading", { name: "Your Account Has Been Created!" });
		this.successMessageParagraphs = page.locator("#content p");
		this.continueButton = page.getByRole("link", { name: "Continue" });
	}

	async expectOnPage() {
		await this.page.waitForURL(`**/${PageRoutes.ACCOUNT_SUCCESS}`);
		await expect(this.pageHeader).toBeVisible();
		await expect(this.pageBreadcrumbs).toContainText(/Account Success/)
	}

	async clickContinueToMyAccount() {
		await this.continueButton.click();
		await this.page.waitForURL(`**/${PageRoutes.MY_ACCOUNT}`);
	}
}
