import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";

import {
  getClientProjectDetails
} from "../api/projectApi";

export default function CurrentProjects() {

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
            project.status !==
            "COMPLETED"
        )

      );

    } catch (err) {

      console.log(err);

    }

  };

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
        Current Projects
      </h1>

      {

        projects.length === 0 ?

        (

          <div
            className="
            bg-white/10
            rounded-3xl
            p-6
            "
          >
            No Active Projects
          </div>

        )

        :

        (

          projects.map(
            project => (

              <div
                key={project.id}
                className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-6
                mb-6
                "
              >

                <div
                  className="
                  flex
                  justify-between
                  items-center
                  mb-6
                  "
                >

                  <div>

                    <h2
                      className="
                      text-3xl
                      font-bold
                      "
                    >
                      🏗 {project.project_name}
                    </h2>

                    <p>
                      Code:
                      {" "}
                      {project.project_code}
                    </p>

                    <p>
                      Location:
                      {" "}
                      {project.location}
                    </p>

                  </div>

                  <div
                    className="
                    bg-cyan-500/20
                    text-cyan-300
                    px-4
                    py-2
                    rounded-xl
                    "
                  >
                    {project.status}
                  </div>

                </div>

                <div
                  className="
                  grid
                  md:grid-cols-2
                  gap-6
                  "
                >

                  <div>

                    <h3
                      className="
                      font-semibold
                      mb-3
                      "
                    >
                      👷 Engineers
                    </h3>

                    {

                      project.engineers
                      .length > 0 ?

                      (

                        project.engineers
                        .map(
                          (
                            engineer,
                            index
                          ) => (

                            <div
                              key={index}
                              className="
                              bg-green-500/20
                              rounded-xl
                              p-3
                              mb-2
                              "
                            >
                              {engineer}
                            </div>

                          )
                        )

                      )

                      :

                      <p>
                        Not Assigned
                      </p>

                    }

                  </div>

                  <div>

                    <h3
                      className="
                      font-semibold
                      mb-3
                      "
                    >
                      🔨 Contractors
                    </h3>

                    {

                      project.contractors
                      .length > 0 ?

                      (

                        project.contractors
                        .map(
                          (
                            contractor,
                            index
                          ) => (

                            <div
                              key={index}
                              className="
                              bg-yellow-500/20
                              rounded-xl
                              p-3
                              mb-2
                              "
                            >
                              {contractor}
                            </div>

                          )
                        )

                      )

                      :

                      <p>
                        Not Assigned
                      </p>

                    }

                  </div>

                </div>

                <div
                  className="
                  mt-6
                  "
                >

                  <div
                    className="
                    bg-blue-500/20
                    rounded-xl
                    p-3
                    mb-3
                    "
                  >
                    📋 Inspections:
                    {" "}
                    {project.inspection_count}
                  </div>

                  <div
                    className="
                    bg-red-500/20
                    rounded-xl
                    p-3
                    mb-3
                    "
                  >
                    🛠 Snags:
                    {" "}
                    {project.snag_count}
                  </div>

                </div>

              </div>

            )
          )

        )

      }

    </MainLayout>

  );

}