import {
FaHome,
FaUsers,
FaBuilding,
FaClipboardCheck,
FaTools,
FaCog,
} from "react-icons/fa";

import {
Link,
useLocation,
} from "react-router-dom";

export default function Sidebar() {

const user = JSON.parse(
localStorage.getItem("user")
);

const role =
user?.role;

const location =
useLocation();

return (

<div
  className="
  relative

  w-[260px]
  h-screen

  bg-white/10
  backdrop-blur-xl

  border-r
  border-white/10

  p-6
  "
>

  <h1
    className="
    text-3xl
    font-bold

    text-cyan-400

    mb-10
    "
  >
    SnagPro
  </h1>

  <nav
    className="
    flex
    flex-col
    gap-3
    "
  >

    {/* COMPANY ADMIN */}

    {role ===
      "COMPANY_ADMIN" && (

      <>

        <Link to="/dashboard">
          <MenuItem
            icon={<FaHome />}
            text="Dashboard"
            active={
              location.pathname ===
              "/dashboard"
            }
          />
        </Link>

        <Link to="/staff">
          <MenuItem
            icon={<FaUsers />}
            text="Staff"
            active={
              location.pathname ===
              "/staff"
            }
          />
        </Link>

        <Link to="/projects">
          <MenuItem
            icon={<FaBuilding />}
            text="Projects"
            active={
              location.pathname ===
              "/projects"
            }
          />
        </Link>

        <Link to="/inspections">
          <MenuItem
            icon={<FaClipboardCheck />}
            text="Inspections"
            active={
              location.pathname ===
              "/inspections"
            }
          />
        </Link>

        <Link to="/snags">
          <MenuItem
            icon={<FaTools />}
            text="Snags"
            active={
              location.pathname ===
              "/snags"
            }
          />
        </Link>


        <Link to="/settings">
          <MenuItem
            icon={<FaCog />}
            text="Settings"
            active={
              location.pathname ===
              "/settings"
            }
          />
        </Link>

      </>

    )}

    {/* SITE ENGINEER */}

    {role ===
      "SITE_ENGINEER" && (

      <>

        <Link to="/engineer-dashboard">
          <MenuItem
            icon={<FaHome />}
            text="Dashboard"
            active={
              location.pathname ===
              "/engineer-dashboard"
            }
          />
        </Link>

        <Link to="/inspections">
          <MenuItem
            icon={<FaClipboardCheck />}
            text="Inspections"
            active={
              location.pathname ===
              "/inspections"
            }
          />
        </Link>

        <Link to="/snags">
          <MenuItem
            icon={<FaTools />}
            text="Snags"
            active={
              location.pathname ===
              "/snags"
            }
          />
        </Link>

      </>

    )}

   

    

    {/* CLIENT */}

    {role === "CLIENT" && (

  <>

    <Link to="/client-dashboard">
      <MenuItem
        icon={<FaHome />}
        text="Dashboard"
        active={
          location.pathname ===
          "/client-dashboard"
        }
      />
    </Link>

    <Link to="/current-projects">
      <MenuItem
        icon={<FaBuilding />}
        text="Current Projects"
        active={
          location.pathname ===
          "/current-projects"
        }
      />
    </Link>

    <Link to="/previous-projects">
      <MenuItem
        icon={<FaClipboardCheck />}
        text="Previous Projects"
        active={
          location.pathname ===
          "/previous-projects"
        }
      />
    </Link>

  </>

)}

    {role ===
  "CONTRACTOR" && (

  <>

    <Link to="/contractor-dashboard">
      <MenuItem
        icon={<FaHome />}
        text="Dashboard"
        active={
          location.pathname ===
          "/contractor-dashboard"
        }
      />
    </Link>

    <Link to="/assigned-snags">
      <MenuItem
        icon={<FaTools />}
        text="Assigned Snags"
        active={
          location.pathname ===
          "/assigned-snags"
        }
      />
    </Link>

  </>

)}



  </nav>

  <div
    className="
    absolute
    bottom-6

    left-6
    right-6

    bg-white/5

    border
    border-white/10

    rounded-2xl

    p-4
    "
  >

    <p
      className="
      text-sm
      text-white/60
      "
    >
      Logged in as
    </p>

    <p
      className="
      font-semibold
      mt-1
      "
    >
      {user?.first_name ||
        user?.username}
    </p>

    <p
      className="
      text-xs
      text-cyan-300
      mt-1
      "
    >
      {role}
    </p>

  </div>

</div>

);

}

function MenuItem({
icon,
text,
active,
}) {

return (

<div
  className={`
  flex
  items-center
  gap-3

  p-4

  rounded-2xl

  transition-all
  duration-200

  ${
    active
      ? `
        bg-cyan-500/20
        border
        border-cyan-500/30
        text-cyan-300
      `
      : `
        hover:bg-white/10
      `
  }
  `}
>

  <span
    className="
    text-lg
    "
  >
    {icon}
  </span>

  <span>
    {text}
  </span>

</div>

);

}
