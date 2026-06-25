import { describe, expect, it } from 'vitest'
import {
  bindingModeLabel,
  bossCandidateActionTiers,
  bossComplianceGuardrails,
  bossGreetingScriptModes,
  bossManagedAccountWorkflow,
  bossManagedDataFields,
  bossResumeMailboxWorkflow,
  bossTouchExecutionTracks,
  loginMethodTitles,
  recruitingAccountMatrix,
  recruitingLoginMethods,
} from './recruitingAccounts'

describe('recruiting account connection center', () => {
  it('lists all required login methods', () => {
    expect(loginMethodTitles(recruitingLoginMethods)).toEqual([
      '手机验证码',
      '邮箱验证码',
      '微信扫码',
      'APP扫码',
      '网页辅助',
      '手动账号密码登录',
    ])
  })

  it('describes manual password login without storing plaintext passwords', () => {
    const manual = recruitingLoginMethods.find((method) => method.id === 'manual-password')

    expect(manual?.detail).toContain('官方页面')
    expect(manual?.detail).toContain('不保存')
    expect(manual?.detail).toContain('明文密码')
  })

  it('supports three recruiting account binding modes', () => {
    expect(recruitingAccountMatrix.map((item) => item.bindingMode)).toEqual([
      'account-to-many-jobs',
      'job-to-many-accounts',
      'many-to-many',
    ])
    expect(bindingModeLabel('account-to-many-jobs')).toBe('同一账号招聘多个岗位')
    expect(bindingModeLabel('job-to-many-accounts')).toBe('一个岗位绑定多个账号')
    expect(bindingModeLabel('many-to-many')).toBe('多个账号与多个岗位自由组合')
  })

  it('models BOSS account hosting through compliant authorization and human confirmation', () => {
    expect(bossManagedAccountWorkflow.map((step) => step.title)).toEqual([
      '官方登录授权',
      '规则识别与限频',
      '人工确认触达',
      '数据归集',
      '简历分级邀约',
    ])
    expect(bossComplianceGuardrails.join(' ')).toContain('不绕过平台风控')
    expect(bossComplianceGuardrails.join(' ')).not.toContain('钻漏洞')
  })

  it('classifies collected BOSS candidates into invitation action tiers', () => {
    expect(bossCandidateActionTiers.map((tier) => tier.label)).toEqual([
      '值得聊天',
      '值得邀约',
      '值得收藏',
      '值得争取签约',
    ])
    expect(bossManagedDataFields).toEqual(
      expect.arrayContaining(['简历', '邮箱简历抄送', '简历附件', '聊天记录', '电话', '微信', '平台账号', '岗位匹配度']),
    )
  })

  it('supports three greeting script sources with AI-adjusted hybrid replies', () => {
    expect(bossGreetingScriptModes.map((mode) => mode.title)).toEqual([
      '预设知识库话术',
      'AI智能生成话术',
      '预设话术 + AI灵活调整',
    ])
    expect(bossGreetingScriptModes[2].detail).toContain('结合预设话术')
    expect(bossGreetingScriptModes[2].detail).toContain('AI')
  })

  it('keeps dual-track touch execution compliant instead of evasion-oriented', () => {
    expect(bossTouchExecutionTracks.map((track) => track.title)).toEqual([
      '官方/授权接口轨',
      '浏览器RPA辅助轨',
    ])
    const combined = bossTouchExecutionTracks.map((track) => `${track.detail} ${track.guardrail}`).join(' ')
    expect(combined).toContain('人工确认')
    expect(combined).toContain('限频')
    expect(combined).not.toContain('规避识别')
    expect(combined).not.toContain('伪装真人')
  })

  it('models the BOSS reserved mailbox resume intake and scoring workflow safely', () => {
    expect(bossResumeMailboxWorkflow.map((step) => step.title)).toEqual([
      '邀请候选人发简历',
      '预留邮箱托管',
      '邮件简历入库',
      '模型解析评分',
      '高分优先跟进',
    ])
    const combined = bossResumeMailboxWorkflow.map((step) => `${step.detail} ${step.guardrail}`).join(' ')
    expect(combined).toContain('应用专用密码')
    expect(combined).toContain('加密')
    expect(combined).toContain('不在页面明文展示')
    expect(combined).toContain('优先邀约')
  })
})
