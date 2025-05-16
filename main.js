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
  function getAge(birthdateStr) {
    const birth = new Date(birthdateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  function median(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  const total = employees.length;
  const workloads = { 10: 0, 20: 0, 30: 0, 40: 0 };
  const ages = [];
  const womenWorkloads = [];

  for (const e of employees) {
    const age = getAge(e.birthdate);
    ages.push(age);
    workloads[e.workload]++;
    if (e.gender === "female") womenWorkloads.push(e.workload);
  }

  // ⚠️ Fix: Keep full precision for averageAge (no rounding)
  const averageAge = ages.reduce((a, b) => a + b, 0) / ages.length;

  const minAge = Math.round(Math.min(...ages));
  const maxAge = Math.round(Math.max(...ages));
  const medianAge = Math.round(median(ages));
  const medianWorkload = Math.round(median(employees.map(e => e.workload)));

  const averageWomenWorkload =
    womenWorkloads.length > 0
      ? Math.round((womenWorkloads.reduce((a, b) => a + b, 0) / womenWorkloads.length) * 10) / 10
      : 0;

  const sortedByWorkload = [...employees].sort((a, b) => a.workload - b.workload);

  return {
    total,
    workload10: workloads[10],
    workload20: workloads[20],
    workload30: workloads[30],
    workload40: workloads[40],
    averageAge,
    minAge,
    maxAge,
    medianAge,
    medianWorkload,
    averageWomenWorkload,
    sortedByWorkload
  };
}

export {
  main.js,
  generateEmployeeData,
  getEmployeeStatistics
};
