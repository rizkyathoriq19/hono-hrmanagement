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
                                code: z.string(),
                                name: z.string(),
                                email: z.string().email(),
                                phone: z.string(),
                                department: z.string(),
                                position: z.string(),
                                role: z.string(),
                                hire_date: z.date(),
                                identification_no: z.string(),
                                image: z.string(),
                                birth_date: z.date(),
                                birth_place: z.string(),
                                gender: z.string(),
                                blood_type: z.string(),
                                address: z.string(),
                                village: z.string(),
                                district: z.string(),
                                city: z.string(),
                                province: z.string(),
                                country: z.string(),
                                zip_code: z.string(),
                                religion: z.string(),
                                married_status: z.string(),
                                citizen_status: z.string(),
                            })
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Add employee success",
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
                    description: "Bad request",
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
                    description: "Unauthorized",
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
                    description: "Internal server error",
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
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string().uuid(),
                                    name: z.string(),
                                    email: z.string().email(),
                                    phone: z.string(),
                                    departmentId: z.string().uuid(),
                                    positionId: z.string().uuid(),
                                    hireDate: z.string().datetime(),
                                    status: z.string(),
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
                                code: z.number().default(401),
                                message: z.string()
                            })
                        }
                    }
                },
                404: {
                    description: "Not found",
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
                    description: "Internal server error",
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

    /**
     * 🔹 Route: Get Employees
     */
    getEmployeesRoute() {
        return createRoute({
            method: 'get',
            path: '/employee/all',
            tags: ['Employee'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    required: false,
                    schema: { type: "number" },
                    description: "Page number"
                },
                {
                    name: "limit",
                    in: "query",
                    required: false,
                    schema: { type: "number" },
                    description: "Limit data per page"
                },
                {
                    name: "search",
                    in: "query",
                    required: false,
                    schema: { type: "string" },
                    description: "Search by name or code"
                }
            ],
            responses: {
                200: {
                    description: "Get data successful",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                meta: z.object({
                                    current_page: z.number(),
                                    total_page: z.number(),
                                    total_row: z.number()
                                }),
                                message: z.string(),
                                data: z.array(
                                    z.object({
                                        id: z.string().uuid(),
                                        name: z.string(),
                                        email: z.string().email(),
                                        phone: z.string(),
                                        departmentId: z.string().uuid(),
                                        positionId: z.string().uuid(),
                                        hireDate: z.string().datetime(),
                                        status: z.string(),
                                        code: z.string(),
                                        role: z.string(),
                                    })
                                )
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
                                code: z.number().default(401),
                                message: z.string()
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
                                code: z.number().default(500),
                                message: z.string()
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
                description: "Employee ID"
            }],    
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                code: z.string(),
                                name: z.string(),
                                email: z.string().email(),
                                phone: z.string(),
                                department: z.string(),
                                position: z.string(),
                                role: z.string(),
                                hire_date: z.date(),
                                identification_no: z.string(),
                                image: z.string(),
                                birth_date: z.date(),
                                birth_place: z.string(),
                                gender: z.string(),
                                blood_type: z.string(),
                                address: z.string(),
                                village: z.string(),
                                district: z.string(),
                                city: z.string(),
                                province: z.string(),
                                country: z.string(),
                                zip_code: z.string(),
                                religion: z.string(),
                                married_status: z.string(),
                                citizen_status: z.string(),
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
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string()
                            })
                        }
                    }
                },
                400: {
                    description: "Bad request",
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
                    description: "Unauthorized",
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
                    description: "Forbidden",
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
                    description: "Not found",
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
                    description: "Internal server error",
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

    /**
     * 🔹 Route: Inactive Employee
     */
    statusEmployeeRoute() {
        return createRoute({
            method: 'patch',
            path: '/employee/status/{id}',
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
                    description: "Update status employee success",
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
                    description: "Bad request",
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
                    description: "Unauthorized",
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
                    description: "Forbidden",
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
                    description: "Not found",
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
                    description: "Internal server error",
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
                description: "Employee ID"
            }],    
            responses: {
                200: {
                    description: "Delete data successful",
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
                401: {
                    description: "Unauthorized",
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
                    description: "Forbidden",
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
                    description: "Not found",
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
                    description: "Internal server error",
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

    /**
     * 🔹 Route: GenerateCode
     */
    generateCodeRoute() {
        return createRoute({
            method: 'post',
            path: '/employee/generate-code',
            tags: ['Employee'],
            security: [{ Bearer: [] }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                hire_date: z.date(),
                                department_id: z.string().uuid()
                            })
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Get data successful",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.string()
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
                                code: z.number().default(401),
                                message: z.string()
                            })
                        }
                    }
                },
                404: {
                    description: "Not found",
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
                    description: "Internal server error",
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
}
