import test from "../fixtures/test";

test("Notifications butonları", async ({ homePage, notificationsPage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await homePage.navigateToNotifications();

  await notificationsPage.verifyPageLoaded();
  await notificationsPage.clickAllNotificationButtons();
});
