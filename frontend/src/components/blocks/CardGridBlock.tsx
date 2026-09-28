export function CardGridBlock({ data }: { data: { title?: string; cards?: { title: string; text: string }[] } }) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      {data.title && <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">{data.title}</h2>}
      <div className="grid md:grid-cols-3 gap-6">
        {(data.cards || [{title:"Safety",text:"Zero harm, TRIFR 1.2"},{title:"Environment",text:"82% water recycled"},{title:"Community",text:"US$18M invested 2025"}]).map((c,i)=><div key={i} className="border border-slate-200 p-6 bg-white"><h4 className="font-semibold text-slate-900">{c.title}</h4><p className="mt-2 text-sm text-slate-600 leading-6">{c.text}</p></div>)}
      </div>
    </section>
  );
}
