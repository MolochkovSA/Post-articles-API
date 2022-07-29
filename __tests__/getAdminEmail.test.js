import { getAdminEmail } from '../source/utils/env/getAdminEmail.js'

const mockedEmailFail = 'mail'
const mockedEmail = 'mail@mail.ru'

describe('get Admin Email:', () => {
  test('test undefined', () => {
    expect(() => getAdminEmail()).toThrow()
  })
  test('test invalid email', () => {
    process.env.ADMIN_EMAIL = mockedEmailFail
    expect(() => getAdminEmail()).toThrow()
  })
  test('test valid email', () => {
    process.env.ADMIN_EMAIL = mockedEmail
    expect(typeof getAdminEmail()).toBe('string')
  })
})
