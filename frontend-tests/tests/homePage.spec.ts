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

  logStep('Check Box elementine tıklanıyor ve başlık kontrol ediliyor');
  await page.click('li#item-1');
  await expect(page.getByRole('heading', { name: 'Check Box' })).toBeVisible();

  logStep('Home kartına tıklanıyor ve "You have selected :" ifadesi kontrol ediliyor');
  await page.locator('span.rct-title', { hasText: 'Home' }).click();
  await expect(page.locator('.text-success')).toContainText('You have selected');

  logStep('+ butonuna tıklanıyor ve yeni kartlar ekleniyor mu kontrol ediliyor');
  await page.click('button[title="Expand all"]');
  await expect(page.locator('span.rct-title', { hasText: 'Desktop' })).toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Documents' })).toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Downloads' })).toBeVisible();

  logStep('- butonuna tıklanıyor ve alt kartlar siliniyor mu kontrol ediliyor');
  await page.click('button[title="Collapse all"]');
  await expect(page.locator('span.rct-title', { hasText: 'Desktop' })).not.toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Documents' })).not.toBeVisible();
  await expect(page.locator('span.rct-title', { hasText: 'Downloads' })).not.toBeVisible();

  logStep('Radio Button elementine tıklanıyor ve URL kontrol ediliyor');
  await page.click('li#item-2');
  await expect(page).toHaveURL('https://demoqa.com/radio-button');

  logStep('Radio Button başlığı görünüyor mu kontrol ediliyor');
  await expect(page.getByRole('heading', { name: 'Radio Button' })).toBeVisible();

  logStep('Yes radio buttona tıklanıyor ve sonuç kontrol ediliyor');
  await page.click('label[for="yesRadio"]');
  await expect(page.locator('.text-success')).toHaveText('Yes');

  logStep('Impressive radio buttona tıklanıyor ve sonuç kontrol ediliyor');
  await page.click('label[for="impressiveRadio"]');
  await expect(page.locator('.text-success')).toHaveText('Impressive');

  logStep('No radio buttonunun pasif olduğu kontrol ediliyor');
  await expect(page.locator('#noRadio')).toBeDisabled();
}); 

// radio buttona tıklanınca https://demoqa.com/radio-button bu adrese gidiyor mu kontrol edeceğim
//ekranda radio button yazısı görünüyor mu kontrol edeceğim 
//yes radio buttona tıklanınca ekranda "You have selected Yes" yazısı görünüyor mu kontrol edeceğim
//impressive radio buttona tıklanınca ekranda "You have selected Impressive" yazısı görünüyor mu kontrol edeceğim
//no radio buttonu pasif olmalı. bunu kontrol edeceğim


