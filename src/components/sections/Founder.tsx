const IMG_URL =
  "https://www.figma.com/api/mcp/asset/7599ffb2-d0f8-4dd7-a4d3-36ed2c69dda3";

export function Founder() {
  return (
    <section
      id="founder"
      className="w-full py-[var(--section-padding-y)] px-[var(--section-padding-x)] overflow-hidden"
    >
      <div className="container-narrow mx-auto max-w-6xl">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#d9d9d9] via-[var(--color-primary)] to-[#ffdda0] p-6 md:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Text block: first on mobile, left on desktop */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-[var(--color-slate-heading)] font-black text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight">
                Founder & Lead Cad Engineer
              </h2>
              <p className="mt-4 text-[var(--color-slate-heading)] font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
                Davit Sargsyan
              </p>
              <p className="mt-4 text-black/90 text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed font-light italic">
                With over 16 years of experience in jewelry craftsmanship,
                including professional goldsmithing and stone setting, the
                studio is built on practical manufacturing knowledge — not
                theory. Direct experience at the bench provides a deep
                understanding of structural behavior, stone security,
                tolerances and real-world production limitations.
                <br />
                <br />
                Every design decision is informed by how the piece will be cast,
                set, assembled and worn. Each project is personally reviewed,
                calibrated and validated before delivery. No model leaves the
                studio without structural verification. Jewelry is approached as
                a system — where design, engineering and craftsmanship must
                align with precision.
              </p>
              <div className="mt-8 flex flex-wrap gap-8 lg:gap-12">
                <div>
                  <p className="text-[var(--color-slate-heading)] font-black text-2xl lg:text-3xl">
                    16+
                  </p>
                  <p className="text-white text-sm font-bold uppercase tracking-wider">
                    Years Experience
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-slate-heading)] font-black text-2xl lg:text-3xl">
                    2.5k+
                  </p>
                  <p className="text-white text-sm font-bold uppercase tracking-wider">
                    Projects Delivered
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
              <div
                className="w-full max-w-md aspect-[4/5] rounded-xl overflow-hidden bg-[var(--color-slate-border)] bg-cover bg-center shadow-lg"
                style={{ backgroundImage: `url(${IMG_URL})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
