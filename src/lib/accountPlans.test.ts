import { describe, expect, it } from 'vitest'
import {
  canRecoverWithAnyVerifiedContact,
  recommendedEdition,
  recruitingAccountBand,
  systemEditions,
} from './accountPlans'

describe('account plans and recovery policy', () => {
  it('keeps three system editions for sales and permission design', () => {
    expect(systemEditions.map((edition) => edition.id)).toEqual(['single', 'team', 'enterprise'])
  })

  it('classifies recruiting account connection bands', () => {
    expect(recruitingAccountBand(0)).toBe('未连接')
    expect(recruitingAccountBand(1)).toBe('单账号')
    expect(recruitingAccountBand(10)).toBe('1-10账号')
    expect(recruitingAccountBand(20)).toBe('10-20账号')
    expect(recruitingAccountBand(100)).toBe('20-100账号')
    expect(recruitingAccountBand(101)).toBe('100+账号')
  })

  it('recommends edition by operator count and recruiting account count', () => {
    expect(recommendedEdition(1, 1)).toBe('single')
    expect(recommendedEdition(10, 8)).toBe('team')
    expect(recommendedEdition(21, 8)).toBe('enterprise')
    expect(recommendedEdition(10, 21)).toBe('enterprise')
  })

  it('allows password recovery with either verified phone or verified email', () => {
    expect(canRecoverWithAnyVerifiedContact(true, false)).toBe(true)
    expect(canRecoverWithAnyVerifiedContact(false, true)).toBe(true)
    expect(canRecoverWithAnyVerifiedContact(false, false)).toBe(false)
  })
})
