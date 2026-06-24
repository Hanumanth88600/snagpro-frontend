export default function CredentialsModal({
  open,
  onClose,
  credentials,
}) {

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
        w-[450px]

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
          Staff Credentials
        </h2>

        <div
          className="
          space-y-4
          "
        >

          <div>

            <p>Username</p>

            <div
              className="
              p-3

              bg-white/10

              rounded-xl
              "
            >
              {
                credentials?.username
              }
            </div>

          </div>

          <div>

            <p>Password</p>

            <div
              className="
              p-3

              bg-white/10

              rounded-xl
              "
            >
              {
                credentials?.password
              }
            </div>

          </div>

        </div>

        <button

          onClick={onClose}

          className="
          mt-6

          bg-cyan-500

          px-5

          py-3

          rounded-xl
          "
        >
          Close
        </button>

      </div>

    </div>

  );

}