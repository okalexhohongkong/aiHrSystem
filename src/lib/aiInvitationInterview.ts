import type { Candidate } from '../data'

export type AiInterviewMode = 'text' | 'voice' | 'selfIntro'
export type AiInterviewStage = 'AI邀约' | '文字面试' | '语音面试' | '三回合追问' | '人工确认'
export type AiInterviewChannelId = 'wecom' | 'wechat' | 'phone' | 'internalVoiceMeeting' | 'recruitingPlatformText' | 'timedChecklist'

export type AiInterviewModeConfig = {
  id: AiInterviewMode
  title: string
  channel: string
  goal: string
  requiredConsent: string[]
}

export type AiInterviewRound = {
  id: string
  title: string
  prompt: string
  evidenceTarget: string
}

export type AiInterviewReport = {
  candidateName: string
  nextAction: '现场复试' | '电话/在线复试' | '谈薪入职' | '人工复核'
  score: number
  summary: string
  tags: string[]
}

export type AiInterviewChannel = {
  id: AiInterviewChannelId
  name: string
  scenario: string
  captureMethod: string
  responseRule: string
}

export type AiEvidenceRequirement = {
  id: string
  title: string
  examples: string[]
  requiredFor: string
}

export const aiInterviewModes: AiInterviewModeConfig[] = [
  {
    channel: '在线文字对话',
    goal: '先问关键问题，快速判断是否进入现场复试或在线复试。',
    id: 'text',
    requiredConsent: ['告知AI辅助面试', '候选人同意文字记录', '人工确认后才进入下一步'],
    title: 'AI文字邀约/面试',
  },
  {
    channel: 'AI语音问答',
    goal: '用语音问题收集自我介绍、岗位理解、薪资条件和可到岗时间。',
    id: 'voice',
    requiredConsent: ['告知录音用途', '候选人同意录音转写', '敏感信息不自动评分'],
    title: 'AI语音邀约/面试',
  },
  {
    channel: '候选人先自我介绍',
    goal: '先让候选人自由表达，再由AI提炼问题并反问三回合。',
    id: 'selfIntro',
    requiredConsent: ['告知AI会生成追问', '候选人确认自述内容可用于招聘评估', '报告需人工复核'],
    title: '自我介绍反问面试',
  },
]

export const aiInterviewStages: AiInterviewStage[] = ['AI邀约', '文字面试', '语音面试', '三回合追问', '人工确认']

export const aiInterviewChannels: AiInterviewChannel[] = [
  {
    captureMethod: '企业微信消息、文件和通话记录归档到候选人档案。',
    id: 'wecom',
    name: '企业微信',
    responseRule: '适合正式邀约、发送清单、收集简历和佐证附件。',
    scenario: '公司主体正式沟通',
  },
  {
    captureMethod: '微信沟通内容由人工确认后摘录，附件进入候选人档案。',
    id: 'wechat',
    name: '微信',
    responseRule: '适合候选人已添加微信后的快速沟通和材料补充。',
    scenario: '候选人个人沟通',
  },
  {
    captureMethod: '电话录音需先告知并取得同意，转写后进入AI摘要。',
    id: 'phone',
    name: '电话',
    responseRule: '适合快速确认意向、薪资、到岗和复试时间。',
    scenario: '电话邀约与电话初筛',
  },
  {
    captureMethod: '自建会议系统保留语音、转写、提纲、评分和授权记录。',
    id: 'internalVoiceMeeting',
    name: '自建在线语音会议',
    responseRule: '适合AI语音问答、在线面试和多人复核。',
    scenario: '公司自有在线面试房间',
  },
  {
    captureMethod: '招聘平台文字对话导入后形成问答记录和清单状态。',
    id: 'recruitingPlatformText',
    name: '招聘平台文字对话',
    responseRule: '适合在平台内发起前置问答，不离开平台也可形成初筛。',
    scenario: 'BOSS等招聘平台文字聊天',
  },
  {
    captureMethod: '系统生成限时清单，记录发送时间、截止时间和回复状态。',
    id: 'timedChecklist',
    name: '限时清单回复',
    responseRule: '适合发给候选人自行回复，逾期进入提醒或淘汰。',
    scenario: '异步问卷与资料收集',
  },
]

