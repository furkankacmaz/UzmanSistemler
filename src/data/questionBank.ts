import type { Question } from "@/types/domain";

export const questionBank: Question[] = [
  {
    id: "Q01",
    text: "Haftada kac gun duzenli fiziksel aktivite yapabiliyorsun?",
    category: "health",
    options: [
      {
        label: "1-2 gun",
        weights: { pilatesYoga: 2, yuzme: 1 },
        explanation: "Dusuk frekansli programlarda dusuk etkili sporlar daha surdurulebilir olur.",
      },
      {
        label: "3-4 gun",
        weights: { kosu: 2, tenis: 2, bisiklet: 2 },
        explanation: "Orta frekans, dayaniklilik ve teknik sporlar icin dengeli bir taban sunar.",
      },
      {
        label: "5+ gun",
        weights: { vucutGelistirme: 3, calisthenics: 3, boksUzakDogu: 2 },
        explanation: "Yuksek frekans, kuvvet ve hacim odakli antrenmanlarin verimini artirir.",
      },
    ],
  },
  {
    id: "Q02",
    text: "Mevcut kardiyovaskuler kapasiteni nasil degerlendirirsin?",
    category: "health",
    options: [
      {
        label: "Dusuk",
        weights: { pilatesYoga: 2, yuzme: 1, kosu: -1 },
        explanation: "Dusuk kapasitede kademeli yuklenme gerektiren branslar daha guvenlidir.",
      },
      {
        label: "Orta",
        weights: { kosu: 1, bisiklet: 2, tenis: 1 },
        explanation: "Orta kapasite, ritimli dayaniklilik sporlarina gecis icin uygundur.",
      },
      {
        label: "Yuksek",
        weights: { kosu: 3, bisiklet: 3, basketbolVoleybol: 2 },
        explanation: "Yuksek kapasite, tempolu ve tekrarli efor gerektiren sporlari destekler.",
      },
    ],
  },
  {
    id: "Q03",
    text: "Eklem hassasiyeti veya kronik agrin var mi?",
    category: "health",
    options: [
      {
        label: "Evet, belirgin",
        weights: { pilatesYoga: 3, yuzme: 3, kosu: -2, boksUzakDogu: -2 },
        explanation: "Eklem hassasiyetinde dusuk darbe etkili sporlar onceliklenir.",
      },
      {
        label: "Ara sira",
        weights: { pilatesYoga: 2, bisiklet: 1, basketbolVoleybol: -1 },
        explanation: "Araliksiz degilse kontrollu yuklenme ile secici ilerlemek gerekir.",
      },
      {
        label: "Hayir",
        weights: { basketbolVoleybol: 2, boksUzakDogu: 2, kosu: 2 },
        explanation: "Hassasiyet olmamasi yuksek etkili brans seceneklerini artirir.",
      },
    ],
  },
  {
    id: "Q04",
    text: "Dinlenik nabzin genelde hangi aralikta?",
    category: "health",
    options: [
      {
        label: "80+",
        weights: { pilatesYoga: 2, yuzme: 2, kosu: -1 },
        explanation: "Yuksek dinlenik nabizda adaptasyon icin kontrollu kardiyo daha uygundur.",
      },
      {
        label: "65-79",
        weights: { bisiklet: 2, tenis: 1, kosu: 1 },
        explanation: "Orta nabiz araligi, progresif dayaniklilik antrenmanina imkan verir.",
      },
      {
        label: "64 ve alti",
        weights: { kosu: 2, bisiklet: 2, basketbolVoleybol: 1 },
        explanation: "Dusuk dinlenik nabiz dayaniklilik performansi ile iliskilidir.",
      },
    ],
  },
  {
    id: "Q05",
    text: "Boyuna gore genel vucut kompozisyonunu nasil tanimlarsin?",
    category: "anthropometric",
    options: [
      {
        label: "Ince ve uzun",
        weights: { kosu: 2, basketbolVoleybol: 3, tenis: 2 },
        explanation: "Uzun kol-bacak yapisi adim boyu ve erisim avantaji saglar.",
      },
      {
        label: "Dengeli",
        weights: { bisiklet: 2, tenis: 2, calisthenics: 2 },
        explanation: "Dengeli kompozisyon, farkli spor disiplinlerine uyum kolayligi sunar.",
      },
      {
        label: "Kompakt ve guclu",
        weights: { boksUzakDogu: 3, vucutGelistirme: 3, calisthenics: 2 },
        explanation: "Kompakt ve guclu yapi, kuvvet ve patlayici guc gerektiren sporlari destekler.",
      },
    ],
  },
  {
    id: "Q06",
    text: "Ust vucut kuvvet seviyen nasil?",
    category: "motoric",
    options: [
      {
        label: "Baslangic",
        weights: { pilatesYoga: 2, yuzme: 1, calisthenics: -1 },
        explanation: "Baslangic seviyede teknik ve stabilite odakli gecis daha etkilidir.",
      },
      {
        label: "Orta",
        weights: { tenis: 2, yuzme: 2, calisthenics: 1 },
        explanation: "Orta kuvvet, cekis-itis dengesi isteyen sporlar icin uygun zemindir.",
      },
      {
        label: "Ileri",
        weights: { calisthenics: 3, vucutGelistirme: 3, boksUzakDogu: 2 },
        explanation: "Ileri seviye, vucut agirligi ve yuksek kuvvet uyaranlarini kaldirabilir.",
      },
    ],
  },
  {
    id: "Q07",
    text: "Alt vucut dayaniklilik seviyen nasil?",
    category: "motoric",
    options: [
      {
        label: "Dusuk",
        weights: { pilatesYoga: 2, yuzme: 1, kosu: -1 },
        explanation: "Dusuk alt vucut dayanikliliginda eklem stresi dusuk secenekler tercih edilir.",
      },
      {
        label: "Orta",
        weights: { bisiklet: 2, tenis: 1, kosu: 1 },
        explanation: "Orta dayaniklilik, ritmik tekrarli bacak kullanimina izin verir.",
      },
      {
        label: "Yuksek",
        weights: { kosu: 3, bisiklet: 3, basketbolVoleybol: 2 },
        explanation: "Yuksek dayaniklilik, uzun sureli veya yuksek tempolu eforu destekler.",
      },
    ],
  },
  {
    id: "Q08",
    text: "Esneklik ve mobilite durumun nasil?",
    category: "motoric",
    options: [
      {
        label: "Sinirli",
        weights: { pilatesYoga: 3, yuzme: 2, tenis: -1 },
        explanation: "Sinirli mobilitede once hareket acikligini artiran disiplinler faydalidir.",
      },
      {
        label: "Orta",
        weights: { tenis: 1, bisiklet: 1, calisthenics: 1 },
        explanation: "Orta seviye mobilite, teknik sporlarda guvenli ilerleme saglar.",
      },
      {
        label: "Yuksek",
        weights: { pilatesYoga: 2, boksUzakDogu: 2, calisthenics: 2 },
        explanation: "Yuksek mobilite, genis hareket acikligi isteyen branslarda avantaj sunar.",
      },
    ],
  },
  {
    id: "Q09",
    text: "Denge ve koordinasyon becerini nasil goruyorsun?",
    category: "motoric",
    options: [
      {
        label: "Gelismeli",
        weights: { pilatesYoga: 3, yuzme: 1, basketbolVoleybol: -1 },
        explanation: "Denge calismalari baslangicta kontrollu ortamlarda daha etkili olur.",
      },
      {
        label: "Orta",
        weights: { tenis: 2, bisiklet: 1, boksUzakDogu: 1 },
        explanation: "Orta koordinasyon, coklu hareket paternlerini ogrenmeye uygundur.",
      },
      {
        label: "Yuksek",
        weights: { basketbolVoleybol: 3, tenis: 2, boksUzakDogu: 2 },
        explanation: "Yuksek koordinasyon, hizli karar ve yon degistirme isteyen sporlara uyar.",
      },
    ],
  },
  {
    id: "Q10",
    text: "Hizli yon degistirme gerektiren aktivitelerde nasilsin?",
    category: "motoric",
    options: [
      {
        label: "Zorlanirim",
        weights: { yuzme: 2, bisiklet: 1, basketbolVoleybol: -2 },
        explanation: "Yon degistirme zorlugu olanlarda lineer hareketli sporlar daha uygundur.",
      },
      {
        label: "Orta",
        weights: { tenis: 2, boksUzakDogu: 1, basketbolVoleybol: 1 },
        explanation: "Orta seviye ceviklik teknik gelisimle hizla ilerleyebilir.",
      },
      {
        label: "Cok iyiyim",
        weights: { basketbolVoleybol: 3, tenis: 2, boksUzakDogu: 2 },
        explanation: "Yuksek ceviklik, oyun ici hizli gecisler gerektiren sporlari destekler.",
      },
    ],
  },
  {
    id: "Q11",
    text: "Suda bulunma ve teknik ogrenme konusunda ne kadar rahatsin?",
    category: "health",
    options: [
      {
        label: "Cekingenim",
        weights: { yuzme: -2, pilatesYoga: 2, kosu: 1 },
        explanation: "Suda cekingenlikte kara tabanli sporlarla baslamak motivasyonu korur.",
      },
      {
        label: "Notrum",
        weights: { yuzme: 1, bisiklet: 1, kosu: 1 },
        explanation: "Notr yaklasim, farkli dayaniklilik seceneklerini acik tutar.",
      },
      {
        label: "Cok rahatim",
        weights: { yuzme: 3, pilatesYoga: 1, bisiklet: 1 },
        explanation: "Suda rahatlik, teknik yuzme ve duzenli antrenman surekliligini artirir.",
      },
    ],
  },
  {
    id: "Q12",
    text: "Reaksiyon hizina dayali sporlara ilgini nasil tanimlarsin?",
    category: "motoric",
    options: [
      {
        label: "Dusuk",
        weights: { pilatesYoga: 2, bisiklet: 1, tenis: -1 },
        explanation: "Reaksiyon talepleri dusuk sporlarda ritim ve kontrol odagi on plandadir.",
      },
      {
        label: "Orta",
        weights: { tenis: 1, boksUzakDogu: 1, basketbolVoleybol: 1 },
        explanation: "Orta ilgi, teknik reflekslerin adim adim gelistirilmesine uygundur.",
      },
      {
        label: "Yuksek",
        weights: { tenis: 3, boksUzakDogu: 3, basketbolVoleybol: 2 },
        explanation: "Yuksek ilgi, hizli uyaran-islem-tepki dongusune sahip branslara uygunluk gosterir.",
      },
    ],
  },
  {
    id: "Q13",
    text: "Omuz-kol kuvvetini gerektiren hareketlerde nasilsin?",
    category: "anthropometric",
    options: [
      {
        label: "Sinirli",
        weights: { pilatesYoga: 2, kosu: 1, vucutGelistirme: -1 },
        explanation: "Omuz kuvveti sinirliysa yuklenme dozunu kontrollu artirmak gerekir.",
      },
      {
        label: "Orta",
        weights: { yuzme: 2, tenis: 1, calisthenics: 1 },
        explanation: "Orta omuz kuvveti teknik ve dayaniklilik sporlarina dengeli gecis saglar.",
      },
      {
        label: "Guclu",
        weights: { calisthenics: 3, vucutGelistirme: 2, boksUzakDogu: 2 },
        explanation: "Guclu omuz-kol kapasitesi ust ekstremite talepli sporlari destekler.",
      },
    ],
  },
  {
    id: "Q14",
    text: "Patlayici guc gerektiren aktivitelerde performansin nasil?",
    category: "motoric",
    options: [
      {
        label: "Dusuk",
        weights: { pilatesYoga: 2, bisiklet: 1, basketbolVoleybol: -1 },
        explanation: "Dusuk patlayici guc durumunda kontrollu kuvvet altyapisi once gelir.",
      },
      {
        label: "Orta",
        weights: { boksUzakDogu: 1, tenis: 1, basketbolVoleybol: 1 },
        explanation: "Orta seviye, teknikle birlestiginde patlayici hareketleri gelistirebilir.",
      },
      {
        label: "Yuksek",
        weights: { basketbolVoleybol: 3, boksUzakDogu: 2, calisthenics: 2 },
        explanation: "Yuksek patlayici guc, sicta guc cikisi gereken sporlarda avantaj saglar.",
      },
    ],
  },
  {
    id: "Q15",
    text: "Uzun sure ayni tempoda devam etme kapasiten nasil?",
    category: "motoric",
    options: [
      {
        label: "Sinirli",
        weights: { pilatesYoga: 2, vucutGelistirme: 1, kosu: -1 },
        explanation: "Dusuk sureklilikte interval yerine kontrol odakli calisma daha uygundur.",
      },
      {
        label: "Orta",
        weights: { bisiklet: 2, yuzme: 1, kosu: 1 },
        explanation: "Orta sureklilik kapasitesi, dayaniklilik tabanli planlari kaldirir.",
      },
      {
        label: "Yuksek",
        weights: { kosu: 3, bisiklet: 3, yuzme: 2 },
        explanation: "Yuksek sureklilik, uzun mesafe odakli sporlar icin guclu bir gostergedir.",
      },
    ],
  },
  {
    id: "Q16",
    text: "Takim ortaminda mi yoksa bireysel calismada mi daha verimlisin?",
    category: "health",
    options: [
      {
        label: "Bireysel",
        weights: { kosu: 2, bisiklet: 2, vucutGelistirme: 2 },
        explanation: "Bireysel motivasyon, kendi ritmine gore ilerleyen sporlarda gucludur.",
      },
      {
        label: "Her ikisi",
        weights: { tenis: 2, yuzme: 1, calisthenics: 1 },
        explanation: "Esnek motivasyon, hem bireysel hem yarismaci alanlarda avantaj saglar.",
      },
      {
        label: "Takim",
        weights: { basketbolVoleybol: 3, tenis: 1, boksUzakDogu: -1 },
        explanation: "Takim etkilesimi, ortak strateji ve iletisim gerektiren branslarda etkilidir.",
      },
    ],
  },
  {
    id: "Q17",
    text: "Antrenman sonrasinda toparlanma hizini nasil degerlendirirsin?",
    category: "health",
    options: [
      {
        label: "Yavas",
        weights: { pilatesYoga: 2, yuzme: 1, boksUzakDogu: -1 },
        explanation: "Yavas toparlanmada yuklenme yonetimi ve aktif toparlanma kritik olur.",
      },
      {
        label: "Orta",
        weights: { bisiklet: 1, tenis: 1, kosu: 1 },
        explanation: "Orta toparlanma, duzenli ama dengeli bir antrenman yogunlugu gerektirir.",
      },
      {
        label: "Hizli",
        weights: { calisthenics: 2, vucutGelistirme: 2, kosu: 2 },
        explanation: "Hizli toparlanma daha sik ve yogun antrenman dongulerini destekler.",
      },
    ],
  },
  {
    id: "Q18",
    text: "Omurga ve core stabiliteni nasil goruyorsun?",
    category: "anthropometric",
    options: [
      {
        label: "Gelismeli",
        weights: { pilatesYoga: 3, yuzme: 1, calisthenics: -1 },
        explanation: "Core stabilite eksiginde once kontrol ve postur odakli calisma gerekir.",
      },
      {
        label: "Orta",
        weights: { tenis: 1, bisiklet: 1, vucutGelistirme: 1 },
        explanation: "Orta seviye core, farkli branslarda guvenli kuvvet aktarimi saglar.",
      },
      {
        label: "Guclu",
        weights: { calisthenics: 3, boksUzakDogu: 2, vucutGelistirme: 2 },
        explanation: "Guclu core, tum vucut koordinasyonu ve guc aktarimini belirgin arttirir.",
      },
    ],
  },
  {
    id: "Q19",
    text: "Alt ekstremite uzunlugun ve adim verimliligin nasil?",
    category: "anthropometric",
    options: [
      {
        label: "Kisa adim, dusuk verim",
        weights: { pilatesYoga: 1, vucutGelistirme: 1, kosu: -1 },
        explanation: "Dusuk adim veriminde once teknik ve kuvvet dengesi gelistirilir.",
      },
      {
        label: "Orta",
        weights: { bisiklet: 2, tenis: 1, kosu: 1 },
        explanation: "Orta biomekanik verim, birden fazla bransa uyarlanabilir.",
      },
      {
        label: "Uzun adim, yuksek verim",
        weights: { kosu: 3, basketbolVoleybol: 2, bisiklet: 2 },
        explanation: "Yuksek adim verimliligi, mesafe ve tempoya dayali branslarda avantajlidir.",
      },
    ],
  },
  {
    id: "Q20",
    text: "Yarisma stresi altinda odagini koruyabiliyor musun?",
    category: "health",
    options: [
      {
        label: "Zorlanirim",
        weights: { pilatesYoga: 3, yuzme: 1, basketbolVoleybol: -1 },
        explanation: "Stres yonetiminde zorlukta nefes ve ritim odakli sporlar destek olur.",
      },
      {
        label: "Bazen",
        weights: { tenis: 1, bisiklet: 1, kosu: 1 },
        explanation: "Degisken odaklanma, kontrollu rekabet ortamlariyla iyilesebilir.",
      },
      {
        label: "Evet",
        weights: { boksUzakDogu: 3, basketbolVoleybol: 2, tenis: 2 },
        explanation: "Yuksek mental dayaniklilik, rekabet baskisi olan branslarda kritik avantajdir.",
      },
    ],
  },
];

