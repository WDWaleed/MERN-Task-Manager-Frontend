import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth-store";
import { initializeAuth } from "./api/auth";
import { useQuery } from "@tanstack/react-query";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["initialAuth"],
    queryFn: initializeAuth,
    retry: false,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      setIsLoggedIn(data.user.isAccountVerified);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [data, setUser, setIsLoggedIn]);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      isLoggedIn &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate("/tasks", { replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="m-auto flex h-screen w-20 items-center justify-center text-2xl text-white">
        Loading...
      </div>
    );
  }
  if (isError) {
    console.log(error?.response?.data?.msg);
  }
  return (
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
  );
}

export default App;
