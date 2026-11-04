import { expect, type Page } from "@playwright/test";

export class MailingListsPage {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string): Promise<void> {
    await this.page.goto("/login");
    await this.page
      .getByRole("button", { name: "Continue with Email" })
      .click();
    await this.page.getByRole("textbox", { name: "Email address" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Log in" }).click();
  }

  async closeFeatureAnnouncementModal(): Promise<void> {
    const closeButton = this.page.locator(
      'button[data-sentry-element="CloseButton"]',
    );
    await closeButton.waitFor({ state: "visible" });
    await closeButton.click();
  }

  async openMailingLists(): Promise<void> {
    await this.page.getByText("Mailing Lists").first().click();
  }

  async selectMailingListCheckboxes(): Promise<void> {
    const checkboxes = this.page.getByRole("checkbox");

    for (const index of [3, 4, 5]) {
      const checkbox = checkboxes.nth(index);
      await checkbox.waitFor({ state: "visible" });
      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }

  async startUnsubscribe(): Promise<void> {
    const bulkUnsubscribeButton = this.page.locator(
      ".MuiButtonBase-root.sc-jGvJud",
    );
    await expect(bulkUnsubscribeButton).toBeVisible();
    await bulkUnsubscribeButton.click();
  }

  // for manual action
  // async openUnsubscribeConfirmationManual(): Promise<void> {
  //   const manualCheckbox = this.page.getByRole('checkbox').nth(14)
  //   await manualCheckbox.scrollIntoViewIfNeeded();
  //   await manualCheckbox.waitFor({ state: "visible" });
  //   await manualCheckbox.check();
  //   await expect(manualCheckbox).toBeChecked();
  //   await this.startUnsubscribe();
  //   await this.page.getByRole("button", { name: "Take action" }).click();
  //   await expect(
  //     this.page.getByRole("heading", { name: "We need your help to" }),
  //   ).toBeVisible(); //assert manual action prompt is open
  // }

  // async expectconfirmUnsubscribeManual(): Promise<void> {
  //   await this.page.getByRole("button", { name: "Close", exact: true }).click();
  //   await this.page.getByRole("button", { name: "Confirm" }).click();
  // }
}
