<?php

namespace Database\Seeders;

use App\Models\NavigationMenu;
use App\Models\Page;
use Illuminate\Database\Seeder;

class PagesSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            ['title' => 'Home', 'slug' => 'home', 'is_homepage' => true, 'sort_order' => 0, 'excerpt' => 'Mob Limited — Integrated Mining and Mineral Consultancy'],
            ['title' => 'News & Media', 'slug' => 'news', 'sort_order' => 4, 'excerpt' => 'News and media'],
            ['title' => 'Careers', 'slug' => 'careers', 'sort_order' => 5, 'excerpt' => 'Careers at Mob Limited'],
            ['title' => 'Contact', 'slug' => 'contact', 'sort_order' => 7, 'excerpt' => 'Contact Mob Limited'],
        ];

        foreach ($pages as $p) {
            $page = Page::withTrashed()->firstOrCreate(
                ['slug' => $p['slug']],
                array_merge($p, ['status' => 'draft', 'template' => 'default'])
            );
            if ($page->trashed()) {
                $page->restore();
            }
        }

        // About page — consistent with the services page UI
        $about = Page::withTrashed()->firstOrCreate(['slug' => 'about'], ['title' => 'About Mob Limited', 'template' => 'default', 'excerpt' => 'About Mob Limited', 'sort_order' => 1]);
        if ($about->trashed()) {
            $about->restore();
        }
        $about->update(['status' => 'published', 'published_at' => now()]);
        $about->blocks()->delete();
        $about->blocks()->create(['type' => 'hero', 'data' => ['heading' => 'About Mob Limited', 'subheading' => 'Malawi-based, SADC-wide. From greenfield exploration to mine development — we de-risk your resource with world-class technical excellence.', 'cta_label' => 'Talk to us', 'cta_url' => '/contact'], 'sort_order' => 0]);
        $about->blocks()->create(['type' => 'rich_text', 'data' => ['content' => '<h2>Our Story</h2><p>Headquartered in <strong>Lilongwe, Malawi</strong>, Mob Limited is an integrated mining and mineral consultancy serving the entire <strong>SADC region</strong> — Malawi, Zambia, DRC, Mozambique, Tanzania, South Africa, Zimbabwe, Botswana, Namibia and beyond. We deliver JORC, NI 43-101 and SAMREC studies from exploration targeting and 3D modelling to pit optimisation, reserves, ESIA and lender due diligence.</p><p>From our headquarters in Lilongwe, we support exploration, resource estimation, mine planning, ESG and permitting across 8 SADC countries — combining Malawian field execution with world-class JORC modelling so your study stands up to lenders, boards and regulators.</p><p><em>Professional, bankable, SADC-grounded.</em></p>'], 'sort_order' => 1]);
        $about->blocks()->create(['type' => 'stats', 'data' => ['stats' => [['label' => 'Projects Delivered', 'value' => '120+'], ['label' => 'Years in SADC', 'value' => '10+'], ['label' => 'SADC Countries', 'value' => '8'], ['label' => 'Professionals', 'value' => '50+']]], 'sort_order' => 2]);
        $about->blocks()->create(['type' => 'cta', 'data' => ['heading' => 'Ready to de-risk your next project?', 'text' => 'Talk to our Lilongwe team. Response within one business day.', 'cta_label' => 'Get in touch', 'cta_url' => '/contact'], 'sort_order' => 3]);

        // Services page — only the core services from the company profile
        $services = Page::withTrashed()->firstOrCreate(['slug' => 'services'], ['title' => 'Our Core Services', 'template' => 'default', 'excerpt' => 'Services', 'sort_order' => 8]);
        if ($services->trashed()) {
            $services->restore();
        }
        $services->update(['status' => 'published', 'published_at' => now()]);
        $services->blocks()->delete();
        $services->blocks()->create(['type' => 'hero', 'data' => ['heading' => 'Our Core Services', 'subheading' => 'Seven disciplines. One integrated team — delivering JORC, NI 43-101 and SAMREC compliant technical services across the SADC mining value chain.', 'cta_label' => 'Talk to us', 'cta_url' => '/contact'], 'sort_order' => 0]);
        $services->blocks()->create(['type' => 'card_grid', 'data' => ['title' => 'Our Core Services', 'cards' => [
            ['title' => 'Geological Services', 'text' => 'Geological mapping, prospecting, structural studies & resource evaluation.', 'url' => '/services/geological-services'],
            ['title' => 'Mineral Exploration', 'text' => 'Exploration planning, geochemical sampling, drilling supervision & reporting.', 'url' => '/services/mineral-exploration'],
            ['title' => 'Surveying, GIS & Remote Sensing', 'text' => 'Topographic surveys, drone mapping, GIS analysis & spatial solutions.', 'url' => '/services/surveying-gis-remote-sensing'],
            ['title' => 'Geophysical Services', 'text' => 'Magnetic, electrical & EM surveys with professional data interpretation.', 'url' => '/services/geophysical-services'],
            ['title' => 'Mining Consultancy', 'text' => 'Mine planning, feasibility studies, due diligence & technical advisory services.', 'url' => '/services/mining-consultancy'],
            ['title' => 'Environmental & Regulatory Services', 'text' => 'Environmental assessments, compliance support, licensing & rehabilitation planning.', 'url' => '/services/environmental-regulatory-services'],
            ['title' => 'Project Management & Technical Support', 'text' => 'Project management, HSE, technical reporting, field logistics & data management.', 'url' => '/services/project-management-technical-support'],
        ]], 'sort_order' => 1]);
        $services->blocks()->create(['type' => 'cta', 'data' => ['heading' => 'Ready to de-risk your next project?', 'text' => 'Talk to our Lilongwe team. Response within one business day.', 'cta_label' => 'Get in touch', 'cta_url' => '/contact'], 'sort_order' => 2]);

        // Dedicated service pages — one per core service
        $servicePages = [
            ['slug' => 'geological-services', 'title' => 'Geological Services', 'image' => 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600', 'sub' => 'Geological mapping, prospecting, structural studies and resource evaluation across the SADC region.', 'body' => '<h2>Geological Services</h2><p>From greenfield targeting to resource definition, our geological teams deliver field mapping, prospecting, structural analysis and 3D modelling that stand up to JORC, NI 43-101 and SAMREC scrutiny. We work across Malawi, Zambia, DRC, Mozambique and the wider SADC region.</p><h3>What we deliver</h3><ul><li>Geological and structural mapping (1:500 to 1:50,000)</li><li>Prospecting and target generation</li><li>3D geological modelling (Leapfrog, Micromine)</li><li>Resource and reserve estimation (JORC / NI 43-101 / SAMREC)</li><li>QA/QC programmes and data management</li></ul><p><em>Bankable, regulator-ready deliverables.</em></p>'],
            ['slug' => 'mineral-exploration', 'title' => 'Mineral Exploration', 'image' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600', 'sub' => 'Exploration planning, geochemical sampling, drilling supervision and reporting.', 'body' => '<h2>Mineral Exploration</h2><p>We plan and execute exploration programmes from early-stage targeting through to resource definition — geochemical sampling, drilling supervision, logging and reporting, all aligned to international codes.</p><h3>What we deliver</h3><ul><li>Exploration strategy and budgeting</li><li>Soil, stream and rock-chip geochemistry</li><li>Drilling supervision (RC, diamond, auger)</li><li>Core logging and sampling</li><li>Exploration reporting and work programmes</li></ul><p><em>From first pass to resource.</em></p>'],
            ['slug' => 'surveying-gis-remote-sensing', 'title' => 'Surveying, GIS & Remote Sensing', 'image' => 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600', 'sub' => 'Topographic surveys, drone mapping, GIS analysis and spatial solutions.', 'body' => '<h2>Surveying, GIS & Remote Sensing</h2><p>Precise spatial data for exploration and mine development — topographic surveys, UAV/drone mapping, GIS analysis and spatial data management, delivered to mining and engineering standards.</p><h3>What we deliver</h3><ul><li>Topographic and cadastral surveys</li><li>UAV/drone photogrammetry and LiDAR</li><li>GIS analysis and spatial databases</li><li>3D surface and volume calculations</li><li>Remote-sensing interpretation</li></ul><p><em>Spatial solutions for the mining value chain.</em></p>'],
            ['slug' => 'geophysical-services', 'title' => 'Geophysical Services', 'image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600', 'sub' => 'Magnetic, electrical and EM surveys with professional data interpretation.', 'body' => '<h2>Geophysical Services</h2><p>We acquire and interpret magnetic, electrical and electromagnetic surveys to identify subsurface structures and mineralisation, reducing exploration risk and cost.</p><h3>What we deliver</h3><ul><li>Ground and airborne magnetic surveys</li><li>Electrical resistivity and IP surveys</li><li>Electromagnetic (EM) surveys</li><li>Data processing and inversion</li><li>Interpretation and targeting reports</li></ul><p><em>Seeing what lies beneath.</em></p>'],
            ['slug' => 'mining-consultancy', 'title' => 'Mining Consultancy', 'image' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600', 'sub' => 'Mine planning, feasibility studies, due diligence and technical advisory services.', 'body' => '<h2>Mining Consultancy</h2><p>From scoping to bankable feasibility, we provide mine planning, pit optimisation, scheduling and technical advisory services that support investment decisions and lender due diligence.</p><h3>What we deliver</h3><ul><li>Scoping (PEA) and pre-feasibility studies</li><li>Feasibility studies (PFS/FS)</li><li>Open-pit and underground mine planning</li><li>Pit optimisation and scheduling</li><li>Due diligence and technical reviews</li></ul><p><em>Bankable studies, SADC-grounded.</em></p>'],
            ['slug' => 'environmental-regulatory-services', 'title' => 'Environmental & Regulatory Services', 'image' => 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600', 'sub' => 'Environmental assessments, compliance support, licensing and rehabilitation planning.', 'body' => '<h2>Environmental & Regulatory Services</h2><p>We support environmental and social impact assessment, permitting and compliance across the SADC region — IFC Performance Standards, GRI and Malawian regulatory frameworks.</p><h3>What we deliver</h3><ul><li>ESIA and environmental management plans</li><li>Permitting and licensing support</li><li>Rehabilitation and closure planning</li><li>Stakeholder and community engagement</li><li>ESG reporting and monitoring</li></ul><p><em>Responsible mining, SADC-grounded.</em></p>'],
            ['slug' => 'project-management-technical-support', 'title' => 'Project Management & Technical Support', 'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600', 'sub' => 'Project management, HSE, technical reporting, field logistics and data management.', 'body' => '<h2>Project Management & Technical Support</h2><p>We manage projects and field programmes end to end — HSE, technical reporting, logistics and data management — so your study is delivered on time and to standard.</p><h3>What we deliver</h3><ul><li>Project and programme management</li><li>HSE planning and implementation</li><li>Technical reporting and documentation</li><li>Field logistics and camp management</li><li>Data management and QA/QC</li></ul><p><em>Delivery you can rely on.</em></p>'],
        ];
        foreach ($servicePages as $sp) {
            $p = Page::withTrashed()->firstOrCreate(['slug' => $sp['slug']], ['title' => $sp['title'], 'template' => 'default', 'excerpt' => $sp['sub'], 'sort_order' => 9]);
            if ($p->trashed()) {
                $p->restore();
            }
            $p->update(['status' => 'published', 'published_at' => now()]);
            $p->blocks()->delete();
            $p->blocks()->create(['type' => 'hero', 'data' => ['heading' => $sp['title'], 'subheading' => $sp['sub'], 'cta_label' => 'Talk to us', 'cta_url' => '/contact', 'image' => $sp['image']], 'sort_order' => 0]);
            $p->blocks()->create(['type' => 'rich_text', 'data' => ['content' => $sp['body']], 'sort_order' => 1]);
            $p->blocks()->create(['type' => 'cta', 'data' => ['heading' => 'Ready to de-risk your next project?', 'text' => 'Talk to our Lilongwe team. Response within one business day.', 'cta_label' => 'Get in touch', 'cta_url' => '/contact'], 'sort_order' => 2]);
        }

        // Main navigation (idempotent) — includes "Our Services"
        $main = NavigationMenu::firstOrCreate(['slug' => 'main'], ['name' => 'Main Navigation', 'location' => 'header']);
        $main->allItems()->delete();
        $navItems = [
            ['title' => 'Home', 'url' => '/', 'type' => 'internal', 'sort_order' => 0],
            ['title' => 'About', 'url' => '/about', 'type' => 'internal', 'sort_order' => 1],
            ['title' => 'Our Services', 'url' => '/services', 'type' => 'internal', 'sort_order' => 2],
            ['title' => 'Our Team', 'url' => '/team', 'type' => 'internal', 'sort_order' => 3],
            ['title' => 'News', 'url' => '/news', 'type' => 'internal', 'sort_order' => 4],
            ['title' => 'Careers', 'url' => '/careers', 'type' => 'internal', 'sort_order' => 5],
            ['title' => 'Contact', 'url' => '/contact', 'type' => 'internal', 'sort_order' => 6],
        ];
        foreach ($navItems as $it) {
            $main->allItems()->create($it);
        }
    }
}
