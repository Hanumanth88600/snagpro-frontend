export default function AboutSection() {

  return (

    <section
      className="
      py-24
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
          text-5xl
          font-bold
          text-center
          mb-6
          "
        >
          About SnagPro
        </h2>

        <p
          className="
          text-center
          text-white/60
          text-lg
          max-w-3xl
          mx-auto
          mb-12
          "
        >
          A modern construction snagging and inspection
          management platform designed to streamline
          project quality control, issue tracking,
          contractor coordination and client reporting.
        </p>

        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          "
        >

          <h3
            className="
            text-3xl
            font-bold
            mb-6
            text-cyan-400
            "
          >
            Construction Snagging & Inspection
            Management System
          </h3>

          <p
            className="
            text-lg
            leading-8
            text-white/80
            mb-6
            "
          >
            SnagPro is a complete digital solution for
            managing construction projects from inspection
            to final handover. It enables construction
            companies, engineers, contractors and clients
            to collaborate efficiently through a centralized
            platform.
          </p>

          <p
            className="
            text-lg
            leading-8
            text-white/80
            "
          >
            Traditional snagging processes rely heavily on
            spreadsheets, paper reports and manual follow-ups.
            SnagPro digitizes the entire workflow, helping
            teams identify defects faster, assign responsibility,
            track progress and ensure issues are resolved on time.
          </p>

        </div>

        {/* Project Aim */}

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          mt-10
          "
        >

          <div
            className="
            bg-cyan-500/10
            border
            border-cyan-500/20
            rounded-3xl
            p-6
            "
          >

            <h3
              className="
              text-2xl
              font-bold
              mb-4
              text-cyan-400
              "
            >
              🎯 Project Aim
            </h3>

            <p
              className="
              text-white/80
              leading-8
              "
            >
              To provide a centralized platform where
              construction teams can manage inspections,
              create snags, assign contractors, monitor
              progress and generate reports efficiently.
            </p>

          </div>

          <div
            className="
            bg-green-500/10
            border
            border-green-500/20
            rounded-3xl
            p-6
            "
          >

            <h3
              className="
              text-2xl
              font-bold
              mb-4
              text-green-400
              "
            >
              🚀 Benefits
            </h3>

            <ul
              className="
              space-y-3
              text-white/80
              "
            >

              <li>
                ✓ Faster snag resolution
              </li>

              <li>
                ✓ Improved communication
              </li>

              <li>
                ✓ Better project visibility
              </li>

              <li>
                ✓ Real-time status tracking
              </li>

              <li>
                ✓ Reduced paperwork
              </li>

            </ul>

          </div>

        </div>

        {/* User Roles */}

        <div
          className="
          mt-12
          "
        >

          <h3
            className="
            text-3xl
            font-bold
            text-center
            mb-8
            "
          >
            Platform Roles
          </h3>

          <div
            className="
            grid
            md:grid-cols-4
            gap-6
            "
          >

            <div
              className="
              bg-white/10
              rounded-3xl
              p-6
              text-center
              "
            >

              <h4
                className="
                text-xl
                font-bold
                mb-3
                text-cyan-400
                "
              >
                Company Admin
              </h4>

              <p
                className="
                text-white/70
                "
              >
                Creates projects,
                manages staff and
                monitors progress.
              </p>

            </div>

            <div
              className="
              bg-white/10
              rounded-3xl
              p-6
              text-center
              "
            >

              <h4
                className="
                text-xl
                font-bold
                mb-3
                text-green-400
                "
              >
                Site Engineer
              </h4>

              <p
                className="
                text-white/70
                "
              >
                Conducts inspections
                and creates snags.
              </p>

            </div>

            <div
              className="
              bg-white/10
              rounded-3xl
              p-6
              text-center
              "
            >

              <h4
                className="
                text-xl
                font-bold
                mb-3
                text-yellow-400
                "
              >
                Contractor
              </h4>

              <p
                className="
                text-white/70
                "
              >
                Resolves assigned
                snag issues and
                updates status.
              </p>

            </div>

            <div
              className="
              bg-white/10
              rounded-3xl
              p-6
              text-center
              "
            >

              <h4
                className="
                text-xl
                font-bold
                mb-3
                text-purple-400
                "
              >
                Client
              </h4>

              <p
                className="
                text-white/70
                "
              >
                Tracks project
                progress and views
                completed work.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}