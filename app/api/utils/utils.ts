
/**
 * Calculates the total points from all answers
 * @author Andres
 * @param {StoredAnswer[]} answers - Array of answers
 * @returns {number} Total points
 */
export const calculateTotalPoints = (answers: StoredAnswer[]): number => {
    return answers.reduce((total, answer) => total + answer.points, 0);
}