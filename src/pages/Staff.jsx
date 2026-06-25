import MainLayout from "../layouts/MainLayout";

import { useEffect, useState } from "react";

import { getStaff } from "../api/staffApi";
import { createStaff } from "../api/createStaff";

import AddStaffModal from "../components/AddStaffModal";
import CredentialsModal from "../components/CredentialsModal";

import {
  deleteStaff
}
  from "../api/deleteStaff";

import EditStaffModal from "../components/EditStaffModal";

import {
  updateStaff,
} from "../api/updateStaff";

import ViewCredentialsModal
  from "../components/ViewCredentialsModal";


export default function Staff() {

  const [staff, setStaff] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [
    credentialsModal,
    setCredentialsModal
  ] = useState(false);

  const [
    credentials,
    setCredentials
  ] = useState(null);


  const [
    editModal,
    setEditModal
  ] = useState(false);

  const [
    selectedUser,
    setSelectedUser
  ] = useState(null);

  const [
    viewCredentialsModal,
    setViewCredentialsModal
  ] = useState(false);

  const [
    selectedCredentials,
    setSelectedCredentials
  ] = useState(null);

  useEffect(() => {

    fetchStaff();

  }, []);

  const fetchStaff = async () => {

    try {

      const data =
        await getStaff();

      setStaff(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const handleCreateStaff =
    async (formData) => {

      try {

        const res =
          await createStaff(
            formData
          );

        setCredentials({

          username:
            res.username,

          password:
            res.password

        });

        setCredentialsModal(
          true
        );

        await fetchStaff();

        setOpenModal(
          false
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to create staff"
        );

      }

    };
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this staff?"
      );

    if (!confirmDelete) return;

    try {

      await deleteStaff(id);

      await fetchStaff();

      alert(
        "Staff Deleted Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Delete Failed"
      );

    }

  };
  const handleUpdate = async (formData) => {

    try {

      await updateStaff(
        selectedUser.id,
        {
          first_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
        }
      );

      await fetchStaff();

      setEditModal(false);

      alert(
        "Staff Updated Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Update Failed"
      );

    }

  };
  return (

    <>

      <MainLayout showNavbar={false}>

        {/* Header */}

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
              Staff
            </h1>

            <p
              className="
            text-white/60
            "
            >
              Manage Engineers,
              Contractors,
              Clients
            </p>

          </div>

          <button

            onClick={() =>
              setOpenModal(true)
            }

            className="
          bg-cyan-500
          hover:bg-cyan-400

          px-5
          py-3

          rounded-2xl

          font-semibold

          transition
          "
          >
            + Add Staff
          </button>

        </div>

        {/* Table */}

        <div
          className="
        bg-white/10
        backdrop-blur-xl

        border
        border-white/10

        rounded-3xl

        overflow-hidden
        "
        >

          <table
  className="
  w-full
  "
>

  <thead>

    <tr
      className="
      border-b
      border-white/10
      "
    >

      <th className="p-4 text-left">
        Name
      </th>

      <th className="p-4 text-left">
        Email
      </th>

      <th className="p-4 text-left">
        Role
      </th>

      <th className="p-4 text-left">
        Phone
      </th>

      <th className="p-4 text-left">
        Username
      </th>

      <th className="p-4 text-left">
        Password
      </th>

      <th className="p-4 text-left">
        Actions
      </th>

    </tr>

  </thead>

  <tbody>

    {loading ? (

      <tr>

        <td
          colSpan={7}
          className="
          p-8
          text-center
          text-white/60
          "
        >
          Loading Staff...
        </td>

      </tr>

    ) : staff.length === 0 ? (

      <tr>

        <td
          colSpan={7}
          className="
          p-8
          text-center
          text-white/60
          "
        >
          No Staff Found
        </td>

      </tr>

    ) : (

      staff.map((user) => (

        <tr
          key={user.id}
          className="
          border-b
          border-white/5
          hover:bg-white/5
          transition
          "
        >

          <td className="p-4">
            {user.name}
          </td>

          <td className="p-4">
            {user.email}
          </td>

          <td className="p-4">

            <span
              className="
              px-3
              py-1
              rounded-full
              bg-cyan-500/20
              text-cyan-300
              text-sm
              "
            >
              {user.role}
            </span>

          </td>

          <td className="p-4">
            {user.phone}
          </td>

          <td className="p-4">
            {user.username}
          </td>

          <td className="p-4">
            {user.password}
          </td>

          <td className="p-4">

            <div
              className="
              flex
              gap-2
              "
            >

              <button
                onClick={() => {

                  setSelectedUser(user);

                  setEditModal(true);

                }}
                className="
                px-3
                py-1
                rounded-lg
                bg-yellow-500/20
                text-yellow-300
                cursor-pointer
                "
              >
                ✏ Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(user.id)
                }
                className="
                px-3
                py-1
                rounded-lg
                bg-red-500/20
                text-red-300
                cursor-pointer
                "
              >
                🗑 Delete
              </button>

            </div>

          </td>

        </tr>

      ))

    )}

  </tbody>

</table>

        </div>

        {/* Add Staff Modal */}

        <AddStaffModal

          open={openModal}

          onClose={() =>
            setOpenModal(false)
          }

          onSubmit={
            handleCreateStaff
          }

        />

        {/* Credentials Modal */}

        <CredentialsModal

          open={
            credentialsModal
          }

          credentials={
            credentials
          }

          onClose={() =>
            setCredentialsModal(
              false
            )
          }

        />

      </MainLayout>

      <EditStaffModal

        open={editModal}

        user={selectedUser}

        onClose={() =>
          setEditModal(false)
        }

        onSave={
          handleUpdate
        }

      />

    </>

  );
}