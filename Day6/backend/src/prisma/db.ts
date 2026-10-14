import 'dotenv/config'
import { Temporal } from '@js-temporal/polyfill'
import postgres from '@prisma/orm-postgres/runtime'
import type { Contract } from './contract.d'
import contractJson from './contract.json'

const globalWithTemporal = globalThis as typeof globalThis & {
  Temporal?: typeof Temporal
}

if (typeof globalWithTemporal.Temporal === 'undefined') {
  Object.assign(globalThis, { Temporal })
}

export const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL!,
})