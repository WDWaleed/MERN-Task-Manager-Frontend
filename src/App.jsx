import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { BgContainer } from "./components/BgContainer";
import { TodoContainer } from "./components/TodoContainer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import config from "./config";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  // Authenticate the user on page loads
  useEffect(() => {
    const authenticateUser = async () => {
      const storedJwt = localStorage.getItem("jwt");
      if (storedJwt) {
        const parsedJwt = JSON.parse(storedJwt);
        const token = parsedJwt.token;
        setToken(token);

        try {
          const response = await axios.get(`${config.baseURL}/api/v1/tasks`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error(
            "Authentication failed:",
            error.response ? error.response.data : error.message,
          );
          setIsLoggedIn(false);
        }
      } else {
        console.log("No token found in local storage");
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    authenticateUser();
  }, []);

  if (isLoading) {
    return <div className="m-auto w-20 text-2xl text-white">Loading...</div>;
  }

  return (
    <Router>
      <main className="mx-auto w-full max-w-[1440px]">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <BgContainer />
                  <TodoContainer
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    token={token}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/register"
            element={
              <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
