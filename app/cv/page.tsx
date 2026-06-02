import { ArrowDownToLine, GitBranch, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function CvPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">
              <GitBranch className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold tracking-tight text-sm">Luca Joos — CV</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-slate-500 hover:text-slate-950 transition"
            >
              ← Portfolio
            </a>
            <a
              href="/cv/Lebenslauf_Luca_Joos.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-800"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              PDF
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Curriculum Vitae</p>
            <h1 className="text-6xl font-semibold tracking-tight text-slate-950">Luca Joos</h1>
            <p className="mt-3 text-xl text-slate-500">Applied Data Scientist</p>
            <p className="mt-1 text-sm text-slate-400">geb. 04.06.1990</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 text-sm text-slate-600 md:text-right">
            <a href="mailto:luca.joos@protonmail.ch" className="flex items-center gap-2 hover:text-slate-950 md:flex-row-reverse">
              <Mail className="h-4 w-4 text-slate-400" />
              luca.joos-portfolio@pm.me
            </a>
            <a href="tel:+41795871232" className="flex items-center gap-2 hover:text-slate-950 md:flex-row-reverse">
              <Phone className="h-4 w-4 text-slate-400" />
              +41 79 587 12 32
            </a>
            <div className="flex items-center gap-2 md:flex-row-reverse">
              <MapPin className="h-4 w-4 text-slate-400" />
              In der Rüfe 1, 7304 Maienfeld
            </div>
            <div className="flex gap-3 mt-1 md:justify-end">
              <a href="https://github.com/jooluc" target="_blank" className="text-slate-400 hover:text-slate-950 transition">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/luca-joos-256b01183/" target="_blank" className="text-slate-400 hover:text-slate-950 transition">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Über meine Person */}
        <Section title="Über meine Person">
          <p className="text-slate-600 leading-8">
            Ich bin ein motivierter und engagierter Teamplayer, der durch Zuverlässigkeit und Präzision überzeugt. Darüber hinaus lerne ich gerne Neues und strebe kontinuierlich danach, mich in bereits Erlerntem weiterzuentwickeln. In meiner Freizeit verbringe ich am liebsten Zeit mit meiner Familie und finde in der Bewegung einen wertvollen Ausgleich. Daneben fasziniert mich die Welt der Technik, in der ich mich gerne mit aktuellen Entwicklungen auseinandersetze.
          </p>
        </Section>

        {/* Berufserfahrung */}
        <Section title="Berufserfahrung">
          <div className="space-y-8">
            <TimelineItem
              period="09/2024 — Aktuell"
              title="Sachbearbeiter Kriminalanalyse"
              org="Kantonspolizei Graubünden | 60% | Ziv. Angestellter | Chur"
              description="Operative und taktische Kriminalanalyse. Aufbereitung, Auswertung und Visualisierung von (Massen-)daten mit Excel, Python und PowerBI zur Unterstützung der Fallbearbeitung für interne polizeiliche Dienststellen. Erkennung von komplexen Mustern und Fallzusammenhängen sowie Erstellung von datengestützten Tathypothesen. Verantwortlich für die Erstellung polizeilicher Lagereports und Ansprechsperson im Bereich OSINT / OSINF."
            />
            <TimelineItem
              period="06/2022 — 09/2024"
              title="Sachbearbeiter Cybercrime-Ermittlung"
              org="Kantonspolizei Graubünden | 80–100% | Ziv. Angestellter | Chur"
              description="Eigenständige Durchführung von Ermittlungen bei Straftaten im digitalen Raum. Datenaufbereitung und Auswertung von Massendaten mit Excel, Python und SQL. Mitverantwortlich im Bereich Krypto-Tracing. Zusätzliche interne und externe Instruktorentätigkeiten im Bereich Cybersicherheit und Cybercrime für die Kantonspolizei GR sowie die Polizeischule Amriswil."
            />
            <TimelineItem
              period="08/2016 — 06/2022"
              title="Betriebsleiter Kletterzentrum"
              org="Kletterzentrum Ap 'n Daun | 60–80% | Chur"
              description="Betriebsleiter im grössten Kletterzentrum der Ostschweiz. Verantwortlich für die Bereiche Personalwesen, Finanzen, Controlling, Marketing- und Strategieentwicklung, IT, Eventplanung und -durchführung sowie Leitung des Tagesgeschäfts. Zusätzliche Tätigkeit als Kletterinstruktor für Privatpersonen, Gruppen und Firmen."
            />
          </div>
        </Section>

        {/* Schulische Ausbildung */}
        <Section title="Schulische Ausbildung">
          <div className="space-y-8">
            <TimelineItem
              period="09/2020 — 02/2023"
              title="Masterstudium — Information & Data Science"
              org="Hochschule Luzern (HSLU), Teilzeit"
              description="Interdisziplinäres, englischsprachiges Masterstudium (120 ECTS). Schwerpunkte: Python, SQL, R, statistische Analyse- und Vorhersagemodelle sowie Machine-Learning-Modelle. Masterarbeit: 'Predicting burglary rates based on historical data'."
            />
            <TimelineItem
              period="09/2016 — 09/2020"
              title="Bachelorstudium — Information Science"
              org="Fachhochschule Graubünden (FHGR), Teilzeit"
              description="Schwerpunkte: Web- und Usability-Engineering, Webprogrammierung, Digitalisierung, Information Retrieval sowie Daten- und Dokumentenmanagement. Bachelorarbeit: 'Digital Blackout – Der Tag, an dem Chur offline war: Kritikalitätsbewertung der IKT-Systeme des Kantonsspitals Graubünden infolge eines digitalen Blackouts'."
            />
            <TimelineItem
              period="08/2013 — 07/2015"
              title="Maturitätsschule"
              org="Interstaatliche Maturitätsschule für Erwachsene (ISME), Teilzeit"
              description="Teilzeit-Matura für Erwachsene. Schwerpunktfach: Pädagogik, Psychologie und Philosophie."
            />
            <TimelineItem
              period="09/2012 — 06/2013"
              title="Berufsmaturitätsschule"
              org="Bildungszentrum für Gesundheit & Soziales (BGS), Vollzeit"
              description="Fachrichtung Gesundheit und Soziales."
            />
            <TimelineItem
              period="08/2007 — 06/2011"
              title="Berufsschule"
              org="Gewerblich-Industrielle Berufsschule Ziegelbrücke"
            />
          </div>
        </Section>

        {/* Berufsausbildung */}
        <Section title="Berufsausbildung">
          <TimelineItem
            period="08/2007 — 08/2011"
            title="Berufslehre Automatiker EFZ"
            org="Felix Lauper AG | Domat/Ems"
            description="Vierjährige Berufslehre. Fertigung, Zusammenbau und Reparatur von automatisierten Verpackungsmaschinen. Herstellung elektrischer und mechanischer Komponenten. Verkabelung von Schalttableaus und Programmierung speicherprogrammierbarer Steuerungen (LOGO und SPS)."
          />
        </Section>

        {/* Kompetenzen */}
        <Section title="Kompetenzen">
          <div className="grid gap-6 md:grid-cols-2">
            <SkillItem
              name="Python"
              level={4}
              description="Robuste Datenpipelines, Datenaufbereitung, Transformation und Modellierung. Pandas, NumPy für grosse Datenmengen."
            />
            <SkillItem
              name="SQL"
              level={3}
              description="Komplexe Abfragen, Views und Aggregationen. Fokus auf konsistente, performante Datenbereitstellung."
            />
            <SkillItem name="R" level={3} description="Statistische Analyse und Vorhersagemodelle." />
            <SkillItem name="PowerBI" level={3} description="Visualisierung und Reporting für polizeiliche Dienststellen." />
            <SkillItem name="Excel" level={4} description="Fortgeschrittene Datenaufbereitung und Auswertung." />
            <SkillItem name="Git / GitHub" level={3} description="Versionskontrolle und kollaborative Entwicklung." />
          </div>
        </Section>

        {/* Weitere Erfahrungen */}
        <Section title="Weitere Erfahrungen">
          <TimelineItem
            period="07/2011 — 04/2012"
            title="Militärdienst — Unteroffizier"
            org="Führungsunterstützung Luftwaffe Schule 95, Dübendorf"
          />
        </Section>

        {/* Sprachen & Interessen */}
        <div className="grid gap-10 md:grid-cols-2 mt-12">
          <div>
            <h2 className="mb-6 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Sprachen</h2>
            <div className="space-y-3">
              {[
                { lang: "Deutsch", level: "Muttersprache", dots: 5 },
                { lang: "Englisch", level: "Fortgeschritten", dots: 4 },
                { lang: "Italienisch", level: "Grundkenntnisse", dots: 2 },
              ].map(({ lang, level, dots }) => (
                <div key={lang} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-950">{lang}</span>
                    <span className="ml-2 text-xs text-slate-400">{level}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`h-2 w-2 rounded-full ${i < dots ? "bg-slate-950" : "bg-slate-200"}`}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Interessen</h2>
            <div className="flex flex-wrap gap-2">
              {["Fotografie", "Skitouren", "Bouldern", "Klettern", "Technik", "Familie", "Berge", "Hund"].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Referenzen */}
        <Section title="Referenzen">
          <div className="grid gap-4 md:grid-cols-2">
            <ReferenceCard
              name="Rolf Caplazi"
              role="Chef Cyberermittlung"
              phone="+41 81 257 75 05"
              email="rolf.caplazi@kapo.gr.ch"
            />
            <ReferenceCard
              name="Paul Sennrich"
              role="GL & Inhaber Kletterzentrum"
              phone="+41 76 342 84 02"
              email="pablo@kletterzentrumchur.ch"
            />
          </div>
        </Section>

      </div>

      <footer className="border-t border-slate-200 px-6 py-8 mt-8">
        <div className="mx-auto max-w-4xl text-center text-xs text-slate-400">
          © 2026 Luca Joos — Vertraulich
        </div>
      </footer>
    </main>
  );
}

// ── Helper components ──────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400 whitespace-nowrap">{title}</h2>
        <div className="h-px flex-1 bg-slate-200"/>
      </div>
      {children}
    </section>
  );
}

function TimelineItem({
  period, title, org, description,
}: {
  period: string; title: string; org: string; description?: string;
}) {
  return (
    <div className="grid gap-1 md:grid-cols-[180px_1fr]">
      <p className="text-xs text-slate-400 pt-0.5 font-mono">{period}</p>
      <div>
        <h3 className="font-semibold tracking-tight text-slate-950">{title}</h3>
        <p className="text-sm text-slate-500 mt-0.5">{org}</p>
        {description && <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>}
      </div>
    </div>
  );
}

function SkillItem({ name, level, description }: { name: string; level: number; description: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-slate-950">{name}</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i < level ? "bg-slate-950" : "bg-slate-200"}`}/>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500 leading-5">{description}</p>
    </div>
  );
}

function ReferenceCard({ name, role, phone, email }: { name: string; role: string; phone: string; email: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="font-semibold text-slate-950">{name}</p>
      <p className="text-sm text-slate-500 mt-0.5">{role}</p>
      <div className="mt-3 space-y-1">
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-950 transition">
          <Phone className="h-3 w-3" />{phone}
        </a>
        <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-950 transition">
          <Mail className="h-3 w-3" />{email}
        </a>
      </div>
    </div>
  );
}