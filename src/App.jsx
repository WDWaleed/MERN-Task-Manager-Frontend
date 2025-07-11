import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth-store";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoading = useAuthStore((state) => state.isLoading);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Authenticate the user on page loads
  useEffect(() => {
    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="m-auto flex h-screen w-20 items-center justify-center text-2xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <main className="relative mx-auto mt-18 w-full max-w-[1440px]">
        <Toaster position="top-right" reverseOrder={false} />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={isLoggedIn ? <Tasks /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
