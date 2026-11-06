"use client";
import ResourceAdmin, { StatusBadge } from "@/components/admin/ResourceAdmin";

export default function EsgAdmin() {
  return (
    <ResourceAdmin
      endpoint="admin/esg-contents"
      title="Sustainability & ESG"
      subtitle="Topic cards rendered on the public sustainability page."
      rowKey="slug"
      searchable
      defaults={{
        title: "",
        category: "environment",
        summary: "",
        content: "",
        status: "published",
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: "title", label: "Title", kind: "text", required: true },
        {
          key: "category",
          label: "Category",
          kind: "select",
          options: ["environment", "social", "governance", "climate", "water", "biodiversity", "energy", "waste", "community", "safety"],
          required: true,
          half: true,
        },
        { key: "status", label: "Status", kind: "select", options: ["draft", "published"], half: true },
        { key: "summary", label: "Summary", kind: "textarea", required: true },
        { key: "content", label: "Body content", kind: "textarea" },
        { key: "sort_order", label: "Sort order", kind: "number", half: true },
        { key: "is_active", label: "Visible on site", kind: "checkbox", placeholder: "shown to visitors" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
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
