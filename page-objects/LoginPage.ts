import { Page, Locator, expect } from "@playwright/test";
import { PageRoutes } from "../utils/constants";
import { HeaderComponent } from "./components/HeaderComponent";

export class LoginPage {
	readonly page: Page;
	readonly header: HeaderComponent;
	readonly pageBreadcrumbs: Locator;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly forgottenPasswordLink: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.header = new HeaderComponent(this.page);
		this.pageBreadcrumbs = page.getByLabel("breadcrumb");
		this.emailInput = page.getByRole("textbox", { name: "E-Mail Address" });
		this.passwordInput = page.getByRole("textbox", { name: "Password" });
		this.forgottenPasswordLink = page.getByRole("link", {
			name: "Forgotten Password",
			exact: true,
		});
		this.loginButton = page.getByRole("button", { name: "Login" });
	}

	async goto() {
		await this.page.goto(PageRoutes.LOGIN);
		await expect(this.pageBreadcrumbs).toBeVisible();
		await expect(this.pageBreadcrumbs).toContainText(/Account Login/);
	}

	async fillLoginForm(email: string, password?: string) {
		await this.emailInput.fill(email);
		if (password) {
			await this.passwordInput.fill(password);
		}
	}

	async clickForgottenPassword() {
		await this.forgottenPasswordLink.click();
	}
    
	async clickLogin() {
		await this.loginButton.click();
	}

	async login(email: string, password?: string) {
		await this.fillLoginForm(email, password);
		await this.clickLogin();
	}
}
