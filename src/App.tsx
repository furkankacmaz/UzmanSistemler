import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import AboutPage from "@/features/about/pages/AboutPage";
import AssessmentPage from "@/features/assessment/pages/AssessmentPage";
import HomePage from "@/features/home/pages/HomePage";
import ResultPage from "@/features/result/pages/ResultPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<AssessmentPage />} />
        <Route path="sonuc" element={<ResultPage />} />
        <Route path="hakkinda" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}