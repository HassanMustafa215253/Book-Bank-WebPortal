import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/Dashboard", icon: "⌂" },
  { label: "Inventory", path: "/Inventory", icon: "▤" },
  { label: "Receivers", path: "/Receivers", icon: "◔" },
  { label: "Course Records", path: "/CourseRecords", icon: "≣" },
  { label: "Lent Books", path: "/LentBooks", icon: "↗" },
];

const SIDEBAR_STORAGE_KEY = "book-bank-sidebar-open";

function AdminShell({ title, subtitle, children }) {
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
    <div className="min-h-screen bg-[#e7d9cb] text-[#2f231d]">
      <header className="sticky top-0 z-30 border-b border-[#cdb7a3] bg-[#f1e4d6]/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center border border-[#bca18c] bg-[#fff8f1] text-[#5d4334] transition hover:bg-[#eedccc]"
              aria-label="Toggle navigation panel"
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div>
                <p className="font-serif text-2xl leading-none text-[#3b2a22]">
                  Northgate Collegiate
                </p>
                <p className="mt-1 text-sm text-[#7a5b49]">
                  Library Services Portal
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((current) => !current)}
              className="flex items-center gap-3 border border-[#bca18c] bg-[#fff8f1] px-3 py-2 text-left transition hover:bg-[#f0dfcf]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6f4e37] text-sm font-semibold text-white">
                AM
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#3c2a21]">Admin Member</p>
                <p className="text-xs text-[#7f624e]">Inventory Manager</p>
              </div>
              <span className="text-[#6f4e37]">▼</span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden border border-[#cdb7a3] bg-[#fff8f1] shadow-lg">
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-[#4b3529] transition hover:bg-[#efdece]"
                >
                  Settings
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-[#8a3c2f] transition hover:bg-[#f5dcd3]"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px] items-start">
        <aside
          className={`sticky top-[89px] h-[calc(100vh-89px)] shrink-0 overflow-y-auto border-r border-[#ccb6a3] bg-[#ddcab7] transition-all duration-300 ${
            isSidebarOpen ? "w-[250px]" : "w-[88px]"
          }`}
        >
          <nav className="flex min-h-full flex-col gap-3 px-3 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    isSidebarOpen ? "justify-start gap-3 px-4" : "justify-center px-0"
                  } py-3 text-left text-sm transition ${
                    isActive
                      ? "border-[#6f4e37] bg-[#6f4e37] text-white shadow-sm"
                      : "border-[#ccb6a3] bg-[#f8efe6] text-[#5d4334] hover:bg-[#eedccc]"
                  }`
                }
                title={item.label}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-5 w-5 items-center justify-center text-base leading-none ${
                        isActive ? "text-white" : "text-[#6d4e3d]"
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

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <section className="mx-auto w-full max-w-[1100px] overflow-hidden border border-[#cab19d] bg-[#f9f1e8] shadow-[0_18px_50px_rgba(91,63,43,0.08)]">
            <div className="border-b border-[#dccabd] bg-[#ecdacc] px-5 py-5 lg:px-6">
              <h1 className="font-serif text-3xl text-[#31231b]">{title}</h1>
              {subtitle ? (
                <p className="mt-1 text-sm text-[#7b5d49]">{subtitle}</p>
              ) : null}
            </div>
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminShell;
