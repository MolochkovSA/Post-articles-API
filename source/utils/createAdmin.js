// Models
import { users } from '../models/index.js'

// Instruments
import { getAdminProfile, ValidationError } from './index.js'

const adminProfile = getAdminProfile()

export const createAdmin = async () => {
  if (!adminProfile && typeof adminProfile !== 'Object') {
    throw new ValidationError('The admin profile must be specified', 400)
  }
  const admin = await users.findOne({ isAdmin: true })
  if (!admin) {
    await users.create(adminProfile)
  }
}
