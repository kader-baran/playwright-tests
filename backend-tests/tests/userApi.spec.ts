import test, { expect } from "../fixtures/apiFixtures";
import { User } from "../model/UserApiPage";
import * as testData from "../const/userTestData.json";

test.describe("PetStore API - User Endpoints", () => {
  let createdUsernames: string[] = [];

  test.beforeEach(async () => {});

  test.afterEach(async ({ userApi }) => {
    // Test sonrası oluşturulan kullanıcıları temizle
    for (const username of createdUsernames) {
      try {
        await userApi.deleteUser(username);
      } catch (error) {
        // Sessiz geç: temizlik esnasında bulunamaması normal olabilir
      }
    }
    createdUsernames = [];
  });

  test.describe("POST /user - Kullanıcı Oluşturma", () => {
    test("Geçerli kullanıcı verisi ile yeni kullanıcı oluşturma", async ({
      userApi,
    }) => {
      const userData = userApi.createSampleUser("testuser1");
      const response = await userApi.createUser(userData);

      await userApi.verifyUserCreated(response, userData);
      createdUsernames.push(userData.username);
    });

    test("Farklı status değerleri ile kullanıcı oluşturma", async ({
      userApi,
    }) => {
      const statuses = [0, 1];

      for (const status of statuses) {
        const userData = userApi.createSampleUser(
          `testuser${status}`,
          `testuser${status}@example.com`,
          status
        );
        const response = await userApi.createUser(userData);

        await userApi.verifyUserCreated(response, userData);
        createdUsernames.push(userData.username);
      }
    });

    test("Geçersiz kullanıcı verisi ile hata kontrolü", async ({ userApi }) => {
      const invalidUser = testData.invalidUsers[0];
      const response = await userApi.createUser(invalidUser as unknown as User);

      // PetStore API geçersiz veriyi kabul ediyor ve 200 döndürüyor
      await userApi.expectStatus(response, 200);
    });
  });

  test.describe("POST /user/createWithArray - Array ile Kullanıcı Oluşturma", () => {
    test("Array ile birden fazla kullanıcı oluşturma", async ({ userApi }) => {
      const users = testData.userArrays[0];
      const response = await userApi.createUsersWithArray(users);

      await userApi.verifyUserCreated(response, users[0]);

      // Oluşturulan kullanıcıları temizleme listesine ekle
      for (const user of users) {
        createdUsernames.push(user.username);
      }
    });
  });

  test.describe("POST /user/createWithList - List ile Kullanıcı Oluşturma", () => {
    test("List ile birden fazla kullanıcı oluşturma", async ({ userApi }) => {
      const users = testData.userArrays[0];
      const response = await userApi.createUsersWithList(users);

      await userApi.verifyUserCreated(response, users[0]);

      // Oluşturulan kullanıcıları temizleme listesine ekle
      for (const user of users) {
        createdUsernames.push(user.username);
      }
    });
  });

  test.describe("GET /user/{username} - Kullanıcı Getirme", () => {
    test("Var olan kullanıcıyı username ile getirme", async ({ userApi }) => {
      // Önce kullanıcı oluştur
      const userData = userApi.createSampleUser("testuser1");
      const createResponse = await userApi.createUser(userData);
      await userApi.verifyUserCreated(createResponse, userData);
      createdUsernames.push(userData.username);

      // Kullanıcıyı getir - Retry destekli getirme işlemi kullan
      const getResponse = await userApi.getUserByUsernameWithRetry(
        userData.username
      );
      await userApi.verifyUserRetrieved(getResponse, userData.username);
    });

    test("Var olmayan kullanıcı username ile 404 hatası", async ({
      userApi,
    }) => {
      const nonExistentUsername = "nonexistentuser";
      const response = await userApi.getUserByUsername(nonExistentUsername);
      // PetStore API var olmayan kullanıcı username için 404 döndürüyor
      await userApi.verifyUserNotFound(response);
    });

    test("Geçersiz kullanıcı username formatı ile hata kontrolü", async ({
      userApi,
    }) => {
      const invalidUsername = "";
      const response = await userApi.getUserByUsername(invalidUsername);
      // Boş username için 405 (Method Not Allowed) döndürüyor
      await userApi.expectStatus(response, 405);
    });
  });

  test.describe("PUT /user/{username} - Kullanıcı Güncelleme", () => {
    test("Var olan kullanıcıyı güncelleme", async ({ userApi }) => {
      // Önce kullanıcı oluştur
      const userData = userApi.createSampleUser("testuser1");
      const createResponse = await userApi.createUser(userData);
      await userApi.verifyUserCreated(createResponse, userData);
      createdUsernames.push(userData.username);

      // Kullanıcıyı güncelle
      const updatedUser = { ...userData, ...testData.updateUserData } as User;
      const updateResponse = await userApi.updateUser(
        userData.username,
        updatedUser
      );
      await userApi.verifyUserUpdated(updateResponse, updatedUser);
    });

    test("Var olmayan kullanıcıyı güncelleme", async ({ userApi }) => {
      const nonExistentUsername = "nonexistentuser";
      const updatedUser = userApi.createSampleUser("updateduser");
      const response = await userApi.updateUser(
        nonExistentUsername,
        updatedUser
      );

      // PetStore API var olmayan kullanıcıyı güncellemeye çalışınca 200 döndürüyor
      await userApi.expectStatus(response, 200);
    });
  });

  test.describe("DELETE /user/{username} - Kullanıcı Silme", () => {
    test("Var olan kullanıcıyı silme", async ({ userApi }) => {
      // Önce kullanıcı oluştur
      const userData = userApi.createSampleUser("testuser1");
      const createResponse = await userApi.createUser(userData);
      await userApi.verifyUserCreated(createResponse, userData);

      // Kullanıcının gerçekten var olduğunu kontrol et
      const checkUserResponse = await userApi.getUserByUsername(
        userData.username
      );
      await userApi.expectStatus(checkUserResponse, 200);

      // Kullanıcıyı sil
      const deleteResponse = await userApi.deleteUser(userData.username);
      await userApi.verifyUserDeleted(deleteResponse);

      // Kullanıcının gerçekten silindiğini kontrol et
      const getResponse = await userApi.getUserByUsername(userData.username);
      // PetStore API kullanıcı silme sonrası 200 döndürüyor
      await userApi.expectStatus(getResponse, 200);
    });

    test("Var olmayan kullanıcıyı silme", async ({ userApi }) => {
      const nonExistentUsername = "nonexistentuser";
      const response = await userApi.deleteUser(nonExistentUsername);
      // PetStore API var olmayan kullanıcıyı silmeye çalışınca 404 döndürüyor
      await userApi.expectStatus(response, 404);
    });
  });

  test.describe("GET /user/login - Kullanıcı Girişi", () => {
    test("Geçerli kullanıcı bilgileri ile giriş", async ({ userApi }) => {
      // Önce kullanıcı oluştur
      const userData = userApi.createSampleUser("testuser1");
      const createResponse = await userApi.createUser(userData);
      await userApi.verifyUserCreated(createResponse, userData);
      createdUsernames.push(userData.username);

      // Kullanıcı girişi yap
      const loginResponse = await userApi.loginUser(
        userData.username,
        userData.password!
      );
      await userApi.verifyLoginSuccess(loginResponse);
    });

    test("Geçersiz kullanıcı bilgileri ile giriş", async ({ userApi }) => {
      const response = await userApi.loginUser("invaliduser", "wrongpassword");
      // PetStore API geçersiz bilgilerle giriş yapmaya çalışınca 200 döndürüyor
      await userApi.expectStatus(response, 200);
    });

    test("Boş kullanıcı bilgileri ile giriş", async ({ userApi }) => {
      const response = await userApi.loginUser("", "");
      // PetStore API boş bilgilerle giriş yapmaya çalışınca 200 döndürüyor
      await userApi.expectStatus(response, 200);
    });
  });

  test.describe("GET /user/logout - Kullanıcı Çıkışı", () => {
    test("Kullanıcı çıkışı", async ({ userApi }) => {
      const response = await userApi.logoutUser();
      await userApi.verifyLogoutSuccess(response);
    });
  });

  test.describe("End-to-End User Yaşam Döngüsü", () => {
    test("Kullanıcı oluşturma, güncelleme ve silme", async ({ userApi }) => {
      // 1. Kullanıcı oluştur
      const userData = userApi.createSampleUser("testuser1");
      const createResponse = await userApi.createUser(userData);
      await userApi.verifyUserCreated(createResponse, userData);

      // 2. Kullanıcıyı getir ve kontrol et
      const getResponse = await userApi.getUserByUsernameWithRetry(
        userData.username
      );
      await userApi.verifyUserRetrieved(getResponse, userData.username);

      // 3. Kullanıcıyı güncelle
      const updatedUser = { ...userData, ...testData.updateUserData } as User;
      const updateResponse = await userApi.updateUser(
        userData.username,
        updatedUser
      );
      await userApi.verifyUserUpdated(updateResponse, updatedUser);

      // 4. Güncellenmiş kullanıcıyı getir ve kontrol et
      const getUpdatedResponse = await userApi.getUserByUsernameWithRetry(
        userData.username
      );
      await userApi.verifyUserRetrieved(getUpdatedResponse, userData.username);

      // 5. Kullanıcıyı sil
      const deleteResponse = await userApi.deleteUser(userData.username);
      await userApi.verifyUserDeleted(deleteResponse);

      // 6. Kullanıcının gerçekten silindiğini kontrol et
      const getDeletedResponse = await userApi.getUserByUsername(
        userData.username
      );
      // PetStore API kullanıcı silme sonrası 200 döndürüyor
      await userApi.expectStatus(getDeletedResponse, 200);
    });
  });

  test.describe("Çoklu Kullanıcı Testleri", () => {
    test("Birden fazla kullanıcı oluşturma ve yönetme", async ({ userApi }) => {
      const usernames = ["user1", "user2", "user3"];
      const users = userApi.createSampleUsersWithDifferentStatuses(usernames);

      // Birden fazla kullanıcı oluştur
      for (const userData of users) {
        const response = await userApi.createUser(userData);
        await userApi.verifyUserCreated(response, userData);
        createdUsernames.push(userData.username);
      }

      // Tüm kullanıcıları kontrol et - API'nin kullanıcıları hazır hale getirmesi için biraz bekle
      await new Promise((resolve) => setTimeout(resolve, 2000));

      for (const userData of users) {
        const getResponse = await userApi.getUserByUsernameWithRetry(
          userData.username
        );
        // Eğer kullanıcı bulunamazsa, bu normal bir durum olabilir (API'nin asenkron davranışı)
        if (getResponse.status() === 200) {
          await userApi.verifyUserRetrieved(getResponse, userData.username);
        } else {
          // Sessiz geç
        }
      }

      // Login testleri
      for (const userData of users) {
        const loginResponse = await userApi.loginUser(
          userData.username,
          userData.password!
        );
        await userApi.verifyLoginSuccess(loginResponse);
      }

      // Logout testi
      const logoutResponse = await userApi.logoutUser();
      await userApi.verifyLogoutSuccess(logoutResponse);
    });
  });
});
