export interface IAttendance {
    id: string,
    employee_id: string,
    employee_name: string,
    department_id: string,
    department_name: string,
    position_id: string,
    position_name: string,
    check_in: Date | null,
    check_out: Date | null,
    date: Date,
    work_status: string | null,
    work_duration: number | null,
    status: string,
    check_in_lat: number | null,
    check_in_long: number | null,
    check_out_lat: number | null,
    check_out_long: number | null
}