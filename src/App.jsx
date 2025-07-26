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
import { initializeAuth } from "./api/authApi";
import { useQuery } from "@tanstack/react-query";
import VerifyEmail from "./pages/VerifyEmail";
import { useUserStore } from "./store/user-store";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Spinner from "./components/Spinner";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);
  const theme = useUserStore((state) => state.theme);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["initialAuth"],
    queryFn: initializeAuth,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme == "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      setIsLoggedIn(data.user.isAccountVerified);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [data, setUser, setIsLoggedIn]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/tasks", { replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="m-auto flex h-screen w-20 items-center justify-center text-2xl text-white">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    console.log(error?.response?.data?.message);
  }
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <NavBar />
      <main className="relative mx-auto mt-18 w-full max-w-[1440px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isLoading ? (
                <LoadingSpinner />
              ) : isLoggedIn ? (
                <Tasks />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/tasks"
            element={isLoggedIn ? <Tasks /> : <Navigate to="/login" replace />}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
