import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

import LandingPage from "./landingPage/pages/LandingPage";
import MainContent from "./classes/pages/MainContent";
import Assignments from "./classes/pages/Assignments";
import Auth from "./landingPage/pages/Auth";
import { AuthContext } from "./shared/context/auth-context.tsx";
import "./App.css";

let logoutTimer: any;
function App() {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState("");

  const login = useCallback((uid: string, token: any, expirationDate?: any) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(undefined);
    setUserId("");
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        (tokenExpirationDate as Date).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedDataString = localStorage.getItem("userData");
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

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
                element={<Navigate to={`/${userId}/classes`} />}
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
