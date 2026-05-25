import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Inventory from "./pages/Inventory"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Inventory" element={<Inventory />} />
    </Routes>
  )
}

export default App