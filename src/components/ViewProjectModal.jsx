import { useEffect, useState } from "react";

import { getStaff }
from "../api/staffApi";

import { assignStaff }
from "../api/projectAssignmentApi";

export default function ViewProjectModal({
  open,
  project,
  onClose,
}) {

  const [staff, setStaff] =
    useState([]);

  const [engineer, setEngineer] =
    useState("");

  const [contractor, setContractor] =
    useState("");

  useEffect(() => {

    if (open) {

      fetchStaff();

    }

  }, [open]);

  const fetchStaff = async () => {

    try {

      const data =
        await getStaff();

      setStaff(data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleAssignEngineer =
    async () => {

      if (!engineer) {

        alert(
          "Select Engineer"
        );

        return;

      }

      try {

        await assignStaff({

          project:
            project.id,

          user:
            engineer,

          assignment_type:
            "ENGINEER",

        });

        alert(
          "Engineer Assigned"
        );

      } catch (err) {

        console.log(err);

      }

    };

  const handleAssignContractor =
    async () => {

      if (!contractor) {

        alert(
          "Select Contractor"
        );

        return;

      }

      try {

        await assignStaff({

          project:
            project.id,

          user:
            contractor,

          assignment_type:
            "CONTRACTOR",

        });

        alert(
          "Contractor Assigned"
        );

      } catch (err) {

        console.log(err);

      }

    };

  if (!open || !project)
    return null;

  const engineers =
    staff.filter(
      item =>
      item.role ===
      "SITE_ENGINEER"
    );

  const contractors =
    staff.filter(
      item =>
      item.role ===
      "CONTRACTOR"
    );

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
        w-[700px]
        bg-slate-900
        p-6
        rounded-3xl
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-6
          "
        >
          Project Details
        </h2>

        <div
          className="
          space-y-3
          "
        >

          <p>
            <strong>Name:</strong>
            {" "}
            {project.project_name}
          </p>

          <p>
            <strong>Code:</strong>
            {" "}
            {project.project_code}
          </p>

          <p>
            <strong>Location:</strong>
            {" "}
            {project.location}
          </p>

          <p>
            <strong>Status:</strong>
            {" "}
            {project.status}
          </p>

          <p>
            <strong>Start Date:</strong>
            {" "}
            {project.start_date}
          </p>

          <p>
            <strong>Description:</strong>
            {" "}
            {project.description}
          </p>

        </div>

        <hr
          className="
          my-6
          border-white/10
          "
        />

        <h3
          className="
          text-xl
          font-bold
          mb-4
          "
        >
          Assign Engineer
        </h3>

        <div
          className="
          flex
          gap-3
          "
        >

          <select

            value={engineer}

            onChange={(e) =>
              setEngineer(
                e.target.value
              )
            }

            className="
            flex-1
            p-3
            rounded-xl
            bg-white/10
            "
          >

            <option value="">
              Select Engineer
            </option>

            {engineers.map(
              (item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.username}
                </option>

              )
            )}

          </select>

          <button

            onClick={
              handleAssignEngineer
            }

            className="
            px-5
            rounded-xl
            bg-cyan-500
            "
          >
            Assign
          </button>

        </div>

        <h3
          className="
          text-xl
          font-bold
          mt-8
          mb-4
          "
        >
          Assign Contractor
        </h3>

        <div
          className="
          flex
          gap-3
          "
        >

          <select

            value={contractor}

            onChange={(e) =>
              setContractor(
                e.target.value
              )
            }

            className="
            flex-1
            p-3
            rounded-xl
            bg-white/10
            "
          >

            <option value="">
              Select Contractor
            </option>

            {contractors.map(
              (item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.username}
                </option>

              )
            )}

          </select>

          <button

            onClick={
              handleAssignContractor
            }

            className="
            px-5
            rounded-xl
            bg-green-500
            "
          >
            Assign
          </button>

        </div>

        <button

          onClick={onClose}

          className="
          mt-8
          bg-cyan-500
          px-5
          py-3
          rounded-xl
          "
        >
          Close
        </button>

      </div>

    </div>

  );

}