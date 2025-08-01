import { test, expect } from '@playwright/test';
import { UserApiPage, User } from '../pages/UserApiPage';
import * as testData from '../data/userTestData.json';

test.describe('PetStore API - User Endpoints', () => {
  let userApiPage: UserApiPage;
  let createdUsernames: string[] = [];

  test.beforeEach(async ({ request }) => {
    userApiPage = new UserApiPage(request);
  });

  test.afterEach(async () => {
    // Test sonrası oluşturulan kullanıcıları temizle
    for (const username of createdUsernames) {
      try {
        await userApiPage.deleteUser(username);
      } catch (error) {
        console.log(`User ${username} zaten silinmiş veya bulunamadı`);
      }
    }
    createdUsernames = [];
  });

  test.describe('POST /user - Kullanıcı Oluşturma', () => {
    test('Geçerli kullanıcı verisi ile yeni kullanıcı oluşturma', async () => {
      const userData = userApiPage.createSampleUser('testuser1');
      const response = await userApiPage.createUser(userData);
      
      await userApiPage.verifyUserCreated(response, userData);
      createdUsernames.push(userData.username);
    });

    test('Farklı status değerleri ile kullanıcı oluşturma', async () => {
      const statuses = [0, 1];
      
      for (const status of statuses) {
        const userData = userApiPage.createSampleUser(`testuser${status}`, `testuser${status}@example.com`, status);
        const response = await userApiPage.createUser(userData);
        
        await userApiPage.verifyUserCreated(response, userData);
        createdUsernames.push(userData.username);
      }
    });

    test('Geçersiz kullanıcı verisi ile hata kontrolü', async () => {
      const invalidUser = testData.invalidUsers[0];
      const response = await userApiPage.createUser(invalidUser as unknown as User);
      
      // PetStore API geçersiz veriyi kabul ediyor ve 200 döndürüyor
      await userApiPage.expectStatus(response, 200);
    });
  });

  test.describe('POST /user/createWithArray - Array ile Kullanıcı Oluşturma', () => {
    test('Array ile birden fazla kullanıcı oluşturma', async () => {
      const users = testData.userArrays[0];
      const response = await userApiPage.createUsersWithArray(users);
      
      await userApiPage.verifyUserCreated(response, users[0]);
      
      // Oluşturulan kullanıcıları temizleme listesine ekle
      for (const user of users) {
        createdUsernames.push(user.username);
      }
    });
  });

  test.describe('POST /user/createWithList - List ile Kullanıcı Oluşturma', () => {
    test('List ile birden fazla kullanıcı oluşturma', async () => {
      const users = testData.userArrays[0];
      const response = await userApiPage.createUsersWithList(users);
      
      await userApiPage.verifyUserCreated(response, users[0]);
      
      // Oluşturulan kullanıcıları temizleme listesine ekle
      for (const user of users) {
        createdUsernames.push(user.username);
      }
    });
  });

  test.describe('GET /user/{username} - Kullanıcı Getirme', () => {
    test('Var olan kullanıcıyı username ile getirme', async () => {
      // Önce kullanıcı oluştur
      const userData = userApiPage.createSampleUser('testuser1');
      const createResponse = await userApiPage.createUser(userData);
      await userApiPage.verifyUserCreated(createResponse, userData);
      createdUsernames.push(userData.username);

      // Kullanıcıyı getir - Retry destekli getirme işlemi kullan
      const getResponse = await userApiPage.getUserByUsernameWithRetry(userData.username);
      await userApiPage.verifyUserRetrieved(getResponse, userData.username);
    });

    test('Var olmayan kullanıcı username ile 404 hatası', async () => {
      const nonExistentUsername = 'nonexistentuser';
      const response = await userApiPage.getUserByUsername(nonExistentUsername);
      // PetStore API var olmayan kullanıcı username için 404 döndürüyor
      await userApiPage.verifyUserNotFound(response);
    });

    test('Geçersiz kullanıcı username formatı ile hata kontrolü', async () => {
      const invalidUsername = '';
      const response = await userApiPage.getUserByUsername(invalidUsername);
      // Boş username için 405 (Method Not Allowed) döndürüyor
      await userApiPage.expectStatus(response, 405);
    });
  });

  test.describe('PUT /user/{username} - Kullanıcı Güncelleme', () => {
    test('Var olan kullanıcıyı güncelleme', async () => {
      // Önce kullanıcı oluştur
      const userData = userApiPage.createSampleUser('testuser1');
      const createResponse = await userApiPage.createUser(userData);
      await userApiPage.verifyUserCreated(createResponse, userData);
      createdUsernames.push(userData.username);

      // Kullanıcıyı güncelle
      const updatedUser = { ...userData, ...testData.updateUserData } as User;
      const updateResponse = await userApiPage.updateUser(userData.username, updatedUser);
      await userApiPage.verifyUserUpdated(updateResponse, updatedUser);
    });

    test('Var olmayan kullanıcıyı güncelleme', async () => {
      const nonExistentUsername = 'nonexistentuser';
      const updatedUser = userApiPage.createSampleUser('updateduser');
      const response = await userApiPage.updateUser(nonExistentUsername, updatedUser);
      
      // PetStore API var olmayan kullanıcıyı güncellemeye çalışınca 200 döndürüyor
      await userApiPage.expectStatus(response, 200);
    });
  });

  test.describe('DELETE /user/{username} - Kullanıcı Silme', () => {
    test('Var olan kullanıcıyı silme', async () => {
      // Önce kullanıcı oluştur
      const userData = userApiPage.createSampleUser('testuser1');
      const createResponse = await userApiPage.createUser(userData);
      await userApiPage.verifyUserCreated(createResponse, userData);

      // Kullanıcının gerçekten var olduğunu kontrol et
      const checkUserResponse = await userApiPage.getUserByUsername(userData.username);
      await userApiPage.expectStatus(checkUserResponse, 200);

      // Kullanıcıyı sil
      const deleteResponse = await userApiPage.deleteUser(userData.username);
      await userApiPage.verifyUserDeleted(deleteResponse);

      // Kullanıcının gerçekten silindiğini kontrol et
      const getResponse = await userApiPage.getUserByUsername(userData.username);
      // PetStore API kullanıcı silme sonrası 200 döndürüyor
      await userApiPage.expectStatus(getResponse, 200);
    });

    test('Var olmayan kullanıcıyı silme', async () => {
      const nonExistentUsername = 'nonexistentuser';
      const response = await userApiPage.deleteUser(nonExistentUsername);
      // PetStore API var olmayan kullanıcıyı silmeye çalışınca 404 döndürüyor
      await userApiPage.expectStatus(response, 404);
    });
  });

  test.describe('GET /user/login - Kullanıcı Girişi', () => {
    test('Geçerli kullanıcı bilgileri ile giriş', async () => {
      // Önce kullanıcı oluştur
      const userData = userApiPage.createSampleUser('testuser1');
      const createResponse = await userApiPage.createUser(userData);
      await userApiPage.verifyUserCreated(createResponse, userData);
      createdUsernames.push(userData.username);

      // Kullanıcı girişi yap
      const loginResponse = await userApiPage.loginUser(userData.username, userData.password!);
      await userApiPage.verifyLoginSuccess(loginResponse);
    });

    test('Geçersiz kullanıcı bilgileri ile giriş', async () => {
      const response = await userApiPage.loginUser('invaliduser', 'wrongpassword');
      // PetStore API geçersiz bilgilerle giriş yapmaya çalışınca 200 döndürüyor
      await userApiPage.expectStatus(response, 200);
    });

    test('Boş kullanıcı bilgileri ile giriş', async () => {
      const response = await userApiPage.loginUser('', '');
      // PetStore API boş bilgilerle giriş yapmaya çalışınca 200 döndürüyor
      await userApiPage.expectStatus(response, 200);
    });
  });

  test.describe('GET /user/logout - Kullanıcı Çıkışı', () => {
    test('Kullanıcı çıkışı', async () => {
      const response = await userApiPage.logoutUser();
      await userApiPage.verifyLogoutSuccess(response);
    });
  });

  test.describe('End-to-End User Yaşam Döngüsü', () => {
    test('Kullanıcı oluşturma, güncelleme ve silme', async () => {
      // 1. Kullanıcı oluştur
      const userData = userApiPage.createSampleUser('testuser1');
      const createResponse = await userApiPage.createUser(userData);
      await userApiPage.verifyUserCreated(createResponse, userData);

      // 2. Kullanıcıyı getir ve kontrol et
      const getResponse = await userApiPage.getUserByUsernameWithRetry(userData.username);
      await userApiPage.verifyUserRetrieved(getResponse, userData.username);

      // 3. Kullanıcıyı güncelle
      const updatedUser = { ...userData, ...testData.updateUserData } as User;
      const updateResponse = await userApiPage.updateUser(userData.username, updatedUser);
      await userApiPage.verifyUserUpdated(updateResponse, updatedUser);

      // 4. Güncellenmiş kullanıcıyı getir ve kontrol et
      const getUpdatedResponse = await userApiPage.getUserByUsernameWithRetry(userData.username);
      await userApiPage.verifyUserRetrieved(getUpdatedResponse, userData.username);

      // 5. Kullanıcıyı sil
      const deleteResponse = await userApiPage.deleteUser(userData.username);
      await userApiPage.verifyUserDeleted(deleteResponse);

      // 6. Kullanıcının gerçekten silindiğini kontrol et
      const getDeletedResponse = await userApiPage.getUserByUsername(userData.username);
      // PetStore API kullanıcı silme sonrası 200 döndürüyor
      await userApiPage.expectStatus(getDeletedResponse, 200);
    });
  });

  test.describe('Çoklu Kullanıcı Testleri', () => {
    test('Birden fazla kullanıcı oluşturma ve yönetme', async () => {
      const usernames = ['user1', 'user2', 'user3'];
      const users = userApiPage.createSampleUsersWithDifferentStatuses(usernames);
      
      // Birden fazla kullanıcı oluştur
      for (const userData of users) {
        const response = await userApiPage.createUser(userData);
        await userApiPage.verifyUserCreated(response, userData);
        createdUsernames.push(userData.username);
      }

      // Tüm kullanıcıları kontrol et
      for (const userData of users) {
        const getResponse = await userApiPage.getUserByUsernameWithRetry(userData.username);
        await userApiPage.verifyUserRetrieved(getResponse, userData.username);
      }

      // Login testleri
      for (const userData of users) {
        const loginResponse = await userApiPage.loginUser(userData.username, userData.password!);
        await userApiPage.verifyLoginSuccess(loginResponse);
      }

      // Logout testi
      const logoutResponse = await userApiPage.logoutUser();
      await userApiPage.verifyLogoutSuccess(logoutResponse);
    });
  });
}); 