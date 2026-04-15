import { SPORT_KEYS } from "@/types/domain";
import type { Question } from "@/types/domain";

export interface ValidationIssue {
  questionId: string;
  optionIndex?: number;
  message: string;
}

const VALID_CATEGORIES = new Set(["health", "anthropometric", "motoric"]);
const VALID_SPORT_KEYS = new Set<string>(SPORT_KEYS);

export function validateQuestionBank(questions: Question[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const question of questions) {
    if (!VALID_CATEGORIES.has(question.category)) {
      issues.push({
        questionId: question.id,
        message: `Gecersiz kategori: ${question.category}`,
      });
    }

    if (question.options.length === 0) {
      issues.push({
        questionId: question.id,
        message: "Soru en az bir secenek icermeli.",
      });
    }

    question.options.forEach((option, index) => {
      if (option.explanation.trim().length === 0) {
        issues.push({
          questionId: question.id,
          optionIndex: index,
          message: "Secenek aciklamasi bos olamaz.",
        });
      }

      const weightEntries = Object.entries(option.weights);

      if (weightEntries.length === 0) {
        issues.push({
          questionId: question.id,
          optionIndex: index,
          message: "Secenekte en az bir agirlik tanimi olmali.",
        });
      }

      for (const [sportKey, weight] of weightEntries) {
        if (!VALID_SPORT_KEYS.has(sportKey)) {
          issues.push({
            questionId: question.id,
            optionIndex: index,
            message: `Gecersiz spor anahtari: ${sportKey}`,
          });
        }

        if (typeof weight !== "number" || Number.isNaN(weight) || !Number.isFinite(weight)) {
          issues.push({
            questionId: question.id,
            optionIndex: index,
            message: `Gecersiz agirlik degeri: ${String(weight)}`,
          });
        }
      }
    });
  }

  return issues;
}