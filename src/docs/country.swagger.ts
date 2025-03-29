import { createRoute, z } from "@hono/zod-openapi"

export const countrySwagger = {
    getCountryRoute() { 
        return createRoute({
            method: 'get',
            path: '/country/all',
            tags: ['Country'],
            security: [{ Bearer: [] }],
            responses: {
                200: {
                    description: 'Get all country success',
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

    getCountryByIdRoute() { 
        return createRoute({
            method: 'get',
            path: '/country/{id}',
            tags: ['Country'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Country ID'
            }],
            responses: {
                200: {
                    description: 'Get country by id success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
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

    addCountryRoute() { 
        return createRoute({
            method: 'post',
            path: '/country/add',
            tags: ['Country'],
            security: [{ Bearer: [] }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                id: z.number(),
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
                    description: 'Add country success',
                    content: {
                        "application/json": {
                            schema: z.object({
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    id: z.string(),
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
    
    updateCountryRoute() { 
        return createRoute({
            method: 'put',
            path: '/country/update/{id}',
            tags: ['Country'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'country ID'
            }],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
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
                    description: 'Update country success',
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
    
    deleteCountryRoute() { 
        return createRoute({
            method: 'delete',
            path: '/country/delete/{id}',
            tags: ['Country'],
            security: [{ Bearer: [] }],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'number' },
                description: 'Country ID'
            }],
            responses: {
                200: {
                    description: 'Delete country success',
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