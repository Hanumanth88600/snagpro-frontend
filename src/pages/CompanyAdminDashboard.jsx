import MainLayout from "../layouts/MainLayout";
import Plot from "react-plotly.js";
import { useEffect, useState } from "react";

import { getProjects } from "../api/projectApi";
import { getStaff } from "../api/staffApi";
import { getInspections } from "../api/inspectionApi";
import { getSnags } from "../api/snagApi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CompanyAdminDashboard() {

const [projects, setProjects] =
useState([]);

const [staff, setStaff] =
useState([]);

const [inspections,
setInspections] =
useState([]);

const [snags, setSnags] =
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
    projectData,
    staffData,
    inspectionData,
    snagData
  ] = await Promise.all([

    getProjects(),
    getStaff(),
    getInspections(),
    getSnags()

  ]);

  setProjects(projectData);
  setStaff(staffData);
  setInspections(
    inspectionData
  );
  setSnags(
    snagData
  );

} catch (err) {

  console.log(err);

}

};

const filteredProjects =
  projects.filter((item) => {

    if (!item.created_at)
      return false;

    const itemDate =
      new Date(item.created_at);

    return (

      itemDate.getMonth()
        ===
      selectedMonth.getMonth()

      &&

      itemDate.getFullYear()
        ===
      selectedMonth.getFullYear()

    );

  });

const filteredInspections =
  inspections.filter((item) => {

    if (!item.created_at)
      return false;

    const itemDate =
      new Date(item.created_at);

    return (

      itemDate.getMonth()
        ===
      selectedMonth.getMonth()

      &&

      itemDate.getFullYear()
        ===
      selectedMonth.getFullYear()

    );

  });

const filteredSnags =
  snags.filter((item) => {

    if (!item.created_at)
      return false;

    const itemDate =
      new Date(item.created_at);

    return (

      itemDate.getMonth()
        ===
      selectedMonth.getMonth()

      &&

      itemDate.getFullYear()
        ===
      selectedMonth.getFullYear()

    );

  });

const engineers =
staff.filter(
(u) =>
u.role ===
"SITE_ENGINEER"
);

const contractors =
staff.filter(
(u) =>
u.role ===
"CONTRACTOR"
);

const openSnags =
filteredSnags.filter(
(s) =>
s.status ===
"OPEN"
);

const statusCounts = {

OPEN: 0,
IN_PROGRESS: 0,
COMPLETED: 0,
VERIFIED: 0,
APPROVED: 0

};

filteredSnags.forEach((s) => {

if (
  statusCounts[s.status]
  !== undefined
) {

  statusCounts[s.status]++;

}

});

const priorityCounts = {

LOW: 0,
MEDIUM: 0,
HIGH: 0,
CRITICAL: 0

};

filteredSnags.forEach((s) => {

if (
  priorityCounts[s.priority]
  !== undefined
) {

  priorityCounts[
    s.priority
  ]++;

}

});

const statusData = [
{
x:
Object.keys(
statusCounts
),

  y:
    Object.values(
      statusCounts
    ),

  type: "bar",

  marker: {
    color: [
      "#ef4444",
      "#f59e0b",
      "#10b981",
      "#06b6d4",
      "#8b5cf6"
    ]
  }
}

];

const priorityData = [
{
values:
Object.values(
priorityCounts
),

  labels:
    Object.keys(
      priorityCounts
    ),

  type: "pie",

  hole: 0.6
}

];

return (

<MainLayout>

  <div
    className="
    flex
    justify-between
    items-center
    mb-8
    "
  >

    <div>

      <h1
        className="
        text-4xl
        font-bold
        "
      >
        Dashboard
      </h1>

      <p
        className="
        text-white/60
        mt-2
        "
      >
        Overview of Construction Activities
      </p>

    </div>

    <DatePicker
  selected={selectedMonth}
  onChange={(date) =>
    setSelectedMonth(date)
  }
  showMonthYearPicker
  dateFormat="MMMM yyyy"
  popperPlacement="bottom-end"
  className="
  bg-white/10
  border
  border-white/10
  rounded-xl
  px-4
  py-2
  text-white
  w-[220px]
  "
/>

  </div>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-5
    gap-6
    "
  >

    <StatCard
      title="Projects"
      value={
        filteredProjects.length
      }
    />

    <StatCard
      title="Engineers"
      value={
        engineers.length
      }
    />

    <StatCard
      title="Contractors"
      value={
        contractors.length
      }
    />

    <StatCard
      title="Inspections"
      value={
        filteredInspections.length
      }
    />

    <StatCard
      title="Open Snags"
      value={
        openSnags.length
      }
    />

  </div>

  <div
    className="
    mt-8
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-6
    "
  >

    <ChartCard
      title="Snags By Status"
      data={statusData}
    />

    <ChartCard
      title="Priority Split"
      data={priorityData}
    />

  </div>

</MainLayout>

);

}

function ChartCard({
title,
data
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

  <h2
    className="
    text-2xl
    font-semibold
    mb-4
    "
  >
    {title}
  </h2>

  <Plot
    data={data}
    layout={{
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",

  font: {
    color: "white"
  },

  xaxis: {
    tickfont: {
      color: "white"
    }
  },

  yaxis: {
    tickfont: {
      color: "white"
    }
  },

  margin: {
    l: 50,
    r: 20,
    t: 20,
    b: 60
  },

  autosize: true
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

);

}

function StatCard({
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