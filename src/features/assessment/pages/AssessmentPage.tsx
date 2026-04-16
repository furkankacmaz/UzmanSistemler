import { questionBank } from "@/data/questionBank";
import { runAssessment } from "@/engine/assessmentEngine";
import { validateQuestionBank } from "@/engine/validateQuestionBank";
import { useAssessment } from "@/features/assessment/state/useAssessment";
import { useNavigate } from "react-router-dom";

const CATEGORY_LABELS = {
  health: "Saglik",
  anthropometric: "Antropometrik",
  motoric: "Motorik",
} as const;

const PROFILE_FIELDS: Array<{
  field: "age" | "heightCm" | "weightKg" | "armSpanCm" | "restingHeartRate" | "weeklyActivityDays";
  label: string;
  min: number;
  max: number;
}> = [
  { field: "age", label: "Yas", min: 7, max: 14 },
  { field: "heightCm", label: "Boy (cm)", min: 110, max: 190 },
  { field: "weightKg", label: "Kilo (kg)", min: 18, max: 110 },
  { field: "armSpanCm", label: "Kulac (cm)", min: 100, max: 205 },
  { field: "restingHeartRate", label: "Dinlenik Nabiz", min: 45, max: 130 },
  { field: "weeklyActivityDays", label: "Haftalik Aktivite Gunu", min: 0, max: 7 },
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const {
    state,
    categoryOrder,
    totalSteps,
    totalQuestionCount,
    answeredCount,
    completionPercent,
    isStepComplete,
    asAnswerMap,
    setProfileField,
    setAnswer,
    goToNextStep,
    goToPreviousStep,
    setStep,
  } = useAssessment();

  const validationIssues = validateQuestionBank(questionBank);
  const assessment = runAssessment(questionBank, asAnswerMap(), state.profile);
  const currentCategory = categoryOrder[state.currentStep];
  const currentQuestions = questionBank.filter((question) => question.category === currentCategory);
  const isCurrentStepComplete = isStepComplete(state.currentStep);
  const isFirstStep = state.currentStep === 0;
  const isLastStep = state.currentStep === totalSteps - 1;
  const currentStepRatio = Math.round(((state.currentStep + 1) / totalSteps) * 100);

  function handleProfileChange(
    field: "age" | "heightCm" | "weightKg" | "armSpanCm" | "restingHeartRate" | "weeklyActivityDays",
    rawValue: string
  ) {
    const nextValue = Number(rawValue);
    if (Number.isNaN(nextValue)) {
      return;
    }

    setProfileField(field, nextValue);
  }

  function handleNextAction() {
    if (!isCurrentStepComplete) {
      return;
    }

    if (isLastStep) {
      navigate("/sonuc");
      return;
    }

    goToNextStep();
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="mb-3 text-3xl font-bold text-slate-100">Test Akisi</h1>
      <p className="text-slate-300">
        Kategori bazli cok adimli anket akisi ve cocuk profil girdileri bu
        ekrandan yonetilir.
      </p>

      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
        <p className="text-slate-200">Soru sayisi: {questionBank.length}</p>
        <p className={validationIssues.length > 0 ? "text-amber-300" : "text-emerald-300"}>
          Veri dogrulama: {validationIssues.length > 0 ? `${validationIssues.length} sorun` : "Sorun yok"}
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-cyan-800/70 bg-cyan-950/30 p-4">
        <h2 className="mb-3 text-lg font-semibold text-cyan-200">Cocuk Profil Bilgileri (7-14 Yas)</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE_FIELDS.map((item) => (
            <label key={item.field} className="text-sm text-cyan-100">
              <span className="mb-1 block">{item.label}</span>
              <input
                className="w-full rounded-md border border-cyan-900 bg-slate-950/70 px-3 py-2 text-cyan-100 outline-none focus:border-cyan-500"
                max={item.max}
                min={item.min}
                onChange={(event) => handleProfileChange(item.field, event.target.value)}
                type="number"
                value={state.profile[item.field]}
              />
            </label>
          ))}
        </div>
        <p className="mt-3 text-sm text-cyan-100">
          BMI: {assessment.suitability.metrics.bmi} | Kulac/Boy: {assessment.suitability.metrics.armSpanToHeightRatio} |
          Uygunluk: {assessment.suitability.isEligible ? "Uygun" : "Uygun degil"}
        </p>
        {assessment.suitability.issues.length > 0 && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-200">
            {assessment.suitability.issues.map((issue) => (
              <li key={`${issue.field}-${issue.message}`}>{issue.message}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-indigo-800/70 bg-indigo-950/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-indigo-200">
            Adim {state.currentStep + 1}/{totalSteps}: {CATEGORY_LABELS[currentCategory]}
          </h2>
          <p className="text-sm text-indigo-100">
            Cevaplanan soru: {answeredCount}/{totalQuestionCount}
          </p>
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-indigo-400 transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-indigo-100">
          Toplam tamamlanma: %{completionPercent} | Adim ilerlemesi: %{currentStepRatio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {categoryOrder.map((category, stepIndex) => {
            const active = stepIndex === state.currentStep;
            const completed = isStepComplete(stepIndex);
            return (
              <button
                className={[
                  "rounded-md border px-3 py-1 text-xs font-semibold transition-colors",
                  active
                    ? "border-indigo-300 bg-indigo-500/20 text-indigo-100"
                    : "border-slate-700 bg-slate-900/50 text-slate-300 hover:border-indigo-500",
                ].join(" ")}
                key={category}
                onClick={() => setStep(stepIndex)}
                type="button"
              >
                {CATEGORY_LABELS[category]} {completed ? "- Tamam" : "- Bekliyor"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {currentQuestions.map((question) => (
          <article key={question.id} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
            <h3 className="text-base font-semibold text-slate-100">
              {question.id} - {question.text}
            </h3>
            <div className="mt-3 space-y-2">
              {question.options.map((option, index) => {
                const selected = state.answers[question.id] === index;
                return (
                  <label
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                      selected
                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-100"
                        : "border-slate-700 bg-slate-900/40 text-slate-200 hover:border-cyan-700",
                    ].join(" ")}
                    key={`${question.id}-${option.label}`}
                  >
                    <input
                      checked={selected}
                      className="mt-1"
                      name={question.id}
                      onChange={() => setAnswer(question.id, index)}
                      type="radio"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isFirstStep}
          onClick={goToPreviousStep}
          type="button"
        >
          Geri
        </button>
        <button
          className="rounded-md border border-cyan-500 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isCurrentStepComplete}
          onClick={handleNextAction}
          type="button"
        >
          {isLastStep ? "Sonucu Goster" : "Ileri"}
        </button>
        {!isCurrentStepComplete && (
          <p className="text-sm text-amber-300">Ileri gitmek icin bu adimdaki tum sorulari cevapla.</p>
        )}
      </div>
    </section>
  );
}
