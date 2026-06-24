import { useState, useEffect } from "react";

export default function EditStaffModal({
  open,
  onClose,
  user,
  onSave,
}) {

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      role: "",
    });

  useEffect(() => {

    if (user) {

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
      });

    }

  }, [user]);

  if (!open) return null;

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
          Edit Staff
        </h2>

        <div className="space-y-4">

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Name"
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <input
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            placeholder="Email"
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <input
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            placeholder="Phone"
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          >
            <option value="SITE_ENGINEER">
              Site Engineer
            </option>

            <option value="CONTRACTOR">
              Contractor
            </option>

            <option value="CLIENT">
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
            onClick={() =>
              onSave(form)
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