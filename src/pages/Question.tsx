import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { questions } from "@/lib/questions";
import { useTestStore } from "@/lib/store";

const Question = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionId = parseInt(id || "1");
  const question = questions.find((q) => q.id === questionId);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const { setAnswer, nextQuestion, answers } = useTestStore();

  if (!question) {
    navigate("/");
    return null;
  }

  const existingAnswer = answers[questionId];
  const currentAnswer = selectedAnswer !== null ? selectedAnswer : null;

  const handleNext = () => {
    if (currentAnswer !== null && currentAnswer !== undefined) {
      setAnswer(questionId, currentAnswer);

      if (questionId < 5) {
        navigate(`/question/${questionId + 1}`);
      } else {
        nextQuestion();
        navigate("/results");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <ProgressBar current={questionId} total={5} />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            {question.question}
          </h1>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  currentAnswer === index
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={currentAnswer === index}
                  onChange={() => setSelectedAnswer(index)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      currentAnswer === index
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {currentAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() =>
                questionId > 1
                  ? navigate(`/question/${questionId - 1}`)
                  : navigate("/")
              }
              className="px-6"
            >
              {questionId > 1 ? "Назад" : "На главную"}
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentAnswer === null && currentAnswer === undefined}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {questionId < 5 ? "Далее" : "Завершить тест"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
