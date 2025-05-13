import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Image } from "@nextui-org/image";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { useLocation } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";
import Icon from "../../assets/logo_icon.png"

export default function Thuso() {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatContainerRef = useRef(null);
  const { pathname } = useLocation();

  const suggestedQuestions = [
    "How can I apply for university scholarships?",
    "What are the best study tips for Matric exams?",
    "How do I choose the right university course?",
    "Can you help me with time management?",
  ];

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          "AIzaSyCfAlCStsulnvc7ohj_G0HmepXB7ZVfkB8"
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

  const handleSendMessage = async (message) => {
    if (message.trim() && chat) {
        setMessages((prev) => [...prev, { role: "user", text: message }]);
        setLoading(true);

        try {
            // Modify the message to request short responses
            const result = await chat.sendMessage(`${message}. Please respond in short sentences and be as concise as possible.
              The user who is using this platform is a learner in south africa.`);
            const responseText = await result.response.text();
            
            // Remove asterisks using regex
            const cleanedResponseText = responseText.replace(/\*/g, "").trim();
            
            setMessages((prev) => [
                ...prev,
                { role: "model", text: cleanedResponseText },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setInput("");
        setLoading(false);
    }
};



  const handleSuggestedClick = (suggestedMessage) => {
    handleSendMessage(suggestedMessage);
  };

  // Scroll to the bottom of the chat container whenever messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      });
    }
  }, [messages]);

  return pathname === "/newnotes" ? "" : (
    <div className="fixed bottom-10 right-5 z-50">
      <Card
        className={`transition-all transform border ${
          isChatOpen ? "w-[55rem] h-[600px] p-5" : "w-16 h-16 p-0"
        } bg-white shadow-lg rounded-lg flex flex-col justify-between`}
      >
        <div className={`w-full ${isChatOpen ? "block" : "hidden"}`}>
          <div className="border-b">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Image src="thusologo.png" className="w-[8rem]" />
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-lg font-bold text-blue-500"
              >
                ✖
              </button>
            </div>
          </div>

          <div
            ref={chatContainerRef}
            className="mb-4 p-4 rounded-lg h-[28rem] overflow-y-auto flex flex-col space-y-2"
          >
            {messages.length === 0 && !loading ? (
              <div>
                <div className="flex justify-center pt-[5rem]">
                  <div>
                    <div className="flex justify-center">
                      <Image src="thusologo.png" className="w-[10rem]" />
                    </div>
                    <p className="text-3xl text-center">Your Smart Study Companion</p>
					<p className="text-gray-400 text-sm text-center">Ready to assist you with questions, provide resources, and help you excel in Grade 12!</p>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-1 absolute bottom-0 mb-[5rem] me-5">
					<div className="col-span-12">
					<div className="divider text-gray-400">Recommendations</div>
					</div>
                  {suggestedQuestions.map((question, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestedClick(question)}
                      className="col-span-3 my-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                    >
                      {question}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Avatar
                        alt="Chat avatar"
                        src={msg.role === "user" ? "" : "logo_icon.png"}
                      />
                    </div>
                  </div>
              
                  <div
                    className="chat-bubble animate__animated animate__zoomIn animate__faster"
                    style={{
                      backgroundColor: msg.role === "user" ? "#0496ff" : "#e5e7eb",
                      color: msg.role === "user" ? "white" : "black",
                    }}
                  >
                    {msg.role === "model" ? (
                      <TypewriterComponent
                        options={{
                          strings: [msg.text],
                          autoStart: true,
                          delay: 10, 
                          loop : false,
                          deleteSpeed : Infinity,
                          cursor : ""
                        }}
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              )))}
            {loading && (
              <div className="chat chat-start">
                <Avatar />
                <div>
                  <Skeleton className="h-5 w-[10rem] rounded-full"></Skeleton>
                  <Skeleton className="h-5 w-[10rem] rounded-full my-1"></Skeleton>
                  <Skeleton className="h-5 w-[15rem] rounded-full"></Skeleton>
                  <Skeleton className="h-5 w-[15rem] rounded-full my-1"></Skeleton>
                </div>
              </div>
            )}
          </div>
        </div>

        {isChatOpen && (
          <div className="flex items-center space-x-2 w-full border-t ">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2"
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        )}

        <button
          className={`h-12 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors ${
            isChatOpen ? "hidden" : "block"
          }`}
          onClick={() => setIsChatOpen(true)}
        >
          <Image src={Icon} />
        </button>
      </Card>
    </div>
  );
}
