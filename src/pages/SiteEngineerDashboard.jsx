import MainLayout from "../layouts/MainLayout";
import Plot from "react-plotly.js";

import { useEffect, useState } from "react";

import {
  getProjects
} from "../api/projectApi";

import {
  getInspections
} from "../api/inspectionApi";

import {
  getSnags
} from "../api/snagApi";

export default function SiteEngineerDashboard() {

  const [projects, setProjects] =
    useState([]);

  const [inspections, setInspections] =
    useState([]);

  const [snags, setSnags] =
    useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const [
        projectData,
        inspectionData,
        snagData
      ] = await Promise.all([

        getProjects(),
        getInspections(),
        getSnags()

      ]);

      setProjects(projectData);
      setInspections(inspectionData);
      setSnags(snagData);

    }

    catch (err) {

      console.log(err);

    }

  };

  const openSnags =
    snags.filter(
      snag =>
        snag.status === "OPEN"
    ).length;

  const completedSnags =
    snags.filter(
      snag =>
        snag.status === "COMPLETED"
    ).length;

  const statusCounts = {

    OPEN: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
    VERIFIED: 0

  };

  snags.forEach((snag) => {

    if (
      statusCounts[
        snag.status
      ] !== undefined
    ) {

      statusCounts[
        snag.status
      ]++;

    }

  });

  const priorityCounts = {

    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0

  };

  snags.forEach((snag) => {

    if (
      priorityCounts[
        snag.priority
      ] !== undefined
    ) {

      priorityCounts[
        snag.priority
      ]++;

    }

  });

  return (

    <MainLayout
      showNavbar={false}
    >

      <h1
        className="
        text-4xl
        font-bold
        "
      >
        Site Engineer Dashboard
      </h1>

      <p
        className="
        text-white/60
        mt-2
        mb-8
        "
      >
        Inspection & Snag Overview
      </p>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        "
      >

        <Card
          title="Projects"
          value={projects.length}
        />

        <Card
          title="Inspections"
          value={inspections.length}
        />

        <Card
          title="Open Snags"
          value={openSnags}
        />

        <Card
          title="Completed"
          value={completedSnags}
        />

      </div>

      <div
        className="
        mt-8
        grid
        xl:grid-cols-2
        gap-6
        "
      >

        <ChartCard
          title="Snag Status"
        >

          <Plot
            data={[
              {
                values:
                  Object.values(
                    statusCounts
                  ),

                labels:
                  Object.keys(
                    statusCounts
                  ),

                type: "pie"
              }
            ]}
            layout={{
              paper_bgcolor:
                "rgba(0,0,0,0)",

              font: {
                color:
                  "white"
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

        </ChartCard>

        <ChartCard
          title="Priority Split"
        >

          <Plot
            data={[
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
            ]}
            layout={{
              paper_bgcolor:
                "rgba(0,0,0,0)",

              font: {
                color:
                  "white"
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

        </ChartCard>

      </div>

      <div
        className="
        mt-8
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <ActivityCard
          title="Recent Inspections"
          items={inspections}
          field="inspection_code"
        />

        <ActivityCard
          title="Recent Snags"
          items={snags}
          field="title"
        />

      </div>

    </MainLayout>

  );

}

function ActivityCard({
  title,
  items,
  field
}) {

  return (

    <div
      className="
      bg-white/10
      rounded-3xl
      p-6
      border
      border-white/10
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
      >
        {title}
      </h2>

      {

        items
          .slice(0, 5)
          .map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="
                py-2
                border-b
                border-white/10
                "
              >
                {item[field]}
              </div>

            )
          )

      }

    </div>

  );

}

function ChartCard({
  title,
  children
}) {

  return (

    <div
      className="
      bg-white/10
      rounded-3xl
      p-6
      border
      border-white/10
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
      >
        {title}
      </h2>

      {children}

    </div>

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
      rounded-3xl
      p-6
      border
      border-white/10
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
        mt-4
        "
      >
        {value}
      </h2>

    </div>

  );

}