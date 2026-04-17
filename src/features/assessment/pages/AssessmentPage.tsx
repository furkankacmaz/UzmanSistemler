import { useMemo, useState } from "react";
import { questionBank } from "@/data/questionBank";
import { useAssessment } from "@/features/assessment/state/useAssessment";
import { useNavigate } from "react-router-dom";

type ProfileField = "age" | "heightCm" | "weightKg" | "armSpanCm" | "restingHeartRate" | "weeklyActivityDays";

const PROFILE_FIELDS: Array<{
  field: ProfileField;
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

function getRangeErrorMessage(label: string, min: number, max: number): string {
  return `${label} ${min}-${max} araliginda olmali.`;
}

export default function AssessmentPage() {
  const navigate = useNavigate();
  const { state, totalQuestionCount, answeredCount, completionPercent, setProfileField, setAnswer } = useAssessment();

  const [stage, setStage] = useState<"profile" | "questions">("profile");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [profileErrors, setProfileErrors] = useState<Partial<Record<ProfileField, string>>>({});

  const currentQuestion = questionBank[currentQuestionIndex];
  const isCurrentQuestionAnswered =
    typeof state.answers[currentQuestion?.id ?? ""] === "number";

  const questionProgress = useMemo(() => {
    if (totalQuestionCount === 0) {
      return 0;
    }
    return Math.round((answeredCount / totalQuestionCount) * 100);
  }, [answeredCount, totalQuestionCount]);

  function handleProfileChange(field: ProfileField, rawValue: string) {
    const nextValue = Number(rawValue);
    if (Number.isNaN(nextValue)) {
      return;
    }

    setProfileField(field, nextValue);

    const currentField = PROFILE_FIELDS.find((item) => item.field === field);
    if (!currentField) {
      return;
    }

    if (nextValue >= currentField.min && nextValue <= currentField.max) {
      setProfileErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateProfile(): boolean {
    const nextErrors: Partial<Record<ProfileField, string>> = {};

    PROFILE_FIELDS.forEach((fieldDef) => {
      const value = state.profile[fieldDef.field];
      if (!Number.isFinite(value) || value < fieldDef.min || value > fieldDef.max) {
        nextErrors[fieldDef.field] = getRangeErrorMessage(fieldDef.label, fieldDef.min, fieldDef.max);
      }
    });

    if (!Number.isInteger(state.profile.age)) {
      nextErrors.age = "Yas tam sayi olmali.";
    }

    if (!Number.isInteger(state.profile.weeklyActivityDays)) {
      nextErrors.weeklyActivityDays = "Haftalik aktivite gunu tam sayi olmali.";
    }

    setProfileErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleProfileContinue() {
    if (!validateProfile()) {
      return;
    }
    setStage("questions");
  }

  function handleQuestionContinue() {
    if (!currentQuestion || !isCurrentQuestionAnswered) {
      return;
    }

    if (currentQuestionIndex === totalQuestionCount - 1) {
      navigate("/sonuc");
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  }

  function handleQuestionBack() {
    if (currentQuestionIndex === 0) {
      setStage("profile");
      return;
    }

    setCurrentQuestionIndex((prev) => prev - 1);
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="mb-3 text-3xl font-bold text-gray-900">Test Akisi</h1>
      <p className="text-gray-500">
        Once profil bilgilerini doldur, sonra sorulari tek tek cevaplayarak sonucu gor.
      </p>

      <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-indigo-800">
            {stage === "profile" ? "1/2 Profil Bilgileri" : `2/2 Soru Asamasi (${currentQuestionIndex + 1}/${totalQuestionCount})`}
          </h2>
          <p className="text-sm text-indigo-600">Tamamlanma: %{stage === "profile" ? 0 : questionProgress}</p>
        </div>

        <div className="mt-3 h-2 rounded-full bg-indigo-100">
          <div
            className="h-2 rounded-full bg-indigo-500 transition-all"
            style={{ width: `${stage === "profile" ? 0 : questionProgress}%` }}
          />
        </div>
      </div>

      {stage === "profile" && (
        <>
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
            <h2 className="mb-3 text-lg font-semibold text-blue-800">Cocuk Profil Bilgileri (7-14 Yas)</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PROFILE_FIELDS.map((item) => (
                <label key={item.field} className="text-sm text-gray-700">
                  <span className="mb-1 block font-medium">{item.label}</span>
                  <input
                    className="w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    max={item.max}
                    min={item.min}
                    onChange={(event) => handleProfileChange(item.field, event.target.value)}
                    type="number"
                    value={state.profile[item.field]}
                  />
                  {profileErrors[item.field] && <span className="mt-1 block text-xs text-rose-600">{profileErrors[item.field]}</span>}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              className="rounded-md border border-blue-500 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              onClick={handleProfileContinue}
              type="button"
            >
              Devam Et
            </button>
          </div>
        </>
      )}

      {stage === "questions" && currentQuestion && (
        <>
          <article className="mt-6 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">
              {currentQuestion.id} - {currentQuestion.text}
            </h3>

            <div className="mt-3 space-y-2">
              {currentQuestion.options.map((option, index) => {
                const selected = state.answers[currentQuestion.id] === index;
                return (
                  <label
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                      selected
                        ? "border-blue-400 bg-blue-50 text-blue-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/40",
                    ].join(" ")}
                    key={`${currentQuestion.id}-${option.label}`}
                  >
                    <input
                      checked={selected}
                      className="mt-1 accent-blue-600"
                      name={currentQuestion.id}
                      onChange={() => setAnswer(currentQuestion.id, index)}
                      type="radio"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </article>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
              onClick={handleQuestionBack}
              type="button"
            >
              Geri
            </button>
            <button
              className="rounded-md border border-blue-500 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isCurrentQuestionAnswered}
              onClick={handleQuestionContinue}
              type="button"
            >
              {currentQuestionIndex === totalQuestionCount - 1 ? "Sonuclari Goruntule" : "Devam Et"}
            </button>
            {!isCurrentQuestionAnswered && (
              <p className="text-sm text-amber-600">Devam etmek icin bir secenek isaretle.</p>
            )}
            <p className="text-sm text-indigo-600">Cevaplanan soru: {answeredCount}/{totalQuestionCount}</p>
          </div>
        </>
      )}

      {stage === "questions" && !currentQuestion && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          Soru listesi bulunamadi.
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">Genel ilerleme: %{completionPercent}</p>
    </section>
  );
}
