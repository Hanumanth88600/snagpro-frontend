export default function HowItWorks() {

  const steps = [

    "Admin Creates Project",

    "Engineer Creates Inspection",

    "Engineer Adds Snags",

    "Admin Assigns Contractor",

    "Contractor Updates Status",

    "Client Tracks Progress"

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
          How It Works
        </h2>

        <div
          className="
          space-y-5
          "
        >

          {steps.map(
            (
              step,
              index
            ) => (

              <div
                key={index}
                className="
                bg-white/10
                p-5
                rounded-2xl
                "
              >

                {index + 1}.
                {" "}
                {step}

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );

}