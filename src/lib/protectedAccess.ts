export type ProtectedSectionPolicy = {
  sectionId: string
  label: string
  requiredPermission: string
  reason: string
}

export const prototypeAccessCode = '123456'

export const protectedSectionPolicies: ProtectedSectionPolicy[] = [
  {
    label: '系统后台',
    reason: '涉及账号、权限、版本等级、招聘账号连接和安全策略。',
    requiredPermission: '系统管理员',
    sectionId: 'admin',
  },
  {
    label: '端口Agent',
    reason: '涉及端口Agent、AI机器人话术、Skills增删改、多端下载通道和自动回填逻辑，错误配置会影响招聘质量。',
    requiredPermission: 'AI主管 / 系统管理员',
    sectionId: 'agent',
  },
  {
    label: '风险合规',
    reason: '涉及招聘风险表达、安全合规边界、授权背调、账号恢复和平台规则，需要负责人确认后才能修改。',
    requiredPermission: 'HR负责人 / 系统管理员',
    sectionId: 'riskCompliance',
  },
]

export function protectedPolicyForSection(sectionId: string) {
  return protectedSectionPolicies.find((policy) => policy.sectionId === sectionId)
}

export function isProtectedSection(sectionId: string) {
  return Boolean(protectedPolicyForSection(sectionId))
}

export function verifyProtectedSectionAccess(sectionId: string, code: string) {
  const policy = protectedPolicyForSection(sectionId)
  const normalizedCode = code.trim()

  return {
    allowed: Boolean(policy && normalizedCode === prototypeAccessCode),
    message: policy
      ? `${policy.label}需要${policy.requiredPermission}权限`
      : '该模块不需要额外权限',
    policy,
  }
}
