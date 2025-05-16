/**
 * Generates a list of employees based on input constraints.
 * @param {object} dtoIn
 * @returns {Array} list of employees
 */
function generateEmployeeData(dtoIn) {
  const { count, age } = dtoIn;
  const employees = [];

  const firstNames = ["Kai", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn", "John", "Patrick", "Laura", "Teresa", "Aaron", "Ivan", "Janus", "Orpheus", "Penelope", "Clementine", "Kim", "Andrew", "Patricia", "Urum", "Ryan", "Hugh", "Bob", "Thomas", "Charlie"];
  const lastNames = ["Sýkora", "Novák", "Svoboda", "Kučera", "Dvořák", "Černý", "Bennett", "Růžička", "Pavlík", "Tichý", "Musil", "Pokorný", "Zeman", "Klein", "Eliáš", "Bílek", "Havel", "Kaplan", "Heřman", "Jakubec", "Fiala", "Švec", "Průša", "Benda", "Moravec", "Březina", "Turek", "Baláž", "Musil"];

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomGender = () => Math.random() < 0.5 ? "male" : "female";

  function randomDate(minAge, maxAge) {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - minAge);
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - maxAge);
    const randomTime = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
    return new Date(randomTime);
  }

  const workloads = [10, 20, 30, 40];
  const getRandomWorkload = () => workloads[getRandomNumber(workloads.length)];

  for (let i = 0; i < count; i++) {
    const employee = {
      gender: getRandomGender(),
      birthdate: randomDate(age.min, age.max).toISOString(),
      name: firstNames[getRandomNumber(firstNames.length)],
      surname: lastNames[getRandomNumber(lastNames.length)],
      workload: getRandomWorkload()
    };
    employees.push(employee);
  }

  return employees;
}

/**
 * Computes various statistics based on the list of employees.
 * @param {Array} employees
 * @returns {object} summary statistics
 */
function getEmployeeStatistics(employees) {
  const now = new Date();
  const ages = employees.map(emp => {
    const birthDate = new Date(emp.birthdate);
    const age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    const dayDiff = now.getDate() - birthDate.getDate();
    return monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
  });

  const workloads = employees.map(emp => emp.workload);

  const averageAge = Math.round(ages.reduce((a, b) => a + b, 0) / ages.length);
  const averageWorkload = +(workloads.reduce((a, b) => a + b, 0) / workloads.length).toFixed(2);

  const sortedWorkloads = workloads.slice().sort((a, b) => a - b);
  const mid = Math.floor(sortedWorkloads.length / 2);
  const medianWorkload = sortedWorkloads.length % 2 === 0
    ? (sortedWorkloads[mid - 1] + sortedWorkloads[mid]) / 2
    : sortedWorkloads[mid];

  const minWorkload = Math.min(...workloads);
  const maxWorkload = Math.max(...workloads);

  return {
    averageAge,
    averageWorkload,
    medianWorkload,
    minWorkload,
    maxWorkload,
  };
}

/**
 * Main application function that combines generation and statistics.
 * @param {object} dtoIn contains employee count and age range
 * @returns {object} computed dtoOut with statistics
 */
function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);
  return dtoOut;
}

export {
  main,
  generateEmployeeData,
  getEmployeeStatistics
};
