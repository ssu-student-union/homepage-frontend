interface FrontmatterProps {
  title: string;
  pairs: [string, string][];
}

export function Frontmatter({ title, pairs }: FrontmatterProps) {
  return (
    <section className="mb-16">
      <h1 className="mb-6 text-2xl font-semibold">{title}</h1>
      <dl className="grid grid-cols-[auto_minmax(0,_1fr)] gap-2">
        {pairs.map(([term, detail]) => (
          <>
            <dt className="font-bold">{term}</dt>
            <dd>{detail}</dd>
          </>
        ))}
      </dl>
    </section>
  );
}
