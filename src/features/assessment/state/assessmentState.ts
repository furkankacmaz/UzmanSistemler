import { createContext } from "react";
import { demoChildProfile } from "@/data/demoChildProfile";
import { questionBank } from "@/data/questionBank";
import type { AnswerMap } from "@/engine/assessmentEngine";
import type { ChildProfile } from "@/engine/childProfile";
import type { QuestionCategory } from "@/types/domain";

export const CATEGORY_ORDER: QuestionCategory[] = ["health", "anthropometric", "motoric"];

type StoredAnswers = Partial<Record<string, number>>;

export interface AssessmentState {
  profile: ChildProfile;
  answers: StoredAnswers;
  currentStep: number;
}

export type AssessmentAction =
  | { type: "set-profile-field"; field: keyof ChildProfile; value: number }
  | { type: "set-answer"; questionId: string; optionIndex: number }
  | { type: "next-step" }
  | { type: "previous-step" }
  | { type: "set-step"; step: number }
  | { type: "reset" };

export interface AssessmentContextValue {
  state: AssessmentState;
  categoryOrder: QuestionCategory[];
  totalSteps: number;
  totalQuestionCount: number;
  answeredCount: number;
  completionPercent: number;
  isStepComplete: (stepIndex: number) => boolean;
  asAnswerMap: () => AnswerMap;
  setProfileField: (field: keyof ChildProfile, value: number) => void;
  setAnswer: (questionId: string, optionIndex: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStep: (step: number) => void;
  resetAll: () => void;
}

export const questionIdsByCategory = CATEGORY_ORDER.reduce<Record<QuestionCategory, string[]>>(
  (acc, category) => {
    acc[category] = questionBank.filter((question) => question.category === category).map((question) => question.id);
    return acc;
  },
  {
    health: [],
    anthropometric: [],
    motoric: [],
  }
);

export const initialState: AssessmentState = {
  profile: { ...demoChildProfile },
  answers: {},
  currentStep: 0,
};

export const AssessmentContext = createContext<AssessmentContextValue | null>(null);

function clampStep(step: number): number {
  return Math.min(Math.max(step, 0), CATEGORY_ORDER.length - 1);
}

export function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case "set-profile-field":
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.field]: action.value,
        },
      };
    case "set-answer":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.optionIndex,
        },
      };
    case "next-step":
      return {
        ...state,
        currentStep: clampStep(state.currentStep + 1),
      };
    case "previous-step":
      return {
        ...state,
        currentStep: clampStep(state.currentStep - 1),
      };
    case "set-step":
      return {
        ...state,
        currentStep: clampStep(action.step),
      };
    case "reset":
      return {
        profile: { ...demoChildProfile },
        answers: {},
        currentStep: 0,
      };
    default:
      return state;
  }
}
