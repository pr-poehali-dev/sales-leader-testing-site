import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTestStore } from "@/lib/store";
import { useEffect } from "react";

const Results = () => {
  const navigate = useNavigate();
  const { totalScore, resetTest, calculateScore } = useTestStore();

  useEffect(() => {
    // Пересчитываем результат при загрузке страницы
    calculateScore();
  }, [calculateScore]);

  const finalScore = totalScore || calculateScore();

  const getResultInterpretation = (score: number) => {
    if (score >= 30) {
      return {
        title: "Отличный результат!",
        description:
          "Вы демонстрируете высокий уровень профессиональных компетенций в области управления продажами. Ваши знания соответствуют требованиям руководящих позиций.",
        color: "text-green-600",
      };
    } else if (score >= 21) {
      return {
        title: "Хороший результат",
        description:
          "У вас есть базовые знания в области продаж и управления, но есть области для развития. Рекомендуем дополнительное обучение по отдельным вопросам.",
        color: "text-blue-600",
      };
    } else if (score >= 14) {
      return {
        title: "Средний результат",
        description:
          "Базовые знания присутствуют, но требуется серьезная работа над повышением квалификации. Рекомендуем систематическое изучение основ управления продажами.",
        color: "text-yellow-600",
      };
    } else {
      return {
        title: "Требуется обучение",
        description:
          "Результат показывает необходимость в комплексном изучении основ управления продажами и развития лидерских навыков.",
        color: "text-red-600",
      };
    }
  };

  const result = getResultInterpretation(finalScore);

  const handleRestart = () => {
    resetTest();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Результаты тестирования
          </h1>

          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {finalScore}
            </div>
            <div className="text-xl text-gray-600">из 35 возможных баллов</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${result.color}`}>
              {result.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {result.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((finalScore / 35) * 100)}%
              </div>
              <div className="text-sm text-gray-600">
                Процент правильных ответов
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-700">5/5</div>
              <div className="text-sm text-gray-600">Вопросов отвечено</div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleRestart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
              size="lg"
            >
              Пройти тест заново
            </Button>

            <div>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="px-6"
              >
                На главную страницу
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
