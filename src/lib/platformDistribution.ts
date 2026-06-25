export type DistributionTargetId =
  | 'web'
  | 'pwa'
  | 'mac'
  | 'windows'
  | 'android-pad'
  | 'ios-ipad'
  | 'harmony-miniprogram'

export type DistributionChannelType = 'sms' | 'email' | 'qr' | 'url'

export type DistributionRecipient = {
  email?: string
  name: string
  permissionScope: string
  phone?: string
}

export type PlatformDistributionTarget = {
  id: DistributionTargetId
  name: string
  deviceScope: string
  packageType: string
  status: '可下载' | 'PWA安装' | '封装中' | '接口预留'
}

export type DistributionTargetView = PlatformDistributionTarget & {
  downloadUrl: string
  qrPayload: string
  verificationCode: string
}

export type DistributionSendQueueItem = {
  channelType: DistributionChannelType
  destination: string
  message: string
  status: '待点击发送' | '待配置账号'
  verificationCode: string
}

export type DistributionChannelOption = {
  channelType: DistributionChannelType
  enabled: boolean
  label: string
  reason: string
}

export type MultiEndpointDistributionPackage = {
  channelsText: string
  permissionScope: string
  recipientName: string
  sendQueue: DistributionSendQueueItem[]
  targets: DistributionTargetView[]
  verificationCode: string
}

export const platformDistributionTargets: PlatformDistributionTarget[] = [
  {
    deviceScope: '浏览器 / 公司内网 / 外网域名',
    id: 'web',
    name: 'Web网页端',
    packageType: '在线网站链接',
    status: '可下载',
  },
  {
    deviceScope: 'Mac / Windows / iPad / Android 浏览器',
    id: 'pwa',
    name: 'PWA安装版',
    packageType: '浏览器安装包',
    status: 'PWA安装',
  },
  {
    deviceScope: 'Apple Mac mini / MacBook / iMac',
    id: 'mac',
    name: 'Mac桌面端',
    packageType: 'dmg / pkg',
    status: '封装中',
  },
  {
    deviceScope: 'Windows 10/11',
    id: 'windows',
    name: 'Windows桌面端',
    packageType: 'exe / msi',
    status: '封装中',
  },
  {
    deviceScope: 'Android平板 / 国产安卓手机',
    id: 'android-pad',
    name: 'Android平板端',
    packageType: 'apk / PWA',
    status: '封装中',
  },
  {
    deviceScope: 'iPad / iPhone',
    id: 'ios-ipad',
    name: 'iOS / iPad端',
    packageType: 'PWA / TestFlight预留',
    status: '接口预留',
  },
  {
    deviceScope: '鸿蒙 / 微信小程序',
    id: 'harmony-miniprogram',
    name: '鸿蒙 / 小程序端',
    packageType: 'HarmonyOS / Mini Program',
    status: '接口预留',
  },
]

export const defaultDistributionTargetIds: DistributionTargetId[] = [
  'web',
  'pwa',
  'mac',
  'windows',
  'android-pad',
  'ios-ipad',
  'harmony-miniprogram',
]

export const distributionChannelLabels: Record<DistributionChannelType, string> = {
  email: '邮件验证码',
  qr: '二维码扫码',
  sms: '短信验证码',
  url: '下载网址',
}

function normalizePhone(phone?: string) {
  return phone?.replace(/[^\d+]/g, '').trim()
}

function normalizeEmail(email?: string) {
  return email?.trim()
}

function looksLikeEmail(email?: string) {
  return Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
}

function looksLikePhone(phone?: string) {
  const digits = phone?.replace(/\D/g, '') ?? ''
  return digits.length >= 7
}

export function normalizeDistributionRecipient(recipient: DistributionRecipient): DistributionRecipient {
  return {
    email: normalizeEmail(recipient.email),
    name: recipient.name.trim() || '待分发用户',
    permissionScope: recipient.permissionScope.trim() || '标准安装权限',
    phone: normalizePhone(recipient.phone),
  }
}

