import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { useState } from 'react';
import "./index.css";
// import Navbar from "./Components/Navbar";
import WelcomeScreen from "./Pages/WelcomeScreen";
import AnimatedBackground from "./Components/Background";
// import Home from "./Pages/Home";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
// import About from "./Pages/About";
// import NotFound from "./Pages/404Page";
// import Footer from "./Components/Footer";
import ProfileCard from "./Components/ProfileCard";




const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>

          <AnimatedBackground />
          <ProfileCard/>
          

          
          </>
      )}
    </>
  );
};

LandingPage.propTypes = {
  showWelcome: PropTypes.bool.isRequired,
  setShowWelcome: PropTypes.func.isRequired,
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;