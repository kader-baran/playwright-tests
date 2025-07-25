import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { logStep } from '../utils/logger'; 

test('Siteye gidip currentUrl kontrolü ve Elements kartına tıklama', async ({ page }) => {
  const homePage = new HomePage(page);

  logStep('Ana sayfaya gidiliyor');
  await homePage.goto();

  logStep('Current URL kontrol ediliyor');
  await homePage.expectOnHomePage();

  logStep('Elements kartına tıklanıyor');
  await homePage.clickElementsCard();

  logStep('Elements kartına tıklandıktan sonra /elements URL kontrol ediliyor');
  await expect(page).toHaveURL('https://demoqa.com/elements');

  logStep('Text Box elementine tıklanıyor');
  await page.click('li#item-0'); // veya: await page.click('span.text', { hasText: 'Text Box' })

  logStep('Text Box sayfası URL kontrol ediliyor');
  await expect(page).toHaveURL('https://demoqa.com/text-box');
  
  logStep('Text Box başlığı görünüyor mu kontrol ediliyor');
  await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

  logStep('Full Name alanına "kader" giriliyor ve kontrol ediliyor');
  await page.fill('#userName', 'kader');
  await expect(page.locator('#userName')).toHaveValue('kader');

  logStep('Email alanına "kader@getmobil.com" giriliyor ve kontrol ediliyor');
  await page.fill('#userEmail', 'kader@getmobil.com');
  await expect(page.locator('#userEmail')).toHaveValue('kader@getmobil.com');

  logStep('Permanent Address alanına "permanent address" giriliyor ve kontrol ediliyor');
  await page.fill('#permanentAddress', 'permanent address');
  await expect(page.locator('#permanentAddress')).toHaveValue('permanent address');
}); 

//Text Box'a tıklandıktan sonra ekranda Text Box yazısı görünüyor mu kontrol edeceğim.
//fullname kader olarak girilmeli. bunu kontrol edeceğim.
//email kader@getmobil.com olarak girilmeli. bunu kontrol edeceğim.
//Permanent Address, permanent address olarak girilmeli. bunu kontrol edeceğim.