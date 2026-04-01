import { faqs } from "@/lib/pricing";

export function FAQ() {
  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <h2
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          Frequently asked questions
        </h2>

        <div className="mx-auto mt-10 max-w-2xl divide-y" style={{ borderColor: "var(--border)" }}>
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group py-4"
              style={{ borderColor: "var(--border)" }}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                {faq.question}
                <svg
                  className="ml-2 h-4 w-4 shrink-0 transition-transform group-open:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
