import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val)),
  PUBLIC_URL: z.string().startsWith('http').includes('://'),
  API_BACKEND_URL: z.string().startsWith('http').includes('://'),

  DATABASE_HOST_IP: z
    .string()
    .regex(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Invalid Database Host IP Address',
    ),
  DATABASE_PORT: z.string().transform((val) => parseInt(val)),
  DATABASE_NAME: z.string(),
  MONGODB_EXTRA_URI_ARGS: z
    .string()
    .regex(/^(?:[^&=]+=[^&=]+)(?:&[^&=]+=[^&=]+)*$/g, "Invalid URI Argument Format. Must be in the form 'key=value' joined by '&'.")
    .optional(),

  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),

  NEXTAUTH_DATABASE_NAME: z.string(),
  NEXTAUTH_URL: z.string().startsWith('http').includes('://'),
  NEXTAUTH_SECRET: z.string(),

  HELLOCASH_TOKEN: z.string(),

  WOOCOMMERCE_DASHBOARD_BASE_URL: z.string().startsWith('http').includes('://'),
  WOOCOMMERCE_API_DOMAIN: z.string().startsWith('http').includes('://'),
  WOOCOMMERCE_CONSUMER_KEY: z
    .string()
    .startsWith('ck_', { message: 'consumerKey must start with "ck_"' })
    .min(10, { message: 'consumerKey must be at least 10 characters long' }),
  WOOCOMMERCE_CONSUMER_SECRET: z
    .string()
    .startsWith('cs_', { message: 'consumerSecret must start with "cs_"' })
    .min(10, { message: 'consumerSecret must be at least 10 characters long' }),

  WINSTON_SILENT: z
    .string()
    .optional()
    .transform((val) => val?.toLowerCase().trim() === 'true')
    .default('false'),
})

const res = envSchema.safeParse(process.env)
if (res.error) {
  const e = new Error(`Missing Environment Variables: \n ${JSON.stringify(res.error.flatten().fieldErrors, null, 2)}`)
  e.stack = ''
  throw e
}

const env = envSchema.parse(process.env)
export default env
