import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useAuth } from "../PROVIDERS/DataProvider";
import Thuso from "../PAGES/THUSO/thuso";
import { Image } from "@nextui-org/image";
import Logo from "../assets/logo.png";
import { Calendar } from "@nextui-org/calendar";
import { parseDate } from "@internationalized/date";
import { Card } from "@nextui-org/card";

const Layout = () => {
  const { currentUser, loading } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-[20rem]">
        <div>
          <Image src={Logo} className="h-[3rem]" />
          <div className="apploader ms-4"></div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/landing" replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="w-full border-b shadow-lg z-40">
        <Navbar toggleDrawer={toggleDrawer} />
      </header>

      <div className="p-8"></div>
      <div className="flex flex-grow">
        <aside className="z-50 border-r h-screen w-1/5 fixed top-0 bottom-0 pt-10">
          <Sidebar />
        </aside>
        <main className="ml-[20%] border-t w-full p-6 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Drawer with Backdrop Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleDrawer}
          ></div>

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 w-[20rem] h-full bg-white shadow-lg transform transition-transform duration-300 ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 z-auto flex justify-center">
              <div>
				<p>My Calendar</p>
                <Calendar
                  aria-label="Date (Uncontrolled)"
                  value={parseDate(
                    `${new Date().getFullYear()}-${
                      new Date().getMonth() + 1
                    }-${new Date().getDate()}`
                  )}
                />
                {/* <button onClick={toggleDrawer} className="mt-4 text-blue-500">
                  Close Drawer
                </button> */}
                <div className="mt-1">
                  <p className="text-center">Upcoming Events</p>
                  <div className="grid grid-col-3 py-3">
                    <Card>
                      <div className="p-3">
                        <div className="flex gap-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={20}
                              height={20}
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
                                d="M10 17L9.99999 13.3472C9.99999 13.1555 9.86325 13 9.69458 13H9M13.6297 17L14.9842 13.3492C15.0475 13.1785 14.9128 13 14.7207 13H13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 8H18"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-400">01 Nov</p>
                        </div>
                        <div className="flex gap-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={20}
                              height={20}
                              color={"#9b9b9b"}
                              fill={"none"}
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M9.5 9.5L12.9999 12.9996M16 8L11 13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-400">10 Dec</p>
                        </div>
                        <div className="flex gap-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={20}
                              height={20}
                              color={"#9b9b9b"}
                              fill={"none"}
                            >
                              <path
                                d="M11 13H16M8 13H8.00898M13 17H8M16 17H15.991"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 2V4M6 2V4"
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
                          </div>
						  <p className="text-gray-400">Business Studies Exam</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Thuso />
    </div>
  );
};

export default Layout;
