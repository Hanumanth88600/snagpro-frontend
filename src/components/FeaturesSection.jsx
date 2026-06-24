import {
  FaProjectDiagram,
  FaClipboardCheck,
  FaTools,
  FaUsers
}
from "react-icons/fa";

export default function FeaturesSection() {

  const features = [

    {
      icon: <FaProjectDiagram />,
      title: "Projects"
    },

    {
      icon: <FaClipboardCheck />,
      title: "Inspections"
    },

    {
      icon: <FaTools />,
      title: "Snags"
    },

    {
      icon: <FaUsers />,
      title: "Contractors"
    }

  ];

  return (

    <section
      className="
      py-20
      px-6
      "
    >

      <div
        className="
        max-w-6xl
        mx-auto
        "
      >

        <h2
          className="
          text-4xl
          font-bold
          text-center
          mb-12
          "
        >
          Key Features
        </h2>

        <div
          className="
          grid
          md:grid-cols-4
          gap-6
          "
        >

          {features.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="
                bg-white/10
                rounded-3xl
                p-8
                text-center
                "
              >

                <div
                  className="
                  text-4xl
                  text-cyan-400
                  mb-4
                  "
                >
                  {item.icon}
                </div>

                <h3
                  className="
                  text-xl
                  font-semibold
                  "
                >
                  {item.title}
                </h3>

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );

}