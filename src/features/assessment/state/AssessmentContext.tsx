import { useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import { questionBank } from "@/data/questionBank";
import type { AnswerMap } from "@/engine/assessmentEngine";
import {
  AssessmentContext,
  type AssessmentContextValue,
  CATEGORY_ORDER,
  assessmentReducer,
  initialState,
  questionIdsByCategory,
} from "@/features/assessment/state/assessmentState";

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const value = useMemo<AssessmentContextValue>(() => {
    const answeredCount = Object.values(state.answers).filter((value) => typeof value === "number").length;
    const totalQuestionCount = questionBank.length;
    const completionPercent = Math.round((answeredCount / totalQuestionCount) * 100);

    return {
      state,
      categoryOrder: CATEGORY_ORDER,
      totalSteps: CATEGORY_ORDER.length,
      totalQuestionCount,
      answeredCount,
      completionPercent,
      isStepComplete: (stepIndex: number) => {
        const category = CATEGORY_ORDER[stepIndex];
        const ids = questionIdsByCategory[category];
        return ids.every((id) => typeof state.answers[id] === "number");
      },
      asAnswerMap: () => {
        return Object.entries(state.answers).reduce<AnswerMap>((acc, [questionId, optionIndex]) => {
          if (typeof optionIndex === "number") {
            acc[questionId] = optionIndex;
          }
          return acc;
        }, {});
      },
      setProfileField: (field, value) => {
        dispatch({ type: "set-profile-field", field, value });
      },
      setAnswer: (questionId, optionIndex) => {
        dispatch({ type: "set-answer", questionId, optionIndex });
      },
      goToNextStep: () => {
        dispatch({ type: "next-step" });
      },
      goToPreviousStep: () => {
        dispatch({ type: "previous-step" });
      },
      setStep: (step) => {
        dispatch({ type: "set-step", step });
      },
      resetAll: () => {
        dispatch({ type: "reset" });
      },
    };
  }, [state]);

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}
