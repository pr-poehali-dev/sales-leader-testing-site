import { create } from "zustand";

interface TestState {
  currentQuestion: number;
  answers: Record<number, number>;
  totalScore: number;
  isCompleted: boolean;
  setAnswer: (questionId: number, answerIndex: number) => void;
  nextQuestion: () => void;
  resetTest: () => void;
  calculateScore: () => number;
}

export const useTestStore = create<TestState>((set, get) => ({
  currentQuestion: 1,
  answers: {},
  totalScore: 0,
  isCompleted: false,

  setAnswer: (questionId: number, answerIndex: number) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answerIndex },
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
      totalScore: 0,
      isCompleted: false,
    });
  },

  calculateScore: () => {
    const { answers } = get();
    let score = 0;

    // Правильные ответы (индексы): [1, 1, 2, 2, 2]
    const correctAnswers = [1, 1, 2, 2, 2];

    for (let i = 1; i <= 5; i++) {
      if (answers[i] === correctAnswers[i - 1]) {
        score += 7;
      }
    }

    return score;
  },
}));
