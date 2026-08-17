"use client";

import type { VisualKey } from "../../articleTypes";
import BusinessSystem from "./BusinessSystem";
import DecisionDiagnostic from "./DecisionDiagnostic";
import DecisionRoadmap from "./DecisionRoadmap";
import LeanBusinessModel from "./LeanBusinessModel";
import OrderChecklist from "./OrderChecklist";
import ProfitBreakdown from "./ProfitBreakdown";
import SalesFunnel from "./SalesFunnel";
import SixMonthJourney from "./SixMonthJourney";
import SupplierScorecard from "./SupplierScorecard";

export default function ArticleVisual({ visual }: { visual: VisualKey }) {
  switch (visual) {
    case "decisionRoadmap": return <DecisionRoadmap />;
    case "leanBusinessModel": return <LeanBusinessModel />;
    case "supplierScorecard": return <SupplierScorecard />;
    case "salesFunnel": return <SalesFunnel />;
    case "orderChecklist": return <OrderChecklist />;
    case "profitBreakdown": return <ProfitBreakdown />;
    case "sixMonthJourney": return <SixMonthJourney />;
    case "decisionDiagnostic": return <DecisionDiagnostic />;
    case "businessSystem": return <BusinessSystem />;
  }
}

