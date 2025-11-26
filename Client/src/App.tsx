import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Scriptum from "./pages/Scriptum";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/scriptum" element={<Scriptum />} />
      </Routes>
    </Router>
  )
}

export default App
