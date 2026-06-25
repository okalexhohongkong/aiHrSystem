export type SystemEditionId = 'single' | 'team' | 'enterprise'

export type SystemEdition = {
  id: SystemEditionId
  name: string
  operatorSeats: string
  companyAccounts: string
  recruitingAccountQuota: string
  description: string
}

export const systemEditions: SystemEdition[] = [
  {
    id: 'single',
    name: '单机版',
    operatorSeats: '1人',
    companyAccounts: '1个系统账号',
    recruitingAccountQuota: '1个招聘平台账号',
    description: '适合一个HR或老板自己使用，候选人、简历、录音和报表都在本机或个人工作区。',
  },
  {
    id: 'team',
    name: '多机协作版',
    operatorSeats: '2-20人',
    companyAccounts: '1个公司主账号 + 多个同事子账号',
    recruitingAccountQuota: '1-20个招聘平台账号',
    description: '适合同一家公司多人协作，统一候选人池、统一权限、统一审计，不建议多人共享同一个密码。',
  },
  {
    id: 'enterprise',
    name: '超级企业版',
    operatorSeats: '20人以上',
    companyAccounts: '多组织、多部门、多角色',
    recruitingAccountQuota: '20-100+个招聘平台账号',
    description: '适合集团、人力资源公司和猎头公司，支持多团队、多招聘账号、多岗位流程和分级报表。',
  },
]

export function recruitingAccountBand(count: number) {
  if (count <= 0) return '未连接'
  if (count === 1) return '单账号'
  if (count <= 10) return '1-10账号'
  if (count <= 20) return '10-20账号'
  if (count <= 100) return '20-100账号'
  return '100+账号'
}

export function recommendedEdition(operatorCount: number, recruitingAccountCount: number): SystemEditionId {
  if (operatorCount <= 1 && recruitingAccountCount <= 1) return 'single'
  if (operatorCount <= 20 && recruitingAccountCount <= 20) return 'team'
  return 'enterprise'
}

export function canRecoverWithAnyVerifiedContact(hasVerifiedPhone: boolean, hasVerifiedEmail: boolean) {
  return hasVerifiedPhone || hasVerifiedEmail
}
