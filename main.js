// main.js

/**
 * Entry point that generates employees and computes statistics.
 * @param {object} dtoIn - Contains count, minAge, and maxAge
 * @returns {object} dtoOut - Contains statistics and sorted employee list
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeStatistics(employees);
}

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

function randomDate(minAge, maxAge) {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - minAge - 1, today.getMonth(), today.getDate());
  return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
}

export function getEmployeeStatistics(employees) {
  const today = new Date();
  const workloadsCount = { 10: 0, 20: 0, 30: 0, 40: 0 };
  const ages = [];
  let ageSum = 0;
  let femaleWorkloadSum = 0;
  let femaleCount = 0;
  let minAge = Infinity;
  let maxAge = -Infinity;

  for (const emp of employees) {
    const age = (today - new Date(emp.birthdate)) / (365.25 * 24 * 60 * 60 * 1000);
    ages.push(age);
    ageSum += age;
    minAge = Math.min(minAge, age);
    maxAge = Math.max(maxAge, age);
    workloadsCount[emp.workload]++;
    if (emp.gender === "female") {
      femaleWorkloadSum += emp.workload;
      femaleCount++;
    }
  }

  const averageAge = Math.trunc((ageSum / employees.length) * 10) / 10;
  const medianAge = Math.round(median(ages));
  const averageWomenWorkload = femaleCount === 0 ? 0 : Math.trunc((femaleWorkloadSum / femaleCount) * 10) / 10;
  const medianWorkload = calculateMedianWorkload(employees, workloadsCount);

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
    sortedByWorkload: [...employees].sort((a, b) => a.workload - b.workload),
  };
}

function median(list) {
  const sorted = [...list].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function calculateMedianWorkload(employees, workloadsCount) {
  const total = employees.length;
  const sortedWorkloads = [];

  for (let i = 0; i < workloadsCount[10]; i++) sortedWorkloads.push(10);
  for (let i = 0; i < workloadsCount[20]; i++) sortedWorkloads.push(20);
  for (let i = 0; i < workloadsCount[30]; i++) sortedWorkloads.push(30);
  for (let i = 0; i < workloadsCount[40]; i++) sortedWorkloads.push(40);

  const mid = Math.floor(total / 2);
  if (total % 2 === 0) {
    return (sortedWorkloads[mid - 1] + sortedWorkloads[mid]) / 2;
  } else {
    return sortedWorkloads[mid];
  }
}
