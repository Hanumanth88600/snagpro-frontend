import { useState } from "react";

export default function AddSnagModal({
  open,
  onClose,
  onSubmit,
  inspections,
}) {

  const [form, setForm] =
    useState({

      inspection: "",

      title: "",

      description: "",

      priority: "LOW",

    });

  const [images, setImages] =
    useState([]);

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

const resetForm = () => {

  setForm({
    inspection: "",
    title: "",
    description: "",
    priority: "LOW",
  });

  setImages([]);

};
  const handleSubmit = async () => {
    if (
  !form.inspection ||
  !form.title.trim()
) {

  alert(
    "Inspection and Title are required"
  );

  return;

}

  const formData =
    new FormData();

  formData.append(
    "inspection",
    form.inspection
  );

  formData.append(
    "title",
    form.title
  );

  formData.append(
    "description",
    form.description
  );

  formData.append(
    "priority",
    form.priority
  );

  images.forEach(image => {

    formData.append(
      "images",
      image
    );

  });

  await onSubmit(
    formData
  );

  resetForm();

  onClose();

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
        w-[700px]
        max-h-[90vh]
        overflow-y-auto
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
          Add Snag
        </h2>

        <div
          className="
          space-y-4
          "
        >

          <select
            name="inspection"
            value={form.inspection}
            onChange={handleChange}
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            cursor-pointer
            "
          >

            <option value="">
              Select Inspection
            </option>

            {inspections.map(
              (item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.inspection_number}
                </option>

              )
            )}

          </select>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="
            w-full
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
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
  cursor-pointer
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

          {/* Multiple Images Upload */}

          <div>

            <label
              className="
              block
              mb-2
              text-sm
              "
            >
              Upload Images
            </label>

           <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {

  const newFiles =
    Array.from(
      e.target.files
    );

  setImages(prev => [
    ...prev,
    ...newFiles
  ]);

  e.target.value = "";

}}
  className="
  w-full
  p-3
  rounded-xl
  bg-white/10
  cursor-pointer
  "
/>

          </div>

          {/* Preview Images */}

          {images.length > 0 && (

            <div
              className="
              grid
              grid-cols-3
              gap-3
              "
            >

              {images.map(
  (image, index) => (

    <div
      key={index}
      className="
      relative
      "
    >

      <img
        src={URL.createObjectURL(image)}
        alt=""
        className="
        h-24
        w-full
        object-cover
        rounded-xl
        "
      />

      <button
        type="button"
        onClick={() => {

         setImages(prev =>
  prev.filter(
    (_, i) => i !== index
  )
);

        }}
        className="
        absolute
        top-1
        right-1

        bg-red-500

        text-white

        w-6
        h-6

        rounded-full

        flex
        items-center
        justify-center

        text-xs

        cursor-pointer
        "
      >
        ✕
      </button>

    </div>

  )
)}

            </div>

          )}

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
            onClick={() => {

  resetForm();

  onClose();

}}
            className="
            px-4
            py-2
            rounded-xl
            bg-gray-600
            cursor-pointer
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
            cursor-pointer
            "
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}