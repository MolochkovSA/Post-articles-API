// Services
import { users } from '../services/index.js'

// Config
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config.js'

const adminProfile = {
  name: 'admin',
  sex: 'male',
  birthDay: '1988-01-01',
  phone: '+7-123-456-78-90',
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  isAdmin: true,
}

export const createAdmin = async () => {
  const admin = await users.findOne({ isAdmin: true })
  if (!admin) {
    await users.create(adminProfile)
  }
}