export const aiEvidenceRequirements: AiEvidenceRequirement[] = [
  {
    examples: ['客户合同或订单脱敏截图', '销售台账', '项目验收记录', 'CRM成交记录'],
    id: 'performance-proof',
    requiredFor: '涉及业绩、成交、项目成果、客户资源时必须收集。',
    title: '业绩佐证',
  },
  {
    examples: ['工资条', '银行流水脱敏截图', '个税记录', '公司薪酬证明'],
    id: 'salary-proof',
    requiredFor: '涉及过往薪资、底薪、奖金、提成和收入水平时必须收集。',
    title: '发工资佐证',
  },
  {
    examples: ['提成账单', '绩效单', '奖金审批单', '提成发放规则说明'],
    id: 'commission-proof',
    requiredFor: '涉及销售提成、团队奖金、绩效完成率时必须收集。',
    title: '发提成佐证',
  },
  {
    examples: ['荣誉证书', '专利证书', '获奖文件', '公开报道或官网链接'],
    id: 'honor-proof',
    requiredFor: '涉及荣誉、专利、奖项、行业认证时必须收集。',
    title: '荣誉证书佐证',
  },
  {
    examples: ['前上级电话', '合作方证明人', '客户联系人', '项目证明人邮箱或企微'],
    id: 'third-party-proof',
    requiredFor: '涉及重大业绩、管理经历、关键项目和高薪条件时建议收集。',
    title: '第三方背景证明',
  },
]

export function buildAiInterviewRounds(candidate: Candidate, mode: AiInterviewMode): AiInterviewRound[] {
  const modePrefix: Record<AiInterviewMode, string> = {
    selfIntro: '请先做2分钟自我介绍，重点说明最近一份工作、代表成果和求职动机。',
    text: `请用文字简要说明您为什么匹配${candidate.postName}岗位。`,
    voice: `请用语音回答您对${candidate.postName}岗位的理解和最近一个项目成果。`,
  }

  return [
    {
      evidenceTarget: '简历与岗位匹配',
      id: 'round-1',
      prompt: modePrefix[mode],
      title: '第一回合：基础匹配',
    },
    {
      evidenceTarget: '业绩、工资、提成、荣誉证书或第三方证明',
      id: 'round-2',
      prompt: `请举一个最能证明您胜任${candidate.postName}的成果，并说明本人角色、数据结果；涉及业绩、工资、提成、荣誉或第三方评价时，请说明可提供哪些佐证。`,
      title: '第二回合：成果核验',
    },
    {
      evidenceTarget: '薪资、到岗、复试或入职条件',
      id: 'round-3',
      prompt: `请说明期望薪资、最快到岗时间、是否接受线上/现场复试，以及还需要公司确认哪些条件。`,
      title: '第三回合：条件确认',
    },
  ]
}

export function buildAiInterviewReport(candidate: Candidate): AiInterviewReport {
  const score = Math.round(candidate.totalScore * 0.7 + (candidate.cooperationLevel === '高配合' ? 18 : 10))
  const nextAction: AiInterviewReport['nextAction'] =
    score >= 88
      ? '谈薪入职'
      : score >= 78
        ? '现场复试'
        : score >= 68
          ? '电话/在线复试'
          : '人工复核'

  return {
    candidateName: candidate.name,
    nextAction,
    score,
    summary: `${candidate.name}当前综合分${candidate.totalScore}，AI建议重点核验${candidate.postName}岗位成果、薪资条件和到岗时间。`,
    tags: [candidate.postName, candidate.totalLevel, candidate.cooperationLevel, candidate.audioStatus],
  }
}

export function aiInterviewModeLabel(mode: AiInterviewMode) {
  return aiInterviewModes.find((item) => item.id === mode)?.title ?? 'AI面试'
}

export function requiredEvidenceTitles() {
  return aiEvidenceRequirements.map((item) => item.title)
}
