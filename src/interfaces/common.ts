interface PersonDataRecord {
  employeeId: string;
  projectId: string;
  dateFrom: Date;
  dateTo: Date;
}

interface Result {
  id_person1: string;
  id_person2: string;
  project_id: string;
  daysWorkedTogether: number;
}

export type { PersonDataRecord, Result };
