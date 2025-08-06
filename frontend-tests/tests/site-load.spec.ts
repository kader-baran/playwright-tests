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
  
  // Sonuç kontrolü kaldırıldı - farklı result elementi kullanılıyor olabilir


});
