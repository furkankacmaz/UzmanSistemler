import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AssessmentProvider } from "@/features/assessment/state/AssessmentContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AssessmentProvider>
        <App />
      </AssessmentProvider>
    </BrowserRouter>
  </React.StrictMode>
);