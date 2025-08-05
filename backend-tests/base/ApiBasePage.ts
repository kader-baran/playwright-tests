import { APIRequestContext, expect } from '@playwright/test';

export class ApiBasePage {
  protected request: APIRequestContext;
  protected baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = 'https://petstore.swagger.io/v2';
  }

  /**
   * GET request gönderir
   */
  async get(endpoint: string, headers?: Record<string, string>) {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    return response;
  }

  /**
   * POST request gönderir
   */
  async post(endpoint: string, data: any, headers?: Record<string, string>) {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data: data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    return response;
  }

  /**
   * PUT request gönderir
   */
  async put(endpoint: string, data: any, headers?: Record<string, string>) {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data: data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    return response;
  }

  /**
   * DELETE request gönderir
   */
  async delete(endpoint: string, headers?: Record<string, string>) {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    return response;
  }

  /**
   * Response status code'unu kontrol eder
   */
  async expectStatus(response: any, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Response body'sini kontrol eder
   */
  async expectResponseBody(response: any, expectedData: any) {
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedData);
  }

  /**
   * Response body'sinin belirli bir alanını kontrol eder
   */
  async expectResponseField(response: any, field: string, expectedValue: any) {
    const responseBody = await response.json();
    expect(responseBody[field]).toBe(expectedValue);
  }

  /**
   * Response body'sinin belirli bir alanını içerdiğini kontrol eder
   */
  async expectResponseContains(response: any, field: string, expectedValue: any) {
    const responseBody = await response.json();
    expect(responseBody[field]).toContain(expectedValue);
  }

  /**
   * Response body'sinin belirli alanları içerdiğini kontrol eder
   */
  async expectResponseHasProperties(response: any, properties: string[]) {
    const responseBody = await response.json();
    for (const property of properties) {
      expect(responseBody).toHaveProperty(property);
    }
  }

  /**
   * Response'un başarılı olduğunu kontrol eder (200-299)
   */
  async expectSuccess(response: any) {
    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(200);
    expect(status).toBeLessThan(300);
  }

  /**
   * Response'un hata olduğunu kontrol eder (400-599)
   */
  async expectError(response: any) {
    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(400);
    expect(status).toBeLessThan(600);
  }

  /**
   * Retry mekanizması - Belirli bir koşul sağlanana kadar tekrar dener
   */
  async retryUntil<T>(
    operation: () => Promise<T>,
    condition: (result: T) => boolean,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        if (condition(result)) {
          return result;
        }
      } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error);
      }
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Son deneme
    return await operation();
  }

  /**
   * Test verisi oluşturucu - Alt sınıflar override edebilir
   */
  createTestData(): any {
    throw new Error('createTestData method must be implemented by subclasses');
  }

  /**
   * Test verisi doğrulayıcı - Alt sınıflar override edebilir
   */
  async verifyTestData(response: any, expectedData: any): Promise<void> {
    throw new Error('verifyTestData method must be implemented by subclasses');
  }
} 