import MainLayout from "../layouts/MainLayout";

import {
useEffect,
useState
} from "react";

import {
getAssignedSnags,
updateSnagStatus
} from "../api/snagApi";

export default function AssignedSnags() {

const [snags, setSnags] =
useState([]);

useEffect(() => {

fetchSnags();

}, []);

const fetchSnags = async () => {

try {

  const data =
    await getAssignedSnags();

  setSnags(data);

} catch (err) {

  console.log(err);

}

};

const handleStartWork =
async (snagId) => {

  try {

    await updateSnagStatus(
      snagId,
      "IN_PROGRESS"
    );

    fetchSnags();

  } catch (err) {

    console.log(err);

  }

};

const handleComplete =
async (snagId) => {

  try {

    await updateSnagStatus(
      snagId,
      "COMPLETED"
    );

    fetchSnags();

  } catch (err) {

    console.log(err);

  }

};

return (

<MainLayout
  showNavbar={false}
>

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
        Assigned Snags
      </h1>

      <p
        className="
        text-white/60
        "
      >
        Update Assigned Work
      </p>

    </div>

  </div>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-6
    "
  >

    {snags.map(
      snag => (

        <div
          key={snag.id}
          className="
          bg-white/10
          backdrop-blur-xl

          rounded-3xl

          p-6

          border
          border-white/10
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            "
          >
            {snag.title}
          </h2>

          <p
            className="
            mt-3
            "
          >
            {snag.description}
          </p>

          <p
            className="
            mt-3
            "
          >
            Priority:
            {" "}
            {snag.priority}
          </p>

          <p
            className="
            mt-2
            "
          >
            Status:
            {" "}
            {snag.status}
          </p>

          <div
            className="
            flex
            gap-3

            mt-5
            "
          >

            {snag.status ===
              "OPEN" && (

              <button

                onClick={() =>
                  handleStartWork(
                    snag.id
                  )
                }

                className="
                flex-1

                py-2

                rounded-xl

                bg-yellow-500/20

                text-yellow-300
                "
              >
                Start Work
              </button>

            )}

            {snag.status ===
              "IN_PROGRESS" && (

              <button

                onClick={() =>
                  handleComplete(
                    snag.id
                  )
                }

                className="
                flex-1

                py-2

                rounded-xl

                bg-green-500/20

                text-green-300
                "
              >
                Complete
              </button>

            )}

          </div>

        </div>

      )
    )}

  </div>

</MainLayout>

);

}