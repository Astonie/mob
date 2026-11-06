import Link from "next/link";
import Image from "next/image";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { getLeadershipSafe, getSiteSettingsSafe, settingString, publicMediaUrl, type LeadershipProfile } from "@/lib/api";
import { miningImages } from "@/lib/images";

export const revalidate = 3600;
export const metadata = {
  title: "Our Team | Mob Limited",
  description: "The people behind Mob Limited — Malawi-led, SADC-wide mining and mineral consultancy.",
};

export default async function TeamPage() {
  const [leadership, settings] = await Promise.all([
    getLeadershipSafe(),
    getSiteSettingsSafe(),
  ]);

  const title = settingString(settings, "content.team_title", "Our Team");
  const subtitle = settingString(
    settings,
    "content.team_subtitle",
    "Malawi-led, SADC-wide. Senior specialists across geology, mining, processing, ESG, finance and community."
  );

  return (
    <>
      <HeroBlock data={{ heading: title, subheading: subtitle, cta_label: "Talk to us", cta_url: "/contact", image: miningImages.hero2 }} />

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">THE TEAM</p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e]">Senior specialists, SADC-grounded</h2>
          <p className="mt-4 text-[15px] leading-7 text-slate-600">
            Our people combine Malawian field execution with world-class JORC modelling — trusted by juniors, majors and funds across 8 SADC countries.
          </p>
        </div>

        {leadership.length > 0 ? (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person: LeadershipProfile) => {
              const photo = publicMediaUrl(person.photo);
              return (
                <div key={person.slug} className="card-interactive overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {photo ? (
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <Image src={photo} alt={person.name} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    </div>
                  ) : (
                    <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-[#0F4A6B] to-[#0a2e4a]">
                      <span className="font-serif text-4xl font-bold text-white/90">
                        {person.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-[16px] font-bold leading-tight text-[#0a1f2e]">{person.name}</h3>
                    <p className="mt-1 text-[11px] font-semibold tracking-[0.1em] text-[#0F4A6B] uppercase">{person.position}</p>
                    {person.bio && <p className="mt-3 text-sm leading-6 text-slate-600">{person.bio}</p>}
                    {person.linkedin_url && (
                      <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer" className="link-arrow mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0F4A6B] hover:underline underline-offset-4">
                        LinkedIn
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Team profiles coming soon.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3d59] via-[#0F4A6B] to-[#0a2e4a] px-8 lg:px-12 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl shadow-[#0F4A6B]/20 grain">
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white">Want to work with us?</h2>
            <p className="mt-2 text-white/80 text-[15px]">Talk to our Lilongwe team — response within one business day.</p>
          </div>
          <Link href="/contact" className="inline-flex h-12 px-8 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition-colors shadow-lg shrink-0">
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}