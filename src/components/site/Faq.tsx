import { FAQS } from "@/data/faq";
import { CONTACT_EMAIL } from "@/lib/links";

const NB = " ";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="section" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="kicker">FAQ</div>
          <h2 className="h2">Vos questions, nos réponses.</h2>
          <p className="p">
            Il en manque une{NB}?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-4 hover:text-ink transition-colors">
              Écrivez-nous
            </a>
            , on répond sous 24{NB}h.
          </p>
        </div>
        <div className="lg:col-start-6 lg:col-span-7 flex flex-col">
          {FAQS.map((f, i) => (
            <div key={f.question} className="grid grid-cols-[40px_1fr] gap-4 py-7 border-t border-rule last:border-b">
              <span className="num pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-2.5">
                <h3 className="serif text-[22px] md:text-[24px] leading-[1.2] m-0">{f.question}</h3>
                <p className="p text-[15px]">{f.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
