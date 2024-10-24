import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Image } from "@nextui-org/image";

export default function AiChat() {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Suggested prompts to show when the user lands on the chat
  const suggestedPrompts = [
    "Tell me a fun fact.",
    "How's the weather today?",
    "What are the benefits of exercise?",
    "What’s the latest news in technology?",
  ];

  // Initialize the chat without predefined history
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          "AIzaSyAAQd5fnpidGv4nU_ZklFBO0QjyEjsoURg"
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const initialChat = model.startChat(); // No initial history
        setChat(initialChat);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, []);

  // Send message to the AI model
  const handleSendMessage = async (message) => {
    if (message.trim() && chat) {
      // Update messages with the user's input
      setMessages((prev) => [...prev, { role: "user", text: message }]);

      try {
        const result = await chat.sendMessage(message);
        const responseText = await result.response.text();
        // Update messages with the bot's response
        setMessages((prev) => [...prev, { role: "model", text: responseText }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      // Clear the input after sending the message
      setInput("");
    }
  };

  // Handle suggested prompt clicks
  const handleSuggestedClick = (suggestedMessage) => {
    handleSendMessage(suggestedMessage);
  };

  return (
    <section className="p-4">
      <div className="items-start">
        {/* Chat Display */}
        <div className="w-full p-4 rounded-lg">
          <div className="h-[70dvh] overflow-y-auto">
            {messages.length === 0 ? (
              <div>
                {/* Show suggested prompts when no messages are available */}
                <p className="text-gray-500 mb-2">Try one of these:</p>
                <div className="grid grid-cols-12 gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestedClick(prompt)}
                      className="col-span-3 my-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      {prompt}
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
                  <div className="chat-image avatar ">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Chat avatar"
                        src={
                          msg.role === "user"
                            ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            : "logo_icon.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {msg.role === "user" ? "You" : "Thuso"}
                  </div>
                  <div
                    className="chat-bubble animate__animated animate__zoomIn animate__faster"
                    style={{
                      backgroundColor:
                        msg.role === "user" ? "#0496ff" : "#e5e7eb", // bg-gray-400 equivalent in Tailwind
                      color: msg.role === "user" ? "white" : "black",
                    }}
                  >
                    {msg.text}
                  </div>
                  <div className="chat-footer opacity-50">
                    {msg.role === "user" ? "Sent" : "Delivered"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Placeholder for any image or AI logo */}
        <Image
          src="https://placekitten.com/200/200"
          alt="AI Chatbot"
          width={150}
          height={150}
          className="ml-4"
        />
      </div>

      {/* Chat Input */}
      <div className="flex mt-4 fixed bottom-0 right-0 left-0 ms-[22rem] me-[3rem] mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded-lg mr-2"
        />
        <button
          onClick={() => handleSendMessage(input)}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </section>
  );
}
