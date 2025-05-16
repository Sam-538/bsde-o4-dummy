// main.js

export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);
  return dtoOut;
}

function generateEmployeeData(dtoIn) {
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

function getEmployeeStatistics(employees) {
  const today = new Date();
  const ages = employees.map(emp => {
    const birth = new Date(emp.birthdate);
    return (today - birth) / (1000 * 60 * 60 * 24 * 365.25);
  });

  const workloads = employees.map(e => e.workload);

  // Count workloads
  const workload10 = workloads.filter(w => w === 10).length;
  const workload20 = workloads.filter(w => w === 20).length;
  const workload30 = workloads.filter(w => w === 30).length;
  const workload40 = workloads.filter(w => w === 40).length;

  // Average age
  const averageAge = +(ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1);

  // Min and Max age
  const minAge = Math.round(Math.min(...ages));
  const maxAge = Math.round(Math.max(...ages));

  // Median age
  const medianAge = Math.round(median(ages));

  // Median workload
  const medianWorkload = Math.round(median(workloads));

  // Average workload for females
  const femaleWorkloads = employees
    .filter(e => e.gender === "female")
    .map(e => e.workload);
  const averageWomenWorkload = femaleWorkloads.length > 0
    ? +(femaleWorkloads.reduce((a, b) => a + b, 0) / femaleWorkloads.length).toFixed(1)
    : 0;

  // Sort by workload
  const sortedByWorkload = [...employees].sort((a, b) => a.workload - b.workload);

  return {
    total: employees.length,
    workload10,
    workload20,
    workload30,
    workload40,
    averageAge,
    minAge,
    maxAge,
    medianAge,
    medianWorkload,
    averageWomenWorkload,
    sortedByWorkload,
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}
