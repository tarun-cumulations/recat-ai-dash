import { RecoilRoot } from "recoil";
import { Dashboard } from "./pages/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Details } from "./pages/Details";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
