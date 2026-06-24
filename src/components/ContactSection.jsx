import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {

  const [form, setForm] =
    useState({

      name: "",

      company: "",

      email: "",

      phone: "",

      message: ""

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        await emailjs.send(

          "service_u1zglng",

          "template_jjdsdk7",

          {

            name:
              form.name,

            company:
              form.company,

            email:
              form.email,

            phone:
              form.phone,

            message:
              form.message

          },

          "oxJNyl0TAwwnbJAnc"

        );

        alert(
          "Request Sent Successfully!"
        );

        setForm({

          name: "",

          company: "",

          email: "",

          phone: "",

          message: ""

        });

      }

      catch (err) {

  console.error(
    "EMAIL ERROR:",
    err
  );

  alert(
    err?.text ||
    err?.message ||
    "Failed to Send Request"
  );

}

      finally {

        setLoading(false);

      }

    };

  return (

    <section
      className="
      py-24
      px-6
      bg-slate-950
      "
    >

      <div
        className="
        max-w-4xl
        mx-auto
        "
      >

        <h2
          className="
          text-4xl
          font-bold
          text-center
          mb-4
          text-white
          "
        >
          Request Demo Access
        </h2>

        <p
          className="
          text-center
          text-slate-400
          mb-10
          "
        >
          Interested in trying SnagPro?

          Fill out the form below.

          Demo credentials and usage
          instructions will be shared
          after review.
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="
          bg-white/10
          backdrop-blur-xl
          rounded-3xl
          p-8
          space-y-5
          "
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={
              handleChange
            }
            required
            className="
            w-full
            p-4
            rounded-xl
            bg-white/10
            text-white
            "
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={
              handleChange
            }
            required
            className="
            w-full
            p-4
            rounded-xl
            bg-white/10
            text-white
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={
              handleChange
            }
            required
            className="
            w-full
            p-4
            rounded-xl
            bg-white/10
            text-white
            "
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/10
            text-white
            "
          />

          <textarea
            rows={5}
            name="message"
            placeholder="
            Tell us about your project
            "
            value={form.message}
            onChange={
              handleChange
            }
            required
            className="
            w-full
            p-4
            rounded-xl
            bg-white/10
            text-white
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            py-4
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-400
            text-white
            font-semibold
            cursor-pointer
            "
          >

            {
              loading
                ? "Sending..."
                : "Request Demo Access"
            }

          </button>

        </form>

      </div>

    </section>

  );

}