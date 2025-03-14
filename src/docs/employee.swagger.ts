import { createRoute, z } from "@hono/zod-openapi"


export const employeeSwagger = {

    /**
     * 🔹 Route: Add Employee
     */
    addEmployeeRoute() {
        return createRoute({
            method: 'post',
            path: '/employee/add',
            tags: ['Employee'],
            security: [{ Bearer: [] }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                code: z.string().nonempty({message: "ID is required"}),
                                name: z.string().nonempty({message: "Name is required"}),
                                email: z.string().email({message: "Invalid email"}).nonempty({message: "Email is required"}),
                                phone: z.string().nonempty({message: "Phone is required"}),
                                department: z.string().nonempty({message: "Department is required"}),
                                position: z.string().nonempty({message: "Position is required"}),
                                role: z.enum(["Manager", "Staff", "HR"], {message: "Invalid role"})
                            })
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Employee created successfully",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                message: z.string(),
                            }),
                        }
                    }
                },
                400: {
                    description: "Invalid input data",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                }
            }
        })
    },

    /**
     * 🔹 Route: Get Profile Employee
     */
    getEmployeeByIdRoute() {
        return createRoute({
            method: 'get',
            path: '/employee/{id}',
            tags: ['Employee'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
                description: "Employee ID"
            }],
            responses: {
                200: {
                    description: "Get data successful",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                message: z.string(),
                                data: z.object({
                                    id: z.string().uuid(),
                                    name: z.string(),
                                    email: z.string().email(),
                                    phone: z.string(),
                                    departmentId: z.string().uuid(),
                                    positionId: z.string().uuid(),
                                    hireDate: z.string().datetime(),
                                    status: z.enum(["ACTIVE", "INACTIVE"]),
                                    code: z.string(),
                                    role: z.string(),
                                })
                            }),
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },
                404: {
                    description: "Employee not found",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },        
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                }
            }
        })
    },

    /**
     * 🔹 Route: Get Employees
     */
    getEmployeesRoute() {
        return createRoute({
            method: 'get',
            path: '/employee/all',
            tags: ['Employee'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: "Get data successful",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                message: z.string(),
                                data: z.object({
                                    id: z.string().uuid(),
                                    name: z.string(),
                                    email: z.string().email(),
                                    phone: z.string(),
                                    departmentId: z.string().uuid(),
                                    positionId: z.string().uuid(),
                                    hireDate: z.string().datetime(),
                                    status: z.enum(["ACTIVE", "INACTIVE"]),
                                    code: z.string(),
                                    role: z.string(),
                                })
                            }),
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },
                404: {
                    description: "Employee not found",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },        
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                }
            }
        })
    },

    /**
     * 🔹 Route: Update Employee
     */
    updateEmployeeRoute() {
        return createRoute({
            method: 'put',
            path: '/employee/update/{id}',
            tags: ['Employee'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
                description: "The employee ID (must match the logged-in user's ID unless the user has special permissions)."
            }],    
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                code: z.string().nonempty({message: "ID is required"}),
                                name: z.string().nonempty({message: "Name is required"}),
                                email: z.string().email({message: "Invalid email"}).nonempty({message: "Email is required"}),
                                phone: z.string().nonempty({message: "Phone is required"}),
                                department: z.string().nonempty({message: "Department is required"}),
                                position: z.string().nonempty({message: "Position is required"}),
                                role: z.enum(["Manager", "Staff", "HR"], { message: "Invalid role" }),
                                status: z.enum(["ACTIVE", "INACTIVE"], { message: "Invalid status" })
                            })
                        }
                    }
                }
            },            
            responses: {
                200: {
                    description: "Update data successful",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                message: z.string(),
                            }),
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },
                404: {
                    description: "Employee not found",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },        
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                }
            }
        })
    },

    /**
     * 🔹 Route: Delete Employee
     */
    deleteEmployeeRoute() {
        return createRoute({
            method: 'delete',
            path: '/employee/delete/{id}',
            tags: ['Employee'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
                description: "The employee ID (must match the logged-in user's ID unless the user has special permissions)."
            }],    
            responses: {
                200: {
                    description: "Delete data successful",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                message: z.string(),
                            }),
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },
                404: {
                    description: "Employee not found",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                },        
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(false),
                                error: z.string()
                            })
                        }
                    }
                }
            }
        })
    }
}
