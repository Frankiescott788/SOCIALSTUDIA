import { db } from "../../DATABASE/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Chart from "./chart.jsx";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Progress,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../../PROVIDERS/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const user = currentUser.personalInfo;
  const navigate = useNavigate();

  const [leaderboardData, setLeaderboardData] = useState([]);

  const getLeaderboard = () => {
    const users = [];
    try {
      const q = query(collection(db, "users")); // Adjust the collection name if needed
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        users.length = 0; // Clear the users array

        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });

        // Assuming the points are under user.activity.points
        const sortedUsers = users
          .map((user) => ({
            username: user.personalInfo?.username,
            points: user.activity?.points || 0,
          }))
          .sort((a, b) => b.points - a.points);

        setLeaderboardData(sortedUsers);
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  const hours = new Date().getHours();
  return (
    <>
      <section>
        <div>
          <div className="py-3 flex justify-between ">
            <div>
              <p className="text-3xl text-typing">
                {" "}
                <span>
                  {hours < 12
                    ? "Good Morning"
                    : hours < 17
                    ? "Good Day"
                    : "Good Evening"}
                </span>
                , {user.firstName}
              </p>
              <p className="text-gray-400 text-sm">Dashboard Overview</p>
            </div>
            <div>
              <Button className="flex gap-2 bg-[#0496ff] text-white shadowed-btn rounded-md" onClick={() => {
                navigate("/newnotes");
              }}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"white"}
                    fill={"none"}
                  >
                    <path
                      d="M12 8V16M16 12L8 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div>New notes</div>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-3 p-3 shadow-lg border">
              <div className="flex gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={38}
                    height={38}
                    color={"#7400b8"}
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
                <div>
                  <p>Subjects completed</p>
                  <p>04/07</p>
                </div>
              </div>
              <div className="py-3">
                <Progress
                  aria-label="Loading..."
                  value={60}
                  className="max-w-md bg-blue-100 rounded-full"
                />
              </div>
            </Card>
            <Card className="col-span-3 p-3 shadow-lg border">
              <div className="flex gap-2">
                <div className="mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={32}
                    height={32}
                    color={"#9381ff"}
                    fill={"none"}
                  >
                    <path
                      d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 10L10.5 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.5 11C13.5 11 14 11 14.5 12C14.5 12 16.0882 9.5 17.5 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 16L10.5 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.5 17C13.5 17 14 17 14.5 18C14.5 18 16.0882 15.5 17.5 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p>Quizes completed</p>
                  <p>01/05</p>
                </div>
              </div>
              <div className="py-3">
                <Progress
                  aria-label="Loading..."
                  value={10}
                  color="danger"
                  className="max-w-md bg-blue-100 rounded-full"
                />
              </div>
            </Card>
            <Card className="col-span-3 p-3 shadow-lg border">
              <div className="flex gap-2">
                <div className="mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={32}
                    height={32}
                    color={"#00f5d4"}
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
                <div>
                  <p>Personal Notes</p>
                  <p className="text-3xl">14</p>
                  <p className="text-tiny text-gray-400">notes created</p>
                </div>
              </div>
            </Card>
            <Card className="col-span-3 p-3 shadow-lg border">
              <div className="flex gap-2">
                <div className="mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={32}
                    height={32}
                    color={"#7cb518"}
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
                </div>
                <div>
                  <p>Events</p>
                  <p className="text-3xl">04</p>
                  <p className="text-tiny text-gray-400">Upcoming events</p>
                </div>
              </div>
            </Card>

            <div className="w-[25rem] absolute ms-[49rem] top-0 mt-[19rem]">
              <div className="flex gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#9ca3af"}
                    fill={"none"}
                  >
                    <path
                      d="M3.5 18C3.5 16.5858 3.5 15.8787 3.93934 15.4393C4.37868 15 5.08579 15 6.5 15H7C7.94281 15 8.41421 15 8.70711 15.2929C9 15.5858 9 16.0572 9 17V22H3.5V18Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 19C15 18.0572 15 17.5858 15.2929 17.2929C15.5858 17 16.0572 17 17 17H17.5C18.9142 17 19.6213 17 20.0607 17.4393C20.5 17.8787 20.5 18.5858 20.5 20V22H15V19Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 22H22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 16C9 14.5858 9 13.8787 9.43934 13.4393C9.87868 13 10.5858 13 12 13C13.4142 13 14.1213 13 14.5607 13.4393C15 13.8787 15 14.5858 15 16V22H9V16Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.6911 2.57767L13.395 3.99715C13.491 4.19475 13.7469 4.38428 13.9629 4.42057L15.2388 4.6343C16.0547 4.77141 16.2467 5.36824 15.6587 5.957L14.6668 6.95709C14.4989 7.12646 14.4069 7.4531 14.4589 7.68699L14.7428 8.925C14.9668 9.90492 14.4509 10.284 13.591 9.77185L12.3951 9.05808C12.1791 8.92903 11.8232 8.92903 11.6032 9.05808L10.4073 9.77185C9.5514 10.284 9.03146 9.90089 9.25543 8.925L9.5394 7.68699C9.5914 7.4531 9.49941 7.12646 9.33143 6.95709L8.33954 5.957C7.7556 5.36824 7.94358 4.77141 8.75949 4.6343L10.0353 4.42057C10.2473 4.38428 10.5033 4.19475 10.5993 3.99715L11.3032 2.57767C11.6872 1.80744 12.3111 1.80744 12.6911 2.57767Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="mt-1 text-gray-400">Leaderboard</p>
              </div>
              <Table aria-label="Leaderboard table">
                <TableHeader>
                  <TableColumn>Rank</TableColumn>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Scores</TableColumn>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      <section className=" pt-[4dvh]">
        <div className="flex gap-1 mb-1">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#9ca3af"}
              fill={"none"}
            >
              <path
                d="M7 18V16M12 18V15M17 18V13M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.99219 11.4863C8.14729 11.5581 13.0341 11.2328 15.8137 6.82132M13.9923 6.28835L15.8678 5.98649C16.0964 5.95738 16.432 6.13785 16.5145 6.35298L17.0104 7.99142"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-400">Weekly Performance</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-[50dvw] p-3 border-1 rounded-md">
            <Chart />
          </div>
        </div>
      </section>
    </>
  );
}
