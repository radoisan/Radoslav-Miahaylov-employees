import { PersonDataRecord } from "../interfaces/common";

const parseFileData = (fileData: string[]): PersonDataRecord[] => {
  const parsedData = fileData.map((element) => {
    const splitElements = element.replace('"', "").split(";");

    const dateTo = !splitElements[3].includes("NULL")
      ? new Date(splitElements[3])
      : new Date();

    return {
      employeeId: splitElements[0],
      projectId: splitElements[1],
      dateFrom: new Date(splitElements[2]),
      dateTo: dateTo,
    };
  });
  return parsedData;
};

export { parseFileData };
