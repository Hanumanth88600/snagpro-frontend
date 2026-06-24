import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";

import {
getClientProjectDetails
} from "../api/projectApi";

import Plot from "react-plotly.js";
import jsPDF from "jspdf";

export default function PreviousProjects() {

const [projects, setProjects] =
useState([]);

useEffect(() => {

loadData();

}, []);

const loadData = async () => {

try {

  const data =
    await getClientProjectDetails();

  setProjects(

    data.filter(
      project =>
        project.status ===
        "COMPLETED"
    )

  );

} catch (err) {

  console.log(err);

}

};

const completedProjects =
projects.length;

const completedInspections =
projects.reduce(

  (
    total,
    project
  ) =>

    total +
    project.inspection_count,

  0

);

const completedSnags =
projects.reduce(

  (
    total,
    project
  ) =>

    total +
    project.snag_count,

  0

);

const downloadPDF =
() => {

  const doc =
    new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "SnagPro Project History Report",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Completed Projects: ${completedProjects}`,
    20,
    40
  );

  doc.text(
    `Completed Inspections: ${completedInspections}`,
    20,
    55
  );

  doc.text(
    `Completed Snags: ${completedSnags}`,
    20,
    70
  );

  doc.save(
    "ProjectHistory.pdf"
  );

};

return (

<MainLayout
  showNavbar={false}
>

  <div
    className="
    flex
    justify-between
    items-center
    mb-8
    "
  >

    <h1
      className="
      text-4xl
      font-bold
      "
    >
      Previous Projects
    </h1>

    <button
      onClick={
        downloadPDF
      }
      className="
      bg-cyan-500
      hover:bg-cyan-600
      px-5
      py-3
      rounded-xl
      "
    >
      Download Report
    </button>

  </div>

  <div
    className="
    grid
    md:grid-cols-3
    gap-6
    mb-8
    "
  >

    <Card
      title="Completed Projects"
      value={
        completedProjects
      }
    />

    <Card
      title="Completed Inspections"
      value={
        completedInspections
      }
    />

    <Card
      title="Completed Snags"
      value={
        completedSnags
      }
    />

  </div>

  <div
    className="
    bg-white/10
    rounded-3xl
    p-6
    mb-8
    "
  >

    <h2
      className="
      text-2xl
      font-bold
      mb-4
      "
    >
      Completion Graph
    </h2>

    <Plot
      data={[
        {
          labels: [
            "Projects",
            "Inspections",
            "Snags"
          ],

          values: [
            completedProjects,
            completedInspections,
            completedSnags
          ],

          type: "pie",

          hole: 0.5
        }
      ]}
      layout={{
        paper_bgcolor:
          "rgba(0,0,0,0)",

        plot_bgcolor:
          "rgba(0,0,0,0)",

        font: {
          color: "white"
        }
      }}
      style={{
        width: "100%",
        height: "400px"
      }}
      config={{
        displayModeBar: false
      }}
    />

  </div>

  <div
    className="
    bg-white/10
    rounded-3xl
    p-6
    mb-8
    "
  >

    <h2
      className="
      text-2xl
      font-bold
      mb-6
      "
    >
      Project History Timeline
    </h2>

    {

      projects.map(
        (
          project,
          index
        ) => (

          <div
            key={project.id}
            className="
            border-l-2
            border-cyan-400
            pl-4
            mb-6
            "
          >

            <h3
              className="
              text-xl
              font-bold
              "
            >
              {project.project_name}
            </h3>

            <p
              className="
              text-green-400
              "
            >
              Completed
            </p>

            <p
              className="
              text-white/60
              "
            >
              Inspections:
              {" "}
              {project.inspection_count}
            </p>

            <p
              className="
              text-white/60
              "
            >
              Snags:
              {" "}
              {project.snag_count}
            </p>

          </div>

        )
      )

    }

  </div>

  {

    projects.map(
      project => (

        <div
          key={project.id}
          className="
          bg-white/10
          rounded-3xl
          p-6
          mb-6
          "
        >

          <h2
            className="
            text-3xl
            font-bold
            mb-3
            "
          >
            🏗 {project.project_name}
          </h2>

          <p>
            Status:
            {" "}
            {project.status}
          </p>

          <p>
            Inspections:
            {" "}
            {project.inspection_count}
          </p>

          <p>
            Snags:
            {" "}
            {project.snag_count}
          </p>

        </div>

      )
    )

  }

</MainLayout>

);

}

function Card({
title,
value
}) {

return (

<div
  className="
  bg-white/10
  backdrop-blur-xl
  border
  border-white/10
  rounded-3xl
  p-6
  "
>

  <p
    className="
    text-white/60
    "
  >
    {title}
  </p>

  <h2
    className="
    text-5xl
    font-bold
    mt-3
    "
  >
    {value}
  </h2>

</div>

);

}