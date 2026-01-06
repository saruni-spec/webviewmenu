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
  "Monthly Rental Income (MRI)": "https://nil-mri-tot.vercel.app/mri/validation?phone={{phone}}",
  "Turnover Tax (TOT)": "https://nil-mri-tot.vercel.app/tot/validation?phone={{phone}}",
  
  // PIN Services
  "PIN Registration": "https://pin-registration.vercel.app?phone={{phone}}",
  
  // Customs Services
  "Passenger Declaration (F88)": "https://f88-web.vercel.app?phone={{phone}}",
  "e-Slip Payment": "https://payments-rho-seven.vercel.app?phone={{phone}}",
  "NITA": "https://payments-rho-seven.vercel.app?phone={{phone}}",
  "Affordable Housing Levy": "https://payments-rho-seven.vercel.app?phone={{phone}}",
  
};

// Service Data derived from user screenshots
const SERVICE_CATEGORIES = [
  {
    title: "PIN Services",
    items: [
      "PIN Registration",
      "PIN Retrieval / Reprint",
      "Change PIN Details",
      "Update PIN on iTax / iPage",
      "PIN Dormancy / Reactivation",
      "Obligation Addition / Removal",
    ],
  },
  {
    title: "Return Filing",
    items: [
      "NIL Filing",
      "Monthly Rental Income (MRI)",
      "Turnover Tax (TOT)",
      "PAYE",
      "VAT",
      "Partnership Returns",
      "Excise Returns",
    ],
  },
  {
    title: "eTIMS Invoicing",
    items: ["Sales Invoice", "Credit Note", "Buyer-Initiated Invoices"],
  },
  {
    title: "Tax Compliance",
    items: ["TCC Application", "TCC Reprint"],
  },
  {
    title: "Customs Services",
    items: [
      "Passenger Declaration (F88)",
      "TIMV Certificate",
      "TEMV Certificate",
      "Extend TIMV",
      "Declaration Forms",
      "Status Tracker",
    ],
  },
  {
    title: "Tax Payments",
    items: ["eSlip Payments", "NITA", "Affordable Housing Levy"],
  },
  {
    title: "Verification Services",
    items: [
      "PIN Checker",
      "Invoice Number Checker",
      "TCC Checker",
      "Staff Checker",
      "Know Your Station",
      "Import Certificate Checker",
    ],
  },
  {
    title: "Refunds",
    items: ["Refund Application", "Refund Status"],
  },
  {
    title: "Report Fraud",
    items: ["Report Fraud"],
  },
  {
    title: "Other Services",
    items: ["View All Services"],
  },
];

import { Layout } from "@/app/_components/Layout";

function HomeContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [toast, setToast] = useState<string | null>(null);

  const handleServiceClick = (serviceName: string) => {
    const urlTemplate = SERVICE_URLS[serviceName];
    
    if (urlTemplate) {
      // Replace {{phone}} with actual phone number and navigate
      const url = urlTemplate.replace("{{phone}}", phone);
      window.location.href = url;
    } else {
      // Show "coming soon" toast for services not yet available
      setToast(`${serviceName} - Coming Soon`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Check if a service has a URL configured
  const isServiceAvailable = (serviceName: string) => {
    return serviceName in SERVICE_URLS;
  };

  return (
    <Layout
      title="KRA Services"
      showMenu={true}
      // onBack is undefined because this is the home page
    >
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in">
          {toast}
        </div>
      )}

      <div className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
        Select a service below to continue.
      </div>

      <div className="space-y-4">
        {SERVICE_CATEGORIES.map((category, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-2">
              <h2 className="text-sm font-semibold text-gray-700">
                {category.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 p-3">
              {category.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleServiceClick(item)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    isServiceAvailable(item)
                      ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  {item}
                  {isServiceAvailable(item) && (
                    <span className="ml-1 text-green-500">→</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
