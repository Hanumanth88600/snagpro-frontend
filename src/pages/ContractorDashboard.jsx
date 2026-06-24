import MainLayout from "../layouts/MainLayout";
import Plot from "react-plotly.js";

import { useEffect, useState } from "react";

import {
  getAssignedSnags
} from "../api/snagApi";

export default function ContractorDashboard() {

  const [snags, setSnags] =
    useState([]);

  useEffect(() => {

    fetchSnags();

  }, []);

  const fetchSnags = async () => {

    try {

      const data =
        await getAssignedSnags();

      setSnags(data);

    } catch (err) {

      console.log(err);

    }

  };

  const assigned =
    snags.length;

  const pending =
    snags.filter(
      snag =>
        snag.status === "OPEN"
    ).length;

  const inProgress =
    snags.filter(
      snag =>
        snag.status ===
        "IN_PROGRESS"
    ).length;

  const completed =
    snags.filter(
      snag =>
        snag.status ===
        "COMPLETED"
    ).length;

  const critical =
    snags.filter(
      snag =>
        snag.priority ===
        "CRITICAL"
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
        mb-8
        "
      >
        Contractor Dashboard
      </h1>

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
          title="Assigned"
          value={assigned}
        />

        <StatCard
          title="Pending"
          value={pending}
        />

        <StatCard
          title="In Progress"
          value={inProgress}
        />

        <StatCard
          title="Completed"
          value={completed}
        />

        <StatCard
          title="Critical"
          value={critical}
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

        </ChartCard>

      </div>

      <div
        className="
        mt-8
        bg-white/10
        backdrop-blur-xl
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
          Recent Activity
        </h2>

        {

          snags
            .slice(0, 5)
            .map(
              (
                snag,
                index
              ) => (

                <div
                  key={index}
                  className="
                  py-3
                  border-b
                  border-white/10
                  "
                >

                  <p>
                    🛠 {snag.title}
                  </p>

                  <p
                    className="
                    text-white/60
                    text-sm
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

function ChartCard({
  title,
  children
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

function StatCard({
  title,
  value
}) {

  return (

    <div
      className="
      bg-white/10
      backdrop-blur-xl
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
        mt-3
        "
      >
        {value}
      </h2>

    </div>

  );

}