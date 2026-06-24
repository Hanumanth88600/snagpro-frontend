import { useState } from "react";

export default function AddStaffModal({
  open,
  onClose,
  onSubmit,
}) {

  const [form, setForm] =
    useState({

      first_name: "",

      email: "",

      phone: "",

      role: "SITE_ENGINEER",

    });

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = () => {

    onSubmit(form);

  };

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
        w-[500px]

        bg-slate-900

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

          mb-6
          "
        >
          Add Staff
        </h2>

        <div className="space-y-4">

          <input
            name="first_name"
            placeholder="Name"
            onChange={
              handleChange
            }
            className="
            w-full

            p-3

            rounded-xl

            bg-white/10
            "
          />

          <input
            name="email"
            placeholder="Email"
            onChange={
              handleChange
            }
            className="
            w-full

            p-3

            rounded-xl

            bg-white/10
            "
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={
              handleChange
            }
            className="
            w-full

            p-3

            rounded-xl

            bg-white/10
            "
          />

          <select
            name="role"
            onChange={
              handleChange
            }
            className="
            w-full

            p-3

            rounded-xl

            bg-white/10
            "
          >

            <option
              value="SITE_ENGINEER"
            >
              Site Engineer
            </option>

            <option
              value="CONTRACTOR"
            >
              Contractor
            </option>

            <option
              value="CLIENT"
            >
              Client
            </option>

          </select>

        </div>

        <div
          className="
          flex
          justify-end
          gap-3

          mt-6
          "
        >

          <button
            onClick={onClose}
            className="
            px-4
            py-2

            rounded-xl

            bg-gray-600
            "
          >
            Cancel
          </button>

          <button
            onClick={
              handleSubmit
            }
            className="
            px-4
            py-2

            rounded-xl

            bg-cyan-500
            "
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}