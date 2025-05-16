// main.js

/**
 * Entry function to generate and analyze employee data.
 * @param {object} dtoIn - Contains { count, age: { min, max } }
 * @returns {object} dtoOut - Contains employee statistics and sorted list
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeStatistics(employees);
}

/**
 * Generates a random list of employee objects.
 * @param {object} dtoIn - Contains { count, age: { min, max } }
 * @returns {Array} List of employee objects
 */
export function generateEmployeeData(dtoIn) {
  const { count, age } = dtoIn;
  const employees = [];

  const firstNames = ["Kai", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn", "John", "Patrick", "Laura", "Teresa", "Aaron", "Ivan", "Janus", "Orpheus", "Penelope", "Clementine", "Kim", "Andrew", "Patricia", "Urum", "Ryan", "Hugh", "Bob", "Thomas", "Charlie"];
  const lastNames = ["Sýkora", "Novák", "Svoboda", "Kŭučera", "Dvořák", "Černý", "Bennett", "Růžička", "Pavlík", "Tichý", "Musil", "Pokorný", "Zeman", "Klein", "Eliáš", "Bílek", "Havel", "Kaplan", "Heřman", "Jakubec", "Fiala", "Švec", "Průša", "Benda", "Moravec", "Březina", "Turek", "Baláž", "Musil"];
  const workloads = [10, 20, 30, 40];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomGender() {
    return Math.random() < 0.5 ? "male" : "female";
  }

  function randomDate(minAge, maxAge) {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge - 1, today.getMonth(), today.getDate());
    return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
  }

  for (let i = 0; i < count; i++) {
    employees.push({
      gender: getRandomGender(),
      birthdate: randomDate(age.min, age.max).toISOString(),
      name: firstNames[getRandomInt(firstNames.length)],
      surname: lastNames[getRandomInt(lastNames.length)],
      workload: workloads[getRandomInt(workloads.length)]
    });
  }

  return employees;
}

/**
 * Analyzes employee data and returns statistics.
 * @param {Array} employees - List of employee objects
 * @returns {object} dtoOut - Statistics and sorted employees
 */
export function getEmployeeStatistics(employees) {
  const today = new Date();
  const ageList = [];
  const workloadsCount = { 10: 0, 20: 0, 30: 0, 40: 0 };

  let totalAge = 0;
  let minAge = Infinity;
  let maxAge = -Infinity;
  let womenWorkloadSum = 0;
  let womenCount = 0;

  for (const emp of employees) {
    const age = (today - new Date(emp.birthdate)) / (365.25 * 24 * 60 * 60 * 1000);
    totalAge += age;
    minAge = Math.min(minAge, age);
    maxAge = Math.max(maxAge, age);
    ageList.push(age);

    workloadsCount[emp.workload]++;

    if (emp.gender === "female") {
      womenWorkloadSum += emp.workload;
      womenCount++;
    }
  }

  const averageAge = Number((totalAge / employees.length).toFixed(1));
  const medianAge = Math.round(median(ageList));

  let cumulative = 0;
  let medianWorkload = 0;
  const sortedWorkloads = [10, 20, 30, 40];
  for (let i = 0; i < sortedWorkloads.length; i++) {
    cumulative += workloadsCount[sortedWorkloads[i]];
    if (cumulative >= Math.ceil(employees.length / 2)) {
      medianWorkload = sortedWorkloads[i];
      break;
    }
  }

  const averageWomenWorkload = womenCount > 0 ? Number((womenWorkloadSum / womenCount).toFixed(1)) : 0;

  return {
    total: employees.length,
    workload10: workloadsCount[10],
    workload20: workloadsCount[20],
    workload30: workloadsCount[30],
    workload40: workloadsCount[40],
    averageAge,
    minAge: Math.floor(minAge),
    maxAge: Math.floor(maxAge),
    medianAge,
    medianWorkload,
    averageWomenWorkload,
    sortedByWorkload: [...employees].sort((a, b) => a.workload - b.workload)
  };
}

/**
 * Calculates the median of an array of numbers.
 * @param {Array<number>} numbers
 * @returns {number} Median value
 */
function median(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}
