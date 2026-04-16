import type { Question, QuestionCategory, SportKey, SportScores } from "@/types/domain";
import { SPORT_KEYS } from "@/types/domain";
import type { ChildProfile, SuitabilityReport } from "@/engine/childProfile";
import { evaluateChildProfile } from "@/engine/childProfile";

export type AnswerMap = Record<string, number>;

export interface ScoreContribution {
  source: "question" | "profile-adjustment";
  questionId: string;
  questionText: string;
  optionLabel: string;
  explanation: string;
  category: QuestionCategory | "profile";
  weight: number;
}

export interface RankedSport {
  sport: SportKey;
  label: string;
  score: number;
  reasons: ScoreContribution[];
}

export interface DecisionTreeOutput {
  path: string[];
  leaf: string;
  mermaid: string;
}

export interface AreaSummary {
  strengths: string[];
  developmentAreas: string[];
  categoryScores: Record<QuestionCategory, number>;
}

export interface AssessmentEngineResult {
  suitability: SuitabilityReport;
  scores: SportScores;
  topSports: RankedSport[];
  criticalInsights: string[];
  decisionTree: DecisionTreeOutput;
  areaSummary: AreaSummary;
}

const SPORT_LABELS: Record<SportKey, string> = {
  yuzme: "Yuzme",
  kosu: "Kosu",
  bisiklet: "Bisiklet",
  vucutGelistirme: "Vucut Gelistirme",
  pilatesYoga: "Pilates / Yoga",
  basketbolVoleybol: "Basketbol / Voleybol",
  tenis: "Tenis",
  calisthenics: "Calisthenics",
  boksUzakDogu: "Boks / Uzak Dogu",
};

const AGE_7_10_PRIORITY: SportKey[] = [
  "yuzme",
  "pilatesYoga",
  "basketbolVoleybol",
  "tenis",
  "bisiklet",
  "kosu",
  "calisthenics",
  "boksUzakDogu",
  "vucutGelistirme",
];

const AGE_11_14_PRIORITY: SportKey[] = [
  "yuzme",
  "basketbolVoleybol",
  "tenis",
  "kosu",
  "bisiklet",
  "calisthenics",
  "boksUzakDogu",
  "pilatesYoga",
  "vucutGelistirme",
];

function getAgePriority(age: number): SportKey[] {
  return age <= 10 ? AGE_7_10_PRIORITY : AGE_11_14_PRIORITY;
}

function getPriorityIndex(age: number, sport: SportKey): number {
  return getAgePriority(age).indexOf(sport);
}

export function createZeroScores(): SportScores {
  return {
    yuzme: 0,
    kosu: 0,
    bisiklet: 0,
    vucutGelistirme: 0,
    pilatesYoga: 0,
    basketbolVoleybol: 0,
    tenis: 0,
    calisthenics: 0,
    boksUzakDogu: 0,
  };
}

export function buildNeutralAnswerMap(questions: Question[]): AnswerMap {
  return questions.reduce<AnswerMap>((acc, question) => {
    acc[question.id] = Math.floor(question.options.length / 2);
    return acc;
  }, {});
}

function createContributionMap(): Record<SportKey, ScoreContribution[]> {
  return SPORT_KEYS.reduce<Record<SportKey, ScoreContribution[]>>((acc, sportKey) => {
    acc[sportKey] = [];
    return acc;
  }, {} as Record<SportKey, ScoreContribution[]>);
}

function applyWeight(
  scores: SportScores,
  contributions: Record<SportKey, ScoreContribution[]>,
  sportKey: SportKey,
  weight: number,
  contribution: ScoreContribution
): void {
  scores[sportKey] += weight;
  contributions[sportKey].push(contribution);
}

function applyQuestionWeights(
  scores: SportScores,
  contributions: Record<SportKey, ScoreContribution[]>,
  question: Question,
  optionIndex: number
): void {
  const option = question.options[optionIndex];

  if (!option) {
    return;
  }

  const weightEntries = Object.entries(option.weights) as [SportKey, number][];

  weightEntries.forEach(([sportKey, weight]) => {
    applyWeight(scores, contributions, sportKey, weight, {
      source: "question",
      questionId: question.id,
      questionText: question.text,
      optionLabel: option.label,
      explanation: option.explanation,
      category: question.category,
      weight,
    });
  });
}

