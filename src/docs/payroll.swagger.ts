import { createRoute, z } from "@hono/zod-openapi"

export const payrollSwagger = {
    getPayrollsRoute() { 
        return createRoute({
            method: 'get',
            path: '/payroll/all',
            tags: ['Payroll'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Get All Payrolls',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    employee: z.string(),
                                    basicSalary: z.number(),
                                    overtime: z.number(),
                                    deductions: z.number(),
                                    netSalary: z.number(),
                                    paymentDate: z.date(),
                                })
                            })
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                message: z.string(),
                            })
                        }
                    }
                },
                403: {
                    description: 'Forbidden',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                message: z.string(),
                            })
                        }
                    }
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string(),
                            })
                        }
                    }
                },
            }
        })
    }

}