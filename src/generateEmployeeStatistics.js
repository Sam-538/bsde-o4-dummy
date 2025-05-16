function getAge(birthdate) {
  const birth = new Date(birthdate);
  const today = new Date();
  return (today - birth) / (1000 * 60 * 60 * 24 * 365.25);
}

function median(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function getEmployeeStatistics(employees) {
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

  const averageAge = Math.round((ages.reduce((a, b) => a + b, 0) / ages.length) * 10) / 10;
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
