export default function ViewCredentialsModal({

  open,

  credentials,

  onClose,

}) {

  if (
    !open ||
    !credentials
  ) return null;

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
          Staff Credentials
        </h2>

        <div
          className="
          space-y-4
          "
        >

          <div>

            <p
              className="
              text-white/60
              "
            >
              Username
            </p>

            <p>
              {
                credentials.username
              }
            </p>

          </div>

          <div>

            <p
              className="
              text-white/60
              "
            >
              Password
            </p>

            <p>
              {
                credentials.password
              }
            </p>

          </div>

          <div>

            <p
              className="
              text-white/60
              "
            >
              Role
            </p>

            <p>
              {
                credentials.role
              }
            </p>

          </div>

        </div>

        <div
          className="
          flex
          justify-end

          mt-6
          "
        >

          <button

            onClick={onClose}

            className="
            px-4
            py-2

            rounded-xl

            bg-cyan-500
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

}