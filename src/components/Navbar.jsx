import { FaBell } from "react-icons/fa";

export default function Navbar() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (
    <div
      className="
      flex
      justify-between
      items-center

      bg-white/10
      backdrop-blur-xl

      border
      border-white/10

      rounded-3xl

      p-5

      mb-8
      "
    >

      <div>
        <h2
          className="
          text-2xl
          font-bold
          "
        >
          Welcome 👋
        </h2>

        <p
          className="
          text-white/60
          "
        >
          {user?.username || "Admin"}
        </p>
      </div>

      <div
        className="
        flex
        items-center
        gap-5
        "
      >

        <FaBell size={20} />

        <div
          className="
          w-10
          h-10

          rounded-full

          bg-cyan-500

          flex
          items-center
          justify-center

          font-bold
          "
        >
          {user?.username?.[0]?.toUpperCase() || "A"}
        </div>

      </div>

    </div>
  );
}