import {
  FaGithub,
  FaLinkedin
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer
      className="
      py-10
      text-center
      border-t
      border-white/10
      bg-slate-950
      "
    >

      <h3
        className="
        text-2xl
        font-bold
        text-cyan-400
        "
      >
        SnagPro
      </h3>

      <p
        className="
        text-white/60
        mt-3
        "
      >
        Developed By
        {" "}
        <span
          className="
          text-white
          font-semibold
          "
        >
          Hanumanth H
        </span>
      </p>

      <p
        className="
        text-white/60
        "
      >
        MCA Graduate |
        Full Stack Developer
      </p>

      {/* Social Links */}

      <div
        className="
        flex
        justify-center
        gap-6
        mt-6
        "
      >

        <a
          href="https://github.com/Hanumanth88600"
          target="_blank"
          rel="noopener noreferrer"
          className="
          text-white/70
          hover:text-cyan-400
          transition
          text-3xl
          "
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/hanumanthappah-3759b4367/"
          target="_blank"
          rel="noopener noreferrer"
          className="
          text-white/70
          hover:text-cyan-400
          transition
          text-3xl
          "
        >
          <FaLinkedin />
        </a>

      </div>

      <p
        className="
        text-white/40
        text-sm
        mt-6
        "
      >
        © 2026 SnagPro.
        All Rights Reserved.
      </p>

    </footer>

  );

}