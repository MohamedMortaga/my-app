export default function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="sectiontitle mb-15">
      <h2 className="relative ps-5 mb-5 font-semibold text-red-500 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-6 before:bg-red-500">
        {title}
      </h2>
      <span className="text-4xl font-semibold">
        {sub}
      </span>
    </div>
  );
}
