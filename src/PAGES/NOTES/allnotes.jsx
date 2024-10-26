import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../DATABASE/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { formatDistanceToNow } from 'date-fns';

export default function Notes() {

    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function getNotes () {
            try {
                const uuid = auth.currentUser.uid;
                const notesRef = collection(db, 'notes');
                const q = query(notesRef, where('user_id', '==', uuid));
                const querySnapshot = await getDocs(q);
                setNotes(querySnapshot.docs.map((doc) => doc.data()));
            } catch (error) {
                console.log(error)
            }
        }
        getNotes();
      }, []);

  return (
    <section>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3 border-2 border-dashed h-[25dvh] rounded-md flex justify-center cursor-pointer" onClick={() => {
          navigate('/newnotes')
        }}>
          <div className="mt-[4rem]">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#9ca3af"}
                fill={"none"}
              >
                <path
                  d="M12.5 22H9.5C6.20017 22 4.55025 22 3.52513 20.9209C2.5 19.8418 2.5 18.1051 2.5 14.6316V9.36842C2.5 5.89491 2.5 4.15816 3.52513 3.07908C4.55025 2 6.20017 2 9.5 2H12.5C15.7998 2 17.4497 2 18.4749 3.07908C19.5 4.15816 19.5 5.89491 19.5 9.36842V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 15L18 22M21.5 18.5L14.5 18.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7 2L7.0822 2.4932C7.28174 3.69044 7.38151 4.28906 7.80113 4.64453C8.22075 5 8.82762 5 10.0414 5H11.9586C13.1724 5 13.7793 5 14.1989 4.64453C14.6185 4.28906 14.7183 3.69044 14.9178 2.4932L15 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 16H11M7 11H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-gray-400">New Notes</p> 
          </div>
        </div>
        {notes.map((note, i) => (
          <Card className={`h-[25dvh] col-span-3 border shadow-none bg-[${note.color}] shadow-lg shadow-[${note.color}]`} key={i}>
            <CardBody>
              <p className="text-2xl">{note.title}</p>
              <p className="mt-3 text-gray-600 h-[15rem] overflow-hidden">{JSON.parse(note.content)[0].children[0].text}</p>
            </CardBody>
            <CardFooter>
              <p className="text-sm">{formatDistanceToNow(new Date(note.createdAt), {addSuffix : true})}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </section>
  );
}
