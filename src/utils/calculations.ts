import { PersonDataRecord, Result } from "../interfaces/common";

//-----------------------
const calcOverlapInDays = (
  range1Start: Date,
  range1End: Date,
  range2Start: Date,
  range2End: Date
) => {
  const startDate = range1Start > range2Start ? range1Start : range2Start;
  const endDate = range1End < range2End ? range1End : range2End;

  //Calculate the number of days in the overlap
  let overlapDays = 0;
  if (startDate < endDate) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    overlapDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return overlapDays;
};

//------------------------------------------------------------------------------
function findLongestWorkingPairs(records: PersonDataRecord[]): Result[] {
  // Create an empty dictionary to store information about employees who have worked together
  const employeesByProject: { [key: string]: string[] } = {};

  // Iterate over the records and group employees by project
  for (const record of records) {
    if (!employeesByProject[record.projectId]) {
      employeesByProject[record.projectId] = [record.employeeId];
    } else {
      employeesByProject[record.projectId].push(record.employeeId);
    }
  }

  // Create an array to store the results
  const results: Result[] = [];

  // Iterate over the dictionary and find all pairs of employees who have worked together
  for (const projectId in employeesByProject) {
    const employees = employeesByProject[projectId];

    for (let i = 0; i < employees.length; i++) {
      for (let j = i + 1; j < employees.length; j++) {
        const employee1 = employees[i];
        const employee2 = employees[j];

        // Find the number of days worked together
        const dateFrom1 = records.find(
          (r) => r.employeeId === employee1
        )?.dateFrom;
        const dateTo1 = records.find((r) => r.employeeId === employee1)?.dateTo;

        const dateFrom2 = records.find(
          (r) => r.employeeId === employee2
        )?.dateFrom;
        const dateTo2 = records.find((r) => r.employeeId === employee2)?.dateTo;

        const daysWorkedTogether = calcOverlapInDays(
          dateFrom1!,
          dateTo1!,
          dateFrom2!,
          dateTo2!
        );

        // Add the result to the array
        results.push({
          id_person1: employee1,
          id_person2: employee2,
          project_id: projectId,
          daysWorkedTogether,
        });
      }
    }
  }

  let maxDaysWorkedTogether = 0;
  const longestWorkingPairs: Result[] = [];

  // Find the pair of employees who have worked together for the longest period of time
  for (const result of results) {
    if (result.daysWorkedTogether > maxDaysWorkedTogether) {
      longestWorkingPairs.push(result);
    }
  }
  return longestWorkingPairs;
}

export { findLongestWorkingPairs, calcOverlapInDays };
