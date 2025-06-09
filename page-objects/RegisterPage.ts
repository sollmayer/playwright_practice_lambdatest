import { Page, Locator, expect } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";
import { PageRoutes } from "../utils/constants";
import { TestDataGenerator } from "../utils/TestDataGenerator";

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
		this.privacyPolicyCheckbox = page.locator("#input-agree");
		this.continueButton = page.getByRole("button", { name: "Continue" });
	}
	async goto() {
		await this.page.goto(PageRoutes.REGISTER);
		await expect(this.pageBreadcrumbs).toBeVisible();
		await expect(this.pageBreadcrumbs).toContainText(/Account Register/);
	}

	async fillRegistrationForm(userData: {
		firstName: string;
		lastName: string;
		email: string;
		telephone: string;
		password: string;
	}) {
		await this.firstNameInput.fill(userData.firstName);
		await this.lastNameInput.fill(userData.lastName);
		await this.emailInput.fill(userData.email);
		await this.phoneInput.fill(userData.telephone);
		await this.passwordInput.fill(userData.password);
		await this.passwordConfirmInput.fill(userData.password);
	}

	async subscribeToNewsletter() {
		await this.page.locator("input#input-newsletter-yes").check({ force: true });
	}

	async agreeToPrivacyPolicy() {
		await this.privacyPolicyCheckbox.check();
	}

	async registerNewUser(userData: {
		firstName: string;
		lastName: string;
		email: string;
		telephone: string;
		password: string;
	}) {
		await this.fillRegistrationForm(userData);
		await this.agreeToPrivacyPolicy();
		await this.clickContinue();
	}

	async getFieldValidationError(fieldName: "firstname" | "lastname" | "email" | "telephone" | "password" | "confirm") {
		return this.page.locator(`#input-${fieldName} + .text-danger`);
	}

	async getMainWarningMessage() {
		return this.page.locator(".alert.alert-danger").first();
	}

	async clickContinue() {
		await this.continueButton.click();
	}
}
