import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Scriptum from "./pages/Home";
import TranscriptPage from "./pages/TranscriptPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/scriptum" element={<Scriptum />} />
        <Route path="/transcript" element={<TranscriptPage />} />
      </Routes>
    </Router>
  )
}

export default App
