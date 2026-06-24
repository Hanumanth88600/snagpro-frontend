import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import CompanyAdminDashboard from "./pages/CompanyAdminDashboard";
import Staff from "./pages/Staff";
import Projects from "./pages/Projects";
import Inspections from "./pages/Inspections";
import Snags from "./pages/Snags";
import Settings from "./pages/Settings";


import SiteEngineerDashboard
  from "./pages/SiteEngineerDashboard";

import ContractorDashboard
  from "./pages/ContractorDashboard";

import ClientDashboard
  from "./pages/ClientDashboard";


import AssignedSnags
  from "./pages/AssignedSnags";

import CurrentProjects
  from "./pages/CurrentProjects";

import PreviousProjects
  from "./pages/PreviousProjects";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<CompanyAdminDashboard />}
        />

        <Route
          path="/staff"
          element={<Staff />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/inspections"
          element={<Inspections />}
        />

        <Route
          path="/snags"
          element={<Snags />}
        />

      

        <Route
          path="/engineer-dashboard"
          element={<SiteEngineerDashboard />}
        />

        <Route
          path="/contractor-dashboard"
          element={<ContractorDashboard />}
        />

        <Route
          path="/client-dashboard"
          element={<ClientDashboard />}
        />
        <Route
          path="/assigned-snags"
          element={<AssignedSnags />}
        />

        <Route
          path="/current-projects"
          element={<CurrentProjects />}
        />

        <Route
          path="/previous-projects"
          element={<PreviousProjects />}
        />

        <Route
  path="/settings"
  element={<Settings />}
/>
      </Routes>

    </BrowserRouter>

  );

}