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
                                code: z.number().default(200),
                                meta: z.object({
                                    current_page: z.number(),
                                    total_pages: z.number(),
                                    total_row: z.number()
                                }),
                                message: z.string(),
                                data: z.array(
                                    z.object({
                                        id: z.string(),
                                        employee: z.string(),
                                        basicSalary: z.number(),
                                        overtime: z.number(),
                                        deductions: z.number(),
                                        netSalary: z.number(),
                                        paymentDate: z.date(),
                                    })
                                )
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
                                code: z.number().default(401),
                                message: z.string()
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
                                code: z.number().default(500),
                                message: z.string()
                            })
                        }
                    }
                },
            }
        })
    },

    fileUploadPayrollRoute() { 
        return createRoute({
            method: 'post',
            path: '/payroll/upload',
            tags: ['Payroll'],
            security: [{ Bearer: [] }],
            request: {
                body: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: 'object',
                                properties: {
                                    payroll: {
                                        type: 'string',
                                        format: 'binary'
                                    }
                                },
                                required: ['payroll']
                            },
                            encoding: {
                                payroll: {
                                    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                }
                            }
                        }
                    },
                    required: true
                }
            },
            responses: {
                200: {
                    description: 'File upload success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.number()
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
                                code: z.number().default(401),
                                message: z.string()
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
                                code: z.number().default(500),
                                message: z.string()
                            })
                        }
                    }
                },
            }
        })
    },
}