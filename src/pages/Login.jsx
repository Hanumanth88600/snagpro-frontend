import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBuilding,
  FaClipboardCheck,
  FaUsers,
  FaChartLine
} from "react-icons/fa";

import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";

import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

import api from "../api/axios";

export default function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      setError("");

      const res =
        await api.post(
          "/accounts/login/",
          {
            username,
            password
          }
        );

      localStorage.clear();

      localStorage.setItem(
        "token",
        res.data.access
      );

      localStorage.setItem(
        "refresh",
        res.data.refresh
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      const role =
        res.data.user.role;

      if (
        role ===
        "COMPANY_ADMIN"
      ) {

        window.location.href =
          "/dashboard";

      }

      else if (
        role ===
        "SITE_ENGINEER"
      ) {

        window.location.href =
          "/engineer-dashboard";

      }

      else if (
        role ===
        "CONTRACTOR"
      ) {

        window.location.href =
          "/contractor-dashboard";

      }

      else if (
        role ===
        "CLIENT"
      ) {

        window.location.href =
          "/client-dashboard";

      }

      else {

        window.location.href =
          "/";

      }

    }

    catch (err) {

      console.error(err);

      if (
        err.response?.data
          ?.non_field_errors
      ) {

        setError(
          err.response.data
            .non_field_errors[0]
        );

      }

      else {

        setError(
          "Invalid Username or Password"
        );

      }

    }

    finally {

      setLoading(false);

    }

  };

  const handleKeyDown =
    (e) => {

      if (
        e.key === "Enter"
      ) {

        handleLogin();

      }

    };

  return (

<>
  {/* LOGIN HERO SECTION */}

  <div
    className="
    min-h-screen
    relative
    flex
    items-center
    justify-center
    overflow-hidden
    "
  >

    {/* Background */}

    <div
      className="
      absolute
      inset-0
      bg-cover
      bg-center
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72')"
      }}
    />

    {/* Overlay */}

    <div
      className="
      absolute
      inset-0
      bg-gradient-to-br
      from-slate-950/90
      via-slate-900/80
      to-cyan-950/70
      "
    />

    {/* Content */}

    <div
      className="
      relative
      z-10
      max-w-7xl
      mx-auto
      px-6
      grid
      lg:grid-cols-2
      gap-12
      items-center
      "
    >

      {/* LEFT SIDE */}

      <div>

        <h1
          className="
          text-6xl
          font-extrabold
          text-white
          leading-tight
          "
        >
          SnagPro
        </h1>

        <h2
          className="
          text-3xl
          font-semibold
          text-cyan-400
          mt-4
          "
        >
          Construction Snagging &
          Inspection Platform
        </h2>

        <p
          className="
          text-white/70
          text-lg
          mt-6
          leading-8
          "
        >
          Manage projects,
          inspections,
          snag tracking,
          contractor assignments
          and client reporting
          from one centralized
          platform.
        </p>

        <div
          className="
          grid
          grid-cols-2
          gap-5
          mt-10
          "
        >

          <div
            className="
            bg-white/10
            rounded-2xl
            p-4
            "
          >
            <FaClipboardCheck
              className="
              text-cyan-400
              text-3xl
              mb-3
              "
            />

            <h3
              className="
              font-semibold
              text-white
              "
            >
              Inspections
            </h3>
          </div>

          <div
            className="
            bg-white/10
            rounded-2xl
            p-4
            "
          >
            <FaUsers
              className="
              text-cyan-400
              text-3xl
              mb-3
              "
            />

            <h3
              className="
              font-semibold
              text-white
              "
            >
              Contractors
            </h3>
          </div>

          <div
            className="
            bg-white/10
            rounded-2xl
            p-4
            "
          >
            <FaChartLine
              className="
              text-cyan-400
              text-3xl
              mb-3
              "
            />

            <h3
              className="
              font-semibold
              text-white
              "
            >
              Analytics
            </h3>
          </div>

          <div
            className="
            bg-white/10
            rounded-2xl
            p-4
            "
          >
            <FaBuilding
              className="
              text-cyan-400
              text-3xl
              mb-3
              "
            />

            <h3
              className="
              font-semibold
              text-white
              "
            >
              Projects
            </h3>
          </div>

        </div>

      </div>

      {/* LOGIN CARD */}

      <div
        className="
        w-full
        max-w-md
        mx-auto
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        shadow-2xl
        p-8
        "
      >

        <h2
          className="
          text-3xl
          font-bold
          text-white
          mb-2
          "
        >
          Welcome Back
        </h2>

        <p
          className="
          text-white/60
          mb-6
          "
        >
          Sign in to continue
        </p>

        {error && (

          <div
            className="
            mb-4
            p-3
            rounded-xl
            bg-red-500/20
            text-red-300
            "
          >
            {error}
          </div>

        )}

        <div
          className="
          flex
          items-center
          bg-white/10
          rounded-xl
          px-4
          py-3
          mb-4
          "
        >

          <FaUser
            className="
            text-cyan-400
            mr-3
            "
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="
            flex-1
            bg-transparent
            outline-none
            text-white
            placeholder-white/50
            "
          />

        </div>

        <div
          className="
          flex
          items-center
          bg-white/10
          rounded-xl
          px-4
          py-3
          mb-6
          "
        >

          <FaLock
            className="
            text-cyan-400
            mr-3
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="
            flex-1
            bg-transparent
            outline-none
            text-white
            placeholder-white/50
            "
          />

        </div>

        <button
          onClick={
            handleLogin
          }
          disabled={loading}
          className="
          w-full
          py-3
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-400
          transition
          font-semibold
          text-white
          cursor-pointer
          "
        >
          {
            loading
            ? "Signing In..."
            : "SIGN IN"
          }
        </button>

      </div>

    </div>

  </div>

  {/* EXTRA SECTIONS */}

  <AboutSection />

  <FeaturesSection />

  <HowItWorks />

  <ContactSection />

  <Footer />

</>

);

}