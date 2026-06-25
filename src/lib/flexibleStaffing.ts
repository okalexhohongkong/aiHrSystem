export type FlexibleStaffingCategoryId = 'labor' | 'hourly' | 'partner' | 'partTime' | 'intern'

export type FlexibleStaffingCategory = {
  id: FlexibleStaffingCategoryId
  title: string
  menuLabel: string
  description: string
  headcount: number
  openRoles: number
  payMode: string
  focus: string[]
}

export const flexibleStaffingCategories: FlexibleStaffingCategory[] = [
  {
    description: '适合批量用工、临时项目、外包协作和到岗确认管理。',
    focus: ['证件核验', '到岗确认', '排班分组'],
    headcount: 38,
    id: 'labor',
    menuLabel: '劳务',
    openRoles: 3,
    payMode: '按日/按项目',
    title: '劳务用工',
  },
  {
    description: '适合门店、展厅、仓储、活动现场等按小时排班的用工。',
    focus: ['小时单价', '班次', '替补池'],
    headcount: 18,
    id: 'hourly',
    menuLabel: '小时工',
    openRoles: 2,
    payMode: '按小时',
    title: '小时工',
  },
  {
    description: '适合资源型、渠道型、项目型合作人才，关注合作条件和收益机制。',
    focus: ['资源证明', '合作模式', '分成规则'],
    headcount: 5,
    id: 'partner',
    menuLabel: '合伙',
    openRoles: 2,
    payMode: '合作/分成',
    title: '合伙人',
  },
  {
    description: '适合阶段性任务、项目制协作、内容制作、活动执行等岗位。',
    focus: ['任务周期', '交付质量', '可投入时间'],
    headcount: 24,
    id: 'partTime',
    menuLabel: '兼职',
    openRoles: 4,
    payMode: '按天/按件',
    title: '兼职',
  },
  {
    description: '适合中专、高职、本科、硕士、博士实习生的人才储备和校企合作。',
    focus: ['学历层级', '实习周期', '转正潜力'],
    headcount: 16,
    id: 'intern',
    menuLabel: '实习',
    openRoles: 5,
    payMode: '实习补贴',
    title: '实习生',
  },
]

export const flexibleStaffingSop = [
  '选择五类用工块：劳务、小时工、合伙、兼职、实习。',
  '创建需求：岗位、人数、地点、周期、薪酬或合作方式、证件和到岗要求。',
  '批量收集报名：联系方式、可到岗时间、距离、经验、证件状态、可投入时间。',
  'AI初筛：距离、排班匹配、稳定性、爽约风险、合作适配度、实习转正潜力。',
  'HR确认：电话确认、证件核验、排班分组、合作条款或实习协议确认。',
  '过程追踪：签到、缺勤、替补、交付质量、结算和复用评价。',
]

export function flexibleStaffingTotalHeadcount(categories = flexibleStaffingCategories) {
  return categories.reduce((sum, category) => sum + category.headcount, 0)
}

export function flexibleStaffingTotalOpenRoles(categories = flexibleStaffingCategories) {
  return categories.reduce((sum, category) => sum + category.openRoles, 0)
}

export function flexibleStaffingCategoryLabels(categories = flexibleStaffingCategories) {
  return categories.map((category) => category.menuLabel)
}
