import MainLayout from "../layouts/MainLayout";
import { useState } from "react";

import {
  updateProfile,
  changePassword as changePasswordApi
}
from "../api/settingsApi";

export default function Settings() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [profile, setProfile] =
    useState({

      username:
        user?.username || "",

      email:
        user?.email || "",

      first_name:
        user?.first_name || ""

    });

  const [passwords, setPasswords] =
    useState({

      old_password: "",

      new_password: "",

      confirm_password: ""

    });

  const handleProfileChange =
    (e) => {

      setProfile({

        ...profile,

        [e.target.name]:
          e.target.value

      });

    };

  const handlePasswordChange =
    (e) => {

      setPasswords({

        ...passwords,

        [e.target.name]:
          e.target.value

      });

    };

  const saveProfile =
    async () => {

      try {

        const updatedUser =
          await updateProfile(
            profile
          );

        localStorage.setItem(
          "user",
          JSON.stringify({

            ...user,

            ...updatedUser

          })
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed To Update Profile"
        );

      }

    };

  const handlePasswordUpdate =
    async () => {

      if (

        !passwords.old_password ||

        !passwords.new_password ||

        !passwords.confirm_password

      ) {

        alert(
          "All Fields Are Required"
        );

        return;

      }

      if (

        passwords.new_password !==
        passwords.confirm_password

      ) {

        alert(
          "Passwords Do Not Match"
        );

        return;

      }

      try {

        await changePasswordApi({

          old_password:
            passwords.old_password,

          new_password:
            passwords.new_password

        });

        alert(
          "Password Updated Successfully"
        );

        setPasswords({

          old_password: "",

          new_password: "",

          confirm_password: ""

        });

      } catch (err) {

        console.log(err);

        alert(
          "Current Password Incorrect"
        );

      }

    };

  return (

    <MainLayout>

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Settings
      </h1>

      {/* PROFILE */}

      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-6
        mb-8
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-6
          "
        >
          Profile Settings
        </h2>

        <div
          className="
          grid
          md:grid-cols-2
          gap-4
          "
        >

          <input
            name="username"
            value={profile.username}
            onChange={
              handleProfileChange
            }
            placeholder="Username"
            className="
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <input
            name="email"
            value={profile.email}
            onChange={
              handleProfileChange
            }
            placeholder="Email"
            className="
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <input
            name="first_name"
            value={profile.first_name}
            onChange={
              handleProfileChange
            }
            placeholder="Name"
            className="
            p-3
            rounded-xl
            bg-white/10
            "
          />

        </div>

        <button
          onClick={saveProfile}
          className="
          mt-6
          px-5
          py-3
          bg-cyan-500
          rounded-xl
          cursor-pointer
          "
        >
          Save Profile
        </button>

      </div>

      {/* PASSWORD */}

      <div
        className="
        bg-white/10
        backdrop-blur-xl
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
          Change Password
        </h2>

        <div
          className="
          grid
          md:grid-cols-2
          gap-4
          "
        >

          <input
            type="password"
            name="old_password"
            placeholder="Current Password"
            value={
              passwords.old_password
            }
            onChange={
              handlePasswordChange
            }
            className="
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={
              passwords.new_password
            }
            onChange={
              handlePasswordChange
            }
            className="
            p-3
            rounded-xl
            bg-white/10
            "
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={
              passwords.confirm_password
            }
            onChange={
              handlePasswordChange
            }
            className="
            p-3
            rounded-xl
            bg-white/10
            "
          />

        </div>

        <button
          onClick={
            handlePasswordUpdate
          }
          className="
          mt-6
          px-5
          py-3
          bg-green-500
          rounded-xl
          cursor-pointer
          "
        >
          Change Password
        </button>

      </div>

    </MainLayout>

  );

}