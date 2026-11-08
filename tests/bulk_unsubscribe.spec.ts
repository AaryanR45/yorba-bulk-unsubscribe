import { test, expect } from '@playwright/test';
import { MailingListsPage } from '../pages/mailingLists.page';

test('test', async ({ page }) => {
  const email = process.env.YORBA_EMAIL;
  const password = process.env.YORBA_PASSWORD;

  expect(email, 'YORBA_EMAIL must be set in .env').toBeTruthy();
  expect(password, 'YORBA_PASSWORD must be set in .env').toBeTruthy();

  const mailingLists = new MailingListsPage(page);
  await mailingLists.login(email!, password!);
  await mailingLists.closeFeatureAnnouncementModal();
  await mailingLists.openMailingLists();
  await mailingLists.selectMailingListCheckboxes();
  await mailingLists.startUnsubscribe();
});