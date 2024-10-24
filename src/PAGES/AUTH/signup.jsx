import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../DATABASE/firebase";
import Activity from "../ACTIVITY/activity";
import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { email, password, name, username } = formData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid; // Get the user ID
        // Add user data to Firestore users collection with user ID
        const userRef = doc(db, "users", userId); // Specify the collection reference and document ID separately
        return setDoc(userRef, {
          personalInfo: {
            email,
            name,
            username,
            password,
            userId,
          },
          activity: { points: 5 },
        });
      })

      .then(() => {
        // Automatic sign-in after successful account creation
        return signInWithEmailAndPassword(auth, email, password).then(
          navigate("/")
        );
      })
      .then(() => {
        setError("User signed up successfully!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError(
            "This email is already in use. Please try a different email."
          );
        } else {
          setError("Error signing up: " + error.message);
        }
      });
  };

  return (
    <div className="grid grid-cols-12 px-5 mt-2 pt-[2rem]">
      <div className="col-span-12 absolute top-0 left-0 ms-[6rem]">
        <Image src="logo.png" alt="logo" className="w-[15rem]" />
        
      </div>
      <div className="col-span-6 pt-[5rem]">
        <Card className="w-full max-w-lg p-6  rounded-lg  shadow-none ms-[5rem]">
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <div className="">
            <p className="text-3xl">Sign up</p>
            <p className="text-gray-400 text-sm">
              what our app is about.
            </p>
          </div>
          <form className="mt-4">
            <div className="mb-6">
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className=""
                label="Firstname"
              />
            </div>
            <div className="mb-6">
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full "
                label="Username"
              />
            </div>
            <div className="mb-6">
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
              />
            </div>
            <div className="">
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
              />
            </div>
            <div className="text-center mt-5">
              <Button
                onClick={handleSubmit}
                className="bg-[#0496ff] shadowed-btn text-white px-[10rem]"
              >
                Sign up
              </Button>
            </div>
            <p className="text-center mt-3 text-gray-400">
              Don't Have an Account Yet?{" "}
              <Link to="/signin" className="text-[#0496ff]">
                Login Now.
              </Link>
            </p>
          </form>
        </Card>
      </div>
      <div className="col-span-6 sign-up-image h-[90dvh] rounded-md">
        <div className="pt-[15rem]">
          <p className="text-5xl text-white text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            impedit.
          </p>
        </div>
      </div>
    </div>
  );
}
