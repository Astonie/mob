"use client";
import ResourceAdmin, { StatusBadge } from "@/components/admin/ResourceAdmin";

export default function CareersAdmin() {
  return (
    <ResourceAdmin
      endpoint="admin/careers"
      title="Careers"
      subtitle="Job listings on the public careers page. Set status to open to publish."
      rowKey="slug"
      searchable
      defaults={{
        title: "",
        department: "",
        location: "Lilongwe, Malawi",
        employment_type: "full_time",
        summary: "",
        description: "",
        status: "draft",
        deadline: "",
        vacancies: 1,
        is_featured: false,
        is_active: true,
      }}
      fields={[
        { key: "title", label: "Job title", kind: "text", required: true },
        { key: "department", label: "Department", kind: "text", half: true },
        { key: "location", label: "Location", kind: "text", half: true },
        {
          key: "employment_type",
          label: "Employment type",
          kind: "select",
          options: ["full_time", "part_time", "contract", "internship"],
          half: true,
        },
        { key: "status", label: "Status", kind: "select", options: ["draft", "open", "closed", "archived"], half: true },
        { key: "deadline", label: "Application deadline", kind: "date", half: true },
        { key: "vacancies", label: "Vacancies", kind: "number", half: true },
        { key: "summary", label: "Summary", kind: "textarea", required: true },
        { key: "description", label: "Description", kind: "textarea" },
        { key: "is_featured", label: "Featured", kind: "checkbox", placeholder: "highlight this role" },
        { key: "is_active", label: "Visible on site", kind: "checkbox", placeholder: "shown to visitors" },
      ]}
      columns={[
        { key: "title", label: "Role" },
        { key: "department", label: "Department" },
        { key: "location", label: "Location" },
        { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
        { key: "deadline", label: "Deadline" },
      ]}
    />
  );
}
