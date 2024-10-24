import { Image } from "@nextui-org/image";
import { Link, useLocation, useMatch } from "react-router-dom";
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function Sidebar() {
  const [show, setShow] = useState(true);

  /*	const driverObj = driver({
			showProgress: true,
			steps: [
				{ element: '#confirm-destroy-example', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' }},
				{ element: 'code .line:nth-child(1)', popover: { title: 'Import the Library', description: 'It works the same in vanilla JavaScript as well as frameworks.', side: "bottom", align: 'start' }},
				{ element: 'code .line:nth-child(2)', popover: { title: 'Importing CSS', description: 'Import the CSS which gives you the default styling for popover and overlay.', side: "bottom", align: 'start' }},
				{ popover: { title: 'Happy Coding', description: 'And that is all, go ahead and start adding tours to your applications.' } }
			],
			// onDestroyStarted is called when the user tries to exit the tour
			onDestroyStarted: () => {
				if (!driverObj.hasNextStep() || confirm("Are you sure?")) {
				driverObj.destroy();
				setShow(false)
				}
			},
			});
						*/

  const location = useLocation();

  const { pathname } = useLocation();

  const dashboardMatch = useMatch("/dashboard/*");
  const thusoMatch = useMatch("/thuso/*");
  const subjectsMatch = useMatch("/subjects/*");
  const forumsMatch = useMatch("/forums/*");
  const activityMatch = useMatch("/activity/*");

  const getActiveClass = (match) =>
    match
      ? "bg-[#0496ff] text-white shadowed-btn animate__animated animate__fadeIn"
      : "text-gray-700 hover:text-green-600";
  const DashboardIcon = (match) => (match ? "white" : "black");
  return (
    <aside className="w-ful bg-white px-3 h-full">
      <div className="text-center flex justify-center absolute top-0">
        <Image src="logo.png" className="w-[15rem]" alt="Logo" />
      </div>

      <ul className="px-1 mt-[3rem]">
        <Link to="/">
          <li
            className={`flex gap-2 py-2 px-2 rounded-md mb-2 ${
              pathname == "/"
                ? "bg-[#0496ff] text-white shadowed-btn"
                : "text-gray-700 hover:text-green-600"
            } anim`}
            id="home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={20}
              height={20}
              color={DashboardIcon}
              fill={"none"}
              className="mt-1"
            >
              <path
                d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8V6Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 19C2 18.0681 2 17.6022 2.15224 17.2346C2.35523 16.7446 2.74458 16.3552 3.23463 16.1522C3.60218 16 4.06812 16 5 16H7C7.93188 16 8.39782 16 8.76537 16.1522C9.25542 16.3552 9.64477 16.7446 9.84776 17.2346C10 17.6022 10 18.0681 10 19C10 19.9319 10 20.3978 9.84776 20.7654C9.64477 21.2554 9.25542 21.6448 8.76537 21.8478C8.39782 22 7.93188 22 7 22H5C4.06812 22 3.60218 22 3.23463 21.8478C2.74458 21.6448 2.35523 21.2554 2.15224 20.7654C2 20.3978 2 19.9319 2 19Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M14 16C14 14.1144 14 13.1716 14.5858 12.5858C15.1716 12 16.1144 12 18 12C19.8856 12 20.8284 12 21.4142 12.5858C22 13.1716 22 14.1144 22 16V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V16Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M14 5C14 4.06812 14 3.60218 14.1522 3.23463C14.3552 2.74458 14.7446 2.35523 15.2346 2.15224C15.6022 2 16.0681 2 17 2H19C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5C22 5.93188 22 6.39782 21.8478 6.76537C21.6448 7.25542 21.2554 7.64477 20.7654 7.84776C20.3978 8 19.9319 8 19 8H17C16.0681 8 15.6022 8 15.2346 7.84776C14.7446 7.64477 14.3552 7.25542 14.1522 6.76537C14 6.39782 14 5.93188 14 5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>

            <div className="text-lg">Dashboard</div>
          </li>
        </Link>

        {/*
				<Link to="/thuso">
					<li
						className={`flex gap-1 my-3 ${getActiveClass(
							thusoMatch
						)} rounded-md animate__animated animate__fadeInLeft animate__slow`}
						id="thuso"
					>
						<div className="mt-1 py-2 px-2">

				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width={20}
					height={20}
					color={"#000000"}
					fill={"none"}
				>
					<path
						d="M11 8H13C15.8284 8 17.2426 8 18.1213 8.87868C19 9.75736 19 11.1716 19 14C19 16.8284 19 18.2426 18.1213 19.1213C17.2426 20 15.8284 20 13 20H12C12 20 11.5 22 8 22C8 22 9 20.9913 9 19.9827C7.44655 19.9359 6.51998 19.7626 5.87868 19.1213C5 18.2426 5 16.8284 5 14C5 11.1716 5 9.75736 5.87868 8.87868C6.75736 8 8.17157 8 11 8Z"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinejoin="round"
					/>
					<path
						d="M19 11.5H19.5C20.4346 11.5 20.9019 11.5 21.25 11.701C21.478 11.8326 21.6674 12.022 21.799 12.25C22 12.5981 22 13.0654 22 14C22 14.9346 22 15.4019 21.799 15.75C21.6674 15.978 21.478 16.1674 21.25 16.299C20.9019 16.5 20.4346 16.5 19.5 16.5H19"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinejoin="round"
					/>
					<path
						d="M5 11.5H4.5C3.56538 11.5 3.09808 11.5 2.75 11.701C2.52197 11.8326 2.33261 12.022 2.20096 12.25C2 12.5981 2 13.0654 2 14C2 14.9346 2 15.4019 2.20096 15.75C2.33261 15.978 2.52197 16.1674 2.75 16.299C3.09808 16.5 3.56538 16.5 4.5 16.5H5"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinejoin="round"
					/>
					<path
						d="M13.5 3.5C13.5 4.32843 12.8284 5 12 5C11.1716 5 10.5 4.32843 10.5 3.5C10.5 2.67157 11.1716 2 12 2C12.8284 2 13.5 2.67157 13.5 3.5Z"
						stroke="currentColor"
						strokeWidth="1.5"
					/>
					<path
						d="M12 5V8"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M9 12V13M15 12V13"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M10 16.5C10 16.5 10.6667 17 12 17C13.3333 17 14 16.5 14 16.5"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</div>
			<div className="text-lg mt-2">Thuso</div>
		</li>
				</Link >


*/}

        <Link to="/subjects">
          <li
            className={`flex gap-1 mb-3 rounded-md ${getActiveClass(
              subjectsMatch
            )}`}
            id="subjects"
          >
            <div className="mt-1 py-2 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={DashboardIcon}
                fill={"none"}
              >
                <path
                  d="M2 8C2 9.34178 10.0949 13 11.9861 13C13.8772 13 21.9722 9.34178 21.9722 8C21.9722 6.65822 13.8772 3 11.9861 3C10.0949 3 2 6.65822 2 8Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.99414 11L6.23925 16.6299C6.24415 16.7426 6.25634 16.8555 6.28901 16.9635C6.38998 17.2973 6.57608 17.6006 6.86 17.8044C9.08146 19.3985 14.8901 19.3985 17.1115 17.8044C17.3956 17.6006 17.5816 17.2973 17.6826 16.9635C17.7152 16.8555 17.7274 16.7426 17.7324 16.6299L17.9774 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.4734 9.5V16.5M20.4734 16.5C19.6814 17.9463 19.3312 18.7212 18.9755 20C18.8983 20.455 18.9596 20.6843 19.2732 20.8879C19.4006 20.9706 19.5537 21 19.7055 21H21.2259C21.3876 21 21.5507 20.9663 21.6838 20.8745C21.9753 20.6735 22.0503 20.453 21.9713 20C21.6595 18.8126 21.2623 18.0008 20.4734 16.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-lg mt-2">Subjects</div>
          </li>
        </Link>
        <Link to="/forums">
          <li
            className={`flex gap-1 my-3 ${getActiveClass(
              forumsMatch
            )}`}
            id="forums"
          >
            <div className="mt-1 py-2 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#000000"}
                fill={"none"}
              >
                <path
                  d="M8 13.5H16M8 8.5H12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-lg mt-2">Forums</div>
          </li>
        </Link>

        <Link to="/activity">
          <li
            className={`flex gap-1 my-3 ${getActiveClass(
              activityMatch
            )} `}
          >
            <div className="mt-1 py-2 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#000000"}
                fill={"none"}
              >
                <path
                  d="M6.08938 14.9992C5.71097 14.1486 5.5 13.2023 5.5 12.2051C5.5 8.50154 8.41015 5.49921 12 5.49921C15.5899 5.49921 18.5 8.50154 18.5 12.2051C18.5 13.2023 18.289 14.1486 17.9106 14.9992"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 1.99921V2.99921"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 11.9992H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 11.9992H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.0704 4.92792L18.3633 5.63503"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.6368 5.636L4.92969 4.92889"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.517 19.3056C15.5274 18.9788 15.9326 18.054 16.0466 17.1238C16.0806 16.8459 15.852 16.6154 15.572 16.6154L8.47685 16.6156C8.18725 16.6156 7.95467 16.8614 7.98925 17.1489C8.1009 18.0773 8.3827 18.7555 9.45345 19.3056M14.517 19.3056C14.517 19.3056 9.62971 19.3056 9.45345 19.3056M14.517 19.3056C14.3955 21.2506 13.8338 22.0209 12.0068 21.9993C10.0526 22.0354 9.60303 21.0833 9.45345 19.3056"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-lg mt-3">Activity</div>
          </li>
        </Link>
        <Link to="/activity">
          <li
            className={`flex gap-1 my-3 ${getActiveClass(
              activityMatch
            )}`}
          >
            <div className="mt-1 py-2 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#000000"}
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
            <div className="text-lg mt-3">Calendar</div>
          </li>
        </Link>
        <Link to="/activity">
          <li
            className={`flex gap-1 my-3 ${getActiveClass(
              activityMatch
            )} rounded-md`}
          >
            <div className="mt-1 py-2 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#000000"}
                fill={"none"}
              >
                <path
                  d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 20.9462L11.0477 21.2055C8.35403 21.939 7.00722 22.3057 5.94619 21.6832C4.88517 21.0607 4.52429 19.692 3.80253 16.9546L2.78182 13.0833C2.06006 10.3459 1.69918 8.97718 2.31177 7.89892C2.84167 6.96619 4 7.00015 5.5 7.00003"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-lg mt-3">Notes</div>
          </li>
        </Link>
        <Link to="/thuso">
          <li
            className={`flex gap-1 my-3 ${getActiveClass(
              thusoMatch
            )} rounded-md`}
          >
            <div className="mt-1 py-2 px-2">
              <Image src="ai.png" className="h-6" />
            </div>
            <div className="text-lg mt-3">Ask Thuso</div>
          </li>
        </Link>
      </ul>
      <div>
        <div className="flex justify-center absolute bottom-0 ms-3 mb-5">
          <div className="text-center">
            <Image
              src="https://img.freepik.com/premium-vector/realistic-3d-cartoon-man-with-laptop_960117-3191.jpg?w=740"
              className="h-[20dvh] object-cove ms-10"
            />
            <p className="text-2xl font-semibold">
              Let's <span className="bg-[##0496ff]">grow</span> Together.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
