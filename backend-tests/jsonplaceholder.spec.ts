import { test, expect, request } from 'playwright/test';

test('GET istegi: /posts/1', async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts/1');

  expect(response.ok()).toBeTruthy(); // HTTP 200 mü?
  
  const body = await response.json();
  expect(body.id).toBe(1); // id 1 mi?
});

test('GET istegi: /posts/99999 mevcut olmayan veri icin 404 donmeli', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts/99999');
    expect(response.status()).toBe(404);
  });
  
  test('POST istegi: /posts endpointine veri gonderilir', async () => {
    const apiContext = await request.newContext();
  
    const response = await apiContext.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Yeni Baslik',
        body: 'Bu bir test gonderisidir',
        userId: 5
      }
    });
  
    expect(response.status()).toBe(201); // Created
    const body = await response.json();
    expect(body).toHaveProperty('id'); // id donmeli
  });
  
  test('PUT istegi: /posts/1 verisi guncellenir mi', async () => {
    const apiContext = await request.newContext();
  
    const response = await apiContext.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: {
        id: 1,
        title: 'Guncellenmis Baslik',
        body: 'Bu guncel iceriktir',
        userId: 1
      }
    });
  
    expect(response.status()).toBe(200); // OK
    const body = await response.json();
    expect(body.title).toBe('Guncellenmis Baslik');
  });
  
  test('DELETE istegi: /posts/1 silinir mi', async () => {
    const apiContext = await request.newContext();
  
    const response = await apiContext.delete('https://jsonplaceholder.typicode.com/posts/1');
  
    // JSONPlaceholder genellikle 200 döner (başarılı silme)
    expect(response.status()).toBe(200);
  });
  