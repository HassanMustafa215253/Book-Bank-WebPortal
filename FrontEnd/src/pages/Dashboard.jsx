import { useState } from "react";
import { Link } from "react-router-dom";
import AdminShell from "../components/AdminShell";

const statCards = [
  {
    label: "Books in inventory",
    value: "248",
    note: "18 titles reviewed this month",
  },
  {
    label: "Active receivers",
    value: "91",
    note: "12 recently registered",
  },
  {
    label: "Classes mapped",
    value: "26",
    note: "Across 7 schools",
  },
  {
    label: "Books on loan",
    value: "73",
    note: "9 due this week",
  },
];

const focusPanels = {
  overview: {
    title: "Operational overview",
    points: [
      "Inventory updates remain concentrated in science and language collections.",
      "Receiver registrations are increasing steadily across middle school classes.",
      "A small number of senior classes still need complete course mapping.",
    ],
  },
  action: {
    title: "Priority actions",
    points: [
      "Physics and Urdu sets are showing the highest lending pressure this week.",
      "Three schools still require class-level course records before the next cycle.",
      "Several loan records are approaching due date and should be reviewed.",
    ],
  },
  today: {
    title: "Today's activity",
    points: [
      "4 new books were added to the central register.",
      "2 receiver records were updated with additional requests.",
      "6 loan records were checked and aligned with due dates.",
    ],
  },
};

const quickLinks = [
  { label: "Add book", to: "/Inventory" },
  { label: "Register receiver", to: "/Receivers" },
  { label: "Map class courses", to: "/CourseRecords" },
  { label: "Record lending", to: "/LentBooks" },
];

const dueSoon = [
  { book: "Foundations of Physics", receiver: "Ali Abbas", due: "2 days" },
  { book: "English Composition", receiver: "Fatema Noor", due: "4 days" },
  { book: "Biology Practical Notes", receiver: "Zahra Hasan", due: "6 days" },
];

const lowStock = [
  { title: "Advanced Chemistry", remaining: 2 },
  { title: "Urdu Grammar Companion", remaining: 3 },
  { title: "Computer Basics", remaining: 4 },
];

const panelTabs = [
  { key: "overview", label: "Overview" },
  { key: "action", label: "Needs Action" },
  { key: "today", label: "Today" },
];

function Dashboard() {
  const [activePanel, setActivePanel] = useState("overview");

  return (
    <AdminShell title="Dashboard" >
      <div className="bg-[var(--surface)] px-5 py-6 lg:px-7">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article
              key={card.label}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-5"
            >
              <p className="text-sm font-medium text-[var(--text-muted)]">{card.label}</p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--text)]">
                {card.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{card.note}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-6 bg-[var(--surface-muted)] px-5 py-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-7">
        <div className="space-y-6">
          <section className="rounded-3xl border border-[var(--border)] bg-white">
            <div className="border-b border-[var(--border)] px-5 py-5">
              <div className="flex flex-wrap gap-3">
                {panelTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActivePanel(tab.key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      activePanel === tab.key
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--surface-muted)] text-[var(--text-muted)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-5">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                {focusPanels[activePanel].title}
              </h2>
              <div className="mt-5 space-y-3">
                {focusPanels[activePanel].points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--text-muted)]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border)] bg-white">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                Quick actions
              </h2>
            </div>
            <div className="grid gap-3 px-5 py-5 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 text-sm font-medium text-[var(--text)] transition hover:border-[var(--border-strong)] hover:bg-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-[var(--border)] bg-white">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                Due soon
              </h2>
            </div>
            <div className="space-y-3 px-5 py-5">
              {dueSoon.map((item) => (
                <div
                  key={`${item.book}-${item.receiver}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4"
                >
                  <p className="font-semibold text-[var(--text)]">{item.book}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{item.receiver}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                    Due in {item.due}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border)] bg-white">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                Low stock watch
              </h2>
            </div>
            <div className="space-y-5 px-5 py-5">
              {lowStock.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-[var(--text)]">{item.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">{item.remaining} left</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--bg-accent)]">
                    <div
                      className="h-full rounded-full bg-[var(--primary)]"
                      style={{ width: `${Math.min(item.remaining * 20, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}

export default Dashboard;
