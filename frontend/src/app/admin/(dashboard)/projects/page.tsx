"use client";
import ResourceAdmin from "@/components/admin/ResourceAdmin";
import { adminFetch } from "@/lib/admin";

export default function ProjectsAdmin() {
  return (
    <ResourceAdmin
      endpoint="admin/projects"
      title="Projects"
      subtitle="Case studies on the public projects pages."
      rowKey="slug"
      searchable
      createLabel="Create project"
      defaults={{
        name: "",
        code: "",
        summary: "",
        description: "",
        country: "Malawi",
        status: "exploration",
        content_status: "draft",
        is_featured: false,
        is_active: true,
      }}
      fields={[
        { key: "name", label: "Project name", kind: "text", required: true },
        { key: "code", label: "Project code", kind: "text", half: true },
        { key: "country", label: "Country", kind: "text", half: true },
        {
          key: "status",
          label: "Stage",
          kind: "select",
          options: ["exploration", "development", "operation", "care_and_maintenance", "closed"],
          half: true,
        },
        {
          key: "content_status",
          label: "Publishing status",
          kind: "select",
          options: ["draft", "review", "approved", "published", "archived"],
          half: true,
        },
        { key: "summary", label: "Summary", kind: "textarea", placeholder: "One-paragraph overview" },
        { key: "description", label: "Description", kind: "textarea" },
        { key: "is_featured", label: "Featured", kind: "checkbox", placeholder: "show in featured grids" },
        { key: "is_active", label: "Visible on site", kind: "checkbox", placeholder: "shown to visitors" },
      ]}
      columns={[
        { key: "name", label: "Project" },
        { key: "country", label: "Country" },
        { key: "status", label: "Stage" },
        {
          key: "content_status",
          label: "Publishing",
          render: (r) => (
            <span
              className={`inline-block rounded-lg border px-2 py-0.5 text-xs ${
                r.content_status === "published"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {String(r.content_status ?? "draft")}
            </span>
          ),
        },
      ]}
      extraActions={(row, reload) =>
        row.content_status !== "published" ? (
          <button
            onClick={async () => {
              await adminFetch(`/admin/projects/${encodeURIComponent(String(row.slug))}/publish`, {
                method: "POST",
              });
              reload();
            }}
            className="rounded-lg bg-[#0F4A6B] px-3 py-1 text-xs text-white hover:bg-[#0d3d59]"
          >
            Publish
          </button>
        ) : null
      }
    />
  );
}
