import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../DATABASE/firebase";
import { useAuth } from "../../PROVIDERS/DataProvider";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import toast, { Toaster } from "react-hot-toast";

export default function Activity() {
  const subjects = [
    "Math",
    "Science",
    "History",
    "Mathematical Literature",
    "Geology",
    "Geography",
  ];
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [customTopic, setCustomTopic] = useState("");

  const subjectsList = [
    {
      name: "Mathematics",
      id: 0,
      image:
        "https://img.freepik.com/premium-vector/students-reading-books-education-exam-preparation-concept-education-school-vector-illustration_419328-1154.jpg?w=1380",
      description: "Sharpen your skills in Algebra, Geometry, and Calculus.",
    },
    {
      name: "Mathematical Literacy",
      id: 1,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-flat-design-people-learning-from-home_52683-80249.jpg?t=st=1729586444~exp=1729590044~hmac=a50ba671427ee6e99caf7aaf57ffc819fcd1cbe5b0f9f61db063c60c54c339a7&w=740",
      description: "Improve practical math skills for everyday situations.",
    },
    {
      name: "Physical Sciences",
      id: 2,
      image:
        "https://img.freepik.com/free-vector/chemistry-lab-concept-illustration_114360-10103.jpg?t=st=1729587201~exp=1729590801~hmac=a75882027e4d23148dc691ecca1a6bd882f89aa7c583b2992bf0c0945827e2c8&w=740",
      description: "Explore Physics, Chemistry, and the wonders of the universe.",
    },
    {
      name: "Geography",
      id: 3,
      image:
        "https://img.freepik.com/premium-vector/vector-flat-cartoon-illustration-school-subject-geography-schoolboy-with-briefcase-spins-globe_657235-124.jpg?w=740",
      description: "Discover the Earth’s landscapes, environments, and places.",
    },
    {
      name: "History",
      id: 4,
      image:
        "https://img.freepik.com/premium-vector/history-school-subject-icon-education-science-discipline-with-related-elements-flat-style-vector_178650-34081.jpg?w=740",
      description: "Learn about significant events and people from the past.",
    },
    {
      name: "Business Studies",
      id: 5,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-flat-case-study-illustration_52683-70848.jpg?t=st=1729586561~exp=1729590161~hmac=7297b2720075f0686d408f9d73480bc02fc2138ff15e9f8cc59a18bee671ab6a&w=996",
      description: "Master business concepts, management, and entrepreneurship.",
    },
    {
      name: "Economics",
      id: 6,
      image:
        "https://www.freepik.com/premium-vector/school-subject-doodle-economics_148610493.htm",
      description: "Understand economic systems, markets, and financial literacy.",
    },
    {
      name: "Accounting",
      id: 7,
      image:
        "https://img.freepik.com/free-vector/accounting-audit-concept-business-operation-research-analysis-professional-financial-management-financial-inspection-analytics-isolated-flat-vector-illustration_613284-1060.jpg?t=st=1729586895~exp=1729590495~hmac=fd32c014d49b23d7ce48b65d8c81cb327707d151ff1bc94c5cd3088b4eb1ab86&w=740",
      description: "Develop skills in financial reporting, budgeting, and auditing.",
    },
    {
      name: "English Home Language",
      id: 8,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-english-school-background_23-2149496629.jpg?t=st=1729586982~exp=1729590582~hmac=435693d7725390339ea7a3f128a53499c424a9b38455b42fcc319068bed3071b&w=740",
      description: "Enhance your reading, writing, and comprehension skills.",
    },
  ];
  

  const { currentUser } = useAuth();
  const userSubjects = subjectsList.filter((subject) =>
    currentUser.grade.subjects.includes(subject.id)
  );

  // Mock topics for each subject
  const topics = {
    Mathematics: ["Algebra", "Geometry", "Calculus"],
    Science: ["Physics", "Chemistry", "Biology"],
    // Add topics for other subjects...
  };

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
            username: user?.personalInfo?.username,
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

  return (
    <div className="bg-white ">
      {/* Heading */}
      {/* Daily Quiz 
			<div className="mb-8 bg-white shadow-lg p-6 rounded-lg">
				<h2 className="text-2xl font-bold text-[#0056b3]">Daily Quiz</h2>
				<p className="mt-2 text-gray-600">Test your knowledge with today’s quiz and improve your skills!</p>
				<Link to="/daily-quiz">
					<button className="mt-4 px-6 py-3 bg-[#0056b3] text-white rounded-lg hover:bg-[#003d79]">
						Take Today’s Quiz
					</button>
				</Link>
			</div>
			*/}

      {/* Quiz Categories */}
      <div className="mb-8 bg-[#caf0f877] p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-[#0056b3]">Practice Quizzes</h2>
        <p className="text-sm">Sharpen your skills and see how much you know.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {userSubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 cursor-pointer border shadow-lg"
              style={{ backgroundColor: "" }}
              onClick={() => setSelectedSubject(subject.name)} // Set subject on click
            >
              <img
                src={subject.image}
                alt={subject.name}
                className="w-full h-[10rem] object-cover mt-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold">{subject.name}</h3>
              <p className="text-gray-400 text-sm">{subject.description}</p>
              {/* <div className="flex justify-center ">
                <Button className="px-[8rem] mt-1 bg-[#0496ff] shadowed-btn text-white" onClick={() => setSelectedSubject(subject.name)}>Start quiz</Button>
              </div> */}

            </div>
          ))}
        </div>
      </div>

      {/* Challenge a Friend */}
      <div className="mb-8 bg-white p-6 rounded-lg border-2 border-dashed">
        <h2 className="text-2xl font-bold text-[#0056b3]">
          Challenge a Friend
        </h2>
        <p className="mt-2 text-gray-600">
          Send a challenge to your friends and see who scores the highest!
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-6">
          <input
            type="text"
            placeholder="Enter friend's username"
            className="w-full sm:w-2/3 p-3 mb-4 sm:mb-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3]"
          />
          <Button className="bg-[#0496ff] text-white shadowed-btn" onClick={() => {
            toast.success('Challenge sent!');
          }}>
            Send Challenge
          </Button>
        </div>
      </div>
      <Toaster />

      {/* Leaderboard */}
      <div className="mb-8 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-[#0056b3]">Leaderboard</h2>
        <p className="mt-2 text-gray-600">
          See the top performers on the leaderboard.
        </p>
        <div className="mt-6">
          <Table className="min-w-full bg-white">
            <TableHeader className="bg-[#0056b3]">
                <TableColumn className="px-4 py-2  text-left">Rank</TableColumn>
                <TableColumn className="px-4 py-2 text-left">Username</TableColumn>
                <TableColumn className="px-4 py-2  text-left">Points</TableColumn>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow key={user.username} className="">
                  <TableCell className="px-4 py-2 text-gray-800">{index + 1}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-800">{user.username}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-800">{user.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Popup */}
      {selectedSubject && (
        <div className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold text-[#0056b3]">
              {selectedSubject} Topics
            </h3>

            {/* List of topics */}
            <div className="mt-4">
              {topics[selectedSubject]?.map((topic) => (
                <div key={topic} className="py-2">
                  <label className="text-gray-700">
                    <input
                      type="radio"
                      name="topic"
                      value={topic}
                      className="mr-2"
                      onChange={(e) => setCustomTopic(e.target.value)}
                    />
                    {topic}
                  </label>
                </div>
              ))}
            </div>

            {/* Custom topic input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter your custom topic"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <Link
                to={`practicequiz/${selectedSubject.toLowerCase()}/${
                  customTopic && customTopic.trim() !== ""
                    ? customTopic.toLowerCase()
                    : selectedSubject.toLowerCase()
                }`}
              >
                <button
                  className="px-4 py-2 bg-[#0056b3] text-white rounded-lg"
                  onClick={() =>
                    console.log(
                      `Selected: ${selectedSubject}, Custom Topic: ${customTopic}`
                    )
                  }
                >
                  Start Quiz
                </button>
              </Link>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                onClick={() => setSelectedSubject(null)} // Close popup
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
