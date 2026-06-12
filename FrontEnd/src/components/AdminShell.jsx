import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/Dashboard", icon: "DB" },
  { label: "Inventory", path: "/Inventory", icon: "IN" },
  { label: "Receivers", path: "/Receivers", icon: "RC" },
  { label: "Course Records", path: "/CourseRecords", icon: "CR" },
  { label: "Lent Books", path: "/LentBooks", icon: "LB" },
];

const SIDEBAR_STORAGE_KEY = "book-bank-sidebar-open";

function AdminShell({ title, subtitle, headerAction, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return savedState === null ? true : savedState === "true";
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      isSidebarOpen ? "true" : "false"
    );
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition hover:bg-[var(--surface-muted)]"
              aria-label="Toggle navigation panel"
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>

            <div className="flex items-center gap-3">
              <img src="\src\assets\image copy.png" alt="Logo" className="h-10 w-30" />
              <div>
                <p className="text-xl font-semibold leading-none tracking-[0.01em] text-[var(--text)]">
                   Tolobat Ul Kulliyaat Ul Muminoon
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Book Bank
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((current) => !current)}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left transition hover:bg-[var(--surface-muted)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
                AM
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[var(--text)]">Admin Member</p>
                <p className="text-xs text-[var(--text-muted)]">Inventory Manager</p>
              </div>
              <span className="text-[var(--primary)]">▼</span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
                >
                  Settings
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-[var(--danger)] transition hover:bg-[var(--danger-soft)]"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1480px] items-start">
        <aside
          className={`sticky top-[74px] hidden h-[calc(100vh-74px)] shrink-0 overflow-y-auto border-r border-[var(--border)] bg-[var(--surface-strong)] transition-all duration-300 md:block ${
            isSidebarOpen ? "w-[210px]" : "w-[96px]"
          }`}
        >
          <nav className="flex min-h-full flex-col gap-2 px-3 py-6">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center rounded-2xl ${
                    isSidebarOpen ? "justify-start gap-3 px-4" : "justify-center px-0"
                  } py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "text-[var(--text-muted)] hover:bg-white hover:text-[var(--text)]"
                  }`
                }
                title={item.label}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold leading-none ${
                        isActive
                          ? "bg-white/18 text-white"
                          : "bg-[var(--primary-soft)] text-[var(--primary)]"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {isSidebarOpen && <span>{item.label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <section className="mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
            <div className="border-b border-[var(--border)] bg-gradient-to-br from-[#dccbbb] to-[white] px-5 py-4 lg:px-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold tracking-[0.01em] text-[var(--text)]">{title}</h1>
                  {subtitle ? (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{subtitle}</p>
                  ) : null}
                </div>
                {headerAction ? <div className="sm:shrink-0">{headerAction}</div> : null}
              </div>
            </div>
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminShell;
