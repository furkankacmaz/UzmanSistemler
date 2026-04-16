import { questionBank } from "@/data/questionBank";
import { runAssessment } from "@/engine/assessmentEngine";
import { useAssessment } from "@/features/assessment/state/useAssessment";
import { useNavigate } from "react-router-dom";

const CATEGORY_LABELS = {
  health: "Saglik",
  anthropometric: "Antropometrik",
  motoric: "Motorik",
} as const;

export default function ResultPage() {
  const navigate = useNavigate();
  const { state, answeredCount, totalQuestionCount, asAnswerMap, resetAll } = useAssessment();
  const assessment = runAssessment(questionBank, asAnswerMap(), state.profile);
  const completionPercent = Math.round((answeredCount / totalQuestionCount) * 100);

  function handleResetAndRestart() {
    resetAll();
    navigate("/test");
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="mb-3 text-3xl font-bold text-slate-100">Sonuc</h1>
      <p className="text-slate-300">
        Ilk 3 spor onerisi, kritik cevap etkileri ve karar agaci cikisi asagida
        listelenir.
      </p>

      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-4">
        <p className="text-sm text-slate-200">
          Tamamlanma: %{completionPercent} ({answeredCount}/{totalQuestionCount})
        </p>
        {!assessment.suitability.isEligible && (
          <p className="mt-2 text-sm text-amber-300">
            Profil uygunlugu tamamlanmadi. Sonuclari bir uzman gorusu ile birlikte yorumlamaniz onerilir.
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {assessment.topSports.map((sport, index) => (
          <article key={sport.sport} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1} Oneri</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-100">{sport.label}</h2>
            <p className="mt-1 text-sm text-slate-300">Toplam puan: {sport.score}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
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

      <div className="mt-6 rounded-xl border border-emerald-900/70 bg-emerald-950/30 p-4">
        <h2 className="text-lg font-semibold text-emerald-200">Kritik Etki Ozeti</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-100">
          {assessment.criticalInsights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-sky-900/70 bg-sky-950/30 p-4">
        <h2 className="text-lg font-semibold text-sky-200">Guclu ve Gelisime Acik Alanlar</h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(assessment.areaSummary.categoryScores).map(([category, score]) => (
            <span
              className="rounded-full border border-sky-800 bg-sky-900/60 px-3 py-1 text-xs text-sky-100"
              key={category}
            >
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}: {score > 0 ? `+${score}` : score}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-emerald-900/60 bg-emerald-950/30 p-3">
            <h3 className="text-sm font-semibold text-emerald-200">Guclu Yonler</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-100">
              {assessment.areaSummary.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-amber-900/60 bg-amber-950/30 p-3">
            <h3 className="text-sm font-semibold text-amber-200">Gelisime Acik Alanlar</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-100">
              {assessment.areaSummary.developmentAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-fuchsia-900/70 bg-fuchsia-950/30 p-4">
        <h2 className="text-lg font-semibold text-fuchsia-200">Karar Agaci (Mermaid)</h2>
        <pre className="mt-3 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-fuchsia-100">
          {assessment.decisionTree.mermaid}
        </pre>
      </div>

      <div className="mt-6">
        <button
          className="rounded-md border border-rose-500 bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-100"
          onClick={handleResetAndRestart}
          type="button"
        >
          Sonuclari Yenile ve Testi Sifirla
        </button>
      </div>
    </section>
  );
}
