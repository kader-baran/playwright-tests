import { test, expect } from '@playwright/test';

test('DemoQA Ana Sayfa ve Text Box Form Testi', async ({ page }) => {
  test.setTimeout(60000); // 60 saniye

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

  //home kutusunu seçince You have selected :... yazısının görünüp görünmediğini kontrol edeceğim.
  await expect(page.locator('#result')).toContainText('You have selected :');
  await expect(page.locator('#result')).toContainText('home');

  
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

  //desktop kutusunu seçince You have selected :You have selected : desktop notes commands yazısının görünüp görünmediğini kontrol edeceğim.
  await expect(page.locator('#result')).toContainText('You have selected :');
  await expect(page.locator('#result')).toContainText('desktop');
  await expect(page.locator('#result')).toContainText('notes');
  await expect(page.locator('#result')).toContainText('commands');

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

  //bu ekranda kayıtlı olan kişilerin bilgilerinin görünüp görünmediğini kontrol edeceğim.
  await expect(page.locator('.rt-tbody')).toContainText('Cierra');
  await expect(page.locator('.rt-tbody')).toContainText('Alden');
  await expect(page.locator('.rt-tbody')).toContainText('Kierra');

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

 
//elements alt başlıklarından buttons kısmına tıklayınca button kısmına yönlendirildiğini kontrol edeceğim.
const buttonsMenu = page.getByRole('listitem').filter({ hasText: 'Buttons' });
await expect(buttonsMenu).toBeVisible();
await buttonsMenu.click();
await expect(page).toHaveURL(/\/buttons$/);

//double click me butonuna bir kere tıklayınca bir şey yazmayacak. bunu kontrol edeceğim.
const doubleClickBtn = page.getByRole('button', { name: 'Double Click Me' });
await doubleClickBtn.click();
await expect(page.locator('#doubleClickMessage')).not.toBeVisible();

//double click me butonuna iki kere tıklayınca You have done a double click yazısı görünecek. bunu kontrol edeceğim.
await doubleClickBtn.dblclick();
await expect(page.locator('#doubleClickMessage')).toBeVisible();
await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');

//right click me butonuna sol tıklayınca bir şey görünmeyecek. bunu kontrol edeceğim.
const rightClickBtn = page.getByRole('button', { name: 'Right Click Me' });
await rightClickBtn.click();
await expect(page.locator('#rightClickMessage')).not.toBeVisible();

//right click me butonuna sağ tıklayınca You have done a right click yazısı görünecek. bunu kontrol edeceğim.
await rightClickBtn.click({ button: 'right' });
await expect(page.locator('#rightClickMessage')).toBeVisible();
await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');

//click me butonuna bir kere tıklayınca ekranda yazı çıkacak. bunu kontrol edeceğim.
await page.goto('https://demoqa.com/buttons');
const clickMeBtn = page.getByRole('button', { name: 'Click Me', exact: true });
await expect(clickMeBtn).toBeVisible();
await clickMeBtn.click();
await expect(page.locator('p:has-text("You have done a dynamic click")')).toBeVisible();
await expect(page.locator('p:has-text("You have done a dynamic click")')).toHaveText('You have done a dynamic click');


//elements alt başlıklarından links kısmına tıklayınca links kısmına yönlendirildiğini kontrol edeceğim.
await page.goto('https://demoqa.com/');
const elementsCardLinks = page.locator('.card-body:has-text("Elements")');
await expect(elementsCardLinks).toBeVisible();
await elementsCardLinks.click();
await expect(page).toHaveURL('https://demoqa.com/elements');

const linksMenu = page.locator('li#item-5').filter({ hasText: /^Links$/ });
await expect(linksMenu).toBeVisible();
await linksMenu.click();
await expect(page).toHaveURL(/\/links$/);

//links kısmında home linkine tıklayınca yeni bir sayfaya yönlendirildiğini kontrol edeceğim.
const [newPage] = await Promise.all([
  page.context().waitForEvent('page'),
  page.locator('#simpleLink').click()
]);
await newPage.waitForLoadState();
await expect(newPage).toHaveURL('https://demoqa.com/');

//links kısmında HomeYNWCv linkine tıklayınca yeni bir sayfaya yönlendirildiğini kontrol edeceğim.
const [newPage2] = await Promise.all([
  page.context().waitForEvent('page'),
  page.locator('#dynamicLink').click()
]);
await newPage2.waitForLoadState();
await expect(newPage2).toHaveURL('https://demoqa.com/');

//links kısmında Created linkine tıklayınca alt kısımda "Link has responded with staus 201 and status text Created" yazısı görünecek. kontrol edeceğim.
await page.locator('#created').click();
await expect(page.locator('#linkResponse')).toBeVisible();
await expect(page.locator('#linkResponse')).toContainText('Link has responded with staus 201 and status text Created');

//links kısmında No Content linkine tıklayınca alt kısımda "Link has responded with staus 204 and status text No Content" yazısı görünecek. kontrol edeceğim.
await page.locator('#no-content').click();
await expect(page.locator('#linkResponse')).toBeVisible();
await expect(page.locator('#linkResponse')).toContainText('Link has responded with staus 204 and status text No Content');

//links kısmında Moved linkine tıklayınca alt kısımda "Link has responded with staus 301 and status text Moved Permanently" yazısı görünecek. kontrol edeceğim.
await page.locator('#moved').click();
await expect(page.locator('#linkResponse')).toBeVisible();
await expect(page.locator('#linkResponse')).toContainText('Link has responded with staus 301 and status text Moved Permanently');

//forms alt başlıklarından practice form kısmına tıklayınca practice form kısmına yönlendirildiğini kontrol edeceğim.
await page.goto('https://demoqa.com/');
const formsCard = page.locator('.card-body:has-text("Forms")');
await expect(formsCard).toBeVisible();
await formsCard.click();
await expect(page).toHaveURL('https://demoqa.com/forms');

const practiceFormMenu = page.locator('li#item-0').filter({ hasText: /^Practice Form$/ });
await expect(practiceFormMenu).toBeVisible();
await practiceFormMenu.click();
await expect(page).toHaveURL(/\/automation-practice-form$/);



});

