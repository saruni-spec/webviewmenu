"use client";

import React from "react";

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

export default function Home() {
  return (
    <Layout
      title="KRA Services"
      showMenu={true}
      // onBack is undefined because this is the home page
    >
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
                  className={`rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors ${
                    item === "See More (+1)"
                      ? "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
