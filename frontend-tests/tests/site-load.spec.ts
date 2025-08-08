import { test, expect } from '@playwright/test';

test('QA Automation Labs akış testi (Checkbox + Radio Button 18-35)', async ({ page }) => {
  await page.goto('https://testing.qaautomationlabs.com/index.php');
  await expect(page).toHaveURL('https://testing.qaautomationlabs.com/index.php');
  await expect(page).toHaveTitle(/QA Automation Labs|Tools Demo/i);
  await expect(page.locator('text=Tools Demo')).toBeVisible();

  // Checkbox Section
  const checkboxMenuLink = page.locator('a.nav-link:has-text("CheckBox")');
  await expect(checkboxMenuLink).toBeVisible();
  await checkboxMenuLink.click();
  await expect(page.locator('h1:has-text("Checkbox Demo")')).toBeVisible();

  const checkMeCheckbox = page.locator('label:has-text("Check me") input[type="checkbox"]');
  await expect(checkMeCheckbox).toBeVisible();
  await checkMeCheckbox.check();
  await expect(page.locator('text=Checked')).toBeVisible();

  const enableCheckbox1 = page.locator('label:has-text("Enable Checkbox 1") input[type="checkbox"]');
  const enableCheckbox2 = page.locator('label:has-text("Enable Checkbox 2") input[type="checkbox"]');
  await expect(enableCheckbox1).toBeEnabled();
  await expect(enableCheckbox2).toBeEnabled();

  const allCheckboxes = page.locator('.myCheckbox[type="checkbox"]');
  const checkboxCount = await allCheckboxes.count();
  for (let i = 0; i < checkboxCount; i++) {
    const checkbox = allCheckboxes.nth(i);
    await expect(checkbox).toBeEnabled();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  const checkAllButton = page.locator('#toggleBtn');
  await expect(checkAllButton).toBeVisible();
  await checkAllButton.click();
  await checkAllButton.click();
  for (let i = 0; i < checkboxCount; i++) {
    await expect(allCheckboxes.nth(i)).not.toBeChecked();
  }
  await expect(checkAllButton).toHaveText("Check All");

  // Radio Button Section
  const radioButtonMenuLink = page.locator('//a[contains(@href, "radio-button.php")]');
  await expect(radioButtonMenuLink).toBeVisible();
  await radioButtonMenuLink.click();
  await expect(page.locator('h1:has-text("Radio Button Demo")')).toBeVisible();

  const radioButton1 = page.locator('input[type="radio"][value="Radio Button 1"]');
  await expect(radioButton1).toBeVisible();
  await radioButton1.check();
  await expect(radioButton1).toBeChecked();

  const ageGroup1835Label = page.locator('//p[contains(text(),"Select Age Group")]/following-sibling::label[2]');
  await expect(ageGroup1835Label).toBeVisible();
  await ageGroup1835Label.click();

  const showSelectedValuesButton = page.locator('button:has-text("Show Selected Values")');
  await expect(showSelectedValuesButton).toBeVisible();
  await showSelectedValuesButton.click();

  await expect(page.locator('#result3')).toHaveText(/You selected: Gender = Radio Button 1, Age Group =\s*18-35/);

  //dropdown menüsüne tıkla ve dropdown demo yazısının göründüğünü kontrol edelim
  const dropdownMenuLink = page.locator('a.nav-link:has-text("Dropdown")');
  await expect(dropdownMenuLink).toBeVisible();
  await dropdownMenuLink.click();
  await expect(page.locator('h1:has-text("Dropdown Demo")')).toBeVisible();

  //select an optionda select fruit e tıklayıp apple seçelim
  const selectFruitDropdown = page.locator('#fruitDropdown');
  await expect(selectFruitDropdown).toBeVisible();
  await selectFruitDropdown.selectOption({ label: 'Apple' });
  await expect(page.locator('#result')).toHaveText('You selected: Apple');  

  //select a country india olarak seçelim ve first selected a tıklayalım
  const selectCountryDropdown = page.locator('#countryDropdown');
  await expect(selectCountryDropdown).toBeVisible();
  await selectCountryDropdown.selectOption({ label: 'India' });
  
  // First Selected butonuna tıkla
  const firstSelectedButton = page.locator('button:has-text("First Selected")');
  await expect(firstSelectedButton).toBeVisible();
  await firstSelectedButton.click();
  
//form menüsüne tıklayalım ve Input form validations Demo yazısının göründüğünü kontrol edelim
const formMenuLink = page.locator('a.nav-link:has-text("Form")');
await expect(formMenuLink).toBeVisible();
await formMenuLink.click();
await expect(page.locator('h1:has-text("Input Form Validations")')).toBeVisible();

// Form alanlarını dolduralım
// First Name
const firstNameInput = page.locator('#firstname');
await expect(firstNameInput).toBeVisible();
await firstNameInput.fill('kader');

// Middle Name
const middleNameInput = page.locator('#middlename');
await expect(middleNameInput).toBeVisible();
await middleNameInput.fill('kader');

// Last Name
const lastNameInput = page.locator('#lastname');
await expect(lastNameInput).toBeVisible();
await lastNameInput.fill('baran');

// Email
const emailInput = page.locator('#email');
await expect(emailInput).toBeVisible();
await emailInput.fill('kader@getmobil.com');

// Password
const passwordInput = page.locator('#password');
await expect(passwordInput).toBeVisible();
await passwordInput.fill('123456');

// Address
const addressInput = page.locator('#address');
await expect(addressInput).toBeVisible();
await addressInput.fill('istanbul');

// City
const cityInput = page.locator('#city');
await expect(cityInput).toBeVisible();
await cityInput.fill('kocaeli');

// State
const stateInput = page.locator('#states');
await expect(stateInput).toBeVisible();
await stateInput.fill('izmit');

// Pin Code
const pinCodeInput = page.locator('#pincode');
await expect(pinCodeInput).toBeVisible();
await pinCodeInput.fill('1');

// Submit butonuna tıklayalım
const submitButton = page.locator('button[type="submit"]');
await expect(submitButton).toBeVisible();
await submitButton.click();

// Form submitted successfully yazısının göründüğünü kontrol edelim
await expect(page.locator('text=Form submitted successfully')).toBeVisible();

//web table menüsüne tıklayalım ve Table Demo yazısının göründüğünü kontrol edelim
const webTableMenuLink = page.locator('a.nav-link:has-text("Web Table")');
await expect(webTableMenuLink).toBeVisible();
await webTableMenuLink.click();
await expect(page.locator('h1:has-text("Table Demo")')).toBeVisible();

//search kısmına 1 yazalım ve enter tuşuna basalım john doe çıktığını kontrol edelim
const searchInput = page.locator('#searchInput');
await expect(searchInput).toBeVisible();
await searchInput.fill('1');
await page.keyboard.press('Enter');
await expect(page.locator('text=John Doe')).toBeVisible();

//search kısmına rahul yazalım ve enter tuşuna basalım rahul çıktığını kontrol edelim
await searchInput.fill('rahul');
await page.keyboard.press('Enter');
await expect(page.locator('text=Rahul')).toBeVisible();

//search kısmına spain yazalım ve enter tuşuna basalım maria çıktığını kontrol edelim
await searchInput.fill('spain');
await page.keyboard.press('Enter');
await expect(page.locator('text=Maria')).toBeVisible();

//iframe menüsüne tıklayalım ve iframe Demo yazısının göründüğünü kontrol edelim
const iframeMenuLink = page.locator('a.nav-link:has-text("Iframe")');
await expect(iframeMenuLink).toBeVisible();
await iframeMenuLink.click();
await expect(page.locator('h1:has-text("Iframe Demo")')).toBeVisible();

//i am iframe 1 yazısının altındaki click me butonuna tıklayalım ve You have clicked on iframe 1 button yazısının göründüğünü kontrol edelim
// Iframe 1 içindeki butona erişmek için frameLocator kullanıyoruz
const iframe1 = page.frameLocator('iframe[name="iframe1"]');
const clickMeButton = iframe1.locator('button:has-text("Click Me")');
await expect(clickMeButton).toBeVisible();
await clickMeButton.click();
await expect(page.locator('text=You have clicked on iframe 1 button')).toBeVisible();

//i am iframe 2 yazısının altındaki click me butonuna tıklayalım ve You have clicked on iframe 2 button yazısının göründüğünü kontrol edelim
const iframe2 = page.frameLocator('iframe[name="iframe2"]');
const clickMeButton2 = iframe2.locator('button:has-text("Click Me")');
await expect(clickMeButton2).toBeVisible();
await clickMeButton2.click();
await expect(page.locator('text=You have clicked on iframe 2 button')).toBeVisible();

// sahadow dom menüsüne tıklayalım ve Shadow DOM Demo yazısının göründüğünü kontrol edelim
const shadowDomMenuLink = page.locator('a.nav-link:has-text("Shadow DOM")');
await expect(shadowDomMenuLink).toBeVisible();
await shadowDomMenuLink.click();
await expect(page.locator('h1:has-text("Shadow DOM Demo")')).toBeVisible();

// burada This is outside Shadow DOM yazısının göründüğünü kontrol edelim
await expect(page.locator('text=This is outside Shadow DOM')).toBeVisible();  

//drag and drop menüsüne tıklayalım ve Drag and Drop Demo yazısının göründüğünü kontrol edelim
const dragAndDropMenuLink = page.locator('a.nav-link:has-text("Drag & Drop")');
await expect(dragAndDropMenuLink).toBeVisible();
await dragAndDropMenuLink.click();

await expect(page.locator('h1:has-text("Drag & Drop Demo")')).toBeVisible();

//ıtem 1 i sürükleyip item 2 ye bırakalım ve item 2 nin üzerine gelindiğini kontrol edelim
// Bu sayfa sortable list olduğu için farklı yaklaşım kullanıyoruz
const sortableList = page.locator('#sortableList');
await expect(sortableList).toBeVisible();

// İlk öğeyi (Item 1: Inbox) alalım
const firstItem = sortableList.locator('li').first();
await expect(firstItem).toBeVisible();

// İkinci öğeyi (Item 2: Work) alalım
const secondItem = sortableList.locator('li').nth(1);
await expect(secondItem).toBeVisible();

// İlk öğeyi ikinci öğenin üzerine sürükleyelim
await firstItem.dragTo(secondItem);

// Sürükleme işleminin başarılı olduğunu kontrol edelim
await expect(firstItem).toBeVisible();

// Sürükleme işleminin başarılı olduğunu kontrol edelim - elementler hala görünür olmalı
await expect(firstItem).toBeVisible();
await expect(secondItem).toBeVisible();

//item 3 ü sürükleyip item 5 e bırakalım ve item 5 in üzerine gelindiğini kontrol edelim
const thirdItem = sortableList.locator('li').nth(2);
await expect(thirdItem).toBeVisible();

const fifthItem = sortableList.locator('li').nth(4);
await expect(fifthItem).toBeVisible();

await thirdItem.dragTo(fifthItem);

// Sürükleme işleminin başarılı olduğunu kontrol edelim
await expect(thirdItem).toBeVisible();
await expect(fifthItem).toBeVisible();    

//notifications menüsüne tıklayalım ve Notification Demo yazısının göründüğünü kontrol edelim
const notificationsMenuLink = page.locator('a.nav-link:has-text("Notifications")');
await expect(notificationsMenuLink).toBeVisible();
await notificationsMenuLink.click();

await expect(page.locator('h1:has-text("Notification Demo")')).toBeVisible();

// Farklı notification butonlarına tıklayalım ve mesajların göründüğünü kontrol edelim
const successButton = page.locator('button:has-text("Success Message")');
await expect(successButton).toBeVisible();
await successButton.click();

const infoButton = page.locator('button:has-text("Info Message")');
await expect(infoButton).toBeVisible();
await infoButton.click();

const primaryButton = page.locator('button:has-text("Primary Message")');
await expect(primaryButton).toBeVisible();
await primaryButton.click();

const errorButton = page.locator('button:has-text("Error Message")');
await expect(errorButton).toBeVisible();
await errorButton.click(); 

//javaScript alert menüsüne tıklayalım ve JavaScript Alert Demo yazısının göründüğünü kontrol edelim
const javaScriptAlertMenuLink = page.locator('a.nav-link:has-text("JavaScript Alert")');
await expect(javaScriptAlertMenuLink).toBeVisible();
await javaScriptAlertMenuLink.click();
await expect(page.locator('h1:has-text("JavaScript Alert Demo")')).toBeVisible();

//show alert butonuna tıklayalım ve gelen mesajı kontrol edelim. ok butonuna tıklayalım ve Alert shown. yazısının göründüğünü kontrol edelim
const showAlertButton = page.locator('button:has-text("Show Alert")');
await expect(showAlertButton).toBeVisible();

// Alert'i handle etmek için event listener ekleyelim
page.on('dialog', dialog => {
  console.log(`Alert mesajı: ${dialog.message()}`);
  if (dialog.type() === 'prompt') {
    dialog.accept('kader'); // Prompt için 'kader' text'ini gir
  } else {
    dialog.accept(); // Diğer alert'ler için sadece OK
  }
});

await showAlertButton.click();
await expect(page.locator('text=Alert shown.')).toBeVisible();  

//show confirm butonuna tıklayalım ve gelen mesajı kontrol edelim. ok butonuna tıklayalım ve You clicked OK on confirm button. yazısının göründüğünü kontrol edelim
const showConfirmButton = page.locator('button:has-text("Show Confirm")');
await expect(showConfirmButton).toBeVisible();

await showConfirmButton.click();
await expect(page.locator('text=You clicked OK on confirm button.')).toBeVisible();

//sahow prompt butonuna tıklayalım gelen mesajda what is your name alanına kader yazalım ve ok butonuna tıklayalım ve You entered: kader yazısının göründüğünü kontrol edelim
const showPromptButton = page.locator('button:has-text("Show Prompt")');
await expect(showPromptButton).toBeVisible();

await showPromptButton.click();
await expect(page.locator('text=You entered: kader')).toBeVisible();  




});
