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
                                    identifier: z.string().default("2503RA001"),
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
    }
}