<?php

namespace Database\Seeders;

use App\Models\Career;
use App\Models\Category;
use App\Models\EsgContent;
use App\Models\Faq;
use App\Models\LeadershipProfile;
use App\Models\Location;
use App\Models\Mineral;
use App\Models\NavigationMenu;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\ProcurementNotice;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Locations — Malawi HQ + SADC footprint
        $locations = [
            ['name' => 'Head Office — Lilongwe', 'slug' => 'lilongwe-head-office', 'type' => 'head_office', 'country' => 'Malawi', 'city' => 'Lilongwe', 'address' => 'Area 47 Sector 3, Lilongwe', 'latitude' => -13.9626, 'longitude' => 33.7741],
            ['name' => 'Blantyre Office', 'slug' => 'blantyre-office', 'type' => 'head_office', 'country' => 'Malawi', 'city' => 'Blantyre', 'address' => 'Ginnery Corner, Chipembere Highway, Blantyre', 'latitude' => -15.7861, 'longitude' => 35.0058],
            ['name' => 'Kayelekera — Karonga', 'slug' => 'kayelekera-karonga', 'type' => 'mine', 'country' => 'Malawi', 'region' => 'Northern Region', 'city' => 'Karonga', 'latitude' => -10.192, 'longitude' => 33.892],
            ['name' => 'Kasiya Rutile — Lilongwe', 'slug' => 'kasiya-rutile', 'type' => 'mine', 'country' => 'Malawi', 'region' => 'Central Region', 'city' => 'Lilongwe', 'latitude' => -13.5, 'longitude' => 33.2],
            ['name' => 'Songwe Hill REE — Phalombe', 'slug' => 'songwe-hill', 'type' => 'exploration', 'country' => 'Malawi', 'region' => 'Southern Region', 'city' => 'Phalombe', 'latitude' => -15.6, 'longitude' => 35.6],
            ['name' => 'Kolwezi Hub — DRC', 'slug' => 'kolwezi-hub', 'type' => 'mine', 'country' => 'DR Congo', 'city' => 'Kolwezi', 'latitude' => -10.71, 'longitude' => 25.47],
            ['name' => 'Solwezi Office — Zambia', 'slug' => 'solwezi-office', 'type' => 'exploration', 'country' => 'Zambia', 'city' => 'Solwezi', 'latitude' => -12.0965, 'longitude' => 26.4232],
            ['name' => 'Balama Graphite — Mozambique', 'slug' => 'balama-mozambique', 'type' => 'mine', 'country' => 'Mozambique', 'city' => 'Balama', 'latitude' => -13.35, 'longitude' => 38.57],
            ['name' => 'Windhoek Support — Namibia', 'slug' => 'windhoek-namibia', 'type' => 'head_office', 'country' => 'Namibia', 'city' => 'Windhoek', 'latitude' => -22.56, 'longitude' => 17.08],
            ['name' => 'Johannesburg Hub — South Africa', 'slug' => 'johannesburg-hub', 'type' => 'head_office', 'country' => 'South Africa', 'city' => 'Johannesburg', 'address' => 'Sandton, Johannesburg', 'latitude' => -26.10, 'longitude' => 28.04],
        ];
        foreach ($locations as $loc) {
            Location::firstOrCreate(['slug' => $loc['slug']], $loc);
        }

        // Minerals — SADC critical
        $minerals = [
            ['name' => 'Copper', 'slug' => 'copper', 'chemical_symbol' => 'Cu', 'category' => 'base', 'summary' => 'SADC copperbelt backbone — electrification metal.', 'description' => 'High conductivity metal for grids, EVs and wind. Mob signs JORC resources across Zambia/DRC.', 'uses' => 'Wiring, EVs, renewable grids', 'color' => '#B87333', 'is_featured' => true],
            ['name' => 'Cobalt', 'slug' => 'cobalt', 'chemical_symbol' => 'Co', 'category' => 'battery', 'summary' => 'Battery-grade cobalt from DRC Copperbelt.', 'description' => 'Kolwezi region hydroxide, battery supply chain.', 'uses' => 'EV batteries, alloys', 'color' => '#0047AB', 'is_featured' => true],
            ['name' => 'Graphite', 'slug' => 'graphite', 'chemical_symbol' => 'C', 'category' => 'battery', 'summary' => 'Balama & Malawi flake graphite for anodes.', 'description' => 'Natural flake, 94-97% Cg, anode precursor.', 'uses' => 'Battery anodes, refractories', 'color' => '#2E2E2E', 'is_featured' => true],
            ['name' => 'Rare Earths', 'slug' => 'rare-earths', 'chemical_symbol' => 'REE', 'category' => 'critical', 'summary' => 'Songwe Hill — NdPr for permanent magnets.', 'description' => 'Malawi’s flagship REE carbonatite, magnet supply.', 'uses' => 'Wind turbines, EV motors', 'color' => '#6A3D9A', 'is_featured' => true],
            ['name' => 'Gold', 'slug' => 'gold', 'chemical_symbol' => 'Au', 'category' => 'precious', 'summary' => 'Tanzania/Ghana orogenic gold.', 'description' => 'Greenstone gold, JORC compliant.', 'uses' => 'Jewellery, electronics, investment', 'color' => '#FFD700', 'is_featured' => false],
            ['name' => 'Uranium', 'slug' => 'uranium', 'chemical_symbol' => 'U', 'category' => 'energy', 'summary' => 'Kayelekera — Malawi sandstone uranium.', 'description' => 'Karonga basin, ISR and open pit studies.', 'uses' => 'Nuclear fuel', 'color' => '#4CAF50', 'is_featured' => false],
            ['name' => 'Lithium', 'slug' => 'lithium', 'chemical_symbol' => 'Li', 'category' => 'battery', 'summary' => 'Zimbabwe/Malawi hard-rock & brine.', 'description' => 'Pegmatite spodumene, LCE supply.', 'uses' => 'Batteries', 'color' => '#E0E0E0', 'is_featured' => false],
            ['name' => 'Rutile', 'slug' => 'rutile', 'chemical_symbol' => 'TiO2', 'category' => 'industrial', 'summary' => 'Kasiya — world-class rutile sands (Malawi).', 'description' => 'Natural rutile 95% TiO2, pigment & Ti metal.', 'uses' => 'Pigment, aerospace', 'color' => '#8D6E63', 'is_featured' => false],
        ];
        foreach ($minerals as $m) {
            Mineral::firstOrCreate(['slug' => $m['slug']], array_merge($m, ['status' => 'published', 'published_at' => now(), 'is_active' => true]));
        }

        // Projects — pan-SADC
        $lilongweLoc = Location::where('slug', 'kasiya-rutile')->first();
        $kayelekeraLoc = Location::where('slug', 'kayelekera-karonga')->first();
        $songweLoc = Location::where('slug', 'songwe-hill')->first();
        $kolweziLoc = Location::where('slug', 'kolwezi-hub')->first();
        $solweziLoc = Location::where('slug', 'solwezi-office')->first();
        $balamaLoc = Location::where('slug', 'balama-mozambique')->first();
        $projects = [
            ['name' => 'Kasiya Rutile-Graphite — Malawi', 'slug' => 'kasiya-rutile-graphite', 'code' => 'KAS-001', 'summary' => 'World-class rutile sands, Malawi Central Region — largest natural rutile deposit globally.', 'description' => 'DFS 2024: 1.8Bt @ 1.0% rutile, 1.4% graphite. Low-carbon natural rutile, hydro mining. Mob completed JORC resource & mine plan.', 'location_id' => $lilongweLoc?->id, 'country' => 'Malawi', 'region' => 'Central Region', 'status' => 'development', 'stage' => 'feasibility', 'project_type' => 'mineral_sands', 'ownership_percentage' => 'Consultancy', 'is_featured' => true, 'content_status' => 'published', 'published_at' => now()],
            ['name' => 'Kayelekera Uranium — Malawi', 'slug' => 'kayelekera-uranium', 'code' => 'KAY-002', 'summary' => 'Northern Malawi sandstone uranium — restart study.', 'description' => 'Previous producer 2009-2014. Mob re-estimated JORC, ISR amenability and ESIA for SADC market.', 'location_id' => $kayelekeraLoc?->id, 'country' => 'Malawi', 'region' => 'Northern Region', 'status' => 'development', 'stage' => 'feasibility', 'project_type' => 'open_pit', 'ownership_percentage' => 'Advisory', 'is_featured' => true, 'content_status' => 'published', 'published_at' => now()],
            ['name' => 'Songwe Hill REE — Malawi', 'slug' => 'songwe-hill-ree', 'code' => 'SON-003', 'summary' => 'Phalombe carbonatite — NdPr magnet REE.', 'description' => 'PFS 2023, 21Mt @ 1.2% TREO, 34% NdPr. Magnet REE for wind/EVs. Mob QA/QC and resource model.', 'location_id' => $songweLoc?->id, 'country' => 'Malawi', 'region' => 'Southern Region', 'status' => 'development', 'stage' => 'feasibility', 'project_type' => 'open_pit', 'ownership_percentage' => 'Consultancy', 'is_featured' => true, 'content_status' => 'published', 'published_at' => now()],
            ['name' => 'Kansanshi Copper-Gold — Zambia', 'slug' => 'kansanshi-copper-gold-mine', 'code' => 'KAN-004', 'summary' => 'Flagship open-pit copper — 18Mtpa, SADC copperbelt.', 'description' => 'Operating since 2005. Mob provided grade control & S3 pit optimisation. Expansion to 25Mtpa.', 'location_id' => $solweziLoc?->id, 'country' => 'Zambia', 'region' => 'North-Western', 'status' => 'operation', 'stage' => 'production', 'project_type' => 'open_pit', 'ownership_percentage' => 'Advisory', 'is_featured' => true, 'content_status' => 'published', 'published_at' => now()],
            ['name' => 'Kolwezi Cobalt-Copper — DRC', 'slug' => 'kolwezi-cobalt-copper', 'code' => 'KOL-005', 'summary' => 'DRC Copperbelt cobalt-copper hydroxide.', 'description' => 'Battery supply chain. Mob completed NI 43-101 and hydrogeology.', 'location_id' => $kolweziLoc?->id, 'country' => 'DR Congo', 'region' => 'Lualaba', 'status' => 'operation', 'stage' => 'production', 'project_type' => 'open_pit', 'ownership_percentage' => 'Consultancy', 'is_featured' => false, 'content_status' => 'published', 'published_at' => now()],
            ['name' => 'Balama Graphite — Mozambique', 'slug' => 'balama-graphite', 'code' => 'BAL-006', 'summary' => 'Cabo Delgado flake graphite — anode material.', 'description' => 'SADC’s largest flake graphite, 50ktpa. Mob resource & ESG.', 'location_id' => $balamaLoc?->id, 'country' => 'Mozambique', 'region' => 'Cabo Delgado', 'status' => 'operation', 'stage' => 'production', 'project_type' => 'open_pit', 'ownership_percentage' => 'Study', 'is_featured' => false, 'content_status' => 'published', 'published_at' => now()],
        ];
        foreach ($projects as $p) {
            $proj = Project::firstOrCreate(['slug' => $p['slug']], $p);
            $mineralsForProj = match ($p['slug']) {
                'kasiya-rutile-graphite' => ['rutile', 'graphite'],
                'kayelekera-uranium' => ['uranium'],
                'songwe-hill-ree' => ['rare-earths'],
                'kansanshi-copper-gold-mine' => ['copper', 'gold'],
                'kolwezi-cobalt-copper' => ['cobalt', 'copper'],
                'balama-graphite' => ['graphite'],
                default => [],
            };
            if (! empty($mineralsForProj)) {
                $minIds = Mineral::whereIn('slug', $mineralsForProj)->pluck('id');
                $proj->minerals()->syncWithoutDetaching($minIds);
            }
        }

        // Categories & Tags
        $cats = [
            ['name' => 'Corporate', 'slug' => 'corporate', 'type' => 'news'],
            ['name' => 'Operations', 'slug' => 'operations', 'type' => 'news'],
            ['name' => 'Sustainability', 'slug' => 'sustainability', 'type' => 'news'],
            ['name' => 'Exploration', 'slug' => 'exploration', 'type' => 'news'],
        ];
        foreach ($cats as $c) {
            Category::firstOrCreate(['slug' => $c['slug']], $c);
        }
        $tags = ['SADC', 'Malawi', 'ESG', 'JORC', 'Graphite', 'REE', 'Exploration'];
        foreach ($tags as $t) {
            Tag::firstOrCreate(['slug' => Str::slug($t)], ['name' => $t]);
        }

        $admin = User::first();
        $corporateCat = Category::where('slug', 'corporate')->first();
        $opsCat = Category::where('slug', 'operations')->first();
        $news = [
            ['title' => 'Kasiya DFS Confirms World-Class Rutile Economics', 'slug' => 'kasiya-dfs-rutile-2025', 'excerpt' => 'Malawi rutile NPV US$1.2bn — Mob JORC signed.', 'content' => 'DFS led by Mob shows 25-year life, 1.8Bt @ 1% rutile. Low carbon, hydro mining. SADC’s flagship critical mineral project.', 'category_id' => $opsCat?->id, 'status' => 'published', 'published_at' => now()->subDays(2), 'is_featured' => true],
            ['title' => 'Songwe Hill REE — PFS Update & SADC Magnet Supply', 'slug' => 'songwe-ree-pfs-update', 'excerpt' => 'Phalombe NdPr for wind turbines — 34% magnet REO.', 'content' => 'Mob-lead resource update supports PFS. Malawi REE to feed SADC magnet chain.', 'category_id' => $opsCat?->id, 'status' => 'published', 'published_at' => now()->subDays(5), 'is_featured' => true],
            ['title' => 'Kayelekera Uranium Restart Study Begins', 'slug' => 'kayelekera-restart-2026', 'excerpt' => 'Karonga uranium — ISR and open pit options.', 'content' => 'Mob re-estimates JORC and ESIA. SADC energy security focus.', 'category_id' => $corporateCat?->id, 'status' => 'published', 'published_at' => now()->subDays(10), 'is_featured' => false],
            ['title' => 'Mob Opens Kolwezi Hub — DRC Battery Chain', 'slug' => 'mob-kolwezi-hub', 'excerpt' => 'Copperbelt presence expanded — Kolwezi office.', 'content' => 'New hub to serve DRC-Zambia SADC battery corridor.', 'category_id' => $corporateCat?->id, 'status' => 'published', 'published_at' => now()->subDays(15), 'is_featured' => false],
        ];
        foreach ($news as $n) {
            $article = NewsArticle::firstOrCreate(['slug' => $n['slug']], array_merge($n, ['author_id' => $admin?->id]));
            $article->tags()->syncWithoutDetaching(Tag::inRandomOrder()->limit(2)->pluck('id'));
        }

        // Pages + Blocks
        $home = Page::firstOrCreate(['slug' => 'home'], ['title' => 'Home', 'template' => 'home', 'status' => 'published', 'is_homepage' => true, 'published_at' => now(), 'created_by' => $admin?->id]);
        $home->blocks()->delete();
        $blocks = [
            ['type' => 'hero', 'data' => ['heading' => 'Integrated Mining & Mineral Solutions', 'subheading' => 'Malawi-based, SADC-wide. One integrated team across the mining value chain — exploring potential and delivering value from greenfield exploration to bankable studies and mine development. JORC, NI 43-101 & SAMREC.', 'cta_label' => 'Explore Services', 'cta_url' => '/services', 'image' => 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600'], 'sort_order' => 0],
            ['type' => 'stats', 'data' => ['stats' => [['label' => 'Projects Delivered', 'value' => '120+'], ['label' => 'Years in SADC', 'value' => '10+'], ['label' => 'JORC Resources Defined', 'value' => '2.1 Bt'], ['label' => 'SADC Countries', 'value' => '8']]], 'sort_order' => 1],
            ['type' => 'rich_text', 'data' => ['content' => '<p><strong>Mob Limited</strong> is headquartered in <strong>Lilongwe, Malawi</strong> and serves the entire SADC region. We combine Malawian field execution with world-class JORC modelling — your study stands up to lenders, boards and regulators.</p>'], 'sort_order' => 2],
            ['type' => 'cta', 'data' => ['heading' => 'Start a project with Mob', 'text' => 'Scoping, PEA, PFS or FS — talk to our principal consultants in Lilongwe, Blantyre or Kolwezi. Response within one business day.', 'cta_label' => 'Contact Lilongwe HQ', 'cta_url' => '/contact'], 'sort_order' => 3],
        ];
        foreach ($blocks as $b) {
            $home->blocks()->create($b);
        }

        $about = Page::firstOrCreate(['slug' => 'about'], ['title' => 'About Mob Limited', 'status' => 'published', 'published_at' => now(), 'created_by' => $admin?->id]);
        $about->blocks()->delete();
        $about->blocks()->create(['type' => 'hero', 'data' => ['heading' => 'About Mob Limited', 'subheading' => 'Malawi-based, SADC-wide. From greenfield exploration to mine development — we de-risk your resource with world-class technical excellence.', 'cta_label' => 'Talk to us', 'cta_url' => '/contact'], 'sort_order' => 0]);
        $about->blocks()->create(['type' => 'rich_text', 'data' => ['content' => '<h2>Our Story</h2><p>Headquartered in <strong>Lilongwe, Malawi</strong>, Mob Limited is an integrated mining and mineral consultancy serving the entire <strong>SADC region</strong> — Malawi, Zambia, DRC, Mozambique, Tanzania, South Africa, Zimbabwe, Botswana, Namibia and beyond. We deliver JORC, NI 43-101 and SAMREC studies from exploration targeting and 3D modelling to pit optimisation, reserves, ESIA and lender due diligence.</p><p>From our headquarters in Lilongwe, we support exploration, resource estimation, mine planning, ESG and permitting across 8 SADC countries — combining Malawian field execution with world-class JORC modelling so your study stands up to lenders, boards and regulators.</p><p><em>Professional, bankable, SADC-grounded.</em></p>'], 'sort_order' => 1]);
        $about->blocks()->create(['type' => 'stats', 'data' => ['stats' => [['label' => 'Projects Delivered', 'value' => '120+'], ['label' => 'Years in SADC', 'value' => '10+'], ['label' => 'SADC Countries', 'value' => '8'], ['label' => 'Professionals', 'value' => '50+']]], 'sort_order' => 2]);
        $about->blocks()->create(['type' => 'cta', 'data' => ['heading' => 'Ready to de-risk your next project?', 'text' => 'Talk to our Lilongwe team. Response within one business day.', 'cta_label' => 'Get in touch', 'cta_url' => '/contact'], 'sort_order' => 3]);

        $privacy = Page::firstOrCreate(['slug' => 'privacy'], ['title' => 'Privacy Policy', 'status' => 'published', 'published_at' => now()]);
        $privacy->blocks()->delete();
        $privacy->blocks()->create(['type' => 'rich_text', 'data' => ['content' => '<h2>Privacy Policy</h2><p>Mob Limited (&quot;we&quot;), headquartered at Area 47 Sector 3, Lilongwe, Malawi, respects your privacy. This policy explains how we handle information you share through this website.</p><h3>Information we collect</h3><p>When you submit a contact enquiry or job application we collect the details you provide (name, email, company, message and any CV or supporting documents) and technical logs needed to operate the site securely.</p><h3>How we use it</h3><p>We use your information only to respond to your enquiry, assess applications, and meet legal obligations under Malawian data protection law. We do not sell your personal data.</p><h3>Retention and contact</h3><p>We keep enquiries and applications only as long as necessary for these purposes. To request access, correction or deletion of your data, email <strong>info@moblimited.com</strong> or write to our Lilongwe office.</p><p><em>Last updated: 2026.</em></p>'], 'sort_order' => 0]);

        $terms = Page::firstOrCreate(['slug' => 'terms'], ['title' => 'Terms of Use', 'status' => 'published', 'published_at' => now()]);
        $terms->blocks()->delete();
        $terms->blocks()->create(['type' => 'rich_text', 'data' => ['content' => '<h2>Terms of Use</h2><p>By using this website you agree to these terms. Content is provided for general information about Mob Limited and our services.</p><h3>No professional advice</h3><p>Nothing on this site constitutes a mineral resource or reserve statement under JORC, NI 43-101 or SAMREC, investment advice, or a binding offer of services. Project information is illustrative and may be updated without notice.</p><h3>Intellectual property</h3><p>Unless stated otherwise, site content is owned by Mob Limited. You may view and share links to it for personal and internal business use; reproduction requires our written consent.</p><h3>External links and governing law</h3><p>Links to third-party sites are provided for convenience; we are not responsible for their content. These terms are governed by the laws of Malawi.</p><p><em>Last updated: 2026.</em></p>'], 'sort_order' => 0]);

        // Services page — only the core services from the company profile
        $services = Page::firstOrCreate(['slug' => 'services'], ['title' => 'Our Core Services', 'template' => 'default', 'status' => 'published', 'published_at' => now(), 'created_by' => $admin?->id]);
        $services->blocks()->delete();
        $services->blocks()->create(['type' => 'hero', 'data' => ['heading' => 'Our Core Services', 'subheading' => 'Seven disciplines. One integrated team — delivering JORC, NI 43-101 and SAMREC compliant technical services across the SADC mining value chain.', 'cta_label' => 'Talk to us', 'cta_url' => '/contact'], 'sort_order' => 0]);
        $services->blocks()->create(['type' => 'card_grid', 'data' => ['title' => 'Our Core Services', 'cards' => [
            ['title' => 'Geological Services', 'text' => 'Geological mapping, prospecting, structural studies & resource evaluation.'],
            ['title' => 'Mineral Exploration', 'text' => 'Exploration planning, geochemical sampling, drilling supervision & reporting.'],
            ['title' => 'Surveying, GIS & Remote Sensing', 'text' => 'Topographic surveys, drone mapping, GIS analysis & spatial solutions.'],
            ['title' => 'Geophysical Services', 'text' => 'Magnetic, electrical & EM surveys with professional data interpretation.'],
            ['title' => 'Mining Consultancy', 'text' => 'Mine planning, feasibility studies, due diligence & technical advisory services.'],
            ['title' => 'Environmental & Regulatory Services', 'text' => 'Environmental assessments, compliance support, licensing & rehabilitation planning.'],
            ['title' => 'Project Management & Technical Support', 'text' => 'Project management, HSE, technical reporting, field logistics & data management.'],
        ]], 'sort_order' => 1]);
        $services->blocks()->create(['type' => 'cta', 'data' => ['heading' => 'Ready to de-risk your next project?', 'text' => 'Talk to our Lilongwe team. Response within one business day.', 'cta_label' => 'Get in touch', 'cta_url' => '/contact'], 'sort_order' => 2]);

        // Navigation
        $main = NavigationMenu::firstOrCreate(['slug' => 'main'], ['name' => 'Main Navigation', 'location' => 'header']);
        $main->allItems()->delete();
        $items = [
            ['title' => 'Home', 'url' => '/', 'type' => 'internal', 'sort_order' => 0],
            ['title' => 'About', 'url' => '/about', 'type' => 'internal', 'sort_order' => 1],
            ['title' => 'Our Services', 'url' => '/services', 'type' => 'internal', 'sort_order' => 2],
            ['title' => 'Our Team', 'url' => '/team', 'type' => 'internal', 'sort_order' => 3],
            ['title' => 'News', 'url' => '/news', 'type' => 'internal', 'sort_order' => 4],
            ['title' => 'Careers', 'url' => '/careers', 'type' => 'internal', 'sort_order' => 5],
            ['title' => 'Contact', 'url' => '/contact', 'type' => 'internal', 'sort_order' => 6],
        ];
        foreach ($items as $it) {
            $main->allItems()->create($it);
        }
        $footer = NavigationMenu::firstOrCreate(['slug' => 'footer'], ['name' => 'Footer Navigation', 'location' => 'footer']);
        $footer->allItems()->delete();
        $footer->allItems()->create(['title' => 'Privacy Policy', 'url' => '/privacy', 'type' => 'internal', 'sort_order' => 0]);
        $footer->allItems()->create(['title' => 'Terms', 'url' => '/terms', 'type' => 'internal', 'sort_order' => 1]);

        // Leadership — Malawi-led, SADC team (idempotent: soft-deleted rows keep slugs)
        $leaders = [
            ['name' => 'Dr. Blessings Mwale', 'slug' => 'blessings-mwale', 'position' => 'Managing Director — Principal Geologist (Malawi)', 'category' => 'executive', 'bio' => '25 years SADC, ex-Paladin, JORC Competent Person for rutile/graphite/REE.', 'sort_order' => 0],
            ['name' => 'Sarah Bennett', 'slug' => 'sarah-bennett', 'position' => 'Chief Financial & ESG Officer', 'category' => 'executive', 'bio' => 'CA, ex-Anglo American, TCFD/GRI.', 'sort_order' => 1],
            ['name' => 'James Phiri', 'slug' => 'james-phiri', 'position' => 'Chairman', 'category' => 'board', 'bio' => 'Independent Chairman, SADC mining governance.', 'sort_order' => 0],
            ['name' => 'Grace Tembo', 'slug' => 'grace-tembo', 'position' => 'Head — Exploration (SADC)', 'category' => 'executive', 'bio' => 'Geochemist, DRC/Zambia copperbelt.', 'sort_order' => 2],
        ];
        foreach ($leaders as $l) {
            LeadershipProfile::withTrashed()->updateOrCreate(['slug' => $l['slug']], array_merge($l, ['deleted_at' => null]));
        }

        // Careers — Malawi + SADC (idempotent)
        $careers = [
            ['title' => 'Senior Mine Geologist — Lilongwe (Kasiya)', 'slug' => 'senior-mine-geologist-lilongwe', 'department' => 'Geology', 'location' => 'Lilongwe, Malawi', 'employment_type' => 'full_time', 'summary' => 'Lead grade control & JORC modelling for rutile sands.', 'description' => '10+ years mineral sands, Leapfrog/Micromine, QA/QC.', 'status' => 'open', 'deadline' => now()->addDays(30), 'published_at' => now(), 'is_active' => true],
            ['title' => 'ESG & Permitting Lead — SADC', 'slug' => 'esg-permitting-sadc', 'department' => 'Sustainability', 'location' => 'Blantyre, Malawi', 'employment_type' => 'full_time', 'summary' => 'Own ESIA, RAP and SADC stakeholder.', 'description' => 'GRI, IFC PS, Malawi Mines Act experience.', 'status' => 'open', 'deadline' => now()->addDays(21), 'published_at' => now(), 'is_active' => true],
            ['title' => 'Graduate Programme — Exploration (Malawi)', 'slug' => 'graduate-malawi-2026', 'department' => 'Exploration', 'location' => 'Lilongwe / Karonga', 'employment_type' => 'internship', 'summary' => '24-month rotation, SADC field camps.', 'description' => 'Open to Malawian graduates, 2:1 Geosciences.', 'status' => 'open', 'deadline' => now()->addDays(60), 'published_at' => now(), 'is_active' => true],
        ];
        foreach ($careers as $c) {
            Career::withTrashed()->updateOrCreate(['slug' => $c['slug']], array_merge($c, ['deleted_at' => null]));
        }

        // Procurement (idempotent)
        ProcurementNotice::withTrashed()->updateOrCreate(['slug' => 'drilling-sadc-2026'], ['title' => 'Supply of Diamond Drilling — SADC (2026-28)', 'reference_number' => 'MOB-PROC-2026-001', 'category' => 'tender', 'summary' => '15,000m HQ/NQ across Malawi/Zambia', 'description' => 'SADC-wide drilling, 2-year term.', 'status' => 'published', 'deadline' => now()->addDays(18), 'published_at' => now(), 'contact_email' => 'procurement@moblimited.com', 'deleted_at' => null]);

        // ESG — SADC focus (idempotent)
        $esg = [
            ['title' => 'Water & Land — Malawi Stewardship', 'slug' => 'water-stewardship', 'category' => 'environment', 'summary' => 'Hydro mining, closed circuit, 82% recycle — Lake Malawi basin.', 'content' => 'Zero discharge, real-time monitoring.', 'is_active' => true, 'status' => 'published', 'sort_order' => 0],
            ['title' => 'SADC Local Content', 'slug' => 'local-economic-participation', 'category' => 'community', 'summary' => 'SADC suppliers, Malawian enterprise development.', 'content' => 'Enterprise programme across 8 countries.', 'is_active' => true, 'status' => 'published', 'sort_order' => 1],
        ];
        foreach ($esg as $e) {
            EsgContent::withTrashed()->updateOrCreate(['slug' => $e['slug']], array_merge($e, ['deleted_at' => null]));
        }

        // FAQs (idempotent)
        Faq::firstOrCreate(['question' => 'Where is Mob headquartered?'], ['answer' => 'Head Office is Area 47 Sector 3, Lilongwe, Malawi. We serve the whole SADC region with hubs in Blantyre, Kolwezi (DRC), Solwezi (Zambia) and Johannesburg.', 'category' => 'general', 'is_active' => true]);
        Faq::firstOrCreate(['question' => 'Which codes do you sign?'], ['answer' => 'JORC, NI 43-101 and SAMREC — competent persons for SADC deposits.', 'category' => 'general', 'is_active' => true]);

        // Site Settings — Malawi SADC
        $settings = [
            'site.name' => ['group' => 'general', 'value' => 'Mob Limited', 'type' => 'text'],
            'site.tagline' => ['group' => 'general', 'value' => 'Integrated Mining & Mineral Solutions — Exploring Potential. Delivering Value.', 'type' => 'text'],
            'site.email' => ['group' => 'contact', 'value' => 'info@moblimited.com', 'type' => 'text'],
            'site.phone' => ['group' => 'contact', 'value' => '+265 881 525 611', 'type' => 'text'],
            'site.address' => ['group' => 'contact', 'value' => 'Area 47 Sector 3, Lilongwe, Malawi', 'type' => 'text'],
            'site.region' => ['group' => 'general', 'value' => 'SADC Region — Malawi, Zambia, DRC, Mozambique, Tanzania, South Africa, Zimbabwe, Botswana, Namibia', 'type' => 'text'],
            'social.linkedin' => ['group' => 'social', 'value' => 'https://linkedin.com/company/mob-limited', 'type' => 'text'],
            'seo.default_title' => ['group' => 'seo', 'value' => 'Mob Limited — Integrated Mining & Mineral Solutions | Malawi & SADC', 'type' => 'text'],
            'seo.default_description' => ['group' => 'seo', 'value' => 'Malawi-based, SADC-wide mining solutions. Geological services, exploration, surveying, geophysics, mining consultancy, environmental compliance and project delivery.', 'type' => 'text'],
        ];
        foreach ($settings as $k => $v) {
            SiteSetting::updateOrCreate(['key' => $k], ['value' => $v['value'], 'group' => $v['group'], 'type' => $v['type'], 'is_public' => true]);
        }
    }
}
