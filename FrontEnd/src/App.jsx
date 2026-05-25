import bookBankImage from './assets/image.png'

function App() {
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
            Tolobat Ul Kuliyat Ul Mominoon
          </h1>

          <p className="mt-3 text-lg tracking-wide text-[#f3e5d0]">
            Book Bank Management
          </p>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-[#4b2e1e] mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Login to access your account
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#5c4033] mb-2">
                ITS Number
              </label>

              <input
                type="text"
                placeholder="Enter your ITS"
                className="w-full px-4 py-3 rounded-lg border border-[#d6c2b0] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5c4033] mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-[#d6c2b0] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
            </div>

            <button className="w-full bg-[#6f4e37] hover:bg-[#5c4033] text-white py-3 rounded-lg font-medium transition duration-200">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App