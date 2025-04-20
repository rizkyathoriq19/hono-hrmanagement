import { createRoute, z } from "@hono/zod-openapi"

export const roleSwagger = {
    getRole() { 
        return createRoute({
            method: 'get',
            path: '/role/all',
            tags: ['Role'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Get all role success',
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
                                        department: z.object({
                                            id: z.string(),
                                            name: z.string(),
                                        }),
                                        name: z.string(),
                                        alt_name: z.string(),
                                        created_at: z.date(),
                                        updated_at: z.date(),
                                        deleted_at: z.date(),
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

    getRoleByIdRoute() { 
        return createRoute({
            method: 'get',
            path: '/role/{id}',
            tags: ['Role'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Role ID'
            }],
            responses: {
                200: {
                    description: 'Get Role by id success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    department: z.object({
                                        id: z.string(),
                                        name: z.string(),
                                    }),
                                    name: z.string(),
                                    alt_name: z.string(),
                                    created_at: z.date(),
                                    updated_at: z.date(),
                                    deleted_at: z.date(),
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

    addRoleRoute() { 
        return createRoute({
            method: 'post',
            path: '/role/add',
            tags: ['Role'],
            security: [{ Bearer: [] }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                id: z.number(),
                                department_id: z.string(),
                                name: z.string(),
                                alt_name: z.string(),
                            })
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Add Role success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    department: z.object({
                                        id: z.string(),
                                        name: z.string(),
                                    }),
                                    name: z.string(),
                                    alt_name: z.string(),
                                    created_at: z.date(),
                                    updated_at: z.date(),
                                    deleted_at: z.date(),
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
    
    updateRoleRoute() { 
        return createRoute({
            method: 'put',
            path: '/role/update/{id}',
            tags: ['Role'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Role ID'
            }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                department_id: z.string(),
                                name: z.string(),
                                alt_name: z.string(),
                            })
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Update Role success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
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
    
    deleteRoleRoute() { 
        return createRoute({
            method: 'delete',
            path: '/role/delete/{id}',
            tags: ['Role'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Role ID'
            }],
            responses: {
                200: {
                    description: 'Delete Role success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
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
}