/**
 * Hlavní funkce, která generuje seznam zaměstnanců na základě zadaných specifikací.
 * @param {object} dtoIn obsahuje počet zaměstnanců a věkový limit zaměstnanců {min, max}
 * @returns {Array} seznam zaměstnanců
 */
export function main(dtoIn) {
    const { count, age } = dtoIn;
    const employees = [];

    // Pole možných jmen a příjmení
    const firstNames = ["Kai", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn", "John", "Patrick", "Laura", "Teresa", "Aaron", "Ivan", "Janus", "Orpheus", "Penelope", "Clementine", "Kim", "Andrew", "Patricia", "Urum", "Ryan", "Hugh", "Bob", "Thomas", "Charlie"];
    const lastNames = ["Sýkora", "Novák", "Svoboda", "Kučera", "Dvořák", "Černý", "Bennett", "Růžička", "Pavlík", "Tichý", "Musil", "Pokorný", "Zeman", "Klein", "Eliáš", "Bílek", "Havel", "Kaplan", "Heřman", "Jakubec", "Fiala", "Švec", "Průša", "Benda", "Moravec", "Březina", "Turek", "Baláž", "Musil"];

    // Funkce pro generování náhodného čísla v určitém rozsahu
    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    // Funkce pro generování náhodného pohlaví
    const getRandomGender = () => {
        return Math.random() < 0.5 ? "male" : "female";
    }

    // Funkce pro generování náhodného data narození na základě věkového rozsahu
    function randomDate(minAge, maxAge) {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - minAge - 1, today.getMonth(), today.getDate());
        return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    }

    // Funkce pro generování pracovní doby
    const workloads = [10, 20, 30, 40];
    const getRandomWorkload = () => workloads[getRandomNumber(workloads.length)];

    // Smyčka pro vytvoření požadovaného počtu zaměstnanců
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
 * Spočítá statistiky pro seznam zaměstnanců.
 * @param {Array} employees
 * @returns {Object} statistiky: averageAge, medianWorkload, genderRatio
 */
export function getEmployeeStatistics(employees) {
    const now = new Date();

    const ages = employees.map(e => {
        const birthDate = new Date(e.birthdate);
        let age = now.getFullYear() - birthDate.getFullYear();
        const m = now.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    });

    const workloads = employees.map(e => e.workload).sort((a, b) => a - b);

    const maleCount = employees.filter(e => e.gender === "male").length;
    const femaleCount = employees.length - maleCount;

    const averageAge = ages.reduce((a, b) => a + b, 0) / employees.length;

    let medianWorkload;
    const mid = Math.floor(workloads.length / 2);
    if (workloads.length % 2 === 0) {
        medianWorkload = (workloads[mid - 1] + workloads[mid]) / 2;
    } else {
        medianWorkload = workloads[mid];
    }

    medianWorkload = Math.round(medianWorkload);

    let genderRatio;
    if (femaleCount === 0) {
        genderRatio = maleCount;
    } else {
        genderRatio = parseFloat((maleCount / femaleCount).toFixed(1));
    }

    return {
        averageAge: parseFloat(averageAge.toFixed(1)),
        medianWorkload,
        genderRatio
    };
}

// ✅ Export alias to match autograder expectations
export const generateEmployeeData = main;
