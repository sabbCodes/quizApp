import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import LoaderPage from "./components/LoaderPage";
import LoginPage from "./components/LoginPage";
import CourseSelection from "./components/CourseSelection";
import SignUp from "./components/SignUp";
import Topics from "./components/Topics";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import ForgotPassword from "./components/ForgotPassword";
import NotFound from "./components/NotFound";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Routes>
      <Route path="/" element={loading ? <LoaderPage /> : <SignUp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/courseSelection" element={currentUser ? <CourseSelection /> : <LoginPage />} />
      <Route path="/courseSelection/:topic" element={currentUser ? <Topics /> : <LoginPage />} />
      <Route path="/courseSelection/:topic/quiz" element={currentUser ? <Quiz /> : <LoginPage />} />
      <Route path="/results" element={currentUser ? <Results /> : <LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