function applyProfileAdjustments(
  profile: ChildProfile,
  suitability: SuitabilityReport,
  scores: SportScores,
  contributions: Record<SportKey, ScoreContribution[]>
): void {
  if (!suitability.isEligible) {
    return;
  }

  if (profile.age <= 10) {
    applyWeight(scores, contributions, "yuzme", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-AGE",
      questionText: "Yas bazli guvenlik ayari",
      optionLabel: "7-10 yas",
      explanation: "Erken yas grubunda teknik, koordinatif ve dusuk darbe sporlari desteklenir.",
      category: "profile",
      weight: 1,
    });

    applyWeight(scores, contributions, "pilatesYoga", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-AGE",
      questionText: "Yas bazli guvenlik ayari",
      optionLabel: "7-10 yas",
      explanation: "Postur ve hareket kalitesi odakli sporlar erken yas icin avantajlidir.",
      category: "profile",
      weight: 1,
    });

    applyWeight(scores, contributions, "vucutGelistirme", -2, {
      source: "profile-adjustment",
      questionId: "PROFILE-AGE",
      questionText: "Yas bazli guvenlik ayari",
      optionLabel: "7-10 yas",
      explanation: "Yuksek yuklenmeli kuvvet odakli antrenmanlar bu yas grubunda sinirlanir.",
      category: "profile",
      weight: -2,
    });
  }

  if (suitability.metrics.armSpanToHeightRatio >= 1.02) {
    applyWeight(scores, contributions, "yuzme", 2, {
      source: "profile-adjustment",
      questionId: "PROFILE-ARMSPAN",
      questionText: "Kulac-boy orani",
      optionLabel: "Kulac avantaji",
      explanation: "Yuksek kulac-boy orani cekis ve erisim gerektiren branslarda avantaj saglar.",
      category: "profile",
      weight: 2,
    });

    applyWeight(scores, contributions, "basketbolVoleybol", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-ARMSPAN",
      questionText: "Kulac-boy orani",
      optionLabel: "Kulac avantaji",
      explanation: "Uzun erisim takim oyunlarinda savunma ve blok performansini destekler.",
      category: "profile",
      weight: 1,
    });

    applyWeight(scores, contributions, "tenis", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-ARMSPAN",
      questionText: "Kulac-boy orani",
      optionLabel: "Kulac avantaji",
      explanation: "Raket sporlarinda erisim mesafesi vurus kalitesini olumlu etkiler.",
      category: "profile",
      weight: 1,
    });
  }

  if (profile.weeklyActivityDays <= 2) {
    applyWeight(scores, contributions, "pilatesYoga", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-FREQUENCY",
      questionText: "Haftalik aktivite ritmi",
      optionLabel: "Dusuk ritim",
      explanation: "Dusuk ritimde surdurulebilirlik odakli antrenman secenekleri onceliklenir.",
      category: "profile",
      weight: 1,
    });

    applyWeight(scores, contributions, "yuzme", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-FREQUENCY",
      questionText: "Haftalik aktivite ritmi",
      optionLabel: "Dusuk ritim",
      explanation: "Dusuk darbeli ve teknik odakli disiplinler ritim dusuklugunde daha guvenli olur.",
      category: "profile",
      weight: 1,
    });

    applyWeight(scores, contributions, "boksUzakDogu", -1, {
      source: "profile-adjustment",
      questionId: "PROFILE-FREQUENCY",
      questionText: "Haftalik aktivite ritmi",
      optionLabel: "Dusuk ritim",
      explanation: "Yuksek teknik-tekrar talep eden branslarda tutarlilik ritim dusukken zorlasabilir.",
      category: "profile",
      weight: -1,
    });
  }

  if (profile.weeklyActivityDays >= 5 && profile.age >= 12) {
    applyWeight(scores, contributions, "kosu", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-FREQUENCY",
      questionText: "Haftalik aktivite ritmi",
      optionLabel: "Yuksek ritim",
      explanation: "Yuksek ritim duzenli dayaniklilik yuklenmesine uygunluk saglar.",
      category: "profile",
      weight: 1,
    });

    applyWeight(scores, contributions, "bisiklet", 1, {
      source: "profile-adjustment",
      questionId: "PROFILE-FREQUENCY",
      questionText: "Haftalik aktivite ritmi",
      optionLabel: "Yuksek ritim",
      explanation: "Duzenli efor, ritim ve kadans gerektiren sporlar icin olumlu bir gostergedir.",
      category: "profile",
      weight: 1,
    });
  }
}

