// main.js

/**
 * Entry function that ties everything together.
 * @param {object} dtoIn - Input object with count and age range
 * @returns {object} dtoOut - Output statistics and sorted list
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);
  return dtoOut;
}

/**
 * Generates a random list of employees within the age range.
 * @param {object} dtoIn - Input with employee count and age limits
 * @returns {Array} employees
 */
export function generateEmployeeData(dtoIn) {
  const { count, age } = dtoIn;
  const employees = [];

  const firstNames = ["Kai", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn", "John", "Patrick", "Laura", "Teresa", "Aaron", "Ivan", "Janus", "Orpheus", "Penelope", "Clementine", "Kim", "Andrew", "Patricia", "Urum", "Ryan", "Hugh", "Bob", "Thomas", "Charlie"];
  const lastNames = ["Sýkora", "Novák", "Svoboda", "Kučera", "Dvořák", "Černý", "Bennett", "Růžička", "Pavlík", "Tichý", "Musil", "Pokorný", "Zeman", "Klein", "Eliáš", "Bílek", "Havel", "Kaplan", "Heřman", "Jakubec", "Fiala", "Švec", "Průša", "Benda", "Moravec", "Březina", "Turek", "Baláž", "Musil"];
  const workloads = [10, 20, 30, 40];

  for (let i = 0; i < count; i++) {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const birthdate = randomDate(age.min, age.max).toISOString();
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const surname = lastNames[Math.floor(Math.random() * lastNames.length)];
    const workload = workloads[Math.floor(Math.random() * workloads.length)];

    employees.push({ gender, birthdate, name, surname, workload });
  }

  return employees;
}

/**
 * Generates a random birthdate for a given age range.
 * @param {number} minAge
 * @param {number} maxAge
 * @returns {Date} birthdate
 */
function randomDate(minAge, maxAge) {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - minAge - 1, today.getMonth(), today.getDate());
  return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
}

/**
 * Calculates statistical output based on the employee list.
 * @param {Array} employees
 * @returns {object} dtoOut
 */
export function getEmployeeStatistics(employees) {
  const today = new Date();

  const workloadsCount = { 10: 0, 20: 0, 30: 0, 40: 0 };
  const workloadsList = [];
  const ageList = [];
  let totalAge = 0;
  let minAge = Infinity;
  let maxAge = -Infinity;

  let femaleWorkloadSum = 0;
  let femaleCount = 0;

  for (const emp of employees) {
    // Age
    const age = (today - new Date(emp.birthdate)) / (1000 * 60 * 60 * 24 * 365.25);
    ageList.push(age);
    totalAge += age;
    if (age < minAge) minAge = age;
    if (age > maxAge) maxAge = age;

    // Workload
    workloadsCount[emp.workload]++;
    workloadsList.push(emp.workload);

    // Female workload
    if (emp.gender === "female") {
      femaleWorkloadSum += emp.workload;
      femaleCount++;
    }
  }

  // Median workload as per professor spec
  const middleIndex = Math.floor(employees.length / 2);
  let cumulative = 0;
  let medianWorkload = 0;
  for (let i = 10; i <= 40; i += 10) {
    cumulative += workloadsCount[i];
    if (cumulative >= middleIndex + 1) {
      if (employees.length % 2 === 0 && cumulative - workloadsCount[i] >= middleIndex) {
        medianWorkload = 0.5 * i + 0.5 * (i - 10);
      } else {
        medianWorkload = i;
      }
      break;
    }
  }

  const averageAge = +(totalAge / employees.length).toFixed(1);
  const medianAge = Math.round(median(ageList));
  const averageWomenWorkload = femaleCount > 0
    ? +(femaleWorkloadSum / femaleCount).toFixed(1)
    : 0;

  return {
    total: employees.length,
    workload10: workloadsCount[10],
    workload20: workloadsCount[20],
    workload30: workloadsCount[30],
    workload40: workloadsCount[40],
    averageAge,
    minAge: Math.round(minAge),
    maxAge: Math.round(maxAge),
    medianAge,
    medianWorkload,
    averageWomenWorkload,
    sortedByWorkload: [...employees].sort((a, b) => a.workload - b.workload),
  };
}

/**
 * Returns the median of a list of numbers.
 * @param {Array<number>} numbers
 * @returns {number}
 */
function median(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}
