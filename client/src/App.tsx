import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./landingPage/pages/LandingPage";
import LoginPage from "./landingPage/pages/LoginPage";
import MainContent from "./classes/pages/MainContent";
import SignupPage from "./landingPage/pages/SignupPage";
import Assignments from "./classes/pages/Assignments";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/classes" element={<MainContent />}></Route>
          <Route path="/:cid/assigments" element={<Assignments />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
