import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../DATABASE/firebase";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Logo from "../../assets/logo.png";
import { Input } from "@nextui-org/input";

export default function Forums() {
  const [searchTerm, setSearchTerm] = useState("");
  const [forums, setForums] = useState([]);

  const filteredForums = forums.filter(
    (forum) =>
      forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forum.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    async function fetchForums() {
      const querySnapshot = await getDocs(collection(db, "forums"));
      const forumsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setForums(forumsData);
    }
    fetchForums();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between">
        <div >
          <div className="flex">
            <Image src={Logo} className="w-[15rem]" />
            <p className="text-3xl font-semibold absolute top-0 mt-[6.7rem] z-10 ms-[14.5rem]">
              Community
            </p>
          </div>
          <p className="text-gray-400">Your space to discuss topics, seek advice, and exchange ideas.</p>
        </div>

        <div className="mt-3">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[17rem]"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#9b9b9b"}
                fill={"none"}
              >
                <path
                  d="M17.5 17.5L22 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mt-[1rem]">
        {filteredForums.length > 0 ? (
          filteredForums.map((forum) => (
            <Link className="h-52 col-span-3" to={`${forum.id}`} key={forum.id}>
              <Card className="max-w-[340px]">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="https://i.pinimg.com/236x/b1/13/a0/b113a01118e0286ce985ee01543422aa.jpg"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-sm text-gray-400">{forum.user}</h4>
                      <p className="text-tiny text-gray-400">Learner</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  <p className="truncate w-40px">{forum.description}</p>
                  <span className="pt-2">{forum.tags.join(", ")}</span>
                </CardBody>
                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <div className="flex gap-1">
                      <div>
                        <svg0
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={16}
                          height={16}
                          color={"#9ca3af"}
                          fill={"none"}
                        >
                          <path
                            d="M7.5 12H13.5M7.5 8H10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.5 20C9.55038 20.8697 10.8145 21.4238 12.2635 21.5188C13.4052 21.5937 14.5971 21.5936 15.7365 21.5188C16.1288 21.4931 16.5565 21.4007 16.9248 21.251C17.3345 21.0845 17.5395 21.0012 17.6437 21.0138C17.7478 21.0264 17.8989 21.1364 18.2011 21.3563C18.7339 21.744 19.4051 22.0225 20.4005 21.9986C20.9038 21.9865 21.1555 21.9804 21.2681 21.7909C21.3808 21.6013 21.2405 21.3389 20.9598 20.8141C20.5706 20.0862 20.324 19.2529 20.6977 18.5852C21.3413 17.6315 21.8879 16.5021 21.9678 15.2823C22.0107 14.6269 22.0107 13.9481 21.9678 13.2927C21.9146 12.4799 21.7173 11.7073 21.4012 11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.345 17.4868C15.9006 17.2526 18.7328 14.4069 18.9658 10.8344C19.0114 10.1353 19.0114 9.41131 18.9658 8.71219C18.7328 5.13969 15.9006 2.29401 12.345 2.05985C11.132 1.97997 9.86553 1.98013 8.65499 2.05985C5.09943 2.29401 2.26725 5.13969 2.0342 8.71219C1.9886 9.41131 1.9886 10.1353 2.0342 10.8344C2.11908 12.1356 2.69992 13.3403 3.38372 14.3576C3.78076 15.0697 3.51873 15.9586 3.10518 16.735C2.807 17.2948 2.65791 17.5747 2.77762 17.7769C2.89732 17.9791 3.16472 17.9856 3.69951 17.9985C4.75712 18.024 5.47028 17.7269 6.03638 17.3134C6.35744 17.0788 6.51798 16.9615 6.62862 16.9481C6.73926 16.9346 6.957 17.0234 7.39241 17.2011C7.78374 17.3608 8.23812 17.4593 8.65499 17.4868C9.86553 17.5665 11.132 17.5666 12.345 17.4868Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg0>
                      </div>
                      <p className=" text-default-400 text-small">
                        {forum.posts.length}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <p>Loading.</p>
        )}
      </div>
    </div>
  );
}
