import { Page, Locator, expect } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";

export class RegisterPage {
	private readonly page: Page;
	readonly HeaderComponet: HeaderComponent;
	readonly pageBreadcrumbs: Locator;
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly emailInput: Locator;
	readonly phoneInput: Locator;
	readonly passwordInput: Locator;
	readonly passwordConfirmInput: Locator;
	readonly newsletterSubscribeRadioButton: Locator[];
	readonly privacyPolicyCheckbox: Locator;

	readonly continueButton: Locator;

	constructor(page) {
		this.page = page;
		this.HeaderComponet = new HeaderComponent(this.page);
		this.pageBreadcrumbs = page.getByLabel("breadcrumb");
		this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
		this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
		this.emailInput = page.getByRole("textbox", { name: "E-Mail" });
		this.phoneInput = page.getByRole("textbox", { name: "Telephone" });
		this.passwordInput = page.locator("#input-password");
		this.passwordConfirmInput = page.locator("#input-confirm");
		this.privacyPolicyCheckbox = page.locator('#input-agree')
	}

}
