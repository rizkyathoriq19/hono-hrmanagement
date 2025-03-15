import { createRoute, z } from "@hono/zod-openapi"

export const attendanceSwagger = {
    getAttendancesRoute() { 
        return createRoute({
            method: 'get',
            path: '/attendance/all',
            tags: ['Attendance'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Get All Attendances',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                meta: z.object({
                                    current_page: z.number(),
                                    total_page: z.number(),
                                    total_row: z.number(),
                                }),
                                message: z.string(),
                                data: z.array(
                                    z.object({
                                        id: z.string(),
                                        employee: z.string(),
                                        department: z.string(),
                                        position: z.string(),
                                        checkin: z.date(),
                                        checkout: z.date(),
                                        date: z.date(),
                                        workStatus: z.string(),
                                        workDuration: z.string(),
                                        status: z.string(),
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
                403: {
                    description: 'Forbidden',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                code: z.number().default(403),
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
                }
            }
        })
    },

    getAttendanceByIdRoute() { 
        return createRoute({
            method: 'get',
            path: '/attendance/{id}',
            tags: ['Attendance'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'Employee ID'
            }],
            responses: {
                200: {
                    description: 'Get All Attendances',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    employee: z.string(),
                                    department: z.string(),
                                    position: z.string(),
                                    checkin: z.date(),
                                    checkout: z.date(),
                                    date: z.date(),
                                    workStatus: z.string(),
                                    workDuration: z.string(),
                                    status: z.string(),
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
                                code: z.number().default(401),
                                message: z.string()
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
                                code: z.number().default(403),
                                message: z.string()
                            })
                        }
                    }
                },
                404: {
                    description: 'Not found',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                code: z.number().default(404),
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
                }
            }
        })
    },

    checkInRoute() { 
        return createRoute({
            method: 'post',
            path: '/attendance/checkinout',
            tags: ['Attendance'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Checkin success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string()
                            })
                        }
                    }
                },
                400: {
                    description: 'Bad request',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                code: z.number().default(400),
                                message: z.string()
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
                }
            }
        })
    },

    checkOutRoute() { 
        return createRoute({
            method: 'patch',
            path: '/attendance/checkinout/{id}',
            tags: ['Attendance'],
            security: [{ Bearer: []
            }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'Attendance ID'
            }],
            responses: {
                200: {
                    description: 'Checkout success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string()
                            })
                        }
                    }
                },
                400: {
                    description: 'Bad request',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                code: z.number().default(400),
                                message: z.string()
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
                }
            } 
        })
    }
}