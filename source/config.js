import {
  getPort,
  getDBUrl,
  getPassword,
  getAdminEmail,
  getAdminPassword,
} from './utils/index.js'

export const PORT = getPort()

export const DB_URL = getDBUrl()

export const JWT_PASSWORD = getPassword()

export const ADMIN_EMAIL = getAdminEmail()

export const ADMIN_PASSWORD = getAdminPassword()
