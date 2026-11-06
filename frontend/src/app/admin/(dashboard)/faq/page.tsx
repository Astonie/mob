"use client";
import ResourceAdmin from "@/components/admin/ResourceAdmin";

export default function FaqAdmin() {
  return (
    <ResourceAdmin
      endpoint="admin/faqs"
      title="FAQs"
      subtitle="Frequently asked questions shown on public pages."
      rowKey="id"
      searchable
      defaults={{ question: "", answer: "", category: "general", is_active: true, sort_order: 0 }}
      fields={[
        { key: "question", label: "Question", kind: "text", required: true },
        { key: "category", label: "Category", kind: "select", options: ["general", "services", "codes", "careers", "procurement"], half: true },
        { key: "sort_order", label: "Sort order", kind: "number", half: true },
        { key: "answer", label: "Answer", kind: "textarea", required: true },
        { key: "is_active", label: "Visible on site", kind: "checkbox", placeholder: "shown to visitors" },
      ]}
      columns={[
        { key: "question", label: "Question" },
        { key: "category", label: "Category" },
        {
          key: "is_active",
          label: "Visible",
          render: (r) => (
            <span className={r.is_active ? "text-green-700" : "text-slate-400"}>
              {r.is_active ? "● live" : "○ hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
