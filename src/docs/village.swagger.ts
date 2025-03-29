import { createRoute, z } from "@hono/zod-openapi"

export const villageSwagger = {
    getVillageRoute() { 
        return createRoute({
            method: 'get',
            path: '/village/all',
            tags: ['Village'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Get all village success',
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
                                        district: z.object({
                                            id: z.number(),
                                            name: z.string()
                                        }),
                                        name: z.string(),
                                        alt_name: z.string(),
                                        latitude: z.number(),
                                        longitude: z.number(),
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

    getVillageByIdRoute() { 
        return createRoute({
            method: 'get',
            path: '/village/{id}',
            tags: ['Village'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Village ID'
            }],
            responses: {
                200: {
                    description: 'Get village by id success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    district: z.object({
                                        id: z.number(),
                                        name: z.string()
                                    }),
                                    name: z.string(),
                                    alt_name: z.string(),
                                    latitude: z.number(),
                                    longitude: z.number(),
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

    addVillageRoute() { 
        return createRoute({
            method: 'post',
            path: '/village/add',
            tags: ['Village'],
            security: [{ Bearer: [] }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                id: z.number(),
                                district_id: z.number(),
                                name: z.string(),
                                alt_name: z.string(),
                                latitude: z.number(),
                                longitude: z.number()
                            })
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Add village success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    district: z.object({
                                        id: z.number(),
                                        name: z.string()
                                    }),
                                    name: z.string(),
                                    alt_name: z.string(),
                                    latitude: z.number(),
                                    longitude: z.number(),
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
    
    updateVillageRoute() { 
        return createRoute({
            method: 'put',
            path: '/village/update/{id}',
            tags: ['Village'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Village ID'
            }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                district_id: z.number(),
                                name: z.string(),
                                alt_name: z.string(),
                                latitude: z.number(),
                                longitude: z.number()
                            })
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Update village success',
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
    
    deleteVillageRoute() { 
        return createRoute({
            method: 'delete',
            path: '/village/delete/{id}',
            tags: ['Village'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Village ID'
            }],
            responses: {
                200: {
                    description: 'Delete village success',
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