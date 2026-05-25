import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Inventory from "./pages/Inventory"
import Receivers from "./pages/Receivers"
import CourseRecords from "./pages/CourseRecords"
import LentBooks from "./pages/LentBooks"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/Receivers" element={<Receivers />} />
      <Route path="/CourseRecords" element={<CourseRecords />} />
      <Route path="/LentBooks" element={<LentBooks />} />
    </Routes>
  )
}

export default App
