"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Service URL mappings - maps service names to their external URLs
// {{phone}} will be replaced with the actual phone number
const SERVICE_URLS: Record<string, string> = {
  // eTIMS Invoicing
  "Sales Invoice": "https://f88-xslk.vercel.app/etims/auth?number={{phone}}",
  "Credit Note": "https://f88-xslk.vercel.app/etims/auth?number={{phone}}",
  "Buyer-Initiated Invoices": "https://f88-xslk.vercel.app/etims/auth?number={{phone}}",
  
  // Return Filing
  "NIL Filing": "https://nil-mri-tot.vercel.app/nil/validation?phone={{phone}}",
  "MRI": "https://nil-mri-tot.vercel.app/mri/validation?phone={{phone}}",
  "TOT": "https://nil-mri-tot.vercel.app/tot/validation?phone={{phone}}",
  
  // PIN Services
  "PIN Registration": "https://pin-registration.vercel.app?phone={{phone}}",
  
  // Customs Services
  "F88 Declaration": "https://f88-web.vercel.app?phone={{phone}}",
  "eSlip": "https://payments-rho-seven.vercel.app?phone={{phone}}",
  "NITA": "https://payments-rho-seven.vercel.app?phone={{phone}}",
  "AHL": "https://payments-rho-seven.vercel.app?phone={{phone}}",
  "TCC Application": "https://tcc-seven-psi.vercel.app?phone={{phone}}",
};

// Compact service data with icons and short labels
const SERVICE_CATEGORIES = [
  {
    title: "PIN",
    icon: "🆔",
    items: [
      { label: "Register", key: "PIN Registration" },
      { label: "Retrieve", key: "PIN Retrieve" },
      { label: "Change", key: "PIN Change" },
      { label: "Update", key: "PIN Update" },
      { label: "Reactivate", key: "PIN Reactivate" },
      { label: "Obligations", key: "PIN Obligations" },
    ],
  },
  {
    title: "Filing",
    icon: "📝",
    items: [
      { label: "NIL", key: "NIL Filing" },
      { label: "MRI", key: "MRI" },
      { label: "TOT", key: "TOT" },
      { label: "PAYE", key: "PAYE" },
      { label: "VAT", key: "VAT" },
      { label: "Partners", key: "Partnership" },
      { label: "Excise", key: "Excise" },
    ],
  },
  {
    title: "eTIMS",
    icon: "🧾",
    items: [
      { label: "Invoice", key: "Sales Invoice" },
      { label: "Credit Note", key: "Credit Note" },
      { label: "Buyer Invoice", key: "Buyer-Initiated Invoices" },
    ],
  },
  {
    title: "Compliance",
    icon: "✅",
    items: [
      { label: "TCC Apply", key: "TCC Application" },
      { label: "TCC Reprint", key: "TCC Reprint" },
    ],
  },
  {
    title: "Customs",
    icon: "🛃",
    items: [
      { label: "F88", key: "F88 Declaration" },
      { label: "TIMV", key: "TIMV" },
      { label: "TEMV", key: "TEMV" },
      { label: "Extend TIMV", key: "Extend TIMV" },
      { label: "Forms", key: "Forms" },
      { label: "Status", key: "Status" },
    ],
  },
  {
    title: "Payments",
    icon: "💳",
    items: [
      { label: "eSlip", key: "eSlip" },
      { label: "NITA", key: "NITA" },
      { label: "AHL", key: "AHL" },
    ],
  },
  {
    title: "Verify",
    icon: "🔍",
    items: [
      { label: "PIN", key: "PIN Check" },
      { label: "Invoice", key: "Invoice Check" },
      { label: "TCC", key: "TCC Check" },
      { label: "Staff", key: "Staff Check" },
      { label: "Station", key: "Station" },
      { label: "Import", key: "Import Check" },
    ],
  },
  {
    title: "Other",
    icon: "📋",
    items: [
      { label: "Refund", key: "Refund" },
      { label: "Fraud", key: "Report Fraud" },
      { label: "More", key: "More" },
    ],
  },
];

import { Layout } from "@/app/_components/Layout";

function HomeContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [toast, setToast] = useState<string | null>(null);

  const handleServiceClick = (serviceKey: string) => {
    const urlTemplate = SERVICE_URLS[serviceKey];
    
    if (urlTemplate) {
      const url = urlTemplate.replace("{{phone}}", phone);
      window.location.href = url;
    } else {
      setToast(`${serviceKey} - Coming Soon`);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const isAvailable = (key: string) => key in SERVICE_URLS;

  return (
    <Layout title="KRA Services" showMenu={true}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs">
          {toast}
        </div>
      )}

      {/* Compact grid */}
      <div className="space-y-1.5">
        {SERVICE_CATEGORIES.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-100 p-2"
          >
            {/* Category header - inline with items */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 min-w-[70px]">
                <span className="text-sm">{category.icon}</span>
                <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  {category.title}
                </span>
              </div>
              
              {/* Service items */}
              <div className="flex flex-wrap gap-1 flex-1">
                {category.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleServiceClick(item.key)}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                      isAvailable(item.key)
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                    {isAvailable(item.key) && <span className="ml-0.5">›</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </Layout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-sm">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
