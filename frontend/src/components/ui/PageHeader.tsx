import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  image?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbs, image, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#0F4A6B]">
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt="" fill className="object-cover opacity-20" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4A6B] to-[#0F4A6B]/70" />
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-2 text-[12px] text-white/60">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/30">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="mt-3 text-white/80 max-w-3xl leading-7">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
