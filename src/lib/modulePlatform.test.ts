import { describe, expect, it } from 'vitest'
import {
  composeWorkflow,
  defaultRecruitingWorkflow,
  insertWorkflowStep,
  moveWorkflowStep,
  platformModules,
  toggleModule,
  validateModuleDependencies,
  type PlatformModule,
} from './modulePlatform'

describe('modular platform base', () => {
  it('composes a workflow from enabled modules only', () => {
    const workflow = composeWorkflow(defaultRecruitingWorkflow, platformModules)
    const labels = workflow.map((step) => step.label)

    expect(labels).toContain('候选人进入')
    expect(labels).toContain('风险合规')
    expect(labels).toContain('招聘账号连接')
    expect(labels).toContain('岗位AI发布')
    expect(labels).toContain('第三方邀约通道')
    expect(labels).toContain('合伙兼职分流')
    expect(labels).toContain('反向求职调研')
    expect(labels).toContain('AI邀约面试')
    expect(labels).toContain('灵活面试编排')
    expect(labels).toContain('自动分工排班')
    expect(labels).toContain('三轮作业')
    expect(labels).not.toContain('HR核验')
  })

  it('reserves the multi-language and multi-platform adapter layer', () => {
    const adapterModule = platformModules.find((module) => module.id === 'multi-platform-i18n')

    expect(adapterModule?.stage).toBe('预留')
    expect(adapterModule?.dependsOn).toContain('recruiting-account-hub')
  })

  it('registers the workspace layout engine as a base module', () => {
    const layoutModule = platformModules.find((module) => module.id === 'workspace-layout')

    expect(layoutModule?.category).toBe('base')
    expect(layoutModule?.stage).toBe('已接入')
    expect(layoutModule?.enabled).toBe(true)
  })

  it('registers risk compliance as an always-on base module', () => {
    const riskModule = platformModules.find((module) => module.id === 'risk-compliance-center')

    expect(riskModule?.category).toBe('base')
    expect(riskModule?.name).toBe('风险合规中心')
    expect(riskModule?.description).toContain('安全合规')
    expect(riskModule?.stage).toBe('已接入')
    expect(riskModule?.enabled).toBe(true)
  })

  it('registers third-party invitation channels as an integration module', () => {
    const channelModule = platformModules.find((module) => module.id === 'invitation-channel-hub')

    expect(channelModule?.category).toBe('integration')
    expect(channelModule?.enabled).toBe(true)
    expect(channelModule?.dependsOn).toContain('candidate')
  })

  it('registers flexible interview orchestration as a business module', () => {
    const interviewModule = platformModules.find((module) => module.id === 'interview-orchestration')

    expect(interviewModule?.category).toBe('business')
    expect(interviewModule?.enabled).toBe(true)
    expect(interviewModule?.dependsOn).toEqual(['candidate', 'first-evaluation', 'business-questionnaire'])
    expect(interviewModule?.description).toContain('初试、复试、终试和加试')
  })

  it('registers auto dispatch as a business module after interview orchestration', () => {
    const dispatchModule = platformModules.find((module) => module.id === 'auto-dispatch')
    const workflow = composeWorkflow(defaultRecruitingWorkflow, platformModules)
    const interviewIndex = workflow.findIndex((step) => step.id === 'step-interviews')

    expect(dispatchModule?.category).toBe('business')
    expect(dispatchModule?.enabled).toBe(true)
    expect(dispatchModule?.dependsOn).toEqual(['candidate', 'interview-orchestration', 'invitation-channel-hub'])
    expect(workflow[interviewIndex + 1].id).toBe('step-auto-dispatch')
  })

  it('registers AI invitation interview as an AI module after Port Agent', () => {
    const portAgentModule = platformModules.find((module) => module.id === 'port-agent')
    const aiInterviewModule = platformModules.find((module) => module.id === 'ai-invitation-interview')
    const workflow = composeWorkflow(defaultRecruitingWorkflow, platformModules)
    const agentIndex = workflow.findIndex((step) => step.id === 'step-agent')

    expect(portAgentModule?.name).toBe('端口Agent')
    expect(portAgentModule?.description).toContain('多端下载')
    expect(portAgentModule?.description).toContain('短信/邮件/二维码/链接')
    expect(aiInterviewModule?.category).toBe('ai')
    expect(aiInterviewModule?.enabled).toBe(true)
    expect(aiInterviewModule?.dependsOn).toEqual(['candidate', 'port-agent', 'invitation-channel-hub'])
    expect(workflow[agentIndex + 1].id).toBe('step-ai-invitation-interview')
  })

  it('inserts new workflow modules after a specified step', () => {
    const next = {
      id: 'step-offer',
      moduleId: 'offer',
      label: 'Offer审批',
    }
    const workflow = insertWorkflowStep(defaultRecruitingWorkflow, 'step-review', next)
    const reviewIndex = workflow.findIndex((step) => step.id === 'step-review')

    expect(workflow[reviewIndex + 1]).toEqual(next)
  })

  it('toggles a module without mutating the registry', () => {
    const toggled = toggleModule(platformModules, 'background-check')

    expect(platformModules.find((module) => module.id === 'background-check')?.enabled).toBe(false)
    expect(toggled.find((module) => module.id === 'background-check')?.enabled).toBe(true)
  })

  it('moves workflow steps up and down inside the composition', () => {
    const movedUp = moveWorkflowStep(defaultRecruitingWorkflow, 'step-first', 'up')
    const movedUpIndex = movedUp.findIndex((step) => step.id === 'step-first')

    expect(movedUp[movedUpIndex + 1].id).toBe('step-audio')

    const movedDown = moveWorkflowStep(defaultRecruitingWorkflow, 'step-resume', 'down')
    const movedDownIndex = movedDown.findIndex((step) => step.id === 'step-resume')

    expect(movedDown[movedDownIndex - 1].id).toBe('step-account')
  })

  it('reports enabled modules with missing dependencies', () => {
    const modules: PlatformModule[] = [
      {
        id: 'candidate',
        name: '候选人档案',
        category: 'base',
        description: 'base',
        dependsOn: [],
        enabled: false,
        stage: '已接入',
      },
      {
        id: 'resume-scoring',
        name: '简历评分',
        category: 'business',
        description: 'score',
        dependsOn: ['candidate'],
        enabled: true,
        stage: '已接入',
      },
    ]

    expect(validateModuleDependencies(modules)).toEqual(['简历评分缺少依赖模块：candidate'])
  })
})
