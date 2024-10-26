import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../../PROVIDERS/DataProvider";
import { Link, useNavigate } from "react-router-dom";

const subjectsList = [
  {
    name: "Mathematics",
    id: 0,
    image:
      "https://img.freepik.com/premium-vector/students-reading-books-education-exam-preparation-concept-education-school-vector-illustration_419328-1154.jpg?w=1380",
  },
  {
    name: "Mathematical Literacy",
    id: 1,
    image:
      "https://img.freepik.com/free-vector/hand-drawn-flat-design-people-learning-from-home_52683-80249.jpg?t=st=1729586444~exp=1729590044~hmac=a50ba671427ee6e99caf7aaf57ffc819fcd1cbe5b0f9f61db063c60c54c339a7&w=740",
  },
  {
    name: "Physical Sciences",
    id: 2,
    image:
      "https://img.freepik.com/free-vector/chemistry-lab-concept-illustration_114360-10103.jpg?t=st=1729587201~exp=1729590801~hmac=a75882027e4d23148dc691ecca1a6bd882f89aa7c583b2992bf0c0945827e2c8&w=740",
  },
  {
    name: "Geography",
    id: 3,
    image:
      "https://img.freepik.com/premium-vector/vector-flat-cartoon-illustration-school-subject-geography-schoolboy-with-briefcase-spins-globe_657235-124.jpg?w=740",
  },
  {
    name: "History",
    id: 4,
    image:
      "https://img.freepik.com/premium-vector/history-school-subject-icon-education-science-discipline-with-related-elements-flat-style-vector_178650-34081.jpg?w=740",
  },
  {
    name: "Business Studies",
    id: 5,
    image:
      "https://img.freepik.com/free-vector/hand-drawn-flat-case-study-illustration_52683-70848.jpg?t=st=1729586561~exp=1729590161~hmac=7297b2720075f0686d408f9d73480bc02fc2138ff15e9f8cc59a18bee671ab6a&w=996",
  },
  {
    name: "Economics",
    id: 6,
    image:
      "https://www.freepik.com/premium-vector/school-subject-doodle-economics_148610493.htm",
  },
  {
    name: "Accounting",
    id: 7,
    image:
      "https://img.freepik.com/free-vector/accounting-audit-concept-business-operation-research-analysis-professional-financial-management-financial-inspection-analytics-isolated-flat-vector-illustration_613284-1060.jpg?t=st=1729586895~exp=1729590495~hmac=fd32c014d49b23d7ce48b65d8c81cb327707d151ff1bc94c5cd3088b4eb1ab86&w=740",
  },
  {
    name: "English Home Language",
    id: 8,
    image:
      "https://img.freepik.com/free-vector/hand-drawn-english-school-background_23-2149496629.jpg?t=st=1729586982~exp=1729590582~hmac=435693d7725390339ea7a3f128a53499c424a9b38455b42fcc319068bed3071b&w=740",
  },
];

export default function Subjects() {
  const { currentUser } = useAuth();
  const userSubjects = subjectsList.filter((subject) =>
    currentUser.grade.subjects.includes(subject.id)
  );
  const navigate = useNavigate();

  return (
    <section>
      <div>
        <div className=" my-5 flex justify-between">
          <div>
            <p className="text-4xl">Subjects</p>
            <p className="text-gray-400 text-sm">
              Delve into a wide range of topics, with videos and resources to
              enhance your learning journey.
            </p>
          </div>
          <div>
            <Button className="flex gap-1 bg-[#0496ff] shadowed-btn mt-3" onClick={() => {
				navigate('/profile')
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
                    d="M12 4V20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-white">Add subject</p>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          {userSubjects.map((subject) => (
            <Card
              isFooterBlurred
              className="w-full h-[300px] col-span-3"
              key={subject.id}
            >
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={subject.image}
              />
              <CardFooter className="absolute bottom-0 border-t-1 z-10 justify-between bg-white">
                <div>
                  <p className="text-black">{subject.name}</p>
                </div>

                <Link to={`${subject.id}`}>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
