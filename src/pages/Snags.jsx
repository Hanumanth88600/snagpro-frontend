import MainLayout from "../layouts/MainLayout";

import { useEffect, useState } from "react";

import {
getSnags,
createSnag,
updateSnag,
deleteSnag,
assignContractor,
} from "../api/snagApi";

import { getInspections }
from "../api/inspectionApi";

import { getStaff }
from "../api/staffApi";

import AddSnagModal
from "../components/AddSnagModal";

import EditSnagModal
from "../components/EditSnagModal";

import AssignContractorModal
from "../components/AssignContractorModal";

export default function Snags() {

const [snags, setSnags] =
useState([]);

const [inspections,
setInspections] =
useState([]);

const [contractors,
setContractors] =
useState([]);

const [loading,
setLoading] =
useState(true);

const [openModal,
setOpenModal] =
useState(false);

const [editModal,
setEditModal] =
useState(false);

const [assignModal,
setAssignModal] =
useState(false);

const [selectedSnag,
setSelectedSnag] =
useState(null);

useEffect(() => {

fetchData();

}, []);

const fetchData = async () => {

  try {

    const [
      snagData,
      inspectionData,
      staffData
    ] = await Promise.all([

      getSnags(),

      getInspections(),

      getStaff()

    ]);

    setSnags(
      snagData
    );

    setInspections(
      inspectionData
    );

    setContractors(

      staffData.filter(

        (user) =>

          user.role ===
          "CONTRACTOR"

      )

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

    await createSnag(
      formData
    );

    await fetchData();

    setOpenModal(
      false
    );

    alert(
      "Snag Created"
    );

  } catch (err) {

    console.log(err);

  }

};

const handleUpdate =
async (formData) => {

  try {

    await updateSnag(

      selectedSnag.id,

      formData

    );

    await fetchData();

    setEditModal(
      false
    );

    alert(
      "Snag Updated"
    );

  } catch (err) {

    console.log(err);

  }

};

const handleDelete =
async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete Snag?"
    );

  if (!confirmDelete)
    return;

  try {

    await deleteSnag(
      id
    );

    await fetchData();

    alert(
      "Snag Deleted"
    );

  } catch (err) {

    console.log(err);

  }

};

const handleAssign =
async (
contractorId
) => {

  try {

    await assignContractor(

      selectedSnag.id,

      contractorId

    );

    await fetchData();

    setAssignModal(
      false
    );

    alert(
      "Contractor Assigned"
    );

  } catch (err) {

    console.log(err);

  }

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

    <div>

      <h1
        className="
        text-4xl
        font-bold
        "
      >
        Snags
      </h1>

      <p
        className="
        text-white/60
        "
      >
        Manage Snags
      </p>

    </div>

    <button

      onClick={() =>
        setOpenModal(
          true
        )
      }

      className="
      bg-cyan-500

      px-5
      py-3

      rounded-2xl
      "
    >
      + Add Snag
    </button>

  </div>

  {loading ? (

    <div>
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

      {snags.map(
        (snag) => (

          <div

            key={snag.id}

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
              {snag.title}
            </h2>

            <p
              className="
              mt-3
              "
            >
              {snag.description}
            </p>

            <p
              className="
              mt-3
              "
            >
              Priority:
              {" "}
              {snag.priority}
            </p>

            <p
              className="
              mt-2
              "
            >
              Status:
              {" "}
              {snag.status}
            </p>

            <p
              className="
              mt-2
              "
            >
              Inspection:
              {" "}
              {
                snag.inspection
              }
            </p>

            <p
              className="
              mt-2
              "
            >
              Contractor:
              {" "}

              {
  snag.contractor_name
  || "Not Assigned"
}

            </p>
            {snag.images?.length > 0 && (

  <div
    className="
    grid
    grid-cols-2
    gap-2
    mt-4
    "
  >

   {snag.images.map((img) => (

  <img
    key={img.id}
    src={img.image}
    alt={snag.title}
    className="
    h-32
    w-full
    object-cover
    rounded-xl
    border
    border-white/10
    "
  />

))}

  </div>

)}

            <div
              className="
              flex
              gap-2

              mt-5
              "
            >

              <button

                onClick={() => {

                  setSelectedSnag(
                    snag
                  );

                  setEditModal(
                    true
                  );

                }}

                className="
                flex-1

                py-2

                rounded-xl

                bg-yellow-500/20
                "
              >
                Edit
              </button>

              <button

                onClick={() => {

                  setSelectedSnag(
                    snag
                  );

                  setAssignModal(
                    true
                  );

                }}

                className="
                flex-1

                py-2

                rounded-xl

                bg-cyan-500/20
                "
              >
                Assign
              </button>

              <button

                onClick={() =>
                  handleDelete(
                    snag.id
                  )
                }

                className="
                flex-1

                py-2

                rounded-xl

                bg-red-500/20
                "
              >
                Delete
              </button>

            </div>

          </div>

        )
      )}

    </div>

  )}

  <AddSnagModal

    open={openModal}

    onClose={() =>
      setOpenModal(false)
    }

    onSubmit={
      handleCreate
    }

    inspections={
      inspections
    }

  />

  <EditSnagModal

    open={editModal}

    snag={selectedSnag}

    onClose={() =>
      setEditModal(false)
    }

    onSave={
      handleUpdate
    }

  />

  <AssignContractorModal

    open={assignModal}

    onClose={() =>
      setAssignModal(false)
    }

    onAssign={
      handleAssign
    }

    contractors={
      contractors
    }

  />

</MainLayout>

);

}