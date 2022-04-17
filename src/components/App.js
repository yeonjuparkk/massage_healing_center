import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { Routes, Route, useNavigate } from "react-router-dom";
import Service from "./Home/Service";
import Reviews from "./Home/Reviews";
import Facial from "./Service/Facial";
import Massage from "./Service/Massage";
import AboutUs from "./AboutUs";
import Appointment from "./Service/Appointment";
import AdminLogin from "./Admin/AdminLogin";
import FAQ from "./Home/FAQ";
import Navigation from "./Navigation";
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { login } from "../axios-services";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    getAPIStatus();
  }, []);

  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleLogout = async() => {
    navigate("/");
    setToken("");
    localStorage.removeItem("token");
  }

  return (
    <div className="app-container">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Service />
              <FAQ />
              <Reviews />
            </>
          }
        />
        <Route
          path="/facials"
          element={
            <>
              <Appointment />
              <Facial />
            </>
          }
        />
        <Route
          path="/massage"
          element={
            <>
              <Massage />
              <Appointment />
            </>
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/hyelyon" element={<AdminLogin />} />
      </Routes>
    </div>
  );
};

export default App;
