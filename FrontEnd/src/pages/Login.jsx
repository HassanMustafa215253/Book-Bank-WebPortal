import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const valid_entry = {
    "123456": ["pass", "Dashboard"],
  };

  const [itsNumber, setItsNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (valid_entry[itsNumber]) {
      const [validPassword, route] = valid_entry[itsNumber];

      if (password === validPassword) {
        navigate(`/${route}`);
      } else {
        alert("Wrong password");
      }
    } else {
      alert("Invalid ITS number");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="absolute left-[-120px] top-[-120px] h-[500px] w-[500px] rounded-full bg-[var(--primary)]/10 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[400px] w-[400px] rounded-full bg-[var(--primary-strong)]/10 blur-3xl" />

      <header className="relative z-10 flex items-center gap-4 px-6 pt-8 sm:px-10">
        <div>
          <h1 className="text-lg font-semibold tracking-[0.01em] text-[var(--text)]">
            Northgate Collegiate
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Book Bank Management System
          </p>
        </div>
      </header>

      <main className="relative z-10 mt-16 grid gap-12 px-6 pb-10 sm:px-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <section className="flex flex-col justify-center lg:col-span-7">
          <div className="inline-flex w-fit rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)] backdrop-blur">
            Internal Portal
          </div>

          <h2 className="mt-8 text-4xl font-semibold leading-tight tracking-[-0.02em] text-[var(--text)] sm:text-5xl">
            Access your
            <br />
            book records
            <br />
            instantly.
          </h2>

          <p className="mt-6 max-w-md text-base leading-8 text-[var(--text-muted)]">
            A simple internal system for managing book bank distribution,
            tracking, and inventory access for members.
          </p>

          <div className="mt-10 max-w-md border-l-2 border-[var(--primary)] pl-4 text-sm leading-7 text-[var(--text-muted)]">
            "Knowledge is not stored, it is accessed."
          </div>
        </section>

        <section className="lg:col-span-5">
          <div className="space-y-6 rounded-[30px] border border-[var(--border)] bg-[var(--surface)]/88 p-7 shadow-[var(--shadow-soft)] backdrop-blur sm:p-8 lg:sticky lg:top-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Sign In
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                Continue to the admin workspace
              </h3>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]">
                ITS Number
              </label>
              <input
                value={itsNumber}
                onChange={(e) => setItsNumber(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter ITS"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-2xl bg-[var(--primary)] py-3 font-medium text-white transition hover:bg-[var(--primary-strong)]"
            >
              Enter System
            </button>

            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Authorized access only
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
