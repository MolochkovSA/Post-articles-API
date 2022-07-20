// Models
import { users } from '../models/index.js'

// Instruments
import { getAdminProfile, passwordToHash, ValidationError } from './index.js'

const adminProfile = getAdminProfile()

export const createAdmin = async () => {
  if (!adminProfile && typeof adminProfile !== 'Object') {
    throw new ValidationError('The admin profile must be specified', 400)
  }
  adminProfile.password = await passwordToHash(adminProfile.password)
  const admin = await users.findOne({ name: 'admin' })
  if (!admin) {
    await users.create(adminProfile)
  }
}
