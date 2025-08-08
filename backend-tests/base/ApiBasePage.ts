import { APIRequestContext, expect } from "@playwright/test";
import { Logger } from "../utils/Logger";

export class ApiBasePage {
  protected request: APIRequestContext;
  protected baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = "https://petstore.swagger.io/v2";
  }

  /**
   * GET request gönderir
   */
  async get(endpoint: string, headers?: Record<string, string>) {
    const url = `${this.baseUrl}${endpoint}`;
    const startedAt = Date.now();
    const response = await this.request.get(url, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const durationMs = Date.now() - startedAt;
    Logger.info(
      `${Logger.colorMethod("GET")} ${url} ${Logger.colorStatus(
        response.status()
      )} (${durationMs}ms)`
    );
    return response;
  }

  /**
   * POST request gönderir
   */
  async post(endpoint: string, data: any, headers?: Record<string, string>) {
    const url = `${this.baseUrl}${endpoint}`;
    const startedAt = Date.now();
    const response = await this.request.post(url, {
      data: data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const durationMs = Date.now() - startedAt;
    const body = Logger.enableBodies ? ` body=${Logger.stringify(data)}` : "";
    Logger.info(
      `${Logger.colorMethod("POST")} ${url} ${Logger.colorStatus(
        response.status()
      )} (${durationMs}ms)${body}`
    );
    return response;
  }

  /**
   * PUT request gönderir
   */
  async put(endpoint: string, data: any, headers?: Record<string, string>) {
    const url = `${this.baseUrl}${endpoint}`;
    const startedAt = Date.now();
    const response = await this.request.put(url, {
      data: data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const durationMs = Date.now() - startedAt;
    const body = Logger.enableBodies ? ` body=${Logger.stringify(data)}` : "";
    Logger.info(
      `${Logger.colorMethod("PUT")} ${url} ${Logger.colorStatus(
        response.status()
      )} (${durationMs}ms)${body}`
    );
    return response;
  }

  /**
   * DELETE request gönderir
   */
  async delete(endpoint: string, headers?: Record<string, string>) {
    const url = `${this.baseUrl}${endpoint}`;
    const startedAt = Date.now();
    const response = await this.request.delete(url, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const durationMs = Date.now() - startedAt;
    Logger.info(
      `${Logger.colorMethod("DELETE")} ${url} ${Logger.colorStatus(
        response.status()
      )} (${durationMs}ms)`
    );
    return response;
  }

  /**
   * Response status code'unu kontrol eder
   */
  async expectStatus(response: any, expectedStatus: number) {
    Logger.info(`Expect status ${expectedStatus}, got ${response.status()}`);
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Response status code'unun beklenenlerden biri olduğunu kontrol eder
   */
  async expectStatusOneOf(response: any, expectedStatuses: number[]) {
    Logger.info(
      `Expect status one of [${expectedStatuses.join(
        ", "
      )}], got ${response.status()}`
    );
    expect(expectedStatuses).toContain(response.status());
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
  async expectResponseContains(
    response: any,
    field: string,
    expectedValue: any
  ) {
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
        Logger.warn(`Attempt ${attempt} failed: ${String(error)}`);
      }

      if (attempt < maxRetries) {
        Logger.info(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // Son deneme
    return await operation();
  }

  /**
   * Test verisi oluşturucu - Alt sınıflar override edebilir
   */
  createTestData(): any {
    throw new Error("createTestData method must be implemented by subclasses");
  }

  /**
   * Test verisi doğrulayıcı - Alt sınıflar override edebilir
   */
  async verifyTestData(response: any, expectedData: any): Promise<void> {
    throw new Error("verifyTestData method must be implemented by subclasses");
  }
}
