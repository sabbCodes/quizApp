import LoaderPage from "./components/LoaderPage";
import LoginPage from "./components/LoginPage";
import CourseSelection from "./components/CourseSelection";
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Topics from "./components/Topics";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { UserProvider } from "./UserContext";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <UserProvider>
        <Routes>
          <Route path="/" element={loading ? <LoaderPage /> : <SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/courseSelection" element={<CourseSelection />} />
          <Route path="/courseSelection/:topic" element={<Topics />} />
          <Route path="/courseSelection/:topic/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
    </UserProvider>
  )
}

export default App;
