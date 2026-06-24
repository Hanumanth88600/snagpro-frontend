import { useEffect, useState } from "react";

export default function EditProjectModal({
  open,
  project,
  onClose,
  onSave,
}) {

  const [form, setForm] =
    useState({});

  useEffect(() => {

    if (project) {

      setForm(project);

    }

  }, [project]);

  if (!open || !project)
    return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="w-[600px] bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-2xl font-bold mb-6">
          Edit Project
        </h2>

        <div className="space-y-4">

          <input
            value={form.project_name || ""}
            onChange={(e) =>
              setForm({
                ...form,
                project_name:
                  e.target.value
              })
            }
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <input
            value={form.location || ""}
            onChange={(e) =>
              setForm({
                ...form,
                location:
                  e.target.value
              })
            }
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <textarea
            value={form.description || ""}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value
              })
            }
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <select
            value={form.status || ""}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value
              })
            }
            className="w-full p-3 rounded-xl bg-white/10"
          >
            <option value="PLANNING">
              Planning
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="ON_HOLD">
              On Hold
            </option>

          </select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave(form)
            }
            className="
            bg-cyan-500
            px-4
            py-2
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