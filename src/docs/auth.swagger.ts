import { createRoute, z } from "@hono/zod-openapi"

export const authSwagger = {
    /**
     * 🔹 Route: Login Employee
     */
    loginRoute(){ 
        return createRoute({
            method: 'post',
            path: '/auth/login',
            tags: ['Auth'],
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                    identifier: z.string().default("2503HR001"),
                                    password: z.string().default("1234")
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
                                status: z.boolean(),
                                code: z.number().default(200),
                                message: z.string(),
                                data: z.object({
                                    token: z.string(),
                                    user: z.object({
                                        id: z.string().uuid(),
                                        name: z.string(),
                                        role: z.object({
                                            id: z.number(),
                                            name: z.string()
                                        }),
                                    }),
                                })
                            }),
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