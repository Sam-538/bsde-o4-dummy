/**
 * Generates a list of employees based on input criteria.
 * @param {object} dtoIn - Contains count and age {min, max}
 * @returns {Array} - List of generated employees
 */
export function generateEmployeeData(count, minAge, maxAge, firstNames, lastNames) {
  const employees = [];

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomGender = () => (Math.random() < 0.5 ? "male" : "female");

  function randomDate(minAge, maxAge) {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
  }

  const workloads = [10, 20, 30, 40];
  const getRandomWorkload = () => workloads[getRandomNumber(workloads.length)];

  for (let i = 0; i < count; i++) {
    employees.push({
      gender: getRandomGender(),
      birthdate: randomDate(minAge, maxAge).toISOString(),
      name: firstNames[getRandomNumber(firstNames.length)],
      surname: lastNames[getRandomNumber(lastNames.length)],
      workload: getRandomWorkload(),
    });
  }

  return employees;
}

/**
 * Returns employee statistics like average age and workload.
 * @param {Array} employees
 * @returns {Object} - Stats like average age, workload, etc.
 */
export function getEmployeeStatistics(employees) {
  const today = new Date();

  const totalEmployees = employees.length;
  const totalAge = employees.reduce((sum, emp) => {
    const birth = new Date(emp.birthdate);
    return sum + (today.getFullYear() - birth.getFullYear());
  }, 0);

  const totalWorkload = employees.reduce((sum, emp) => sum + emp.workload, 0);

  const women = employees.filter(e => e.gender === "female");
  const avgWomenWorkload = women.length === 0
    ? 0
    : women.reduce((sum, e) => sum + e.workload, 0) / women.length;

  return {
    averageAge: parseFloat((totalAge / totalEmployees).toFixed(1)),
    averageWorkload: parseFloat((totalWorkload / totalEmployees).toFixed(1)),
    averageWomenWorkload: parseFloat(avgWomenWorkload.toFixed(1)),
    employeeCount: totalEmployees
  };
}

/**
 * Main function as required by the assignment spec.
 * @param {object} dtoIn - { count: number, age: { min: number, max: number } }
 * @returns {Array} Generated employee data
 */
export function main(dtoIn) {
  const firstNames = ["Kai", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn", "John", "Patrick", "Laura", "Teresa", "Aaron", "Ivan", "Janus", "Orpheus", "Penelope", "Clementine", "Kim", "Andrew", "Patricia", "Urum", "Ryan", "Hugh", "Bob", "Thomas", "Charlie"];
  const lastNames = ["Sýkora", "Novák", "Svoboda", "Kučera", "Dvořák", "Černý", "Bennett", "Růžička", "Pavlík", "Tichý", "Musil", "Pokorný", "Zeman", "Klein", "Eliáš", "Bílek", "Havel", "Kaplan", "Heřman", "Jakubec", "Fiala", "Švec", "Průša", "Benda", "Moravec", "Březina", "Turek", "Baláž", "Musil"];

  return generateEmployeeData(dtoIn.count, dtoIn.age.min, dtoIn.age.max, firstNames, lastNames);
}
