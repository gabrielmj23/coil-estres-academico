
export interface PointsByIndicator {
    [idIndicador: number]: number;
  }
  

/**
 * Calculates the total points from all answers
 * @author Andres
 * @param {StoredAnswer[]} answers - Array of answers
 * @returns {number} Total points
 */
export const calculatePointsSISCO = (answers: StoredAnswer[]): number => {
    return answers.reduce((total, answer) => total + answer.points, 0);
}

export const calculatePointsGoldberg = (answers: StoredAnswer[]): PointsByIndicator => {
    return answers.reduce((acc, answer) => {
        if(!acc[answer.indicatorId]) {
            acc[answer.indicatorId] = 0;
        }
        acc[answer.indicatorId] += answer.points;
        return acc;
    }, {} as PointsByIndicator)
}