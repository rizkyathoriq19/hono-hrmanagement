import { createRoute, z } from "@hono/zod-openapi"

export const dropdownSwagger = {
    /**
     * 🔹 Route: Get Department
     */
    getDepartmentRoute(){ 
        return createRoute({
            method: 'get',
            path: '/dropdown/department',
            tags: ['Dropdown'],
            security: [{ Bearer: []} ],
            responses: {
                200: {
                    description: "Get department success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },

    /**
     * 🔹 Route: Get Position
     */
    getPositionRoute(){ 
        return createRoute({
            method: 'get',
            path: '/dropdown/position/{id}',
            tags: ['Dropdown'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid"},
                description: "Department ID"
            }],              
            responses: {
                200: {
                    description: "Get position success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },   
    
    /**
     * 🔹 Route: Get Role
     */
    getRoleRoute(){ 
        return createRoute({
            method: 'get',
            path: '/dropdown/role',
            tags: ['Dropdown'],
            security: [{ Bearer: []} ],
            responses: {
                200: {
                    description: "Get role success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },

    /**
         * 🔹 Route: Get Country
         */
    getCountryRoute() {
        return createRoute({
            method: 'get',
            path: '/dropdown/country',
            tags: ['Dropdown'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: "Get country success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },

    /**
     * 🔹 Route: Get province
     */
    getProvinceRoute() {
        return createRoute({
            method: 'get',
            path: '/dropdown/province/{id}',
            tags: ['Dropdown'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "number"},
                description: "Country ID"
            }],            
            responses: {
                200: {
                    description: "Get province success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },

    /**
     * 🔹 Route: Get City
     */
    getCityRoute() {
        return createRoute({
            method: 'get',
            path: '/dropdown/city/{id}',
            tags: ['Dropdown'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "number"},
                description: "Province ID"
            }],            
            responses: {
                200: {
                    description: "Get city success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },
    
    /**
     * 🔹 Route: Get District
     */
    getDistrictRoute() {
        return createRoute({
            method: 'get',
            path: '/dropdown/district/{id}',
            tags: ['Dropdown'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "number"},
                description: "City ID"
            }],            
            responses: {
                200: {
                    description: "Get district success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },

    /**
     * 🔹 Route: Get Village
     */
    getVillageRoute() {
        return createRoute({
            method: 'get',
            path: '/dropdown/village/{id}',
            tags: ['Dropdown'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "number"},
                description: "District ID"
            }],            
            responses: {
                200: {
                    description: "Get village success",
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean().default(true),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.array(z.object({
                                    id: z.string().uuid(),
                                    name: z.string()
                                }))
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
            },
        })
    },    
}