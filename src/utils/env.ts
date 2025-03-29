import dotenv from 'dotenv'

dotenv.config()

export const DATABASE_URL: string = process.env.DATABASE_URL || "";  
export const DATABASE_SSL: boolean = Boolean(process.env.DATABASE_SSL) || false
export const SECRET: string = process.env.SECRET || ""
export const REFRESH_SECRET: string = process.env.REFRESH_SECRET || ""
export const CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME || ""
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || ""
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || ""