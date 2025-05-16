// main.js

const { randomInt, randomUUID } = require("crypto");

/**
 * Generate a random date string between the given age bounds.
 */
function randomBirthdate(minAge, maxAge) {
  const today = new Date();
  const minBirth = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  const maxBirth = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  const birthTime = minBirth.getTime() + Math.random() * (maxBirth.getTime() - minBirth.getTime());
  return new Date(birthTime).toISOString().split("T")[0];
}

/**
 * Generate a random employee object.
 */
function generateEmployee(minAge, maxAge, firstNames, lastNames) {
  const gender = Math.random() < 0.5 ? "male" : "female";
  return {
    id: randomUUID(),
    firstName: firstNames[randomInt(firstNames.length)],
    lastName: lastNames[randomInt(lastNames.length)],
    gender: gender,
    birthdate: randomBirthdate(minAge, maxAge),
    workload: parseFloat((10 + Math.random() * 40).toFixed(1)),
  };
}

/**
 * Generate multiple employees based on user input.
 */
function generateEmployees(dtoIn) {
  const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eva", "Frank", "Grace", "Hank"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];

  const employees = [];
  for (let i = 0; i < dtoIn.count; i++) {
    employees.push(generateEmployee(dtoIn.minAge, dtoIn.maxAge, firstNames, lastNames));
  }

  return employees;
}

/**
 * Calculate statistics about the list of employees.
 */
function getEmployeeStatistics(employees) {
  const today = new Date();

  const getAge = (birthdate) => {
    const birth = new Date(birthdate);
    return today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
  };

  const ages = employees.map(e => getAge(e.birthdate));
  const workloads = employees.map(e => e.workload);
  const women = employees.filter(e => e.gender === "female");
  const men = employees.filter(e => e.gender === "male");

  const avg = (arr) => arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0.0;
  const med = (arr) => {
    if (!arr.length) return 0.0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? parseFloat(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(1))
      : parseFloat((sorted[mid]).toFixed(1));
  };

  return {
    averageAge: avg(ages),
    medianWorkload: med(workloads),
    averageWomenWorkload: avg(women.map(e => e.workload)),
    averageMenWorkload: avg(men.map(e => e.workload)),
    minAge: Math.min(...ages),
    maxAge: Math.max(...ages),
  };
}

module.exports = { generateEmployees, getEmployeeStatistics };
