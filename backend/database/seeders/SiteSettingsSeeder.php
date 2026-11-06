<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

/**
 * Idempotent: only creates missing keys so admin-edited values are never overwritten.
 * Run: php artisan db:seed --class=SiteSettingsSeeder
 */
class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            'site.copyright' => ['group' => 'general', 'value' => 'Mob Limited. Integrated Mining & Mineral Solutions. All rights reserved.', 'description' => 'Footer copyright (year is added automatically)'],
            'site.name' => ['group' => 'general', 'value' => 'Mob Limited', 'description' => 'Company name'],
            'site.tagline' => ['group' => 'general', 'value' => 'Integrated Mining & Mineral Solutions — Exploring Potential. Delivering Value.', 'description' => 'Company tagline'],
            'site.email' => ['group' => 'contact', 'value' => 'info@moblimited.com', 'description' => 'Public contact email'],
            'site.phone' => ['group' => 'contact', 'value' => '+265 881 525 611', 'description' => 'Public contact phone'],
            'site.address' => ['group' => 'contact', 'value' => 'Area 47 Sector 3, Lilongwe, Malawi', 'description' => 'Head office address'],
            'site.region' => ['group' => 'general', 'value' => 'SADC Region — Malawi, Zambia, DRC, Mozambique, Tanzania, South Africa, Zimbabwe, Botswana, Namibia', 'description' => 'Regions served'],

            // Appearance
            'site.logo_light' => ['group' => 'appearance', 'value' => '/logo-mob.svg', 'type' => 'image', 'description' => 'Primary logo (light background)'],
            'site.logo_dark' => ['group' => 'appearance', 'value' => '/logo-mob.svg', 'type' => 'image', 'description' => 'Logo for dark backgrounds'],
            'site.logo_icon' => ['group' => 'appearance', 'value' => '/logo-mob.svg', 'type' => 'image', 'description' => 'Compact icon logo'],
            'appearance.hero_bg' => ['group' => 'appearance', 'value' => '', 'type' => 'image', 'description' => 'Homepage hero background image (empty = default image)'],
            'appearance.cta_bg' => ['group' => 'appearance', 'value' => '', 'type' => 'image', 'description' => 'CTA background image (empty = gradient only)'],

            // Social
            'social.x' => ['group' => 'social', 'value' => 'https://x.com/moblimited', 'description' => 'X (Twitter) profile URL — leave empty to hide'],
            'social.facebook' => ['group' => 'social', 'value' => '', 'description' => 'Facebook page URL — leave empty to hide'],
            'social.instagram' => ['group' => 'social', 'value' => '', 'description' => 'Instagram profile URL — leave empty to hide'],
            'social.youtube' => ['group' => 'social', 'value' => '', 'description' => 'YouTube channel URL — leave empty to hide'],

            // SEO
            'seo.og_title' => ['group' => 'seo', 'value' => 'Mob Limited — Integrated Mining and Mineral Consultancy', 'description' => 'Open Graph (social share) title'],
            'seo.og_description' => ['group' => 'seo', 'value' => 'Malawi-based, SADC-wide mining consultancy. 120+ projects, JORC/NI 43-101, exploration to mine development.', 'description' => 'Open Graph (social share) description'],

            // Footer
            'content.site_footer_blurb' => ['group' => 'content', 'value' => 'Malawi-based, SADC-wide. From greenfield exploration in Lilongwe to mine development in Kolwezi, Solwezi and beyond — we de-risk your resource with JORC-compliant technical excellence across 8 SADC countries.', 'description' => 'Footer: paragraph under the logo'],
            'content.footer_office_label' => ['group' => 'content', 'value' => 'LILONGWE HEAD OFFICE — SADC', 'description' => 'Footer: office column heading'],
            'content.footer_hubs_line' => ['group' => 'content', 'value' => 'Blantyre • Karonga • Kolwezi • Solwezi • Balama', 'description' => 'Footer: hub locations line'],
            'content.footer_cta_label' => ['group' => 'content', 'value' => 'Get in Touch →', 'description' => 'Footer: contact button label'],

            // Homepage — featured projects section
            'content.home_work_eyebrow' => ['group' => 'content', 'value' => 'SELECTED WORK', 'description' => 'Home: projects section eyebrow'],
            'content.home_work_title' => ['group' => 'content', 'value' => 'From discovery to development', 'description' => 'Home: projects section heading'],
            'content.home_work_body' => ['group' => 'content', 'value' => 'Technical excellence across exploration, resource modelling, mine planning and ESG — trusted by juniors, majors and funds.', 'description' => 'Home: projects section description'],
            'content.home_work_link' => ['group' => 'content', 'value' => 'View all projects →', 'description' => 'Home: projects section link label'],

            // Homepage — minerals strip
            'content.home_minerals_title' => ['group' => 'content', 'value' => 'Commodities we sign off', 'description' => 'Home: minerals section heading'],
            'content.home_minerals_link' => ['group' => 'content', 'value' => 'All minerals →', 'description' => 'Home: minerals section link label'],

            // Homepage — news strip
            'content.home_news_title' => ['group' => 'content', 'value' => 'Insights', 'description' => 'Home: news section heading'],
            'content.home_news_link' => ['group' => 'content', 'value' => 'All insights →', 'description' => 'Home: news section link label'],

            // Homepage — why mob / CTA
            'content.home_why_eyebrow' => ['group' => 'content', 'value' => 'WHY MOB', 'description' => 'Home: why-Mob section eyebrow'],
            'content.home_why_title' => ['group' => 'content', 'value' => 'Technical rigour. Commercial clarity.', 'description' => 'Home: why-Mob section heading'],
            'content.home_why_body' => ['group' => 'content', 'value' => 'We combine field geology, JORC-compliant modelling and DRA-style mine planning with Malawian permitting expertise. Your study stands up to lenders, boards and regulators.', 'description' => 'Home: why-Mob section paragraph'],
            'content.home_why_items' => ['group' => 'content', 'type' => 'json', 'value' => [
                'Exploration targeting & QA/QC',
                '3D resource models (Leapfrog/Isatis)',
                'Pit optimisation & reserves',
                'ESIA, RAP & stakeholder',
            ], 'description' => 'Home: why-Mob checklist items (JSON array of strings)'],
            'content.home_why_link' => ['group' => 'content', 'value' => 'Learn about Mob →', 'description' => 'Home: why-Mob link label'],
            'content.home_cta_title' => ['group' => 'content', 'value' => "Start a project\nwith Mob", 'description' => 'Home: CTA card heading (use a new line for a line break)'],
            'content.home_cta_body' => ['group' => 'content', 'value' => 'Scoping, PEA, PFS or FS — talk to our principal consultants. Response within one business day.', 'description' => 'Home: CTA card paragraph'],
            'content.home_cta_btn1' => ['group' => 'content', 'value' => 'Contact Us', 'description' => 'Home: CTA card primary button'],
            'content.home_cta_btn2' => ['group' => 'content', 'value' => "Join Mob — we're hiring →", 'description' => 'Home: CTA card secondary button'],

            // Homepage — trust bar
            'content.home_trust_label' => ['group' => 'content', 'value' => 'TRUSTED BY JUNIORS • MAJORS • FUNDS • DEVELOPMENT BANKS', 'description' => 'Home: trust bar label'],
            'content.home_trust_countries' => ['group' => 'content', 'type' => 'json', 'value' => ['Malawi', 'Zambia', 'DRC', 'Mozambique', 'Tanzania'], 'description' => 'Home: trust bar countries (JSON array of strings)'],

            // List page heroes
            'content.projects_hero_eyebrow' => ['group' => 'content', 'value' => 'MALAWI • SADC REGION', 'description' => 'Projects page: hero eyebrow'],
            'content.projects_hero_title' => ['group' => 'content', 'value' => 'Projects Across the SADC', 'description' => 'Projects page: hero heading'],
            'content.projects_hero_body' => ['group' => 'content', 'value' => "From Kasiya rutile in Malawi to Kolwezi cobalt in DRC and Balama graphite in Mozambique — Mob's footprint spans 8 SADC countries, JORC/NI 43-101 compliant.", 'description' => 'Projects page: hero paragraph'],
            'content.news_hero_title' => ['group' => 'content', 'value' => 'News & Media', 'description' => 'News page: hero heading'],
            'content.news_hero_subtitle' => ['group' => 'content', 'value' => 'Press releases, operational updates and ESG stories from across the SADC region.', 'description' => 'News page: hero subtitle'],
            'content.minerals_hero_title' => ['group' => 'content', 'value' => 'Minerals & Commodities', 'description' => 'Minerals page: hero heading'],
            'content.minerals_hero_subtitle' => ['group' => 'content', 'value' => 'Copper, cobalt, graphite, rare earths, gold, uranium — powering electrification across the SADC region.', 'description' => 'Minerals page: hero subtitle'],
            'content.careers_hero_title' => ['group' => 'content', 'value' => 'Careers', 'description' => 'Careers page: hero heading'],
            'content.careers_hero_subtitle' => ['group' => 'content', 'value' => 'Join our team across the SADC region — roles in geology, mining, processing, ESG, finance and community.', 'description' => 'Careers page: hero subtitle'],
            'content.sustainability_hero_title' => ['group' => 'content', 'value' => 'Sustainability — Malawi & SADC', 'description' => 'Sustainability page: hero heading'],
            'content.sustainability_hero_subtitle' => ['group' => 'content', 'value' => 'Water, biodiversity, community and governance — SADC-grounded, IFC PS, Malawi Mines Act compliant.', 'description' => 'Sustainability page: hero subtitle'],
            'content.contact_hero_title' => ['group' => 'content', 'value' => 'Contact — Lilongwe HQ', 'description' => 'Contact page: hero heading'],
            'content.contact_hero_subtitle' => ['group' => 'content', 'value' => 'Malawi-based, SADC-wide. Reach our Lilongwe, Blantyre, Karonga, Kolwezi, Solwezi teams.', 'description' => 'Contact page: hero subtitle'],
            'content.search_hero_title' => ['group' => 'content', 'value' => 'Search', 'description' => 'Search page: hero heading'],
            'content.search_hero_subtitle' => ['group' => 'content', 'value' => 'Search across projects, minerals, news and pages.', 'description' => 'Search page: hero subtitle'],
            'content.about_hero_title' => ['group' => 'content', 'value' => 'About Mob Limited', 'description' => 'About page (fallback): hero heading'],
            'content.about_hero_subtitle' => ['group' => 'content', 'value' => 'Malawi-based, SADC-wide. From greenfield exploration to mine development — we de-risk your resource with world-class technical excellence.', 'description' => 'About page (fallback): hero subtitle'],

            // Contact page body
            'content.contact_visit_title' => ['group' => 'content', 'value' => 'Visit Us', 'description' => 'Contact page: left column heading'],
            'content.contact_head_office_label' => ['group' => 'content', 'value' => 'Head Office — Lilongwe', 'description' => 'Contact page: head office card label'],
            'content.contact_hubs_label' => ['group' => 'content', 'value' => 'SADC Hubs', 'description' => 'Contact page: hubs card label'],
            'content.contact_hubs' => ['group' => 'content', 'value' => "Blantyre (Malawi) • Karonga (Kayelekera)\nKolwezi (DRC) • Solwezi (Zambia)\nBalama (Mozambique) • Windhoek (Namibia)\nJohannesburg (South Africa)", 'description' => 'Contact page: hub lines (one per row)'],
            'content.contact_map_caption' => ['group' => 'content', 'value' => 'SADC Region — 8 Countries', 'description' => 'Contact page: map caption'],
            'content.contact_form_title' => ['group' => 'content', 'value' => 'Send an enquiry', 'description' => 'Contact page: form heading'],
            'content.contact_form_body' => ['group' => 'content', 'value' => 'For exploration, JORC, ESIA or lender due diligence — response within one business day.', 'description' => 'Contact page: form intro paragraph'],
            'content.faq_title' => ['group' => 'content', 'value' => 'Frequently asked questions', 'description' => 'Contact page: FAQ section heading'],
            'content.team_title' => ['group' => 'content', 'value' => 'Leadership', 'description' => 'About page: team section heading'],
        ];

        foreach ($settings as $key => $row) {
            if (SiteSetting::where('key', $key)->exists()) {
                continue;
            }
            SiteSetting::create([
                'key' => $key,
                'value' => $row['value'],
                'type' => $row['type'] ?? 'text',
                'group' => $row['group'],
                'description' => $row['description'] ?? null,
                'is_public' => true,
            ]);
        }
    }
}
