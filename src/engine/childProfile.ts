export interface ChildProfile {
  age: number;
  heightCm: number;
  weightKg: number;
  armSpanCm: number;
  restingHeartRate: number;
  weeklyActivityDays: number;
}

export type SuitabilitySeverity = "error" | "warning";

export interface SuitabilityIssue {
  field: keyof ChildProfile | "profile";
  severity: SuitabilitySeverity;
  message: string;
}

export interface ChildMetrics {
  bmi: number;
  armSpanToHeightRatio: number;
}

export interface SuitabilityReport {
  isEligible: boolean;
  metrics: ChildMetrics;
  issues: SuitabilityIssue[];
}

function roundTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

export function evaluateChildProfile(profile: ChildProfile): SuitabilityReport {
  const issues: SuitabilityIssue[] = [];
  const heightMeter = profile.heightCm / 100;
  const bmi = roundTwo(profile.weightKg / (heightMeter * heightMeter));
  const armSpanToHeightRatio = roundTwo(profile.armSpanCm / profile.heightCm);

  if (!Number.isInteger(profile.age)) {
    issues.push({
      field: "age",
      severity: "error",
      message: "Yas tam sayi olmali.",
    });
  }

  if (profile.age < 7 || profile.age > 14) {
    issues.push({
      field: "age",
      severity: "error",
      message: "Sistem yalnizca 7-14 yas araligindaki cocuklar icin tasarlandi.",
    });
  }

  if (profile.heightCm < 110 || profile.heightCm > 190) {
    issues.push({
      field: "heightCm",
      severity: "warning",
      message: "Boy degeri 7-14 yas icin beklenen araligin disinda gorunuyor.",
    });
  }

  if (profile.weightKg < 18 || profile.weightKg > 110) {
    issues.push({
      field: "weightKg",
      severity: "warning",
      message: "Kilo degeri 7-14 yas icin beklenen araligin disinda gorunuyor.",
    });
  }

  if (profile.armSpanCm < 100 || profile.armSpanCm > 205) {
    issues.push({
      field: "armSpanCm",
      severity: "warning",
      message: "Kulac degeri 7-14 yas icin beklenen araligin disinda gorunuyor.",
    });
  }

  if (profile.restingHeartRate < 45 || profile.restingHeartRate > 130) {
    issues.push({
      field: "restingHeartRate",
      severity: "warning",
      message: "Dinlenik nabiz degeri olcum veya kayit hatasi icerebilir.",
    });
  }

  if (!Number.isInteger(profile.weeklyActivityDays)) {
    issues.push({
      field: "weeklyActivityDays",
      severity: "error",
      message: "Haftalik aktivite gunu tam sayi olmali.",
    });
  }

  if (profile.weeklyActivityDays < 0 || profile.weeklyActivityDays > 7) {
    issues.push({
      field: "weeklyActivityDays",
      severity: "error",
      message: "Haftalik aktivite gunu 0 ile 7 arasinda olmali.",
    });
  }

  if (!Number.isFinite(bmi) || bmi < 10 || bmi > 40) {
    issues.push({
      field: "profile",
      severity: "warning",
      message: "Boy-kilo iliskisi beklenen sinirlarin disinda. Olcumleri tekrar kontrol edin.",
    });
  }

  if (armSpanToHeightRatio < 0.9 || armSpanToHeightRatio > 1.1) {
    issues.push({
      field: "profile",
      severity: "warning",
      message: "Kulac-boy orani tipik araligin disinda gorunuyor.",
    });
  }

  return {
    isEligible: issues.every((issue) => issue.severity !== "error"),
    metrics: {
      bmi,
      armSpanToHeightRatio,
    },
    issues,
  };
}
