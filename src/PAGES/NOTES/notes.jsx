import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState, useRef, useEffect } from "react";
import { Editor, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Google AI library
import { auth, db } from "../../DATABASE/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Skeleton } from "@nextui-org/skeleton";
import TypewriterComponent from "typewriter-effect";
import { useNavigate } from "react-router-dom";

const NoteEditor = () => {
  const editor = useRef(withReact(createEditor()));
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const [userInput, setUserInput] = useState(""); // State for user questions
  const [conversation, setConversation] = useState([]); // State for conversation history
  const drawerRef = useRef(null); // Ref for the drawer

  const noteTitle = useRef();
  const chatContainerRef = useRef(null);

  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("#ff0000");

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          "AIzaSyCfAlCStsulnvc7ohj_G0HmepXB7ZVfkB8" // Replace with your actual API key
        );
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const initialChat = model.startChat(); // No initial history
        setChat(initialChat);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, []);

  const handleSave = async () => {
    const content = JSON.stringify(value);
    const user = auth.currentUser; // Get the current user
    const note = {
      user_id: user.uid,
      title: noteTitle.current.value,
      content: content,
      color : selectedColor,
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await addDoc(collection(db, "notes"), note);
      navigate('/notes')
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextToSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US'; // Set the language
    speech.volume = 1; // Set volume (0 to 1)
    speech.rate = 1.1; // Set the speech rate (0.1 to 10)
    speech.pitch = 1; // Set the pitch (0 to 2)
  
    window.speechSynthesis.speak(speech);
  };

  const handleSummarize = async () => {
    if (!chat) return;
  
    const noteContent = JSON.stringify(value); // Get the current note content
    setLoading(true);
  
    try {
      const result = await chat.sendMessage(
        `Summarize the following note and talk more about the context in order for the user to understand as a learner, keep it short not more than 70 words. ${noteContent}`
      );
      const responseText = await result.response.text();
  
      // Clean the response
      const cleanedResponseText = responseText.replace(/\*/g, "").trim();
      setSummary(cleanedResponseText); // Set the summary state
      setConversation((prev) => [
        ...prev,
        { user: "AI", message: cleanedResponseText },
      ]); // Add summary to conversation
  
      // Call the text-to-speech function
      handleTextToSpeech(cleanedResponseText); // Add this line
    } catch (error) {
      console.error("Error summarizing note:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.speechSynthesis.cancel(); // Stop speech synthesis
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.speechSynthesis.cancel(); // Stop speech synthesis on unmount
    };
  }, []);
  
  

  const handleAskQuestion = async () => {
    if (!chat || !userInput.trim()) return;

    const userMessage = userInput.trim();
    setConversation((prev) => [...prev, { user: "You", message: userMessage }]); // Add user question to conversation
    setLoading(true);
    setUserInput(""); // Clear input

    try {
      const result = await chat.sendMessage(userMessage);
      const responseText = await result.response.text();

      // Clean the response
      const cleanedResponseText = responseText.replace(/\*/g, "").trim();
      setConversation((prev) => [
        ...prev,
        { user: "AI", message: cleanedResponseText },
      ]); // Add AI response to conversation
    } catch (error) {
      console.error("Error sending message to AI:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle clicks outside the drawer
 // Function to handle clicks outside the drawer
const handleClickOutside = (event) => {
  if (drawerRef.current && !drawerRef.current.contains(event.target)) {
    setDrawerOpen(false);
    // Stop speech synthesis when the drawer is closed
    window.speechSynthesis.cancel(); // Add this line
  }
};


  
  

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up when the component unmounts or when the drawer closes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="flex flex-col h-[80vh] p-4">
      <div>
        <div className="flex justify-between">
          <p className="mb-3 text-3xl">Create Notes</p>
          <div className="flex gap-3 mt-2">
            <Button
              onClick={() => {
                setDrawerOpen(true);
                handleSummarize();
              }} // Open the drawer
              className="flex gap-1 bg-gradient-to-r from-blue-500 to-indigo-700 shadow-lg shadow-blue-500/50 text-white"
            >
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
                    d="M10 7L9.48415 8.39405C8.80774 10.222 8.46953 11.136 7.80278 11.8028C7.13603 12.4695 6.22204 12.8077 4.39405 13.4842L3 14L4.39405 14.5158C6.22204 15.1923 7.13603 15.5305 7.80278 16.1972C8.46953 16.864 8.80774 17.778 9.48415 19.6059L10 21L10.5158 19.6059C11.1923 17.778 11.5305 16.864 12.1972 16.1972C12.864 15.5305 13.778 15.1923 15.6059 14.5158L17 14L15.6059 13.4842C13.778 12.8077 12.864 12.4695 12.1972 11.8028C11.5305 11.136 11.1923 10.222 10.5158 8.39405L10 7Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 3L17.7789 3.59745C17.489 4.38087 17.3441 4.77259 17.0583 5.05833C16.7726 5.34408 16.3809 5.48903 15.5975 5.77892L15 6L15.5975 6.22108C16.3809 6.51097 16.7726 6.65592 17.0583 6.94167C17.3441 7.22741 17.489 7.61913 17.7789 8.40255L18 9L18.2211 8.40255C18.511 7.61913 18.6559 7.22741 18.9417 6.94166C19.2274 6.65592 19.6191 6.51097 20.4025 6.22108L21 6L20.4025 5.77892C19.6191 5.48903 19.2274 5.34408 18.9417 5.05833C18.6559 4.77259 18.511 4.38087 18.2211 3.59745L18 3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p>Summarize</p>
            </Button>
            <Button
              onClick={handleSave}
              className="flex gap-1 bg-[#0496ff] text-white shadowed-btn px-[3rem]"
            >
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
                    d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div>Save</div>
            </Button>
          </div>
        </div>
        <div className="flex justify-between mb-10 mt-5">
          <div>
            <Input label="Note Title" ref={noteTitle} />
          </div>
          <div className="flex gap-2">
            <div
              className="h-10 w-10 rounded-full bg-[#ffca3a]"
              onClick={() => {
                setSelectedColor("#ffca3a");
              }}
            >
              {selectedColor === "#ffca3a" && (
                <div className="flex justify-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#9b9b9b"}
                    fill={"none"}
                  >
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 12.5L10.5 15L16 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div
              className="h-10 w-10 rounded-full bg-[#ff99c8]"
              onClick={() => {
                setSelectedColor("#ff99c8");
              }}
            >
              {selectedColor === "#ff99c8" && (
                <div className="flex justify-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#9b9b9b"}
                    fill={"none"}
                  >
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 12.5L10.5 15L16 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div
              className="h-10 w-10 rounded-full bg-[#fca311]"
              onClick={() => {
                setSelectedColor("#fca311");
              }}
            >
              {selectedColor === "#fca311" && (
                <div className="flex justify-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#9b9b9b"}
                    fill={"none"}
                  >
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 12.5L10.5 15L16 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div
              className="h-10 w-10 rounded-full bg-red-300"
              onClick={() => {
                setSelectedColor("#e4c1f9");
              }}
            >
              {selectedColor === "#e4c1f9" && (
                <div className="flex justify-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#9b9b9b"}
                    fill={"none"}
                  >
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 12.5L10.5 15L16 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Slate editor={editor.current} initialValue={value} onChange={setValue}>
        <Editable
          className="flex-1 mb-4 bg-gray-50 p-2 rounded-lg outline-none border-2 border-dashed"
          placeholder="Start typing..."
        />
      </Slate>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={drawerRef} // Set the ref to the drawer
          className={`fixed right-0 top-0 w-[30rem] h-full bg-white shadow-lg transition-transform transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <button
              onClick={() => {
                setDrawerOpen(false)
                window.speechSynthesis.cancel();
              }}
              className="text-gray-500"
            >
              Close
            </button>
            {/* Interactive Chat Section */}
            <div className="mt-4">
              <div className="mt-2 absolute bottom-0 left-0 right-0 flex mb-3 px-2">
                <Input
                  placeholder="Type your question..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAskQuestion();
                    }
                  }}
                />
                <Button
                  onClick={handleAskQuestion}
                  className="mt- bg-blue-500 text-white"
                >
                  Ask
                </Button>
              </div>
              {/* Conversation Display */}
              {/* Conversation Display */}
              <ScrollShadow
                className="mt-4 h-[36rem] overflow-y-auto"
                ref={chatContainerRef}
              >
                {conversation.map((item, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg max-w-xs ${
                      item.user === "You"
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {item.user !== "You" ? (
                      <TypewriterComponent
                        options={{
                          strings: [item.message],
                          autoStart: true,
                          delay: 10,
                          loop: false,
                          deleteSpeed: Infinity,
                          cursor: "",
                        }}
                      />
                    ) : (
                      <p> {item.message}</p>
                    )}
                  </div>
                ))}
                {loading && (
                  <>
                    <Skeleton className="mb-2 p-2 rounded-lg w-[10rem]"></Skeleton>
                    <Skeleton className="mb-2 p-2 rounded-lg max-w-xs"></Skeleton>
                    <Skeleton className="mb-2 p-2 rounded-lg max-w-xs"></Skeleton>
                  </>
                )}
              </ScrollShadow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
