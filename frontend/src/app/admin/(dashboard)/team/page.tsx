"use client";
import ResourceAdmin from "@/components/admin/ResourceAdmin";
import { publicMediaUrl } from "@/lib/api";

export default function TeamAdmin() {
  return (
    <ResourceAdmin
      endpoint="admin/leadership-profiles"
      title="Leadership Team"
      subtitle="Executive and board profiles shown on the public site."
      rowKey="slug"
      searchable
      defaults={{
        name: "",
        position: "",
        category: "executive",
        bio: "",
        photo: "",
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: "name", label: "Full name", kind: "text", required: true },
        {
          key: "category",
          label: "Category",
          kind: "select",
          options: ["board", "executive", "management"],
          required: true,
          half: true,
        },
        { key: "position", label: "Position", kind: "text", required: true },
        { key: "photo", label: "Profile photo", kind: "image" },
        { key: "email", label: "Email", kind: "text", half: true },
        { key: "linkedin_url", label: "LinkedIn URL", kind: "text", half: true },
        { key: "sort_order", label: "Sort order", kind: "number", half: true },
        { key: "bio", label: "Short bio", kind: "textarea" },
        { key: "is_active", label: "Visible on site", kind: "checkbox", placeholder: "shown to visitors" },
      ]}
      columns={[
        {
          key: "photo",
          label: "Photo",
          render: (r) => {
            const src = publicMediaUrl(typeof r.photo === "string" ? r.photo : null);
            return src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={String(r.name ?? "")} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F4A6B]/10 text-xs font-bold text-[#0F4A6B]">
                {String(r.name ?? "?").split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
            );
          },
        },
        { key: "name", label: "Name" },
        { key: "position", label: "Position" },
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