export function distributionChannelOptionsForRecipient(
  recipient: DistributionRecipient,
): DistributionChannelOption[] {
  const normalized = normalizeDistributionRecipient(recipient)
  const hasValidEmail = looksLikeEmail(normalized.email)
  const hasValidPhone = looksLikePhone(normalized.phone)

  return [
    {
      channelType: 'sms',
      enabled: hasValidPhone,
      label: distributionChannelLabels.sms,
      reason: hasValidPhone ? `可发送到 ${normalized.phone}` : '先填写手机号后可短信发送',
    },
    {
      channelType: 'email',
      enabled: hasValidEmail,
      label: distributionChannelLabels.email,
      reason: hasValidEmail ? `可发送到 ${normalized.email}` : '先填写邮箱后可邮件发送',
    },
    {
      channelType: 'qr',
      enabled: true,
      label: distributionChannelLabels.qr,
      reason: '无需手机号或邮箱，可直接生成二维码让对方扫码安装',
    },
    {
      channelType: 'url',
      enabled: true,
      label: distributionChannelLabels.url,
      reason: '可复制或发送下载网址，配合同权限验证码使用',
    },
  ]
}

function stableCode(input: string) {
  let hash = 0
  for (const char of input) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1000000
  }
  return String(hash).padStart(6, '0')
}

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, '')
}

function safePermission(permissionScope: string) {
  return encodeURIComponent(permissionScope.trim() || 'standard-user')
}

function targetDownloadUrl(baseUrl: string, targetId: DistributionTargetId, verificationCode: string, permissionScope: string) {
  return `${normalizeBaseUrl(baseUrl)}/${targetId}?code=${verificationCode}&permission=${safePermission(permissionScope)}`
}

export function formatDistributionChannels(channelTypes: DistributionChannelType[]) {
  return channelTypes.map((channelType) => distributionChannelLabels[channelType]).join(' / ')
}

export function buildMultiEndpointDistribution(input: {
  baseUrl: string
  channelTypes: DistributionChannelType[]
  recipient: DistributionRecipient
  targetIds?: DistributionTargetId[]
}): MultiEndpointDistributionPackage {
  const recipient = normalizeDistributionRecipient(input.recipient)
  const targetIds = input.targetIds?.length ? input.targetIds : defaultDistributionTargetIds
  const selectedTargets = platformDistributionTargets.filter((target) => targetIds.includes(target.id))
  const verificationCode = stableCode(
    `${recipient.name}|${recipient.phone ?? ''}|${recipient.email ?? ''}|${recipient.permissionScope}`,
  )
  const targets = selectedTargets.map<DistributionTargetView>((target) => {
    const downloadUrl = targetDownloadUrl(input.baseUrl, target.id, verificationCode, recipient.permissionScope)
    return {
      ...target,
      downloadUrl,
      qrPayload: `${downloadUrl}&platform=${target.id}&scan=1`,
      verificationCode,
    }
  })
  const firstTargetUrl = targets[0]?.downloadUrl ?? normalizeBaseUrl(input.baseUrl)
  const sendQueue = input.channelTypes.map<DistributionSendQueueItem>((channelType) => {
    const destinationMap: Record<DistributionChannelType, string | undefined> = {
      email: recipient.email,
      qr: '前端生成二维码，扫码后校验同权限验证码',
      sms: recipient.phone,
      url: firstTargetUrl,
    }
    const destination = destinationMap[channelType] ?? ''
    return {
      channelType,
      destination: destination || '待补充接收地址',
      message: `${recipient.name}，请使用验证码 ${verificationCode} 下载并开通 ${recipient.permissionScope} 权限。入口：${firstTargetUrl}`,
      status: destination ? '待点击发送' : '待配置账号',
      verificationCode,
    }
  })

  return {
    channelsText: formatDistributionChannels(input.channelTypes),
    permissionScope: recipient.permissionScope,
    recipientName: recipient.name,
    sendQueue,
    targets,
    verificationCode,
  }
}
