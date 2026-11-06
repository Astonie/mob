"use client";
import ResourceAdmin, { StatusBadge } from "@/components/admin/ResourceAdmin";
import { adminFetch } from "@/lib/admin";

export default function NewsAdmin() {
  return (
    <ResourceAdmin
      endpoint="admin/news"
      title="News & Insights"
      subtitle="Articles on the public news page."
      rowKey="slug"
      searchable
      createLabel="Create draft"
      defaults={{ title: "", excerpt: "", content: "<p></p>", status: "draft", is_featured: false }}
      fields={[
        { key: "title", label: "Title", kind: "text", required: true },
        {
          key: "status",
          label: "Status",
          kind: "select",
          options: ["draft", "review", "approved", "published", "archived"],
          half: true,
        },
        { key: "is_featured", label: "Featured", kind: "checkbox", placeholder: "highlight on homepage" },
        { key: "excerpt", label: "Excerpt", kind: "textarea", placeholder: "Short summary for lists and SEO" },
        { key: "content", label: "Content (HTML)", kind: "html" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
        {
          key: "is_featured",
          label: "Featured",
          render: (r) => (r.is_featured ? "★" : ""),
        },
      ]}
      extraActions={(row, reload) =>
        row.status !== "published" ? (
          <button
            onClick={async () => {
              await adminFetch(`/admin/news/${encodeURIComponent(String(row.slug))}/publish`, { method: "POST" });
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
