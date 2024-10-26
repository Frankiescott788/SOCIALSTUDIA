import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Image,
  Badge,
} from "@nextui-org/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../DATABASE/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../PROVIDERS/DataProvider";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

const handleLogOut = () => {
  signOut(auth)
    .then(() => {
      Navigate("/signin");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};

export default function Navbar({ toggleDrawer }) {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { currentUser, loading } = useAuth();
  const user = currentUser.personalInfo;

  return (
    <div className="fixed bg-white border-b  top-0 left-0 right-0  p-4 w-full ms-[19rem] pe-[22rem]">
      <div className="flex justify-between ">
        <div className=" flex mt-3">
          <span className="text-gray-400">Home</span>
          <span className="mx-1 text-xl text-gray-400">{">"}</span>
          {pathname === "/" ? (
            <span className="text-[#0496ff] font-semibold"> Dashboard </span>
          ) : pathname === "/profile" ? (
            <span className="text-[#0496ff] font-semibold"> Profile </span>
          ) : pathname === "/notes" ? (
            <span className="text-[#0496ff] font-semibold"> Notes </span>
          ) : pathname === "/notes/allnotes" ? (
            <span className="text-[#0496ff] font-semibold"> All Notes </span>
          ) : pathname === "/notes/createnote" ? (
            <span className="text-[#0496ff] font-semibold"> Create Note </span>
          ) : pathname === "/activity" ? (
            <span className="text-[#0496ff] font-semibold"> Activity </span>
          ) : pathname === "/activity/challanges" ? (
            <span className="text-[#0496ff] font-semibold"> Challanges </span>
          ) : pathname === "/activity/quiz" ? (
            <span className="text-[#0496ff] font-semibold"> Quiz </span>
          ) : pathname === "/forums" ? (
            <span className="text-[#0496ff] font-semibold"> Forums </span>
          ) : pathname === "/forums/addForum" ? (
            <span className="text-[#0496ff] font-semibold"> Add Forum </span>
          ) : pathname === "/forums/forum" ? (
            <span className="text-[#0496ff] font-semibold"> Forum </span>
          ) : pathname === "/subjects" ? (
            <span className="text-[#0496ff] font-semibold"> Subjects </span>
          ) : pathname === "/subjects/subject" ? (
            <span className="text-[#0496ff] font-semibold"> Subject </span>
          ) : pathname === "/signin" ? (
            <span className="text-[#0496ff] font-semibold"> Sign In </span>
          ) : pathname === "/signup" ? (
            <span className="text-[#0496ff] font-semibold"> Sign Up </span>
          ) : pathname === "/landingpage" ? (
            <span className="text-[#0496ff] font-semibold"> Landing Page </span>
          ) : pathname === "/thuso" ? (
            <span className="text-[#0496ff] font-semibold"> Thuso </span>
          ) : pathname === "/aichat" ? (
            <span className="text-[#0496ff] font-semibold"> AI Chat </span>
          ) : (
            <span className=""> </span>
          )}
        </div>
        <div className="flex gap-5">
          <button className="mt-1" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#9b9b9b"}
              fill={"none"}
            >
              <path
                d="M18 2V4M6 2V4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 8H20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="mt-3">
            <Badge content={2} className="bg-[#0496ff] text-white">
              <button >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#9b9b9b"}
                  fill={"none"}
                >
                  <path
                    d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Badge>
          </div>
          <Dropdown placement="bottom-start ">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?semt=ais_hybrid",
                }}
                className="transition-transform"
                description={user.email}
                name={`${user.firstName} ${user.surname} (${currentUser?.activity.points})`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">
                  {" "}
                  {` ${user.username}  (${currentUser?.activity.points})`}
                </p>
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate("/profile")}
                key="configurations"
              >
                Profile
              </DropdownItem>
              <DropdownItem onClick={handleLogOut} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
