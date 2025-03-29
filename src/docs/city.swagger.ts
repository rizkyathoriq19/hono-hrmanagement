import { createRoute, z } from "@hono/zod-openapi"

export const citySwagger = {
    getCityRoute() { 
        return createRoute({
            method: 'get',
            path: '/city/all',
            tags: ['City'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Get all city success',
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
                                        province: z.object({
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

    getCityByIdRoute() { 
        return createRoute({
            method: 'get',
            path: '/city/{id}',
            tags: ['City'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'City ID'
            }],
            responses: {
                200: {
                    description: 'Get city by id success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    province: z.object({
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

    addCityRoute() { 
        return createRoute({
            method: 'post',
            path: '/city/add',
            tags: ['City'],
            security: [{ Bearer: [] }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                id: z.number(),
                                province_id: z.number(),
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
                    description: 'Add city success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
                                    province: z.object({
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
    
    updateCityRoute() { 
        return createRoute({
            method: 'put',
            path: '/city/update/{id}',
            tags: ['City'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'City ID'
            }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                province_id: z.number(),
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
                    description: 'Update city success',
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
    
    deleteCityRoute() { 
        return createRoute({
            method: 'delete',
            path: '/city/delete/{id}',
            tags: ['City'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'City ID'
            }],
            responses: {
                200: {
                    description: 'Delete city success',
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