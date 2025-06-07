import { Page, Locator } from "@playwright/test";

export class HeaderComponent {
	readonly page: Page;
	readonly myAccountDropdown: Locator;
	readonly registerLink: Locator;
	readonly loginLink: Locator;
	readonly logoutLink: Locator;
	readonly searchInput: Locator;
	readonly searchButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.myAccountDropdown = page.locator("#main-navigation li", { hasText: "My account" });
		this.registerLink = page.getByRole("link", { name: "Register", exact: true });
		this.loginLink = page.getByRole("link", { name: "Login", exact: true });
		this.searchInput = page.getByRole("textbox", { name: "search" });
		this.searchButton = page.getByRole('button', { name: 'Search' })
	}

	async navigateToRegisterPage() {
		await this.myAccountDropdown.hover();
		await this.registerLink.click();
	}

	async navigateToLoginPage() {
		await this.myAccountDropdown.hover();
		await this.loginLink.click();
	}

	async performSearch(inputText: string) {
		await this.searchInput.fill(inputText);
		await this.searchButton.click();
	}
}
