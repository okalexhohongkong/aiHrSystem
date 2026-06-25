export type LanguageInterfaceStage = '1.0' | '2.0' | '预留'

export type LanguageInterface = {
  id: string
  name: string
  scope: string
  stage: LanguageInterfaceStage
  examples: string[]
}

export type PlatformLoginMethod = '账号密码' | '手机验证码' | '邮箱验证码' | '二维码扫码' | '官方授权' | '手动导入' | '网页辅助'

export type RecruitingPlatformAdapter = {
  id: string
  name: string
  region: '中国大陆' | '香港' | '全球'
  stage: '1.0优先' | '2.0预留' | '预留'
  loginMethods: PlatformLoginMethod[]
  notes: string
}

export const languageInterfaces: LanguageInterface[] = [
  {
    examples: ['zh-CN', 'zh-Hans'],
    id: 'simplified-chinese',
    name: '中文简体接口',
    scope: '系统默认语言、简历解析、岗位JD、面试问卷、报表。',
    stage: '1.0',
  },
  {
    examples: ['zh-TW', 'zh-HK', 'zh-Hant'],
    id: 'traditional-chinese',
    name: '中文繁体接口',
    scope: '面向港澳台招聘、繁体简历、香港平台岗位发布。',
    stage: '2.0',
  },
  {
    examples: ['en-US', 'en-GB'],
    id: 'english',
    name: '英文接口',
    scope: '国际岗位JD、英文简历解析、LinkedIn等全球平台对接。',
    stage: '2.0',
  },
  {
    examples: ['ja-JP', 'ko-KR', 'fr-FR', 'de-DE', 'es-ES'],
    id: 'global-language-bank',
    name: '全球语言智库接口',
    scope: '多语言词库、岗位术语、行业术语、跨境招聘问答。',
    stage: '预留',
  },
]

export const recruitingPlatformAdapters: RecruitingPlatformAdapter[] = [
  {
    id: 'boss',
    loginMethods: ['账号密码', '手机验证码', '邮箱验证码', '二维码扫码', '网页辅助', '手动导入'],
    name: 'BOSS直聘',
    notes: '1.0优先适配，采用合规授权、手动导入和人工确认流程。',
    region: '中国大陆',
    stage: '1.0优先',
  },
  {
    id: 'linkedin',
    loginMethods: ['账号密码', '邮箱验证码', '二维码扫码', '官方授权'],
    name: 'LinkedIn',
    notes: '2.0预留全球招聘平台适配器，优先走官方授权和手动导入。',
    region: '全球',
    stage: '2.0预留',
  },
  {
    id: 'liepin',
    loginMethods: ['账号密码', '手机验证码', '二维码扫码', '手动导入'],
    name: '猎聘',
    notes: '2.0预留中高端人才平台适配器。',
    region: '中国大陆',
    stage: '2.0预留',
  },
  {
    id: 'zhaopin',
    loginMethods: ['账号密码', '手机验证码', '邮箱验证码', '二维码扫码', '手动导入'],
    name: '智联招聘',
    notes: '2.0预留传统招聘平台适配器。',
    region: '中国大陆',
    stage: '2.0预留',
  },
  {
    id: '51job',
    loginMethods: ['账号密码', '手机验证码', '邮箱验证码', '二维码扫码', '手动导入'],
    name: '前程无忧 51job',
    notes: '2.0预留传统招聘平台适配器。',
    region: '中国大陆',
    stage: '2.0预留',
  },
  {
    id: 'hk-talent',
    loginMethods: ['账号密码', '邮箱验证码', '官方授权', '手动导入'],
    name: '香港人才招聘平台',
    notes: '2.0预留香港本地招聘与人才平台。',
    region: '香港',
    stage: '2.0预留',
  },
  {
    id: 'hk-government',
    loginMethods: ['账号密码', '邮箱验证码', '官方授权', '手动导入'],
    name: '香港政府人才招聘平台',
    notes: '2.0预留政府/公共平台岗位与人才信息接口。',
    region: '香港',
    stage: '2.0预留',
  },
]

export function adaptersByStage(stage: RecruitingPlatformAdapter['stage']) {
  return recruitingPlatformAdapters.filter((adapter) => adapter.stage === stage)
}

export function platformLoginMethodSummary(adapter: RecruitingPlatformAdapter) {
  return adapter.loginMethods.join(' / ')
}
