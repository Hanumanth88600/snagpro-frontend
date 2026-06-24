import { useState, useEffect } from "react";

export default function EditInspectionModal({
  open,
  onClose,
  inspection,
  onSave
}) {

  const [form, setForm] =
    useState({});

  useEffect(() => {

    if (inspection) {

      setForm(inspection);

    }

  }, [inspection]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="w-[600px] bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-2xl font-bold mb-6">
          Edit Inspection
        </h2>

        <div className="space-y-4">

          <input
            value={
              form.inspection_number || ""
            }
            onChange={(e) =>
              setForm({
                ...form,
                inspection_number:
                  e.target.value
              })
            }
            className="w-full p-3 rounded-xl bg-white/10"
          />

          <input
            value={
              form.location || ""
            }
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
            value={
              form.notes || ""
            }
            onChange={(e) =>
              setForm({
                ...form,
                notes:
                  e.target.value
              })
            }
            className="w-full p-3 rounded-xl bg-white/10"
          />

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
            className="bg-cyan-500 px-4 py-2 rounded-xl"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );
}