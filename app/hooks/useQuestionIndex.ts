import { useState } from "react";

/**
 * Hook for handling questionnaire index for a section
 * @author Gabriel Méndez <gabrielmj2312@gmail.com>
 * @returns The question index, a function to increment by one, and a function to decrement by one
 */
export function useQuestionIndex() {
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const goBack = () => {
    setQuestionIndex((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  };

  return [questionIndex, nextQuestion, goBack] as const;
}
