import { questionBank } from "@/data/questionBank";
import { validateQuestionBank } from "@/engine/validateQuestionBank";

export default function AssessmentPage() {
  const validationIssues = validateQuestionBank(questionBank);

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="mb-3 text-3xl font-bold text-slate-100">Test Akisi</h1>
      <p className="text-slate-300">
        Cok adimli anket yapisi bu sayfada olusacak. Bir sonraki adimda soru
        bankasi ve puanlama sistemi buraya baglanacak.
      </p>

      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
        <p className="text-slate-200">Soru sayisi: {questionBank.length}</p>
        <p className={validationIssues.length > 0 ? "text-amber-300" : "text-emerald-300"}>
          Veri dogrulama: {validationIssues.length > 0 ? `${validationIssues.length} sorun` : "Sorun yok"}
        </p>
      </div>
    </section>
  );
}