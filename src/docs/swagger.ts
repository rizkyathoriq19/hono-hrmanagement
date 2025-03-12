import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { getUserData } from "@/utils/jwt.js";

const swagger = new OpenAPIHono()

swagger.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer'
})

/**
 * 🔹 Route: Login Employee
 */
const loginRoute = createRoute({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                            identifier: z.string(),
                            password: z.string()
                    })
                }
            }
        }
    },
    responses: {
        200: {
            description: "Login successful",
            content: {
                "application/json": {
                    schema: z.object({
                        user:
                            z.object({
                                id: z.string().uuid(),
                                roleId: z.number(),
                            }),
                        token: z.string()
                    }),
                }
            }
        },
        401: {
            description: "Invalid credentials",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        }
    }
})


/**
 * 🔹 Route: Add Employee
 */
const addEmployeeRoute = createRoute({
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
                        data: z.array(
                                z.object({
                                    id: z.string().uuid(),
                                    name: z.string(),
                                    email: z.string().email(),
                                    phone: z.string(),
                                    departmentId: z.string().uuid(),
                                    positionId: z.string().uuid(),
                                    roleId: z.number(),
                                    hireDate: z.string().datetime(),
                                    status: z.enum(["ACTIVE", "INACTIVE"]),
                                    code: z.string(),
                                })
                        ),
                        user: z.object({
                            id: z.string().uuid(),
                            email: z.string().email(),
                            password: z.string(),
                            employeeId: z.string().uuid(),
                            code: z.string(),
                        }),
                    }),
                }
            }
        },
        400: {
            description: "Invalid input data",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        }
    }
})

/**
 * 🔹 Route: Get Profile Employee
 */
const getEmployeeByIdRoute = createRoute({
    method: 'get',
    path: '/employee/:id',
    tags: ['Employee'],
    security: [{ Bearer: [] }],
    responses: {
        200: {
            description: "Get data successful",
            content: {
                "application/json": {
                    schema: z.object({
                        id: z.string().uuid(),
                        name: z.string(),
                        email: z.string().email(),
                        phone: z.string(),
                        departmentId: z.string().uuid(),
                        positionId: z.string().uuid(),
                        roleId: z.number(),
                        hireDate: z.string().datetime(),
                        status: z.enum(["ACTIVE", "INACTIVE"]),
                        code: z.string(),
                        role: z.string(),
                    }),
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },
        404: {
            description: "Employee not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },        
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        }
    }
})

/**
 * 🔹 Route: Get Employees
 */
const getEmployeesRoute = createRoute({
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
                        id: z.string().uuid(),
                        name: z.string(),
                        email: z.string().email(),
                        phone: z.string(),
                        department: z.string(),
                        position: z.string(),
                        role: z.string(),
                        hireDate: z.string().datetime(),
                        status: z.enum(["ACTIVE", "INACTIVE"]),
                        code: z.string(),
                    }),
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },
        404: {
            description: "Employee not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },        
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        }
    }
})

/**
 * 🔹 Route: Update Employee
 */
const updateEmployeeRoute = createRoute({
    method: 'put',
    path: '/employee/update/:id',
    tags: ['Employee'],
    security: [{ Bearer: [] }],
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
                    schema: z.object({ error: z.string() })
                }
            }
        },
        404: {
            description: "Employee not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },        
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        }
    }
})

/**
 * 🔹 Route: Delete Employee
 */
const deleteEmployeeRoute = createRoute({
    method: 'delete',
    path: '/employee/delete/:id',
    tags: ['Employee'],
    security: [{ Bearer: [] }],
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
                    schema: z.object({ error: z.string() })
                }
            }
        },
        404: {
            description: "Employee not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        },        
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() })
                }
            }
        }
    }
})

// Auth
swagger.openAPIRegistry.registerPath(loginRoute)

// Employee
swagger.openAPIRegistry.registerPath(addEmployeeRoute)
swagger.openAPIRegistry.registerPath(getEmployeesRoute)
swagger.openAPIRegistry.registerPath(getEmployeeByIdRoute)
swagger.openAPIRegistry.registerPath(updateEmployeeRoute)
swagger.openAPIRegistry.registerPath(deleteEmployeeRoute)

export default swagger