export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">About</h1>
        <p className="text-foreground mb-8">
          We help families quickly compare hospice providers using official Medicare data—clear, transparent, and easy to use.
        </p>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Contact</h2>
        <div className="space-y-6">
          <div className="rounded-lg border border-foreground-alt p-4">
            <h3 className="text-lg font-semibold text-foreground">Devin Schutz</h3>
            <p className="text-foreground-alt">
              Phone: <a href="tel:17073929455" className="underline">707-392-9455</a>
            </p>
            <p className="text-foreground-alt">
              Email: <a href="mailto:schutzdevin@gmail.com" className="underline">schutzdevin@gmail.com</a>
            </p>
          </div>
          <div className="rounded-lg border border-foreground-alt p-4">
            <h3 className="text-lg font-semibold text-foreground">Zane Bennion</h3>
            <p className="text-foreground-alt">Phone: Example num</p>
            <p className="text-foreground-alt">Email: Example email</p>
          </div>
        </div>
      </section>
    </div>
  );
}
