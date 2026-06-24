import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";

import {
getClientProjects,
getClientProjectDetails
} from "../api/projectApi";

import {
getClientInspections
} from "../api/inspectionApi";

import {
getClientSnags
} from "../api/snagApi";

import Plot from "react-plotly.js";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ClientDashboard() {

const [projects, setProjects] =
useState([]);

const [inspections, setInspections] =
useState([]);

const [snags, setSnags] =
useState([]);

const [projectDetails,
setProjectDetails] =
useState([]);

const [
selectedMonth,
setSelectedMonth
] = useState(
new Date()
);

useEffect(() => {

fetchData();

}, []);

const fetchData = async () => {

try {

  const [
    projectsData,
    inspectionsData,
    snagsData,
    projectDetailsData
  ] = await Promise.all([

    getClientProjects(),
    getClientInspections(),
    getClientSnags(),
    getClientProjectDetails()

  ]);

  setProjects(projectsData);
  setInspections(inspectionsData);
  setSnags(snagsData);
  setProjectDetails(projectDetailsData);

} catch (err) {

  console.log(err);

}

};

const activeProjects =
projects.filter(
p => p.status !== "COMPLETED"
);

const activeProjectIds =
activeProjects.map(
p => p.id
);

const activeInspections =
inspections.filter(
inspection =>
activeProjectIds.includes(
inspection.project
)
);

const activeInspectionIds =
activeInspections.map(
i => i.id
);

const activeSnags =
snags.filter(
snag =>
activeInspectionIds.includes(
snag.inspection
)
);

const snagStatus = {

OPEN: 0,
IN_PROGRESS: 0,
COMPLETED: 0

};

activeSnags.forEach((snag) => {

if (
  snagStatus[snag.status]
  !== undefined
) {

  snagStatus[
    snag.status
  ]++;

}

});

return (

<MainLayout
  showNavbar={false}
>

  <div
    className="
    flex
    justify-between
    items-center
    mb-10
    "
  >

    <h1
      className="
      text-4xl
      font-bold
      "
    >
      Client Dashboard
    </h1>

    <DatePicker
      selected={
        selectedMonth
      }
      onChange={
        setSelectedMonth
      }
      showMonthYearPicker
      dateFormat="MMMM yyyy"
      className="
      bg-white/10
      border
      border-white/10
      rounded-xl
      px-4
      py-2
      text-white
      "
    />

  </div>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
    "
  >

    <Card
      title="Projects"
      value={
        activeProjects.length
      }
    />

    <Card
      title="Inspections"
      value={
        activeInspections.length
      }
    />

    <Card
      title="Snags"
      value={
        activeSnags.length
      }
    />

  </div>

  <div
    className="
    mt-8
    bg-white/10
    rounded-3xl
    p-6
    "
  >

    <h2
      className="
      text-2xl
      font-bold
      mb-4
      "
    >
      Snag Status Graph
    </h2>

    <Plot
      data={[
        {
          x:
            Object.keys(
              snagStatus
            ),

          y:
            Object.values(
              snagStatus
            ),

          type: "bar"
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
        height: "350px"
      }}
      config={{
        displayModeBar: false
      }}
    />

  </div>

  <div
    className="
    mt-8
    bg-white/10
    rounded-3xl
    p-6
    "
  >

    <h2
      className="
      text-2xl
      font-bold
      mb-6
      "
    >
      Recent Activity
    </h2>

    {

      activeSnags
        .slice(0, 10)
        .map(
          (
            snag,
            index
          ) => (

            <div
              key={index}
              className="
              border-l-2
              border-cyan-400
              pl-4
              mb-4
              "
            >

              <p
                className="
                font-semibold
                "
              >
                {snag.title}
              </p>

              <p
                className="
                text-white/60
                "
              >
                Status:
                {" "}
                {snag.status}
              </p>

            </div>

          )
        )

    }

  </div>

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
  p-8
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