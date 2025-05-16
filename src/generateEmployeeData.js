export function generateEmployeeData(dtoIn) {
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
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge - 1, today.getMonth(), today.getDate());
    return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
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
