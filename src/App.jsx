import LoaderPage from "./components/LoaderPage";
import LoginPage from "./components/LoginPage";
import CourseSelection from "./components/CourseSelection";
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Topics from "./components/Topics";
import Quiz from "./components/Quiz";

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={ loading ? <LoaderPage /> : <SignUp />   } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/courseSelection" element={ <CourseSelection /> } />
        <Route path="/courseSelection/biochemistry" element={ <Topics /> } />
        <Route path="/courseSelection/biochemistry/:course" element={ <Quiz /> } />
      </Routes>
    </>
  )
}

export default App
