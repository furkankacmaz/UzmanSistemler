# Spora Yönlendirme Projesi - Görevler

Bu dosya, README'deki vizyon ve teknik plana göre projeyi uygulanabilir görevlere böler.

## Hedef Teslim Tarihi

- [ ] 22 Nisan 2026 (onumuzdeki hafta)

## 1. Proje Hazırlığı

- [ ] G-01 Proje klasor yapisini netlestir: src/features, src/components, src/data, src/engine, src/types
- [ ] G-02 Kod standartlarini belirle: ESLint + Prettier + TypeScript strict kurallari
- [ ] G-03 Ortak UI temelini hazirla: renk tokenlari, tipografi, spacing ve layout kurallari
- [ ] G-04 Router iskeletini olustur: Ana sayfa, test akisi, sonuc ekrani, hakkinda

## 2. Domain Modeli ve Veri Semasi

- [ ] G-05 README'deki SportScores tipini src/types altinda tanimla
- [ ] G-06 Question tipi ve kategori yapisini (health, anthropometric, motoric) tanimla
- [ ] G-07 Soru bankasi dosyasi olustur: en az 20 soru, her secenekte weights ve explanation alanlari
- [ ] G-08 Veri dogrulama katmani ekle: eksik agirlik, gecersiz kategori, bos aciklama kontrolleri

## 3. Uzman Sistem Motoru (Weighted Scoring Matrix)

- [ ] G-09 Baslangic puanlarini sifirlayan skor motorunu yaz
- [ ] G-10 Her cevap seciminde SportScores biriktirme algoritmasini uygula
- [ ] G-11 Negatif ve pozitif agirliklarin birlikte islenmesini garanti et
- [ ] G-12 Esit puan durumlari icin tie-break kurali tanimla
- [ ] G-13 Sonuc uretimi: ilk 3 spor bransini puana gore sirala
- [ ] G-14 Aciklanabilirlik katmani ekle: sonuca etki eden en kritik cevaplari listele

## 4. Anket Akisi ve Kullanici Deneyimi

- [ ] G-15 Cok adimli form yapisi kur: kategori bazli adimlar
- [ ] G-16 Ilerleme gostergesi ekle: adim sayisi, tamamlanma yuzesdesi
- [ ] G-17 Geri-ileri gezinme ve cevap degistirme akisini ekle
- [ ] G-18 Form state yonetimini merkezi hale getir (context veya store)
- [ ] G-19 Sonuclari yenileme butonu ekle ve tum state'i sifirla

## 5. Sonuc Ekrani ve Analitik Sunum

- [ ] G-20 Oncelikli spor onerilerini kart yapisinda goster
- [ ] G-21 Her oneride "Neden bu spor?" aciklamasini goster
- [ ] G-22 Kullanici girdilerine gore guclu ve gelisime acik alanlar ozetini ekle
- [ ] G-23 Sonuclari okunabilir bir rapor formatinda disa aktarma (PDF veya yazdirma)

## 6. Antigravity Tasarim Dili Uygulamasi

- [ ] G-24 README'deki tasarim diline uygun ana gorunumu olustur
- [ ] G-25 Tailwind ile modern kartlar, grid yapisi ve tipografi hiyerarsisi kur
- [ ] G-26 GSAP ile giris animasyonlari, sayfa gecisleri ve micro-interactionlar ekle
- [ ] G-27 Ozel imlec ve timeline animasyon davranislarini uygulamaya al
- [ ] G-28 Mobil ve masaustu responsive kirilimlarini tamamla

## 7. 3 Boyut ve Gorsellestirme Katmani

- [ ] G-29 Three.js + Fiber + Drei ile sahne altyapisini kur
- [ ] G-30 Low-poly/line-art insan anatomi modelini sahneye entegre et
- [ ] G-31 Model etiketleri ile temel bolgeleri isaretle (omuz, bacak, core vb.)
- [ ] G-32 Sonuclara gore model uzerinde vurgu renklendirmesi yap
- [ ] G-33 Performans optimizasyonu uygula (lazy load, suspense, texture boyutu)

## 8. Kalite Guvencesi ve Test

- [ ] G-34 Skor motoru icin birim testleri yaz (kritik agirlik senaryolari)
- [ ] G-35 Form akisina entegrasyon testleri ekle
- [ ] G-36 Sonuc siralama mantigi icin regression testleri yaz
- [ ] G-37 Erişilebilirlik kontrolleri yap (klavye gezinme, kontrast, aria)
- [ ] G-38 Hata durumlari icin fallback ekranlari ekle

## 9. Dokumantasyon ve Teslimat

- [ ] G-39 README'yi guncelle: kurulum, calistirma, mimari, algoritma aciklamasi
- [ ] G-40 Karar motoru icin ornek veri seti ve beklenen cikti tablosu ekle
- [ ] G-41 Kullanici kilavuzu hazirla: testi nasil doldurur, sonucu nasil yorumlar
- [ ] G-42 Yayinlama adimlarini netlestir (build, environment, hosting)

## 10. Onceliklendirme (MVP)

- [ ] M-01 Bu haftaki zorunlu kapsam: G-01 ile G-22, G-34, G-39
- [ ] M-02 Bu haftaki opsiyonel kapsam: G-23, G-26, G-28
- [ ] M-03 Sonraki sprint kapsamı: G-27, G-29 ile G-33, G-35 ile G-38, G-40 ile G-42
- [ ] M-04 Teslim kapisi: T-01, T-02, T-03 zorunlu; T-04 kismi kabul

## 11. Tamamlanma Kriteri

- [ ] T-01 Kullanici testi tamamlayip ilk 3 spor onerisini gorebiliyor
- [ ] T-02 Her onerinin aciklamasi, secilen cevaplarla izlenebilir sekilde sunuluyor
- [ ] T-03 Mobil ve masaustu deneyimi tutarli calisiyor
- [ ] T-04 Build basarili, kritik testler yesil, dokumantasyon guncel

## 12. Onumuzdeki Hafta Uygulama Plani (7 Gun)

1. Gun 1: G-01, G-02, G-04 tamamla; temel klasorleme ve router iskeletini bitir.
2. Gun 2: G-05, G-06, G-07 tamamla; tipler ve soru bankasini hazirla.
3. Gun 3: G-08, G-09, G-10, G-11 tamamla; skor motorunu calisir hale getir.
4. Gun 4: G-12, G-13, G-14 tamamla; siralama ve aciklanabilirlik katmanini bitir.
5. Gun 5: G-15, G-16, G-17, G-18 tamamla; anket akis ve state yonetimini bagla.
6. Gun 6: G-19, G-20, G-21, G-22, G-24, G-25 tamamla; sonuc ekrani ve temel UI'yi kilitle.
7. Gun 7: G-34 ve G-39 tamamla; temel test, dokumantasyon ve final build kontrolu yap.