import { describe, expect, it } from 'vitest'
import { buildPortAgentHub, portAgentMenuLabel } from './portAgent'

const recipient = {
  email: 'hr-leader@heiwenshi.ai',
  name: '招聘负责人',
  permissionScope: 'HR主管-端口Agent权限',
  phone: '13800008888',
}

describe('port agent hub', () => {
  it('uses Port Agent naming for the merged Agent and multi-end distribution entry', () => {
    expect(portAgentMenuLabel).toBe('端口Agent')
  })

  it('merges app download ports with sms email qr url delivery channels', () => {
    const hub = buildPortAgentHub({
      baseUrl: 'https://hr.heiwenshi.ai/download',
      channelTypes: ['sms', 'email', 'qr', 'url'],
      recipient,
    })

    expect(hub.title).toBe('端口Agent')
    expect(hub.distributionPackage.targets.map((target) => target.id)).toEqual(
      expect.arrayContaining(['web', 'pwa', 'mac', 'windows', 'android-pad', 'ios-ipad', 'harmony-miniprogram']),
    )
    expect(hub.deliveryChannels.map((channel) => channel.channelType)).toEqual(['sms', 'email', 'qr', 'url'])
    expect(hub.deliveryChannels.every((channel) => channel.status === '待点击发送')).toBe(true)
  })

  it('connects AI invitation interview channels and Skills backfill in one hub', () => {
    const hub = buildPortAgentHub({
      baseUrl: 'https://hr.heiwenshi.ai/download',
      channelTypes: ['qr', 'url'],
      recipient,
    })

    expect(hub.agentCapabilities).toEqual(
      expect.arrayContaining(['Sales Skills', 'Tech Skills', 'AI邀约', 'AI文字面试', 'AI语音面试', '结构化回填']),
    )
    expect(hub.aiChannels).toEqual(
      expect.arrayContaining(['企业微信', '微信', '电话', '自建在线语音会议', '招聘平台文字对话', '限时清单回复']),
    )
    expect(hub.summary).toContain('APP/PWA下载')
    expect(hub.summary).toContain('短信')
    expect(hub.summary).toContain('二维码')
  })
})
