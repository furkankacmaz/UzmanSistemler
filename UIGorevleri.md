# UI Gorevleri

Bu dokuman, istenen kullanici akisini UI gorev listesine donusturur.

## 1. Ana Sayfa (Home)
- [x] Ana sayfada merkeze "AXIOM" basligini yerlestir.
- [x] Basligin altina projenin kisa aciklamasini ekle.
- [x] Aciklamanin altina "Teste Basla" butonu ekle.
- [x] "Teste Basla" butonuna tiklaninca kullaniciyi profil giris adimina yonlendir.

### Kabul Kriterleri
- [x] Kullanici ilk acilista AXIOM basligini, aciklamayi ve "Teste Basla" butonunu gorur.
- [x] Buton tiklandiginda akis dogru sekilde bir sonraki asamaya gecer.

## 2. Profil Bilgileri Asamasi
- [x] Kullaniciya boy, kilo, kulac vb. fiziksel bilgileri girebilecegi form alanlarini goster.
- [x] Sayfanin ust kismina ilerleme bari ekle.
- [x] Sayfanin alt kismina "Devam Et" butonu ekle.
- [x] Zorunlu alanlar icin temel dogrulama (bos birakmama, sayisal alan kontrolu vb.) yap.

### Kabul Kriterleri
- [x] Form alanlari acik ve doldurulabilir durumdadir.
- [x] Ilerleme bari bu asamada gorunur.
- [x] "Devam Et" butonu ile soru asamasina gecis saglanir.

## 3. Soru Asamasi (Ayni Akis Icindeki Adim)
- [x] Profil adimindan sonra baska bir sayfaya gitmeden soru asamasina gec.
- [x] Tum sorulari ayni anda gostermek yerine sorulari tek tek goster.
- [x] Her cevap sonrasi bir sonraki soruyu getir.
- [x] Ilerleme barini her soru cevaplandiginda guncelle.

### Kabul Kriterleri
- [x] Ekranda ayni anda yalnizca tek soru gorunur.
- [x] Her cevapta ilerleme bari ilerler.
- [x] Son sorudan sonra sonuc ekranina gecilir.

## 4. Sonuc Ekrani
- [x] Son soru tamamlandiginda "Sonuclari Goruntule" ekranini ac.
- [x] Kullaniciya onerilen spor dalini goster.
- [x] Onerilen spor icin uyumluluk yuzdesini (% kac uyumlu) goster.
- [x] Diger spor dallari icin de vucudunun yatkinlik/uyumluluk yuzdelerini listele.

### Kabul Kriterleri
- [x] Onerilen spor acikca gorunur.
- [x] Onerilen sporun yuzdesi gorunur.
- [x] Diger spor dallari da yuzdeleriyle birlikte gorunur.

## 5. UI/UX Tamamlama Gorevleri
- [x] Tum asamalarda buton metinleri tutarli olsun (Teste Basla, Devam Et, Sonuclari Goruntule).
- [x] Mobil ve masaustu gorunumlerde duzgun hizalama/sigdirma kontrolu yap.
- [x] Adim gecislerinde kullanici nerede oldugunu ilerleme bari ile net sekilde anlayabilsin.

### Teslim Kontrolu
- [x] Baslangic -> Profil -> Sorular -> Sonuc akisi uctan uca sorunsuz calisir.
- [x] Kullanici girdileri ve cevaplari sonuc ekranina dogru sekilde yansitilir.
