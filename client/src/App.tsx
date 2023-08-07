import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./landingPage/pages/LandingPage";
import LoginPage from "./landingPage/pages/LoginPage";
import MainContent from "./classes/pages/MainContent";
import SignupPage from "./landingPage/pages/SignupPage";
import Class from "./classes/pages/Class";
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
          <Route path="/class" element={<Class />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
