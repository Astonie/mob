import { HeroBlock } from "./HeroBlock";
import { RichTextBlock } from "./RichTextBlock";
import { StatsBlock } from "./StatsBlock";
import { CtaBlock } from "./CtaBlock";
import { CardGridBlock } from "./CardGridBlock";
import type { Block } from "@/lib/api";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="flex flex-col">
      {blocks
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((block) => {
          switch (block.type) {
            case "hero":
              return <HeroBlock key={block.id} data={block.data as never} />;
            case "rich_text":
              return <RichTextBlock key={block.id} data={block.data as never} />;
            case "stats":
              return <StatsBlock key={block.id} data={block.data as never} />;
            case "cta":
              return <CtaBlock key={block.id} data={block.data as never} />;
            case "card_grid":
              return <CardGridBlock key={block.id} data={block.data as never} />;
            case "project_grid":
            case "mineral_grid":
            case "news_grid":
              return (
                <div key={block.id} className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                  <div className="rounded-sm border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                    Dynamic grid block <code className="font-mono">{block.type}</code> — rendered via frontend data (ISR from API).
                  </div>
                </div>
              );
            case "gallery":
            case "image":
            case "video":
              return (
                <div key={block.id} className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                  <div className="aspect-[16/9] bg-slate-100 border border-slate-200 flex items-center justify-center text-sm text-slate-500">
                    Media block: {block.type}
                  </div>
                </div>
              );
            default:
              return (
                <div key={block.id} className="mx-auto max-w-7xl px-6 py-4 text-xs text-slate-400">
                  Unsupported block: {block.type}
                </div>
              );
          }
        })}
    </div>
  );
}
