import { test, expect } from '@playwright/test';

test('DemoQA Ana Sayfa ve Text Box Form Testi', async ({ page }) => {
  // Ana sayfaya git
  await page.goto('https://demoqa.com/');
  
  // Ana sayfa içeriğinin görünür olduğunu kontrol et
  const firstCard = page.locator('.card').first();
  await expect(firstCard).toBeVisible();
  
  // Elements kartını bul ve tıkla
  const elementsCard = page.locator('.card-body').filter({ hasText: 'Elements' });
  await expect(elementsCard).toBeVisible();
  await elementsCard.click();
  
  // Elements sayfasına yönlendirildiğini kontrol et
  await expect(page).toHaveURL('https://demoqa.com/elements');
  
  // Sol menüde "Text Box" linkini bul ve tıkla
  const textBoxMenu = page.getByRole('listitem').filter({ hasText: 'Text Box' });
  await expect(textBoxMenu).toBeVisible();
  await textBoxMenu.click();
  
  // Text Box sayfasına yönlendirildiğini kontrol et
  await expect(page).toHaveURL(/\/text-box$/);
  
  // Form alanlarını doldur
  const fullNameInput = page.locator('#userName');
  await expect(fullNameInput).toBeVisible();
  await fullNameInput.fill('kader');
  await expect(fullNameInput).toHaveValue('kader');
  
  const emailInput = page.locator('#userEmail');
  await emailInput.fill('kader@getmobil.com');
  await expect(emailInput).toHaveValue('kader@getmobil.com');
  
  const currentAddressInput = page.locator('#currentAddress');
  await currentAddressInput.fill('istanbul');
  await expect(currentAddressInput).toHaveValue('istanbul');
  
  const permanentAddressInput = page.locator('#permanentAddress');
  await permanentAddressInput.fill('kocaeli');
  await expect(permanentAddressInput).toHaveValue('kocaeli');
  
  // Submit butonuna tıkla
  const submitButton = page.locator('#submit');
  await expect(submitButton).toBeVisible();
  await submitButton.click();
  
  // Girilen bilgilerin görüntülendiğini kontrol et
  await expect(page.locator('#output')).toBeVisible();
  await expect(page.locator('#name')).toContainText('kader');
  await expect(page.locator('#email')).toContainText('kader@getmobil.com');
  await expect(page.locator('p#currentAddress')).toContainText('istanbul');
  await expect(page.locator('p#permanentAddress')).toContainText('kocaeli');

  // Sol menüde "check Box" linkini bulup tıklayınca Check Box sayfasına yönlendirildiğini kontrol et
  const checkBoxMenu = page.getByRole('listitem').filter({ hasText: 'Check Box' });
  await expect(checkBoxMenu).toBeVisible();
  await checkBoxMenu.click();

  // Check Box sayfasına yönlendirildiğini kontrol etdeceğim
  await expect(page).toHaveURL(/\/checkbox$/);

  // Check Box sayfasında "Home" kutusunun seçeceğim. seçilip seçilmediğini kontrol edeceğim.
  const homeCheckbox = page.locator('label[for="tree-node-home"] span.rct-checkbox');
  await homeCheckbox.click();
  const homeCheckboxInput = page.locator('input#tree-node-home');
  await expect(homeCheckboxInput).toBeChecked();
  
  // + butonuna tıklandığında alt seçenekler görünür olmalı. kontrol deceğim.
  const expandButton = page.locator('button[title="Expand all"]');
  await expandButton.click();
  await expect(page.locator('label[for="tree-node-desktop"]')).toBeVisible();
  await expect(page.locator('label[for="tree-node-documents"]')).toBeVisible();
  await expect(page.locator('label[for="tree-node-downloads"]')).toBeVisible();

  // home kutusu seçili olduğu için alt kutucuklar da seçili olmalı. kontrol edeceğim.
  const desktopCheckboxInput = page.locator('input#tree-node-desktop');
  const documentsCheckboxInput = page.locator('input#tree-node-documents');
  const downloadsCheckboxInput = page.locator('input#tree-node-downloads');
  await expect(desktopCheckboxInput).toBeChecked();
  await expect(documentsCheckboxInput).toBeChecked();
  await expect(downloadsCheckboxInput).toBeChecked();

  //home kutusunun seçimini kaldırıp kaldırılmadığını kontrol edeceğim.
  await homeCheckbox.click();
  await expect(homeCheckboxInput).not.toBeChecked();
  await expect(desktopCheckboxInput).not.toBeChecked();
  await expect(documentsCheckboxInput).not.toBeChecked();
  await expect(downloadsCheckboxInput).not.toBeChecked();

  //desktop kutusunu seçeceğim. seçilip seçilmediğini kontrol edeceğim.
  const desktopCheckbox = page.locator('label[for="tree-node-desktop"] span.rct-checkbox');
  await desktopCheckbox.click();
  await expect(desktopCheckboxInput).toBeChecked();

  //desktop kutusunun altındaki kutucukların seçilip seçilmediğini kontrol edeceğim.
  const notesCheckboxInput = page.locator('input#tree-node-notes');
  const commandsCheckboxInput = page.locator('input#tree-node-commands');
  await expect(notesCheckboxInput).toBeChecked();
  await expect(commandsCheckboxInput).toBeChecked();

  //desktop kutusunun seçimini kaldırıp kaldırılmadığını kontrol edeceğim.
  await desktopCheckbox.click();
  await expect(desktopCheckboxInput).not.toBeChecked();

  //desktop kutusunun altındaki kutucukların seçiminin kalldırıldığını kontrol edeceğim.
  await expect(notesCheckboxInput).not.toBeChecked();
  await expect(commandsCheckboxInput).not.toBeChecked();
  
  // desktop kutusu için yaptığımız testleri documents ve downloads kutuları için de yapacağım.
  // documents
  const documentsCheckbox = page.locator('label[for="tree-node-documents"] span.rct-checkbox');
  await documentsCheckbox.click();
  await expect(documentsCheckboxInput).toBeChecked();
  const workspaceCheckboxInput = page.locator('input#tree-node-workspace');
  const officeCheckboxInput = page.locator('input#tree-node-office');
  await expect(workspaceCheckboxInput).toBeChecked();
  await expect(officeCheckboxInput).toBeChecked();
  await documentsCheckbox.click();
  await expect(documentsCheckboxInput).not.toBeChecked();
  await expect(workspaceCheckboxInput).not.toBeChecked();
  await expect(officeCheckboxInput).not.toBeChecked();

  // downloads
  const downloadsCheckbox = page.locator('label[for="tree-node-downloads"] span.rct-checkbox');
  await downloadsCheckbox.click();
  await expect(downloadsCheckboxInput).toBeChecked();
  const wordFileCheckboxInput = page.locator('input#tree-node-wordFile');
  const excelFileCheckboxInput = page.locator('input#tree-node-excelFile');
  await expect(wordFileCheckboxInput).toBeChecked();
  await expect(excelFileCheckboxInput).toBeChecked();
  await downloadsCheckbox.click();
  await expect(downloadsCheckboxInput).not.toBeChecked();
  await expect(wordFileCheckboxInput).not.toBeChecked();
  await expect(excelFileCheckboxInput).not.toBeChecked();

  // - butonuna tıklandığında alt seçenekler gizlenir. kontrol edeceğim.
  const collapseButton = page.locator('button[title="Collapse all"]');
  await collapseButton.click();
  await expect(page.locator('label[for="tree-node-desktop"]')).not.toBeVisible();
  await expect(page.locator('label[for="tree-node-documents"]')).not.toBeVisible();
  await expect(page.locator('label[for="tree-node-downloads"]')).not.toBeVisible();

  // Sol menüde 'Radio Button' alt başlığını bulup tıklanabildiğini test edelim
  const radioButtonMenu = page.getByRole('listitem').filter({ hasText: 'Radio Button' });
  await expect(radioButtonMenu).toBeVisible();
  await radioButtonMenu.click();

  // 'Yes' butonuna tıklanabildiğini test edelim
  const yesLabel = page.locator('label[for="yesRadio"]');
  await expect(yesLabel).toBeVisible();
  await yesLabel.click();

  // 'Yes' butonuna tıkladıktan sonra 'You have selected Yes' yazısı görünüyor mu kontrol edelim
  await expect(page.locator('.text-success')).toHaveText('Yes');

  // 'No' butonunun pasif (disabled) olduğunu test edelim
  const noRadio = page.getByLabel('No');
  await expect(noRadio).toBeDisabled();

  // 'Impressive' butonuna tıklanabildiğini ve 'You have selected Impressive' yazısının görünüp görünmediğini test edelim
  const impressiveLabel = page.locator('label[for="impressiveRadio"]');
  await expect(impressiveLabel).toBeVisible();
  await impressiveLabel.click();
  await expect(page.locator('.text-success')).toHaveText('Impressive');

  // Elements altındaki 'Web Tables' menüsüne tıklanabildiğini ve doğru sayfaya yönlendirdiğini test edelim
  const webTablesMenu = page.getByRole('listitem').filter({ hasText: 'Web Tables' });
  await expect(webTablesMenu).toBeVisible();
  await webTablesMenu.click();
  await expect(page).toHaveURL(/\/webtables$/);

  // Web Tables ekranında 'Add' butonuna tıklayınca kişi bilgileri giriş ekranı (modal form) geliyor mu kontrol edelim
  const addButton = page.getByRole('button', { name: 'Add' });
  await expect(addButton).toBeVisible();
  await addButton.click();
  await expect(page.locator('.modal-content')).toBeVisible();
  await expect(page.locator('#firstName')).toBeVisible();
  await expect(page.locator('#lastName')).toBeVisible();
  await expect(page.locator('#userEmail')).toBeVisible();

  // kişi bilgilerini doldur ve submit butonuna tıklayınca kişi bilgileri eklendiğini kontrol edeceğim.
  await page.locator('#firstName').fill('kader');
  await page.locator('#lastName').fill('baran');
  await page.locator('#userEmail').fill('kader@getmobil.com');
  await page.locator('#age').fill('22');
  await page.locator('#salary').fill('100');
  await page.locator('#department').fill('software');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('.rt-tbody')).toContainText('kader');
  await expect(page.locator('.rt-tbody')).toContainText('baran');
  await expect(page.locator('.rt-tbody')).toContainText('kader@getmobil.com');
  await expect(page.locator('.rt-tbody')).toContainText('22');
  await expect(page.locator('.rt-tbody')).toContainText('100');
  await expect(page.locator('.rt-tbody')).toContainText('software');

  // Yeni bir kişi (fatih çiçek fatih@getmobil.com 30 500 software) ekleyip tabloya eklendiğini test edelim
  await addButton.click();
  await page.locator('#firstName').fill('fatih');
  await page.locator('#lastName').fill('çiçek');
  await page.locator('#userEmail').fill('fatih@getmobil.com');
  await page.locator('#age').fill('30');
  await page.locator('#salary').fill('500');
  await page.locator('#department').fill('software');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('.rt-tbody')).toContainText('fatih');
  await expect(page.locator('.rt-tbody')).toContainText('çiçek');
  await expect(page.locator('.rt-tbody')).toContainText('fatih@getmobil.com');
  await expect(page.locator('.rt-tbody')).toContainText('30');
  await expect(page.locator('.rt-tbody')).toContainText('500');
  await expect(page.locator('.rt-tbody')).toContainText('software');

  // type kısmında "kader" yazıp arama yapınca kader kişisi görünüyor mu kontrol edeceğim.
  await page.locator('#searchBox').fill('kader');
  await expect(page.locator('.rt-tbody')).toContainText('kader');
});

