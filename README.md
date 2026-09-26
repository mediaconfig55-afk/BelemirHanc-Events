# BelemirHancı Events — Tanıtım Sitesi

Samsun İlkadım'daki **BelemirHancı Events** (@bybelemirhanci) için hazırlanmış tek sayfalık,
SEO odaklı tanıtım sitesi. Bağımlılık yok: saf HTML + CSS + JavaScript.

## Çalıştırma

`index.html` dosyasını çift tıklamak yeterli. Yerel sunucu isterseniz:

```powershell
python -m http.server 8000
# http://localhost:8000
```

## Dosya yapısı

```
index.html            # tüm içerik + JSON-LD yapısal veri
assets/css/styles.css # tasarım sistemi (krem/espresso/bronz, Fraunces + Plus Jakarta Sans)
assets/js/main.js     # scroll reveal, mobil menü, form -> WhatsApp
assets/img/           # fotoğraflar buraya
robots.txt
sitemap.xml
```

## Görseller

13 fotoğraf **@bybelemirhanci** hesabından alınıp 1400 px genişliğe ölçeklendi ve
JPEG kalite 80 ile sıkıştırıldı (17 MB → ~3,4 MB):

| Dosya | Yer | İçerik |
|---|---|---|
| `teklif.jpg`, `kina.jpg`, `nikah.jpg` | hero kart yığını | teklif masası, kına gecesi, söz töreni |
| `hizmet-teklif.jpg`, `hizmet-kina.jpg`, `hizmet-nikah.jpg` | hizmet kartları | ilgili organizasyon kareleri |
| `galeri-1.jpg` … `galeri-6.jpg` | galeri | teklif ve kına kurulumları |
| `og-kapak.jpg` | sosyal paylaşım kapağı | `teklif.jpg`'den 1200×630 merkez kırpma |
| `hizmet-nisan.jpg` | Nişan & Söz kartı | nişan takı ve neon yazı |
| `assets/img/art/*.svg` | fotoğraf eklenmemiş kartlar için yedek | el çizimi çizgi-sanat motifleri |
| `apple-touch-icon.png` | iOS ikonu — **henüz eklenmedi** | 180×180 |

Sonradan `hizmet-nisan.jpg` (nişan takı, "Better Together" neon) eklendi; bunun için
hesabın ~550 gönderisi tarandı.

### Hizmet kartları

Sitede **4 kart** var ve dördünün de gerçek fotoğrafı mevcut: Evlilik Teklifi,
Kına Gecesi, Nikah & Düğün, Nişan & Söz.

Gelin Hazırlığı, Sünnet ve Doğum Günü & Bebek Kutlamaları kartları kaldırıldı. Akışta bu
kategorilerde kare yok (işler yalnızca öne çıkan hikâyelerde duruyor; `BrideToBe👰‍♀️`
hikâyesinin 9 karesinin tamamı video). Bu hizmetler kart ızgarasının altındaki tek satırlık
notta (`.bento__not`) ve `FAQPage` / `hasOfferCatalog` yapısal verisinde korunuyor —
böylece "samsun doğum günü organizasyonu" gibi yerel aramalardaki görünürlük kaybolmuyor.

`assets/img/hizmet-dogumgunu.jpg` (mavi balon takı, "BABY" harfleri — hastane odası bebek
kutlaması) klasörde duruyor ama hiçbir yerde kullanılmıyor; kart geri eklenirse hazır.

İşletme bu organizasyonlara ait fotoğraf gönderirse kartlar geri eklenebilir: mevcut bir
`<article class="frame card card--wide">` bloğunu kopyalayıp başlık, metin ve `<img>`
satırını değiştirmeniz yeterli (kart sayısı 4'ün katı olduğunda ızgara tam oturur).

Yeni fotoğrafları eklerken **300 KB altına** sıkıştırın (https://squoosh.app) —
yükleme hızı Google sıralamasını doğrudan etkiliyor.

## Yayına almadan önce yapılacaklar

1. **Alan adı:** `index.html`, `robots.txt` ve `sitemap.xml` içindeki
   `https://belemirhancievents.com/` adresini gerçek alan adıyla değiştirin
   (dosyalarda 6 yerde geçiyor).
2. **Koordinat:** JSON-LD içindeki `latitude`/`longitude` değerleri Samsun İlkadım
   yaklaşık merkezidir; Google Maps'ten atölyenin tam konumunu alıp güncelleyin.
3. **Posta kodu:** `postalCode` alanı `55030` olarak varsayıldı, doğrulayın.
4. **Google Business Profile:** işletmeyi kaydedip web sitesi alanına bu adresi girin —
   yerel aramada en büyük etkiyi bu yapar.
5. **Google Search Console:** siteyi doğrulayıp `sitemap.xml` adresini gönderin.
6. `assets/img/apple-touch-icon.png` (180×180) ekleyin — iOS'ta ana ekrana eklenince
   kullanılan ikon budur. (`og-kapak.jpg` hazır.)
7. **Hizmet listesini işletmeyle teyit edin.** Site; evlilik teklifi, kına, nikah/düğün,
   nişan/söz, gelin hazırlığı, sünnet ve doğum günü hizmetlerini listeliyor. Bunlar
   Instagram'daki öne çıkan hikâye başlıklarından doğrulandı. Baby shower ve kurumsal
   etkinlik ilk taslakta vardı ama hiçbir kanıt bulunamadığı için çıkarıldı — işletme bu
   hizmetleri de veriyorsa geri eklenebilir.

## SEO'da neler var

- Türkçe `<title>` / `description`, canonical, Open Graph + Twitter kartları
- `LocalBusiness` + `EventPlanner` yapısal verisi: adres, telefon, çalışma saatleri,
  hizmet kataloğu, hizmet bölgesi, Instagram bağlantısı
- `FAQPage` yapısal verisi (Google'da açılır soru-cevap kutusu şansı)
- Yerel anahtar kelimeler başlık, alt başlık ve footer'da doğal biçimde geçiyor
- `geo.*` meta etiketleri, `lang="tr"`, semantik başlık hiyerarşisi (tek H1)
- Performans: harici JS kütüphanesi yok, görseller `lazy`, animasyonlar yalnızca
  `transform`/`opacity`, `backdrop-blur` sadece sabit öğelerde
- Erişilebilirlik: içeriğe geç bağlantısı, klavye odak halkaları, `prefers-reduced-motion`,
  ARIA etiketli menü

## İletişim akışı

Formun arka ucu yok; **Gönder** bilgileri hazır bir WhatsApp mesajına dönüştürüp
`wa.me/905340795548` numarasını açar. Böylece hosting'de sunucu tarafı koda gerek kalmaz.
E-posta ile gelen talep de isterseniz `assets/js/main.js` içinde `mailto:` olarak eklenebilir.
