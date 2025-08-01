import { APIRequestContext, expect } from '@playwright/test';
import { ApiBasePage } from './ApiBasePage';

export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

export class UserApiPage extends ApiBasePage {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Yeni kullanıcı oluşturur
   */
  async createUser(userData: User) {
    return await this.post('/user', userData);
  }

  /**
   * Birden fazla kullanıcı oluşturur
   */
  async createUsersWithArray(userArray: User[]) {
    return await this.post('/user/createWithArray', userArray);
  }

  /**
   * Birden fazla kullanıcı oluşturur (List ile)
   */
  async createUsersWithList(userList: User[]) {
    return await this.post('/user/createWithList', userList);
  }

  /**
   * Kullanıcıyı username ile getirir
   */
  async getUserByUsername(username: string) {
    return await this.get(`/user/${username}`);
  }

  /**
   * Kullanıcıyı username ile getirir (Retry destekli)
   */
  async getUserByUsernameWithRetry(username: string, maxRetries: number = 3, delay: number = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.getUserByUsername(username);
        if (response.status() === 200) {
          return response;
        }
      } catch (error) {
        console.log(`Attempt ${attempt}: User ${username} not found, retrying...`);
      }
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Son deneme
    return await this.getUserByUsername(username);
  }

  /**
   * Kullanıcıyı günceller
   */
  async updateUser(username: string, userData: User) {
    return await this.put(`/user/${username}`, userData);
  }

  /**
   * Kullanıcıyı siler
   */
  async deleteUser(username: string) {
    return await this.delete(`/user/${username}`);
  }

  /**
   * Kullanıcı girişi yapar
   */
  async loginUser(username: string, password: string) {
    return await this.get(`/user/login?username=${username}&password=${password}`);
  }

  /**
   * Kullanıcı çıkışı yapar
   */
  async logoutUser() {
    return await this.get('/user/logout');
  }

  /**
   * Kullanıcı oluşturma doğrulaması
   */
  async verifyUserCreated(response: any, expectedUser: User) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
  }

  /**
   * Kullanıcı getirme doğrulaması
   */
  async verifyUserRetrieved(response: any, expectedUsername: string) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('username');
    expect(responseBody.username).toBe(expectedUsername);
  }

  /**
   * Kullanıcı güncelleme doğrulaması
   */
  async verifyUserUpdated(response: any, expectedUser: User) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
  }

  /**
   * Kullanıcı silme doğrulaması
   */
  async verifyUserDeleted(response: any) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
  }

  /**
   * Kullanıcı bulunamadı doğrulaması
   */
  async verifyUserNotFound(response: any) {
    await this.expectStatus(response, 404);
  }

  /**
   * Geçersiz input doğrulaması
   */
  async verifyInvalidInput(response: any) {
    expect([400, 404, 500]).toContain(response.status());
  }

  /**
   * Login doğrulaması
   */
  async verifyLoginSuccess(response: any) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toContain('logged in user session:');
  }

  /**
   * Login başarısızlık doğrulaması
   */
  async verifyLoginFailure(response: any) {
    await this.expectStatus(response, 400);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    
    expect(responseBody.code).toBe(400);
    expect(responseBody.type).toBe('error');
  }

  /**
   * Logout doğrulaması
   */
  async verifyLogoutSuccess(response: any) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toBe('ok');
  }

  /**
   * Örnek kullanıcı oluşturur
   */
  createSampleUser(username: string, email: string = 'test@example.com', userStatus: number = 1): User {
    return {
      username: username,
      firstName: 'Test',
      lastName: 'User',
      email: email,
      password: 'password123',
      phone: '1234567890',
      userStatus: userStatus
    };
  }

  /**
   * Farklı status'lerde örnek kullanıcılar oluşturur
   */
  createSampleUsersWithDifferentStatuses(usernames: string[]): User[] {
    return usernames.map((username, index) => 
      this.createSampleUser(username, `${username}@example.com`, index % 2)
    );
  }
} 