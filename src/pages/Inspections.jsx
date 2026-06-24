import MainLayout from "../layouts/MainLayout";

import { useEffect, useState } from "react";

import {
  getInspections,
  createInspection,
  updateInspection,
  deleteInspection
} from "../api/inspectionApi";

import { getProjects }
from "../api/projectApi";

import AddInspectionModal
from "../components/AddInspectionModal";

import EditInspectionModal
from "../components/EditInspectionModal";

export default function Inspections() {

  const [inspections, setInspections] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [editModal, setEditModal] =
    useState(false);

  const [
    selectedInspection,
    setSelectedInspection
  ] = useState(null);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const inspectionData =
        await getInspections();

      const projectData =
        await getProjects();

      setInspections(
        inspectionData
      );

      setProjects(
        projectData
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const handleCreate =
    async (formData) => {

      try {

        await createInspection(
          formData
        );

        await fetchData();

        setOpenModal(false);

        alert(
          "Inspection Created"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Create Failed"
        );

      }

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this inspection?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteInspection(
          id
        );

        await fetchData();

        alert(
          "Inspection Deleted"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Delete Failed"
        );

      }

    };

  const handleUpdate =
    async (formData) => {

      try {

        await updateInspection(
          selectedInspection.id,
          formData
        );

        await fetchData();

        setEditModal(false);

        alert(
          "Inspection Updated"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Update Failed"
        );

      }

    };

  return (

    <MainLayout showNavbar={false}>

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
            Inspections
          </h1>

          <p
            className="
            text-white/60
            "
          >
            Manage Site Inspections
          </p>

        </div>

        <button

          onClick={() =>
            setOpenModal(true)
          }

          className="
          bg-cyan-500
          px-5
          py-3
          rounded-2xl
          "
        >
          + Add Inspection
        </button>

      </div>

      {loading ? (

        <div
          className="
          text-center
          text-white/60
          "
        >
          Loading...
        </div>

      ) : (

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          "
        >

          {inspections.map(
            (inspection) => {

              const project =
                projects.find(
                  (p) =>
                    p.id ===
                    inspection.project
                );

              return (

                <div

                  key={
                    inspection.id
                  }

                  className="
                  bg-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-6
                  "
                >

                  <h2
                    className="
                    text-2xl
                    font-bold
                    "
                  >
                    {
                      inspection.inspection_number
                    }
                  </h2>

                  <p className="mt-2">
                    📍 {
                      inspection.location
                    }
                  </p>

                  <p className="mt-2">
                    📅 {
                      inspection.inspection_date
                    }
                  </p>

                  <p className="mt-2">
                    🏗 {
                      project
                        ?.project_name
                    }
                  </p>

                  <div
                    className="
                    flex
                    gap-3
                    mt-5
                    "
                  >

                    <button

                      onClick={() => {

                        setSelectedInspection(
                          inspection
                        );

                        setEditModal(
                          true
                        );

                      }}

                      className="
                      flex-1
                      bg-yellow-500/20
                      py-2
                      rounded-xl
                      "
                    >
                      Edit
                    </button>

                    <button

                      onClick={() =>
                        handleDelete(
                          inspection.id
                        )
                      }

                      className="
                      flex-1
                      bg-red-500/20
                      py-2
                      rounded-xl
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              );

            }
          )}

        </div>

      )}

      <AddInspectionModal

        open={openModal}

        projects={projects}

        onClose={() =>
          setOpenModal(false)
        }

        onSubmit={
          handleCreate
        }

      />

      <EditInspectionModal

        open={editModal}

        inspection={
          selectedInspection
        }

        onClose={() =>
          setEditModal(false)
        }

        onSave={
          handleUpdate
        }

      />

    </MainLayout>

  );

}