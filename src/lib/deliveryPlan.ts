export type DeliveryStageStatus = 'done' | 'doing' | 'next' | 'planned'

export type DeliveryStage = {
  id: string
  title: string
  status: DeliveryStageStatus
  startSlot: number
  durationSlots: number
  progress: number
  remainingHours: number
  deliverable: string
  acceptance: string
}

export const deliveryPlanStartLabel = 'D0 今天'
export const deliveryPlanPaceLabel = '加急节奏：72小时核心可用，96小时桌面演示包'

export const deliveryStages: DeliveryStage[] = [
  {
    acceptance: '浏览器能打开，核心菜单不空白，测试和打包通过。',
    deliverable: 'Web/PWA 演示包、README、Mac/Windows 启动脚本。',
    durationSlots: 1,
    id: 'demo-package',
    progress: 100,
    remainingHours: 0,
    startSlot: 0,
    status: 'done',
    title: '可安装/可演示版收口',
  },
  {
    acceptance: '候选人、岗位、评分、问卷、作业、设置刷新后仍然保留。',
    deliverable: '本地数据库或本地文件存储，候选人和岗位可增删改查。',
    durationSlots: 1,
    id: 'local-storage',
    progress: 35,
    remainingHours: 14,
    startSlot: 1,
    status: 'doing',
    title: '单机数据保存',
  },
  {
    acceptance: '录音、简历、面试档案、三轮作业能上传、查看、归档。',
    deliverable: '本地文件库、录音记录、面试档案、作业答卷归档。',
    durationSlots: 1,
    id: 'workflow-usable',
    progress: 0,
    remainingHours: 24,
    startSlot: 2,
    status: 'next',
    title: '招聘主流程可用',
  },
  {
    acceptance: '账号能登录，权限能限制，Excel/CSV 能导出。',
    deliverable: '登录权限、系统后台保存、基础报表导出。',
    durationSlots: 1,
    id: 'admin-export',
    progress: 0,
    remainingHours: 24,
    startSlot: 3,
    status: 'planned',
    title: '后台权限、导出与桌面启动包',
  },
  {
    acceptance: '把非阻断问题放入清单，后续并行补齐，不拖慢核心可用版。',
    deliverable: '真实接口、ASR、AI、短信邮件微信、招聘平台适配器的后续接入清单。',
    durationSlots: 1,
    id: 'integration-backlog',
    progress: 5,
    remainingHours: 11,
    startSlot: 4,
    status: 'planned',
    title: '外部接口并行预留',
  },
]

export function deliveryStatusLabel(status: DeliveryStageStatus) {
  const labels: Record<DeliveryStageStatus, string> = {
    doing: '进行中',
    done: '已完成',
    next: '下一步',
    planned: '计划中',
  }

  return labels[status]
}

export function deliveryStageRange(stage: DeliveryStage) {
  const endSlot = stage.startSlot + stage.durationSlots - 1
  if (stage.durationSlots <= 1) {
    return `D${stage.startSlot}`
  }

  return `D${stage.startSlot}-D${endSlot}`
}

export function deliveryStageCountdownLabel(stage: Pick<DeliveryStage, 'remainingHours' | 'status'>) {
  if (stage.status === 'done' || stage.remainingHours <= 0) return '已完成'
  return `预计还需 ${stage.remainingHours} 小时`
}

export function deliveryPlanSummary(stages: DeliveryStage[]) {
  const weightedTotal = stages.reduce((sum, stage) => sum + stage.durationSlots, 0)
  const weightedDone = stages.reduce((sum, stage) => sum + (stage.progress / 100) * stage.durationSlots, 0)
  const percent = weightedTotal > 0 ? Math.round((weightedDone / weightedTotal) * 100) : 0
  const current = stages.find((stage) => stage.status === 'doing') ?? stages.find((stage) => stage.status === 'next')
  const next = stages.find((stage) => stage.status === 'next') ?? stages.find((stage) => stage.status === 'planned')

  return {
    currentTitle: current?.title ?? '待安排',
    nextTitle: next?.title ?? '待安排',
    overallProgress: percent,
    remainingHours: stages.reduce((sum, stage) => sum + Math.max(0, stage.remainingHours), 0),
    totalSlots: weightedTotal,
  }
}
