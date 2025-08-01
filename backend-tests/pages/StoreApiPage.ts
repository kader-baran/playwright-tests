import { APIRequestContext, expect } from '@playwright/test';
import { ApiBasePage } from './ApiBasePage';

export interface Order {
  id?: number;
  petId: number;
  quantity: number;
  shipDate?: string;
  status: 'placed' | 'approved' | 'delivered';
  complete: boolean;
}

export class StoreApiPage extends ApiBasePage {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Yeni sipariş oluşturur
   */
  async createOrder(orderData: Order) {
    return await this.post('/store/order', orderData);
  }

  /**
   * Siparişi ID ile getirir
   */
  async getOrderById(orderId: number) {
    return await this.get(`/store/order/${orderId}`);
  }

  /**
   * Siparişi ID ile getirir (Retry destekli)
   */
  async getOrderByIdWithRetry(orderId: number, maxRetries: number = 3, delay: number = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.getOrderById(orderId);
        if (response.status() === 200) {
          return response;
        }
      } catch (error) {
        console.log(`Attempt ${attempt}: Order ${orderId} not found, retrying...`);
      }
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Son deneme
    return await this.getOrderById(orderId);
  }

  /**
   * Siparişi siler
   */
  async deleteOrder(orderId: number) {
    return await this.delete(`/store/order/${orderId}`);
  }

  /**
   * Store inventory'yi getirir
   */
  async getInventory() {
    return await this.get('/store/inventory');
  }

  /**
   * Sipariş oluşturma doğrulaması
   */
  async verifyOrderCreated(response: any, expectedOrder: Order) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('petId');
    expect(responseBody).toHaveProperty('quantity');
    expect(responseBody).toHaveProperty('status');
    expect(responseBody).toHaveProperty('complete');
    
    expect(responseBody.petId).toBe(expectedOrder.petId);
    expect(responseBody.quantity).toBe(expectedOrder.quantity);
    expect(responseBody.status).toBe(expectedOrder.status);
    expect(responseBody.complete).toBe(expectedOrder.complete);
  }

  /**
   * Sipariş getirme doğrulaması
   */
  async verifyOrderRetrieved(response: any, expectedOrderId: number) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBe(expectedOrderId);
  }

  /**
   * Sipariş güncelleme doğrulaması
   */
  async verifyOrderUpdated(response: any, expectedOrder: Order) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('petId');
    expect(responseBody).toHaveProperty('quantity');
    expect(responseBody).toHaveProperty('status');
    expect(responseBody).toHaveProperty('complete');
  }

  /**
   * Sipariş silme doğrulaması
   */
  async verifyOrderDeleted(response: any) {
    // PetStore API sipariş silme işlemlerinde 200 veya 404 döndürebilir
    expect([200, 404]).toContain(response.status());
  }

  /**
   * Sipariş bulunamadı doğrulaması
   */
  async verifyOrderNotFound(response: any) {
    await this.expectStatus(response, 404);
  }

  /**
   * Geçersiz input doğrulaması
   */
  async verifyInvalidInput(response: any) {
    expect([400, 404, 500]).toContain(response.status());
  }

  /**
   * Inventory doğrulaması
   */
  async verifyInventory(response: any) {
    await this.expectStatus(response, 200);
    
    const responseBody = await response.json();
    expect(typeof responseBody).toBe('object');
    
    // Inventory'de en az bir status olmalı
    const statuses = Object.keys(responseBody);
    expect(statuses.length).toBeGreaterThan(0);
    
    // Her status için sayı olmalı
    for (const status of statuses) {
      expect(typeof responseBody[status]).toBe('number');
      expect(responseBody[status]).toBeGreaterThanOrEqual(0);
    }
  }

  /**
   * Örnek sipariş oluşturur
   */
  createSampleOrder(petId: number, quantity: number = 1, status: 'placed' | 'approved' | 'delivered' = 'placed'): Order {
    return {
      petId: petId,
      quantity: quantity,
      shipDate: new Date().toISOString(),
      status: status,
      complete: false
    };
  }

  /**
   * Farklı status'lerde örnek siparişler oluşturur
   */
  createSampleOrdersWithDifferentStatuses(petIds: number[]): Order[] {
    const statuses: ('placed' | 'approved' | 'delivered')[] = ['placed', 'approved', 'delivered'];
    return petIds.map((petId, index) => 
      this.createSampleOrder(petId, index + 1, statuses[index % statuses.length])
    );
  }
} 