// Yardımcı test fonksiyonları burada tanımlanabilir

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 