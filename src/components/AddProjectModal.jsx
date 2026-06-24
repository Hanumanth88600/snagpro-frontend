import { useState } from "react";

export default function AddProjectModal({
  open,
  onClose,
  onSubmit,
  clients,
}) {

  const [form, setForm] =
  useState({

    project_name: "",

    project_code: "",

    client: "",

    location: "",

    description: "",

    start_date: "",

    status: "ACTIVE",

  });

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

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
        w-[600px]
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
          Add Project
        </h2>

        <div className="space-y-4">

          <input
            name="project_name"
            placeholder="Project Name"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <input
            name="project_code"
            placeholder="Project Code"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />
          <select
  name="client"
  value={form.client}
  onChange={handleChange}
  className="
  w-full
  p-3
  rounded-xl
  bg-white/10
  "
>

  <option value="">
    Select Client
  </option>

  {clients?.map(
    (client) => (

      <option
        key={client.id}
        value={client.id}
      >
        {client.username}
      </option>

    )
  )}

</select>

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <input
            type="date"
            name="start_date"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

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
            bg-gray-600
            rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(form)
            }
            className="
            px-4
            py-2
            bg-cyan-500
            rounded-xl
            "
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}