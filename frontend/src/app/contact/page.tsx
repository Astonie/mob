import Image from "next/image";
import { miningImages } from "@/lib/images";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { PageHeader } from "@/components/ui/PageHeader";
import { brand } from "@/lib/brand";
import { getPage, getSiteSettingsSafe, getFaqsSafe, settingString, settingLines } from "@/lib/api";
import { ContactForm } from "./contact-form";

export const revalidate = 3600;

export const metadata = { title: "Contact — Lilongwe HQ | Mob Limited", description: "Reach Mob Limited's Lilongwe head office and SADC hubs. Response to enquiries within one business day." };

export default async function Contact() {
  const cmsPage = await getPage("contact").then((r) => r.data).catch(() => null);
  if (cmsPage) return <BlockRenderer blocks={cmsPage.blocks} />;
  const [settings, faqs] = await Promise.all([getSiteSettingsSafe(), getFaqsSafe()]);

  const heroTitle = settingString(settings, "content.contact_hero_title", "Contact — Lilongwe HQ");
  const heroSubtitle = settingString(settings, "content.contact_hero_subtitle", "Malawi-based, SADC-wide. Reach our Lilongwe, Blantyre, Karonga, Kolwezi, Solwezi teams.");
  const visitTitle = settingString(settings, "content.contact_visit_title", "Visit Us");
  const officeLabel = settingString(settings, "content.contact_head_office_label", "Head Office — Lilongwe");
  const address = settingString(settings, "site.address", "Area 47 Sector 3, Lilongwe, Malawi").split(/,\s*/);
  const phone = settingString(settings, "site.phone", brand.phone);
  const email = settingString(settings, "site.email", brand.email);
  const hubsLabel = settingString(settings, "content.contact_hubs_label", "SADC Hubs");
  const hubs = settingLines(settings, "content.contact_hubs", [
    "Blantyre (Malawi) • Karonga (Kayelekera)",
    "Kolwezi (DRC) • Solwezi (Zambia)",
    "Balama (Mozambique) • Windhoek (Namibia)",
    "Johannesburg (South Africa)",
  ]);
  const mapCaption = settingString(settings, "content.contact_map_caption", "SADC Region — 8 Countries");
  const formTitle = settingString(settings, "content.contact_form_title", "Send an enquiry");
  const formBody = settingString(settings, "content.contact_form_body", "For exploration, JORC, ESIA or lender due diligence — response within one business day.");
  const faqTitle = settingString(settings, "content.faq_title", "Frequently asked questions");

  return (
    <div>
      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={[{ label: "Contact" }]}
        image={miningImages.hero}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0a1f2e]">{visitTitle}</h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-[#0F4A6B] uppercase">{officeLabel}</div>
                  <div className="mt-3 text-[15px] text-slate-700 leading-7">
                    {address.map((line) => (
                      <span key={line}>{line}<br /></span>
                    ))}
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-[#0F4A6B] font-medium hover:underline">{phone}</a><br />
                    <a href={`mailto:${email}`} className="text-[#0F4A6B] font-medium hover:underline">{email}</a>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">{hubsLabel}</div>
                  <div className="mt-3 text-[15px] text-slate-600 leading-7">
                    {hubs.map((line) => (
                      <span key={line}>{line}<br /></span>
                    ))}
                  </div>
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden border border-slate-200">
                  <Image src={miningImages.map} alt="SADC map" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-[#0F4A6B]/10" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                    {mapCaption}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#0a1f2e]">{formTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{formBody}</p>
              <ContactForm />
            </div>
          </div>
        </div>

        {faqs.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#0a1f2e]">{faqTitle}</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="font-serif text-[16px] font-bold leading-tight text-[#0a1f2e]">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 whitespace-pre-line">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
