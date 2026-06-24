import { useState } from "react";

export default function AddInspectionModal({
  open,
  onClose,
  onSubmit,
  projects
}) {

  const [form, setForm] =
    useState({

      project: "",

      inspection_number: "",

      location: "",

      notes: "",

      inspection_date: ""
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

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="w-[600px] bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-2xl font-bold mb-6">
          Add Inspection
        </h2>

        <div className="space-y-4">

          <select
            name="project"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          >

            <option value="">
              Select Project
            </option>

            {
              projects.map(
                (project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.project_name}
                  </option>
                )
              )
            }

          </select>

          <input
            name="inspection_number"
            placeholder="Inspection Number"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <input
            type="date"
            name="inspection_date"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(form)
            }
            className="px-4 py-2 bg-cyan-500 rounded-xl"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );
}