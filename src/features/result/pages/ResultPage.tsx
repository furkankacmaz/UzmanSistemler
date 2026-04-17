import { questionBank } from "@/data/questionBank";
import { runAssessment } from "@/engine/assessmentEngine";
import { useAssessment } from "@/features/assessment/state/useAssessment";
import { useNavigate } from "react-router-dom";

const CATEGORY_LABELS = {
  health: "Saglik",
  anthropometric: "Antropometrik",
  motoric: "Motorik",
} as const;

function toCompatibilityPercent(score: number, minScore: number, maxScore: number): number {
  if (maxScore === minScore) {
    return 100;
  }

  const normalized = ((score - minScore) / (maxScore - minScore)) * 100;
  const clamped = Math.max(0, Math.min(100, normalized));
  return Math.round(clamped);
}

export default function ResultPage() {
  const navigate = useNavigate();
  const { state, answeredCount, totalQuestionCount, asAnswerMap, resetAll } = useAssessment();
  const assessment = runAssessment(questionBank, asAnswerMap(), state.profile);
  const completionPercent = Math.round((answeredCount / totalQuestionCount) * 100);
  const topSport = assessment.topSports[0];
  const scoreValues = assessment.topSports.map((item) => item.score);
  const maxScore = Math.max(...scoreValues);
  const minScore = Math.min(...scoreValues);
  const sportsWithPercentages = assessment.topSports.map((item) => ({
    ...item,
    compatibilityPercent: toCompatibilityPercent(item.score, minScore, maxScore),
  }));

  function handleResetAndRestart() {
    resetAll();
    navigate("/test");
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="mb-3 text-3xl font-bold text-gray-900">Sonuc</h1>
      <p className="text-gray-500">
        Ilk 3 spor onerisi, kritik cevap etkileri ve karar agaci cikisi asagida
        listelenir.
      </p>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm">
        <p className="text-sm text-gray-700">
          Tamamlanma: %{completionPercent} ({answeredCount}/{totalQuestionCount})
        </p>
        {topSport && (
          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Onerilen Spor</p>
            <p className="mt-1 text-lg font-semibold text-blue-900">{topSport.label}</p>
            <p className="mt-1 text-sm text-blue-700">
              Uyum Orani: %
              {
                sportsWithPercentages.find((sport) => sport.sport === topSport.sport)
                  ?.compatibilityPercent
              }
            </p>
          </div>
        )}
        {!assessment.suitability.isEligible && (
          <p className="mt-2 text-sm text-amber-600">
            Profil uygunlugu tamamlanmadi. Sonuclari bir uzman gorusu ile birlikte yorumlamaniz onerilir.
          </p>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-violet-200 bg-violet-50/60 p-4">
        <h2 className="text-lg font-semibold text-violet-800">Tum Spor Dallarina Yatkinlik</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sportsWithPercentages.map((sport) => (
            <article className="rounded-lg border border-violet-200 bg-white p-3" key={sport.sport}>
              <p className="text-sm font-semibold text-gray-900">{sport.label}</p>
              <p className="mt-1 text-sm text-violet-700">Uyumluluk: %{sport.compatibilityPercent}</p>
              <div className="mt-2 h-2 rounded-full bg-violet-100">
                <div
                  className="h-2 rounded-full bg-violet-500 transition-all"
                  style={{ width: `${sport.compatibilityPercent}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {assessment.topSports.map((sport, index) => (
          <article key={sport.sport} className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">#{index + 1} Oneri</p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">{sport.label}</h2>
            <p className="mt-1 text-sm text-gray-500">Toplam puan: {sport.score}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
              {sport.reasons.map((reason) => (
                <li key={`${sport.sport}-${reason.questionId}-${reason.optionLabel}-${reason.weight}`}>
                  {reason.questionText}: {reason.optionLabel} ({reason.weight > 0 ? "+" : ""}
                  {reason.weight})
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
        <h2 className="text-lg font-semibold text-emerald-800">Kritik Etki Ozeti</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-700">
          {assessment.criticalInsights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/60 p-4">
        <h2 className="text-lg font-semibold text-sky-800">Guclu ve Gelisime Acik Alanlar</h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(assessment.areaSummary.categoryScores).map(([category, score]) => (
            <span
              className="rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800"
              key={category}
            >
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}: {score > 0 ? `+${score}` : score}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <h3 className="text-sm font-semibold text-emerald-800">Guclu Yonler</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-700">
              {assessment.areaSummary.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <h3 className="text-sm font-semibold text-amber-800">Gelisime Acik Alanlar</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-700">
              {assessment.areaSummary.developmentAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50/60 p-4">
        <h2 className="text-lg font-semibold text-purple-800">Karar Agaci (Mermaid)</h2>
        <pre className="mt-3 overflow-auto rounded-lg bg-white border border-purple-100 p-3 text-xs text-purple-900">
          {assessment.decisionTree.mermaid}
        </pre>
      </div>

      <div className="mt-6">
        <button
          className="rounded-md border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50"
          onClick={handleResetAndRestart}
          type="button"
        >
          Sonuclari Yenile ve Testi Sifirla
        </button>
      </div>
    </section>
  );
}
