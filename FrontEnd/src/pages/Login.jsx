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
    <div className="min-h-screen bg-[#f6efe7] relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-[#6f4e37]/10 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#8b5e3c]/10 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

      <header className="px-10 pt-8 flex items-center gap-4">
        <div>
          <h1 className="text-[#3b2a22] font-semibold text-lg">
            Northgate Collegiate
          </h1>
          <p className="text-sm text-[#6f4e37]">
            Book Bank Management System
          </p>
        </div>
      </header>

      <main className="px-10 mt-20 grid grid-cols-12 gap-10">

        <section className="col-span-7 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-[#3b2a22] leading-tight">
            Access your
            <br />
            book records
            <br />
            instantly.
          </h2>

          <p className="mt-6 text-[#6f4e37] max-w-md">
            A simple internal system for managing book bank distribution,
            tracking, and inventory access for members.
          </p>

          <div className="mt-10 text-sm text-[#7a5a45] border-l-2 border-[#6f4e37] pl-4">
            “Knowledge is not stored — it is accessed.”
          </div>
        </section>

        <section className="col-span-5 relative">

          <div className="sticky top-24 space-y-6">

            <div>
              <label className="text-sm text-[#5c4033]">
                ITS Number
              </label>
              <input
                value={itsNumber}
                onChange={(e) => setItsNumber(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-white/70 backdrop-blur-md border border-[#dcc7b5] focus:outline-none focus:border-[#6f4e37]"
                placeholder="Enter ITS"
              />
            </div>

            <div>
              <label className="text-sm text-[#5c4033]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-white/70 backdrop-blur-md border border-[#dcc7b5] focus:outline-none focus:border-[#6f4e37]"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-[#6f4e37] text-white hover:bg-[#563a2c] transition"
            >
              Enter System
            </button>

            <p className="text-xs text-[#7a5a45]">
              Authorized access only
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
