import { Image } from "@nextui-org/image";
import { useAuth } from "../../PROVIDERS/DataProvider";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Math_doc from "../../assets/maths.png";
import past_paper from "../../assets/past.png";
import { useState } from "react";

const subjectsList = [
  {
    name: "Mathematics",
    id: 0,
    image: "https://stock.adobe.com/search?k=maths",
  },
  {
    name: "Mathematical Literacy",
    id: 1,
    image:
      "https://www.facebook.com/p/Grade-12-Mathematical-Literacy-Group-100063798530983/",
  },
  {
    name: "Physical Sciences",
    id: 2,
    image: "https://www.pexels.com/search/physics/",
  },
  {
    name: "Geography",
    id: 3,
    image: "https://www.freepik.com/vectors/geography-subject",
  },
  {
    name: "History",
    id: 4,
    image: "https://www.gostudy.net/career-guidance/subject-choice---history",
  },
  {
    name: "Business Studies",
    id: 5,
    image: "https://www.geeksforgeeks.org/business-studies/",
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
      "https://www.fiverr.com/malikwaseemawan/do-online-teaching-of-accounting-subjects",
  },
  {
    name: "English Home Language",
    id: 8,
    image:
      "https://www.pinterest.com/pin/english-subject-illustration-vector-download--596234438187479057/",
  },
];

export default function Subject() {
  const { subjectID } = useParams(); // Get the subject from the URL
  const { currentUser } = useAuth();
  const subject = subjectsList.find((subject) => subject.id == subjectID);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [open, setOpen] = useState("");

  return (
    <section>
      <div>
        <p className="text-3xl">{subject.name}</p>
        <p className="text-tiny text-gray-400">
          Building the Foundations of Logic and Reasoning
        </p>
        <div className="flex gap-5 border p-4 my-4 rounded-md">
          <div>
            <Image
              src="https://img.freepik.com/free-vector/formula-concept-illustration_114360-9040.jpg?t=st=1725780776~exp=1725784376~hmac=3b78e3d82edad8834a6d73223f804c4a5d73e63815d6be58f5bcaaedd8c421a2&w=740"
              className="h-[40dvh] object-cover"
            />
          </div>
          <div className="mt-[15dvh]">
            <p className="text-3xl">Unlock the Power of Numbers</p>
            <p className="text-gray-400">
              Discover mathematical concepts that shape our world. From basic
              arithmetic to advanced calculus, dive deep into problem-solving
              and critical thinking.
            </p>
          </div>
        </div>
        <div>
          <div
            className="flex gap-2 border py-2 px-3 rounded-md cursor-pointer"
            onClick={() => {
              onOpen();
              setOpen("documents");
            }}
          >
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#0496ff"}
                fill={"none"}
              >
                <path
                  d="M14.9805 7.01556C14.9805 7.01556 15.4805 7.51556 15.9805 8.51556C15.9805 8.51556 17.5687 6.01556 18.9805 5.51556"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99491 2.02134C7.49644 1.91556 5.56618 2.20338 5.56618 2.20338C4.34733 2.29053 2.01152 2.97385 2.01154 6.96454C2.01156 10.9213 1.9857 15.7993 2.01154 17.7439C2.01154 18.932 2.74716 21.7033 5.29332 21.8518C8.38816 22.0324 13.9628 22.0708 16.5205 21.8518C17.2052 21.8132 19.4847 21.2757 19.7732 18.7956C20.0721 16.2263 20.0126 14.4407 20.0126 14.0157"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.9999 7.01556C21.9999 9.77698 19.7592 12.0156 16.9951 12.0156C14.231 12.0156 11.9903 9.77698 11.9903 7.01556C11.9903 4.25414 14.231 2.01556 16.9951 2.01556C19.7592 2.01556 21.9999 4.25414 21.9999 7.01556Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.98053 13.0156H10.9805"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.98053 17.0156H14.9805"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>Documents</div>
          </div>

          <div
            className="flex gap-2 border py-2 px-3 rounded-md my-2 cursor-pointer"
            onClick={() => {
              onOpen();
              setOpen("videos");
            }}
          >
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#7678ed"}
                fill={"none"}
              >
                <path
                  d="M14.4531 12.8948C14.3016 13.5215 13.5857 13.9644 12.1539 14.8502C10.7697 15.7064 10.0777 16.1346 9.51993 15.9625C9.28934 15.8913 9.07925 15.7562 8.90982 15.57C8.5 15.1198 8.5 14.2465 8.5 12.5C8.5 10.7535 8.5 9.88018 8.90982 9.42995C9.07925 9.24381 9.28934 9.10868 9.51993 9.03753C10.0777 8.86544 10.7697 9.29357 12.1539 10.1498C13.5857 11.0356 14.3016 11.4785 14.4531 12.1052C14.5156 12.3639 14.5156 12.6361 14.4531 12.8948Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9977 11C21 11.4701 21 11.9693 21 12.5C21 16.9783 21 19.2175 19.6088 20.6088C18.2175 22 15.9783 22 11.5 22C7.02166 22 4.78249 22 3.39124 20.6088C2 19.2175 2 16.9783 2 12.5C2 8.02166 2 5.78249 3.39124 4.39124C4.78249 3 7.02166 3 11.5 3C12.0307 3 12.5299 3 13 3.00231"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M18.5 2L18.7579 2.69703C19.0961 3.61102 19.2652 4.06802 19.5986 4.40139C19.932 4.73477 20.389 4.90387 21.303 5.24208L22 5.5L21.303 5.75792C20.389 6.09613 19.932 6.26524 19.5986 6.59861C19.2652 6.93198 19.0961 7.38898 18.7579 8.30297L18.5 9L18.2421 8.30297C17.9039 7.38898 17.7348 6.93198 17.4014 6.59861C17.068 6.26524 16.611 6.09613 15.697 5.75792L15 5.5L15.697 5.24208C16.611 4.90387 17.068 4.73477 17.4014 4.40139C17.7348 4.06802 17.9039 3.61102 18.2421 2.69703L18.5 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>Video Tutorials</div>
          </div>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
					{open === "documents" ? (
						<p>Documents</p>
					) : (
						<p>Videos</p>
					)}
                  </ModalHeader>

                  <ModalBody>
                    <div className="p-3">
                      {open === "documents" ? (
                        <>
                          <Image src={Math_doc} className="mb-10" />
                          <Image src={past_paper} />
                        </>
                      ) : (
                        <>
                          <p className="text-2xl text-gray-400 mb-2">
                            1. Equation Circle
                          </p>
                          <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/cjP4tmQtxEs?si=KUTYr3i4PSqtZu_G"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                          <p className="text-2xl text-gray-400 mt-2">
                            2. Completing Square
                          </p>
                          <iframe
                            width="100%"
                            height="315"
                            className="my-5"
                            src="https://www.youtube.com/embed/j3Felay0ElM?si=Rnz3Sj_-5mgRzM0P"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                          ></iframe>
                          <p className="text-2xl text-gray-400 mt-2">
                            3. Analytical Geometry
                          </p>
                          <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/j3Felay0ElM?si=5c1GFYFDssqWOIfT"
                            title="YouTube video player"
                            frameborder="0"
							className="mt-2"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                          ></iframe>
						  <p className="text-center text-2xl text-gray-400 mt-5">Coming soon...</p>
						  <p className="text-center text-tiny text-gray-400">Other videos still in progress</p>
                        </>
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </section>
  );
}
