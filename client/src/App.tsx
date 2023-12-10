import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useCallback } from "react";

import LandingPage from "./landingPage/pages/LandingPage";
import MainContent from "./classes/pages/MainContent";
import Assignments from "./classes/pages/Assignments";
import Auth from "./landingPage/pages/Auth";
import { AuthContext } from "./shared/context/auth-context.tsx";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const login = useCallback((uid: string) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    // setUserId(null);
  }, []);

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Routes>
          {/* Routes for when the user is logged in */}
          {isLoggedIn && (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:uid/classes" element={<MainContent />} />
              <Route path="/:cid/assignments" element={<Assignments />} />
              <Route path="*" element={<Navigate to="/:uid/classes" />} />
            </>
          )}

          {/* Routes for when the user is not logged in */}
          {!isLoggedIn && (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
