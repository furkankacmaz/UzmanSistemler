<<<<<<< HEAD
# UzmanSistemler
Spora Yonlendirme Uzman Sistemi
=======
# Spora Yönlendirme ve Atletik Profil Analiz Uzman Sistemi

Bu doküman, Expert Systems (Uzman Sistemler) dersi kapsamında geliştirilen, "Antigravity" tasarım dilini benimsemiş, web tabanlı bir karar destek sisteminin teknik ve operasyonel planını içermektedir.

## 1. Proje Vizyonu
Kullanıcıların antropometrik ölçümleri, motorik yetenekleri ve sağlık kısıtlamalarını analiz ederek, onları en yüksek potansiyele ulaşabilecekleri spor branşlarıyla eşleştiren, şeffaf ve analitik bir rehber oluşturmak.

---

## 2. Teknoloji Yığını (Tech Stack)

### Çekirdek Yapı
- **Framework:** React 18
- **Language:** TypeScript (Tip güvenliği ve kuralların yönetimi için)
- **Build Tool:** Vite
- **Routing:** React Router

### Tasarım & UI/UX
- **Styling:** Tailwind CSS (Aydınlık Tema & Minimalist Layout)
- **Motion:** GSAP (Akıcı geçişler, özel imleç ve Timeline yönetimi)

### 3. Boyut ve Görselleştirme
- **Engine:** Three.js
- **React Integration:** @react-three/fiber
- **Helper Library:** @react-three/drei
- **Model:** Low-poly / Line-art Human Anatomy Model

---

## 3. Uzman Sistem Algoritması (Karar Mekanizması)

Sistem, **Ağırlıklı Puanlama Matrisi (Weighted Scoring Matrix)** üzerinden çalışır. Her girdi, branşlar üzerinde pozitif veya negatif bir etki (weight) yaratır.

### Veri Şeması (TypeScript Interface)

```typescript
interface SportScores {
  yuzme: number;
  kosu: number;
  bisiklet: number;
  vucutGelistirme: number;
  pilatesYoga: number;
  basketbolVoleybol: number;
  tenis: number;
  calisthenics: number;
  boksUzakDogu: number;
}

interface Question {
  id: string;
  text: string;
  category: 'health' | 'anthropometric' | 'motoric';
  options: {
    label: string;
    weights: Partial<SportScores>;
    explanation: string; // "Neden?" sorusuna yanıt
  }[];
}
>>>>>>> e45991c (Projeyi guncelle: koyu tema ve gorev plani)
