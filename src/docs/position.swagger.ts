import { createRoute, z } from "@hono/zod-openapi"

export const positionSwagger = {
    getPositionRoute() { 
        return createRoute({
            method: 'get',
            path: '/position/all',
            tags: ['Position'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Get all position success',
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

    getPositionByIdRoute() { 
        return createRoute({
            method: 'get',
            path: '/position/{id}',
            tags: ['Position'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Position ID'
            }],
            responses: {
                200: {
                    description: 'Get position by id success',
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

    addPositionRoute() { 
        return createRoute({
            method: 'post',
            path: '/position/add',
            tags: ['Position'],
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
                    description: 'Add position success',
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
    
    updatePositionRoute() { 
        return createRoute({
            method: 'put',
            path: '/position/update/{id}',
            tags: ['Position'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Position ID'
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
                    description: 'Update position success',
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
    
    deletePositionRoute() { 
        return createRoute({
            method: 'delete',
            path: '/position/delete/{id}',
            tags: ['Position'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Position ID'
            }],
            responses: {
                200: {
                    description: 'Delete position success',
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