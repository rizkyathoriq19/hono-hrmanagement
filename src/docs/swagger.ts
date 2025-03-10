import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { getUserData } from "@/utils/jwt.js";

const swagger = new OpenAPIHono()

swagger.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer'
})

/**
 * 🔹 Route: Register User
 */
swagger.openapi(
    createRoute({
        method: 'post',
        path: '/auth/register',
        tags: ['Auth'],
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
                            id: z.string(),
                            email: z.string(),
                            password: z.string(),
                            employeeId: z.string(),
                            code: z.string(),
                        })
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
    }),
    async (c) => {
        try {
            const body = await c.req.json()
            const { code, name, email, phone, department, position, role } = body

            const newEmployee = {
                id: "uuid",
                code,
                name,
                email,
                phone,
                department,
                position,
                role
            };

            return c.json(newEmployee, 201)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return c.json(
                    { error: error.errors.map((e) => e.message).join(", ") },
                    400
                );
            } else if (error instanceof Error) {
                return c.json({ error: error.message }, 500);
            }
            return c.json({ error: "Internal server error" }, 500);   
        }
    }
)

export default swagger