import { generateEmployeeData } from "./src/generateEmployeeData.js";
import { getEmployeeStatistics } from "./src/getEmployeeStatistics.js";

/**
 * Main function that ties together generation and statistics.
 * @param {object} dtoIn { count, age: { min, max } }
 * @returns {object} dtoOut with all calculated statistics
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);
  return dtoOut;
}
