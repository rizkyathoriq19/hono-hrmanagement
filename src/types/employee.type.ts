type TRole = "Manager" | "Staff" | "HR"

export type TRegister = {
    code: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    role: "Manager" | "Staff" | "HR"
}

export type TUpdate = TRegister & {
    status: "ACTIVE" | "INACTIVE"
}

export const roleMap: Record<TRole, number> = {
    Manager: 1,
    Staff: 2,
    HR: 3
};

export interface IEmployee {
    id: string;
    code: string;
    name: string;
    email: string;
    phone: string;
    department_id: string;
    department_name: string;
    position_id: string;
    position_name: string;
    role_id: number;
    role_name: string;
    hire_date: Date;
    status: string;
}