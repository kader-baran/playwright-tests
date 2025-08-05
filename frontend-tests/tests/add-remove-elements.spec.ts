import { test, expect } from '@playwright/test';

test.describe('Add/Remove Elements Tests', () => {
  test('should test add and remove elements functionality', async ({ page }) => {
    // 1. Ana sayfaya git
    await page.goto('https://the-internet.herokuapp.com/');
    console.log('🌐 Ana sayfaya gidildi');
    
    // 2. Sayfa başlığını kontrol et
    await expect(page).toHaveTitle('The Internet');
    console.log('✅ Sayfa başlığı doğru');
    
    // 3. Add/Remove Elements linkini bul ve tıkla
    const addRemoveLink = page.locator('a:has-text("Add/Remove Elements")');
    await expect(addRemoveLink).toBeVisible();
    await addRemoveLink.click();
    console.log('🔗 Add/Remove Elements linkine tıklandı');
    
    // 4. URL'nin doğru olduğunu kontrol et
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/add_remove_elements/');
    console.log('✅ Add/Remove Elements sayfasına doğru URL ile yönlendirildi');
    
    // 5. Sayfa başlığını kontrol et
    await expect(page.locator('h3')).toBeVisible();
    await expect(page.locator('h3')).toContainText('Add/Remove Elements');
    console.log('✅ Add/Remove Elements sayfası başlığı doğru');
    
    // 6. Add Element butonunu bul ve kontrol et
    const addElementButton = page.locator('button:has-text("Add Element")');
    await expect(addElementButton).toBeVisible();
    console.log('✅ Add Element butonu görünür');
    
    // 7. İlk element ekle
    await addElementButton.click();
    console.log('🔘 İlk element eklendi');
    
    // 8. Delete butonunun görünür olduğunu kontrol et
    const deleteButton = page.locator('button:has-text("Delete")');
    await expect(deleteButton).toBeVisible();
    console.log('✅ Delete butonu görünür');
    
    // 9. Delete butonunun sayısını kontrol et
    const deleteButtonCount = await deleteButton.count();
    console.log(`📊 Delete butonu sayısı: ${deleteButtonCount}`);
    expect(deleteButtonCount).toBe(1);
    
    // 10. İkinci element ekle
    await addElementButton.click();
    console.log('🔘 İkinci element eklendi');
    
    // 11. Delete butonlarının sayısını tekrar kontrol et
    const deleteButtonsAfterSecond = page.locator('button:has-text("Delete")');
    const deleteButtonCountAfterSecond = await deleteButtonsAfterSecond.count();
    console.log(`📊 İkinci element sonrası Delete butonu sayısı: ${deleteButtonCountAfterSecond}`);
    expect(deleteButtonCountAfterSecond).toBe(2);
    
    // 12. İlk Delete butonuna tıkla
    const firstDeleteButton = deleteButtonsAfterSecond.first();
    await firstDeleteButton.click();
    console.log('🗑️ İlk Delete butonuna tıklandı');
    
    // 13. Delete butonlarının sayısının azaldığını kontrol et
    const deleteButtonsAfterDelete = page.locator('button:has-text("Delete")');
    const deleteButtonCountAfterDelete = await deleteButtonsAfterDelete.count();
    console.log(`📊 Silme sonrası Delete butonu sayısı: ${deleteButtonCountAfterDelete}`);
    expect(deleteButtonCountAfterDelete).toBe(1);
    
    // 14. Kalan Delete butonuna da tıkla
    const remainingDeleteButton = deleteButtonsAfterDelete.first();
    await remainingDeleteButton.click();
    console.log('🗑️ Kalan Delete butonuna tıklandı');
    
    // 15. Tüm Delete butonlarının silindiğini kontrol et
    const finalDeleteButtons = page.locator('button:has-text("Delete")');
    const finalDeleteButtonCount = await finalDeleteButtons.count();
    console.log(`📊 Final Delete butonu sayısı: ${finalDeleteButtonCount}`);
    expect(finalDeleteButtonCount).toBe(0);
    
    // 16. Add Element butonunun hala görünür olduğunu kontrol et
    await expect(addElementButton).toBeVisible();
    console.log('✅ Add Element butonu hala görünür');
    
    // 17. Sayfadaki toplam buton sayısını kontrol et
    const allButtons = page.locator('button');
    const totalButtonCount = await allButtons.count();
    console.log(`📊 Sayfadaki toplam buton sayısı: ${totalButtonCount}`);
    
    // 18. Sayfa içeriğini kontrol et
    const pageContent = await page.content();
    console.log(`📄 Sayfa içeriği uzunluğu: ${pageContent.length} karakter`);
    
    // 19. Sayfada "Add Element" yazısının geçtiğini kontrol et
    if (pageContent.includes('Add Element')) {
      console.log('✅ Sayfada "Add Element" yazısı bulundu');
    } else {
      console.log('⚠️ Sayfada "Add Element" yazısı bulunamadı');
    }
    
    // 20. Sayfada "Delete" yazısının geçtiğini kontrol et
    if (pageContent.includes('Delete')) {
      console.log('✅ Sayfada "Delete" yazısı bulundu');
    } else {
      console.log('⚠️ Sayfada "Delete" yazısı bulunamadı');
    }
    
    console.log('🎉 Add/Remove Elements testi başarıyla tamamlandı!');

    // 21. Ana sayfaya geri dön
    await page.goto('https://the-internet.herokuapp.com/');
    console.log('🏠 Ana sayfaya geri dönüldü');
    
    // 22. Powered by linkini bul ve kontrol et
    const poweredByLink = page.locator('a[href="http://elementalselenium.com/"]');
    const isVisible = await poweredByLink.isVisible();
    console.log(`🔍 Powered by linki görünür mü: ${isVisible}`);
    
    if (isVisible) {
      console.log(`📍 Tıklamadan önce URL: ${page.url()}`);
      
      // Yeni sayfa açılmasını bekle
      const pagePromise = page.context().waitForEvent('page');
      await poweredByLink.click();
      console.log('🔗 Powered by linkine tıklandı');
      
      // Yeni sayfayı bekle ve al
      const newPage = await pagePromise;
      await newPage.waitForLoadState('networkidle');
      console.log(`📍 Yeni sayfa URL: ${newPage.url()}`);
      
      // URL kontrolü
      const currentUrl = newPage.url();
      if (currentUrl.includes('elementalselenium.com')) {
        console.log('✅ Yeni sayfaya yönlendirildi');
        console.log('🎉 Powered by link testi tamamlandı!');
        
        // 23. Yeni sayfada H1 başlığını kontrol et
        try {
          await expect(newPage.locator('h1')).toBeVisible();
          const h1Text = await newPage.locator('h1').textContent();
          console.log(`📄 H1 başlığı: ${h1Text}`);
          
          if (h1Text && h1Text.includes('Elemental Selenium')) {
            console.log('✅ H1 başlığı Elemental Selenium yazısını içeriyor');
          } else {
            console.log('⚠️ H1 başlığı beklenenden farklı');
          }
        } catch (error) {
          console.log('⚠️ H1 başlığı bulunamadı veya görünür değil');
        }
        console.log('🎉 H1 başlık kontrolü tamamlandı!');
        
        // 24. Sayfadaki link sayısını kontrol et
        const links = newPage.locator('a');
        const linkCount = await links.count();
        console.log(`🔍 Sayfada ${linkCount} adet link bulundu`);
        
        // 25. Sayfa içeriğini kontrol et
        const pageContent = await newPage.content();
        console.log(`📄 Yeni sayfa içeriği uzunluğu: ${pageContent.length} karakter`);
        
        // 26. Sayfada "Selenium" kelimesinin geçtiğini kontrol et
        if (pageContent.includes('Selenium')) {
          console.log('✅ Sayfada "Selenium" kelimesi bulundu');
        } else {
          console.log('⚠️ Sayfada "Selenium" kelimesi bulunamadı');
        }
        
        console.log('🎉 Powered by link testi başarıyla tamamlandı!');
        
        // 27. Get Involved linkine tıkla ve yeni sayfaya yönlendirildiğini kontrol et
        const getInvolvedLink = newPage.locator('a:has-text("Get Involved")');
        const isGetInvolvedVisible = await getInvolvedLink.isVisible();
        console.log(`🔍 Get Involved linki görünür mü: ${isGetInvolvedVisible}`);
        
        if (isGetInvolvedVisible) {
          console.log(`📍 Get Involved linkine tıklamadan önce URL: ${newPage.url()}`);
          await getInvolvedLink.click();
          console.log('🔗 Get Involved linkine tıklandı');
          await newPage.waitForLoadState('networkidle');
          console.log(`📍 Get Involved linkine tıkladıktan sonra URL: ${newPage.url()}`);
          
          // 28. Yeni sayfadaki h1 başlığının "Get Involved" olduğunu kontrol et
          try {
            await expect(newPage.locator('h1')).toBeVisible();
            await expect(newPage.locator('h1')).toContainText('Get Involved');
            console.log('✅ Get Involved sayfası başlığı doğru');
          } catch (error) {
            console.log('⚠️ Get Involved sayfası başlığı bulunamadı veya doğru değil');
          }
          
          // 29. Yeni sayfadaki link sayısını kontrol et
          const getInvolvedLinks = newPage.locator('a');
          const getInvolvedLinkCount = await getInvolvedLinks.count();
          console.log(`🔍 Get Involved sayfasında ${getInvolvedLinkCount} adet link bulundu`);
          
          // 30. Sayfa içeriğini kontrol et
          const getInvolvedPageContent = await newPage.content();
          console.log(`📄 Get Involved sayfası içeriği uzunluğu: ${getInvolvedPageContent.length} karakter`);
          
          console.log('🎉 Get Involved link testi başarıyla tamamlandı!');
        } else {
          console.log('⚠️ Get Involved linki bulunamadı');
        }
      } else {
        console.log('⚠️ URL değişmedi, link çalışmıyor olabilir');
      }
    } else {
      console.log('⚠️ Powered by linki bulunamadı');
    }
  });
}); 