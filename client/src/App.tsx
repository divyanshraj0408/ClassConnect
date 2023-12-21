import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useCallback, useContext } from "react";

import LandingPage from "./landingPage/pages/LandingPage";
import MainContent from "./classes/pages/MainContent";
import Assignments from "./classes/pages/Assignments";
import Auth from "./landingPage/pages/Auth";
import { AuthContext } from "./shared/context/auth-context.tsx";
import "./App.css";

function App() {
  const auth = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const login = useCallback((uid: string, token: any) => {
    setToken(token);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Routes>
          {/* Routes for when the user is logged in */}
          {token && (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:uid/classes" element={<MainContent />} />
              <Route path="/:cid/assignments" element={<Assignments />} />
              <Route
                path="*"
                element={<Navigate to={`/${auth.userId}/classes`} />}
              />
            </>
          )}

          {/* Routes for when the user is not logged in */}
          {!token && (
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