function rankSports(
  profile: ChildProfile,
  scores: SportScores,
  contributions: Record<SportKey, ScoreContribution[]>
): RankedSport[] {
  const sports = [...SPORT_KEYS];

  sports.sort((a, b) => {
    const scoreDiff = scores[b] - scores[a];
    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    const positiveCountDiff =
      contributions[b].filter((item) => item.weight > 0).length -
      contributions[a].filter((item) => item.weight > 0).length;

    if (positiveCountDiff !== 0) {
      return positiveCountDiff;
    }

    const priorityDiff = getPriorityIndex(profile.age, a) - getPriorityIndex(profile.age, b);
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return a.localeCompare(b);
  });

  return sports.map((sport) => ({
    sport,
    label: SPORT_LABELS[sport],
    score: scores[sport],
    reasons: [...contributions[sport]]
      .sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight))
      .slice(0, 3),
  }));
}

function extractCriticalInsights(topSports: RankedSport[]): string[] {
  const insights: string[] = [];
  const seen = new Set<string>();

  topSports
    .flatMap((sport) => sport.reasons.map((reason) => ({ sport, reason })))
    .sort((a, b) => Math.abs(b.reason.weight) - Math.abs(a.reason.weight))
    .forEach(({ sport, reason }) => {
      const key = `${sport.sport}-${reason.questionId}-${reason.optionLabel}-${reason.weight}`;

      if (seen.has(key) || insights.length >= 5) {
        return;
      }

      seen.add(key);
      insights.push(
        `${sport.label}: ${reason.questionText} -> ${reason.optionLabel} (${reason.weight > 0 ? "+" : ""}${reason.weight})`
      );
    });

  return insights;
}

function buildDecisionTree(
  profile: ChildProfile,
  suitability: SuitabilityReport,
  topSports: RankedSport[]
): DecisionTreeOutput {
  if (!suitability.isEligible) {
    return {
      path: [
        "Yas ve veri uygunluk kontrolu basarisiz",
        "Profil 7-14 yas karar uzayi disinda oldugu icin otomatik eslestirme durduruldu",
      ],
      leaf: "Pediatrik uzman gorusu sonrasinda yeniden degerlendirme",
      mermaid: [
        "flowchart TD",
        "  A[Profil Girisi] --> B{Yas 7-14?}",
        "  B -- Hayir --> C[Otomatik oneriyi durdur]",
        "  C --> D[Pediatrik uzman yonlendirmesi]",
      ].join("\n"),
    };
  }

  const activityBranch = profile.weeklyActivityDays <= 2 ? "Dusuk" : "Orta-Yuksek";
  const armSpanBranch = suitability.metrics.armSpanToHeightRatio >= 1.02 ? "Avantajli" : "Notr";
  const topLabels = topSports.slice(0, 3).map((item) => item.label).join(" / ");

  return {
    path: [
      `Yas kontrolu: ${profile.age} (uygun)`,
      `Aktivite ritmi: ${activityBranch}`,
      `Kulac-boy orani: ${armSpanBranch} (${suitability.metrics.armSpanToHeightRatio})`,
      `Skor siralamasi: ${topLabels}`,
    ],
    leaf: `Oncelikli sporlar: ${topLabels}`,
    mermaid: [
      "flowchart TD",
      "  A[Profil Girisi] --> B{Yas 7-14?}",
      "  B -- Evet --> C{Haftalik Aktivite <= 2?}",
      "  B -- Hayir --> Z[Uzman Degerlendirmesi]",
      "  C -- Evet --> D[Dusuk etkili ve teknik odakli havuz]",
      "  C -- Hayir --> E{Kulac/Boy >= 1.02?}",
      "  E -- Evet --> F[Yuzme + Takim Oyunlari guclenir]",
      "  E -- Hayir --> G[Dengeli dayaniklilik ve koordinasyon havuzu]",
      `  D --> H[${topLabels}]`,
      `  F --> H[${topLabels}]`,
      `  G --> H[${topLabels}]`,
    ].join("\n"),
  };
}

