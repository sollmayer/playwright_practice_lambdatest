import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../../page-objects/LoginPage";
import { MyAccountPage } from "../../page-objects/MyAccountPage";

const authFile = path.join(process.cwd(), ".auth/user.json");

const setupUserEmail = process.env.TEST_USER_EMAIL || "";
const setupUserPassword = process.env.TEST_USER_PASSWORD || "";

setup("authenticate", async ({ page }) => {
	const loginPage = new LoginPage(page);
	const myAccountPage = new MyAccountPage(page);

	await loginPage.goto();
	await loginPage.login(setupUserEmail, setupUserPassword);

	try {
		await myAccountPage.expectOnPage();
	} catch (error) {
		// await page.screenshot({ path: "auth-setup-login-failure.png" });
		// console.error("Auth Setup: Login failed. Please check credentials or site status.", error);
		throw new Error("Auth Setup: Login failed. Please check credentials or site status.");
	}

	await page.context().storageState({ path: authFile });
});
