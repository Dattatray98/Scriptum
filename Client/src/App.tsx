import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Scriptum from "./pages/Home";
import TranscriptPage from "./pages/TranscriptPage";
import Workspace from "./pages/Workspace";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scriptum" element={<Scriptum />} />
          <Route path="/transcript" element={<TranscriptPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/workspace" element={<Workspace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
