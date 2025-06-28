import { create } from "zustand";

interface TestState {
  currentQuestion: number;
  answers: Record<number, number>;
  customAnswers: Record<number, string>;
  totalScore: number;
  isCompleted: boolean;
  setAnswer: (questionId: number, answerIndex: number) => void;
  setCustomAnswer: (questionId: number, customText: string) => void;
  nextQuestion: () => void;
  resetTest: () => void;
  calculateScore: () => number;
}

export const useTestStore = create<TestState>((set, get) => ({
  currentQuestion: 1,
  answers: {},
  customAnswers: {},
  totalScore: 0,
  isCompleted: false,

  setAnswer: (questionId: number, answerIndex: number) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answerIndex },
    }));
  },

  setCustomAnswer: (questionId: number, customText: string) => {
    set((state) => ({
      customAnswers: { ...state.customAnswers, [questionId]: customText },
    }));
  },

  nextQuestion: () => {
    const current = get().currentQuestion;
    if (current < 5) {
      set({ currentQuestion: current + 1 });
    } else {
      const score = get().calculateScore();
      set({ isCompleted: true, totalScore: score });
    }
  },

  resetTest: () => {
    set({
      currentQuestion: 1,
      answers: {},
      customAnswers: {},
      totalScore: 0,
      isCompleted: false,
    });
  },

  calculateScore: () => {
    const { answers, customAnswers } = get();
    let score = 0;

    // Правильные ответы (индексы): [1, 1, 2, 2, 2]
    const correctAnswers = [1, 1, 2, 2, 2];

    for (let i = 1; i <= 5; i++) {
      if (answers[i] === correctAnswers[i - 1]) {
        if (i === 1) {
          // Для первого вопроса: проверяем кастомный ответ
          if (
            customAnswers[1] === "Увеличение доли рынка и рост маржинальности"
          ) {
            score += 7;
          } else {
            score += 3;
          }
        } else {
          // Для остальных вопросов: 7 баллов
          score += 7;
        }
      }
    }

    return score;
  },
}));
