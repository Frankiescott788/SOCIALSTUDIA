import { GoogleGenerativeAI } from "@google/generative-ai";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../PROVIDERS/DataProvider";
import { db } from "../../DATABASE/firebase";
import { Image } from "@nextui-org/image";

export default function Challenges() {
  const { currentUser } = useAuth();
  const { subject, topic } = useParams(); // Get the subject and topic from the URL
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [submitHighlighted, setSubmitHighlighted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    await getResponseForGivenPrompt(topic);
    setLoading(false);
  };

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCfAlCStsulnvc7ohj_G0HmepXB7ZVfkB8"
  );

  const getResponseForGivenPrompt = async (prompt) => {
    try {
      let message = `
        Generate a quiz with 5 questions and 4 choices for each question:
        Please return the response in the following structure:
        [
          {
            "question": "question text",
            "choices": [
              {
                "answer": "choice 1",
                "isCorrect": true or false
              },
              {
                "answer": "choice 2",
                "isCorrect": true or false
              }
              // More choices
            ]
          }
          // More questions
        ]
        `;
  
      if (subject === "history") {
        message += `
          Generate a true or false quiz using the following questions:
          1. Apartheid policies in South Africa were officially implemented in 1948 by the National Party government.
          2. The pass laws under apartheid restricted where Black South Africans could live, work, and travel.
          3. Nelson Mandela was imprisoned for only 10 years for his opposition to apartheid before being released in 1990.
          4. The African National Congress (ANC) was one of the main political organizations that opposed apartheid.
          5. The apartheid system in South Africa officially ended in 1990 with the release of Nelson Mandela.
        `;
      } else {
        message += `Generate questions based on the topic: ${prompt}. The user is a grade 12 student in South Africa, studying the subject ${subject}.`;
      }
  
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(message);
      const text = await result.response.text();
      const quizData = convertJsonToObject(text);
  
      if (quizData) {
        setQuizQuestions(quizData);
      } else {
        console.error("Failed to generate quiz with the topic provided.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
  

  const handleSubmitAnswer = async () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const selectedChoice = currentQuestion.choices.find(
      (choice) => choice.answer === userAnswer
    );

    let isAnswerCorrect = false;
    
    if (selectedChoice && selectedChoice.isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        isAnswerCorrect = true;
        setFeedback("Correct!");
    } else {
        setFeedback(
            `Incorrect! The correct answer was ${
                currentQuestion.choices.find((choice) => choice.isCorrect).answer
            }`
        );
    }

    setTimeout(async () => {
        setFeedback(null);
        setUserAnswer("");
        setSubmitHighlighted(false);

        // Move to the next question or finish the quiz
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setQuizFinished(true);

            // Calculate final score
            const finalScore = correctAnswers + (isAnswerCorrect ? 1 : 0);
            setScore(finalScore);

            // Update points if all answers are correct
            if (finalScore === quizQuestions.length) {
                try {
                    const userRef = doc(db, "users", currentUser.userId);
                    await updateDoc(userRef, {
                        "activity.points": currentUser.activity.points + 4, 
                    });
                    console.log("Points updated successfully.");
                } catch (error) {
                    console.error("Error updating points:", error);
                }
            } else {
                console.log("Not all answers were correct. No points awarded.");
            }
        }
    }, 2000);
};


  const handleOptionChange = (option) => {
    setUserAnswer(option);
    setSubmitHighlighted(true);
  };

  useEffect(() => {
    if (topic) {
      handleGenerateQuiz();
    }
  }, [topic]);

  return (
    <div className="p-6">
      {/* Loading Spinner */}
      {loading ? (
        <>
          <div className="flex justify-center mt-[10rem]">
            <div className="loader">
              <div>
                <ul>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
            {/* edit this element */}
          </div>
          <p className="mt-2 text-center text-gray-400 text-xl">
            Thuso is Generating a Quiz, please wait...
          </p>
        </>
      ) : (
        <>
          {/* Quiz Heading */}
          {!quizFinished && quizQuestions.length > 0 && (
            <div className="text-center pb-6">
              <h1 className="text-4xl font-bold text-[#0496ff]">
                {subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz
              </h1>
              <p className="mt-2 text-gray-600">
                Answer the questions below one by one.
              </p>
            </div>
          )}

          {/* Quiz Content */}
          {!quizFinished && quizQuestions.length > 0 && (
            <div className="bg-white shadow-xl rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800">
                {quizQuestions[currentQuestionIndex].question}
              </h3>
              <div className="mt-4">
                {quizQuestions[currentQuestionIndex].choices.map(
                  (choice, i) => (
                    <label key={i} className="block mb-2">
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={choice.answer}
                        onChange={() => handleOptionChange(choice.answer)}
                        className="mr-2"
                        checked={userAnswer === choice.answer}
                      />
                      {choice.answer}
                    </label>
                  )
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <button
                  className={`px-6 py-3 rounded-lg text-white ${
                    submitHighlighted
                      ? "bg-[#0496ff] hover:bg-[#0384e6]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer}
                >
                  Submit Answer
                </button>
              </div>

              {/* Feedback for the current question */}
              {feedback && (
                <div className="text-center mt-6">
                  <h2 className="text-xl font-bold text-[#0496ff]">
                    {feedback}
                  </h2>
                </div>
              )}
            </div>
          )}

          {quizFinished && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#0496ff]">
                Quiz Finished!
              </h2>
              <p className="mt-4 text-gray-600">
                Your final score is: {score}/{quizQuestions.length}{" "}
                {/* Total possible points */}
              </p>
          
            </div>
          )}
        </>
      )}
    </div>
  );
}

const convertJsonToObject = (jsonString) => {
  try {
    // Clean the input string if needed
    let cleanedString = jsonString;

    // Check if the response is surrounded by code block markers (```json or ```)
    if (cleanedString.startsWith("```")) {
      // Find the position of the closing backticks
      const closingBackticksPosition = cleanedString.lastIndexOf("```");
      
      if (closingBackticksPosition > 3) {
        // Extract content between opening and closing backticks
        // Skip the first line if it contains ```json
        const firstLineBreak = cleanedString.indexOf("\n");
        const startPosition = firstLineBreak > 3 ? firstLineBreak + 1 : 3;
        cleanedString = cleanedString.substring(startPosition, closingBackticksPosition).trim();
      }
    }

    // Try to parse the cleaned string as JSON
    const jsonObject = JSON.parse(cleanedString);

    // Validate the expected structure of the parsed object
    if (
      Array.isArray(jsonObject) &&
      jsonObject.every(
        (q) =>
          q.question &&
          Array.isArray(q.choices) &&
          q.choices.every(
            (choice) => choice.answer && typeof choice.isCorrect === "boolean"
          )
      )
    ) {
      return jsonObject;
    } else {
      throw new Error("Invalid JSON structure");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Received JSON:", jsonString); // Log the received JSON for debugging
    return null;
  }
};
