import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 font-roboto">
            Пять вопросов профессионалу
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Профессиональный тест на знание основ управления продажами и
            развития бизнеса. Проверьте свои компетенции.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <div className="font-semibold text-gray-900">5 вопросов</div>
                <div>Экспертный уровень</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">7 баллов</div>
                <div>За каждый правильный ответ</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">35 баллов</div>
                <div>Максимальный результат</div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate("/question/1")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
            size="lg"
          >
            Начать тестирование
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
