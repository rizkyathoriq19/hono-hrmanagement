import { Context } from "hono"
import { ContentfulStatusCode } from "hono/utils/http-status"

export const res = (c: Context, method: string, statusCode: ContentfulStatusCode, message: string = "", data: any = {}, c_page: number = 0, t_page: number = 0, t_row: number = 0 ) =>{
    let status: boolean = [200, 201].includes(statusCode);

    const err = c.json({
        status: status,
        code: statusCode,
        error: message
    })
    
    switch (method) { 
        case "get":
            if (status) {
                return c.json({
                    status: status,
                    code: statusCode,
                    meta: {
                        current_page: c_page,
                        total_page: t_page,
                        total_row: t_row
                    },
                    message: message,
                    data: data
                })
            } else {
                return err
            }
        case "getDetail":
        case "login":
            if (status) {
                return c.json({
                    status: status,
                    code: statusCode,
                    message: message,
                    data: data
                })
            } else {
                return err
            }
        case "post":
        case "put":
        case "patch":
        case "delete":
            if (status) {
                return c.json({
                    status: status,
                    code: statusCode,
                    message: message,
                })
            } else {
                return err
            }
        case "err":
            return err
        default:
            break;
    }
}