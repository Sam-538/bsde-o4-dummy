function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(minAge, maxAge) {
  const currentYear = new Date().getFullYear();
  const minBirthYear = currentYear - maxAge;
  const maxBirthYear = currentYear - minAge;
  const year = getRandomInt(minBirthYear, maxBirthYear);
  const month = getRandomInt(0, 11);
  const day = getRandomInt(1, 28);
  return new Date(year, month, day).toISOString().split("T")[0];
}

function generateEmployeeData(minAge, maxAge, firstNames, lastNames) {
  const genders = ["male", "female"];
  return {
    name: `${firstNames[getRandomInt(0, firstNames.length - 1)]} ${lastNames[getRandomInt(0, lastNames.length - 1)]}`,
    gender: genders[getRandomInt(0, 1)],
    birthdate: getRandomDate(minAge, maxAge),
    workload: getRandomInt(10, 100)
  };
}

function main(dtoIn) {
  const count = dtoIn.count;
  const minAge = dtoIn.minAge;
  const maxAge = dtoIn.maxAge;

  const firstNames = ["John", "Jane", "Alex", "Chris", "Sam"];
  const lastNames = ["Smith", "Doe", "Johnson", "Lee", "Brown"];
  const employees = [];

  for (let i = 0; i < count; i++) {
    employees.push(generateEmployeeData(minAge, maxAge, firstNames, lastNames));
  }

  return employees;
}

function getEmployeeStatistics(employees) {
  const ages = [];
  const workloads = [];
  const maleWorkloads = [];
  const femaleWorkloads = [];
  const today = new Date();

  employees.forEach(emp => {
    const birth = new Date(emp.birthdate);
    const age = today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
    ages.push(age);
    workloads.push(emp.workload);
    if (emp.gender === "male") maleWorkloads.push(emp.workload);
    if (emp.gender === "female") femaleWorkloads.push(emp.workload);
  });

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length || 0;
  const median = arr => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };

  return {
    averageAge: Math.round(average(ages) * 10) / 10,
    averageWorkload: Math.round(average(workloads) * 10) / 10,
    averageMenWorkload: Math.round(average(maleWorkloads) * 10) / 10,
    averageWomenWorkload: Math.round(average(femaleWorkloads) * 10) / 10,
    medianWorkload: Math.round(median(workloads) * 10) / 10
  };
}

// ✅ Export functions required by tests
export { main, generateEmployeeData, getEmployeeStatistics };
