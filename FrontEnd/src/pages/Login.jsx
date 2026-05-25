import bookBankImage from '../assets/image.png'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Login() {

  const navigate = useNavigate()

  // ✅ correct declaration
  const valid_entry = {
    "123456": ["pass", "Inventory"],
  }

  // ✅ state for inputs
  const [itsNumber, setItsNumber] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // check if ITS exists
    if (valid_entry[itsNumber]) {
      const [validPassword, route] = valid_entry[itsNumber]

      if (password === validPassword) {
        navigate(`/${route}`)
      } else {
        alert("Wrong password")
      }

    } else {
      alert("Invalid ITS number")
    }
  }

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">

        <div className="bg-[#6f4e37] text-white flex flex-col justify-center items-center p-10">
          <img
            src={bookBankImage}
            alt="Book Bank"
            className="w-40 mb-6"
          />

          <h1 className="text-3xl font-bold text-center leading-snug">
            Tolobat Ul Kulliyaat Ul Muminoon
          </h1>

          <p className="mt-3 text-lg tracking-wide text-[#f3e5d0]">
            Book Bank Management
          </p>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12">

          <div className="space-y-5">

            {/* ITS input */}
            <div>
              <label className="block text-sm font-medium text-[#5c4033] mb-2">
                ITS Number
              </label>

              <input
                type="text"
                placeholder="Enter your ITS"
                value={itsNumber}
                onChange={(e) => setItsNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#d6c2b0] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium text-[#5c4033] mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#d6c2b0] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
            </div>

            <button
              className="w-full bg-[#6f4e37] hover:bg-[#5c4033] text-white py-3 rounded-lg font-medium transition duration-200"
              onClick={handleLogin}
            >
              Login
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Login