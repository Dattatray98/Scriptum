import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Scriptum from "./pages/Home";
import TranscriptPage from "./pages/TranscriptPage";
import ProtectedRouteLayout from "./components/Protected/ProtectedRouteLayout";
import Workspace from "./pages/Workspace";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/scriptum" element={<Scriptum />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route element={<ProtectedRouteLayout />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
