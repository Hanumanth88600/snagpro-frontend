import { useState } from "react";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({
  children,
  showNavbar = true,
}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div
      className="
      h-screen
      overflow-hidden
      flex
      "
    >

      {/* Mobile Menu */}

      <button
        className="
        md:hidden
        fixed
        top-4
        left-4
        z-50
        bg-white/10
        backdrop-blur-xl
        p-3
        rounded-xl
        border
        border-white/10
        "
        onClick={() =>
          setOpen(!open)
        }
      >
        {
          open
            ? <FaTimes size={20} />
            : <FaBars size={20} />
        }
      </button>

      {/* Fixed Desktop Sidebar */}

      <div
        className="
        hidden
        md:block
        fixed
        left-0
        top-0
        h-screen
        w-[305px]
        z-40
        "
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}

      {open && (

        <div
          className="
          fixed
          inset-0
          z-50
          bg-black/50
          "
          onClick={() =>
            setOpen(false)
          }
        >

          <div
            className="
            w-[260px]
            h-full
            bg-slate-900
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <Sidebar />
          </div>

        </div>

      )}

      {/* Scrollable Content */}

      <main
        className="
        flex-1
        md:ml-[305px]
        h-screen
        overflow-y-auto
        p-6
        md:p-8
        "
      >

        {showNavbar && (
          <Navbar />
        )}

        {children}

      </main>

    </div>

  );

}