function getSigned(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

function buildAreaSummary(
  contributions: Record<SportKey, ScoreContribution[]>,
  suitability: SuitabilityReport
): AreaSummary {
  const categoryScores: Record<QuestionCategory, number> = {
    health: 0,
    anthropometric: 0,
    motoric: 0,
  };

  const impactMap = new Map<
    string,
    {
      source: ScoreContribution["source"];
      questionText: string;
      optionLabel: string;
      explanation: string;
      category: ScoreContribution["category"];
      netWeight: number;
    }
  >();

  Object.values(contributions)
    .flat()
    .forEach((item) => {
      const key = `${item.source}-${item.questionId}-${item.optionLabel}`;
      const existing = impactMap.get(key);

      if (!existing) {
        impactMap.set(key, {
          source: item.source,
          questionText: item.questionText,
          optionLabel: item.optionLabel,
          explanation: item.explanation,
          category: item.category,
          netWeight: item.weight,
        });
      } else {
        existing.netWeight += item.weight;
      }

      if (item.category !== "profile") {
        categoryScores[item.category] += item.weight;
      }
    });

  const impacts = [...impactMap.values()];
  const positiveImpacts = impacts.filter((item) => item.netWeight > 0).sort((a, b) => b.netWeight - a.netWeight);
  const negativeImpacts = impacts.filter((item) => item.netWeight < 0).sort((a, b) => a.netWeight - b.netWeight);

  const categoryLabelMap: Record<QuestionCategory, string> = {
    health: "Saglik",
    anthropometric: "Antropometrik",
    motoric: "Motorik",
  };

  const strongestCategory = ([...Object.entries(categoryScores)] as [QuestionCategory, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const weakestCategory = ([...Object.entries(categoryScores)] as [QuestionCategory, number][]).sort(
    (a, b) => a[1] - b[1]
  )[0];

  const strengths = positiveImpacts.slice(0, 3).map((item) => {
    return `${item.questionText}: ${item.optionLabel} (etki ${getSigned(item.netWeight)})`;
  });

  const developmentAreas = negativeImpacts.slice(0, 3).map((item) => {
    return `${item.questionText}: ${item.optionLabel} (etki ${getSigned(item.netWeight)})`;
  });

  if (strongestCategory && strongestCategory[1] > 0) {
    strengths.push(`${categoryLabelMap[strongestCategory[0]]} kategorisinde olumlu uyum (net ${getSigned(strongestCategory[1])})`);
  }

  if (weakestCategory && weakestCategory[1] < 0) {
    developmentAreas.push(
      `${categoryLabelMap[weakestCategory[0]]} kategorisinde gelisim alani gorunuyor (net ${getSigned(weakestCategory[1])})`
    );
  }

  if (developmentAreas.length === 0) {
    if (suitability.issues.length > 0) {
      developmentAreas.push(
        ...suitability.issues
          .filter((item) => item.severity === "warning")
          .slice(0, 2)
          .map((item) => item.message)
      );
    }

    if (developmentAreas.length === 0) {
      developmentAreas.push("Belirgin negatif etki yok. Teknik gelisim ve duzenli antrenmanla denge korunabilir.");
    }
  }

  return {
    strengths,
    developmentAreas,
    categoryScores,
  };
}

export function runAssessment(
  questions: Question[],
  answers: AnswerMap,
  profile: ChildProfile
): AssessmentEngineResult {
  const suitability = evaluateChildProfile(profile);
  const scores = createZeroScores();
  const contributions = createContributionMap();

  questions.forEach((question) => {
    const optionIndex = answers[question.id];

    if (typeof optionIndex !== "number") {
      return;
    }

    applyQuestionWeights(scores, contributions, question, optionIndex);
  });

  applyProfileAdjustments(profile, suitability, scores, contributions);

  const ranked = rankSports(profile, scores, contributions);
  const topSports = ranked.slice(0, 3);

  return {
    suitability,
    scores,
    topSports,
    criticalInsights: extractCriticalInsights(topSports),
    decisionTree: buildDecisionTree(profile, suitability, topSports),
    areaSummary: buildAreaSummary(contributions, suitability),
  };
}
