interface Arrival {
  id: string;
  tent: string;
  guestName: string;
  status: string;
  logistics: string;
}

interface DiarySection {
  title: string;
  subtitle: string;
  arrivals: Arrival[];
}

const DIARY_SECTIONS: DiarySection[] = [
  {
    title: "Today",
    subtitle: "Saturday, 24 October",
    arrivals: [
      {
        id: "arr-1",
        tent: "Tent 01",
        guestName: "Lord & Lady Harrington",
        status: "Arriving Today at 14:30 EAT",
        logistics: "Private Cessna Caravan charter into Goshen Airstrip. Tracker Kimani assigned.",
      },
      {
        id: "arr-2",
        tent: "Tent 02",
        guestName: "Elena Rostova",
        status: "Arriving Today at 16:15 EAT",
        logistics: "Helicopter transfer direct to camp helipad. Wildlife photography mount requested.",
      },
    ],
  },
  {
    title: "Tomorrow",
    subtitle: "Sunday, 25 October",
    arrivals: [
      {
        id: "arr-3",
        tent: "The Pavilion",
        guestName: "Dr. Aris Thorne & Family",
        status: "Arriving Tomorrow at 11:00 EAT",
        logistics: "Private 4x4 cruiser transfer from Nanyuki. 4 guests, bush dinner at river deck.",
      },
    ],
  },
  {
    title: "Next Week",
    subtitle: "Late October Arrivals",
    arrivals: [
      {
        id: "arr-4",
        tent: "Tent 03",
        guestName: "Julian & Genevieve Cross",
        status: "Arriving Wednesday, Oct 28",
        logistics: "Scheduled flight into Goshen Airstrip. Night drive requested for arrival evening.",
      },
      {
        id: "arr-5",
        tent: "Tent 01 & 02",
        guestName: "The Vance Family",
        status: "Arriving Friday, Oct 30",
        logistics: "Helicopter charter from Nairobi. Return patrons, 4 guests.",
      },
    ],
  },
];

export default function DiaryPage() {
  return (
    <div className="space-y-16">
      {/* Editorial Header */}
      <div className="space-y-3 pb-8 border-b border-[#E8E3D9]">
        <div className="flex items-baseline justify-between">
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-[#2C2A25]">
            Diary
          </h1>
          <span className="text-xs uppercase tracking-[0.2em] text-[#591C27] font-semibold">
            Arrivals & Tents
          </span>
        </div>
        <p className="text-sm tracking-wide text-[#2C2A25]/60 max-w-xl font-light leading-relaxed">
          Who is arriving and which tent they are staying in.
        </p>
      </div>

      {/* Vertical Timeline Grouped by Today, Tomorrow, Next Week */}
      <div className="space-y-16">
        {DIARY_SECTIONS.map((section) => (
          <section key={section.title} className="space-y-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-[#E8E3D9]">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2A25] font-light">
                {section.title}
              </h2>
              <span className="text-xs uppercase tracking-widest text-[#2C2A25]/45 font-mono">
                {section.subtitle}
              </span>
            </div>

            {/* List of Arrivals */}
            <div className="space-y-6">
              {section.arrivals.map((arrival) => (
                <article
                  key={arrival.id}
                  className="p-8 sm:p-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E3D9] hover:border-[#591C27]/40 transition-colors shadow-sm space-y-4"
                >
                  {/* Tent Tag and Status */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#591C27] font-semibold">
                      {arrival.tent}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#2C2A25]/60 font-medium">
                      {arrival.status}
                    </span>
                  </div>

                  {/* Guest Name */}
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2A25] font-light">
                    {arrival.tent} &mdash; {arrival.guestName}
                  </h3>

                  {/* Logistics Note */}
                  <p className="pt-2 text-sm text-[#2C2A25]/75 leading-relaxed font-light border-t border-[#E8E3D9]/60">
                    <span className="font-medium text-[#2C2A25]">Logistics: </span>
                    {arrival.logistics}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
