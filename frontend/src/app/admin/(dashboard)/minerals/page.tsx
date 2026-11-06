"use client";
import ResourceAdmin from "@/components/admin/ResourceAdmin";

export default function MineralsAdmin() {
  return (
    <ResourceAdmin
      endpoint="admin/minerals"
      title="Minerals & Commodities"
      subtitle="Commodity profiles on the public minerals pages."
      rowKey="slug"
      searchable
      createLabel="Create mineral"
      defaults={{
        name: "",
        chemical_symbol: "",
        category: "base",
        summary: "",
        description: "",
        uses: "",
        status: "published",
        is_featured: false,
        is_active: true,
      }}
      fields={[
        { key: "name", label: "Mineral name", kind: "text", required: true },
        { key: "chemical_symbol", label: "Chemical symbol", kind: "text", half: true },
        {
          key: "category",
          label: "Category",
          kind: "select",
          options: ["base", "precious", "battery", "industrial", "rare"],
          half: true,
        },
        {
          key: "status",
          label: "Status",
          kind: "select",
          options: ["draft", "published"],
          half: true,
        },
        { key: "is_featured", label: "Featured", kind: "checkbox", placeholder: "highlight on homepage" },
        { key: "summary", label: "Summary", kind: "textarea", placeholder: "Short overview" },
        { key: "description", label: "Description", kind: "textarea" },
        { key: "uses", label: "Uses", kind: "textarea" },
        { key: "is_active", label: "Visible on site", kind: "checkbox", placeholder: "shown to visitors" },
      ]}
      columns={[
        { key: "name", label: "Mineral" },
        { key: "chemical_symbol", label: "Symbol" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        {
          key: "is_featured",
          label: "Featured",
          render: (r) => (r.is_featured ? "★" : ""),
        },
      ]}
    />
  );
}
