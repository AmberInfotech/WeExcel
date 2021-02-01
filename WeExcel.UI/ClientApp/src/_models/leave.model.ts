export interface Leave {
    leaveTypeId: number;
    empId: number;
    fromDate: Date | string;
    toDate: Date | string;
    reason: string;
}