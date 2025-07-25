# components

Bu klasörde, uygulamanın tekrar kullanılabilir UI bileşenleri (componentler) yer alır.

## BaseComponent
- Tüm componentler için ortak metotları içerir (görünürlük, tıklanabilirlik, metin alma, tıklama).
- Diğer componentler bu sınıftan türetilir.

## Örnek Component
- `Header.ts`: Header bileşeni, BaseComponent'ten türetilmiş ve kendine özgü metotlar eklenmiştir.

Yeni bir component eklerken BaseComponent'ten extend edilmesi önerilir. 