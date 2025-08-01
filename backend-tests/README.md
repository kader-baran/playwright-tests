# Backend API Tests - Page Object Model (POM) Structure

Bu proje, PetStore API'sini test etmek için Page Object Model (POM) mimarisini kullanır.

## 🏗️ **POM Mimarisi**

### **Katmanlı Yapı**
```
backend-tests/
├── pages/          # Page Objects - API işlemleri
├── data/           # Test Data - JSON dosyaları
└── tests/          # Test Logic - Test senaryoları
```

### **POM Avantajları**

#### **1. Separation of Concerns**
- **Pages**: API işlemleri ve doğrulama metodları
- **Data**: Test verileri ayrı dosyalarda
- **Tests**: Sadece test mantığı

#### **2. Reusability**
```typescript
// PetApiPage.ts
async createPet(petData: Pet) { ... }
async verifyPetCreated(response: any, expectedPet: Pet) { ... }

// Test dosyasında
const response = await petApiPage.createPet(petData);
await petApiPage.verifyPetCreated(response, petData);
```

#### **3. Maintainability**
- API değişikliklerinde sadece Page Object'leri güncelle
- Test verilerini JSON dosyalarında yönet
- Ortak metodları Base Page'de topla

#### **4. Readability**
```typescript
// POM ile temiz test yazımı
test('should create pet successfully', async () => {
  const petData = petApiPage.createTestData();
  const response = await petApiPage.createPet(petData);
  await petApiPage.verifyTestData(response, petData);
});
```

## 📁 **Dosya Yapısı**

### **Pages/**
- `ApiBasePage.ts` - Temel HTTP metodları
- `PetApiPage.ts` - Pet API işlemleri
- `StoreApiPage.ts` - Store API işlemleri
- `UserApiPage.ts` - User API işlemleri

### **Data/**
- `petTestData.json` - Pet test verileri
- `storeTestData.json` - Store test verileri
- `userTestData.json` - User test verileri

### **Tests/**
- `petApi.spec.ts` - Pet API testleri
- `storeApi.spec.ts` - Store API testleri
- `userApi.spec.ts` - User API testleri

## 🚀 **Kullanım**

### **Test Çalıştırma**
```bash
# Tüm backend testleri
npm run test:backend

# Belirli API testleri
npm run test:pet
npm run test:store
npm run test:user

# Debug modunda
npm run test:debug-pet
npm run test:debug-store
npm run test:debug-user
```

### **POM Metodları**

#### **Base Page Metodları**
```typescript
// HTTP metodları
await apiPage.get('/endpoint');
await apiPage.post('/endpoint', data);
await apiPage.put('/endpoint', data);
await apiPage.delete('/endpoint');

// Doğrulama metodları
await apiPage.expectStatus(response, 200);
await apiPage.expectSuccess(response);
await apiPage.expectError(response);
await apiPage.expectResponseField(response, 'field', value);
```

#### **Specific Page Metodları**
```typescript
// PetApiPage
const petData = petApiPage.createTestData();
await petApiPage.performFullCRUDTest(petData);
await petApiPage.performErrorTestCases();

// StoreApiPage
const orderData = storeApiPage.createTestData();
await storeApiPage.verifyOrderCreated(response, orderData);

// UserApiPage
const userData = userApiPage.createTestData();
await userApiPage.verifyUserCreated(response, userData);
```

## 🔧 **POM Standartları**

### **1. Base Page (ApiBasePage.ts)**
- Ortak HTTP metodları
- Genel doğrulama metodları
- Retry mekanizması
- Abstract metodlar (createTestData, verifyTestData)

### **2. Specific Pages**
- API'ye özel metodlar
- Doğrulama metodları
- Test verisi oluşturma metodları
- CRUD operasyon metodları

### **3. Test Files**
- Sadece test mantığı
- Page Object metodlarını kullan
- Test verilerini JSON'dan al
- Temiz ve okunabilir test senaryoları

## 📊 **Test Sonuçları**

### **Mevcut Durum**
- **Pet API**: 46/49 test geçiyor
- **Store API**: 11/12 test geçiyor
- **User API**: 18/18 test geçiyor ✅

### **POM Avantajları**
1. **Kod Tekrarını Önler** - Ortak metodlar Base Page'de
2. **Bakımı Kolaylaştırır** - API değişikliklerinde sadece Page Object güncelle
3. **Test Verilerini Ayırır** - JSON dosyalarında düzenli veri yönetimi
4. **Okunabilirliği Artırır** - Test dosyaları sadece test mantığı içerir
5. **Reusability Sağlar** - Page Object metodları farklı testlerde kullanılabilir

## 🎯 **Best Practices**

### **1. Page Object Tasarımı**
```typescript
// ✅ İyi POM yapısı
class PetApiPage extends ApiBasePage {
  async createPet(petData: Pet) { ... }
  async verifyPetCreated(response: any, expectedPet: Pet) { ... }
  createTestData(): Pet { ... }
  async verifyTestData(response: any, expectedData: Pet): Promise<void> { ... }
}
```

### **2. Test Yazımı**
```typescript
// ✅ POM ile temiz test
test('should create pet', async () => {
  const petData = petApiPage.createTestData();
  const response = await petApiPage.createPet(petData);
  await petApiPage.verifyTestData(response, petData);
});
```

### **3. Veri Yönetimi**
```json
// ✅ JSON dosyalarında test verisi
{
  "validPets": [...],
  "invalidPets": [...],
  "updateData": {...}
}
```

Bu POM yapısı sayesinde API testlerimiz daha organize, bakımı kolay ve yeniden kullanılabilir hale geldi! 🎉 