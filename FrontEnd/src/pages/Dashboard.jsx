import { useState } from "react";
import { Link } from "react-router-dom";
import AdminShell from "../components/AdminShell";

const statCards = [
  {
    label: "Books in inventory",
    value: "248",
    note: "18 titles recently updated",
    accent: "from-[#7d5943] to-[#5c3e2f]",
  },
  {
    label: "Active receivers",
    value: "91",
    note: "12 new registrations this month",
    accent: "from-[#a06c4d] to-[#7c5238]",
  },
  {
    label: "Classes with course maps",
    value: "26",
    note: "Across 7 schools",
    accent: "from-[#6b7b55] to-[#52613e]",
  },
  {
    label: "Books currently lent",
    value: "73",
    note: "9 due back this week",
    accent: "from-[#8a4f43] to-[#69352b]",
  },
];

const focusPanels = {
  overview: {
    title: "System health",
    points: [
      "Inventory records are stable, with most updates concentrated in science and language subjects.",
      "Receiver registrations are growing steadily, especially in middle school classes.",
      "Course records still need mapping for a few senior classes before lending season peaks.",
    ],
  },
  action: {
    title: "Needs action",
    points: [
      "Physics and Urdu sets have the highest lending pressure right now.",
      "Three schools still need class-wise course records completed.",
      "Several lent books are nearing due date and should be reviewed soon.",
    ],
  },
  today: {
    title: "Today's pulse",
    points: [
      "4 new books were added to the register.",
      "2 receiver records were updated with extra book requests.",
      "6 lent-book records were checked and aligned with due dates.",
    ],
  },
};

const quickLinks = [
  { label: "Add book", to: "/Inventory", tone: "bg-[#6f4e37] text-white" },
  { label: "Register receiver", to: "/Receivers", tone: "bg-[#f3e1d1] text-[#5d4334]" },
  { label: "Map class courses", to: "/CourseRecords", tone: "bg-[#e6efe0] text-[#445338]" },
  { label: "Record lending", to: "/LentBooks", tone: "bg-[#f7ddd6] text-[#7f3f34]" },
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

function Dashboard() {
  const [activePanel, setActivePanel] = useState("overview");

  return (
    <AdminShell title="Dashboard">
      <div className="bg-[#f6eee6] px-5 py-5 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article
              key={card.label}
              className={`overflow-hidden rounded-none bg-gradient-to-br ${card.accent} p-[1px] shadow-sm`}
            >
              <div className="h-full bg-[#f9f1e8] px-5 py-5">
                <p className="text-sm text-[#7b5d49]">{card.label}</p>
                <p className="mt-3 font-serif text-4xl text-[#2f231d]">{card.value}</p>
                <p className="mt-2 text-sm text-[#6b5142]">{card.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-6 bg-[#fdf7f0] px-5 py-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-6">
        <div className="space-y-6">
          <section className="border border-[#d8c4b4] bg-[#fff8f1]">
            <div className="flex flex-wrap gap-3 border-b border-[#e2d2c5] bg-[#ecdacc] px-4 py-4">
              <button
                type="button"
                onClick={() => setActivePanel("overview")}
                className={`px-4 py-2 text-sm transition ${
                  activePanel === "overview"
                    ? "bg-[#6f4e37] text-white"
                    : "bg-[#f8ede2] text-[#5d4334]"
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("action")}
                className={`px-4 py-2 text-sm transition ${
                  activePanel === "action"
                    ? "bg-[#8a4f43] text-white"
                    : "bg-[#f8ede2] text-[#5d4334]"
                }`}
              >
                Needs Action
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("today")}
                className={`px-4 py-2 text-sm transition ${
                  activePanel === "today"
                    ? "bg-[#6b7b55] text-white"
                    : "bg-[#f8ede2] text-[#5d4334]"
                }`}
              >
                Today
              </button>
              <p>This tab is only temporary actual functionality will be implemented later.</p>
            </div>

            <div className="px-5 py-5">
              <h2 className="font-serif text-2xl text-[#31231b]">
                {focusPanels[activePanel].title}
              </h2>
              <div className="mt-4 space-y-3">
                {focusPanels[activePanel].points.map((point) => (
                  <div
                    key={point}
                    className="border border-[#eadcd0] bg-[#fbf3ea] px-4 py-4 text-sm leading-6 text-[#5f4537]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border border-[#d8c4b4] bg-[#fff8f1]">
            <div className="border-b border-[#e2d2c5] bg-[#ecdacc] px-5 py-4">
              <h2 className="font-serif text-2xl text-[#31231b]">Quick actions</h2>
            </div>
            <div className="grid gap-3 px-5 py-5 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`border border-[#ccb6a3] px-4 py-4 text-sm transition hover:opacity-90 ${link.tone}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="border border-[#d8c4b4] bg-[#fff8f1]">
            <div className="border-b border-[#e2d2c5] bg-[#ecdacc] px-5 py-4">
              <h2 className="font-serif text-2xl text-[#31231b]">Due soon</h2>
            </div>
            <div className="space-y-3 px-5 py-5">
              {dueSoon.map((item) => (
                <div
                  key={`${item.book}-${item.receiver}`}
                  className="border border-[#eadcd0] bg-[#fbf3ea] px-4 py-4"
                >
                  <p className="font-medium text-[#35251d]">{item.book}</p>
                  <p className="mt-1 text-sm text-[#6a5041]">{item.receiver}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8a5f4e]">
                    Due in {item.due}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-[#d8c4b4] bg-[#fff8f1]">
            <div className="border-b border-[#e2d2c5] bg-[#ecdacc] px-5 py-4">
              <h2 className="font-serif text-2xl text-[#31231b]">Low stock watch</h2>
            </div>
            <div className="space-y-4 px-5 py-5">
              {lowStock.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-[#35251d]">{item.title}</p>
                    <p className="text-sm text-[#7b5d49]">{item.remaining} left</p>
                  </div>
                  <div className="mt-2 h-2 bg-[#e8dbcf]">
                    <div
                      className="h-full bg-[#8a4f43]"
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
