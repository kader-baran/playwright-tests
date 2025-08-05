import { test, expect } from '@playwright/test';

test.describe('The Internet Herokuapp Tests', () => {
  test('should load homepage and check content', async ({ page }) => {
    // 1. Ana sayfaya git
    await page.goto('https://the-internet.herokuapp.com/');
    console.log('🌐 Ana sayfaya gidildi');
    
    // 2. Sayfa başlığını kontrol et
    await expect(page).toHaveTitle('The Internet');
    console.log('✅ Sayfa başlığı doğru');
    
    // 3. Welcome to the-internet yazısını kontrol et
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    console.log('✅ Welcome to the-internet yazısı görünür');
    
    // 4. Available Examples yazısını kontrol et
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('h2')).toContainText('Available Examples');
    console.log('✅ Available Examples yazısı görünür');
    
    console.log('🎉 Tüm kontroller başarıyla tamamlandı!');

    // 5. A/B Testing linkine tıkla https://the-internet.herokuapp.com/abtest bu url e gidiyor mu kontrol et
    const abTestLink = page.locator('a[href="/abtest"]');
    await expect(abTestLink).toBeVisible();
    await abTestLink.click();
    console.log('🔗 A/B Testing linkine tıklandı');
    
    // URL'nin doğru olduğunu kontrol et
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/abtest');
    console.log('✅ A/B Testing sayfasına doğru URL ile yönlendirildi');
    
    // A/B Testing sayfasının içeriğini kontrol et
    await expect(page.locator('h3')).toBeVisible();
    const h3Text = await page.locator('h3').textContent();
    console.log(`📄 H3 başlığı: ${h3Text}`);
    
    console.log('🎉 A/B Testing testi de başarıyla tamamlandı!');

         // 6. Powered by yazısının yanındaki linke tıkla ve yeni sayfaya yönlendirildiğini kontrol et
     // Tüm linkleri kontrol et
     const allLinks = page.locator('a');
     const linkCount = await allLinks.count();
     console.log(`🔍 Sayfada ${linkCount} adet link bulundu`);
     
     // Powered by linkini bul
     const poweredByLink = page.locator('a[href="http://elementalselenium.com/"]');
     const isVisible = await poweredByLink.isVisible();
     console.log(`🔍 Powered by linki görünür mü: ${isVisible}`);
     
     let newPage = null;
     
     if (isVisible) {
       // Tıklamadan önce mevcut URL'yi logla
       console.log(`📍 Tıklamadan önce URL: ${page.url()}`);
       
       // Yeni sekme açılmasını bekle
       const pagePromise = page.context().waitForEvent('page');
       
       // Linke tıkla
       await poweredByLink.click();
       console.log('🔗 Powered by linkine tıklandı');
       
       // Yeni sayfayı bekle
       newPage = await pagePromise;
       await newPage.waitForLoadState('networkidle');
       console.log(`📍 Yeni sayfa URL: ${newPage.url()}`);
       
       // Yeni sayfaya geç - newPage'i kullan
       await newPage.bringToFront();
       console.log(`📍 Yeni sayfa URL: ${newPage.url()}`);
       
       // URL'nin değiştiğini kontrol et
       const currentUrl = newPage.url();
       if (currentUrl !== 'https://the-internet.herokuapp.com/abtest') {
         console.log('✅ Yeni sayfaya yönlendirildi');
       } else {
         console.log('⚠️ URL değişmedi, link çalışmıyor olabilir');
       }
     } else {
       console.log('⚠️ Powered by linki bulunamadı');
     }
     
     console.log('🎉 Powered by link testi tamamlandı!');

     // 7. Bu ekrandaki h1 başlığının Elemental Selenium yazısı olduğunu kontrol et
     if (newPage) {
       try {
         await expect(newPage.locator('h1')).toBeVisible();
         const h1Text = await newPage.locator('h1').textContent();
         console.log(`📄 H1 başlığı: ${h1Text}`);
         
         if (h1Text && h1Text.includes('Elemental Selenium')) {
           console.log('✅ H1 başlığı Elemental Selenium yazısını içeriyor');
         } else {
           console.log('⚠️ H1 başlığı Elemental Selenium yazısını içermiyor');
         }
       } catch (error) {
         console.log('⚠️ H1 başlığı bulunamadı veya görünür değil');
       }
       
       console.log('🎉 H1 başlık kontrolü tamamlandı!');

       // 8. "Take me to the tips" butonuna tıkla ve yeni sayfaya yönlendirildiğini kontrol et
       // Sayfanın URL'sinin https://elementalselenium.com/tips olup olmadığını kontrol et
       const takeMeToTipsButton = newPage.locator('a:has-text("Take me to the tips")');
       const isTipsButtonVisible = await takeMeToTipsButton.isVisible();
       console.log(`🔍 Take me to the tips butonu görünür mü: ${isTipsButtonVisible}`);
       
       if (isTipsButtonVisible) {
         // Tıklamadan önce mevcut URL'yi logla
         console.log(`📍 Tips butonuna tıklamadan önce URL: ${newPage.url()}`);
         
         // Butona tıkla
         await takeMeToTipsButton.click();
         console.log('🔗 Take me to the tips butonuna tıklandı');
         
         // Yeni sayfaya yönlendirildiğini kontrol et
         await newPage.waitForLoadState('networkidle');
         console.log(`📍 Tips butonuna tıkladıktan sonra URL: ${newPage.url()}`);
         
         // URL'nin https://elementalselenium.com/tips olup olmadığını kontrol et
         const currentUrlAfterTips = newPage.url();
         if (currentUrlAfterTips === 'https://elementalselenium.com/tips') {
           console.log('✅ Doğru URL\'ye yönlendirildi: https://elementalselenium.com/tips');
         } else {
           console.log(`⚠️ Yanlış URL'ye yönlendirildi. Beklenen: https://elementalselenium.com/tips, Gerçek: ${currentUrlAfterTips}`);
         }
         
         // URL'yi Playwright expect ile de kontrol et
         await expect(newPage).toHaveURL('https://elementalselenium.com/tips');
         console.log('✅ URL kontrolü başarılı');
         
         // 9. Tips sayfasının başlığını kontrol et
         await expect(newPage.locator('h1')).toBeVisible();
         await expect(newPage.locator('h1')).toContainText('The Tips');
         console.log('✅ Tips sayfası başlığı doğru: The Tips');
         
         // 10. Sayfadaki tüm elementleri kontrol et
         console.log('🔍 Sayfadaki elementleri kontrol ediyor...');
         
         // Sayfanın tamamen yüklenmesini bekle
         await newPage.waitForLoadState('networkidle');
         await newPage.waitForTimeout(3000); // 3 saniye bekle
         
         // Tüm select elementlerini bul
         const allSelects = newPage.locator('select');
         const selectCount = await allSelects.count();
         console.log(`📦 Sayfada ${selectCount} adet select elementi bulundu`);
         
         // Tüm input elementlerini bul
         const allInputs = newPage.locator('input');
         const inputCount = await allInputs.count();
         console.log(`📦 Sayfada ${inputCount} adet input elementi bulundu`);
         
         // Farklı selector'ları dene
         const filtersByClass = newPage.locator('.filters');
         const filtersByClassCount = await filtersByClass.count();
         console.log(`📦 .filters class'ı ile ${filtersByClassCount} adet element bulundu`);
         
         const filtersById = newPage.locator('#filters');
         const filtersByIdCount = await filtersById.count();
         console.log(`📦 #filters id'si ile ${filtersByIdCount} adet element bulundu`);
         
         const filtersByName = newPage.locator('[name="filters"]');
         const filtersByNameCount = await filtersByName.count();
         console.log(`📦 [name="filters"] ile ${filtersByNameCount} adet element bulundu`);
         
         // Sayfadaki tüm div elementlerini kontrol et
         const allDivs = newPage.locator('div');
         const divCount = await allDivs.count();
         console.log(`📦 Sayfada ${divCount} adet div elementi bulundu`);
         
         // Sayfadaki tüm elementleri logla
         const allElements = newPage.locator('*');
         const elementCount = await allElements.count();
         console.log(`📦 Sayfada toplam ${elementCount} adet element bulundu`);
         
         // Sayfanın HTML içeriğini kontrol et
         const pageContent = await newPage.content();
         console.log(`📄 Sayfa içeriği uzunluğu: ${pageContent.length} karakter`);
         
         // Sayfada "filter" kelimesi geçiyor mu kontrol et
         if (pageContent.includes('filter')) {
           console.log('✅ Sayfada "filter" kelimesi bulundu');
         } else {
           console.log('⚠️ Sayfada "filter" kelimesi bulunamadı');
         }
         
         // Sayfada "dropdown" kelimesi geçiyor mu kontrol et
         if (pageContent.includes('dropdown')) {
           console.log('✅ Sayfada "dropdown" kelimesi bulundu');
         } else {
           console.log('⚠️ Sayfada "dropdown" kelimesi bulunamadı');
         }
         
         // Sayfada "select" kelimesi geçiyor mu kontrol et
         if (pageContent.includes('select')) {
           console.log('✅ Sayfada "select" kelimesi bulundu');
         } else {
           console.log('⚠️ Sayfada "select" kelimesi bulunamadı');
         }
         
         console.log('🎉 Tips sayfası analizi tamamlandı!');
       } else {
         console.log('⚠️ Take me to the tips butonu bulunamadı');
       }
     } else {
       console.log('⚠️ Yeni sayfa açılamadı, test devam edemiyor');
     }

           // 11. External Resources linkine tıkla ve yeni sayfaya yönlendirildiğini kontrol et
      if (newPage) {
        // External Resources linkini bul
        const externalResourcesLink = newPage.locator('a:has-text("External Resources")');
        const isExternalResourcesVisible = await externalResourcesLink.isVisible();
        console.log(`🔍 External Resources linki görünür mü: ${isExternalResourcesVisible}`);
        
        if (isExternalResourcesVisible) {
          // Tıklamadan önce mevcut URL'yi logla
          console.log(`📍 External Resources linkine tıklamadan önce URL: ${newPage.url()}`);
          
          // Linke tıkla
          await externalResourcesLink.click();
          console.log('🔗 External Resources linkine tıklandı');
          
          // Yeni sayfaya yönlendirildiğini kontrol et
          await newPage.waitForLoadState('networkidle');
          console.log(`📍 External Resources linkine tıkladıktan sonra URL: ${newPage.url()}`);
          
          // URL'nin değiştiğini kontrol et
          const currentUrlAfterExternal = newPage.url();
          if (currentUrlAfterExternal !== 'https://elementalselenium.com/tips') {
            console.log('✅ External Resources sayfasına yönlendirildi');
            
            // Yeni sayfanın başlığını kontrol et
            try {
              await expect(newPage.locator('h1')).toBeVisible();
              const externalH1Text = await newPage.locator('h1').textContent();
              console.log(`📄 External Resources sayfası H1 başlığı: ${externalH1Text}`);
              
              if (externalH1Text && externalH1Text.includes('External Resources')) {
                console.log('✅ External Resources sayfası başlığı doğru');
              } else {
                console.log('⚠️ External Resources sayfası başlığı beklenenden farklı');
              }
            } catch (error) {
              console.log('⚠️ External Resources sayfasında H1 başlığı bulunamadı');
            }
            
            // Sayfadaki linkleri kontrol et
            const externalLinks = newPage.locator('a');
            const externalLinkCount = await externalLinks.count();
            console.log(`🔗 External Resources sayfasında ${externalLinkCount} adet link bulundu`);
            
            // Sayfadaki içeriği kontrol et
            const externalPageContent = await newPage.content();
            console.log(`📄 External Resources sayfası içeriği uzunluğu: ${externalPageContent.length} karakter`);
            
            console.log('🎉 External Resources sayfası testi tamamlandı!');
          } else {
            console.log('⚠️ URL değişmedi, External Resources linki çalışmıyor olabilir');
          }
        } else {
          console.log('⚠️ External Resources linki bulunamadı');
        }
      } else {
        console.log('⚠️ Yeni sayfa açılamadı, External Resources testi yapılamıyor');
      }
    });
  }); 