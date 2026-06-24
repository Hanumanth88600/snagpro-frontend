import { useEffect, useState } from "react";

export default function EditSnagModal({
  open,
  onClose,
  onSave,
  snag,
}) {

  const [form, setForm] =
    useState({

      title: "",

      description: "",

      priority: "LOW",

      status: "OPEN",

    });

  useEffect(() => {

    if (snag) {

      setForm({

        title:
          snag.title || "",

        description:
          snag.description || "",

        priority:
          snag.priority || "LOW",

        status:
          snag.status || "OPEN",

      });

    }

  }, [snag]);

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = () => {

    onSave(form);

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
          Edit Snag
        </h2>

        <div
          className="
          space-y-4
          "
        >

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          >

            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>

            <option value="CRITICAL">
              CRITICAL
            </option>

          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          >

            <option value="OPEN">
              OPEN
            </option>

            <option value="IN_PROGRESS">
              IN_PROGRESS
            </option>

            <option value="COMPLETED">
              COMPLETED
            </option>

            <option value="VERIFIED">
              VERIFIED
            </option>

            <option value="APPROVED">
              APPROVED
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
            onClick={handleSubmit}
            className="
            px-4
            py-2

            rounded-xl

            bg-cyan-500
            "
          >
            Update
          </button>

        </div>

      </div>

    </div>

  );

}