import { describe, expect, it } from 'vitest'
import {
  buildMultiEndpointDistribution,
  defaultDistributionTargetIds,
  distributionChannelOptionsForRecipient,
  formatDistributionChannels,
  platformDistributionTargets,
} from './platformDistribution'

const recipient = {
  email: 'hr@example.com',
  name: '人事主管',
  permissionScope: 'HR主管-多端安装',
  phone: '13800001111',
}

describe('multi-end platform distribution helpers', () => {
  it('builds download links and QR payloads for selected platform targets', () => {
    const packageView = buildMultiEndpointDistribution({
      baseUrl: 'https://hr.heiwenshi.ai/download',
      channelTypes: ['sms', 'email', 'qr'],
      recipient,
      targetIds: ['web', 'mac', 'windows'],
    })

    expect(packageView.targets).toHaveLength(3)
    expect(packageView.targets[0].downloadUrl).toContain('/web')
    expect(packageView.targets[0].qrPayload).toContain('platform=web')
    expect(packageView.targets[1].qrPayload).toContain('platform=mac')
    expect(packageView.targets[2].downloadUrl).toContain('permission=')
  })

  it('keeps one permission verification code across sms, email and QR scan flows', () => {
    const packageView = buildMultiEndpointDistribution({
      baseUrl: 'https://hr.heiwenshi.ai/download',
      channelTypes: ['sms', 'email', 'qr'],
      recipient,
      targetIds: ['pwa', 'android-pad'],
    })

    const sendCodes = packageView.sendQueue.map((item) => item.verificationCode)
    const qrCodes = packageView.targets.map((item) => item.verificationCode)

    expect(new Set([...sendCodes, ...qrCodes]).size).toBe(1)
    expect(packageView.verificationCode).toMatch(/^\d{6}$/)
  })

  it('uses default targets for web first and reserves future device packages', () => {
    expect(defaultDistributionTargetIds).toContain('web')
    expect(defaultDistributionTargetIds).toContain('pwa')
    expect(platformDistributionTargets.some((target) => target.id === 'harmony-miniprogram')).toBe(true)
  })

  it('summarizes enabled distribution channels in Chinese UI text', () => {
    expect(formatDistributionChannels(['sms', 'email', 'qr', 'url'])).toBe('短信验证码 / 邮件验证码 / 二维码扫码 / 下载网址')
  })

  it('enables direct sending only for the contact methods the operator filled in', () => {
    const emailOnlyOptions = distributionChannelOptionsForRecipient({
      email: 'boss@example.com',
      name: '老板端',
      permissionScope: '老板查看权限',
    })
    const phoneOnlyOptions = distributionChannelOptionsForRecipient({
      name: '面试官',
      permissionScope: '面试官移动端',
      phone: ' 138 0000 2222 ',
    })

    expect(emailOnlyOptions.find((item) => item.channelType === 'email')?.enabled).toBe(true)
    expect(emailOnlyOptions.find((item) => item.channelType === 'sms')?.enabled).toBe(false)
    expect(phoneOnlyOptions.find((item) => item.channelType === 'sms')?.enabled).toBe(true)
    expect(phoneOnlyOptions.find((item) => item.channelType === 'email')?.enabled).toBe(false)
    expect(phoneOnlyOptions.find((item) => item.channelType === 'qr')?.enabled).toBe(true)
    expect(phoneOnlyOptions.find((item) => item.channelType === 'url')?.enabled).toBe(true)
  })
})
