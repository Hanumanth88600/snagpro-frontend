import { useState } from "react";

export default function AssignContractorModal({
  open,
  onClose,
  onAssign,
  contractors,
}) {

  const [contractorId,
    setContractorId] =
    useState("");

  if (!open) return null;

  const handleAssign = () => {

    if (!contractorId) {

      alert(
        "Please select contractor"
      );

      return;

    }

    onAssign(
      contractorId
    );

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
          Assign Contractor
        </h2>

        <select

          value={contractorId}

          onChange={(e) =>
            setContractorId(
              e.target.value
            )
          }

          className="
          w-full

          p-3

          rounded-xl

          bg-white/10
          "
        >

          <option value="">
            Select Contractor
          </option>

          {contractors.map(
            (contractor) => (

              <option
                key={contractor.id}
                value={contractor.id}
              >
                {
                  contractor.name
                }
              </option>

            )
          )}

        </select>

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
              handleAssign
            }

            className="
            px-4
            py-2

            rounded-xl

            bg-cyan-500
            "
          >
            Assign
          </button>

        </div>

      </div>

    </div>

  );

}