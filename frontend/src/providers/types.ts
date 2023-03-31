export interface Dataset {
  id: string;
  name: string;
  type: string;
  fiscalYear: number;
  dateRangeStart: string;
  dateRangeEnd: string;
  startDate: string;
  approvalDate?: string;
  status: number;
  verificationStatus: string;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  model: string;
  year: string;
  approvalDate?: string;
  authorId?: string;
  verificationStatus?: string;
}
