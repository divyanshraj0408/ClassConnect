import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./landingPage/pages/LandingPage";
import MainContent from "./classes/pages/MainContent";
import SignupPage from "./landingPage/pages/SignupPage";
import Assignments from "./classes/pages/Assignments";
import Auth from "./landingPage/pages/Auth";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/:uid/classes" element={<MainContent />}></Route>
          <Route path="/:cid/assigments" element={<Assignments />}></Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
