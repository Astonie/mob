export function RichTextBlock({ data }: { data: { content: string } }) {
  return (
    <section className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
      <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-p:leading-7 prose-a:text-amber-700" dangerouslySetInnerHTML={{ __html: data.content }} />
    </section>
  );
}
