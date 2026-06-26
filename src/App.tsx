import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  Clock,
  Eye,
  FileAudio,
  FileText,
  FileStack,
  GitMerge,
  GripVertical,
  Handshake,
  Home,
  Lock,
  MailCheck,
  Megaphone,
  MessageSquareText,
  Mic,
  Pause,
  Palette,
  Play,
  Plus,
  Search,
  MonitorSmartphone,
  LibraryBig,
  ScanLine,
  Send,
  Settings,
  X,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Power,
  PowerOff,
  RotateCcw,
  Unlock,
  UserRoundSearch,
  Users,
  WalletCards,
  Workflow,
} from 'lucide-react'
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { initialCandidates, platformPlan, type Candidate, type CandidateStatus } from './data'
import { recommendedEdition, recruitingAccountBand, systemEditions } from './lib/accountPlans'
import { adminConsoleLayoutPreference } from './lib/adminLayout'
import { overviewDashboardLayoutPreference } from './lib/dashboardOverview'
import {
  culturalNotePolicy,
  hrCallQualityItems,
  hrCallQualityScore,
} from './lib/candidateCulture'
import {
  audioBackendPushPath,
  audioComplianceWarnings,
  audioSourceTypeLabels,
  buildAudioInterviewReport,
  buildMeetingArchivePackage,
  createMeetingAudioImportRequest,
  createAudioIntakeRecord,
  describeMeetingAccessCredential,
  isSupportedRecruitingPhone,
  interviewRoundLabels,
  matchCandidateFromAudio,
  meetingAccessMethodLabels,
  meetingPlatformAdapters,
  meetingPlatformSupportsAccessMethod,
  recruitingPhoneDevices,
} from './lib/audioIntake'
import {
  addManualDisplayField,
  buildAiTimeoutFallbackStrategy,
  buildCandidateFollowupStrategy,
  candidateBoardLayoutPreference,
  candidateBoardRowTone,
  candidateBoardTimeText,
  candidateJobCode,
  candidateJobCodeProfile,
  candidateKeywordTone,
  candidatePoolColumnLabels,
  candidateFocusMatches,
  candidateMatchScore,
  candidateMatchStatus,
  candidateOperationTimeText,
  candidatePlatformAccountText,
  dataFieldStatusCounts,
  defaultAiTimeoutFallbackTemplates,
  defaultCandidateFocusTags,
  defaultCandidatePoolColumns,
  displayFieldDensityClass,
  jobHopSummary,
  restrictedCandidateFields,
  salaryRangeText,
  sortCandidates,
  suggestedCandidateFocusTags,
  toggleCandidatePoolColumn,
  type CandidateTalentLayer as CandidatePoolTalentLayer,
  type CandidatePoolColumn,
  type CandidatePoolSort,
} from './lib/candidatePool'
import {
  buildRadarPolygonPoints,
  calculateFirstEvaluationWeightedAverage,
  createManualFirstEvaluationDimension,
  createFirstEvaluationRows,
  firstEvaluationLayoutPreference,
  moveFirstEvaluationDimension,
  postTypeDimensionOrders,
  type FirstEvaluationDimensionId,
  type FirstEvaluationRow,
} from './lib/firstEvaluationModel'
import {
  flexibleStaffingCategories,
  flexibleStaffingSop,
  flexibleStaffingTotalHeadcount,
  flexibleStaffingTotalOpenRoles,
} from './lib/flexibleStaffing'
import {
  applyColorPreset,
  applyEnterpriseBrandPreset,
  clampFontSize,
  clampSidebarAccentWidth,
  clampSidebarFontSize,
  clampSidebarLineHeight,
  colorPresets,
  enterpriseBrandPresets,
  fontCss,
  fontFamilyOptions,
  toggleVisibleSection,
  visibleSectionCountText,
  type InterfaceSettings,
} from './lib/interfaceSettings'
import {
  deliveryPlanStartLabel,
  deliveryPlanPaceLabel,
  deliveryPlanSummary,
  deliveryStageCountdownLabel,
  deliveryStageRange,
  deliveryStages,
  deliveryStatusLabel,
} from './lib/deliveryPlan'
import { hrFunctionModules, permissionLevels, summarizeHrPermissionSystem } from './lib/hrPermissions'
import {
  languageInterfaces,
  platformLoginMethodSummary,
  recruitingPlatformAdapters,
} from './lib/integrationAdapters'
import {
  composeInvitationMessage,
  createInvitationQueueRecord,
  defaultInvitationQueueRecords,
  defaultEmailInstructionModuleIds,
  emailInstructionModules,
  invitationChannelLabels,
  invitationProcessingOrder,
  invitationQueueStatuses,
  validateDedicatedCompanyAccount,
  type InvitationChannelAccount,
  type InvitationChannelType,
  type InvitationQueueRecord,
  type InvitationQueueStatus,
} from './lib/invitationChannels'
import {
  aiEvidenceRequirements,
  aiInterviewChannels,
  aiInterviewModeLabel,
  aiInterviewModes,
  aiInterviewStages,
  buildAiInterviewReport,
  buildAiInterviewRounds,
  type AiInterviewMode,
} from './lib/aiInvitationInterview'
import {
  defaultResearchLockState,
  generateJobCompletionSuggestions,
  inferMissingRolesByCompanySize,
  jobMarketModuleName,
  keywordFrequency,
  marketResearchPostings,
  marketResearchResumeProfiles,
  matchResumeProfilesToPostings,
  researchPersonas,
  researchCollectionPolicy,
  researchComplianceBoundary,
  researchScopeSummary,
  salaryBenchmark,
} from './lib/jobMarketResearch'
import {
  addQuestionToCard,
  calculateQuestionnaireScore,
  createQuestionnaireCard,
  defaultJobQuestionnaireCards,
  generateQuestionsFromJd,
  removeQuestionFromCard,
  questionnaireModuleQuestionCount,
  questionnaireSignalsByTone,
  toggleQuestionnaireFavorite,
  type JobQuestionnaireCard,
} from './lib/jobQuestionnaire'
import {
  assignInterviewers,
  buildInterviewRoundExecutionRows,
  buildInterviewWorkflow,
  calculateInterviewTotal,
  createCandidateInterviewArchive,
  interviewWorkflowTemplates,
  interviewRounds,
  interviewArchiveRoundLabels,
  investigationItems,
  isInterviewRoundStep,
  roundArchiveCompleteness,
  summarizeInterviewWorkflow,
  type InterviewDecisionOwner,
  type InterviewRoundArchive,
  type InterviewWorkflowTemplateId,
} from './lib/interviewOrchestration'
import {
  createUserLayoutPreference,
  layoutItemGridFractionClass,
  layoutItemRatioClass,
  layoutItemScaleClass,
  layoutItemSizeClass,
  layoutModeClass,
  reorderUserSidebar,
  reorderWorkspaceLayout,
  resetWorkspaceLayout,
  resizeWorkspaceLayoutItem,
  scaleWorkspaceLayoutItem,
  setWorkspaceLocked,
  setWorkspaceLayoutMode,
  setWorkspaceLayoutItemRatio,
  snapLayoutGridFraction,
  snapWorkspaceLayoutItemToGrid,
  updateUserWorkspaceLayout,
  type LayoutGridFraction,
  type LayoutItem,
  type LayoutItemRatio,
  type LayoutItemScale,
  type LayoutItemSize,
  type UserLayoutPreference,
  type WorkspaceLayoutMode,
  type WorkspaceLayoutState,
} from './lib/layoutWorkspace'
import {
  browserLocalStorage,
  clearPersistedValues,
  exportPersistedValues,
  localPersistenceKeys,
  readPersistedValue,
  restorePersistedValues,
  writePersistedValue,
} from './lib/localPersistence'
import {
  findRiskCorrections,
  oralRequirementRewritePrinciples,
  riskCorrectionRules,
  riskSeverityLabel,
} from './lib/riskCorrection'
import {
  bossCandidateSourceLabels,
  buildBossRecruitingPipeline,
  nextBossPipelineActions,
  summarizeBossPipeline,
  type BossCandidateSource,
  type BossRecruitingCandidateInput,
  type BossInvitationManualStatus,
  type BossSalaryAlignment,
  type BossPipelineStageStatus,
  type BossPipelineActionPriority,
  type BossResumeCollectionStatus,
} from './lib/bossRecruitingFlow'
import {
  bossCandidateActionTiers,
  bossComplianceGuardrails,
  bossGreetingScriptModes,
  bossManagedAccountWorkflow,
  bossManagedDataFields,
  bossResumeMailboxWorkflow,
  bossTouchExecutionTracks,
  bindingModeLabel,
  recruitingAccountMatrix,
  recruitingLoginMethods,
} from './lib/recruitingAccounts'
import {
  addManualKeyword,
  adjustJobPostingHeadcount,
  buildCandidateFollowupPriority,
  buildPrePublishingGenerationPlan,
  buildOrganizationHiringPlan,
  buildJobCodeProfile,
  compactDisplayClass,
  companyScaleRules,
  departmentBenchmarkQuestions,
  defaultDepartmentBenchmarkBrief,
  jobOpeningCount,
  jobPostingTypeLabels,
  jobPostingTypeOptions,
  metricBadges,
  pauseJobPosting,
  peerKeywordWeight,
  publishingConversionRate,
  summarizeDepartmentBenchmark,
  sumPostingMetrics,
  toggleJobPostingFavorite,
  voiceToJdPipeline,
  type DepartmentBenchmarkBrief,
  type JobPostingType,
  type JobPublishingCard,
} from './lib/jobPublishing'
import {
  composeWorkflow,
  defaultRecruitingWorkflow,
  moveWorkflowStep,
  platformBaseCapabilities,
  platformModules,
  toggleModule,
  validateModuleDependencies,
} from './lib/modulePlatform'
import {
  hrReferenceCoverageSummary,
  hrReferenceIntegrationPrinciples,
  hrReferencesForModule,
} from './lib/hrSystemReferences'
import {
  buildCandidateTickerRows,
  highScoreCandidates,
  paginateReportRows,
  popupSizeClass,
  postScrollSize,
  reportScrollDuration,
  type CandidateTickerMode,
  type ReportPopupSize,
} from './lib/reportDashboard'
import { buildSidebarBadge } from './lib/sidebarBadges'
import { distributionChannelLabels } from './lib/platformDistribution'
import { buildPortAgentHub, portAgentMenuLabel } from './lib/portAgent'
import {
  buildRoleGoalFramework,
  flattenGoalIndicators,
  goalCadenceLabels,
  goalFrameworkSummary,
  goalIndicatorTypeLabels,
  moduleWeight,
  performanceGoalModeLabels,
  type GoalIndicatorType,
  type PerformanceGoalMode,
} from './lib/performanceGoals'
import {
  buildCandidateInterviewGuideSummary,
  buildCandidateConsentChecklist,
  buildMobileMeetingSession,
  buildMobileWorkSummary,
  defaultCandidateInterviewGuide,
  defaultMobileReminderTasks,
  mobileAuthorizationScopes,
  mobileMeetingModeLabels,
  mobileReminderTypeLabels,
  mobileRoleLabels,
  mobileTerminalDevices,
  mobileWorkSopSteps,
  routeMobileReminder,
} from './lib/mobileWorkTerminal'
import { buildTerminalCalendarBoard } from './lib/calendarIntegration'
import {
  protectedPolicyForSection,
  prototypeAccessCode,
  verifyProtectedSectionAccess,
} from './lib/protectedAccess'
import { formatSectionProgressPercent, sectionProgressByTitle } from './lib/sectionProgress'
import {
  demoInterviewRecords,
  demoPlatformAccounts,
  demoPlatformFilterOptions,
  demoPlatformSummary,
  filterDemoInterviewsByPlatform,
  type DemoPlatformFilter,
} from './lib/demoSystem'
import {
  autoDispatchChannelSummary,
  autoDispatchSeverityLabel,
  autoDispatchStageLabel,
  buildAutoDispatchBoard,
  type AutoDispatchCase,
} from './lib/autoDispatch'
import { businessLevel, dashboardColor } from './lib/scoring'
import {
  buildTalentLibraryBoard,
  type TalentArchiveContext,
  type TalentLibraryGroupId,
  talentLibraryGroups,
} from './lib/talentLibrary'
import {
  buildCaseStudyArchive,
  calculateHomeworkScore,
  defaultThreeStageHomeworkTasks,
  homeworkRoundLabels,
  summarizeHomeworkTracking,
  type ThreeStageHomeworkTask,
} from './lib/threeStageHomework'
import {
  contractDashboardSummary,
  contractTemplateCatalog,
  contractTypeLabels,
  contractWorkflowSteps,
  createContractDraft,
  memoReviewSummary,
  templateByType,
  type ContractMemoItem,
  type ContractType,
} from './lib/contractManagement'
import {
  buildSearchResultKeywords,
  searchGlobalEntries,
  type GlobalSearchHit,
  type GlobalSearchEntry,
} from './lib/globalSearch'
import {
  orderedSidebarSections,
  type AppSection as Section,
} from './lib/navigationStructure'

type NavItem = { id: Section; label: string; icon: React.ComponentType<{ size?: number }> }

const showExplicitHrReferences = import.meta.env.VITE_HR_REFERENCE_MODE === 'visible'

const navItems: NavItem[] = [
  { id: 'candidates', label: '候选看板', icon: Users },
  { id: 'publishing', label: '岗位发布', icon: Megaphone },
  { id: 'accounts', label: '招聘账号', icon: ScanLine },
  { id: 'invitationChannels', label: '预约通道', icon: Send },
  { id: 'mail', label: '邀约预约', icon: Send },
  { id: 'audio', label: '录音解析', icon: FileAudio },
  { id: 'first', label: '初试评分', icon: ClipboardCheck },
  { id: 'business', label: '岗位问卷', icon: BriefcaseBusiness },
  { id: 'aiInterview', label: 'AI邀约面试', icon: MessageSquareText },
  { id: 'interviews', label: '面试编排', icon: ClipboardCheck },
  { id: 'review', label: '三轮作业', icon: FileText },
  { id: 'autoDispatch', label: '自动分工', icon: Workflow },
  { id: 'agent', label: portAgentMenuLabel, icon: Bot },
  { id: 'talentLibrary', label: '简历库', icon: LibraryBig },
  { id: 'reports', label: '数据看板', icon: BarChart3 },
  { id: 'performanceGoals', label: '成果目标', icon: BadgeCheck },
  { id: 'contracts', label: '合约模块', icon: FileStack },
  { id: 'jobseeker', label: '反向求职调研', icon: UserRoundSearch },
  { id: 'labor', label: '合伙兼职', icon: Handshake },
  { id: 'mobileWork', label: '移动工作端', icon: Smartphone },
  { id: 'base', label: '平台底座', icon: Workflow },
  { id: 'blueprint', label: '融合蓝图', icon: GitMerge },
  { id: 'platform', label: '多端路线', icon: MonitorSmartphone },
  { id: 'theme', label: '界面皮肤', icon: Palette },
  { id: 'riskCompliance', label: '风险合规', icon: ShieldCheck },
]

const topShortcutItems: NavItem[] = [
  { id: 'dashboard', label: '总览', icon: Home },
  { id: 'admin', label: '系统后台', icon: Settings },
]

const themes = [
  { id: 'sky', name: '天蓝色', note: '默认主题，清爽、适合日常办公' },
  { id: 'green', name: '绿色', note: '招聘/人才感更强，视觉温和' },
  { id: 'teal', name: '青绿色', note: '偏科技和AI工具感' },
  { id: 'navy', name: '深蓝色', note: '稳重，适合老板看板和管理端' },
] as const

type ThemeId = (typeof themes)[number]['id']

type LayoutProfileRegistry = Record<LayoutProfileId, UserLayoutPreference>
type BossRecruitingCandidateWorkflowState = {
  archived?: boolean
  archiveReason?: string
  contacted?: boolean
  humanConfirmed?: boolean
  operationLog?: BossWorkflowLogEntry[]
  resumeReceived?: boolean
  updatedAt?: string
}
type BossRecruitingWorkflowState = Record<string, BossRecruitingCandidateWorkflowState>
type BossPipelineFilter = 'all' | 'archived' | 'highScore' | 'needsHuman' | 'resumeReceived' | 'salaryMismatch'
type BossManualImportDraft = {
  evidenceScore: number
  expectedSalaryMax: number
  expectedSalaryMin: number
  hasResume: boolean
  matchScore: number
  name: string
  source: BossCandidateSource
  targetRole: string
}
type BossWorkflowLogEntry = {
  action: string
  at: string
  note?: string
}

function cardItem(id: string, title: string): LayoutItem {
  return { id, title }
}

const navItemLookup = new Map(navItems.map((item) => [item.id, item]))

const layoutProfileOptions = [
  {
    id: 'hr',
    name: '陈HR界面',
    role: '人事专员',
    note: '岗位发布、候选看板和初试处理优先。',
  },
  {
    id: 'boss',
    name: '老板/复试官界面',
    role: '复试负责人',
    note: '候选看板、面试编排、三轮作业和数据看板优先。',
  },
  {
    id: 'admin',
    name: '管理员界面',
    role: '系统管理员',
    note: '后台、账号连接、平台底座、安全合规优先。',
  },
] as const

type LayoutProfileId = (typeof layoutProfileOptions)[number]['id']

const defaultInterfaceSettings: InterfaceSettings = {
  backgroundColor: '#f0f8ff',
  brandLogoText: 'AI',
  brandName: '黑卫士 AI HR',
  brandSubtitle: 'V1.2 Web / PWA',
  cardColor: '#ffffff',
  customFontFamily: '',
  fontFamily: 'system',
  fontSize: 14,
  lineColor: '#d7e5ef',
  primaryColor: '#0284c7',
  sidebarAccentWidth: 4,
  sidebarColor: '#0c4a6e',
  sidebarFontSize: 14,
  sidebarLineHeight: 1.3,
  textColor: '#1f2937',
  visibleSections: navItems.map((item) => item.id),
}

const sidebarPriorityByProfile: Record<LayoutProfileId, Section[]> = {
  admin: ['candidates', 'publishing', 'accounts', 'invitationChannels', 'mail', 'autoDispatch', 'base', 'riskCompliance', 'platform'],
  boss: ['candidates', 'publishing', 'interviews', 'review', 'talentLibrary', 'reports', 'performanceGoals', 'contracts', 'mobileWork'],
  hr: ['candidates', 'publishing', 'accounts', 'invitationChannels', 'mail', 'audio', 'first', 'business', 'aiInterview', 'interviews', 'review'],
}

function orderedSections(priority: Section[]) {
  return orderedSidebarSections([...priority, ...navItems.map((item) => item.id)])
}

function sidebarItemsForProfile(profileId: LayoutProfileId) {
  return orderedSections(sidebarPriorityByProfile[profileId]).map((sectionId) => {
    const navItem = navItemLookup.get(sectionId)
    return cardItem(sectionId, navItem?.label ?? sectionId)
  })
}

const defaultWorkspaceItems: Record<Section, LayoutItem[]> = {
  accounts: [
    cardItem('login-guide', '统一登录引导'),
    cardItem('account-security', '安全边界'),
    cardItem('language-adapters', '语言与智库接口预留'),
    cardItem('platform-adapters', '招聘平台适配器预留'),
    cardItem('account-matrix', '多招号招聘矩阵'),
    cardItem('boss-pipeline-demo', 'BOSS招聘主链路试运行看板'),
    cardItem('boss-managed-control', 'BOSS合规托管中控'),
    cardItem('boss-greeting-scripts', '打招呼话术三模式'),
    cardItem('boss-touch-tracks', '双轨合规触达'),
    cardItem('boss-resume-mailbox', 'BOSS预留邮箱简历托管'),
    cardItem('boss-data-fields', 'BOSS数据归集字段'),
    cardItem('boss-candidate-tiers', '候选人分级邀约动作'),
    cardItem('boss-guardrails', '托管保护边界'),
  ],
  admin: [
    cardItem('edition-suggestion', '当前版本建议'),
    cardItem('operator-count', '后台用户'),
    cardItem('recruiting-account-count', '招聘账号'),
    cardItem('verification-methods', '验证方式'),
    cardItem('plain-passwords', '明文密码'),
    cardItem('auth-rules', '登录与找回密码规则'),
    cardItem('edition-rules', '版本等级建议'),
    cardItem('user-management', '同事账号管理'),
    cardItem('account-management', '招聘账号连接管理'),
    cardItem('release-path', '今天可交付与正式安装路线'),
  ],
  agent: [
    cardItem('port-agent-hub', '端口Agent总览'),
    cardItem('port-agent-distribution', 'APP下载与发送通道'),
    cardItem('sales-skills', 'Skills标准流程'),
    cardItem('agent-json', '结构化回填示例'),
  ],
  aiInterview: [
    cardItem('ai-invitation-modes', 'AI邀约模式'),
    cardItem('ai-three-rounds', '三回合AI面试'),
    cardItem('ai-human-confirm', '报告与人工确认'),
    cardItem('ai-compliance', '授权与边界'),
  ],
  autoDispatch: [
    cardItem('dispatch-overview', '自动分工总览'),
    cardItem('dispatch-thresholds', '阈值与入库'),
    cardItem('dispatch-confirmation', '双向确认与电话兜底'),
    cardItem('dispatch-alerts', '报警与弹窗'),
    cardItem('dispatch-backup', '后备面试官/后备面试人'),
    cardItem('dispatch-channels', '通知渠道'),
  ],
  audio: [
    cardItem('meeting-intake', '会议录音接入中心'),
    cardItem('round-recording-matrix', '初复终录音矩阵'),
    cardItem('phone-intake', '招聘手机接入'),
    cardItem('audio-link-queue', '录音链接推送队列'),
    cardItem('candidate-audio-match', '候选人电话匹配'),
    cardItem('audio-report', '录音面试报告'),
    cardItem('audio-graphs', '思维导图与能力图谱'),
    cardItem('audio-upload', '录音上传'),
    cardItem('audio-transcript', '转写与一致性分析'),
    cardItem('cultural-note', '候选人自愿文化备注'),
    cardItem('hr-call-quality', 'HR电话质检与尽责监督'),
  ],
  base: [
    cardItem('base-capabilities', '底座核心能力'),
    cardItem('dependency-check', '模块依赖检查'),
    cardItem('module-registry', '模块注册表'),
    cardItem('workflow-builder', '当前招聘流程编排'),
  ],
  blueprint: [
    cardItem('fusion-principles', '融合原则'),
    cardItem('module-tree', '融合后模块树'),
    cardItem('development-priority', '融合后开发优先级'),
  ],
  business: [
    cardItem('job-questionnaire-cards', '岗位问卷卡片库'),
    cardItem('jd-question-generator', 'JD反向生成问卷'),
    cardItem('question-editor', '题目加减分评分'),
    cardItem('role-fields', '岗位字段示例'),
  ],
  candidates: [
    cardItem('candidate-columns', '显示字段'),
    cardItem('candidate-focus', '重点关注项'),
    cardItem('talent-library-preview', '简历库分层'),
    cardItem('candidate-followup-queue', '候选人优先跟进队列'),
    cardItem('candidate-ai-fallback', 'AI超时兜底草稿'),
    cardItem('candidate-list', '候选看板长条列表'),
  ],
  talentLibrary: [
    cardItem('talent-library-summary', '简历库总览'),
    cardItem('talent-library-rules', '转库规则'),
    cardItem('talent-library-board', '分层人才库看板'),
    cardItem('salary-mismatch-pool', '条件谈不拢猎头库'),
  ],
  performanceGoals: [
    cardItem('goal-mode-switch', '成果目标命名'),
    cardItem('goal-summary', '岗位目标总览'),
    cardItem('goal-module-extraction', '岗位基础模块提炼'),
    cardItem('goal-three-level-tree', '三级指标树'),
    cardItem('goal-type-system', '量化周期系统业绩'),
    cardItem('goal-training-system', '培训系统化拆解'),
    cardItem('goal-cycle-routine', '周期动作清单'),
    cardItem('goal-ai-builder', 'AI提炼接口预留'),
  ],
  contracts: [
    cardItem('contract-summary', '合约总览'),
    cardItem('contract-type-flow', '四类合约流转'),
    cardItem('contract-template-library', '律师固定模板库'),
    cardItem('contract-variable-fill', '变量数据填充'),
    cardItem('contract-memo-rules', '额外约定备忘录'),
    cardItem('contract-draft-preview', '合约包生成预览'),
    cardItem('contract-approval-flow', '审批与用章流程'),
  ],
  dashboard: [
    cardItem('delivery-gantt', '开发节奏甘特图'),
    cardItem('candidate-total', '候选人总量'),
    cardItem('recommended-review', '推荐复试'),
    cardItem('audio-parsed', '录音已解析'),
    cardItem('homework-pending', '待提交作业'),
    cardItem('high-level-candidates', 'S/A候选人'),
    cardItem('demo-system', 'Demo演示系统'),
    cardItem('dispatch-summary', '自动分工总览'),
    cardItem('overview-window', '岗位与面试者滚动窗口'),
    cardItem('priority-list', '今日优先处理'),
    cardItem('sop-overview', '融合后总SOP'),
  ],
  first: [cardItem('first-dimensions', '9大维度评分'), cardItem('first-summary', 'AI初试摘要')],
  jobseeker: [
    cardItem('research-lock', '动态锁定'),
    cardItem('research-personas', '调研角色画像'),
    cardItem('market-completion', '岗位补齐建议'),
    cardItem('missing-role-gaps', '同规模缺岗补齐'),
    cardItem('market-keywords', '市场关键词'),
    cardItem('salary-benchmark', '薪资基准'),
    cardItem('research-boundary', '合规边界总览'),
    cardItem('peer-postings', '同行岗位样本'),
  ],
  labor: [
    cardItem('flexible-type-count', '用工类型'),
    cardItem('labor-headcount', '需求人数'),
    cardItem('arrival-confirm', '待到岗确认'),
    cardItem('certificate-check', '证件待核验'),
    cardItem('partner-opportunity', '合伙机会'),
    cardItem('flexible-sop', '合伙兼职SOP'),
    cardItem('flexible-category-blocks', '五类用工块'),
  ],
  invitationChannels: [
    cardItem('channel-overview', '第三方预约通道总览'),
    cardItem('channel-input', '第三方账号录入'),
    cardItem('channel-accounts', '第三方账号绑定矩阵'),
    cardItem('channel-routing', '岗位与公司主体路由'),
    cardItem('channel-security', '接口安全与发送边界'),
  ],
  interviews: [
    cardItem('interview-flow-config', '面试流程配置'),
    cardItem('interview-rounds', '灵活面试流程总览'),
    cardItem('interviewer-scheduling', '面试官排班与抽签'),
    cardItem('ai-question-bank', 'AI问卷与作业生成'),
    cardItem('investigation-consent', '授权调查任务'),
    cardItem('interview-archive', '面试档案'),
    cardItem('interview-total-score', '面试总评'),
  ],
  mail: [
    cardItem('invitation-priority', '预约通道优先级'),
    cardItem('dedicated-account', '公司专用账号绑定'),
    cardItem('reply-knowledge', '自动问答话术库'),
    cardItem('appointment-examples', '线上线下预约样例'),
    cardItem('email-instruction-modules', '邮件固定指引模块'),
    cardItem('invitation-queue', '邀约预约队列'),
  ],
  mobileWork: [
    cardItem('mobile-summary', '移动端提醒总览'),
    cardItem('mobile-role-terminal', '手机个人工作端'),
    cardItem('watch-reminder', '手表提醒矩阵'),
    cardItem('mini-program-meeting', '小程序在线会议'),
    cardItem('candidate-interview-guide', '候选人面试指引'),
    cardItem('candidate-consent', '候选人授权边界'),
    cardItem('mobile-reminder-list', '今日移动提醒队列'),
    cardItem('meeting-recording-archive', '会议录音回档案'),
    cardItem('mobile-sop', '移动端SOP'),
  ],
  platform: [cardItem('platform-route', '平台路线')],
  publishing: [
    cardItem('published-jobs', '发布岗位'),
    cardItem('total-visits', '总访问'),
    cardItem('total-resumes', '总简历'),
    cardItem('total-conversations', '总对话'),
    cardItem('accepted-interviews', '接受面试'),
    cardItem('new-posting', '新增岗位发布'),
    cardItem('pre-publishing-chain', '一期发布前置链路'),
    cardItem('company-scale-rules', '公司规模组织规则'),
    cardItem('daily-jd-iteration', '每日JD迭代闭环'),
    cardItem('generated-doc-preview', '岗位说明与发布话术'),
    cardItem('candidate-priority-preview', '候选人时效优先级'),
    cardItem('voice-pipeline', 'AI语音到JD文件链路'),
    cardItem('ai-repair', 'AI补全与修复'),
    cardItem('benchmark-sop', '部门长说不清时的追问SOP'),
    cardItem('benchmark-summary', '标杆公司画像提炼'),
    cardItem('posting-cards', '岗位卡片动态数字'),
    cardItem('metric-explain', '卡片不点开即显示的关键数字'),
  ],
  reports: [
    cardItem('daily-target', '日目标'),
    cardItem('daily-current', '今日完成'),
    cardItem('average-score', '平均综合分'),
    cardItem('review-count', '复试人数'),
    cardItem('risk-count', '风险候选人'),
    cardItem('report-control', '滚动与分页控制'),
    cardItem('post-scroll-panels', '岗位滚动窗口'),
    cardItem('high-score-popup', '高分简历弹窗'),
    cardItem('resume-ticker', '简历与问候语滚动'),
    cardItem('one-line-ticker', '极简一行动态'),
    cardItem('color-rules', '颜色规则'),
  ],
  review: [
    cardItem('homework-summary', '三轮作业总览'),
    cardItem('homework-matrix', '初试复试终试作业'),
    cardItem('homework-followup', '邮件电话追踪'),
    cardItem('homework-answer-score', '答卷与评分系统'),
    cardItem('homework-archive', '存档与案例系统'),
    cardItem('review-feedback', '考官评价'),
  ],
  riskCompliance: [
    cardItem('oral-rewrite-principles', '口述整理原则'),
    cardItem('risk-input', '口述需求风险扫描'),
    cardItem('risk-rule-list', '高风险表达纠偏表'),
    cardItem('risk-safe-copy', '可改正表达模板'),
    cardItem('product-boundaries', '已写入产品边界'),
    cardItem('backend-security', '正式后端必做'),
  ],
  theme: [
    cardItem('theme-scope', '皮肤会影响的区域'),
    cardItem('font-settings', '字体与字号'),
    cardItem('background-presets', '背景色块'),
    cardItem('module-visibility', '界面模块显示'),
  ],
}

const bossRecruitingDemoNow = '2026-06-24T08:40:00+08:00'

const bossRecruitingDemoCandidates: BossRecruitingCandidateInput[] = [
  {
    chats: [
      {
        author: 'candidate',
        channel: 'bossPlatformChat',
        content: '您好，我看到了岗位，方便的话可以先线上沟通。',
        occurredAt: '2026-06-24T08:12:00+08:00',
      },
    ],
    contactExchange: {
      phone: { consentRecorded: true, exchangedAt: '2026-06-24T08:20:00+08:00', value: '13800138001' },
      wechat: { consentRecorded: true, exchangedAt: '2026-06-24T08:24:00+08:00', value: 'wx-sales-9001' },
    },
    greeting: {
      owner: '陈HR',
      queuedAt: '2026-06-24T08:00:00+08:00',
      scriptMode: 'presetPlusAiFlexible',
    },
    id: 'boss-sales-director-001',
    interview: {
      confirmationDeadlineAt: '2026-06-24T10:00:00+08:00',
      onlineMeetingProvider: 'tencentMeeting',
      proposedSlots: ['2026-06-24T15:00:00+08:00', '2026-06-24T19:30:00+08:00'],
      reviewer: '业务负责人',
    },
    name: '高分销售候选人',
    resumeCollection: {
      methods: ['platformAttachment', 'candidateSharedLink'],
      status: 'received',
    },
    salaryBudgetK: { max: 35, min: 25 },
    salaryExpectationK: { max: 33, min: 28 },
    scoreSignals: {
      communication: 91,
      evidence: 92,
      experience: 95,
      intent: 90,
      resumeMatch: 96,
      scarcity: 86,
    },
    source: 'bossApplicant',
    targetRole: '销售总监',
  },
  {
    chats: [
      {
        author: 'hr',
        channel: 'bossPlatformChat',
        content: '您好，看到您在行业大客户方面有连续结果，想先了解是否看新机会。',
        occurredAt: '2026-06-24T08:06:00+08:00',
      },
    ],
    contactExchange: {
      phone: { consentRecorded: false, value: '13900139002' },
    },
    greeting: {
      owner: '李HR',
      queuedAt: '2026-06-24T08:04:00+08:00',
      scriptMode: 'aiSmart',
      status: 'waitingCandidate',
    },
    id: 'boss-headhunter-002',
    name: '高薪稀缺专家',
    resumeCollection: {
      methods: ['platformAttachment'],
      status: 'received',
    },
    salaryBudgetK: { max: 38, min: 28 },
    salaryExpectationK: { max: 62, min: 52 },
    scoreSignals: {
      communication: 88,
      evidence: 96,
      experience: 97,
      intent: 83,
      resumeMatch: 94,
      scarcity: 95,
    },
    source: 'bossSearch',
    targetRole: '事业部负责人',
  },
  {
    emailResumes: [
      {
        attachmentName: 'product-lead-resume.pdf',
        from: 'candidate@example.com',
        mailbox: 'jobs@example.cn',
        receivedAt: '2026-06-24T08:18:00+08:00',
        subject: '应聘产品负责人-简历',
      },
    ],
    greeting: {
      owner: '招聘邮箱托管',
      queuedAt: '2026-06-24T08:10:00+08:00',
      scriptMode: 'presetKnowledgeBase',
    },
    id: 'boss-email-product-003',
    interview: {
      confirmedByHumanAt: '2026-06-24T08:32:00+08:00',
      confirmationDeadlineAt: '2026-06-24T09:00:00+08:00',
      onlineMeetingProvider: 'feishuMeeting',
      proposedSlots: ['2026-06-24T14:30:00+08:00'],
      reviewer: '产品负责人',
    },
    name: '邮箱简历候选人',
    resumeCollection: {
      methods: ['emailHostedInbox'],
    },
    salaryBudgetK: { max: 32, min: 24 },
    salaryExpectationK: { max: 30, min: 25 },
    scoreSignals: {
      communication: 80,
      evidence: 84,
      experience: 86,
      intent: 78,
      resumeMatch: 85,
      scarcity: 72,
    },
    source: 'emailHostedInbox',
    targetRole: '产品负责人',
  },
  {
    greeting: {
      owner: '王HR',
      queuedAt: '2026-06-24T08:14:00+08:00',
      scriptMode: 'presetPlusAiFlexible',
    },
    id: 'boss-ops-chat-004',
    name: '运营可聊候选人',
    resumeCollection: {
      methods: ['platformAttachment'],
      requestedAt: '2026-06-24T08:18:00+08:00',
      status: 'requested',
    },
    salaryBudgetK: { max: 18, min: 12 },
    salaryExpectationK: { max: 18, min: 15 },
    scoreSignals: {
      communication: 72,
      evidence: 66,
      experience: 70,
      intent: 75,
      resumeMatch: 71,
      scarcity: 62,
    },
    source: 'bossSearch',
    targetRole: '自媒体运营',
  },
]

const bossImportCandidateTemplates: BossRecruitingCandidateInput[] = [
  {
    chats: [
      {
        author: 'candidate',
        channel: 'bossPlatformChat',
        content: '我之前做过招聘系统和数据看板，可以先发简历。',
        occurredAt: '2026-06-24T08:35:00+08:00',
      },
    ],
    contactExchange: {
      phone: { consentRecorded: true, exchangedAt: '2026-06-24T08:36:00+08:00', value: '13700137005' },
    },
    greeting: {
      owner: '技术招聘号',
      queuedAt: '2026-06-24T08:30:00+08:00',
      scriptMode: 'presetPlusAiFlexible',
    },
    id: 'boss-import-tech-005',
    interview: {
      confirmationDeadlineAt: '2026-06-24T11:00:00+08:00',
      onlineMeetingProvider: 'internalVoiceRoom',
      proposedSlots: ['2026-06-24T17:00:00+08:00'],
      reviewer: '技术负责人',
    },
    name: '导入技术候选人',
    resumeCollection: {
      methods: ['chatAttachment'],
      status: 'received',
    },
    salaryBudgetK: { max: 45, min: 30 },
    salaryExpectationK: { max: 42, min: 35 },
    scoreSignals: {
      communication: 84,
      evidence: 88,
      experience: 90,
      intent: 82,
      resumeMatch: 89,
      scarcity: 80,
    },
    source: 'manualImport',
    targetRole: 'AI系统开发',
  },
  {
    emailResumes: [
      {
        attachmentName: 'finance-manager-resume.pdf',
        from: 'finance-candidate@example.com',
        mailbox: 'jobs@example.cn',
        receivedAt: '2026-06-24T08:38:00+08:00',
        subject: '应聘财务经理-简历',
      },
    ],
    greeting: {
      owner: '财务招聘号',
      queuedAt: '2026-06-24T08:34:00+08:00',
      scriptMode: 'presetKnowledgeBase',
    },
    id: 'boss-import-finance-006',
    name: '导入财务候选人',
    resumeCollection: {
      methods: ['emailHostedInbox'],
    },
    salaryBudgetK: { max: 24, min: 16 },
    salaryExpectationK: { max: 26, min: 22 },
    scoreSignals: {
      communication: 78,
      evidence: 80,
      experience: 83,
      intent: 76,
      resumeMatch: 81,
      scarcity: 66,
    },
    source: 'emailHostedInbox',
    targetRole: '财务经理',
  },
]

const bossManualStatusLabels: Record<BossInvitationManualStatus, string> = {
  confirmed: '已人工确认',
  pendingHumanConfirmation: '待人工确认',
  timedOutAiDraftNeedsReview: '超时需复核',
}

const bossSalaryAlignmentLabels: Record<BossSalaryAlignment, string> = {
  aboveBudget: '高于预算',
  aligned: '预算匹配',
  belowBudget: '低于预算',
  unknown: '待确认',
}

const bossResumeStatusLabels: Record<BossResumeCollectionStatus, string> = {
  notRequested: '未请求',
  received: '已收简历',
  requested: '已请求',
}

const bossPipelineFilterLabels: Record<BossPipelineFilter, string> = {
  all: '全部',
  archived: '已入库',
  highScore: '高分',
  needsHuman: '待人工',
  resumeReceived: '已收简历',
  salaryMismatch: '薪酬不匹配',
}

const bossManualImportSourceOptions: BossCandidateSource[] = ['bossApplicant', 'bossSearch', 'emailHostedInbox', 'manualImport']

const defaultBossManualImportDraft: BossManualImportDraft = {
  evidenceScore: 78,
  expectedSalaryMax: 28,
  expectedSalaryMin: 20,
  hasResume: true,
  matchScore: 82,
  name: '手动导入候选人',
  source: 'manualImport',
  targetRole: '业务经理',
}

function bossStageStatusClass(status: BossPipelineStageStatus) {
  if (status === 'done') return 'done'
  if (status === 'needsReview') return 'review'
  return 'pending'
}

function bossPriorityClass(priority: BossPipelineActionPriority) {
  if (priority === 'urgent') return 'urgent'
  if (priority === 'high') return 'high'
  if (priority === 'medium') return 'medium'
  return 'low'
}

function buildBossManualImportCandidate(draft: BossManualImportDraft, index: number): BossRecruitingCandidateInput {
  const normalizedName = draft.name.trim() || defaultBossManualImportDraft.name
  const normalizedRole = draft.targetRole.trim() || defaultBossManualImportDraft.targetRole
  const scoreBase = Math.max(0, Math.min(100, Math.round((draft.evidenceScore + draft.matchScore) / 2)))

  return {
    chats: [
      {
        author: 'system',
        channel: 'bossPlatformChat',
        content: '本机手动导入，等待人工复核来源、简历和邀约条件。',
        occurredAt: bossRecruitingDemoNow,
      },
    ],
    greeting: {
      owner: '本机导入',
      queuedAt: bossRecruitingDemoNow,
      scriptMode: 'presetPlusAiFlexible',
    },
    id: `boss-manual-${Date.now()}-${index}`,
    interview: {
      confirmationDeadlineAt: '2026-06-24T18:00:00+08:00',
      onlineMeetingProvider: 'tencentMeeting',
      proposedSlots: ['2026-06-25T10:00:00+08:00'],
      reviewer: '人工HR',
    },
    name: normalizedName,
    resumeCollection: {
      methods: draft.hasResume ? ['manualUpload'] : ['platformAttachment'],
      status: draft.hasResume ? 'received' : 'requested',
    },
    salaryBudgetK: { max: 35, min: 18 },
    salaryExpectationK: {
      max: Math.max(draft.expectedSalaryMax, draft.expectedSalaryMin),
      min: Math.min(draft.expectedSalaryMax, draft.expectedSalaryMin),
    },
    scoreSignals: {
      communication: scoreBase,
      evidence: draft.evidenceScore,
      experience: scoreBase,
      intent: 75,
      resumeMatch: draft.matchScore,
      scarcity: Math.max(60, Math.min(95, scoreBase - 5)),
    },
    source: draft.source,
    targetRole: normalizedRole,
  }
}

function applyBossWorkflowState(
  candidates: BossRecruitingCandidateInput[],
  workflowState: BossRecruitingWorkflowState,
): BossRecruitingCandidateInput[] {
  return candidates.map((candidate) => {
    const state = workflowState[candidate.id]
    if (!state) return candidate

    const nextCandidate: BossRecruitingCandidateInput = {
      ...candidate,
      chats: candidate.chats ? [...candidate.chats] : undefined,
      greeting: candidate.greeting ? { ...candidate.greeting } : undefined,
      interview: candidate.interview ? { ...candidate.interview } : undefined,
      resumeCollection: candidate.resumeCollection ? { ...candidate.resumeCollection } : undefined,
    }

    if (state.resumeReceived) {
      nextCandidate.resumeCollection = {
        ...nextCandidate.resumeCollection,
        methods: nextCandidate.resumeCollection?.methods?.length ? nextCandidate.resumeCollection.methods : ['manualUpload'],
        status: 'received',
      }
    }

    if (state.contacted) {
      nextCandidate.chats = [
        ...(nextCandidate.chats ?? []),
        {
          author: 'hr',
          channel: 'bossPlatformChat',
          content: '已由人工确认继续跟进，等待候选人补充关键经历或确认面试时间。',
          occurredAt: state.updatedAt ?? bossRecruitingDemoNow,
        },
      ]
      nextCandidate.greeting = {
        ...nextCandidate.greeting,
        status: 'candidateReplied',
      }
    }

    if (state.humanConfirmed) {
      nextCandidate.interview = {
        ...nextCandidate.interview,
        confirmedByHumanAt: state.updatedAt ?? bossRecruitingDemoNow,
        confirmationDeadlineAt: nextCandidate.interview?.confirmationDeadlineAt ?? state.updatedAt ?? bossRecruitingDemoNow,
        proposedSlots: nextCandidate.interview?.proposedSlots?.length
          ? nextCandidate.interview.proposedSlots
          : ['2026-06-24T16:00:00+08:00'],
      }
    }

    return nextCandidate
  })
}

function filterBossPipelineCandidates(
  candidates: ReturnType<typeof buildBossRecruitingPipeline>['candidates'],
  workflowState: BossRecruitingWorkflowState,
  filter: BossPipelineFilter,
) {
  return candidates.filter((candidate) => {
    if (filter === 'all') return true
    if (filter === 'archived') return Boolean(workflowState[candidate.candidateId]?.archived)
    if (filter === 'highScore') return candidate.resumeScore.total >= 85
    if (filter === 'needsHuman') {
      return (
        candidate.invitationDraft?.manualStatus === 'pendingHumanConfirmation' ||
        candidate.invitationDraft?.manualStatus === 'timedOutAiDraftNeedsReview'
      )
    }
    if (filter === 'resumeReceived') return candidate.resumeCollection.status === 'received'
    return candidate.salaryAlignment === 'aboveBudget'
  })
}

function bossArchiveReason(candidate: ReturnType<typeof buildBossRecruitingPipeline>['candidates'][number]) {
  return `${candidate.archiveCategory}：${candidate.grade}，评分${candidate.resumeScore.total}，薪酬${bossSalaryAlignmentLabels[candidate.salaryAlignment]}。`
}

function bossRoleDraftChecklist(targetRole: string) {
  if (targetRole.includes('销售') || targetRole.includes('业务') || targetRole.includes('事业部')) {
    return ['近12个月业绩结果', '客户类型和客单价', '提成或奖金佐证', '可核验的团队/渠道贡献']
  }
  if (targetRole.includes('技术') || targetRole.includes('AI') || targetRole.includes('开发')) {
    return ['代表项目链接或截图', '本人负责模块', '性能/成本/稳定性结果', '代码或架构说明']
  }
  if (targetRole.includes('财务')) {
    return ['财务证书或学历材料', '账务/税务/预算经验', '历史公司规模', '可核验的风控或降本结果']
  }
  if (targetRole.includes('产品')) {
    return ['产品案例', '需求到上线链路', '关键指标变化', '跨部门协同证据']
  }
  return ['简历原件', '关键项目佐证', '薪酬期望', '最快到岗时间']
}

function bossRoleAwareDraft(candidate: ReturnType<typeof buildBossRecruitingPipeline>['candidates'][number]) {
  if (!candidate.invitationDraft) return ''
  const checklist = bossRoleDraftChecklist(candidate.targetRole)

  return `${candidate.invitationDraft.body}

为提高沟通效率，请提前准备：${checklist.join('、')}。
当前系统判断：${candidate.grade}，${bossArchiveReason(candidate)}

说明：此文案为系统草稿，不会自动发送，需要人工确认后再通过授权渠道处理。`
}

function downloadJsonFile(fileName: string, payload: unknown) {
  if (typeof window === 'undefined') return

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function createDefaultLayoutProfileRegistry(): LayoutProfileRegistry {
  return Object.fromEntries(
    layoutProfileOptions.map((profile) => [
      profile.id,
      createUserLayoutPreference(
        profile.id,
        profile.name,
        sidebarItemsForProfile(profile.id),
        defaultWorkspaceItems,
      ),
    ]),
  ) as LayoutProfileRegistry
}

type WorkspaceLayoutContextValue = {
  getDraggedCardId: () => string | null
  layout: WorkspaceLayoutState
  moveCard: (draggedId: string, targetId: string) => void
  reshapeCard: (itemId: string, ratio: LayoutItemRatio) => void
  resizeCard: (itemId: string, size: LayoutItemSize) => void
  scaleCard: (itemId: string, scale: LayoutItemScale) => void
  setDraggedCardId: (id: string | null) => void
  snapCardToGrid: (itemId: string, gridFraction: LayoutGridFraction) => void
}

const WorkspaceLayoutContext = createContext<WorkspaceLayoutContextValue | null>(null)

function useWorkspaceCard(title: string) {
  const context = useContext(WorkspaceLayoutContext)
  if (!context) return null

  const item = context.layout.items.find((layoutItem) => layoutItem.title === title)
  if (!item) return null

  return {
    draggable: !context.layout.locked,
    id: item.id,
    locked: context.layout.locked,
    onDragEnd: () => {
      context.setDraggedCardId(null)
    },
    onDragOver: (event: React.DragEvent<HTMLElement>) => {
      if (!context.layout.locked) event.preventDefault()
    },
    onDragStart: (event: React.DragEvent<HTMLElement>) => {
      if (context.layout.locked) return
      if ((event.target as HTMLElement | null)?.closest('.grid-resize-handle')) {
        event.preventDefault()
        return
      }
      context.setDraggedCardId(item.id)
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', item.id)
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault()
      const draggedId = context.getDraggedCardId() || event.dataTransfer.getData('text/plain')
      if (!draggedId || draggedId === item.id) return
      context.moveCard(draggedId, item.id)
      context.setDraggedCardId(null)
    },
    order: context.layout.items.findIndex((layoutItem) => layoutItem.id === item.id) + 1,
    fractionClass: layoutItemGridFractionClass(item.gridFraction),
    gridFraction: item.gridFraction,
    ratio: item.ratio ?? 'auto',
    ratioClass: layoutItemRatioClass(item.ratio),
    reshape: (ratio: LayoutItemRatio) => context.reshapeCard(item.id, ratio),
    resize: (size: LayoutItemSize) => context.resizeCard(item.id, size),
    scale: item.scale ?? 'md',
    scaleCard: (scale: LayoutItemScale) => context.scaleCard(item.id, scale),
    scaleClass: layoutItemScaleClass(item.scale),
    size: item.size ?? 'normal',
    sizeClass: layoutItemSizeClass(item.size),
    startGridResize: (event: React.PointerEvent<HTMLElement>) => {
      if (context.layout.locked) return
      event.preventDefault()
      event.stopPropagation()

      const cardElement = event.currentTarget.closest('.layout-card')
      const sectionElement = cardElement?.closest('section')
      if (!(cardElement instanceof HTMLElement) || !(sectionElement instanceof HTMLElement)) return

      const cardRect = cardElement.getBoundingClientRect()
      const sectionRect = sectionElement.getBoundingClientRect()
      const snapFromClientX = (clientX: number) => {
        const widthRatio = (clientX - cardRect.left) / Math.max(sectionRect.width, 1)
        context.snapCardToGrid(item.id, snapLayoutGridFraction(widthRatio))
      }
      const handlePointerMove = (moveEvent: PointerEvent) => snapFromClientX(moveEvent.clientX)
      const handlePointerUp = () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
      }

      snapFromClientX(event.clientX)
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp, { once: true })
    },
  }
}

function WorkspaceLayoutBar({
  layout,
  onReset,
  onSetMode,
  onToggleLocked,
}: {
  layout: WorkspaceLayoutState
  onReset: () => void
  onSetMode: (mode: WorkspaceLayoutMode) => void
  onToggleLocked: () => void
}) {
  const modeOptions: Array<{ label: string; mode: WorkspaceLayoutMode; title: string }> = [
    { label: '自适应', mode: 'adaptive', title: '模块按合理积木尺寸自动排列' },
    { label: '横条', mode: 'horizontal', title: '全部模块变成长条，适合快速浏览' },
    { label: '竖条', mode: 'vertical', title: '全部模块变成竖条，适合多列对比' },
    { label: '交错', mode: 'mixed', title: '横条与竖条交错，适合重点模块突出' },
  ]
  const currentMode = layout.mode ?? 'adaptive'

  return (
    <div className={`layout-bar ${layout.locked ? 'locked' : 'unlocked'}`}>
      <div>
        <strong>{layout.locked ? '页面布局已锁定' : '页面布局已解锁'}</strong>
        <span>
          {layout.locked
            ? '锁定后卡片固定，适合日常查看。'
            : '可拖拽卡片手柄，调整顺序、尺寸、比例和页面模板。'}
        </span>
      </div>
      <div className="layout-actions">
        <span className="layout-mode-switch" aria-label="页面模块形态">
          {modeOptions.map((option) => (
            <button
              className={currentMode === option.mode ? 'active' : ''}
              disabled={layout.locked}
              key={option.mode}
              onClick={() => onSetMode(option.mode)}
              title={layout.locked ? '先解锁布局后切换模块形态' : option.title}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </span>
        <button className={layout.locked ? 'button' : 'button primary'} onClick={onToggleLocked} type="button">
          {layout.locked ? <Unlock size={15} /> : <Lock size={15} />}
          {layout.locked ? '解锁布局' : '锁定布局'}
        </button>
        <button className="button" onClick={onReset} type="button">
          <RotateCcw size={15} />
          恢复默认
        </button>
      </div>
    </div>
  )
}

function GlobalSearchPanel({
  activeSectionLabel,
  onOpenResult,
  onQueryChange,
  query,
  results,
  suggestions,
}: {
  activeSectionLabel: string
  onOpenResult: (hit: GlobalSearchHit) => void
  onQueryChange: (value: string) => void
  query: string
  results: GlobalSearchHit[]
  suggestions: string[]
}) {
  const trimmedQuery = query.trim()

  return (
    <div className="global-search-panel">
      <div className="global-search-head">
        <div>
          <strong>动态搜索入口</strong>
          <p>候选人、岗位、简历库、账号、录音、问卷、作业、报表都能直接搜。</p>
        </div>
        <span className="badge">{trimmedQuery ? `${results.length} 条结果` : '关键词兜底'}</span>
      </div>

      <div className="global-search-row">
        <label className="global-search-input" aria-label="全局搜索">
          <Search size={16} />
          <input
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="搜姓名、岗位、公司、关键词、账号、录音、人才库..."
            value={query}
          />
          {trimmedQuery && (
            <button aria-label="清空搜索" className="icon-button" onClick={() => onQueryChange('')} type="button">
              <X size={14} />
            </button>
          )}
        </label>
        <div className="search-scope-badge">当前界面：{activeSectionLabel}</div>
      </div>

      <div className="search-suggestion-row">
        <span className="muted">推荐关键词</span>
        <div className="search-chip-list">
          {suggestions.map((suggestion) => (
            <button className="search-chip" key={suggestion} onClick={() => onQueryChange(suggestion)} type="button">
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {trimmedQuery ? (
        results.length ? (
          <div className="search-result-grid">
            {results.map((hit) => (
              <button
                className="search-result-card"
                key={hit.id}
                onClick={() => onOpenResult(hit)}
                type="button"
              >
                <div className="search-result-head">
                  <strong>{hit.title}</strong>
                  <span className="badge">{hit.section}</span>
                </div>
                <p>{hit.detail}</p>
                <div className="mini-chip-grid">
                  {(hit.matchedTerms.length ? hit.matchedTerms : [hit.kind]).slice(0, 4).map((term) => (
                    <span className="mini-chip on" key={`${hit.id}-${term}`}>
                      {term}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-state search-empty">
            <strong>没有直接命中</strong>
            <p>可以继续换个关键词，或者点上面的推荐词。</p>
          </div>
        )
      ) : (
        <div className="search-tip">
          <strong>输入任意关键词即可跨模块检索。</strong>
          <p>比如候选人姓名、岗位简称、公司名、人才库标签、会议平台、作业名称。</p>
        </div>
      )}
    </div>
  )
}

function App() {
  const appStorage = browserLocalStorage()
  const [section, setSection] = useState<Section>('dashboard')
  const [candidates, setCandidates] = useState<Candidate[]>(() =>
    readPersistedValue(appStorage, localPersistenceKeys.candidates, initialCandidates),
  )
  const [selectedId, setSelectedId] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [theme, setTheme] = useState<ThemeId>(() =>
    readPersistedValue(appStorage, localPersistenceKeys.theme, 'sky'),
  )
  const [layoutProfileId, setLayoutProfileId] = useState<LayoutProfileId>(() =>
    readPersistedValue(appStorage, localPersistenceKeys.layoutProfileId, 'hr'),
  )
  const [accessCodeInput, setAccessCodeInput] = useState('')
  const [accessError, setAccessError] = useState('')
  const [pendingProtectedSection, setPendingProtectedSection] = useState<Section | null>(null)
  const [unlockedSections, setUnlockedSections] = useState<Section[]>([])
  const [layoutProfiles, setLayoutProfiles] = useState<LayoutProfileRegistry>(() =>
    readPersistedValue(appStorage, localPersistenceKeys.layoutProfiles, createDefaultLayoutProfileRegistry()),
  )
  const [interfaceSettings, setInterfaceSettings] = useState<InterfaceSettings>(() => ({
    ...defaultInterfaceSettings,
    ...readPersistedValue(appStorage, localPersistenceKeys.interfaceSettings, defaultInterfaceSettings),
  }))
  const selected = candidates.find((candidate) => candidate.id === selectedId) ?? candidates[0]
  const currentLayoutProfile = layoutProfiles[layoutProfileId]
  const visibleNavItems = currentLayoutProfile.sidebar.items
    .map((item) => navItemLookup.get(item.id as Section))
    .filter((item): item is NavItem => {
      if (!item) return false
      return interfaceSettings.visibleSections.includes(item.id)
    })
  const currentLayout = currentLayoutProfile.workspaces[section] ?? resetWorkspaceLayout(defaultWorkspaceItems[section], true)
  const draggedCardId = useRef<string | null>(null)
  const draggedNavId = useRef<string | null>(null)

  useEffect(() => {
    writePersistedValue(appStorage, localPersistenceKeys.candidates, candidates)
  }, [appStorage, candidates])

  useEffect(() => {
    writePersistedValue(appStorage, localPersistenceKeys.theme, theme)
  }, [appStorage, theme])

  useEffect(() => {
    writePersistedValue(appStorage, localPersistenceKeys.layoutProfileId, layoutProfileId)
  }, [appStorage, layoutProfileId])

  useEffect(() => {
    writePersistedValue(appStorage, localPersistenceKeys.layoutProfiles, layoutProfiles)
  }, [appStorage, layoutProfiles])

  useEffect(() => {
    writePersistedValue(appStorage, localPersistenceKeys.interfaceSettings, interfaceSettings)
  }, [appStorage, interfaceSettings])

  const globalSearchEntries = useMemo<GlobalSearchEntry[]>(
    () => [
      ...candidates.flatMap((candidate) => [
        {
          candidateId: candidate.id,
          detail: [
            candidate.postName,
            candidate.majorName,
            candidate.workType,
            candidate.currentLocation,
            candidate.status,
            candidate.audioStatus,
            candidate.homeworkStatus,
            candidate.agentSummary,
            ...candidate.skillTags,
            ...candidate.customFlags,
          ].join(' '),
          id: `candidate-${candidate.id}`,
          kind: 'candidate',
          keywords: [
            candidate.postName,
            candidate.majorName,
            candidate.workType,
            candidate.currentLocation,
            candidate.status,
            candidate.availabilityStatus,
            candidate.educationLevel,
            candidate.firstDegreeLevel,
            candidate.audioStatus,
            candidate.homeworkStatus,
            ...candidate.skillTags,
            ...candidate.customFlags,
          ],
          section: '候选看板',
          sectionId: 'candidates',
          title: candidate.name,
        } satisfies GlobalSearchEntry,
        {
          candidateId: candidate.id,
          detail: candidate.transcript,
          id: `candidate-transcript-${candidate.id}`,
          kind: 'candidate-transcript',
          keywords: [candidate.name, candidate.postName, candidate.agentSummary],
          section: '面试档案',
          sectionId: 'interviews',
          title: `${candidate.name} 面试档案`,
        } satisfies GlobalSearchEntry,
      ]),
      ...talentLibraryGroups.map((group) => ({
        detail: group.description,
        id: `talent-${group.id}`,
        kind: 'talent-library',
        keywords: [group.label, group.description],
        section: '简历库',
        sectionId: 'talentLibrary',
        title: group.label,
      })),
      ...jobPostingTypeOptions.map((option) => ({
        detail: option.description,
        id: `posting-type-${option.type}`,
        kind: 'job-type',
        keywords: [option.label, option.category, option.description, option.type],
        section: '岗位发布',
        sectionId: 'publishing',
        title: option.label,
      })),
      ...recruitingAccountMatrix.map((item) => ({
        detail: `${item.owner} / ${item.method} / ${bindingModeLabel(item.bindingMode)}`,
        id: `account-${item.name}`,
        kind: 'account-matrix',
        keywords: [item.name, item.owner, item.method, ...item.jobs, item.status, item.bindingMode],
        section: '招聘账号',
        sectionId: 'accounts',
        title: item.name,
      })),
      ...languageInterfaces.map((item) => ({
        detail: item.scope,
        id: `language-${item.id}`,
        kind: 'language',
        keywords: [item.name, item.scope, ...item.examples],
        section: '招聘账号',
        sectionId: 'accounts',
        title: item.name,
      })),
      ...recruitingPlatformAdapters.map((adapter) => ({
        detail: `${adapter.region} / ${adapter.notes} / ${platformLoginMethodSummary(adapter)}`,
        id: `platform-${adapter.id}`,
        kind: 'platform',
        keywords: [adapter.name, adapter.region, adapter.stage, ...adapter.loginMethods, adapter.notes],
        section: '招聘账号',
        sectionId: 'accounts',
        title: adapter.name,
      })),
      ...meetingPlatformAdapters.map((adapter) => ({
        detail: `${adapter.note} / ${adapter.backendSlug}`,
        id: `meeting-${adapter.id}`,
        kind: 'meeting-platform',
        keywords: [adapter.label, adapter.backendSlug, adapter.note, ...adapter.accessMethods, ...adapter.recordingModes],
        section: '录音解析',
        sectionId: 'audio',
        title: adapter.label,
      })),
      ...defaultJobQuestionnaireCards.map((card) => ({
        detail: `${card.description} / ${card.tags.join(' ')}`,
        id: `questionnaire-${card.id}`,
        kind: 'questionnaire',
        keywords: [card.title, card.description, ...card.tags, ...card.questions.map((question) => question.prompt)],
        section: '岗位问卷',
        sectionId: 'business',
        title: card.title,
      })),
      ...marketResearchPostings.map((posting) => ({
        detail: `${posting.company} / ${posting.source} / ${posting.requirements.join(' ')}`,
        id: `research-${posting.id}`,
        kind: 'market-research',
        keywords: [posting.company, posting.title, posting.source, ...posting.keywords, ...posting.requirements],
        section: jobMarketModuleName,
        sectionId: 'jobseeker',
        title: posting.title,
      })),
      ...defaultThreeStageHomeworkTasks.map((task) => ({
        detail: `${task.jobName} / ${task.round} / ${task.answerStatus} / ${task.archiveStatus}`,
        id: `homework-${task.id}`,
        kind: 'homework',
        keywords: [task.title, task.candidateName, task.jobName, task.questionOwner, task.examiner, task.answerStatus, task.archiveStatus],
        section: '三轮作业',
        sectionId: 'review',
        title: task.title,
      })),
      ...demoPlatformAccounts.map((account) => ({
        detail: `${account.platform} / ${account.companyName} / ${account.ownerName} / ${account.loginMethod}`,
        id: `demo-account-${account.id}`,
        kind: 'demo-platform-account',
        keywords: [account.platform, account.accountName, account.companyName, account.ownerName, account.loginMethod],
        section: 'Demo演示系统',
        sectionId: 'dashboard',
        title: account.accountName,
      })),
      ...demoInterviewRecords.map((record) => ({
        detail: `${record.platformName} / ${record.platformAccountName} / ${record.companyName} / ${record.phone} / ${record.wechatId} / ${record.wecomId}`,
        id: `demo-record-${record.id}`,
        kind: 'demo-interview',
        keywords: [
          record.candidateName,
          record.jobName,
          record.companyName,
          record.platformName,
          record.platformAccountName,
          record.phone,
          record.email,
          record.wechatId,
          record.wecomId,
          record.interviewStage,
          record.status,
        ],
        section: 'Demo演示系统',
        sectionId: 'dashboard',
        title: `${record.candidateName} / ${record.jobName}`,
      })),
      ...aiInterviewModes.map((mode) => ({
        detail: `${mode.channel} / ${mode.goal} / ${mode.requiredConsent.join(' ')}`,
        id: `ai-interview-${mode.id}`,
        kind: 'ai-interview',
        keywords: [mode.title, mode.channel, mode.goal, ...mode.requiredConsent, 'AI邀约', 'AI面试', '语音面试', '文字面试'],
        section: 'AI邀约面试',
        sectionId: 'aiInterview',
        title: mode.title,
      })),
      ...mobileTerminalDevices.map((device) => ({
        detail: `${device.status} / ${device.roleScope.map((role) => mobileRoleLabels[role]).join('、')} / ${device.reminderMethods.join('、')}`,
        id: `mobile-device-${device.id}`,
        kind: 'mobile-work',
        keywords: [device.name, device.status, ...device.reminderMethods, ...device.roleScope.map((role) => mobileRoleLabels[role]), '手机端', '手表提醒', '小程序'],
        section: '移动工作端',
        sectionId: 'mobileWork',
        title: device.name,
      })),
      ...defaultMobileReminderTasks.map((task) => ({
        detail: `${mobileRoleLabels[task.role]} / ${mobileReminderTypeLabels[task.type]} / ${task.channelHint} / ${task.nextAction}`,
        id: `mobile-reminder-${task.id}`,
        kind: 'mobile-reminder',
        keywords: [task.title, task.ownerName, task.candidateName ?? '', task.channelHint, task.nextAction, mobileReminderTypeLabels[task.type], '双向确认', '报警', '作业催交'],
        section: '移动工作端',
        sectionId: 'mobileWork',
        title: task.title,
      })),
      ...buildAutoDispatchSearchEntries(),
      ...platformPlan.map((item) => ({
        detail: `${item.priority} / ${item.status}`,
        id: `platform-plan-${item.platform}`,
        kind: 'platform-plan',
        keywords: [item.platform, item.priority, item.status],
        section: '多端发布',
        sectionId: 'platform',
        title: item.platform,
      })),
    ],
    [candidates],
  )

  const globalSearchResults = useMemo(
    () => searchGlobalEntries(searchQuery, globalSearchEntries, 10),
    [globalSearchEntries, searchQuery],
  )
  const globalSearchSuggestions = useMemo(
    () => buildSearchResultKeywords(globalSearchEntries, searchQuery, 6),
    [globalSearchEntries, searchQuery],
  )

  const metrics = useMemo(() => {
    const total = candidates.length
    const recommended = candidates.filter((item) => item.status === '推荐复试').length
    const audioParsed = candidates.filter((item) => item.audioStatus === '已解析').length
    const homeworkPending = candidates.filter((item) => item.homeworkStatus === '待提交').length
    const highLevel = candidates.filter((item) => ['S', 'A'].includes(item.totalLevel)).length
    return { total, recommended, audioParsed, homeworkPending, highLevel }
  }, [candidates])
  const sidebarDispatchBoard = useMemo(
    () => buildAutoDispatchBoard(defaultAutoDispatchCases, new Date('2026-06-20T12:00:00+08:00')),
    [],
  )
  const sidebarMobileSummary = useMemo(() => buildMobileWorkSummary(defaultMobileReminderTasks), [])
  const sidebarBadgeConfig = useMemo<Partial<Record<Section, { count: number; urgent?: boolean }>>>(() => {
    const riskCandidateCount = candidates.filter((item) => item.risks.length > 0).length
    const unreadInvitationWork =
      sidebarDispatchBoard.summary.emails +
      sidebarDispatchBoard.summary.messages +
      sidebarDispatchBoard.summary.wechatExchanged
    const pendingInterviewWork = sidebarDispatchBoard.summary.phoneFollowup + sidebarDispatchBoard.summary.alarm

    return {
      accounts: { count: 12 },
      agent: { count: 6 },
      aiInterview: { count: 11 },
      audio: { count: Math.max(1, candidates.filter((item) => item.audioStatus !== '已解析').length) },
      autoDispatch: { count: pendingInterviewWork, urgent: sidebarDispatchBoard.summary.alarm > 0 },
      base: { count: 3 },
      business: { count: metrics.highLevel },
      candidates: { count: metrics.total },
      contracts: { count: 4 },
      dashboard: { count: metrics.recommended + metrics.homeworkPending + sidebarDispatchBoard.summary.alarm },
      first: { count: metrics.recommended },
      invitationChannels: { count: sidebarDispatchBoard.summary.invitations },
      mail: { count: unreadInvitationWork },
      mobileWork: {
        count: sidebarMobileSummary.pendingDoubleConfirm + sidebarMobileSummary.critical,
        urgent: sidebarMobileSummary.critical > 0,
      },
      performanceGoals: { count: 5 },
      platform: { count: 9 },
      publishing: { count: 18 },
      reports: { count: 4 },
      review: { count: 30, urgent: true },
      riskCompliance: {
        count: riskCandidateCount + sidebarDispatchBoard.summary.alarm,
        urgent: sidebarDispatchBoard.summary.alarm > 0,
      },
      talentLibrary: { count: metrics.highLevel + riskCandidateCount },
      theme: { count: 2 },
    }
  }, [candidates, metrics, sidebarDispatchBoard, sidebarMobileSummary])

  function updateSelected(patch: Partial<Candidate>) {
    setCandidates((items) => items.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)))
  }

  function updateCandidate(candidateId: number, patch: Partial<Candidate>) {
    setCandidates((items) => items.map((item) => (item.id === candidateId ? { ...item, ...patch } : item)))
  }

  function moveCard(draggedId: string, targetId: string) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: updateUserWorkspaceLayout(
        profiles[layoutProfileId],
        section,
        reorderWorkspaceLayout(profiles[layoutProfileId].workspaces[section], draggedId, targetId),
      ),
    }))
  }

  function resizeCard(itemId: string, size: LayoutItemSize) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: updateUserWorkspaceLayout(
        profiles[layoutProfileId],
        section,
        resizeWorkspaceLayoutItem(profiles[layoutProfileId].workspaces[section] ?? currentLayout, itemId, size),
      ),
    }))
  }

  function setLayoutMode(mode: WorkspaceLayoutMode) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: updateUserWorkspaceLayout(
        profiles[layoutProfileId],
        section,
        setWorkspaceLayoutMode(profiles[layoutProfileId].workspaces[section] ?? currentLayout, mode),
      ),
    }))
  }

  function reshapeCard(itemId: string, ratio: LayoutItemRatio) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: updateUserWorkspaceLayout(
        profiles[layoutProfileId],
        section,
        setWorkspaceLayoutItemRatio(profiles[layoutProfileId].workspaces[section] ?? currentLayout, itemId, ratio),
      ),
    }))
  }

  function scaleCard(itemId: string, scale: LayoutItemScale) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: updateUserWorkspaceLayout(
        profiles[layoutProfileId],
        section,
        scaleWorkspaceLayoutItem(profiles[layoutProfileId].workspaces[section] ?? currentLayout, itemId, scale),
      ),
    }))
  }

  function snapCardToGrid(itemId: string, gridFraction: LayoutGridFraction) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: updateUserWorkspaceLayout(
        profiles[layoutProfileId],
        section,
        snapWorkspaceLayoutItemToGrid(
          profiles[layoutProfileId].workspaces[section] ?? currentLayout,
          itemId,
          gridFraction,
        ),
      ),
    }))
  }

  function setCurrentWorkspaceLayout(nextLayout: WorkspaceLayoutState) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: updateUserWorkspaceLayout(profiles[layoutProfileId], section, nextLayout),
    }))
  }

  function setSidebarLocked(locked: boolean) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: {
        ...profiles[layoutProfileId],
        sidebar: setWorkspaceLocked(profiles[layoutProfileId].sidebar, locked),
      },
    }))
  }

  function resetSidebarLayout() {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: {
        ...profiles[layoutProfileId],
        sidebar: resetWorkspaceLayout(sidebarItemsForProfile(layoutProfileId), true),
      },
    }))
  }

  function moveSidebarItem(draggedId: string, targetId: string) {
    setLayoutProfiles((profiles) => ({
      ...profiles,
      [layoutProfileId]: reorderUserSidebar(profiles[layoutProfileId], draggedId, targetId),
    }))
  }

  function getDraggedCardId() {
    return draggedCardId.current
  }

  function setDraggedCardId(id: string | null) {
    draggedCardId.current = id
  }

  function openSection(nextSection: Section) {
    const protectedPolicy = protectedPolicyForSection(nextSection)
    if (protectedPolicy && !unlockedSections.includes(nextSection)) {
      setAccessCodeInput('')
      setAccessError('')
      setPendingProtectedSection(nextSection)
      return
    }
    setSection(nextSection)
  }

  function confirmProtectedAccess() {
    if (!pendingProtectedSection) return
    const result = verifyProtectedSectionAccess(pendingProtectedSection, accessCodeInput)
    if (!result.allowed) {
      setAccessError('权限码不正确，请联系系统管理员或使用正式验证码。')
      return
    }

    setUnlockedSections((sections) =>
      sections.includes(pendingProtectedSection) ? sections : [...sections, pendingProtectedSection],
    )
    setSection(pendingProtectedSection)
    setPendingProtectedSection(null)
    setAccessCodeInput('')
    setAccessError('')
  }

  function openSearchResult(hit: GlobalSearchHit) {
    if (hit.sectionId) {
      openSection(hit.sectionId as Section)
    }
    if (hit.candidateId) {
      setSelectedId(hit.candidateId)
    }
  }

  return (
    <div
      className="shell"
      data-theme={theme}
      style={{
        '--custom-bg': interfaceSettings.backgroundColor,
        '--custom-font': fontCss(interfaceSettings.fontFamily, interfaceSettings.customFontFamily),
        '--custom-font-size': `${interfaceSettings.fontSize}px`,
        '--sidebar-accent-width': `${interfaceSettings.sidebarAccentWidth}px`,
        '--sidebar-font-size': `${interfaceSettings.sidebarFontSize}px`,
        '--sidebar-line-height': interfaceSettings.sidebarLineHeight,
        '--custom-text': interfaceSettings.textColor,
        '--custom-primary': interfaceSettings.primaryColor,
        '--custom-sidebar': interfaceSettings.sidebarColor,
        '--custom-card': interfaceSettings.cardColor,
        '--custom-line': interfaceSettings.lineColor,
      } as React.CSSProperties}
    >
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">{interfaceSettings.brandLogoText}</span>
          <div>
            <strong>{interfaceSettings.brandName}</strong>
            <small>{interfaceSettings.brandSubtitle}</small>
          </div>
        </div>
        <div className="sidebar-controls">
          <label>
            <span>当前界面</span>
            <select
              onChange={(event) => setLayoutProfileId(event.target.value as LayoutProfileId)}
              value={layoutProfileId}
            >
              {layoutProfileOptions.map((profile) => (
                <option key={profile.id} value={profile.id}>{profile.name}</option>
              ))}
            </select>
          </label>
          <div className={`sidebar-lock-panel ${currentLayoutProfile.sidebar.locked ? 'locked' : 'unlocked'}`}>
            <div>
              <strong>{currentLayoutProfile.sidebar.locked ? '左侧菜单已锁定' : '左侧菜单已解锁'}</strong>
              <small>{layoutProfileOptions.find((profile) => profile.id === layoutProfileId)?.note}</small>
            </div>
            <div className="sidebar-lock-actions">
              <button
                aria-label={currentLayoutProfile.sidebar.locked ? '解锁左侧菜单' : '锁定左侧菜单'}
                className="icon-button light"
                onClick={() => setSidebarLocked(!currentLayoutProfile.sidebar.locked)}
                type="button"
              >
                {currentLayoutProfile.sidebar.locked ? <Unlock size={15} /> : <Lock size={15} />}
              </button>
              <button
                aria-label="恢复左侧菜单默认排序"
                className="icon-button light"
                onClick={resetSidebarLayout}
                type="button"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>
        </div>
        <nav className="nav">
          {visibleNavItems.map((item) => {
            const Icon = item.icon
            const badgeConfig = sidebarBadgeConfig[item.id]
            const badge = buildSidebarBadge(badgeConfig?.count ?? 0, item.label, Boolean(badgeConfig?.urgent))
            const isProtected = Boolean(protectedPolicyForSection(item.id))
            const isUnlocked = unlockedSections.includes(item.id)
            return (
              <button
                className={[
                  section === item.id ? 'active' : '',
                  currentLayoutProfile.sidebar.locked ? 'nav-locked' : 'nav-unlocked',
                  badge.isCritical ? 'nav-critical' : '',
                  isProtected && !isUnlocked ? 'nav-protected' : '',
                ].join(' ')}
                draggable={!currentLayoutProfile.sidebar.locked}
                key={item.id}
                onClick={() => {
                  if (currentLayoutProfile.sidebar.items.some((sidebarItem) => sidebarItem.id === item.id)) {
                    openSection(item.id)
                  }
                }}
                onDragEnd={() => {
                  draggedNavId.current = null
                }}
                onDragOver={(event) => {
                  if (!currentLayoutProfile.sidebar.locked) event.preventDefault()
                }}
                onDragStart={(event) => {
                  if (currentLayoutProfile.sidebar.locked) return
                  draggedNavId.current = item.id
                  event.dataTransfer.effectAllowed = 'move'
                  event.dataTransfer.setData('text/plain', item.id)
                }}
                onDrop={(event) => {
                  event.preventDefault()
                  const draggedId = draggedNavId.current || event.dataTransfer.getData('text/plain')
                  if (!draggedId || draggedId === item.id) return
                  moveSidebarItem(draggedId, item.id)
                  draggedNavId.current = null
                }}
                type="button"
              >
                <span className="nav-drag-handle" aria-hidden="true"><GripVertical size={14} /></span>
                <Icon size={17} />
                <span className="nav-label">{item.label}</span>
                {isProtected && !isUnlocked && <Lock size={13} className="nav-lock-icon" />}
                {badge.visible && (
                  <span
                    aria-label={badge.ariaLabel}
                    className={`nav-count-badge tone-${badge.tone}`}
                    title={badge.ariaLabel}
                  >
                    {badge.text}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </aside>

      <main
        className={`main ${currentLayout.locked ? 'layout-locked' : 'layout-unlocked'} ${layoutModeClass(currentLayout.mode)}`}
      >
        <div className="top-shortcuts" aria-label="总览与系统后台快捷入口">
          {topShortcutItems.map((item) => {
            const Icon = item.icon
            const badgeConfig = sidebarBadgeConfig[item.id]
            const badge = buildSidebarBadge(badgeConfig?.count ?? 0, item.label, Boolean(badgeConfig?.urgent))
            return (
              <button
                aria-label={item.label}
                className={section === item.id ? 'top-shortcut active' : 'top-shortcut'}
                key={item.id}
                onClick={() => openSection(item.id)}
                title={item.label}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {badge.visible && (
                  <b className={`nav-count-badge tone-${badge.tone}`}>{badge.text}</b>
                )}
              </button>
            )
          })}
        </div>
        <WorkspaceLayoutContext.Provider
          value={{
            getDraggedCardId,
            layout: currentLayout,
            moveCard,
            reshapeCard,
            resizeCard,
            scaleCard,
            setDraggedCardId,
            snapCardToGrid,
          }}
        >
          <WorkspaceLayoutBar
            layout={currentLayout}
            onReset={() =>
              setCurrentWorkspaceLayout(resetWorkspaceLayout(defaultWorkspaceItems[section], true))
            }
            onSetMode={setLayoutMode}
            onToggleLocked={() =>
              setCurrentWorkspaceLayout(setWorkspaceLocked(currentLayout, !currentLayout.locked))
            }
          />
          <GlobalSearchPanel
            activeSectionLabel={navItemLookup.get(section)?.label ?? section}
            onOpenResult={openSearchResult}
            onQueryChange={setSearchQuery}
            query={searchQuery}
            results={globalSearchResults}
            suggestions={globalSearchSuggestions}
          />
          {section === 'dashboard' && <Dashboard candidates={candidates} metrics={metrics} />}
          {section === 'admin' && <AdminConsole />}
          {section === 'base' && <PlatformBase />}
          {section === 'blueprint' && <FusionBlueprint />}
          {section === 'candidates' && (
            <Candidates
              candidates={candidates}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              updateCandidate={updateCandidate}
            />
          )}
          {section === 'talentLibrary' && <TalentLibrary candidates={candidates} updateCandidate={updateCandidate} />}
          {section === 'performanceGoals' && <PerformanceGoalCenter />}
          {section === 'contracts' && <ContractCenter selected={selected} />}
          {section === 'first' && <FirstEvaluation selected={selected} updateSelected={updateSelected} />}
          {section === 'business' && <BusinessQuestionnaire selected={selected} />}
          {section === 'accounts' && <RecruitingAccountHub />}
          {section === 'publishing' && <JobPublishingCenter />}
          {section === 'labor' && <LaborPartTime />}
          {section === 'jobseeker' && <JobSeekerModule />}
          {section === 'audio' && (
            <AudioAnalysis candidates={candidates} selected={selected} updateSelected={updateSelected} />
          )}
          {section === 'interviews' && <InterviewOrchestration selected={selected} />}
          {section === 'review' && <ReviewHomework selected={selected} updateSelected={updateSelected} />}
          {section === 'agent' && <AgentSkills selected={selected} />}
          {section === 'aiInterview' && <AiInvitationInterview selected={selected} />}
          {section === 'mobileWork' && <MobileWorkTerminal />}
          {section === 'autoDispatch' && <AutoDispatchCenter />}
          {section === 'invitationChannels' && <InvitationChannels />}
          {section === 'mail' && <MailWorkflow />}
          {section === 'reports' && <Reports candidates={candidates} />}
          {section === 'platform' && <PlatformPlan />}
          {section === 'theme' && (
            <ThemeSelector
              currentSection={section}
              interfaceSettings={interfaceSettings}
              setInterfaceSettings={setInterfaceSettings}
              setSection={setSection}
              setTheme={setTheme}
              theme={theme}
            />
          )}
          {section === 'riskCompliance' && <RiskComplianceCenter />}
        </WorkspaceLayoutContext.Provider>
      </main>
      {pendingProtectedSection && (
        <div className="access-modal-backdrop">
          <div className="access-modal">
            <div className="access-modal-head">
              <div>
                <span className="mini-chip warn">高权限母菜单</span>
                <strong>{protectedPolicyForSection(pendingProtectedSection)?.label}</strong>
                <p>{protectedPolicyForSection(pendingProtectedSection)?.reason}</p>
              </div>
              <button
                aria-label="关闭权限验证"
                className="icon-button light"
                onClick={() => setPendingProtectedSection(null)}
                type="button"
              >
                <X size={16} />
              </button>
            </div>
            <label className="access-code-field">
              <span>输入权限码</span>
              <input
                onChange={(event) => setAccessCodeInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') confirmProtectedAccess()
                }}
                placeholder="请输入管理员验证码"
                type="password"
                value={accessCodeInput}
              />
            </label>
            <p className="access-hint">
              原型演示码：{prototypeAccessCode}。正式版将改为手机/邮箱动态验证码、角色权限和操作审计。
            </p>
            {accessError && <p className="access-error">{accessError}</p>}
            <div className="access-actions">
              <button className="button light" onClick={() => setPendingProtectedSection(null)} type="button">取消</button>
              <button className="button primary" onClick={confirmProtectedAccess} type="button">验证并进入</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ThemeSelector({
  currentSection,
  interfaceSettings,
  setInterfaceSettings,
  setSection,
  theme,
  setTheme,
}: {
  currentSection: Section
  interfaceSettings: InterfaceSettings
  setInterfaceSettings: React.Dispatch<React.SetStateAction<InterfaceSettings>>
  setSection: (section: Section) => void
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
}) {
  const compactSidebarSections: Section[] = ['dashboard', 'publishing', 'candidates', 'talentLibrary', 'performanceGoals', 'contracts', 'aiInterview', 'mobileWork', 'review', 'autoDispatch', 'mail', 'reports', 'theme']

  return (
    <section
      className="admin-console"
      data-card-mode={adminConsoleLayoutPreference.cardMode}
      data-fill-strategy={adminConsoleLayoutPreference.fillStrategy}
    >
      <PageTitle
        title="界面皮肤"
        subtitle="可调整自定义调色盘、字体、字号、企业Logo、母菜单样式和左侧功能模块显示。"
      />
      <div className="theme-grid">
        {themes.map((item) => (
          <button
            className={`theme-card theme-${item.id} ${theme === item.id ? 'selected' : ''}`}
            key={item.id}
            onClick={() => setTheme(item.id)}
            type="button"
          >
            <span className="theme-swatch">
              <i />
              <i />
              <i />
            </span>
            <strong>{item.name}</strong>
            <small>{item.note}</small>
            {theme === item.id && <em>当前皮肤</em>}
          </button>
        ))}
      </div>
      <Card title="皮肤会影响的区域">
        <div className="chips">
          <span className="chip good">企业Logo</span>
          <span className="chip good">企业名称</span>
          <span className="chip good">侧边栏</span>
          <span className="chip good">主按钮</span>
          <span className="chip good">自定义调色盘</span>
          <span className="chip good">自定义字体</span>
          <span className="chip good">自定义字号</span>
          <span className="chip good">徽标</span>
          <span className="chip good">进度条</span>
          <span className="chip good">提示框</span>
          <span className="chip good">PWA主题色</span>
        </div>
      </Card>

      <Card title="企业Logo与品牌定制">
        <div className="brand-preset-grid">
          {enterpriseBrandPresets.map((preset) => (
            <button
              className="brand-preset-card"
              key={preset.brandName}
              onClick={() => setInterfaceSettings((settings) => applyEnterpriseBrandPreset(settings, preset))}
              type="button"
            >
              <span style={{ background: preset.primaryColor }}>{preset.brandLogoText}</span>
              <strong>{preset.brandName}</strong>
              <small>{preset.brandSubtitle}</small>
            </button>
          ))}
        </div>
        <div className="form-grid">
          <label>
            <span>Logo文字</span>
            <input
              maxLength={4}
              onChange={(event) =>
                setInterfaceSettings((settings) => ({ ...settings, brandLogoText: event.target.value || 'AI' }))
              }
              value={interfaceSettings.brandLogoText}
            />
          </label>
          <label>
            <span>企业系统名称</span>
            <input
              onChange={(event) =>
                setInterfaceSettings((settings) => ({ ...settings, brandName: event.target.value }))
              }
              value={interfaceSettings.brandName}
            />
          </label>
          <label className="wide">
            <span>系统副标题</span>
            <input
              onChange={(event) =>
                setInterfaceSettings((settings) => ({ ...settings, brandSubtitle: event.target.value }))
              }
              value={interfaceSettings.brandSubtitle}
            />
          </label>
        </div>
      </Card>

      <div className="grid two">
        <Card title="字体与字号">
          <div className="form-grid">
            <label>
              <span>字体</span>
              <select
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({
                    ...settings,
                    fontFamily: event.target.value as InterfaceSettings['fontFamily'],
                  }))
                }
                value={interfaceSettings.fontFamily}
              >
                {fontFamilyOptions.map((font) => (
                  <option key={font.id} value={font.id}>{font.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span>自定义字体名</span>
              <input
                disabled={interfaceSettings.fontFamily !== 'custom'}
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, customFontFamily: event.target.value }))
                }
                placeholder="例如：PingFang SC, Microsoft YaHei"
                value={interfaceSettings.customFontFamily}
              />
            </label>
            <label>
              <span>字号：{interfaceSettings.fontSize}px</span>
              <input
                max="20"
                min="12"
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({
                    ...settings,
                    fontSize: clampFontSize(Number(event.target.value)),
                  }))
                }
                type="range"
                value={interfaceSettings.fontSize}
              />
            </label>
            <label>
              <span>文字颜色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, textColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.textColor}
              />
            </label>
            <label>
              <span>背景颜色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, backgroundColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.backgroundColor}
              />
            </label>
          </div>
          <div className="font-preview">
            <strong>{interfaceSettings.brandName}</strong>
            <p>{interfaceSettings.brandSubtitle}。这里预览当前字体、字号、文字颜色和背景色。</p>
          </div>
        </Card>

        <Card title="自定义调色盘">
          <div className="palette-control-grid">
            <label>
              <span>企业主色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, primaryColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.primaryColor}
              />
            </label>
            <label>
              <span>侧边栏颜色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, sidebarColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.sidebarColor}
              />
            </label>
            <label>
              <span>背景颜色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, backgroundColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.backgroundColor}
              />
            </label>
            <label>
              <span>文字颜色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, textColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.textColor}
              />
            </label>
            <label>
              <span>卡片颜色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, cardColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.cardColor}
              />
            </label>
            <label>
              <span>线条颜色</span>
              <input
                onChange={(event) =>
                  setInterfaceSettings((settings) => ({ ...settings, lineColor: event.target.value }))
                }
                type="color"
                value={interfaceSettings.lineColor}
              />
            </label>
          </div>
          <div className="palette-preview">
            {[
              ['主色', interfaceSettings.primaryColor],
              ['侧栏', interfaceSettings.sidebarColor],
              ['背景', interfaceSettings.backgroundColor],
              ['文字', interfaceSettings.textColor],
              ['卡片', interfaceSettings.cardColor],
              ['线条', interfaceSettings.lineColor],
            ].map(([label, color]) => (
              <span key={label}>
                <i style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </Card>

        <Card title="背景色块">
          <div className="preset-grid">
            {colorPresets.map((preset) => (
              <button
                className="preset-card"
                key={preset.name}
                onClick={() => setInterfaceSettings((settings) => applyColorPreset(settings, preset))}
                type="button"
              >
                <span style={{ background: preset.background }} />
                <strong>{preset.name}</strong>
                <small>{preset.background} / {preset.text}</small>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card title="界面模块显示">
        <div className="sidebar-menu-summary">
          <div>
            <span>母菜单数量</span>
            <strong>{visibleSectionCountText(interfaceSettings.visibleSections.length, navItems.length)}</strong>
            <p>可增加、减少或隐藏母菜单；界面皮肤固定保留，防止设置入口消失。</p>
          </div>
          <div className="sidebar-menu-actions">
            <button
              className="button light"
              onClick={() =>
                setInterfaceSettings((settings) => ({
                  ...settings,
                  visibleSections: navItems.map((item) => item.id),
                }))
              }
              type="button"
            >
              全部显示
            </button>
            <button
              className="button light"
              onClick={() => {
                setInterfaceSettings((settings) => ({ ...settings, visibleSections: compactSidebarSections }))
                if (!compactSidebarSections.includes(currentSection)) setSection('dashboard')
              }}
              type="button"
            >
              精简母菜单
            </button>
          </div>
        </div>
        <div className="module-toggle-grid">
          {navItems.map((item) => {
            const Icon = item.icon
            const visible = interfaceSettings.visibleSections.includes(item.id)
            const isLastVisible = visible && interfaceSettings.visibleSections.length === 1
            const isRequiredSettingsModule = item.id === 'theme'
            return (
              <button
                className={visible ? 'module-toggle active' : 'module-toggle'}
                disabled={isLastVisible || isRequiredSettingsModule}
                key={item.id}
                onClick={() => {
                  const nextVisibleSections = toggleVisibleSection(interfaceSettings.visibleSections, item.id)
                  setInterfaceSettings((settings) => ({
                    ...settings,
                    visibleSections: toggleVisibleSection(settings.visibleSections, item.id),
                  }))
                  if (item.id === currentSection && !nextVisibleSections.includes(item.id)) {
                    setSection((nextVisibleSections[0] as Section | undefined) ?? 'dashboard')
                  }
                }}
                type="button"
              >
                <Icon size={16} />
                <span>{item.label}</span>
                <strong>{isRequiredSettingsModule ? '固定' : visible ? '显示' : '隐藏'}</strong>
              </button>
            )
          })}
        </div>
      </Card>

      <Card title="母菜单视觉设置">
        <div className="sidebar-menu-settings">
          <label>
            <span>左侧蓝色标识块宽度：{interfaceSettings.sidebarAccentWidth}px</span>
            <input
              max="12"
              min="2"
              onChange={(event) =>
                setInterfaceSettings((settings) => ({
                  ...settings,
                  sidebarAccentWidth: clampSidebarAccentWidth(Number(event.target.value)),
                }))
              }
              type="range"
              value={interfaceSettings.sidebarAccentWidth}
            />
          </label>
          <label>
            <span>母菜单字号：{interfaceSettings.sidebarFontSize}px</span>
            <input
              max="18"
              min="12"
              onChange={(event) =>
                setInterfaceSettings((settings) => ({
                  ...settings,
                  sidebarFontSize: clampSidebarFontSize(Number(event.target.value)),
                }))
              }
              type="range"
              value={interfaceSettings.sidebarFontSize}
            />
          </label>
          <label>
            <span>母菜单行距：{interfaceSettings.sidebarLineHeight}</span>
            <input
              max="1.8"
              min="1.1"
              onChange={(event) =>
                setInterfaceSettings((settings) => ({
                  ...settings,
                  sidebarLineHeight: clampSidebarLineHeight(Number(event.target.value)),
                }))
              }
              step="0.1"
              type="range"
              value={interfaceSettings.sidebarLineHeight}
            />
          </label>
        </div>
        <div className="sidebar-menu-preview">
          <button className="nav-locked active" type="button">
            <span className="nav-drag-handle"><GripVertical size={14} /></span>
            <Palette size={17} />
            <span className="nav-label">母菜单预览</span>
            <span className="nav-count-badge tone-blue">8</span>
          </button>
          <p>左边实际母菜单会同步应用这些宽度、字号和行距。</p>
        </div>
      </Card>
    </section>
  )
}

function PageTitle({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: React.ReactNode
}) {
  const progress = sectionProgressByTitle(title)

  return (
    <header className="page-title">
      <div>
        <div className="page-title-main">
          <h1>{title}</h1>
          <span
            aria-label={`${title}开发进度${formatSectionProgressPercent(progress.percent)}，${progress.status}`}
            className={`title-progress tone-${progress.tone}`}
            title={progress.status}
          >
            <Clock size={15} />
            <b>{formatSectionProgressPercent(progress.percent)}</b>
          </span>
        </div>
        <p>{subtitle}</p>
      </div>
      <div className="actions">
        {action}
      </div>
    </header>
  )
}

function Dashboard({ candidates, metrics }: { candidates: Candidate[]; metrics: Record<string, number> }) {
  const [statusView, setStatusView] = useState<'all' | 'recommended' | 'homework' | 'audio' | 'highLevel'>('all')
  const [postView, setPostView] = useState('全部岗位')
  const [demoPlatformFilter, setDemoPlatformFilter] = useState<DemoPlatformFilter>('all')
  const postOptions = ['全部岗位', ...Array.from(new Set(candidates.map((candidate) => candidate.postName)))]
  const filteredDemoRecords = filterDemoInterviewsByPlatform(demoInterviewRecords, demoPlatformFilter)
  const demoSummary = demoPlatformSummary(demoInterviewRecords)
  const demoVisibleAccountIds = new Set(filteredDemoRecords.map((record) => record.platformAccountId))
  const visibleDemoAccounts = demoPlatformAccounts.filter((account) => demoPlatformFilter === 'all' || demoVisibleAccountIds.has(account.id))
  const filteredCandidates = candidates.filter((candidate) => {
    const statusMatched =
      statusView === 'all' ||
      (statusView === 'recommended' && candidate.status === '推荐复试') ||
      (statusView === 'homework' && candidate.homeworkStatus === '待提交') ||
      (statusView === 'audio' && candidate.audioStatus === '已解析') ||
      (statusView === 'highLevel' && ['S', 'A'].includes(candidate.totalLevel))
    const postMatched = postView === '全部岗位' || candidate.postName === postView

    return statusMatched && postMatched
  })
  const groupedCandidates = postOptions
    .filter((postName) => postName !== '全部岗位')
    .map((postName) => ({
      postName,
      candidates: filteredCandidates.filter((candidate) => candidate.postName === postName),
    }))
    .filter((group) => group.candidates.length > 0)
  const statusButtons = [
    { id: 'all', label: '全部', count: candidates.length },
    { id: 'recommended', label: '推荐复试', count: candidates.filter((candidate) => candidate.status === '推荐复试').length },
    { id: 'homework', label: '待作业', count: candidates.filter((candidate) => candidate.homeworkStatus === '待提交').length },
    { id: 'audio', label: '录音已解析', count: candidates.filter((candidate) => candidate.audioStatus === '已解析').length },
    { id: 'highLevel', label: 'S/A', count: candidates.filter((candidate) => ['S', 'A'].includes(candidate.totalLevel)).length },
  ] as const
  const dispatchBoard = buildAutoDispatchBoard(defaultAutoDispatchCases, new Date('2026-06-20T12:00:00+08:00'))
  const planSummary = deliveryPlanSummary(deliveryStages)

  return (
    <section>
      <PageTitle
        title="黑卫士 AI HR 系统 V1.2"
        subtitle="V1.2 = 平台底座 + 招聘筛选 + 初试评分 + 录音解析 + 三轮作业 + Agent补充，统一为同一套Web/PWA系统。"
        action={
          <>
            <button className="button">导入简历</button>
            <button className="button primary">新建候选人</button>
          </>
        }
      />
      <Card title="开发节奏甘特图">
        <div className="delivery-board">
          <div className="delivery-summary">
            <div>
              <span>总进度</span>
              <strong>{planSummary.overallProgress}%</strong>
              <p>{deliveryPlanStartLabel} 起算，{deliveryPlanPaceLabel}，共 {planSummary.totalSlots} 个冲刺槽位。</p>
            </div>
            <div>
              <span>当前步骤</span>
              <strong>{planSummary.currentTitle}</strong>
              <p>做完一步就在这里更新百分比和状态，避免靠口头追问进度。</p>
            </div>
            <div>
              <span>剩余倒计时</span>
              <strong>{planSummary.remainingHours}小时</strong>
              <p>下一步：{planSummary.nextTitle}。先做数据保存，随后立刻接招聘主流程。</p>
            </div>
          </div>
          <div className="delivery-gantt" aria-label="开发甘特图">
            {deliveryStages.map((stage) => (
              <div className={`delivery-row status-${stage.status}`} key={stage.id}>
                <div className="delivery-row-meta">
                  <strong>{stage.title}</strong>
                  <span>{deliveryStageRange(stage)} / {deliveryStatusLabel(stage.status)}</span>
                </div>
                <div
                  className="delivery-track"
                  style={{
                    '--delivery-duration': stage.durationSlots,
                    '--delivery-progress': `${stage.progress}%`,
                    '--delivery-start': stage.startSlot,
                  } as React.CSSProperties}
                >
                  <span className="delivery-bar">
                    <i />
                  </span>
                </div>
                <div className="delivery-row-progress">
                  <strong>{stage.progress}%</strong>
                  <em>{deliveryStageCountdownLabel(stage)}</em>
                  <span>{stage.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="delivery-checklist">
            {deliveryStages.map((stage) => (
              <div className={`delivery-check status-${stage.status}`} key={`${stage.id}-check`}>
                <span>{deliveryStatusLabel(stage.status)}</span>
                <strong>{stage.title}</strong>
                <p>{stage.acceptance}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div
        className="stat-grid overview-stat-grid"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${overviewDashboardLayoutPreference.minStatCardWidthPx}px, 1fr))` }}
      >
        <Stat title="候选人总量" value={metrics.total} note="本地样例数据" color="blue" />
        <Stat title="推荐复试" value={metrics.recommended} note="可进入老板复试" color="green" />
        <Stat title="录音已解析" value={metrics.audioParsed} note="ASR模块占位可接API" color="blue" />
        <Stat title="待提交作业" value={metrics.homeworkPending} note="跟踪作业态度" color="yellow" />
        <Stat title="S/A候选人" value={metrics.highLevel} note="优先邀约" color="green" />
      </div>
      <Card title="Demo演示系统">
        <div className="demo-system-head">
          <div>
            <strong>一键演示数据</strong>
            <p>每个环节预置模拟候选人、岗位、公司、手机号、邮箱、微信号、企微号和招聘平台账号；封装后可作为演示环境独立运行。</p>
          </div>
          <div className="demo-system-stats">
            <div><span>演示候选人</span><strong>{filteredDemoRecords.length}</strong></div>
            <div><span>平台账号</span><strong>{visibleDemoAccounts.length}</strong></div>
            <div><span>全量样本</span><strong>{demoSummary.total}</strong></div>
          </div>
        </div>
        <div className="segmented-buttons demo-platform-filter">
          {demoPlatformFilterOptions.map((option) => (
            <button
              className={demoPlatformFilter === option.id ? 'segment active' : 'segment'}
              key={option.id}
              onClick={() => setDemoPlatformFilter(option.id)}
              type="button"
            >
              {option.label}
              <span>{demoSummary.byFilter[option.id]}</span>
            </button>
          ))}
        </div>
        <div className="demo-grid">
          <div className="demo-panel">
            <strong>平台账号</strong>
            <div className="demo-account-list">
              {visibleDemoAccounts.map((account) => (
                <div className="demo-account-card" key={account.id}>
                  <span className="mini-chip on">{account.platform}</span>
                  <strong>{account.accountName}</strong>
                  <p>{account.companyName} / {account.ownerName}</p>
                  <small>{account.loginMethod}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="demo-panel">
            <strong>面试与候选人数据</strong>
            <div className="demo-record-list">
              {filteredDemoRecords.map((record) => (
                <div className="demo-record-card" key={record.id}>
                  <div>
                    <strong>{record.candidateName} / {record.jobName}</strong>
                    <p>{record.companyName} / {record.platformName} / {record.platformAccountName}</p>
                    <small>{record.phone} / {record.wechatId} / {record.wecomId}</small>
                  </div>
                  <div>
                    <span className="badge">{record.interviewStage}</span>
                    <strong>{record.score}</strong>
                    <small>{record.status}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="notice">
          平台筛选支持只看BOSS、只看智联、只看猎聘或全部平台混合；正式版可继续扩展到51job、LinkedIn、香港招聘平台等适配器。
        </div>
      </Card>
      <Card title="自动分工总览">
        <div className="dispatch-summary-strip">
          <div><span>自动排班</span><strong>{dispatchBoard.summary.total}</strong></div>
          <div><span>双向确认</span><strong>{dispatchBoard.summary.confirmed}</strong></div>
          <div><span>电话确认</span><strong>{dispatchBoard.summary.phoneFollowup}</strong></div>
          <div className={dispatchBoard.summary.alarm > 0 ? 'danger' : ''}><span>报警</span><strong>{dispatchBoard.summary.alarm}</strong></div>
          <div><span>低分入库</span><strong>{dispatchBoard.summary.underThreshold}</strong></div>
        </div>
        <div className="dispatch-dashboard-alerts">
          {dispatchBoard.items.slice(0, 3).map((item) => (
            <div className={`dispatch-dashboard-row severity-${item.severity}`} key={`${item.candidateId}-${item.roundId}`}>
              <div>
                <strong>{item.candidateName} / {item.roundName}</strong>
                <p>{item.changeType} / {item.location} / {item.interviewerName}</p>
              </div>
              <span>{autoDispatchStageLabel(item.confirmationStage)}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title="岗位与面试者滚动窗口">
        <div className="overview-toolbar compact">
          <div
            className="overview-filter-strip"
            data-layout={overviewDashboardLayoutPreference.filterMode}
          >
            {statusButtons.map((button) => (
              <button
                className={statusView === button.id ? 'segment active' : 'segment'}
                key={button.id}
                onClick={() => setStatusView(button.id)}
                type="button"
              >
                {button.label}
                <span>{button.count}</span>
              </button>
            ))}
            <span className="overview-filter-divider">岗位</span>
            {postOptions.map((postName) => (
              <button
                className={postView === postName ? 'segment active post-segment' : 'segment post-segment'}
                key={postName}
                onClick={() => setPostView(postName)}
                type="button"
                title={postName}
              >
                {postName === '全部岗位' ? postName : buildJobCodeProfile(postName).jobCode}
              </button>
            ))}
          </div>
        </div>
        <div className="overview-scroll-window">
          {groupedCandidates.length ? (
            groupedCandidates.map((group) => (
              <div className="overview-post-group" key={group.postName}>
                <div className="overview-post-head">
                  <div className="overview-post-title">
                    <span className="job-code-badge compact">{buildJobCodeProfile(group.postName).jobCode}</span>
                    <div>
                      <strong>{group.postName}</strong>
                      <p>{group.candidates.length} 位候选人 / 按综合分和当前招聘动作快速查看</p>
                    </div>
                  </div>
                  <span className="badge">{group.candidates.length}</span>
                </div>
                <div className="overview-candidate-grid">
                  {group.candidates.map((candidate) => {
                    const codeProfile = candidateJobCodeProfile(candidate)

                    return (
                      <div className="overview-candidate-card" key={candidate.id}>
                        <div className="overview-candidate-head">
                          <span className="job-code-badge compact">{codeProfile.jobCode}</span>
                          <div>
                            <strong>{candidate.name}</strong>
                            <p>{candidate.postName} / {candidate.source} / {candidate.currentLocation}</p>
                          </div>
                          <span className={`badge level-${candidate.totalLevel}`}>{candidate.totalLevel}</span>
                        </div>
                        <div className="overview-score-row">
                          <div><span>综合分</span><strong>{candidate.totalScore}</strong></div>
                          <div><span>通用</span><strong>{candidate.commonScore}</strong></div>
                          <div><span>岗位</span><strong>{candidate.businessScore}</strong></div>
                        </div>
                        <div className="mini-chip-grid">
                          <span className="mini-chip on">{candidate.status}</span>
                          <span className="mini-chip">{candidate.audioStatus}</span>
                          <span className={candidate.homeworkStatus === '待提交' ? 'mini-chip on' : 'mini-chip'}>
                            {candidate.homeworkStatus}
                          </span>
                          <span className="mini-chip">{candidate.cooperationLevel}</span>
                        </div>
                        <p className="overview-summary">{candidate.agentSummary}</p>
                        <div className="overview-footer">
                          <span>{salaryRangeText(candidate)}</span>
                          <span>{candidate.risks[0] ?? '暂无明显风险'}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <strong>当前筛选暂无候选人</strong>
              <p>切换上方按钮查看其他岗位或状态。</p>
            </div>
          )}
        </div>
      </Card>
      <div className="grid two">
        <Card title="今日优先处理">
          <div className="timeline">
            {candidates.map((candidate) => (
              <div className="timeline-item" key={candidate.id}>
                <span className={`badge level-${candidate.totalLevel}`}>{candidate.totalLevel}</span>
                <div>
                  <strong>
                    {candidate.name} / {candidate.postName}
                  </strong>
                  <p>{candidate.agentSummary}</p>
                </div>
                <span className="muted">{candidate.status}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="融合后总SOP">
          <ol className="sop">
            <li>候选人从BOSS手动导入、邮箱、文件上传或内推进入系统。</li>
            <li>系统解析简历，计算工作年限、专业匹配、加分项和扣分项。</li>
            <li>线上面试录音上传后，转写并回填初试和岗位问卷。</li>
            <li>业务岗由Sales Agent采集业绩、客户、提成和佐证材料。</li>
            <li>老板复试后布置作业，系统记录提交状态、态度和质量。</li>
            <li>日报、周报、月报统一统计AI查看、人工查看、邀约、面试、复试、作业和录用。</li>
          </ol>
        </Card>
      </div>
    </section>
  )
}

function AdminConsole() {
  const operatorCount = 12
  const recruitingAccountCount = 16
  const recommended = recommendedEdition(operatorCount, recruitingAccountCount)
  const dataBackupInputRef = useRef<HTMLInputElement | null>(null)
  const [dataBackupStatus, setDataBackupStatus] = useState('本机数据保存已启用，可导出备份或从备份恢复。')
  const adminUsers = [
    {
      name: '王主管',
      role: '超级管理员',
      phone: '138****8816',
      email: 'admin@heiwenshi.ai',
      status: '已启用',
      lastLogin: '今天 09:12',
    },
    {
      name: '陈HR',
      role: '人事专员',
      phone: '136****2219',
      email: 'chen.hr@company.com',
      status: '已启用',
      lastLogin: '今天 10:35',
    },
    {
      name: '老板账号',
      role: '老板/复试官',
      phone: '139****0066',
      email: 'boss@company.com',
      status: '待绑定邮箱',
      lastLogin: '昨天 18:20',
    },
  ]
  const connectedAccounts = [
    { name: '业务岗招聘号', owner: '陈HR', mode: '官方授权/人工导入', quota: '主账号', status: '正常' },
    { name: '技术岗招聘号', owner: '王主管', mode: '网页登录辅助', quota: '子账号', status: '待人工确认' },
    { name: '销售岗招聘号', owner: '陈HR', mode: '邮箱简历同步', quota: '子账号', status: '正常' },
  ]
  const exportLocalData = () => {
    const snapshot = exportPersistedValues(browserLocalStorage())
    const dateLabel = new Date().toISOString().slice(0, 10)
    downloadJsonFile(`heiwenshi-aihr-local-backup-${dateLabel}.json`, snapshot)
    setDataBackupStatus(`已导出 ${Object.keys(snapshot.values).length} 类本机数据备份。`)
  }
  const restoreLocalData = async (event: { currentTarget: HTMLInputElement }) => {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return

    try {
      const snapshot = JSON.parse(await file.text()) as unknown
      const result = restorePersistedValues(browserLocalStorage(), snapshot)
      if (!result.ok) {
        setDataBackupStatus('恢复失败：备份文件格式不正确，或浏览器本地存储不可用。')
        return
      }
      setDataBackupStatus(`已恢复 ${result.restoredKeys.length} 类本机数据，刷新页面后生效。`)
    } catch {
      setDataBackupStatus('恢复失败：请选择系统导出的 JSON 备份文件。')
    }
  }
  const clearLocalData = () => {
    if (typeof window !== 'undefined' && !window.confirm('确认清空本机保存的数据吗？清空后需要重新导入备份或使用演示数据。')) {
      return
    }
    const result = clearPersistedValues(browserLocalStorage())
    if (!result.ok) {
      setDataBackupStatus('清空失败：浏览器本地存储不可用。')
      return
    }
    setDataBackupStatus(`已清空 ${result.clearedKeys.length} 类本机数据，刷新页面后恢复演示默认数据。`)
  }

  return (
    <section>
      <PageTitle
        title="系统后台"
        subtitle="黑卫士 AI HR 系统的账号、验证、版本等级、同事权限和招聘账号连接管理。"
        action={
          <>
            <button className="button">邀请同事</button>
            <button className="button primary">创建管理员</button>
          </>
        }
      />

      <div className="admin-stat-grid stat-grid">
        <Stat title="当前版本建议" value={systemEditions.find((item) => item.id === recommended)?.name ?? '团队版'} note="按人数和账号量自动推荐" color="blue" />
        <Stat title="后台用户" value={operatorCount} note="可分角色授权" color="green" />
        <Stat title="招聘账号" value={recruitingAccountCount} note={recruitingAccountBand(recruitingAccountCount)} color="blue" />
        <Stat title="权限体系" value={permissionLevels.length} note={summarizeHrPermissionSystem()} color="orange" />
        <Stat title="验证方式" value="2" note="手机或邮箱任一可用" color="green" />
        <Stat title="明文密码" value="0" note="只允许重置，不允许查看" color="black" />
      </div>

      <div className="admin-brick-grid">
        <Card title="登录与找回密码规则">
          <div className="auth-rules">
            <div className="rule-card">
              <strong>注册登录</strong>
              <p>用户名和密码由用户自设；手机号和邮箱都建议绑定，至少一个完成验证后才能启用账号。</p>
            </div>
            <div className="rule-card">
              <strong>双联系方式，单通道验证</strong>
              <p>找回密码时，手机验证码或邮箱验证码任一通过即可重置；另一个联系方式可在登录后补绑。</p>
            </div>
            <div className="rule-card">
              <strong>管理员后台</strong>
              <p>后台可查看账号、角色、验证状态、登录记录和重置入口，但不能查看任何人的原始密码。</p>
            </div>
            <div className="rule-card">
              <strong>安全审计</strong>
              <p>新增同事、重置密码、导出候选人、连接招聘账号都写入操作日志。</p>
            </div>
          </div>
        </Card>

        <Card title="本机数据管理">
          <div className="local-data-panel">
            <div className="notice">
              <strong>单机版数据：</strong>
              候选人、岗位、问卷、评分、作业、界面设置等数据先保存在本机浏览器里；导出备份后可以换电脑恢复。
            </div>
            <div className="local-data-actions">
              <button className="button primary" onClick={exportLocalData} type="button">导出本机备份</button>
              <button className="button" onClick={() => dataBackupInputRef.current?.click()} type="button">导入恢复</button>
              <button className="button danger" onClick={clearLocalData} type="button">清空本机数据</button>
              <button className="button" onClick={() => window.location.reload()} type="button">刷新生效</button>
              <input
                accept="application/json,.json"
                className="visually-hidden"
                onChange={restoreLocalData}
                ref={dataBackupInputRef}
                type="file"
              />
            </div>
            <p className="local-data-status">{dataBackupStatus}</p>
          </div>
        </Card>

        <Card title="版本等级建议">
          <div className="edition-grid">
            {systemEditions.map((edition) => (
              <div className={`edition-card ${edition.id === recommended ? 'recommended' : ''}`} key={edition.id}>
                <div>
                  <strong>{edition.name}</strong>
                  {edition.id === recommended && <span className="badge">推荐</span>}
                </div>
                <p>{edition.description}</p>
                <small>{edition.operatorSeats} / {edition.recruitingAccountQuota}</small>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="admin-brick-grid">
        <Card title="四级权限体系">
          <div className="permission-level-grid">
            {permissionLevels.map((level) => (
              <div className="permission-level-card" key={level.id}>
                <strong>{level.name}</strong>
                <p>{level.scope}</p>
                <div className="mini-chip-grid">
                  {level.roles.map((role) => (
                    <span className="mini-chip on" key={role}>{role}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="HR模块权限补充">
          <div className="hr-module-grid">
            {hrFunctionModules.map((module) => (
              <div className="hr-module-card" key={module.id}>
                <strong>{module.name}</strong>
                <p>{module.description}</p>
                <small>{module.managerRole} / {module.executorRole}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card title="同事账号管理">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>用户</th>
                  <th>角色</th>
                  <th>手机号</th>
                  <th>邮箱</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((user) => (
                  <tr key={user.email}>
                    <td>
                      <strong>{user.name}</strong>
                      <div className="muted">{user.lastLogin}</div>
                    </td>
                    <td>{user.role}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td><button className="table-action" type="button">重置密码</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="招聘账号连接管理">
          <div className="notice">
            <strong>合规边界：</strong>
            本系统不保存第三方招聘平台明文密码，不做绕过风控的外挂触达；正式版采用官方授权、人工确认、邮箱导入和本地会话辅助。
          </div>
          <div className="connector-list">
            {connectedAccounts.map((account) => (
              <div className="connector-card" key={account.name}>
                <div>
                  <strong>{account.name}</strong>
                  <p>{account.mode} / {account.owner}</p>
                </div>
                <div>
                  <span className="badge">{account.quota}</span>
                  <span className="chip good">{account.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="今天可交付与正式安装路线">
        <div className="release-path">
          <div className="release-step done">
            <strong>今天可交付</strong>
            <p>Web/PWA本地版，可在 Mac mini 上运行开发服务，也可用浏览器安装为PWA应用。</p>
          </div>
          <div className="release-step doing">
            <strong>下一阶段</strong>
            <p>补后端数据库、短信/邮箱验证码、真实登录、权限、审计、文件上传和账号配置落库。</p>
          </div>
          <div className="release-step todo">
            <strong>桌面安装包</strong>
            <p>用 Tauri 或 Electron 封装 Mac/Windows 安装包，Mac mini 可直接安装到应用程序。</p>
          </div>
        </div>
      </Card>
    </section>
  )
}

function PlatformBase() {
  const [modules, setModules] = useState(platformModules)
  const [workflow, setWorkflow] = useState(defaultRecruitingWorkflow)
  const visibleModules = showExplicitHrReferences ? modules : modules.filter((module) => module.id !== 'hr-reference-library')
  const visibleWorkflow = showExplicitHrReferences ? workflow : workflow.filter((step) => step.moduleId !== 'hr-reference-library')
  const activeWorkflow = composeWorkflow(visibleWorkflow, visibleModules)
  const dependencyIssues = validateModuleDependencies(visibleModules)
  const hrReferenceSummary = hrReferenceCoverageSummary()
  const platformReferences = hrReferencesForModule('平台底座')

  return (
    <section>
      <PageTitle
        title="SaaS/PaaS 平台底座"
        subtitle="按平台底座 + 可插拔模块建设：功能通过模块注册，流程通过编排组合，后续新增能力就是新增模块。"
      />
      <div className="grid two">
        <Card title="底座核心能力">
          <div className="capability-grid">
            {platformBaseCapabilities.map((capability) => (
              <div className="capability-card" key={capability.name}>
                <strong>{capability.name}</strong>
                <p>{capability.description}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="模块依赖检查">
          {dependencyIssues.length === 0 ? (
            <div className="notice">
              <strong>依赖正常：</strong>
              当前启用模块的依赖关系完整，可以组成招聘主流程。
            </div>
          ) : (
            <div className="chips">
              {dependencyIssues.map((issue) => (
                <span className="chip warn" key={issue}>{issue}</span>
              ))}
            </div>
          )}
          <ol className="sop platform-rules">
            <li>底座不写死业务，业务通过模块挂载。</li>
            <li>模块之间用候选人档案、评分、问卷、任务、报表等标准数据交换。</li>
            <li>流程不是固定代码，正式版由流程编排表控制。</li>
            <li>新增功能时优先新增模块，不改动主系统底座。</li>
          </ol>
        </Card>
      </div>

      {showExplicitHrReferences && (
        <Card title="国际版：国际HR参考库">
          <div className="hr-reference-head">
            <div>
              <strong>{hrReferenceSummary.sourceCount} 个主流参考源</strong>
              <p>用于岗位、职位、目标、绩效、组织和人才数据结构参考；经典版只做形式吸收，国际版显性保留参考源。</p>
            </div>
            <div className="hr-reference-stats">
              <span>{hrReferenceSummary.categories.length} 类口径</span>
              <span>{hrReferenceSummary.moduleCoverage.length} 个模块覆盖</span>
            </div>
          </div>
          <div className="hr-reference-strip">
            {platformReferences.map((reference) => (
              <a href={reference.url} key={reference.id} rel="noreferrer" target="_blank">
                <strong>{reference.name}</strong>
                <span>{reference.category}</span>
              </a>
            ))}
          </div>
          <div className="chips">
            {hrReferenceIntegrationPrinciples.map((principle) => (
              <span className="chip good" key={principle}>{principle}</span>
            ))}
          </div>
        </Card>
      )}

      <Card title="模块注册表">
        <div className="module-registry">
          {visibleModules.map((module) => (
            <div className={`registry-card ${module.enabled ? 'enabled' : 'disabled'}`} key={module.id}>
              <div>
                <strong>{module.name}</strong>
                <p>{module.description}</p>
              </div>
              <div className="module-meta">
                <span className="badge">{module.category}</span>
                <span className={`stage ${module.stage === '已接入' ? 'done' : module.stage === '开发中' ? 'doing' : 'todo'}`}>
                  {module.stage}
                </span>
                <button
                  className={module.enabled ? 'switch on' : 'switch'}
                  onClick={() => setModules((items) => toggleModule(items, module.id))}
                  type="button"
                >
                  {module.enabled ? <Power size={14} /> : <PowerOff size={14} />}
                  {module.enabled ? '已启用' : '未启用'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="当前招聘流程编排">
        <div className="workflow-chain">
          {activeWorkflow.map((step, index) => (
            <div className="workflow-step" key={step.id}>
              <span>{index + 1}</span>
              <div>
                <strong>{step.label}</strong>
                <small>{step.required ? '必经步骤' : '可选步骤'}</small>
              </div>
              <div className="step-actions">
                <button
                  aria-label={`${step.label}上移`}
                  className="icon-button"
                  disabled={index === 0}
                  onClick={() => setWorkflow((items) => moveWorkflowStep(items, step.id, 'up'))}
                  type="button"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  aria-label={`${step.label}下移`}
                  className="icon-button"
                  disabled={index === activeWorkflow.length - 1}
                  onClick={() => setWorkflow((items) => moveWorkflowStep(items, step.id, 'down'))}
                  type="button"
                >
                  <ArrowDown size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

function FusionBlueprint() {
  const mergedModules = [
    {
      name: '候选人入口与沟通',
      from: '1.0骨架 + 1.1补充',
      content: 'BOSS手动导入、招聘邮箱、文件上传、沟通知识库、人工确认邀约、配合度记录。',
    },
    {
      name: '简历筛选评分',
      from: '1.0强化',
      content: '工作年限加分、专业匹配、双学历、专利、0-1项目、时间线冲突、跳槽和方向切换扣分。',
    },
    {
      name: '通用初试评估',
      from: '1.1补充',
      content: '9大人事维度、0-10分、通用分权重60%、AI从录音和简历回填。',
    },
    {
      name: '岗位面试问卷',
      from: '1.0岗位画像 + 1.1问卷',
      content: '销售、运营、职能、管理、技术、财务、HR等岗位动态题库和初试、复试、终试多轮评分。',
    },
    {
      name: '销售专项模型',
      from: '1.1新增',
      content: '客户分层、成交链路、提成核验、业绩佐证、Sales Skills结构化回填。',
    },
    {
      name: '录音解析与现场复盘',
      from: '1.1新增',
      content: '音频上传、ASR转写、面试态度、专业能力、简历匹配度、一键回填表单。',
    },
    {
      name: '三轮作业中心',
      from: '1.1新增',
      content: '初试、复试、终试作业，邮件电话追踪，答卷评分，存档和优秀案例沉淀。',
    },
    {
      name: '报表与多端',
      from: '1.0骨架',
      content: '日报、周报、月报、颜色阈值、Web优先、PWA安装、后续桌面和移动端封装。',
    },
  ]

  return (
    <section>
      <PageTitle
        title="V1.2 融合蓝图"
        subtitle="V1.2正式吸收1.0和1.1：重叠部分取更完整的一版，不重叠的作为补充模块并入同一套系统。"
      />
      <div className="grid two">
        <Card title="融合原则">
          <ol className="sop">
            <li>1.0保留：系统骨架、候选人池、简历风险、岗位画像、报表、多端路线。</li>
            <li>1.1吸收：9维初试、录音解析、三轮作业、销售专项问卷、端口Agent。</li>
            <li>重叠模块：以更可开发、更可量化、更有字段和SOP的版本为准。</li>
            <li>最终交付：同一套Web/PWA主系统，共用候选人档案、评分、问卷、报表和权限。</li>
          </ol>
        </Card>
        <Card title="融合后模块树">
          <div className="module-list">
            {mergedModules.map((module) => (
              <div className="module-item" key={module.name}>
                <div>
                  <strong>{module.name}</strong>
                  <p>{module.content}</p>
                </div>
                <span className="badge">{module.from}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="融合后开发优先级">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>阶段</th>
                <th>目标</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>第一阶段</td>
                <td>Web/PWA主系统</td>
                <td>当前已启动，先让网页端能跑、能看、能评分。</td>
              </tr>
              <tr>
                <td>第二阶段</td>
                <td>后端数据库和文件上传</td>
                <td>候选人、简历、录音、作业、评分、审计全部落库。</td>
              </tr>
              <tr>
                <td>第三阶段</td>
                <td>AI解析和Agent联动</td>
                <td>接ASR、简历解析、问卷生成、Sales/Tech Skills回填。</td>
              </tr>
              <tr>
                <td>第四阶段</td>
                <td>桌面和移动封装</td>
                <td>Mac/Windows用桌面壳，Android/iPad/iOS先PWA再封装。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}

function candidatePeerMatchText(candidate: Candidate) {
  return [
    candidate.postName,
    candidate.majorName,
    candidate.workType,
    candidate.transcript,
    candidate.agentSummary,
    ...candidate.skillTags,
    ...candidate.customFlags,
    ...candidate.evaluationInput.workExperiences.flatMap((experience) => [
      experience.company,
      experience.role,
      experience.direction,
      experience.achievements ?? '',
    ]),
  ].join(' ')
}

const sampleTalentArchiveContext: Record<number, TalentArchiveContext> = {
  1: { interviewStage: 'second' },
  2: {
    archiveNote: '能力和条件都合适，但薪酬预算暂时谈不拢，转入猎头长期维护。',
    interviewStage: 'final',
    salaryNegotiation: 'mismatch',
  },
  3: { interviewStage: 'first' },
  4: { archiveNote: '暂时用不上，但有AI系统开发储备价值。' },
}

function emptyMetricsWithVisits(visits: number) {
  return {
    ...{
      acceptedInterviews: 0,
      acceptedInvitations: 0,
      conversations: 0,
      emails: 0,
      invitations: 0,
      messages: 0,
      phones: 0,
      resumes: 0,
      wechat: 0,
      wechatExchanged: 0,
    },
    visits,
  }
}

function createJobPublishingCard(type: JobPostingType, index: number): JobPublishingCard {
  const seed: Record<JobPostingType, Pick<JobPublishingCard, 'department' | 'keywords' | 'targetHeadcount' | 'title'>> = {
    fullTime: {
      department: '待分配部门',
      keywords: ['全职', '长期岗位', '正式编制'],
      targetHeadcount: 1,
      title: `新增全职岗位${index}`,
    },
    doctoralIntern: {
      department: '科研与AI中心',
      keywords: ['博士实习生', '科研项目', '算法研究', '高专业壁垒'],
      targetHeadcount: 1,
      title: `新增博士实习生岗位${index}`,
    },
    hourly: {
      department: '劳务用工',
      keywords: ['小时工', '排班', '到岗确认'],
      targetHeadcount: 5,
      title: `新增小时工岗位${index}`,
    },
    masterIntern: {
      department: '产品与技术中心',
      keywords: ['硕士实习生', '研究型', '产品分析', '专业支持'],
      targetHeadcount: 2,
      title: `新增硕士实习生岗位${index}`,
    },
    partner: {
      department: '合作发展部',
      keywords: ['合伙人', '资源合作', '收益分成'],
      targetHeadcount: 1,
      title: `新增合伙人岗位${index}`,
    },
    partTime: {
      department: '项目协作',
      keywords: ['兼职', '项目制', '弹性协作'],
      targetHeadcount: 2,
      title: `新增兼职岗位${index}`,
    },
    secondaryIntern: {
      department: '基础岗位培养',
      keywords: ['中专实习生', '实训', '基础岗位', '批量储备'],
      targetHeadcount: 10,
      title: `新增中专实习生岗位${index}`,
    },
    undergraduateIntern: {
      department: '管培与项目助理',
      keywords: ['本科实习生', '管培储备', '项目助理', '校园招聘'],
      targetHeadcount: 4,
      title: `新增本科实习生岗位${index}`,
    },
    vocationalIntern: {
      department: '技能岗位培养',
      keywords: ['高职实习生', '技能岗位', '校企合作', '实习转正'],
      targetHeadcount: 8,
      title: `新增高职实习生岗位${index}`,
    },
  }
  const item = seed[type]
  const codeProfile = buildJobCodeProfile(item.title)

  return {
    ...item,
    ...codeProfile,
    hiredCount: 0,
    id: `${type}-${Date.now()}-${index}`,
    isFavorite: false,
    jdStatus: '草稿',
    postingType: type,
    variants: [
      {
        accountName: '黑卫士平台',
        angle: jobPostingTypeLabels[type],
        id: `${type}-draft-${index}`,
        jdTitle: item.title,
        metrics: emptyMetricsWithVisits(0),
        salary: '待填写',
      },
    ],
  }
}

function createDispatchContactMetrics(multiplier = 1): AutoDispatchCase['contactMetrics'] {
  return {
    acceptedChats: 2 * multiplier,
    acceptedInvitations: 3 * multiplier,
    conversations: 7 * multiplier,
    emails: 1 * multiplier,
    invitations: 4 * multiplier,
    messages: 9 * multiplier,
    phones: 2 * multiplier,
    replies: 3 * multiplier,
    resumes: 2 * multiplier,
    wechat: 2 * multiplier,
    wechatExchanged: 1 * multiplier,
  }
}

const defaultAutoDispatchCases: AutoDispatchCase[] = [
  {
    backupInterviewerName: '业务部门长',
    candidateElectronicConfirmed: true,
    candidateId: 1,
    candidateName: '李晨',
    candidateNotified: true,
    candidatePhoneConfirmed: true,
    candidateReplied: true,
    changeReason: '销售岗高分候选人，按阈值进入初试。',
    changeType: '首次安排',
    contactMetrics: createDispatchContactMetrics(3),
    interviewerElectronicConfirmed: true,
    interviewerName: '陈HR',
    interviewerNotified: true,
    interviewerPhoneConfirmed: true,
    interviewerReplied: true,
    interviewMode: '线上',
    location: '腾讯会议 123 456 789',
    meetingRoom: '腾讯会议',
    notifiedChannels: ['email', 'wechat', 'wecom'],
    platform: '腾讯会议',
    roundId: 'first',
    roundName: '初试',
    scheduledAt: '2026-06-20T15:00:00+08:00',
    score: 86,
    threshold: 80,
  },
  {
    backupInterviewerName: '财务总监',
    candidateElectronicConfirmed: false,
    candidateId: 2,
    candidateName: '周敏',
    candidateNotified: true,
    candidatePhoneConfirmed: false,
    candidateReplied: false,
    changeReason: '候选人需要改到线下面试，时间地点变更后未回复。',
    changeType: '地点变更',
    contactMetrics: createDispatchContactMetrics(2),
    interviewerElectronicConfirmed: false,
    interviewerName: '王主管',
    interviewerNotified: true,
    interviewerPhoneConfirmed: false,
    interviewerReplied: false,
    interviewMode: '线下',
    location: '上海总部 A-1001',
    meetingRoom: '一号会议室',
    notifiedChannels: ['sms', 'phone', 'email'],
    platform: '线下面试',
    roundId: 'second',
    roundName: '复试',
    scheduledAt: '2026-06-20T12:30:00+08:00',
    score: 82,
    threshold: 78,
  },
  {
    backupInterviewerName: '内容负责人',
    candidateElectronicConfirmed: false,
    candidateId: 3,
    candidateName: '陈琳',
    candidateNotified: true,
    candidatePhoneConfirmed: true,
    candidateReplied: false,
    changeReason: '候选人作业未提交，先改为电话复核。',
    changeType: '条件变更',
    contactMetrics: createDispatchContactMetrics(2),
    interviewerElectronicConfirmed: false,
    interviewerName: '内容主管',
    interviewerNotified: true,
    interviewerPhoneConfirmed: true,
    interviewerReplied: false,
    interviewMode: '电话',
    location: '公司招聘电话桥接',
    meetingRoom: '电话面试',
    notifiedChannels: ['phone', 'wechat'],
    platform: '电话会议',
    roundId: 'third',
    roundName: '终试',
    scheduledAt: '2026-06-20T17:00:00+08:00',
    score: 84,
    threshold: 80,
  },
  {
    backupInterviewerName: '技术负责人',
    candidateElectronicConfirmed: false,
    candidateId: 4,
    candidateName: '赵磊',
    candidateNotified: true,
    candidatePhoneConfirmed: false,
    candidateReplied: true,
    changeReason: '分数低于技术岗阈值，暂不安排正式面试，转储备库并等待项目证明。',
    changeType: '首次安排',
    contactMetrics: createDispatchContactMetrics(1),
    interviewerElectronicConfirmed: false,
    interviewerName: '技术负责人',
    interviewerNotified: true,
    interviewerPhoneConfirmed: false,
    interviewerReplied: true,
    interviewMode: '线上',
    location: '飞书会议待定',
    meetingRoom: '飞书会议',
    notifiedChannels: ['email'],
    platform: '飞书会议',
    roundId: 'first',
    roundName: '初试',
    scheduledAt: '2026-06-21T10:00:00+08:00',
    score: 62,
    threshold: 75,
  },
]

function buildAutoDispatchSearchEntries(): GlobalSearchEntry[] {
  return defaultAutoDispatchCases.map((item) => ({
    candidateId: item.candidateId,
    detail: `${item.candidateName} / ${item.roundName} / ${item.changeType} / ${item.platform} / ${item.location}`,
    id: `auto-dispatch-${item.candidateId}-${item.roundId}`,
    kind: 'auto-dispatch',
    keywords: [
      item.candidateName,
      item.interviewerName,
      item.backupInterviewerName ?? '',
      item.changeType,
      item.changeReason,
      item.roundName,
      item.location,
      item.platform,
      '自动分工',
      '自动分配',
      '双向确认',
      '电话确认',
      '报警',
      '改期',
      '时间地点',
    ],
    section: '自动分工',
    sectionId: 'autoDispatch',
    title: `${item.candidateName} ${item.roundName}排班`,
  }))
}

function Candidates({
  candidates,
  selectedId,
  setSelectedId,
  updateCandidate,
}: {
  candidates: Candidate[]
  selectedId: number
  setSelectedId: (id: number) => void
  updateCandidate: (candidateId: number, patch: Partial<Candidate>) => void
}) {
  const [sortDirection, setSortDirection] = useState<CandidatePoolSort>('newest')
  const [visibleColumns, setVisibleColumns] = useState<CandidatePoolColumn[]>(defaultCandidatePoolColumns)
  const [manualDisplayFields, setManualDisplayFields] = useState<string[]>([])
  const [customDisplayField, setCustomDisplayField] = useState('')
  const [focusTags, setFocusTags] = useState<string[]>(defaultCandidateFocusTags)
  const [customFocusTag, setCustomFocusTag] = useState('')
  const [statusNote, setStatusNote] = useState('')
  const selectedCandidate = candidates.find((candidate) => candidate.id === selectedId) ?? candidates[0]
  const sortedCandidates = sortCandidates(candidates, sortDirection, focusTags)
  const talentLibraryBoard = buildTalentLibraryBoard(candidates, sampleTalentArchiveContext)
  const displayDensity = displayFieldDensityClass(visibleColumns.length + manualDisplayFields.length)
  const talentLayerByPostType: Record<Candidate['postType'], CandidatePoolTalentLayer> = {
    finance: '基层干部',
    function: '执行层',
    hr: '基层干部',
    management: '中层干部',
    operation: '执行层',
    sales: '中层干部',
    tech: '技术层',
  }
  const salaryBudgetByPostType: Record<Candidate['postType'], { min: number; max: number }> = {
    finance: { min: 10, max: 16 },
    function: { min: 8, max: 14 },
    hr: { min: 9, max: 15 },
    management: { min: 18, max: 32 },
    operation: { min: 7, max: 13 },
    sales: { min: 12, max: 22 },
    tech: { min: 15, max: 30 },
  }
  const followupQueue = sortedCandidates
    .map((candidate) => {
      const budget = salaryBudgetByPostType[candidate.postType]
      const strategy = buildCandidateFollowupStrategy({
        candidate,
        focusTags,
        modelScore: candidateMatchScore(candidate, focusTags),
        now: '2026-06-19T14:20:00+08:00',
        salaryBudgetMax: budget.max,
        salaryBudgetMin: budget.min,
        talentLayer: talentLayerByPostType[candidate.postType],
      })

      return { candidate, strategy }
    })
    .sort((left, right) => right.strategy.urgencyScore - left.strategy.urgencyScore)
  const aiTimeoutFallbackCandidate = followupQueue[0]?.candidate
  const aiTimeoutFallbackPreview = aiTimeoutFallbackCandidate
    ? buildAiTimeoutFallbackStrategy({
        candidate: aiTimeoutFallbackCandidate,
        lastHumanActionAt: '2026-06-19T11:05:00+08:00',
        manualOwner: 'HR王',
        now: '2026-06-19T14:20:00+08:00',
        templateId: 'resume-received-basic',
        templates: defaultAiTimeoutFallbackTemplates,
        timeoutMinutes: 120,
      })
    : null
  const sortOptions: Array<{ id: CandidatePoolSort; label: string }> = [
    { id: 'newest', label: '最新投递' },
    { id: 'oldest', label: '最早投递' },
    { id: 'scoreHigh', label: '分数最高' },
    { id: 'scoreLow', label: '分数最低' },
    { id: 'matchHigh', label: '匹配度最高' },
  ]
  const statusOptions: CandidateStatus[] = ['待初试', '推荐复试', '待作业', '储备', '录用', '淘汰']
  const addCustomFocusTag = () => {
    const nextTag = customFocusTag.trim()
    if (!nextTag || focusTags.includes(nextTag)) return
    setFocusTags((tags) => [...tags, nextTag])
    setCustomFocusTag('')
  }
  const addCustomDisplayField = () => {
    setManualDisplayFields((fields) => addManualDisplayField(fields, customDisplayField))
    setCustomDisplayField('')
  }
  const updateCandidateStatus = (status: CandidateStatus) => {
    const note = statusNote.trim()
    updateCandidate(selectedCandidate.id, {
      operationLog: [
        {
          action: '状态流转',
          at: new Date().toISOString(),
          fromStatus: selectedCandidate.status,
          note: note || undefined,
          toStatus: status,
        },
        ...(selectedCandidate.operationLog ?? []),
      ].slice(0, 12),
      status,
    })
    setStatusNote('')
  }

  return (
    <section>
      <PageTitle
        title={candidateBoardLayoutPreference.title}
        subtitle="横向长条展示最新简历、分数高低、全向匹配度、资料完整度、平台活跃度来源、期望薪酬、工作经历、岗位缩写和关键词颜色。"
        action={
          <div className="candidate-sort-actions">
            {sortOptions.map((option) => (
              <button
                className={sortDirection === option.id ? 'button primary' : 'button'}
                key={option.id}
                onClick={() => setSortDirection(option.id)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        }
      />
      <Card title="显示字段">
        <div className={`candidate-column-grid density-${displayDensity}`}>
          {(Object.keys(candidatePoolColumnLabels) as CandidatePoolColumn[]).map((column) => (
            <button
              className={visibleColumns.includes(column) ? 'column-toggle active' : 'column-toggle'}
              key={column}
              onClick={() => setVisibleColumns((columns) => toggleCandidatePoolColumn(columns, column))}
              type="button"
            >
              {candidatePoolColumnLabels[column]}
            </button>
          ))}
        </div>
        <div className="inline-control">
          <input
            onChange={(event) => setCustomDisplayField(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addCustomDisplayField()
            }}
            placeholder="手动增加显示字段，例如：叉车证、视频号运营、CPA"
            value={customDisplayField}
          />
          <button className="button" onClick={addCustomDisplayField} type="button">
            增加字段
          </button>
        </div>
        {manualDisplayFields.length > 0 && (
          <div className={`manual-field-list density-${displayDensity}`}>
            {manualDisplayFields.map((field) => (
              <span className="mini-chip on" key={field}>{field}</span>
            ))}
          </div>
        )}
        <p className="muted">当前展示字段 {visibleColumns.length + manualDisplayFields.length} 个；字段过多时系统自动压缩字号和间距。</p>
        <div className="notice">
          <strong>合规提示：</strong>
          {restrictedCandidateFields.join('、')}属于敏感或高风险字段，不进入默认筛选评分；系统优先展示岗位相关能力、履历和沟通状态。
        </div>
      </Card>
      <Card title="重点关注项">
        <div className={`candidate-focus-grid density-${displayFieldDensityClass(focusTags.length)}`}>
          {suggestedCandidateFocusTags.map((tag) => (
            <button
              className={focusTags.includes(tag) ? 'focus-toggle active' : 'focus-toggle'}
              key={tag}
              onClick={() =>
                setFocusTags((tags) => (tags.includes(tag) ? tags.filter((item) => item !== tag) : [...tags, tag]))
              }
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="inline-control">
          <input
            onChange={(event) => setCustomFocusTag(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addCustomFocusTag()
            }}
            placeholder="新增关注项，例如：视频号运营、CPA、叉车证"
            value={customFocusTag}
          />
          <button className="button" onClick={addCustomFocusTag} type="button">
            加入关注
          </button>
        </div>
        <p className="muted">
          已关注 {focusTags.length} 项；技能列会优先显示命中的关注项，再展示候选人简历中的其他技能标签。
        </p>
      </Card>
      <Card title="候选人状态流转">
        <div className="candidate-status-flow">
          <div>
            <span>当前候选人</span>
            <strong>{selectedCandidate.name}</strong>
            <p>
              {candidateJobCode(selectedCandidate)} / {selectedCandidate.postName} / 当前状态：
              {selectedCandidate.status}
            </p>
          </div>
          <div className="candidate-status-actions">
            {statusOptions.map((status) => (
              <button
                className={selectedCandidate.status === status ? 'status-flow-button active' : 'status-flow-button'}
                key={status}
                onClick={() => updateCandidateStatus(status)}
                type="button"
              >
                {status}
              </button>
            ))}
          </div>
          <div className="candidate-status-note">
            <input
              onChange={(event) => setStatusNote(event.target.value)}
              placeholder="状态备注，例如：已电话确认，薪资待谈，需补作品"
              value={statusNote}
            />
          </div>
          <div className="candidate-operation-log">
            {(selectedCandidate.operationLog ?? []).slice(0, 4).map((log) => (
              <div key={`${log.at}-${log.action}-${log.toStatus}`}>
                <span>{candidateOperationTimeText(log.at)}</span>
                <strong>{`${log.fromStatus ?? '原状态'} -> ${log.toStatus ?? selectedCandidate.status}`}</strong>
                <p>{log.note || log.action}</p>
              </div>
            ))}
            {!(selectedCandidate.operationLog ?? []).length && <p className="muted">暂无操作记录，状态变更后会自动留痕。</p>}
          </div>
          <p className="muted">状态变更会保存到本机数据；刷新页面后仍保留。</p>
        </div>
      </Card>
      <Card title="简历库分层">
        <div className="talent-summary-grid">
          <div>
            <span>入库候选人</span>
            <strong>{talentLibraryBoard.summary.totalCandidates}</strong>
          </div>
          <div>
            <span>已启用分层</span>
            <strong>{talentLibraryBoard.summary.totalGroups}</strong>
          </div>
          <div>
            <span>高匹配</span>
            <strong>{talentLibraryBoard.summary.highMatchCount}</strong>
          </div>
          <div>
            <span>条件谈不拢</span>
            <strong>{talentLibraryBoard.summary.salaryMismatchCount}</strong>
          </div>
        </div>
        <div className="talent-library-strip">
          {(['senior', 'headhunter', 'qualified', 'reserve', 'firstInterview', 'secondInterview', 'finalInterview', 'salaryMismatchHeadhunter'] as TalentLibraryGroupId[]).map((groupId) => {
            const group = talentLibraryBoard.groupsById[groupId]

            return (
              <div className={`talent-library-pill tone-${group.tone}`} key={group.id}>
                <span>{group.label}</span>
                <strong>{group.candidates.length}</strong>
              </div>
            )
          })}
        </div>
        <div className="notice">
          能力和条件都合适，但薪酬或合作条件暂时谈不拢的人，转入「条件谈不拢猎头库」和「猎头人才库」长期维护；初试、复试、终试、实习、合伙等库都和面试档案联动。
        </div>
      </Card>
      <Card title="候选人优先跟进队列">
        <div className="followup-queue-list">
          {followupQueue.slice(0, 5).map(({ candidate, strategy }) => (
            <div className="followup-queue-row" key={candidate.id}>
              <div>
                <strong>{candidate.name}</strong>
                <p>
                  {candidateJobCode(candidate)} / {candidate.postName} / {strategy.timeWindow.label}
                  {strategy.timeWindow.hoursSinceApplied === null ? '' : ` / 已过${strategy.timeWindow.hoursSinceApplied}小时`}
                </p>
              </div>
              <div>
                <span className={`match-status-badge tone-${strategy.priority === '立即联系' ? 'excellent' : strategy.priority === '优先跟进' ? 'good' : strategy.priority === '常规跟进' ? 'normal' : 'weak'}`}>
                  {strategy.priority}
                </span>
                <strong>{strategy.urgencyScore}</strong>
              </div>
              <div>
                <p>{strategy.reasons.join('、')}</p>
                <small>{strategy.nextAction}</small>
              </div>
              <div>
                <span>{strategy.archiveAdvice.library}</span>
                <small>{strategy.archiveAdvice.reviewCadence}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="notice">{followupQueue[0]?.strategy.aiFallbackBoundary}</div>
      </Card>
      <Card title="AI超时兜底草稿">
        {aiTimeoutFallbackPreview && aiTimeoutFallbackCandidate ? (
          <div className="ai-fallback-panel">
            <div className="ai-fallback-head">
              <div>
                <strong>{aiTimeoutFallbackCandidate.name} / {aiTimeoutFallbackCandidate.postName}</strong>
                <p>
                  {aiTimeoutFallbackPreview.mode} / 等待
                  {aiTimeoutFallbackPreview.minutesSinceLastHumanAction ?? '待核'}分钟 / 外发权限：
                  {aiTimeoutFallbackPreview.externalSendAllowed ? '允许' : '不允许'}
                </p>
              </div>
              <span className={aiTimeoutFallbackPreview.canUseAiFallback ? 'badge level-A' : 'badge level-D'}>
                {aiTimeoutFallbackPreview.canUseAiFallback ? '可生成草稿' : '人工优先'}
              </span>
            </div>
            <div className="fallback-message-draft">
              {aiTimeoutFallbackPreview.messageDraft || aiTimeoutFallbackPreview.nextAction}
            </div>
            <div className="audit-trail-list">
              {aiTimeoutFallbackPreview.auditTrail.map((event) => (
                <div key={`${event.event}-${event.detail}`}>
                  <span>{event.event}</span>
                  <p>{event.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="notice">暂无候选人进入AI超时兜底预览。</div>
        )}
      </Card>
      <Card title="候选看板长条列表">
        <div className="candidate-board-list">
          {sortedCandidates.map((candidate, index) => {
            const matchScore = candidateMatchScore(candidate, focusTags)
            const matchStatus = candidateMatchStatus(matchScore)
            const matches = candidateFocusMatches(candidate, focusTags)
            const counts = dataFieldStatusCounts(candidate)
            const peerMatch = peerKeywordWeight(candidatePeerMatchText(candidate), defaultDepartmentBenchmarkBrief)

            return (
              <button
                className={[
                  'candidate-board-row',
                  `tone-${candidateBoardRowTone(index)}`,
                  selectedId === candidate.id ? 'selected' : '',
                ].join(' ')}
                key={candidate.id}
                onClick={() => setSelectedId(candidate.id)}
                type="button"
              >
                <div className="candidate-row-identity">
                  <div className="candidate-name-line">
                    <strong>{candidate.name}</strong>
                    <span>{candidatePlatformAccountText(candidate)}</span>
                  </div>
                  <small>{candidate.phone}</small>
                  <small>{candidate.communication.addedWechat ? `微信：已添加` : `邮箱：${candidate.email}`}</small>
                </div>

                <div className="candidate-row-main">
                  <div className="candidate-row-title">
                    <span>{candidateBoardTimeText(candidate.appliedAt)} / {candidate.source}</span>
                    <strong>
                      <span className="job-code-badge compact">{candidateJobCode(candidate)}</span>
                      <span>{candidate.postName}</span>
                      <small>{candidate.majorName} / {candidate.workType}</small>
                    </strong>
                  </div>
                  <div className="candidate-row-meta">
                    {visibleColumns.includes('salary') && <span>{salaryRangeText(candidate)}</span>}
                    {visibleColumns.includes('location') && <span>{candidate.currentLocation} / {candidate.workCities.join('、')}</span>}
                    {visibleColumns.includes('experience') && <span>{jobHopSummary(candidate)}</span>}
                    {visibleColumns.includes('availability') && <span>{candidate.availabilityStatus}</span>}
                    {visibleColumns.includes('education') && <span>{candidate.educationLevel} / 第一学历{candidate.firstDegreeLevel}</span>}
                  </div>
                  {visibleColumns.includes('skills') && (
                    <div className="candidate-row-tags">
                      {matches.slice(0, 5).map((tag) => (
                        <span className={`keyword-chip tone-${candidateKeywordTone(tag)}`} key={tag}>{tag}</span>
                      ))}
                      {[...candidate.skillTags, ...candidate.customFlags].filter((tag) => !matches.includes(tag)).slice(0, 4).map((tag) => (
                        <span className={`keyword-chip tone-${candidateKeywordTone(tag)}`} key={tag}>{tag}</span>
                      ))}
                      {manualDisplayFields.slice(0, 3).map((field) => (
                        <span className="keyword-chip tone-orange" key={`${candidate.id}-${field}`}>{field}：待补充</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="candidate-row-score">
                  <span className={`match-status-badge tone-${matchStatus.tone}`}>{matchStatus.label}</span>
                  <strong>{matchScore}</strong>
                  <small>全向匹配度 / 综合 {candidate.totalScore} / {candidate.totalLevel}</small>
                </div>

                <div className="candidate-row-signals">
                  {visibleColumns.includes('contact') && (
                    <div className="candidate-signal-line">
                      <span className={candidate.communication.sentEmail ? 'mini-chip on' : 'mini-chip'}>邮件</span>
                      <span className={candidate.communication.sentResume ? 'mini-chip on' : 'mini-chip'}>简历</span>
                      <span className={candidate.communication.addedWechat ? 'mini-chip on' : 'mini-chip'}>微信</span>
                      <span className={candidate.communication.exchangedPhone ? 'mini-chip on' : 'mini-chip'}>电话</span>
                    </div>
                  )}
                  <div className="candidate-signal-text">
                    {visibleColumns.includes('activity') && <span>平台活跃度来源：{candidate.platformActivity.refreshFrequency} / {candidate.platformActivity.activitySource}</span>}
                    {visibleColumns.includes('matchStatus') && <span>关注 {matches.length}/{focusTags.length}</span>}
                    {visibleColumns.includes('fieldStatus') && <span>资料完整度：{counts['已采集']} 已采集</span>}
                    {visibleColumns.includes('peerWeight') && <span>同业同行权重：{peerMatch.score} 分</span>}
                  </div>
                </div>

                <div className="candidate-row-status">
                  <span className={`badge level-${candidate.totalLevel}`}>{candidate.status}</span>
                  <small>{candidate.risks.length ? candidate.risks[0] : '低风险'}</small>
                </div>
              </button>
            )
          })}
        </div>
      </Card>
    </section>
  )
}

function TalentLibrary({
  candidates,
  updateCandidate,
}: {
  candidates: Candidate[]
  updateCandidate: (candidateId: number, patch: Partial<Candidate>) => void
}) {
  const board = buildTalentLibraryBoard(candidates, sampleTalentArchiveContext)
  const focusGroups: TalentLibraryGroupId[] = [
    'salaryMismatchHeadhunter',
    'highMatch',
    'seniorExecutive',
    'seniorManagement',
    'seniorBusiness',
    'seniorTechnical',
    'reserve',
    'firstInterview',
    'secondInterview',
    'finalInterview',
  ]
  const archiveCandidateById = (candidateId: number, status: CandidateStatus, note: string) => {
    const candidate = candidates.find((item) => item.id === candidateId)
    if (!candidate) return

    updateCandidate(candidateId, {
      operationLog: [
        {
          action: '简历库归档',
          at: new Date().toISOString(),
          fromStatus: candidate.status,
          note,
          toStatus: status,
        },
        ...(candidate.operationLog ?? []),
      ].slice(0, 12),
      status,
    })
  }

  return (
    <section>
      <PageTitle
        title="简历库"
        subtitle="把所有候选人按岗位价值、面试阶段、薪酬谈判和长期维护价值分层。能力合适但条件暂时谈不拢的人，进入猎头库长期维护。"
      />
      <div className="stat-grid">
        <Stat title="简历库总人数" value={board.summary.totalCandidates} note="和候选人池联动" color="blue" />
        <Stat title="已启用分层" value={board.summary.totalGroups} note="按业务规则自动入库" color="green" />
        <Stat title="高匹配度" value={board.summary.highMatchCount} note="可优先触达" color="green" />
        <Stat title="条件谈不拢" value={board.summary.salaryMismatchCount} note="转入猎头库维护" color="orange" />
        <Stat title="面试档案联动" value="初试/复试/终试" note="档案和人才库同步" color="black" />
      </div>

      <div className="grid two">
        <Card title="转库规则">
          <ol className="sop">
            <li>综合分高、履历完整、岗位匹配度高的人，进入高级人才库和高匹配度人才库。</li>
            <li>已经进入初试、复试、终试的人，分别进入初试、复试、终试面试库。</li>
            <li>条件合适但薪酬谈不拢的人，进入条件谈不拢猎头库，并继续保持长期维护。</li>
            <li>暂时用不上但有价值的人，进入储备人才库，后续可重新激活。</li>
            <li>应届、实习、校招、项目合作、兼职、合伙人分别进入对应人才库。</li>
          </ol>
          <div className="notice">
            这个简历库不是单纯的收纳夹，而是候选人池、面试档案、薪酬谈判和后续维护的一体化归档层。
          </div>
        </Card>
        <Card title="重点库分布">
          <div className="talent-library-strip">
            {focusGroups.map((groupId) => {
              const group = board.groupsById[groupId]

              return (
                <div className={`talent-library-pill tone-${group.tone}`} key={group.id}>
                  <span>{group.label}</span>
                  <strong>{group.candidates.length}</strong>
                </div>
              )
            })}
          </div>
          <div className="notice">
            默认展示高级经营者、高级管理者、高级业务人员、高级技术人员、高匹配度和条件谈不拢猎头库；后续可把每个库点开成独立列表。
          </div>
        </Card>
      </div>

      <div className="library-grid">
        {board.groups.map((group) => (
          <Card title={group.label} key={group.id}>
            <p className="muted">{group.description}</p>
            <div className="mini-chip-grid">
              <span className="mini-chip on">{group.candidates.length} 人</span>
              <span className="mini-chip">{group.tone} 色分层</span>
            </div>
            <div className="library-candidate-list">
              {group.candidates.length ? (
                group.candidates.map((candidate) => (
                  <div className="library-candidate-row" key={`${group.id}-${candidate.id}`}>
                    <div>
                      <strong>{candidate.name}</strong>
                      <p>{candidate.postName} / {candidate.status}</p>
                    </div>
                    <div>
                      <span className={`badge level-${candidate.totalLevel}`}>{candidate.totalLevel}</span>
                      <small>{candidate.totalScore} 分</small>
                    </div>
                    <div className="library-row-actions">
                      <button
                        className="table-action"
                        onClick={() => archiveCandidateById(candidate.id, '储备', `从${group.label}转入储备维护`)}
                        type="button"
                      >
                        转储备
                      </button>
                      <button
                        className="table-action"
                        onClick={() => archiveCandidateById(candidate.id, '淘汰', `从${group.label}归档淘汰`)}
                        type="button"
                      >
                        归档淘汰
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state small">
                  <strong>暂无候选人</strong>
                  <p>当前没有人进入这个人才库。</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function FirstEvaluation({
  selected,
  updateSelected,
}: {
  selected: Candidate
  updateSelected: (patch: Partial<Candidate>) => void
}) {
  const firstEvaluationStorage = browserLocalStorage()
  const [dimensionOrders, setDimensionOrders] = useState<typeof postTypeDimensionOrders>(() => ({
    ...postTypeDimensionOrders,
    ...readPersistedValue(firstEvaluationStorage, localPersistenceKeys.firstEvaluationDimensionOrders, {}),
  }))
  const [dimensionLayoutLocked, setDimensionLayoutLocked] = useState(true)
  const [draggedDimensionId, setDraggedDimensionId] = useState<FirstEvaluationDimensionId | null>(null)
  const [manualDimensionName, setManualDimensionName] = useState('')
  const [manualDimensionsByCandidate, setManualDimensionsByCandidate] = useState<Record<number, FirstEvaluationRow[]>>(() =>
    readPersistedValue(firstEvaluationStorage, localPersistenceKeys.firstEvaluationManualDimensions, {}),
  )
  const activeOrder = dimensionOrders[selected.postType]
  const dimensions = createFirstEvaluationRows(selected.evaluationInput, activeOrder)
  const manualDimensions = manualDimensionsByCandidate[selected.id] ?? []
  const scoreRows = [...dimensions, ...manualDimensions]
  const weightedAverage = calculateFirstEvaluationWeightedAverage(scoreRows)
  const radar = buildRadarPolygonPoints(dimensions, 112, 112, 84)
  const radarAxisPoints = dimensions.map((dimension, index) => {
    const angle = (Math.PI * 2 * index) / dimensions.length - Math.PI / 2
    return {
      ...dimension,
      labelX: 112 + Math.cos(angle) * 101,
      labelY: 112 + Math.sin(angle) * 101,
      x: 112 + Math.cos(angle) * 84,
      y: 112 + Math.sin(angle) * 84,
    }
  })
  const changeActiveOrder = (updater: (order: FirstEvaluationDimensionId[]) => FirstEvaluationDimensionId[]) => {
    setDimensionOrders((orders) => ({
      ...orders,
      [selected.postType]: updater(orders[selected.postType]),
    }))
  }
  const moveDimension = (
    dimensionId: FirstEvaluationDimensionId,
    direction: 'up' | 'down',
  ) => {
    const currentIndex = activeOrder.indexOf(dimensionId)
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const targetId = activeOrder[targetIndex]
    if (!targetId) return
    changeActiveOrder((order) => moveFirstEvaluationDimension(order, dimensionId, targetId))
  }
  const addManualDimension = () => {
    const nextDimension = createManualFirstEvaluationDimension(
      manualDimensionName,
      dimensions.length + manualDimensions.length + 1,
    )
    const sameLabel = manualDimensions.some((dimension) => dimension.label === nextDimension.label)
    setManualDimensionsByCandidate((records) => ({
      ...records,
      [selected.id]: [
        ...(records[selected.id] ?? []),
        sameLabel
          ? { ...nextDimension, id: `${nextDimension.id}-${Date.now()}` as FirstEvaluationRow['id'] }
          : nextDimension,
      ],
    }))
    setManualDimensionName('')
  }
  const removeManualDimension = (dimensionId: FirstEvaluationRow['id']) => {
    setManualDimensionsByCandidate((records) => ({
      ...records,
      [selected.id]: (records[selected.id] ?? []).filter((dimension) => dimension.id !== dimensionId),
    }))
  }

  useEffect(() => {
    writePersistedValue(firstEvaluationStorage, localPersistenceKeys.firstEvaluationDimensionOrders, dimensionOrders)
  }, [dimensionOrders, firstEvaluationStorage])

  useEffect(() => {
    writePersistedValue(firstEvaluationStorage, localPersistenceKeys.firstEvaluationManualDimensions, manualDimensionsByCandidate)
  }, [firstEvaluationStorage, manualDimensionsByCandidate])
  const recommendForReview = () => {
    const nextStatus: CandidateStatus = '推荐复试'
    updateSelected({
      operationLog: [
        {
          action: '初试评分推荐复试',
          at: new Date().toISOString(),
          fromStatus: selected.status,
          note: `初试加权均分 ${weightedAverage}`,
          toStatus: nextStatus,
        },
        ...(selected.operationLog ?? []),
      ].slice(0, 12),
      status: nextStatus,
    })
  }

  return (
    <section>
      <PageTitle
        title="通用人事初试评估"
        subtitle={`${selected.name} / ${selected.postName}，9大维度0-10分；当前顺序代表重要性，越靠前权重越高。`}
        action={
          <>
            <span className="badge">加权均分 {weightedAverage}</span>
            <button className="button primary" onClick={recommendForReview}>推荐复试</button>
          </>
        }
      />
      <div className="grid two">
        <Card
          action={
            <div className="card-title-actions">
              <button
                className="button"
                onClick={() => setDimensionLayoutLocked((locked) => !locked)}
                type="button"
              >
                {dimensionLayoutLocked ? <Lock size={14} /> : <Unlock size={14} />}
                {dimensionLayoutLocked ? '解锁排序' : '锁定排序'}
              </button>
              <button
                className="button"
                onClick={() =>
                  setDimensionOrders((orders) => ({
                    ...orders,
                    [selected.postType]: postTypeDimensionOrders[selected.postType],
                  }))
                }
                type="button"
              >
                <RotateCcw size={14} />
                恢复岗位默认
              </button>
            </div>
          }
          title="9大维度评分"
        >
          <div className="dimension-priority-head">
            <div>
              <strong>{selected.postName} 默认优先级</strong>
              <p>九维为标准蜘蛛网；下方评分长条可手动增加或删除补充维度，正式版可保存为岗位模板。</p>
            </div>
            <span className={dimensionLayoutLocked ? 'mini-chip' : 'mini-chip on'}>
              {dimensionLayoutLocked ? '排序已锁定' : '可拖拽排序'}
            </span>
          </div>
          <div className="dimension-custom-form">
            <input
              onChange={(event) => setManualDimensionName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') addManualDimension()
              }}
              placeholder="新增维度，如抗压能力、学习能力、岗位短板"
              value={manualDimensionName}
            />
            <button className="button" onClick={addManualDimension} type="button">
              <Plus size={14} />
              增加维度
            </button>
            <span className="mini-chip">已补充 {manualDimensions.length}</span>
          </div>
          <div className="radar-panel">
            <div className="radar-panel-title">
              <strong>九维蜘蛛网评分图</strong>
              <p>越靠外代表该维度表现越强；下方按三列三行显示标准九维，自定义维度只进入评分长条。</p>
            </div>
            <div className="radar-chart" aria-label="九维蜘蛛网评分图">
              <svg role="img" viewBox="0 0 224 224">
                <title>九维蜘蛛网评分图</title>
                {[0.25, 0.5, 0.75, 1].map((level) => {
                  const ring = buildRadarPolygonPoints(
                    dimensions.map(() => ({ score: level * 10 })),
                    112,
                    112,
                    84,
                  )
                  return <polygon className="radar-ring" key={level} points={ring.pointString} />
                })}
                {radarAxisPoints.map((axis) => (
                  <line className="radar-axis" key={axis.id} x1="112" x2={axis.x} y1="112" y2={axis.y} />
                ))}
                <polygon className="radar-area" points={radar.pointString} />
                <polyline className="radar-line" points={radar.pointString} />
                {radar.points.map((point, index) => (
                  <circle className="radar-dot" cx={point.x} cy={point.y} key={dimensions[index].id} r="3.5" />
                ))}
              </svg>
            </div>
            <div className="radar-legend">
              {radarAxisPoints.map((axis) => (
                <div className="radar-legend-item" key={axis.id}>
                  <span>{axis.importanceRank}</span>
                  <strong>{axis.label}</strong>
                  <em>{axis.score}</em>
                </div>
              ))}
            </div>
          </div>
          <div className={`dimension-list dimension-list-${firstEvaluationLayoutPreference.density}`}>
            {scoreRows.map((dimension, index) => (
              (() => {
                const isCustomDimension = Boolean(dimension.isCustom)
                return (
              <div
                className={`score-line dimension-line dimension-line-${firstEvaluationLayoutPreference.mode} ${isCustomDimension ? 'custom' : ''} ${dimensionLayoutLocked || isCustomDimension ? 'locked' : 'unlocked'} ${dimension.includedInScore ? '' : 'disabled'}`}
                draggable={!dimensionLayoutLocked && !isCustomDimension}
                key={dimension.id}
                onDragEnd={() => setDraggedDimensionId(null)}
                onDragOver={(event) => {
                  if (!dimensionLayoutLocked && !isCustomDimension) event.preventDefault()
                }}
                onDragStart={(event) => {
                  if (dimensionLayoutLocked || isCustomDimension) return
                  setDraggedDimensionId(dimension.id as FirstEvaluationDimensionId)
                  event.dataTransfer.effectAllowed = 'move'
                  event.dataTransfer.setData('text/plain', dimension.id)
                }}
                onDrop={(event) => {
                  event.preventDefault()
                  if (dimensionLayoutLocked || isCustomDimension) return
                  const draggedId = (draggedDimensionId || event.dataTransfer.getData('text/plain')) as FirstEvaluationDimensionId
                  if (!draggedId || draggedId === dimension.id) return
                  changeActiveOrder((order) => moveFirstEvaluationDimension(order, draggedId, dimension.id as FirstEvaluationDimensionId))
                  setDraggedDimensionId(null)
                }}
              >
                <div className="dimension-main">
                  <div className="dimension-rank">
                    <span>{dimension.importanceRank}</span>
                    <GripVertical size={15} />
                  </div>
                  <div>
                    <div className="dimension-title-row">
                      <strong>{dimension.label}</strong>
                      <div className="mini-chip-grid">
                        <span className="mini-chip on">权重 {dimension.weight}</span>
                        <span className="mini-chip">{dimension.includedInScore ? '计分' : '不计分'}</span>
                        {isCustomDimension && <span className="mini-chip">自定义</span>}
                      </div>
                    </div>
                    <p>{dimension.includedInScore ? dimension.description : '非管理岗默认不计分；管理岗模板会自动前置。'}</p>
                    <div className="dimension-compact-detail">
                      <span>{dimension.autoFillText}</span>
                      <span>字段：{dimension.captureFields.slice(0, 5).join(' / ')}</span>
                      <span>说明：{dimension.detailNotes.slice(0, 3).join('；')}</span>
                    </div>
                    {(dimension.remediationPlan || dimension.complianceNote) && (
                      <div className="dimension-compact-note">
                        {dimension.remediationPlan && <span>补救：{dimension.remediationPlan}</span>}
                        {dimension.complianceNote && <span>合规：{dimension.complianceNote}</span>}
                      </div>
                    )}
                  </div>
                </div>
                <div className="meter">
                  <span style={{ width: `${dimension.score * 10}%` }} />
                </div>
                <div className="dimension-score-actions">
                  <input defaultValue={dimension.score} />
                  <div className="step-actions">
                    <button
                      aria-label={`${dimension.label}上移`}
                      className="icon-button"
                      disabled={dimensionLayoutLocked || isCustomDimension || index === 0}
                      onClick={() => moveDimension(dimension.id as FirstEvaluationDimensionId, 'up')}
                      type="button"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      aria-label={`${dimension.label}下移`}
                      className="icon-button"
                      disabled={dimensionLayoutLocked || isCustomDimension || index >= dimensions.length - 1}
                      onClick={() => moveDimension(dimension.id as FirstEvaluationDimensionId, 'down')}
                      type="button"
                    >
                      <ArrowDown size={14} />
                    </button>
                    {isCustomDimension && (
                      <button
                        aria-label={`删除${dimension.label}`}
                        className="icon-button danger"
                        onClick={() => removeManualDimension(dimension.id)}
                        type="button"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
                )
              })()
            ))}
          </div>
        </Card>
        <Card title="AI初试摘要">
          <textarea defaultValue={selected.transcript} />
          <div className="notice">
            <strong>综合建议：</strong>
            {selected.agentSummary}
          </div>
          <div className="chips">
            {selected.strengths.slice(0, 6).map((item) => (
              <span className="chip good" key={item}>{item}</span>
            ))}
            {selected.risks.slice(0, 4).map((item) => (
              <span className="chip warn" key={item}>{item}</span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

function BusinessQuestionnaire({ selected }: { selected: Candidate }) {
  const questionnaireStorage = browserLocalStorage()
  const [questionnaireCards, setQuestionnaireCards] = useState<JobQuestionnaireCard[]>(() =>
    readPersistedValue(questionnaireStorage, localPersistenceKeys.jobQuestionnaireCards, defaultJobQuestionnaireCards),
  )
  const defaultCardId = questionnaireCards.find((card) => card.roleType === selected.postType)?.id ?? questionnaireCards[0].id
  const [activeCardId, setActiveCardId] = useState(defaultCardId)
  const [jdDraft, setJdDraft] = useState(`${selected.postName}：要求候选人具备岗位专业能力、可验证业绩、项目落地能力、复盘能力和长期成长意愿。`)
  const [manualQuestion, setManualQuestion] = useState('请结合过往经历说明你最匹配本岗位的一个案例。')
  const activeCard = questionnaireCards.find((card) => card.id === activeCardId) ?? questionnaireCards[0]
  const sampleScores = Object.fromEntries(activeCard.questions.map((questionItem, index) => [questionItem.id, index % 3 === 1 ? -1 : 1]))
  const questionnaireScore = calculateQuestionnaireScore(activeCard.questions, sampleScores)
  const updateActiveCard = (updater: (card: JobQuestionnaireCard) => JobQuestionnaireCard) => {
    setQuestionnaireCards((cards) => cards.map((card) => (card.id === activeCard.id ? updater(card) : card)))
  }
  const addCustomCard = () => {
    const nextCard = createQuestionnaireCard('新增岗位问卷', selected.postType)
    setQuestionnaireCards((cards) => [...cards, nextCard])
    setActiveCardId(nextCard.id)
  }

  useEffect(() => {
    writePersistedValue(questionnaireStorage, localPersistenceKeys.jobQuestionnaireCards, questionnaireCards)
  }, [questionnaireCards, questionnaireStorage])

  return (
    <section>
      <PageTitle
        title="岗位面试问卷中心"
        subtitle="岗位问卷先作为一级菜单平行展示；后续可拆成初试问卷、复试问卷、终试问卷和岗位专业问卷，题库可手工补充，也可由AI根据JD反向生成。"
        action={
          <>
            <span className={`badge business-${businessLevel(selected.businessScore)}`}>岗位问卷等级 {businessLevel(selected.businessScore)}</span>
            <button className="button primary" onClick={addCustomCard} type="button">新增岗位问卷</button>
          </>
        }
      />
      <div className="grid two">
        <Card title="岗位问卷卡片库">
          <div className="questionnaire-card-grid">
            {questionnaireCards.map((card) => (
              <button
                className={`questionnaire-card ${activeCard.id === card.id ? 'active' : ''}`}
                key={card.id}
                onClick={() => setActiveCardId(card.id)}
                type="button"
              >
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.description}</p>
                </div>
                <div className="mini-chip-grid">
                  {card.tags.map((tag) => <span className="mini-chip" key={tag}>{tag}</span>)}
                  <span className={card.isFavorite ? 'mini-chip on' : 'mini-chip'}>{card.isFavorite ? '已收藏' : '未收藏'}</span>
                  <span className="mini-chip">{card.questions.length}题</span>
                  <span className="mini-chip black">黑色 {questionnaireSignalsByTone(card, 'black').length}</span>
                  <span className="mini-chip on">优先 {questionnaireSignalsByTone(card, 'green').length}</span>
                  <span className="mini-chip">模块 {card.questionModules.length}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="questionnaire-actions">
            <button
              className="button"
              onClick={() => updateActiveCard(toggleQuestionnaireFavorite)}
              type="button"
            >
              <BadgeCheck size={14} />
              {activeCard.isFavorite ? '取消收藏' : '收藏问卷'}
            </button>
            <button className="button" onClick={addCustomCard} type="button">
              <FileStack size={14} />
              添加岗位卡片
            </button>
          </div>
        </Card>

        <Card title="岗位黑绿关键词规则">
          <div className="questionnaire-signal-board">
            <div className="questionnaire-signal-column tone-black">
              <strong>黑色谨慎关键词</strong>
              {questionnaireSignalsByTone(activeCard, 'black').map((item) => (
                <div key={item.id}>
                  <span>{item.label}</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="questionnaire-signal-column tone-green">
              <strong>绿色优先关键词</strong>
              {questionnaireSignalsByTone(activeCard, 'green').map((item) => (
                <div key={item.id}>
                  <span>{item.label}</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="专业精准题库模块">
          <div className="questionnaire-module-list">
            {activeCard.questionModules.map((moduleItem) => (
              <div className="questionnaire-module-item" key={moduleItem.id}>
                <div>
                  <strong>{moduleItem.title}</strong>
                  <p>{moduleItem.focus}</p>
                </div>
                <span className="badge">{questionnaireModuleQuestionCount(activeCard, moduleItem.id)}题</span>
              </div>
            ))}
          </div>
          <div className="notice">
            题库按岗位能力拆成几大模块；每个模块后续可下沉为初试、复试、终试的独立题库。
          </div>
        </Card>

        <Card title="JD反向生成问卷">
          <label>
            <span>岗位JD或部门长口述需求</span>
            <textarea onChange={(event) => setJdDraft(event.target.value)} value={jdDraft} />
          </label>
          <div className="questionnaire-actions">
            <button
              className="button primary"
              onClick={() => {
                const generated = generateQuestionsFromJd(jdDraft, activeCard)
                updateActiveCard((card) => ({ ...card, questions: [...card.questions, ...generated] }))
              }}
              type="button"
            >
              <Sparkles size={14} />
              AI根据JD补题
            </button>
          </div>
          <div className="notice">
            <strong>生成逻辑：</strong>
            从JD中抽取业绩、管理、内容、财务、技术、AI产品等关键词，反向生成面试追问和评分口径。
          </div>
        </Card>

        <Card
          action={<span className="badge">样例题目分 {questionnaireScore}</span>}
          title="题目加减分评分"
        >
          <div className="inline-control">
            <input
              onChange={(event) => setManualQuestion(event.target.value)}
              value={manualQuestion}
            />
            <button
              className="button"
              onClick={() => updateActiveCard((card) => addQuestionToCard(card, manualQuestion))}
              type="button"
            >
              添加题目
            </button>
          </div>
          <div className="question-bank-list">
            {activeCard.questions.map((questionItem, index) => (
              <div className="question-bank-item" key={questionItem.id}>
                <div>
                  <strong>{index + 1}. {questionItem.prompt}</strong>
                  <p>{questionItem.scoringGuide}</p>
                  <div className="mini-chip-grid">
                    <span className="mini-chip on">加分 +{questionItem.bonus}</span>
                    <span className="mini-chip">减分 {questionItem.penalty}</span>
                    <span className="mini-chip">权重 {questionItem.weight}</span>
                    <span className="mini-chip">来源 {questionItem.source}</span>
                  </div>
                </div>
                <button
                  aria-label={`删除${questionItem.prompt}`}
                  className="icon-button"
                  onClick={() => updateActiveCard((card) => removeQuestionFromCard(card, questionItem.id))}
                  type="button"
                >
                  <PowerOff size={14} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="岗位字段示例">
          <div className="form-grid">
            <label>
              <span>个人业绩</span>
              <input defaultValue={selected.salesInput?.personalSales ?? '按岗位填写'} />
            </label>
            <label>
              <span>团队业绩</span>
              <input defaultValue={selected.salesInput?.teamSales ?? '无'} />
            </label>
            <label>
              <span>目标完成率</span>
              <input defaultValue={selected.salesInput?.targetCompletionRate ? `${selected.salesInput.targetCompletionRate}%` : '待填'} />
            </label>
            <label>
              <span>月均提成</span>
              <input defaultValue={selected.salesInput?.monthlyCommissionAvg ?? '待核验'} />
            </label>
            <label className="wide">
              <span>反向核验提示</span>
              <textarea defaultValue="高业绩必须追问提成规则；高提成必须追问发放口径；无法提供佐证时不直接判假，但标记待遇匹配需谨慎。" />
            </label>
          </div>
        </Card>
      </div>
    </section>
  )
}

function JobPublishingCenter() {
  const departmentBenchmarkBrief: DepartmentBenchmarkBrief = defaultDepartmentBenchmarkBrief
  const benchmarkSummary = summarizeDepartmentBenchmark(departmentBenchmarkBrief)
  const organizationHiringPlan = buildOrganizationHiringPlan({
    companyIntro: '黑卫士AI HR系统面向企业招聘、人事管理、AI邀约、录音解析和多账号岗位发布。',
    departmentBriefs: [
      { departmentName: '销售中心', plainNeed: '先搭业务增长和客户开发团队', roleCount: 3, targetHeadcount: 8 },
      { departmentName: '品牌内容部', plainNeed: '用自媒体和创意内容扩大招聘系统曝光', roleCount: 3, targetHeadcount: 5 },
      { departmentName: '产品技术中心', plainNeed: '继续开发AI系统、硬件产品和多端发布能力', roleCount: 3, targetHeadcount: 6 },
      { departmentName: '经营管理部', plainNeed: '补经营、总助、人事财务和流程岗位', roleCount: 3, targetHeadcount: 4 },
    ],
    industryIntro: '行业涉及人工智能、企业服务、招聘平台、智能硬件和自动化办公。',
    voiceTranscript: '老板口述：先介绍公司和行业，再让AI生成组织架构、岗位分布、职责、编制人数和阶梯发布计划，人工确认后再自动发布。',
  })
  const prePublishingPlan = buildPrePublishingGenerationPlan({
    benchmarkBrief: departmentBenchmarkBrief,
    companyIntro: '黑卫士AI HR系统面向企业招聘、人事管理、AI邀约、录音解析和多账号岗位发布。',
    departmentBriefs: [
      { departmentName: '销售中心', plainNeed: '先搭业务增长和客户开发团队', roleCount: 3, targetHeadcount: 8 },
      { departmentName: '品牌内容部', plainNeed: '用自媒体和创意内容扩大招聘系统曝光', roleCount: 3, targetHeadcount: 5 },
      { departmentName: '产品技术中心', plainNeed: '继续开发AI系统、硬件产品和多端发布能力', roleCount: 3, targetHeadcount: 6 },
      { departmentName: '经营管理部', plainNeed: '补经营、总助、人事财务和流程岗位', roleCount: 3, targetHeadcount: 4 },
    ],
    employerName: '黑卫士科技',
    employerScale: '中小型公司',
    industryIntro: '行业涉及人工智能、企业服务、招聘平台、智能硬件和自动化办公。',
    targetDepartmentName: '销售中心',
    targetRoleTitle: '业务经理',
    voiceTranscript: '老板口述：先介绍公司和行业，再让AI生成组织架构、岗位分布、职责、编制人数和阶梯发布计划，人工确认后再自动发布。',
  })
  const candidatePriorityRows = [
    {
      label: '高分新投 / 中层干部',
      profile: '92分 / 2小时内 / 薪酬96%匹配',
      result: buildCandidateFollowupPriority({
        candidateScore: 92,
        hoursSinceResumeSubmitted: 2,
        salaryMatchPercent: 96,
        talentLayer: '中层干部',
      }),
    },
    {
      label: '中分当日 / 技术层',
      profile: '78分 / 16小时内 / 薪酬82%匹配',
      result: buildCandidateFollowupPriority({
        candidateScore: 78,
        hoursSinceResumeSubmitted: 16,
        salaryMatchPercent: 82,
        talentLayer: '技术层',
      }),
    },
    {
      label: '低分超时 / 执行层',
      profile: '61分 / 58小时后 / 薪酬62%匹配',
      result: buildCandidateFollowupPriority({
        candidateScore: 61,
        hoursSinceResumeSubmitted: 58,
        salaryMatchPercent: 62,
        talentLayer: '执行层',
      }),
    },
  ]
  const [manualKeywordDrafts, setManualKeywordDrafts] = useState<Record<string, string>>({})
  const defaultPublishingCards = useMemo<JobPublishingCard[]>(() => [
    {
      id: 'sales-manager',
      title: '业务经理',
      department: '销售中心',
      postingType: 'fullTime',
      jdStatus: '已发布',
      targetHeadcount: 6,
      hiredCount: 2,
      isFavorite: true,
      keywords: ['B端客户', '个人业绩', '提成核验', '内容获客'],
      variants: [
        {
          id: 'sales-a',
          accountName: '业务岗招聘号',
          angle: '高提成销售',
          salary: '8-15K',
          jdTitle: '业务经理 / 高提成方向',
          metrics: {
            acceptedInterviews: 3,
            acceptedInvitations: 5,
            conversations: 18,
            emails: 2,
            invitations: 9,
            messages: 20,
            phones: 4,
            resumes: 8,
            visits: 120,
            wechat: 6,
            wechatExchanged: 4,
          },
        },
        {
          id: 'sales-b',
          accountName: '销售岗招聘号',
          angle: 'B端客户资源',
          salary: '10-20K',
          jdTitle: '大客户销售 / B端资源方向',
          metrics: {
            acceptedInterviews: 4,
            acceptedInvitations: 6,
            conversations: 22,
            emails: 3,
            invitations: 11,
            messages: 24,
            phones: 5,
            resumes: 10,
            visits: 180,
            wechat: 8,
            wechatExchanged: 6,
          },
        },
      ],
    },
    {
      id: 'content-creator',
      title: '自媒体创意制作',
      department: '品牌内容部',
      postingType: 'partTime',
      jdStatus: '待确认',
      targetHeadcount: 3,
      hiredCount: 1,
      isFavorite: false,
      keywords: ['短视频', '脚本', '账号冷启动', '爆款复盘'],
      variants: [
        {
          id: 'content-a',
          accountName: '运营内容号',
          angle: '短视频爆款',
          salary: '7-12K',
          jdTitle: '短视频创意制作 / 爆款方向',
          metrics: {
            acceptedInterviews: 2,
            acceptedInvitations: 3,
            conversations: 16,
            emails: 4,
            invitations: 8,
            messages: 17,
            phones: 3,
            resumes: 11,
            visits: 160,
            wechat: 5,
            wechatExchanged: 3,
          },
        },
      ],
    },
    {
      id: 'ai-pm',
      title: 'AI硬件产品经理',
      department: '产品中心',
      postingType: 'partner',
      jdStatus: '草稿',
      targetHeadcount: 2,
      hiredCount: 0,
      isFavorite: false,
      keywords: ['0-1产品', '硬件量产', 'AI方案', '供应链协同'],
      variants: [
        {
          id: 'ai-pm-a',
          accountName: '产品经理号',
          angle: 'AI硬件0-1',
          salary: '15-30K',
          jdTitle: 'AI硬件产品经理 / 0-1方向',
          metrics: {
            acceptedInterviews: 1,
            acceptedInvitations: 2,
            conversations: 9,
            emails: 2,
            invitations: 4,
            messages: 10,
            phones: 2,
            resumes: 5,
            visits: 90,
            wechat: 3,
            wechatExchanged: 2,
          },
        },
      ],
    },
    {
      id: 'hourly-assistant',
      title: '展厅小时工',
      department: '门店运营',
      postingType: 'hourly',
      jdStatus: '已发布',
      targetHeadcount: 10,
      hiredCount: 4,
      isFavorite: false,
      keywords: ['小时工', '排班', '到岗确认', '临时用工'],
      variants: [
        {
          id: 'hourly-a',
          accountName: '合伙兼职号',
          angle: '小时工排班',
          salary: '25元/小时',
          jdTitle: '展厅小时工 / 排班方向',
          metrics: {
            acceptedInterviews: 6,
            acceptedInvitations: 8,
            conversations: 28,
            emails: 1,
            invitations: 16,
            messages: 35,
            phones: 9,
            resumes: 14,
            visits: 210,
            wechat: 12,
            wechatExchanged: 9,
          },
        },
      ],
    },
  ], [])
  const [publishingCards, setPublishingCards] = useState<JobPublishingCard[]>(() =>
    readPersistedValue(browserLocalStorage(), localPersistenceKeys.jobPublishingCards, defaultPublishingCards),
  )
  useEffect(() => {
    writePersistedValue(browserLocalStorage(), localPersistenceKeys.jobPublishingCards, publishingCards)
  }, [publishingCards])
  const addPostingCard = (type: JobPostingType) => {
    setPublishingCards((cards) => [...cards, createJobPublishingCard(type, cards.length + 1)])
  }
  const updatePostingCard = (id: string, updater: (card: JobPublishingCard) => JobPublishingCard) => {
    setPublishingCards((cards) => cards.map((card) => (card.id === id ? updater(card) : card)))
  }
  const addKeywordToPublishingCard = (id: string) => {
    const draft = manualKeywordDrafts[id] ?? ''
    updatePostingCard(id, (card) => ({
      ...card,
      keywords: addManualKeyword(card.keywords, draft),
    }))
    setManualKeywordDrafts((drafts) => ({ ...drafts, [id]: '' }))
  }
  const totalMetrics = sumPostingMetrics(publishingCards.flatMap((card) => card.variants))

  return (
    <section>
      <PageTitle
        title="岗位AI生成与发布中心"
        subtitle="口述招聘需求，AI转写、提纲、补全、生成思维导图和完整JD，再由HR确认后发布并归集多账号数据。"
        action={
          <>
            <button className="button">上传录音</button>
            <button className="button primary">生成岗位JD</button>
          </>
        }
      />
      <div className="stat-grid">
        <Stat title="发布岗位" value={publishingCards.length} note="岗位卡片数量" color="blue" />
        <Stat title="总访问" value={totalMetrics.visits} note="多账号归集" color="green" />
        <Stat title="总简历" value={totalMetrics.resumes} note={`${publishingConversionRate(totalMetrics)}% 简历转化`} color="blue" />
        <Stat title="总对话" value={totalMetrics.conversations} note="含留言后沟通" color="yellow" />
        <Stat title="接受面试" value={totalMetrics.acceptedInterviews} note="进入面试排期" color="green" />
      </div>

      <Card title="公司介绍到组织架构AI生成">
        <div className="org-intro-panel">
          <div>
            <span>公司/行业/语音转写输入</span>
            <p>{organizationHiringPlan.sourceSummary}</p>
          </div>
          <div>
            <span>AI生成编制总数</span>
            <strong>{organizationHiringPlan.totalHeadcount}人</strong>
            <p>按部门编制和岗位编制推理岗位分布、职责和发布顺序。</p>
          </div>
        </div>
        <div className="org-plan-grid">
          {organizationHiringPlan.departments.map((department) => (
            <div className="org-plan-card" key={department.departmentName}>
              <div className="org-plan-head">
                <div>
                  <strong>{department.departmentName}</strong>
                  <p>{department.mission}</p>
                </div>
                <span>{department.targetHeadcount}人</span>
              </div>
              <div className="org-role-list">
                {department.roles.map((role) => (
                  <div className="org-role-row" key={`${department.departmentName}-${role.title}`}>
                    <div>
                      <strong>{role.title}</strong>
                      <p>{role.level} / {role.publishingStage} / {role.responsibilities.slice(0, 2).join('；')}</p>
                    </div>
                    <span>{role.targetHeadcount}人</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid two">
        <Card title="招聘岗位阶梯发布">
          <div className="posting-ladder-list">
            {organizationHiringPlan.postingLadder.map((stage) => (
              <div className="posting-ladder-card" key={stage.stage}>
                <span>{stage.stage}</span>
                <strong>{stage.targetHeadcount}人</strong>
                <p>{stage.focus}</p>
                <div className="mini-chip-grid">
                  {stage.roles.slice(0, 6).map((role) => (
                    <span className="mini-chip on" key={role}>{role}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="AI修正后人工确认">
          <ol className="sop compact-sop">
            {organizationHiringPlan.aiCorrectionSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="confirmation-check-grid">
            {organizationHiringPlan.humanConfirmationItems.map((item) => (
              <div key={item}><BadgeCheck size={16} /><span>{item}</span></div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="新增岗位发布">
        <div className="posting-type-section">
          {(['常规岗位', '实习生岗位'] as const).map((category) => (
            <div key={category}>
              <div className="posting-type-heading">{category}</div>
              <div className="posting-type-grid">
                {jobPostingTypeOptions.filter((option) => option.category === category).map((option) => (
                  <button className="posting-type-button" key={option.type} onClick={() => addPostingCard(option.type)} type="button">
                    <strong>{option.label}</strong>
                    <span>{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="一期发布前置链路">
        <div className="prepublish-summary-strip">
          <div>
            <span>雇主画像</span>
            <strong>{prePublishingPlan.organizationSummary}</strong>
          </div>
          <div>
            <span>合规边界</span>
            <strong>{prePublishingPlan.referencePolicy}</strong>
          </div>
        </div>
        <div className="prepublish-workflow-grid">
          {prePublishingPlan.workflow.map((step, index) => (
            <div className="prepublish-workflow-row" key={step.title}>
              <span>{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="boss-handoff-flow">
          {prePublishingPlan.handoffToBossFlow.map((step) => (
            <span className="mini-chip on" key={step}>{step}</span>
          ))}
        </div>
      </Card>

      <div className="grid two">
        <Card title="公司规模组织规则">
          <div className="scale-rule-highlight">
            <span>{prePublishingPlan.scaleRule.name}</span>
            <strong>{prePublishingPlan.scaleRule.headcountRange}</strong>
            <p>{prePublishingPlan.scaleRule.structureNote}</p>
            <p>{prePublishingPlan.scaleRule.publishingRule}</p>
          </div>
          <div className="scale-rule-grid">
            {companyScaleRules.map((rule) => (
              <div className={rule.name === prePublishingPlan.scaleRule.name ? 'scale-rule-card active' : 'scale-rule-card'} key={rule.name}>
                <strong>{rule.name}</strong>
                <span>{rule.headcountRange}</span>
                <p>{rule.departments.slice(0, 3).join(' / ')}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="每日JD迭代闭环">
          <div className="daily-jd-loop">
            <div>
              <span>周期</span>
              <strong>{prePublishingPlan.dailyIterationPlan.cadence}</strong>
            </div>
            <p>{prePublishingPlan.dailyIterationPlan.focus}</p>
            <div className="mini-chip-grid">
              {prePublishingPlan.dailyIterationPlan.inputs.map((input) => (
                <span className="mini-chip on" key={input}>{input}</span>
              ))}
            </div>
            <div className="daily-action-list">
              {prePublishingPlan.dailyIterationPlan.actions.map((action) => (
                <div key={action}><RotateCcw size={15} /><span>{action}</span></div>
              ))}
            </div>
            <div className="notice">{prePublishingPlan.dailyIterationPlan.recommendation}</div>
            <p className="muted">{prePublishingPlan.dailyIterationPlan.refreshStrategy}</p>
          </div>
        </Card>
      </div>

      <div className="grid two">
        <Card title="岗位说明与发布话术">
          <div className="generated-doc-grid">
            {[
              ['岗位说明书', prePublishingPlan.jobDescriptionBook],
              ['发布JD', prePublishingPlan.postingJd],
              ['成果目标', prePublishingPlan.performanceGoalDraft],
            ].map(([title, content]) => (
              <div className="generated-doc-card" key={title}>
                <strong>{title}</strong>
                <pre>{content}</pre>
              </div>
            ))}
          </div>
          <div className="greeting-script-list">
            {prePublishingPlan.greetingScripts.map((script) => (
              <div key={script.mode}>
                <span>{script.mode}</span>
                <p>{script.content}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="候选人时效优先级">
          <div className="candidate-priority-list">
            {candidatePriorityRows.map((row) => (
              <div className="candidate-priority-row" key={row.label}>
                <div>
                  <strong>{row.label}</strong>
                  <p>{row.profile}</p>
                  <p>{row.result.reasons.join('、')}</p>
                </div>
                <div>
                  <span>{row.result.priority}</span>
                  <strong>{row.result.urgencyScore}</strong>
                </div>
                <p>{row.result.nextAction}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid two">
        <Card title="AI语音到JD文件链路">
          <div className="pipeline-grid">
            {voiceToJdPipeline().map((step, index) => (
              <div className="pipeline-card" key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </Card>
        <Card title="AI补全与修复">
          <div className="ai-fix-grid">
            <div><Sparkles size={20} /><strong>口述修复</strong><p>把不专业、不完整、口语化的描述整理成完整句子和结构化需求。</p></div>
            <div><FileStack size={20} /><strong>JD补全</strong><p>补齐职责、技能、履历、业绩、加分项、淘汰项和面试问题。</p></div>
            <div><MessageSquareText size={20} /><strong>招聘话术</strong><p>生成不同账号、不同岗位角度的招聘发布话术和沟通话术。</p></div>
            <div><Send size={20} /><strong>确认发布</strong><p>先发布到黑卫士平台，外部平台走授权账号和人工确认发布流程。</p></div>
          </div>
        </Card>
      </div>

      <div className="grid two">
        <Card title="部门长说不清时的追问SOP">
          <p className="muted">{departmentBenchmarkBrief.plainNeed}</p>
          <ol className="sop">
            {departmentBenchmarkQuestions().map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
          <div className="notice">
            系统会把“想从哪些公司、哪些部门、哪些岗位经历、哪些可验证成绩里找人”反推为岗位画像、搜索关键词、JD补全文案和面试核验问题。
          </div>
        </Card>
        <Card title="标杆公司画像提炼">
          <div className="benchmark-summary">
            <div>
              <span>目标公司</span>
              <strong>{benchmarkSummary.companyCount}</strong>
            </div>
            <div>
              <span>高优先级</span>
              <strong>{benchmarkSummary.highPriorityCompanies.join('、') || '待补充'}</strong>
            </div>
            <div>
              <span>目标部门</span>
              <strong>{benchmarkSummary.departments.slice(0, 3).join('、')}</strong>
            </div>
            <div>
              <span>关键词</span>
              <strong>{benchmarkSummary.keyKeywords.slice(0, 3).join('、')}</strong>
            </div>
            <div>
              <span>关键指标</span>
              <strong>{benchmarkSummary.keyMetrics.slice(0, 2).join('、')}</strong>
            </div>
            <div>
              <span>关键特征</span>
              <strong>{benchmarkSummary.keyTraits.slice(0, 2).join('、')}</strong>
            </div>
          </div>
          <div className="metric-badge-grid">
            {[
              ['同行/标杆公司', '10分，高优先级+3'],
              ['目标部门', '6分'],
              ['目标岗位经历', '5分'],
              ['可验证业绩', '4分'],
              ['关键词/指标/特征', '用于搜索与JD补全'],
              ['相近公司特征', '3分'],
              ['用途', '候选人搜索排序'],
            ].map(([label, value]) => (
              <div className="metric-badge" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="keyword-cloud">
            {benchmarkSummary.jdKeywords.slice(0, 12).map((keyword) => (
              <span className="chip good" key={keyword}>{keyword}</span>
            ))}
          </div>
          <div className="benchmark-detail-grid">
            <div>
              <strong>岗位关键词</strong>
              <p>{benchmarkSummary.keyKeywords.join('、')}</p>
            </div>
            <div>
              <strong>关键指标</strong>
              <p>{benchmarkSummary.keyMetrics.join('、')}</p>
            </div>
            <div>
              <strong>关键特征</strong>
              <p>{benchmarkSummary.keyTraits.join('、')}</p>
            </div>
          </div>
          <div className="notice">
            <strong>没有明确对手公司时：</strong>
            用相近业务模式、相近客户群、相近渠道、相近产品和相近客单价补足画像，例如
            {departmentBenchmarkBrief.alternativeCompanyTraits.join('、')}。
          </div>
          <div className="table-wrap compact-table">
            <table>
              <thead>
                <tr>
                  <th>公司</th>
                  <th>类型</th>
                  <th>部门/岗位</th>
                  <th>优先业绩</th>
                </tr>
              </thead>
              <tbody>
                {departmentBenchmarkBrief.targetCompanies.map((company) => (
                  <tr key={company.companyName}>
                    <td>
                      <strong>{company.companyName}</strong>
                      <div className="muted">{company.priority}优先级</div>
                    </td>
                    <td>{company.relation}</td>
                    <td>
                      <strong>{company.targetDepartments.join('、')}</strong>
                      <div className="muted">{company.targetRoles.join('、')}</div>
                    </td>
                    <td>{company.desiredAchievements.join('、')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card title="岗位卡片动态数字">
        <div className="publishing-card-grid">
          {publishingCards.map((card) => {
            const metrics = sumPostingMetrics(card.variants)
            const codeProfile = card.jobCode && card.englishTitle ? { englishTitle: card.englishTitle, jobCode: card.jobCode } : buildJobCodeProfile(card.title)
            const keywordDensity = compactDisplayClass(card.keywords.length)
            return (
              <div className="publishing-card" key={card.id}>
                <div className="publishing-card-head">
                  <div>
                    <div className="job-title-row">
                      <span className="job-code-badge">{codeProfile.jobCode}</span>
                      <strong>{card.title}</strong>
                    </div>
                    <p>
                      <span className="job-english-title">{codeProfile.englishTitle}</span> /{' '}
                      {card.department} / {jobPostingTypeLabels[card.postingType]} / {card.jdStatus} / {card.variants.length}个发布版本
                    </p>
                  </div>
                  <span className={card.isFavorite ? 'badge level-S' : 'badge'}>{card.isFavorite ? '已收藏' : `${publishingConversionRate(metrics)}%转化`}</span>
                </div>
                <div className="posting-headcount-grid">
                  <div>
                    <span>招聘人数</span>
                    <strong>{card.targetHeadcount}</strong>
                  </div>
                  <div>
                    <span>已招人数</span>
                    <strong>{card.hiredCount}</strong>
                  </div>
                  <div>
                    <span>缺口人数</span>
                    <strong>{jobOpeningCount(card)}</strong>
                  </div>
                </div>
                <div className={`keyword-cloud density-${keywordDensity}`}>
                  {card.keywords.map((keyword) => <span className="chip good" key={keyword}>{keyword}</span>)}
                </div>
                <div className={`inline-control keyword-editor density-${keywordDensity}`}>
                  <input
                    onChange={(event) =>
                      setManualKeywordDrafts((drafts) => ({
                        ...drafts,
                        [card.id]: event.target.value,
                      }))
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') addKeywordToPublishingCard(card.id)
                    }}
                    placeholder="手动补充技能关键词，例如：视频号运营、CPA、供应链协同"
                    value={manualKeywordDrafts[card.id] ?? ''}
                  />
                  <button className="table-action" onClick={() => addKeywordToPublishingCard(card.id)} type="button">
                    加关键词
                  </button>
                </div>
                <div className="posting-edit-grid">
                  <label>
                    <span>岗位名称</span>
                    <input
                      onChange={(event) =>
                        updatePostingCard(card.id, (item) => ({ ...item, title: event.target.value }))
                      }
                      value={card.title}
                    />
                  </label>
                  <label>
                    <span>英文名称</span>
                    <input
                      onChange={(event) =>
                        updatePostingCard(card.id, (item) => ({ ...item, englishTitle: event.target.value }))
                      }
                      placeholder={codeProfile.englishTitle}
                      value={card.englishTitle ?? ''}
                    />
                  </label>
                  <label>
                    <span>岗位缩写</span>
                    <input
                      onChange={(event) =>
                        updatePostingCard(card.id, (item) => ({ ...item, jobCode: event.target.value.toUpperCase() }))
                      }
                      placeholder={codeProfile.jobCode}
                      value={card.jobCode ?? ''}
                    />
                  </label>
                  <label>
                    <span>部门</span>
                    <input
                      onChange={(event) =>
                        updatePostingCard(card.id, (item) => ({ ...item, department: event.target.value }))
                      }
                      value={card.department}
                    />
                  </label>
                  <label>
                    <span>目标人数</span>
                    <input
                      min={card.hiredCount}
                      onChange={(event) =>
                        updatePostingCard(card.id, (item) => ({
                          ...item,
                          targetHeadcount: Math.max(item.hiredCount, Number(event.target.value) || item.hiredCount),
                        }))
                      }
                      type="number"
                      value={card.targetHeadcount}
                    />
                  </label>
                  <label>
                    <span>发布状态</span>
                    <select
                      onChange={(event) =>
                        updatePostingCard(card.id, (item) => ({
                          ...item,
                          jdStatus: event.target.value as JobPublishingCard['jdStatus'],
                        }))
                      }
                      value={card.jdStatus}
                    >
                      <option>草稿</option>
                      <option>待确认</option>
                      <option>已发布</option>
                      <option>暂停中</option>
                    </select>
                  </label>
                </div>
                <div className="posting-action-row">
                  <button className="table-action" onClick={() => updatePostingCard(card.id, (item) => adjustJobPostingHeadcount(item, 1))} type="button">
                    增加岗位
                  </button>
                  <button className="table-action" onClick={() => updatePostingCard(card.id, (item) => adjustJobPostingHeadcount(item, -1))} type="button">
                    减少岗位
                  </button>
                  <button className="table-action" onClick={() => updatePostingCard(card.id, toggleJobPostingFavorite)} type="button">
                    {card.isFavorite ? '取消收藏' : '收藏岗位'}
                  </button>
                  <button className="table-action" onClick={() => updatePostingCard(card.id, pauseJobPosting)} type="button">
                    {card.jdStatus === '暂停中' ? '恢复发布' : '暂停发布'}
                  </button>
                </div>
                <div className="metric-badge-grid">
                  {metricBadges(metrics).map((metric) => (
                    <div className="metric-badge" key={metric.key}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
                <div className="variant-list">
                  {card.variants.map((variant) => (
                    <div className="variant-row" key={variant.id}>
                      <div>
                        <strong>{variant.jdTitle}</strong>
                        <p>{variant.accountName} / {variant.angle} / {variant.salary}</p>
                      </div>
                      <span className="chip warn">{variant.metrics.visits}访问</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card title="卡片不点开即显示的关键数字">
        <div className="metric-explain-grid">
          <div><Eye size={20} /><strong>曝光</strong><p>访问数量、留言数量、对话数量。</p></div>
          <div><FileStack size={20} /><strong>简历</strong><p>简历数量、邮箱数量、具体简历点开后查看。</p></div>
          <div><MailCheck size={20} /><strong>联系方式</strong><p>电话数量、微信数量、交换微信数量。</p></div>
          <div><BadgeCheck size={20} /><strong>邀约</strong><p>邀约数量、接受邀约、接受面试数量。</p></div>
        </div>
      </Card>
    </section>
  )
}

function RecruitingAccountHub() {
  const appStorage = browserLocalStorage()
  const [bossImportedCandidates, setBossImportedCandidates] = useState<BossRecruitingCandidateInput[]>(() =>
    readPersistedValue(appStorage, localPersistenceKeys.bossRecruitingImportedCandidates, []),
  )
  const [bossFilter, setBossFilter] = useState<BossPipelineFilter>('all')
  const [selectedBossDetailId, setSelectedBossDetailId] = useState('')
  const [selectedBossDraftId, setSelectedBossDraftId] = useState('')
  const [bossDraftCopyStatus, setBossDraftCopyStatus] = useState('')
  const [bossManualImportDraft, setBossManualImportDraft] = useState<BossManualImportDraft>(defaultBossManualImportDraft)
  const [bossWorkflowState, setBossWorkflowState] = useState<BossRecruitingWorkflowState>(() =>
    readPersistedValue(appStorage, localPersistenceKeys.bossRecruitingWorkflowState, {}),
  )
  const updateBossWorkflowState = (
    candidateId: string,
    patch: BossRecruitingCandidateWorkflowState,
    action = '更新状态',
    note?: string,
  ) => {
    setBossWorkflowState((current) => ({
      ...current,
      [candidateId]: {
        ...current[candidateId],
        ...patch,
        operationLog: [
          {
            action,
            at: new Date().toISOString(),
            note,
          },
          ...(current[candidateId]?.operationLog ?? []),
        ].slice(0, 8),
        updatedAt: new Date().toISOString(),
      },
    }))
  }
  const importNextBossCandidate = () => {
    setBossImportedCandidates((current) => {
      const currentIds = new Set(current.map((candidate) => candidate.id))
      const nextTemplate = bossImportCandidateTemplates.find((candidate) => !currentIds.has(candidate.id))
      if (!nextTemplate) return current
      return [...current, nextTemplate]
    })
  }
  const addManualBossCandidate = () => {
    setBossImportedCandidates((current) => [
      ...current,
      buildBossManualImportCandidate(bossManualImportDraft, current.length + 1),
    ])
  }
  const bossPipeline = useMemo(
    () =>
      buildBossRecruitingPipeline({
        candidates: applyBossWorkflowState([...bossRecruitingDemoCandidates, ...bossImportedCandidates], bossWorkflowState),
        now: bossRecruitingDemoNow,
      }),
    [bossImportedCandidates, bossWorkflowState],
  )
  const bossSummary = useMemo(() => summarizeBossPipeline(bossPipeline), [bossPipeline])
  const bossActions = useMemo(() => nextBossPipelineActions(bossPipeline).slice(0, 4), [bossPipeline])
  const filteredBossCandidates = useMemo(
    () => filterBossPipelineCandidates(bossPipeline.candidates, bossWorkflowState, bossFilter),
    [bossFilter, bossPipeline.candidates, bossWorkflowState],
  )
  const selectedBossDraft = useMemo(
    () => bossPipeline.candidates.find((candidate) => candidate.candidateId === selectedBossDraftId)?.invitationDraft,
    [bossPipeline.candidates, selectedBossDraftId],
  )
  const selectedBossDraftCandidate = useMemo(
    () => bossPipeline.candidates.find((candidate) => candidate.candidateId === selectedBossDraftId),
    [bossPipeline.candidates, selectedBossDraftId],
  )
  const selectedBossDetailCandidate = useMemo(
    () => bossPipeline.candidates.find((candidate) => candidate.candidateId === selectedBossDetailId) ?? filteredBossCandidates[0],
    [bossPipeline.candidates, filteredBossCandidates, selectedBossDetailId],
  )
  const selectedBossDraftText = selectedBossDraftCandidate ? bossRoleAwareDraft(selectedBossDraftCandidate) : ''
  const recentBossLogs = bossPipeline.candidates
    .flatMap((candidate) =>
      (bossWorkflowState[candidate.candidateId]?.operationLog ?? []).map((log) => ({
        ...log,
        candidateName: candidate.name,
      })),
    )
    .sort((left, right) => Date.parse(right.at) - Date.parse(left.at))
    .slice(0, 6)
  const archivedBossRecords = bossPipeline.candidates
    .filter((candidate) => bossWorkflowState[candidate.candidateId]?.archived)
    .map((candidate) => ({
      candidate,
      reason: bossWorkflowState[candidate.candidateId]?.archiveReason ?? bossArchiveReason(candidate),
    }))
  const bossImportDone = bossImportedCandidates.length >= bossImportCandidateTemplates.length
  const exportBossCandidates = () => {
    downloadJsonFile('heiwenshi-boss-candidates.json', {
      exportedAt: new Date().toISOString(),
      filter: bossPipelineFilterLabels[bossFilter],
      records: filteredBossCandidates.map((candidate) => ({
        archiveCategory: candidate.archiveCategory,
        archiveReason: bossWorkflowState[candidate.candidateId]?.archiveReason,
        grade: candidate.grade,
        id: candidate.candidateId,
        invitationDraft: candidate.invitationDraft ? bossRoleAwareDraft(candidate) : '',
        name: candidate.name,
        reasons: candidate.reasons,
        resumeScore: candidate.resumeScore,
        salaryAlignment: bossSalaryAlignmentLabels[candidate.salaryAlignment],
        source: bossCandidateSourceLabels[candidate.source],
        stages: candidate.stages,
        targetRole: candidate.targetRole,
      })),
    })
  }
  const exportBossLogs = () => {
    downloadJsonFile('heiwenshi-boss-operation-logs.json', {
      exportedAt: new Date().toISOString(),
      logs: recentBossLogs,
    })
  }
  const bulkUpdateBossCandidates = (patch: BossRecruitingCandidateWorkflowState) => {
    setBossWorkflowState((current) => {
      const updatedAt = new Date().toISOString()
      const next = { ...current }
      for (const candidate of filteredBossCandidates) {
        const action = patch.archived ? '批量入库' : patch.humanConfirmed ? '批量确认邀约' : '批量标记已收简历'
        const note = patch.archived ? bossArchiveReason(candidate) : undefined
        next[candidate.candidateId] = {
          ...next[candidate.candidateId],
          ...patch,
          archiveReason: patch.archived ? note : next[candidate.candidateId]?.archiveReason,
          operationLog: [
            { action, at: updatedAt, note },
            ...(next[candidate.candidateId]?.operationLog ?? []),
          ].slice(0, 8),
          updatedAt,
        }
      }
      return next
    })
  }
  const copyBossDraft = async () => {
    if (!selectedBossDraftText) return
    try {
      await navigator.clipboard.writeText(selectedBossDraftText)
      setBossDraftCopyStatus('已复制到剪贴板')
    } catch {
      setBossDraftCopyStatus('当前浏览器未开放剪贴板，请手动复制文本')
    }
  }

  useEffect(() => {
    writePersistedValue(appStorage, localPersistenceKeys.bossRecruitingWorkflowState, bossWorkflowState)
  }, [appStorage, bossWorkflowState])

  useEffect(() => {
    writePersistedValue(appStorage, localPersistenceKeys.bossRecruitingImportedCandidates, bossImportedCandidates)
  }, [appStorage, bossImportedCandidates])

  return (
    <section>
      <PageTitle
        title="招聘账号连接中心"
        subtitle="统一管理多个招聘账号的授权、扫码、验证码、负责人、岗位范围和连接状态。"
        action={
          <>
            <button className="button">导入授权记录</button>
            <button className="button primary">新增连接</button>
          </>
        }
      />
      <div className="grid two">
        <Card title="统一登录引导">
          <div className="login-method-grid">
            {recruitingLoginMethods.map((method) => {
              const Icon = method.icon
              return (
                <div className="login-method-card" key={method.title}>
                  <span><Icon size={22} /></span>
                  <strong>{method.title}</strong>
                  <p>{method.detail}</p>
                </div>
              )
            })}
          </div>
        </Card>
        <Card title="安全边界">
          <div className="notice">
            <strong>设计原则：</strong>
            借鉴招聘平台常见的手机验证码、邮箱验证码、微信扫码、APP扫码、网页辅助和手动账号密码登录习惯；手动账号密码只在官方页面输入，本系统不保存第三方明文密码。
          </div>
          <ol className="sop">
            <li>用户在官方页面或官方扫码流程完成登录授权。</li>
            <li>系统只记录账号别名、负责人、状态、岗位范围和导入来源。</li>
            <li>所有发送、导出、批量操作都需要本系统权限和审计。</li>
            <li>账号异常时进入人工复核，不做绕过平台风控的自动化。</li>
          </ol>
        </Card>
      </div>
      <div className="grid two">
        <Card title="语言与智库接口预留">
          <div className="adapter-grid">
            {languageInterfaces.map((item) => (
              <div className="adapter-card" key={item.id}>
                <div className="adapter-card-head">
                  <strong>{item.name}</strong>
                  <span className="badge">{item.stage}</span>
                </div>
                <p>{item.scope}</p>
                <div className="mini-chip-grid">
                  {item.examples.map((example) => (
                    <span className="mini-chip on" key={example}>{example}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="招聘平台适配器预留">
          <div className="adapter-grid">
            {recruitingPlatformAdapters.map((adapter) => (
              <div className="adapter-card" key={adapter.id}>
                <div className="adapter-card-head">
                  <strong>{adapter.name}</strong>
                  <span className={adapter.stage === '1.0优先' ? 'badge level-S' : 'badge'}>{adapter.stage}</span>
                </div>
                <p>{adapter.region} / {platformLoginMethodSummary(adapter)}</p>
                <p>{adapter.notes}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="多招号招聘矩阵">
        <div className="account-grid">
          {recruitingAccountMatrix.map((account) => (
            <div className="account-card" key={account.name}>
              <div>
                <strong>{account.name}</strong>
                <p>{account.owner} / {account.method}</p>
                <p>{bindingModeLabel(account.bindingMode)}</p>
                <div className="mini-chip-grid">
                  {account.jobs.map((job) => <span className="mini-chip on" key={job}>{job}</span>)}
                </div>
              </div>
              <span className="badge">{account.accounts}个账号</span>
              <span className={account.status === '已连接' ? 'chip good' : 'chip warn'}>{account.status}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title="BOSS招聘主链路试运行看板" action={<span className="badge level-A">单机链路可演示</span>}>
        <div className="boss-pipeline-summary-grid">
          <div>
            <span>候选人</span>
            <strong>{bossSummary.totalCandidates}</strong>
            <small>模拟接入</small>
          </div>
          <div>
            <span>打招呼队列</span>
            <strong>{bossSummary.greetingQueueSize}</strong>
            <small>待人工确认</small>
          </div>
          <div>
            <span>邮箱简历</span>
            <strong>{bossSummary.emailResumeImports}</strong>
            <small>已导入</small>
          </div>
          <div>
            <span>超时复核</span>
            <strong>{bossSummary.timedOutDraftsAwaitingReview}</strong>
            <small>不自动外发</small>
          </div>
          <div>
            <span>已确认邀约</span>
            <strong>{bossSummary.humanConfirmedDrafts}</strong>
            <small>人工发送</small>
          </div>
        </div>

        <div className="boss-pipeline-toolbar">
          <div className="segmented-buttons">
            {(Object.keys(bossPipelineFilterLabels) as BossPipelineFilter[]).map((filter) => (
              <button
                className={bossFilter === filter ? 'segment active' : 'segment'}
                key={filter}
                onClick={() => setBossFilter(filter)}
                type="button"
              >
                {bossPipelineFilterLabels[filter]}
              </button>
            ))}
          </div>
          <button className="button primary" disabled={bossImportDone} onClick={importNextBossCandidate} type="button">
            导入样例候选人
          </button>
          <button className="button" onClick={exportBossCandidates} type="button">
            导出候选人
          </button>
          <button className="button" onClick={exportBossLogs} type="button">
            导出日志
          </button>
        </div>

        <div className="boss-manual-import-panel">
          <label>
            <span>姓名</span>
            <input
              onChange={(event) => setBossManualImportDraft((draft) => ({ ...draft, name: event.target.value }))}
              value={bossManualImportDraft.name}
            />
          </label>
          <label>
            <span>岗位</span>
            <input
              onChange={(event) => setBossManualImportDraft((draft) => ({ ...draft, targetRole: event.target.value }))}
              value={bossManualImportDraft.targetRole}
            />
          </label>
          <label>
            <span>来源</span>
            <select
              onChange={(event) =>
                setBossManualImportDraft((draft) => ({ ...draft, source: event.target.value as BossCandidateSource }))
              }
              value={bossManualImportDraft.source}
            >
              {bossManualImportSourceOptions.map((source) => (
                <option key={source} value={source}>{bossCandidateSourceLabels[source]}</option>
              ))}
            </select>
          </label>
          <label>
            <span>薪酬下限K</span>
            <input
              min="0"
              onChange={(event) => setBossManualImportDraft((draft) => ({ ...draft, expectedSalaryMin: Number(event.target.value) }))}
              type="number"
              value={bossManualImportDraft.expectedSalaryMin}
            />
          </label>
          <label>
            <span>薪酬上限K</span>
            <input
              min="0"
              onChange={(event) => setBossManualImportDraft((draft) => ({ ...draft, expectedSalaryMax: Number(event.target.value) }))}
              type="number"
              value={bossManualImportDraft.expectedSalaryMax}
            />
          </label>
          <label>
            <span>匹配分</span>
            <input
              max="100"
              min="0"
              onChange={(event) => setBossManualImportDraft((draft) => ({ ...draft, matchScore: Number(event.target.value) }))}
              type="number"
              value={bossManualImportDraft.matchScore}
            />
          </label>
          <label>
            <span>佐证分</span>
            <input
              max="100"
              min="0"
              onChange={(event) => setBossManualImportDraft((draft) => ({ ...draft, evidenceScore: Number(event.target.value) }))}
              type="number"
              value={bossManualImportDraft.evidenceScore}
            />
          </label>
          <label className="boss-checkbox-label">
            <input
              checked={bossManualImportDraft.hasResume}
              onChange={(event) => setBossManualImportDraft((draft) => ({ ...draft, hasResume: event.target.checked }))}
              type="checkbox"
            />
            <span>已收到简历</span>
          </label>
          <button className="button primary" onClick={addManualBossCandidate} type="button">手动导入</button>
        </div>

        <div className="boss-bulk-actions">
          <span>当前筛选 {filteredBossCandidates.length} 人</span>
          <button className="table-action" onClick={() => bulkUpdateBossCandidates({ resumeReceived: true })} type="button">
            批量已收简历
          </button>
          <button className="table-action" onClick={() => bulkUpdateBossCandidates({ humanConfirmed: true })} type="button">
            批量待发送确认
          </button>
          <button className="table-action" onClick={() => bulkUpdateBossCandidates({ archived: true })} type="button">
            批量入库
          </button>
        </div>

        <div className="boss-pipeline-board">
          {filteredBossCandidates.map((candidate) => (
            <div className="boss-pipeline-row" key={candidate.candidateId}>
              <div className="boss-pipeline-main">
                <div className="boss-pipeline-title">
                  <strong>{candidate.name}</strong>
                  <span className="job-code-badge">{candidate.targetRole}</span>
                  <span className="badge">{candidate.resumeScore.total}分</span>
                </div>
                <p>
                  {bossCandidateSourceLabels[candidate.source]} / {candidate.grade} / {candidate.archiveCategory} /{' '}
                  {bossSalaryAlignmentLabels[candidate.salaryAlignment]}
                </p>
                <div className="boss-pipeline-stage-row">
                  {candidate.stages.map((stage) => (
                    <span className={`boss-stage-dot ${bossStageStatusClass(stage.status)}`} key={stage.id}>
                      {stage.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="boss-pipeline-side">
                <span className={candidate.invitationDraft ? 'chip good' : 'chip warn'}>
                  {candidate.invitationDraft
                    ? bossManualStatusLabels[candidate.invitationDraft.manualStatus]
                    : bossResumeStatusLabels[candidate.resumeCollection.status]}
                </span>
                <small>{candidate.greetingQueue.scriptModeLabel}</small>
                <small>电话 {candidate.contactExchange.phone.status === 'candidateShared' ? '已授权' : '未完成'}</small>
                <div className="boss-row-actions">
                  <button
                    className="table-action"
                    onClick={() => updateBossWorkflowState(candidate.candidateId, { humanConfirmed: true }, '确认邀约', '人工确认后进入待发送状态')}
                    type="button"
                  >
                    确认邀约
                  </button>
                  <button
                    className="table-action"
                    onClick={() => updateBossWorkflowState(candidate.candidateId, { contacted: true, resumeReceived: true }, '标记已收简历', '候选人简历或关键经历已进入本机链路')}
                    type="button"
                  >
                    已收简历
                  </button>
                  <button
                    className="table-action"
                    onClick={() =>
                      updateBossWorkflowState(
                        candidate.candidateId,
                        { archived: true, archiveReason: bossArchiveReason(candidate) },
                        '转入库',
                        bossArchiveReason(candidate),
                      )
                    }
                    type="button"
                  >
                    转入库
                  </button>
                  <button
                    className="table-action"
                    disabled={!candidate.invitationDraft}
                    onClick={() => setSelectedBossDraftId(candidate.candidateId)}
                    type="button"
                  >
                    看草稿
                  </button>
                  <button className="table-action" onClick={() => setSelectedBossDetailId(candidate.candidateId)} type="button">
                    详情
                  </button>
                </div>
                {bossWorkflowState[candidate.candidateId]?.archived && <small className="boss-local-state">本机已标记入库</small>}
              </div>
            </div>
          ))}
        </div>

        {selectedBossDraftCandidate && selectedBossDraft ? (
          <div className="boss-draft-panel">
            <div>
              <strong>{selectedBossDraftCandidate.name} / 邀约草稿</strong>
              <p>{selectedBossDraft.meetingProvider} / {bossManualStatusLabels[selectedBossDraft.manualStatus]}</p>
            </div>
            <textarea readOnly value={selectedBossDraftText} />
            <div className="boss-draft-actions">
              <button className="table-action active-action" onClick={copyBossDraft} type="button">复制草稿</button>
              <span>{bossDraftCopyStatus || '草稿不会自动发送，需要人工确认。'}</span>
            </div>
          </div>
        ) : (
          <div className="boss-draft-panel compact">
            <strong>邀约草稿</strong>
            <p>点击候选人行里的“看草稿”，可查看并复制待人工确认的线上面试邀约文案。</p>
          </div>
        )}

        {selectedBossDetailCandidate && (
          <div className="boss-detail-panel">
            <div className="boss-detail-head">
              <div>
                <strong>{selectedBossDetailCandidate.name}</strong>
                <p>
                  {selectedBossDetailCandidate.targetRole} / {bossCandidateSourceLabels[selectedBossDetailCandidate.source]} /{' '}
                  {selectedBossDetailCandidate.grade}
                </p>
              </div>
              <span className="badge level-A">{selectedBossDetailCandidate.resumeScore.total}分</span>
            </div>
            <div className="boss-detail-grid">
              <div><span>入库分类</span><strong>{selectedBossDetailCandidate.archiveCategory}</strong></div>
              <div><span>薪酬状态</span><strong>{bossSalaryAlignmentLabels[selectedBossDetailCandidate.salaryAlignment]}</strong></div>
              <div><span>简历状态</span><strong>{bossResumeStatusLabels[selectedBossDetailCandidate.resumeCollection.status]}</strong></div>
              <div><span>邀约状态</span><strong>{selectedBossDetailCandidate.invitationDraft ? bossManualStatusLabels[selectedBossDetailCandidate.invitationDraft.manualStatus] : '暂不邀约'}</strong></div>
            </div>
            <div className="boss-detail-section">
              <strong>判断理由</strong>
              <div className="mini-chip-grid">
                {selectedBossDetailCandidate.reasons.map((reason) => (
                  <span className="mini-chip on" key={reason}>{reason}</span>
                ))}
              </div>
            </div>
            <div className="boss-detail-section">
              <strong>阶段状态</strong>
              <div className="boss-pipeline-stage-row">
                {selectedBossDetailCandidate.stages.map((stage) => (
                  <span className={`boss-stage-dot ${bossStageStatusClass(stage.status)}`} key={stage.id}>
                    {stage.title}
                  </span>
                ))}
              </div>
            </div>
            <div className="boss-detail-section">
              <strong>归档说明</strong>
              <p>{bossWorkflowState[selectedBossDetailCandidate.candidateId]?.archiveReason ?? bossArchiveReason(selectedBossDetailCandidate)}</p>
            </div>
            <div className="boss-detail-section">
              <strong>本候选人操作日志</strong>
              {(bossWorkflowState[selectedBossDetailCandidate.candidateId]?.operationLog ?? []).length ? (
                (bossWorkflowState[selectedBossDetailCandidate.candidateId]?.operationLog ?? []).map((log) => (
                  <p key={`${log.at}-${log.action}`}>{log.action}{log.note ? ` / ${log.note}` : ''}</p>
                ))
              ) : (
                <p>暂无操作日志。</p>
              )}
            </div>
          </div>
        )}

        <div className="boss-action-strip">
          {bossActions.map((action) => (
            <div className={`boss-action-pill ${bossPriorityClass(action.priority)}`} key={`${action.candidateId}-${action.type}`}>
              <strong>{action.candidateName}</strong>
              <span>{action.title}</span>
            </div>
          ))}
        </div>

        <div className="boss-record-grid">
          <div className="boss-record-panel">
            <strong>最近操作日志</strong>
            {recentBossLogs.length ? (
              recentBossLogs.map((log) => (
                <div className="boss-record-row" key={`${log.candidateName}-${log.at}-${log.action}`}>
                  <span>{log.candidateName}</span>
                  <p>{log.action}{log.note ? ` / ${log.note}` : ''}</p>
                </div>
              ))
            ) : (
              <p className="muted">暂无操作。点击确认邀约、已收简历或转入库后会自动记录。</p>
            )}
          </div>
          <div className="boss-record-panel">
            <strong>入库记录</strong>
            {archivedBossRecords.length ? (
              archivedBossRecords.map(({ candidate, reason }) => (
                <div className="boss-record-row" key={candidate.candidateId}>
                  <span>{candidate.name}</span>
                  <p>{reason}</p>
                </div>
              ))
            ) : (
              <p className="muted">暂无入库记录。可以先对候选人执行“转入库”。</p>
            )}
          </div>
        </div>

        <div className="notice">
          当前链路只做草稿、队列、评分、分级、人工确认和入库演示；真实平台发送、账号托管和外部数据同步仍需后续合规接入。
        </div>
      </Card>
      <div className="grid two">
        <Card title="BOSS合规托管中控">
          <div className="boss-workflow">
            {bossManagedAccountWorkflow.map((step, index) => (
              <div className="boss-workflow-step" key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                  <small>{step.owner}</small>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="打招呼话术三模式">
          <div className="boss-script-grid">
            {bossGreetingScriptModes.map((mode) => (
              <div className="boss-script-card" key={mode.id}>
                <div className="boss-script-card-head">
                  <strong>{mode.title}</strong>
                  <span className="badge">{mode.bestFor}</span>
                </div>
                <p>{mode.detail}</p>
                <div className="mini-chip-grid">
                  {mode.inputs.map((input) => (
                    <span className="mini-chip on" key={input}>{input}</span>
                  ))}
                </div>
                <small>{mode.output}</small>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="双轨合规触达">
          <div className="boss-touch-track-list">
            {bossTouchExecutionTracks.map((track) => (
              <div className="boss-touch-track-card" key={track.id}>
                <div>
                  <strong>{track.title}</strong>
                  <p>{track.detail}</p>
                  <small>{track.suitableFor}</small>
                </div>
                <span className="chip good">{track.guardrail}</span>
              </div>
            ))}
          </div>
          <div className="notice">
            一期先做授权同步、草稿生成、RPA辅助填写、限频队列、人工确认和日志；不做绕过平台验证或异常高频发送。
          </div>
        </Card>
        <Card title="BOSS预留邮箱简历托管">
          <div className="boss-mailbox-flow">
            {bossResumeMailboxWorkflow.map((step, index) => (
              <div className="boss-mailbox-step" key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                  <small>{step.owner} / {step.guardrail}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="notice">
            候选人通过平台发送简历后，系统从托管邮箱收件、解析附件、评分排序，再把高分候选人推入优先邀约和电话跟进队列。
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="BOSS数据归集字段">
          <p className="muted">授权账号导入后，统一归集到候选看板和简历库，再按岗位匹配度排序。</p>
          <div className="boss-field-cloud">
            {bossManagedDataFields.map((field) => (
              <span className="mini-chip on" key={field}>{field}</span>
            ))}
          </div>
          <div className="notice">
            这些字段只通过官方授权、人工导入、邮箱同步或合规接口进入系统；敏感字段需要权限、脱敏和审计。
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="候选人分级邀约动作">
          <div className="boss-tier-list">
            {bossCandidateActionTiers.map((tier) => (
              <div className="boss-tier-card" key={tier.label}>
                <div>
                  <strong>{tier.label}</strong>
                  <p>{tier.action}</p>
                  <small>{tier.reviewRule}</small>
                </div>
                <span className="badge">{tier.matchRange}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="托管保护边界">
          <ul className="plain-list">
            {bossComplianceGuardrails.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}

function LaborPartTime() {
  return (
    <section>
      <PageTitle
        title="合伙兼职"
        subtitle="左侧入口统一叫合伙兼职；打开后内部按劳务、小时工、合伙、兼职、实习五块分别管理。"
        action={<button className="button primary">新增用工需求</button>}
      />
      <div className="stat-grid">
        <Stat title="用工类型" value="5" note="劳务/小时工/合伙/兼职/实习" color="blue" />
        <Stat title="需求人数" value={flexibleStaffingTotalHeadcount()} note="五块合计" color="green" />
        <Stat title="待到岗确认" value="18" note="需要HR跟进" color="yellow" />
        <Stat title="证件待核验" value="6" note="健康证/身份证" color="orange" />
        <Stat title="合伙机会" value={flexibleStaffingTotalOpenRoles()} note="岗位/项目开放数" color="green" />
      </div>
      <div className="grid two">
        <Card title="合伙兼职SOP">
          <ol className="sop">
            {flexibleStaffingSop.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
        <Card title="五类用工块">
          <div className="labor-category-tabs">
            {flexibleStaffingCategories.map((category) => (
              <span className="chip good" key={category.id}>{category.menuLabel}</span>
            ))}
          </div>
          <div className="labor-list">
            {flexibleStaffingCategories.map((category) => (
              <div className="labor-card flexible-category-card" key={category.id}>
                <div>
                  <strong>{category.title}</strong>
                  <p>{category.description}</p>
                  <div className="mini-chip-grid">
                    {category.focus.map((item) => (
                      <span className="mini-chip on" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="labor-meta">
                  <span className="badge">{category.payMode}</span>
                  <span className="chip good">{category.openRoles}个需求</span>
                  <span className="chip warn">{category.headcount}人</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

function JobSeekerModule() {
  const [researchLocked, setResearchLocked] = useState(defaultResearchLockState.locked)
  const keywordStats = keywordFrequency(marketResearchPostings)
  const benchmark = salaryBenchmark(marketResearchPostings)
  const resumePostingMatches = matchResumeProfilesToPostings(marketResearchResumeProfiles, marketResearchPostings)
  const completionSuggestions = generateJobCompletionSuggestions(marketResearchPostings)
  const missingRoleGaps = inferMissingRolesByCompanySize('成长型公司', ['大客户销售', '自媒体内容运营'], marketResearchPostings)
  const complianceBoundary = researchComplianceBoundary()

  return (
    <section>
      <PageTitle
        title={jobMarketModuleName}
        subtitle="导入多份公司授权的真实简历画像，从求职者视角匹配同行岗位，观察薪资、职责、JD关键词、招聘要求和竞争对手在招动态。"
        action={
          <button
            className={researchLocked ? 'button' : 'button primary'}
            onClick={() => setResearchLocked((locked) => !locked)}
            type="button"
          >
            {researchLocked ? <Lock size={15} /> : <Unlock size={15} />}
            {researchLocked ? '申请解锁动态' : '锁定动态'}
          </button>
        }
      />
      <Card title="动态锁定">
        <div className={`research-lock-panel ${researchLocked ? 'locked' : 'unlocked'}`}>
          <div>
            <strong>{researchLocked ? `${jobMarketModuleName}已锁定` : `${jobMarketModuleName}已解锁`}</strong>
            <p>{defaultResearchLockState.reason}</p>
            <div className="mini-chip-grid">
              {defaultResearchLockState.allowedRoles.map((role) => (
                <span className="mini-chip on" key={role}>{role}可解锁</span>
              ))}
            </div>
          </div>
          <span className={researchLocked ? 'badge level-D' : 'badge level-A'}>
            {researchLocked ? '锁定' : '观察中'}
          </span>
        </div>
        <div className="notice">
          <strong>使用边界：</strong>
          用于公司授权的市场动态观察、同行岗位研究、薪资标准采集和JD优化；只接入开放接口、公开岗位人工导入、授权账号可见信息和手工上传样本，不绕过平台反爬、不高频抓取、不保存个人账号密码、不自动替个人投递简历。
        </div>
      </Card>
      <div className="grid two">
        <Card title="真实简历画像池">
          <p className="muted">每份简历可作为一个调研画像，分别去匹配不同同行、竞争对手、招聘单位的在招岗位和薪资要求。</p>
          <div className="research-persona-grid resume-profile-grid">
            {marketResearchResumeProfiles.map((profile) => (
              <div className="research-persona-card resume-profile-card" key={profile.id}>
                <div>
                  <strong>{profile.name}</strong>
                  <p>{profile.role} / {profile.workYears}年经验 / 期望 {profile.expectedSalaryMin.toLocaleString()}-{profile.expectedSalaryMax.toLocaleString()} 元</p>
                </div>
                <span className="badge">{profile.resumeSource}</span>
                <p className="resume-profile-summary">{profile.realResumeSummary}</p>
                <div className="mini-chip-grid">
                  {profile.targetCompetitors.map((company) => (
                    <span className="mini-chip blue" key={company}>{company}</span>
                  ))}
                </div>
                <div className="persona-tag-board">
                  <div>
                    <strong>技能标签</strong>
                    <div className="mini-chip-grid">
                      {profile.profileTags.skillTags.map((tag) => (
                        <span className="mini-chip on" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>业绩标签</strong>
                    <div className="mini-chip-grid">
                      {profile.profileTags.performanceTags.map((tag) => (
                        <span className="mini-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="模拟/授权调研账号">
          <p className="muted">{researchScopeSummary(researchPersonas)}</p>
          <div className="research-persona-grid">
            {researchPersonas.map((persona) => (
              <div className="research-persona-card" key={persona.id}>
                <div>
                  <strong>{persona.name}</strong>
                  <p>{persona.role} / {persona.targetIndustry}</p>
                </div>
                <span className="badge">{persona.accountMode}</span>
                <div className="mini-chip-grid">
                  {persona.targetKeywords.map((keyword) => (
                    <span className="mini-chip on" key={keyword}>{keyword}</span>
                  ))}
                </div>
                <div className="persona-tag-board">
                  <div>
                    <strong>个人成果标签</strong>
                    <div className="mini-chip-grid">
                      {persona.profileTags.achievementTags.map((tag) => (
                        <span className="mini-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>学历标签</strong>
                    <div className="mini-chip-grid">
                      {persona.profileTags.educationTags.map((tag) => (
                        <span className="mini-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>个人技能标签</strong>
                    <div className="mini-chip-grid">
                      {persona.profileTags.skillTags.map((tag) => (
                        <span className="mini-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>业绩标签</strong>
                    <div className="mini-chip-grid">
                      {persona.profileTags.performanceTags.map((tag) => (
                        <span className="mini-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="简历匹配同行岗位">
          <div className="resume-match-list">
            {resumePostingMatches.slice(0, 6).map((match) => (
              <div className="resume-match-row" key={`${match.profileId}-${match.postingId}`}>
                <div>
                  <strong>{match.profileName}</strong>
                  <p>{match.topPostingCompany} / {match.topPostingTitle}</p>
                  <div className="mini-chip-grid">
                    {match.matchedKeywords.map((keyword) => (
                      <span className="mini-chip on" key={keyword}>{keyword}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>{match.fitScore}</strong>
                  <span>匹配分</span>
                </div>
              </div>
            ))}
          </div>
          <div className="notice">
            输出字段：{resumePostingMatches[0]?.marketSignals.join('、')}，用于判断对手哪些岗位在招、薪酬怎么给、职责怎么写、要求怎么提。
          </div>
        </Card>
        <Card title="市场关键词">
          <div className="keyword-cloud">
            {keywordStats.map((item) => (
              <span className="chip good" key={item.keyword}>
                {item.keyword} x{item.count}
              </span>
            ))}
          </div>
          <ol className="sop research-sop">
            <li>录入多份真实简历画像，用不同画像匹配同行和竞争对手岗位。</li>
            <li>采集JD关键词、薪资区间、福利要求、岗位职责和任职门槛。</li>
            <li>反向优化我们的岗位发布文案、薪酬标准和搜索关键词。</li>
          </ol>
        </Card>
      </div>
      <div className="grid two">
        <Card title="岗位补齐建议">
          <div className="market-completion-list">
            {completionSuggestions.map((suggestion) => (
              <div className="market-completion-row" key={suggestion.field}>
                <div>
                  <strong>{suggestion.field}</strong>
                  <p>{suggestion.suggestion}</p>
                </div>
                <span>{suggestion.evidenceCount}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="同规模缺岗补齐">
          <div className="missing-role-list">
            {missingRoleGaps.map((gap) => (
              <div className="missing-role-row" key={`${gap.companySize}-${gap.role}`}>
                <div>
                  <strong>{gap.role}</strong>
                  <p>{gap.reason}</p>
                  <div className="mini-chip-grid">
                    {gap.evidenceCompanies.map((company) => (
                      <span className="mini-chip on" key={company}>{company}</span>
                    ))}
                  </div>
                </div>
                <span className={gap.priority === '高' ? 'badge level-S' : gap.priority === '中' ? 'badge level-A' : 'badge'}>
                  {gap.priority}优先
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="采集边界">
          <div className="persona-tag-board">
            <div>
              <strong>允许来源</strong>
              <div className="mini-chip-grid">
                {complianceBoundary.allowedDataSources.map((source) => (
                  <span className="mini-chip on" key={source}>{source}</span>
                ))}
              </div>
            </div>
            <div>
              <strong>禁止动作</strong>
              <div className="mini-chip-grid">
                {complianceBoundary.prohibitedActions.map((item) => (
                  <span className="mini-chip danger" key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="muted">{complianceBoundary.boundaryText}</p>
          <div className="research-boundary-list">
            {complianceBoundary.storageRules.map((rule) => (
              <div key={rule}><ShieldCheck size={15} /><span>{rule}</span></div>
            ))}
          </div>
          <p className="muted">{researchCollectionPolicy.purpose}</p>
        </Card>
        <Card title="薪资基准">
          <div className="preference-grid">
            <div><WalletCards size={20} /><strong>最低样本</strong><p>{benchmark.min.toLocaleString()} 元/月</p></div>
            <div><WalletCards size={20} /><strong>最高样本</strong><p>{benchmark.max.toLocaleString()} 元/月</p></div>
            <div><BarChart3 size={20} /><strong>平均低位</strong><p>{benchmark.averageMin.toLocaleString()} 元/月</p></div>
            <div><BarChart3 size={20} /><strong>平均高位</strong><p>{benchmark.averageMax.toLocaleString()} 元/月</p></div>
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="同行岗位样本">
          <div className="job-match-list">
            {marketResearchPostings.map((posting) => (
              <div className="job-match-card" key={posting.id}>
                <div>
                  <strong>{posting.title} / {posting.company}</strong>
                  <p>
                    {posting.salaryMin.toLocaleString()}-{posting.salaryMax.toLocaleString()} 元/月 / {posting.source}
                  </p>
                  <p>要求：{posting.requirements.join('；')}</p>
                </div>
                <div className="posting-tag-stack">
                  <strong>岗位匹配标签</strong>
                  <div className="keyword-cloud compact">
                    {posting.jobMatchTags.map((tag) => (
                      <span className="mini-chip on" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <strong>JD关键词</strong>
                  <div className="keyword-cloud compact">
                    {posting.keywords.map((keyword) => (
                      <span className="mini-chip" key={keyword}>{keyword}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

function AudioAnalysis({
  selected,
  candidates,
  updateSelected,
}: {
  selected: Candidate
  candidates: Candidate[]
  updateSelected: (patch: Partial<Candidate>) => void
}) {
  const callQualityScore = hrCallQualityScore(hrCallQualityItems)
  const audioTranscript = [
    selected.transcript,
    '候选人在电话里补充：我愿意先做线上初试和限时作业，对AI硬件行业比较看好。',
    '他提到自己能讲清成交链路，有业绩结果，也愿意继续学习产品知识。',
            '候选人如果主动表达相信塔罗牌、星座、八字等文化兴趣，且明确愿意提供，只进入自愿文化备注，不进入评分。',
  ].join('\n')
  const intakeRecord = createAudioIntakeRecord({
    candidateNameHint: selected.name,
    candidatePhoneHint: selected.phone,
    consentStatus: 'pending',
    deviceId: recruitingPhoneDevices[0].id,
    durationSeconds: 1260,
    fileName: `${selected.name}-phone-interview.m4a`,
    fileUrl: `recruiting-phone://${selected.id}/${selected.phone}`,
    pushedAt: '2026-06-19T11:00:00+08:00',
    sourceType: 'phone_call',
    transcript: audioTranscript,
  })
  const candidateMatch = matchCandidateFromAudio(
    { candidateNameHint: selected.name, candidatePhoneHint: selected.phone },
    candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      phone: candidate.phone,
      postName: candidate.postName,
    })),
  )
  const audioReport = buildAudioInterviewReport({
    candidateName: selected.name,
    jobName: selected.postName,
    transcript: audioTranscript,
  })
  const intakeSources = Object.entries(audioSourceTypeLabels)
  const tencentMeetingCodeSupported = meetingPlatformSupportsAccessMethod('tencent_meeting', 'meeting_code')
  const meetingImportRequests = [
    createMeetingAudioImportRequest({
      accessMethod: 'meeting_code',
      candidateNameHint: selected.name,
      consentStatus: 'confirmed',
      hostName: '陈HR',
      meetingCode: '123 456 789',
      meetingLink: 'https://meeting.tencent.com/dm/demo-interview',
      meetingRoomName: '腾讯会议-初试房间',
      platformId: 'tencent_meeting',
      recordingAuthorization: 'confirmed',
      round: 'first',
      scheduledAt: '2026-06-19T14:00:00+08:00',
    }),
    createMeetingAudioImportRequest({
      accessMethod: 'scan_qr',
      candidateNameHint: selected.name,
      consentStatus: 'pending',
      hostName: '业务部门长',
      platformId: 'dingtalk_meeting',
      qrPayload: 'dingtalk://meeting/secure-token',
      recordingAuthorization: 'pending',
      round: 'second',
      scheduledAt: '2026-06-20T10:00:00+08:00',
    }),
    createMeetingAudioImportRequest({
      accessMethod: 'room_password',
      candidateNameHint: selected.name,
      consentStatus: 'confirmed',
      hostName: '老板/终试官',
      meetingLink: 'https://vc.feishu.cn/j/final-interview',
      meetingPassword: '888999',
      meetingRoomName: '飞书会议-终试董事会议室',
      platformId: 'feishu_meeting',
      recordingAuthorization: 'confirmed',
      round: 'final',
      scheduledAt: '2026-06-21T16:00:00+08:00',
    }),
  ]
  const meetingArchivePackage = buildMeetingArchivePackage({
    aiSuggestions: [
      '复试继续追问业绩口径、个人贡献占比和可提供的佐证材料。',
      '终试前核对薪资期望、通勤方案、作业完成态度和入职时间。',
      '会议账号接入只走官方授权、云录制或手动上传，不做静默入会。',
    ],
    candidateId: selected.id,
    candidateName: selected.name,
    meetingRequests: meetingImportRequests,
    minutes: `${selected.name}在录音中说明了${selected.postName}相关经历，系统已提取岗位理解、能力证据、产业认知和积极配合度。`,
    outline: ['会议入口核验', '身份与岗位确认', '履历与业绩追问', '薪资与通勤确认', '下一轮安排'],
    transcript: audioTranscript,
  })

  return (
    <section>
      <PageTitle
        title="面试录音AI解析"
        subtitle="支持公司招聘手机、腾讯会议、钉钉会议、企微会议、飞书会议和电话会议录音导入；ASR后生成报告、图谱和HR质检。"
        action={
          <>
            <button className="button" onClick={() => updateSelected({ audioStatus: '解析中' })}>模拟解析</button>
            <button className="button primary" onClick={() => updateSelected({ audioStatus: '已解析' })}>标记已解析</button>
          </>
        }
      />
      <Card title="会议录音接入中心">
        <div className="meeting-adapter-grid">
          {meetingPlatformAdapters.map((adapter) => (
            <div className="meeting-adapter-card" key={adapter.id}>
              <div className="meeting-adapter-head">
                <strong>{adapter.label}</strong>
                <span>{adapter.backendSlug}</span>
              </div>
              <p>{adapter.note}</p>
              <div className="mini-chip-grid">
                {adapter.accessMethods.map((method) => (
                  <span className="mini-chip on" key={method}>{meetingAccessMethodLabels[method]}</span>
                ))}
              </div>
              <div className="meeting-mode-list">
                {adapter.recordingModes.map((mode) => (
                  <small key={mode}>{mode}</small>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="meeting-connect-panel">
          <label>
            <span>会议平台</span>
            <select defaultValue="tencent_meeting">
              {meetingPlatformAdapters.map((adapter) => (
                <option key={adapter.id} value={adapter.id}>{adapter.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>接入方式</span>
            <select defaultValue="meeting_code">
              {Object.entries(meetingAccessMethodLabels).map(([method, label]) => (
                <option key={method} value={method}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>参会码/扫码内容/会议链接</span>
            <input defaultValue="123 456 789（界面只展示脱敏结果）" />
          </label>
          <label>
            <span>会议室名称/密码</span>
            <input defaultValue="腾讯会议-初试房间 / ******" />
          </label>
          <label>
            <span>面试轮次</span>
            <select defaultValue="first">
              {Object.entries(interviewRoundLabels).map(([round, label]) => (
                <option key={round} value={round}>{label}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mini-chip-grid">
          <span className={tencentMeetingCodeSupported ? 'mini-chip on' : 'mini-chip'}>
            腾讯会议参会码：{tencentMeetingCodeSupported ? '已预留' : '待配置'}
          </span>
          <span className="mini-chip">二维码/参会码/会议链接脱敏展示</span>
          <span className="mini-chip">会议室名可明示，密码只脱敏</span>
          <span className="mini-chip">正式后端加密存储授权令牌</span>
        </div>
        <div className="notice risk-note">
          {audioComplianceWarnings.meetingRecordingAuthRequired} {audioComplianceWarnings.meetingNoSilentJoin} {audioComplianceWarnings.meetingSecretMasked}
        </div>
      </Card>

      <Card title="初复终录音矩阵">
        <div className="round-recording-grid">
          {meetingImportRequests.map((request) => (
            <div className={request.status === '待拉取录音' ? 'round-recording-card ready' : 'round-recording-card pending'} key={request.id}>
              <div className="round-recording-head">
                <div>
                  <strong>{request.roundLabel} / {request.platformLabel}</strong>
                  <p>{request.hostName} / {describeMeetingAccessCredential(request)}</p>
                </div>
                <span>{request.status}</span>
              </div>
              <div className="audio-record-meta">
                <span>候选人：{request.candidateNameHint}</span>
                <span>接口：{request.backendPath}</span>
                <span>链接：{request.meetingLinkMasked}</span>
                <span>参会授权：{request.consentStatus === 'confirmed' ? '已确认' : '待确认'}</span>
                <span>录制授权：{request.recordingAuthorization === 'confirmed' ? '已确认' : '待确认'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="meeting-sop-chain">
          <span>录入参会码/扫码</span>
          <span>确认参会者知情</span>
          <span>拉取云录制或上传文件</span>
          <span>ASR转写与候选人匹配</span>
          <span>生成初复终分轮报告</span>
        </div>
      </Card>

      <Card title="会议录音合并归档包">
        <div className="meeting-archive-summary">
          <div>
            <strong>{meetingArchivePackage.candidateName} / 面试会议档案</strong>
            <code>{meetingArchivePackage.archivePath}</code>
            <p>{meetingArchivePackage.minutes}</p>
          </div>
          <span className="badge level-A">原文+纪要+大纲+AI建议</span>
        </div>
        <div className="meeting-archive-grid">
          <div>
            <strong>入口汇总</strong>
            {meetingArchivePackage.accessSummary.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div>
            <strong>提炼大纲</strong>
            {meetingArchivePackage.outline.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div>
            <strong>AI分析建议</strong>
            {meetingArchivePackage.aiSuggestions.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div className="mini-chip-grid">
          {meetingArchivePackage.sections.map((section) => (
            <span className="mini-chip on" key={section}>{section}</span>
          ))}
        </div>
        <div className="notice risk-note">{meetingArchivePackage.complianceNotes.join(' ')}</div>
      </Card>

      <div className="grid two">
        <Card title="招聘手机接入">
          <div className="phone-intake-head">
            <div>
              <strong>后台接入路径</strong>
              <code>{audioBackendPushPath}</code>
              <p>每台公司招聘手机通过专用链接或轻量App，把通话、微信语音、线上面试录音的文件链接推送到后台。</p>
            </div>
            <span className="badge level-A">1.2支持小米/OPPO/vivo</span>
          </div>
          <div className="phone-device-grid">
            {recruitingPhoneDevices.map((device) => (
              <div className={isSupportedRecruitingPhone(device) ? 'phone-device-card online' : 'phone-device-card warning'} key={device.id}>
                <div>
                  <strong>{device.brand} {device.model}</strong>
                  <p>{device.ownerName} / {device.department}</p>
                </div>
                <span>{isSupportedRecruitingPhone(device) ? '可接入' : '待核验'}</span>
              </div>
            ))}
          </div>
          <div className="mini-chip-grid">
            {intakeSources.map(([source, label]) => (
              <span className="mini-chip on" key={source}>{label}</span>
            ))}
          </div>
          <div className="notice risk-note">
            {audioComplianceWarnings.companyPhoneOnly} {audioComplianceWarnings.noPermissionBypass}
          </div>
        </Card>

        <Card title="录音链接推送队列">
          <div className="audio-intake-record">
            <div className="audio-record-head">
              <div>
                <strong>{intakeRecord.fileName}</strong>
                <p>{audioSourceTypeLabels[intakeRecord.sourceType]} / {Math.round(intakeRecord.durationSeconds / 60)}分钟 / {intakeRecord.deviceBrand}</p>
              </div>
              <span className={intakeRecord.status === '待解析' ? 'badge level-A' : 'badge level-C'}>{intakeRecord.status}</span>
            </div>
            <div className="audio-record-meta">
              <span>同事：{intakeRecord.assignedHrName}</span>
              <span>部门：{intakeRecord.department}</span>
              <span>候选人提示：{intakeRecord.candidateNameHint}</span>
              <span>电话：{intakeRecord.candidatePhoneHint}</span>
            </div>
          </div>
          <ol className="sop compact-sop">
            <li>招聘手机完成通话或微信语音后，手机端把录音文件链接推送后台。</li>
            <li>后台记录设备、HR同事、部门、来源类型、候选人姓名/电话提示。</li>
            <li>候选人授权确认后，进入ASR转写、候选人匹配和AI报告生成。</li>
          </ol>
          <div className="warning-list">
            {intakeRecord.warnings.map((warning) => (
              <div className="warning-row" key={warning}>{warning}</div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="候选人电话匹配">
          <div className="match-panel">
            <div>
              <span>匹配候选人</span>
              <strong>{candidateMatch.candidateName}</strong>
            </div>
            <div>
              <span>可信度</span>
              <strong>{candidateMatch.confidence}</strong>
            </div>
            <div>
              <span>档案ID</span>
              <strong>{candidateMatch.candidateId ?? '待人工确认'}</strong>
            </div>
          </div>
          <p className="muted">{candidateMatch.reason}</p>
          <div className="form-grid">
            <label>
              <span>候选人姓名</span>
              <input defaultValue={selected.name} />
            </label>
            <label>
              <span>应聘岗位</span>
              <input defaultValue={selected.postName} />
            </label>
            <label>
              <span>电话面试来源</span>
              <select defaultValue="phone_call">
                {intakeSources.map(([source, label]) => (
                  <option key={source} value={source}>{label}</option>
                ))}
              </select>
            </label>
            <label>
              <span>授权状态</span>
              <select defaultValue={intakeRecord.consentStatus}>
                <option value="confirmed">已授权</option>
                <option value="pending">待授权确认</option>
                <option value="rejected">拒绝使用</option>
              </select>
            </label>
          </div>
          <div className="notice risk-note">{audioComplianceWarnings.consentRequired}</div>
        </Card>

        <Card title="录音面试报告">
          <div className="final-score-panel">
            <div>
              <span>岗位匹配</span>
              <strong>{audioReport.jobMatchScore}</strong>
            </div>
            <div>
              <span>关键词</span>
              <strong>{audioReport.keywords.length}</strong>
            </div>
            <div>
              <span>报告状态</span>
              <strong>{selected.audioStatus}</strong>
            </div>
          </div>
          <p>{audioReport.summary}</p>
          <div className="keyword-cloud">
            {audioReport.keywords.map((keyword) => (
              <span className="mini-chip on" key={keyword}>{keyword}</span>
            ))}
          </div>
          <div className="notice">{audioReport.scoringBoundary}</div>
        </Card>
      </div>
      <Card title="思维导图与能力图谱">
        <div className="audio-map-grid">
          <div className="mindmap-list">
            {audioReport.mindMapNodes.map((node) => (
              <div className="mindmap-node" key={node.title}>
                <strong>{node.title}</strong>
                <div className="mini-chip-grid">
                  {node.items.map((item) => (
                    <span className="mini-chip" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="audio-graph-list">
            <strong>能力图谱</strong>
            {audioReport.abilityGraph.map((point) => (
              <div className="audio-graph-row" key={point.label}>
                <span>{point.label}</span>
                <progress max="100" value={point.score} />
                <b>{point.score}</b>
                <small>{point.evidence}</small>
              </div>
            ))}
          </div>
          <div className="audio-graph-list">
            <strong>沟通风格图谱</strong>
            {audioReport.communicationGraph.map((point) => (
              <div className="audio-graph-row" key={point.label}>
                <span>{point.label}</span>
                <progress max="100" value={point.score} />
                <b>{point.score}</b>
                <small>{point.evidence}</small>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className="grid two">
        <Card title="录音上传">
          <div className="upload-box">
            <Mic size={34} />
            <strong>拖拽或选择 mp3 / wav / aac / m4a</strong>
            <p>最大200MB，最长180分钟。文件正式版将走鉴权下载和审计日志。</p>
            <input type="file" accept="audio/*" />
          </div>
          <div className="notice">当前状态：{selected.audioStatus}</div>
        </Card>
        <Card title="转写与一致性分析">
          <textarea defaultValue={selected.transcript} />
          <div className="timeline small">
            <div className="timeline-item">
              <span className="badge">ASR</span>
              <p>语音转文字生成完整面试笔录。</p>
            </div>
            <div className="timeline-item">
              <span className="badge">抽取</span>
              <p>提取9大通用维度和岗位问卷字段。</p>
            </div>
            <div className="timeline-item">
              <span className="badge level-C">核验</span>
              <p>对比简历和录音回答，生成待追问项。</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="候选人自愿文化备注">
          <div className="cultural-note-panel">
            <div>
              <span>采集方式</span>
              <strong>候选人自愿提供</strong>
            </div>
            <div>
              <span>评分状态</span>
              <strong>不进入评分</strong>
            </div>
            <div>
              <span>决策状态</span>
              <strong>不作录用依据</strong>
            </div>
          </div>
          <div className="form-grid">
            <label>
              <span>自愿文化兴趣备注</span>
              <input defaultValue="塔罗牌、星座、八字等仅在候选人相信且愿意提供时记录；未提供不追问、不补采。" />
            </label>
            <label>
              <span>文化偏好备注</span>
              <input defaultValue="可记录候选人自愿表达的沟通偏好、作息偏好、团队相处偏好等非决策备注。" />
            </label>
            <label className="wide">
              <span>面试官询问边界</span>
              <input defaultValue={culturalNotePolicy.interviewerPrompt} />
            </label>
            <label className="wide">
              <span>系统隔离说明</span>
              <textarea defaultValue={culturalNotePolicy.note} />
            </label>
          </div>
          <div className="notice">
            塔罗牌、星座、八字、五行等内容不能用于岗位匹配、稳定性预测、性格预测、发展预测、录用或淘汰；系统只在候选人相信且明确愿意时，作为自愿文化兴趣备注隔离保存。
          </div>
        </Card>

        <Card title="HR电话质检与尽责监督">
          <div className="final-score-panel">
            <div>
              <span>质检分</span>
              <strong>{callQualityScore}</strong>
            </div>
            <div>
              <span>已完成项</span>
              <strong>{hrCallQualityItems.filter((item) => item.completed).length}/{hrCallQualityItems.length}</strong>
            </div>
            <div>
              <span>质检结论</span>
              <strong>{callQualityScore >= 85 ? '优秀' : callQualityScore >= 70 ? '需补充' : '不合格'}</strong>
            </div>
          </div>
          <div className="call-quality-list">
            {hrCallQualityItems.map((item) => (
              <div className={item.completed ? 'call-quality-item done' : 'call-quality-item missing'} key={item.id}>
                <span>{item.completed ? '完成' : '待补'}</span>
                <div>
                  <strong>{item.label}</strong>
                  <p>权重 {item.weight} 分，来自电话录音转写和AI质检。</p>
                </div>
              </div>
            ))}
          </div>
          <div className="notice">
            系统可从电话面试录音中检查HR是否尽职尽责：是否说明录音和资料使用边界、是否追问关键经历、是否确认薪资和面试时间、是否告知下一步。
          </div>
        </Card>
      </div>
    </section>
  )
}

function InterviewOrchestration({ selected }: { selected: Candidate }) {
  const interviewerPool = ['张总', '陈HR', '王主管', '业务部门长', '技术负责人']
  const [workflowTemplateId, setWorkflowTemplateId] = useState<InterviewWorkflowTemplateId>('online-standard')
  const [decisionOwner, setDecisionOwner] = useState<InterviewDecisionOwner>('用人单位决定')
  const interviewWorkflow = buildInterviewWorkflow({
    decisionOwner,
    templateId: workflowTemplateId,
  })
  const selectedInterviewRounds = interviewWorkflow.steps
    .filter(isInterviewRoundStep)
    .map((step) => ({
      durationMinutes: step.durationMinutes,
      id: step.id,
      interviewerMode: step.interviewerMode ?? '随机抽签',
      name: step.name,
      score: step.score ?? 0,
      taskMode: step.taskMode ?? '现场答题',
    }))
  const interviewRoundRows = buildInterviewRoundExecutionRows({
    designatedInterviewers: { second: '张总', fourth: '老板' },
    interviewerPool,
    workflow: interviewWorkflow,
  })
  const totalInterviewScore = calculateInterviewTotal(selectedInterviewRounds)
  const archivedRounds: InterviewRoundArchive[] = [
    {
      audioMinutes: `${selected.name}能够说明${selected.postName}岗位动机、核心经历和薪资期望，待复试继续追问真实性和案例细节。`,
      audioOutline: ['岗位动机', '履历关键节点', '业绩/作品佐证', '薪资期望', '下一步安排'],
      audioRecordings: [
        {
          durationSeconds: 1260,
          fileName: `${selected.name}-初试录音.mp3`,
          id: `${selected.id}-first-audio`,
          storagePath: `/interviews/${selected.id}/first/audio.mp3`,
        },
      ],
      interviewerScores: [
        {
          evaluatorName: '陈HR',
          evaluatorRole: 'HR',
          score: selectedInterviewRounds[0]?.score ?? interviewRounds[0].score,
          summary: '基础匹配较好，建议进入复试。',
        },
      ],
      questions: [
        { answerSummary: '候选人能说明核心项目和岗位动机。', id: 'q-motive', prompt: '请介绍你为什么考虑这个岗位。' },
        { answerSummary: '候选人能描述代表性成果。', id: 'q-proof', prompt: '请说明一个最能代表你能力的成果。' },
      ],
      round: 'first',
    },
    {
      audioMinutes: '',
      audioOutline: [],
      audioRecordings: [],
      interviewerScores: [],
      questions: [
        { answerSummary: '待复试作答。', id: 'q-second-case', prompt: '请准备一个岗位相关案例复盘。' },
      ],
      round: 'second',
    },
  ]
  const interviewArchive = createCandidateInterviewArchive({
    backupContact: {
      authorized: true,
      backupEmail: `candidate-${selected.id}-backup@example.com`,
      backupWechat: `candidate-${selected.id}-backup-wechat`,
      secondContactName: '第二联系人',
      secondContactPhone: '13900000000',
      secondContactRelation: '紧急联系/资料补充联系人',
    },
    candidateId: selected.id,
    candidateName: selected.name,
    rounds: archivedRounds,
  })
  const generatedQuestionTypes = [
    '岗位专业面试问卷',
    '心理测试问卷',
    '现场作业题',
    '限时回家作业题',
    '面试官评估表',
  ]

  return (
    <section>
      <PageTitle
        title="灵活面试编排中心"
        subtitle={`${selected.name} / ${selected.postName}：简历评估、邀约在线面试、在线面试、初试、复试、终试和加试都可以自由选择组合。`}
        action={
          <>
            <button className="button">生成当前流程排期</button>
            <button className="button primary">AI生成问卷与作业</button>
          </>
        }
      />

      <Card title="面试流程配置">
        <div className="interview-config-panel">
          <div>
            <strong>选择面试流程模板</strong>
            <p>可以按岗位复杂度选择一次、二次、三次、四次，也可以使用在线+三轮标准流程；正式版会允许管理员保存更多自定义模板。</p>
          </div>
          <div className="interview-template-grid">
            {interviewWorkflowTemplates.map((template) => (
              <button
                className={template.id === workflowTemplateId ? 'template-button active' : 'template-button'}
                key={template.id}
                onClick={() => setWorkflowTemplateId(template.id)}
                type="button"
              >
                <strong>{template.name}</strong>
                <span>{template.description}</span>
              </button>
            ))}
          </div>
          <div className="decision-owner-panel">
            <strong>流程决定权限</strong>
            <div className="segmented-control">
              {(['面试官决定', '用人单位决定', '系统管理员决定'] as InterviewDecisionOwner[]).map((owner) => (
                <button
                  className={owner === decisionOwner ? 'active' : ''}
                  key={owner}
                  onClick={() => setDecisionOwner(owner)}
                  type="button"
                >
                  {owner}
                </button>
              ))}
            </div>
          </div>
          <div className="notice">{summarizeInterviewWorkflow(interviewWorkflow)}</div>
        </div>
      </Card>

      <Card title="三轮面试长条执行表">
        <div className="interview-round-strip">
          <div className="interview-round-strip-head">
            <span>轮次</span>
            <span>预约</span>
            <span>调度</span>
            <span>面试官</span>
            <span>筛选分类 / 面试题</span>
            <span>地点</span>
            <span>现场表现</span>
            <span>题目水准</span>
            <span>评分</span>
            <span>下一步</span>
          </div>
          {interviewRoundRows.map((row) => (
            <div className="interview-round-strip-row" key={row.id}>
              <div className="round-index-cell">
                <span>{row.sequence}</span>
                <strong>{row.roundName}</strong>
                <small>{row.durationMinutes}分钟 / {row.taskMode}</small>
              </div>
              <div className="compact-cell">
                <b>{row.scheduledAt}</b>
                <small>可双向确认调整</small>
              </div>
              <div className="compact-cell">
                <b>{row.dispatchMode}</b>
                <small>支持抽签或指定</small>
              </div>
              <div className="compact-cell">
                <b>{row.interviewers.join('、') || '待指定'}</b>
                <small>后备面试官可接替</small>
              </div>
              <div className="wide-cell">
                <strong>{row.screeningCategory}</strong>
                <p>{row.question}</p>
                <div className="mini-chip-grid">
                  {row.evidence.map((item) => (
                    <span className="mini-chip" key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="compact-cell">
                <b>{row.location}</b>
                <small>线上/线下均可</small>
              </div>
              <div className="wide-cell">
                <p>{row.livePerformance}</p>
              </div>
              <div className="wide-cell">
                <p>{row.questionQuality}</p>
              </div>
              <div className="score-cell">
                <span>面试 {row.interviewScore}</span>
                <span>作业/作品 {row.assignmentScore}</span>
              </div>
              <div className="wide-cell action-cell">
                <p>{row.nextAction}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="notice">
          三轮面试按长条固定字段展示：筛选分类、排面试官、面试题、面试地点、现场表现、题目水准、面试评分、作品/作业评分和下一步动作都在同一行里，便于横向对比。
        </div>
      </Card>

      <div className="grid two">
        <Card title="面试官排班与抽签">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>轮次</th>
                  <th>调度方式</th>
                  <th>面试官</th>
                  <th>候选时间</th>
                </tr>
              </thead>
              <tbody>
                {selectedInterviewRounds.map((round, index) => {
                  const assigned = assignInterviewers(interviewerPool, round.interviewerMode, index === 1 ? '张总' : undefined)
                  return (
                    <tr key={round.id}>
                      <td>{round.name}</td>
                      <td>{round.interviewerMode}</td>
                      <td>{assigned.join('、') || '待指定'}</td>
                      <td>第{index + 1}轮候选时段 / 可人工调整</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="notice">
            面试官可由系统随机抽签，也可由HR、部门长、老板或管理员手动指定；流程轮次数可以由面试官、用人单位或系统管理员决定。
          </div>
        </Card>

        <Card title="AI问卷与作业生成">
          <div className="question-kit-grid">
            {generatedQuestionTypes.map((type) => (
              <div className="question-kit-card" key={type}>
                <Sparkles size={18} />
                <strong>{type}</strong>
                <p>结合{selected.postName}岗位、简历长板短板、面试轮次和上一轮表现自动生成。</p>
              </div>
            ))}
          </div>
          <div className="notice">
            题目支持随机抽取或指定抽取；作业支持现场完成，也支持回去后限定时间完成并自动记录提交状态。
          </div>
        </Card>
      </div>

      <div className="grid two">
        <Card title="授权调查任务">
          <div className="investigation-list">
            {investigationItems.map((item) => (
              <div className="investigation-card" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.legalChannel}</p>
                </div>
                <span className="chip warn">{item.requiresConsent ? '需候选人授权' : '公开信息'}</span>
              </div>
            ))}
          </div>
          <div className="notice">
            调查必须基于候选人同意或合法公开渠道；包括学信网、企查查、公开裁判文书、证明人电话/邮箱/微信、岗位相关体检材料等。
          </div>
        </Card>

        <Card title="面试档案">
          <div className="archive-contact-panel">
            <div>
              <strong>{interviewArchive.candidateName} / 备用联系信息</strong>
              <p>第二联系人：{interviewArchive.backupContact.secondContactName} / {interviewArchive.backupContact.secondContactPhone}</p>
              <p>联系人关系：{interviewArchive.backupContact.secondContactRelation}</p>
              <p>备用邮箱：{interviewArchive.backupContact.backupEmail} / 备用微信：{interviewArchive.backupContact.backupWechat}</p>
            </div>
            <span className={interviewArchive.backupContactWarnings.length ? 'chip warn' : 'chip good'}>
              {interviewArchive.backupContactWarnings.length ? interviewArchive.backupContactWarnings.join('、') : '已授权留存'}
            </span>
          </div>
          <div className="mini-chip-grid">
            {interviewArchive.retentionItems.map((item) => (
              <span className="mini-chip on" key={item}>{item}</span>
            ))}
          </div>
          <div className="interview-archive-grid">
            {interviewArchive.rounds.map((round) => {
              const completeness = roundArchiveCompleteness(round)

              return (
                <div className={completeness.complete ? 'interview-archive-card complete' : 'interview-archive-card pending'} key={round.round}>
                  <div className="archive-card-head">
                    <strong>{interviewArchiveRoundLabels[round.round]}</strong>
                    <span className={completeness.complete ? 'chip good' : 'chip warn'}>
                      {completeness.complete ? '完整' : `待补：${completeness.missing.join('、')}`}
                    </span>
                  </div>
                  <div className="archive-metric-row">
                    <span>问题 {round.questions.length}</span>
                    <span>录音 {round.audioRecordings.length}</span>
                    <span>纲要 {round.audioOutline.length}</span>
                    <span>评分人 {round.interviewerScores.length}</span>
                  </div>
                  <p>{round.audioMinutes || '待面试后自动生成录音纪要。'}</p>
                </div>
              )
            })}
          </div>
          <div className="notice">
            面试档案按当前流程留档；所有问题、对话录音、录音纲要、纪要、评分分数和评分人都进入候选人档案。备用联系方式仅在候选人授权后用于招聘沟通和资料补充。
          </div>
        </Card>

        <Card title="面试总评">
          <div className="final-score-panel">
            <div>
              <span>{interviewWorkflow.interviewRoundCount}轮平均分</span>
              <strong>{totalInterviewScore}</strong>
            </div>
            <div>
              <span>简历综合分</span>
              <strong>{selected.totalScore}</strong>
            </div>
            <div>
              <span>最终建议</span>
              <strong>{totalInterviewScore >= 85 && selected.totalScore >= 80 ? '优先推进' : '继续复核'}</strong>
            </div>
          </div>
          <ol className="sop">
            <li>简历评估先判断基础匹配、工作时间线、稳定性和履历风险。</li>
            <li>邀约与在线面试确认时间、渠道、薪资边界、联系方式和录音/资料授权。</li>
            <li>初试、复试、终试和加试按岗位复杂度自由组合，分别看基础匹配、专业深度、长期价值和最终录用边界。</li>
            <li>当前流程总分结合授权调查结果，输出录用、储备、淘汰或继续调查。</li>
          </ol>
        </Card>
      </div>
    </section>
  )
}

function ReviewHomework({
  selected,
  updateSelected,
}: {
  selected: Candidate
  updateSelected: (patch: Partial<Candidate>) => void
}) {
  const homeworkStorage = browserLocalStorage()
  const defaultCandidateHomeworkTasks = defaultThreeStageHomeworkTasks.map((task) => ({
    ...task,
    candidateName: selected.name,
    jobName: selected.postName,
  }))
  const [homeworkTasks, setHomeworkTasks] = useState<ThreeStageHomeworkTask[]>(() =>
    readPersistedValue(homeworkStorage, localPersistenceKeys.threeStageHomeworkTasks, defaultCandidateHomeworkTasks),
  )
  const homeworkSummary = summarizeHomeworkTracking(homeworkTasks)
  const caseStudies = buildCaseStudyArchive(homeworkTasks)
  const updateHomeworkTask = (
    taskId: string,
    patch: Partial<ThreeStageHomeworkTask>,
  ) => {
    setHomeworkTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, ...patch } : task)))
  }

  useEffect(() => {
    writePersistedValue(homeworkStorage, localPersistenceKeys.threeStageHomeworkTasks, homeworkTasks)
  }, [homeworkStorage, homeworkTasks])
  const assignThreeStageHomework = () => {
    const nextStatus: CandidateStatus = '待作业'
    updateSelected({
      homeworkStatus: '待提交',
      operationLog: [
        {
          action: '布置三轮作业',
          at: new Date().toISOString(),
          fromStatus: selected.status,
          note: `已布置 ${homeworkSummary.total} 个作业任务`,
          toStatus: nextStatus,
        },
        ...(selected.operationLog ?? []),
      ].slice(0, 12),
      status: nextStatus,
    })
  }
  const updateCandidateHomeworkStatus = (homeworkStatus: Candidate['homeworkStatus']) => {
    updateSelected({
      homeworkStatus,
      operationLog: [
        {
          action: '更新作业提交状态',
          at: new Date().toISOString(),
          fromStatus: selected.status,
          note: `作业状态：${selected.homeworkStatus} -> ${homeworkStatus}`,
          toStatus: selected.status,
        },
        ...(selected.operationLog ?? []),
      ].slice(0, 12),
    })
  }

  return (
    <section>
      <PageTitle
        title="三轮作业中心"
        subtitle="初试、复试、终试的出题、考官、答卷、邮件电话追踪、评分、存档和优秀案例沉淀。"
        action={<button className="button primary" onClick={assignThreeStageHomework}>布置三轮作业</button>}
      />
      <Card title="三轮作业总览">
        <div className="final-score-panel">
          <div>
            <span>作业总数</span>
            <strong>{homeworkSummary.total}</strong>
          </div>
          <div>
            <span>已交答卷</span>
            <strong>{homeworkSummary.submittedAnswers}</strong>
          </div>
          <div>
            <span>优秀案例</span>
            <strong>{caseStudies.length}</strong>
          </div>
        </div>
        <div className="homework-status-grid">
          <div><MailCheck size={18} /><strong>邮件待跟进</strong><span>{homeworkSummary.emailPending}</span></div>
          <div><MessageSquareText size={18} /><strong>电话待跟进</strong><span>{homeworkSummary.phonePending}</span></div>
          <div><FileStack size={18} /><strong>普通归档</strong><span>{homeworkSummary.archived}</span></div>
          <div><BadgeCheck size={18} /><strong>当前候选人</strong><span>{selected.name}</span></div>
        </div>
      </Card>
      <Card title="初试复试终试作业">
        <div className="three-homework-grid">
          {homeworkTasks.map((task) => (
            <div className="three-homework-card" key={task.id}>
              <div className="three-homework-head">
                <span>{homeworkRoundLabels[task.round]}</span>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.jobName} / 限时 {task.dueHours} 小时</p>
                </div>
              </div>
              <div className="homework-meta-grid">
                <span>出题人：{task.questionOwner}</span>
                <span>考官：{task.examiner}</span>
                <span>答卷：{task.answerSystem}</span>
                <span>追踪：{task.trackingSystem}</span>
              </div>
              <div className="mini-chip-grid">
                <span className={task.answerStatus === '已提交' ? 'mini-chip on' : 'mini-chip'}>{task.answerStatus}</span>
                <span className={task.archiveStatus === '优秀案例' ? 'mini-chip on' : 'mini-chip'}>{task.archiveStatus}</span>
                <span className="mini-chip">评分 {calculateHomeworkScore(task)}</span>
              </div>
              <div className="homework-card-actions">
                <button
                  className="button light"
                  onClick={() =>
                    updateHomeworkTask(task.id, {
                      answerStatus: task.answerStatus === '已提交' ? '未提交' : '已提交',
                      submittedAt: task.answerStatus === '已提交' ? undefined : new Date().toISOString(),
                    })
                  }
                  type="button"
                >
                  切换提交
                </button>
                <button
                  className="button light"
                  onClick={() =>
                    updateHomeworkTask(task.id, {
                      archiveStatus: task.archiveStatus === '优秀案例' ? '已归档' : '优秀案例',
                      candidateAuthorizedArchive: true,
                    })
                  }
                  type="button"
                >
                  设为案例
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid two">
        <Card title="邮件电话追踪">
          <div className="tracking-list">
            {homeworkTasks.map((task) => (
              <div className="tracking-card" key={task.id}>
                <div>
                  <strong>{homeworkRoundLabels[task.round]} / {task.title}</strong>
                  <p>邮件：{task.emailFollowStatus} / 电话：{task.phoneFollowStatus}</p>
                </div>
                <button
                  className="table-action"
                  onClick={() =>
                    updateHomeworkTask(task.id, {
                      emailFollowStatus: task.emailFollowStatus === '待跟进' ? '已确认' : '待跟进',
                      phoneFollowStatus: task.phoneFollowStatus === '待跟进' ? '已确认' : '待跟进',
                    })
                  }
                  type="button"
                >
                  {task.answerStatus}
                </button>
              </div>
            ))}
          </div>
          <ol className="sop compact-sop">
            <li>作业发出后自动登记邮件跟踪和电话跟踪任务。</li>
            <li>候选人提交答卷后进入评分系统；逾期或未提交进入催缴队列。</li>
            <li>每轮作业和沟通记录都绑定候选人档案，便于复盘。</li>
          </ol>
        </Card>
        <Card title="答卷与评分系统">
          <div className="score-rubric-list">
            {homeworkTasks[0].scoreItems.map((item) => (
              <div className="score-rubric-row" key={item.label}>
                <span>{item.label}</span>
                <progress max="100" value={item.score} />
                <b>{item.score}</b>
                <small>权重 {item.weight}%</small>
              </div>
            ))}
          </div>
          <div className="form-grid">
            <label><span>提交状态</span><select value={selected.homeworkStatus} onChange={(event) => updateCandidateHomeworkStatus(event.target.value as Candidate['homeworkStatus'])}><option>无作业</option><option>待提交</option><option>按时提交</option><option>逾期</option><option>放弃</option></select></label>
            <label><span>作业态度</span><select defaultValue="正常"><option>积极</option><option>正常</option><option>敷衍</option><option>抵触拖延</option></select></label>
            <label className="wide"><span>评分标准</span><textarea defaultValue="岗位理解、结构完整、执行落地、表达清晰；每轮可按岗位自定义权重。" /></label>
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="存档与案例系统">
          <div className="case-study-list">
            {caseStudies.map((caseStudy) => (
              <div className="case-study-card" key={caseStudy.title}>
                <div>
                  <strong>{caseStudy.title}</strong>
                  <p>{caseStudy.originalRound} / {caseStudy.jobName} / {caseStudy.anonymizedCandidate}</p>
                </div>
                <span>{caseStudy.score}</span>
              </div>
            ))}
          </div>
          <div className="notice">
            优秀作品进入案例系统前默认脱敏，并记录候选人授权状态、原始岗位、轮次和评分口径；不把候选人私人信息作为案例传播。
          </div>
        </Card>
        <Card title="考官评价">
          <div className="form-grid">
            <label><span>三轮综合评分</span><input defaultValue="86" /></label>
            <label><span>录用倾向</span><select defaultValue="可用"><option>强烈建议</option><option>可用</option><option>待定</option><option>不建议</option></select></label>
            <label className="wide"><span>优点</span><textarea defaultValue={selected.strengths.slice(0, 3).join('\n')} /></label>
            <label className="wide"><span>缺点/需核验</span><textarea defaultValue={selected.risks.join('\n') || '暂无明显风险'} /></label>
          </div>
        </Card>
      </div>
    </section>
  )
}

function AgentSkills({ selected }: { selected: Candidate }) {
  const portAgentHub = buildPortAgentHub({
    baseUrl: 'https://hr.heiwenshi.ai/download',
    channelTypes: ['sms', 'email', 'qr', 'url'],
    recipient: {
      email: 'hr-leader@heiwenshi.ai',
      name: '招聘负责人',
      permissionScope: 'HR主管-端口Agent权限',
      phone: '13800008888',
    },
  })

  return (
    <section>
      <PageTitle
        title="端口Agent"
        subtitle="合并Skills、AI邀约面试、多端APP/PWA下载、短信/邮件/二维码/链接分发通道，形成一个统一的端口入口。"
        action={<button className="button primary" type="button">生成端口Agent包</button>}
      />
      <div className="stat-grid">
        <Stat title="下载端口" value={portAgentHub.distributionPackage.targets.length} note="Web/PWA/桌面/移动/小程序" color="blue" />
        <Stat title="发送通道" value={portAgentHub.deliveryChannels.length} note="短信/邮件/二维码/链接" color="green" />
        <Stat title="AI触达" value={portAgentHub.aiChannels.length} note="微信/企微/电话/平台文字" color="yellow" />
        <Stat title="Skills能力" value={portAgentHub.agentCapabilities.length} note="问答+回填+面试" color="orange" />
      </div>
      <Card title="端口Agent总览">
        <div className="port-agent-hero">
          <div>
            <strong>{portAgentHub.title}</strong>
            <p>{portAgentHub.summary}</p>
            <div className="mini-chip-grid">
              {portAgentHub.agentCapabilities.map((capability) => (
                <span className="mini-chip on" key={capability}>{capability}</span>
              ))}
            </div>
          </div>
          <div className="qr-box large" aria-label="端口Agent统一入口二维码">
            <span />
            <small>PORT</small>
            <em>{portAgentHub.distributionPackage.verificationCode}</em>
          </div>
        </div>
      </Card>
      <div className="grid two">
        <Card title="APP下载与发送通道">
          <div className="port-agent-channel-grid">
            {portAgentHub.deliveryChannels.map((item) => (
              <div className="port-agent-channel-card" key={item.channelType}>
                <strong>{distributionChannelLabels[item.channelType]}</strong>
                <p>{item.destination}</p>
                <span>{item.status} / 验证码 {item.verificationCode}</span>
              </div>
            ))}
          </div>
          <div className="mini-chip-grid">
            {portAgentHub.distributionPackage.targets.map((target) => (
              <span className="mini-chip blue" key={target.id}>{target.name}</span>
            ))}
          </div>
        </Card>
        <Card title="AI触达端口">
          <div className="mini-chip-grid">
            {portAgentHub.aiChannels.map((channel) => (
              <span className="mini-chip on" key={channel}>{channel}</span>
            ))}
          </div>
          <div className="notice">
            候选人可从APP/PWA、小程序、短信链接、邮件链接、二维码扫码进入；系统再按AI邀约、AI面试、Skills问答、结构化回填进入招聘流程。
          </div>
        </Card>
      </div>
      <div className="grid two">
        <Card title="Skills 标准流程">
          <ol className="sop">
            <li>请求简历、简短自我介绍、求职意向和可面试时间。</li>
            <li>追问历史总业绩、个人业绩、团队业绩和客户分层。</li>
            <li>追问成交周期、获客方式、是否招投标和本人角色。</li>
            <li>追问底薪、提成规则、月均到手和佐证材料。</li>
            <li>输出结构化JSON，回填岗位问卷并生成复试追问。</li>
          </ol>
        </Card>
        <Card title="结构化回填示例">
          <pre className="json-preview">{JSON.stringify(
            {
              candidate_id: selected.id,
              skill_type: selected.postType === 'tech' ? 'tech' : 'sales',
              cooperation_level: selected.cooperationLevel,
              total_score: selected.totalScore,
              risks: selected.risks,
              summary: selected.agentSummary,
            },
            null,
            2,
          )}</pre>
        </Card>
      </div>
    </section>
  )
}

function AiInvitationInterview({ selected }: { selected: Candidate }) {
  const [mode, setMode] = useState<AiInterviewMode>('text')
  const rounds = buildAiInterviewRounds(selected, mode)
  const report = buildAiInterviewReport(selected)

  return (
    <section>
      <PageTitle
        title="AI邀约 / AI面试"
        subtitle="支持AI文字邀约、AI语音问答、自我介绍提炼、三回合追问、报告生成和人工确认。"
        action={<button className="button primary" type="button">新建AI邀约任务</button>}
      />

      <div className="stat-grid">
        <Stat title="AI邀约模式" value={aiInterviewModes.length} note="文字、语音、自我介绍" color="blue" />
        <Stat title="标准追问" value={rounds.length} note="三回合形成报告" color="green" />
        <Stat title="建议动作" value={report.nextAction} note={`${report.score} 分`} color={report.score >= 88 ? 'green' : 'blue'} />
        <Stat title="人工确认" value="必需" note="入职/复试前由HR确认" color="orange" />
      </div>

      <Card title="AI邀约模式">
        <div className="ai-mode-grid">
          {aiInterviewModes.map((item) => (
            <button
              className={mode === item.id ? 'ai-mode-card active' : 'ai-mode-card'}
              key={item.id}
              onClick={() => setMode(item.id)}
              type="button"
            >
              <strong>{item.title}</strong>
              <span>{item.channel}</span>
              <p>{item.goal}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card title="AI邀约触达通道">
        <div className="ai-channel-grid">
          {aiInterviewChannels.map((channel) => (
            <div className="ai-channel-card" key={channel.id}>
              <span>{channel.scenario}</span>
              <strong>{channel.name}</strong>
              <p>{channel.responseRule}</p>
              <small>{channel.captureMethod}</small>
            </div>
          ))}
        </div>
        <div className="notice">
          可通过企业微信、微信、电话、自建在线语音会议、招聘平台文字对话发起AI邀约；也可发限时清单，让候选人在截止时间前回复。
        </div>
      </Card>

      <div className="grid two">
        <Card title={`${aiInterviewModeLabel(mode)}三回合面试`}>
          <div className="ai-round-list">
            {rounds.map((round) => (
              <div className="ai-round-card" key={round.id}>
                <span>{round.title}</span>
                <strong>{round.prompt}</strong>
                <p>采集目标：{round.evidenceTarget}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="AI报告与人工确认">
          <div className="ai-report-card">
            <span className="badge level-A">{report.score}分</span>
            <strong>{report.candidateName} / {report.nextAction}</strong>
            <p>{report.summary}</p>
            <div className="mini-chip-grid">
              {report.tags.map((tag) => (
                <span className="mini-chip on" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <ol className="sop">
            {aiInterviewStages.map((stage) => (
              <li key={stage}>{stage}</li>
            ))}
          </ol>
        </Card>
      </div>

      <Card title="成绩与薪酬佐证清单">
        <div className="ai-evidence-grid">
          {aiEvidenceRequirements.map((item) => (
            <div className="ai-evidence-card" key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.requiredFor}</p>
              <div className="mini-chip-grid">
                {item.examples.map((example) => (
                  <span className="mini-chip" key={example}>{example}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="授权与边界">
        <div className="ai-consent-grid">
          {aiInterviewModes.find((item) => item.id === mode)?.requiredConsent.map((item) => (
            <div key={item}>
              <BadgeCheck size={17} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="notice">
          AI可以完成前置邀约、文字面试、语音问答、报告提炼；是否复试、谈薪、入职必须由人事或负责人最终确认。
        </p>
      </Card>
    </section>
  )
}

function MobileWorkTerminal() {
  const summary = buildMobileWorkSummary(defaultMobileReminderTasks)
  const criticalTask = defaultMobileReminderTasks.find((task) => task.severity === 'critical') ?? defaultMobileReminderTasks[0]
  const reminderRoute = routeMobileReminder(criticalTask)
  const consentChecklist = buildCandidateConsentChecklist(mobileAuthorizationScopes)
  const candidateGuide = defaultCandidateInterviewGuide
  const candidateGuideSummary = buildCandidateInterviewGuideSummary(candidateGuide)
  const meetingSession = buildMobileMeetingSession({
    candidateConsentConfirmed: true,
    candidateName: '周候选人',
    hostName: '陈HR',
    meetingMode: 'miniProgramVoiceMeeting',
    platform: '黑卫士小程序会议',
    recordingConsentConfirmed: true,
    scheduledAt: '2026-06-21T15:00:00+08:00',
    source: 'wechat-miniprogram',
  })
  const mobileCalendarBoard = buildTerminalCalendarBoard({
    autoDispatchItems: buildAutoDispatchBoard(defaultAutoDispatchCases, new Date('2026-06-20T12:00:00+08:00')).items,
    homeworkTasks: defaultThreeStageHomeworkTasks,
    mobileTasks: defaultMobileReminderTasks,
  })

  return (
    <section>
      <PageTitle
        title="移动工作端 / 小程序 / 手表提醒"
        subtitle="让人事、面试官和候选人在手机、小程序和手表上处理面试提醒、作业催交、改期改地点、改派面试官、双向确认和报警。"
        action={<button className="button primary" type="button">生成小程序入会码</button>}
      />

      <div className="stat-grid">
        <Stat title="移动端提醒总览" value={summary.total} note="今日移动任务" color="blue" />
        <Stat title="面试提醒" value={summary.interviews} note="初试/复试/终试" color="green" />
        <Stat title="作业催交" value={summary.homework} note="候选人作业与HR追踪" color="yellow" />
        <Stat title="变更确认" value={summary.changeConfirmations} note="时间/地点/面试官/条件" color="orange" />
        <Stat title="移动报警" value={summary.critical} note="标红弹窗 + 手表震动" color="red" />
      </div>

      <div className="grid two">
        <Card title="手机个人工作端">
          <div className="mobile-device-grid">
            {mobileTerminalDevices
              .filter((device) => !device.id.includes('watch'))
              .map((device) => (
                <div className={device.status === '已接入' ? 'mobile-device-card ready' : 'mobile-device-card reserved'} key={device.id}>
                  <div>
                    <span className="mini-chip on">{device.status}</span>
                    <strong>{device.name}</strong>
                    <p>{device.roleScope.map((role) => mobileRoleLabels[role]).join(' / ')}</p>
                  </div>
                  <div className="mini-chip-grid">
                    {device.reminderMethods.map((method) => (
                      <span className="mini-chip" key={`${device.id}-${method}`}>{method}</span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="notice">
            手机端用于路上、开会、离开电脑时处理提醒、确认、改派、电话兜底和候选人小程序入会。
          </div>
        </Card>

        <Card title="手表提醒矩阵">
          <div className="watch-reminder-panel">
            {reminderRoute.watchDevices.map((device) => (
              <div className="watch-pill" key={device.id}>
                <strong>{device.name}</strong>
                <span>{device.status}</span>
              </div>
            ))}
          </div>
          <div className="mobile-alert-preview">
            <div className="dispatch-alert-icon">!</div>
            <div>
              <strong>{criticalTask.title}</strong>
              <p>{reminderRoute.deliveryText}</p>
              <small>{reminderRoute.escalationText}</small>
            </div>
          </div>
        </Card>
      </div>

      <Card title="终端日历 / 行程系统接入">
        <div className="calendar-summary-strip">
          <div><span>统一行程</span><strong>{mobileCalendarBoard.summary.total}</strong></div>
          <div><span>强制建议</span><strong>{mobileCalendarBoard.summary.mandatorySuggested}</strong></div>
          <div><span>待授权</span><strong>{mobileCalendarBoard.summary.pendingAuthorization}</strong></div>
          <div><span>红色报警</span><strong>{mobileCalendarBoard.summary.critical}</strong></div>
          <div><span>ICS兜底</span><strong>{mobileCalendarBoard.summary.exportedIcs}</strong></div>
        </div>
        <div className="notice calendar-policy-note">
          {mobileCalendarBoard.policyText}
        </div>
        <div className="calendar-connector-grid">
          {mobileCalendarBoard.connectors.map((connector) => (
            <div className={`calendar-connector-card status-${connector.status === '已授权同步' ? 'ready' : connector.status === '待授权' ? 'pending' : 'reserved'}`} key={connector.id}>
              <div>
                <span>{connector.endpointType}</span>
                <strong>{connector.name}</strong>
                <p>{connector.supportedRoles.map((role) => mobileRoleLabels[role]).join(' / ')}</p>
              </div>
              <div>
                <span className="mini-chip on">{connector.requiredPolicy}</span>
                <small>{connector.status} / 需授权</small>
              </div>
            </div>
          ))}
        </div>
        <div className="calendar-event-list">
          {mobileCalendarBoard.events.slice(0, 7).map((event) => (
            <div className={`calendar-event-row severity-${event.severity}`} key={event.id}>
              <div>
                <span>{event.sourceModule} / {event.kind}</span>
                <strong>{event.title}</strong>
                <p>
                  {event.candidateName ?? event.ownerName} / {event.location} / {new Date(event.startsAt).toLocaleString('zh-CN', { dateStyle: 'short', timeStyle: 'short' })}
                </p>
                <small>{event.fallbackActions.join(' · ')}</small>
              </div>
              <div>
                <span className="badge">{event.syncStatus}</span>
                <small>{event.channels.length}路接入</small>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="小程序在线会议">
        <div className="mini-program-meeting">
          <div>
            <span className="mini-chip on">{meetingSession.status}</span>
            <h3>{mobileMeetingModeLabels[meetingSession.meetingMode]}</h3>
            <p>{meetingSession.platform} / 主持人：{meetingSession.hostName} / 候选人：{meetingSession.candidateName}</p>
            <div className="mini-chip-grid">
              <span className="mini-chip on">二维码入会</span>
              <span className="mini-chip on">小程序授权</span>
              <span className="mini-chip on">会议录音</span>
              <span className="mini-chip on">ASR转写</span>
              <span className="mini-chip on">回写候选人档案</span>
            </div>
          </div>
          <div className="qr-box meeting-qr" aria-label="候选人小程序入会二维码">
            <span />
            <small>小程序</small>
            <em>JOIN</em>
          </div>
        </div>
        <div className="meeting-archive-path">
          <strong>录音回档路径</strong>
          <code>{meetingSession.archivePath}</code>
          <p>正式版会把录音、转写、大纲、纪要、评分、作业安排和确认记录统一写回面试档案。</p>
        </div>
      </Card>

      <Card title="候选人面试指引">
        <div className="candidate-guide-head">
          <div>
            <span className="mini-chip on">App / 小程序关注后展示</span>
            <h3>{candidateGuide.candidateName} / {candidateGuide.jobName}</h3>
            <p>{candidateGuide.appEntry}</p>
          </div>
          <div className="candidate-guide-score">
            <strong>{candidateGuideSummary.roundCount}</strong>
            <span>轮面试</span>
            <small>{candidateGuideSummary.arrivalStepCount}个到场步骤</small>
          </div>
        </div>

        <div className="candidate-guide-rounds">
          {candidateGuide.rounds.map((round) => (
            <div className="candidate-guide-round" key={round.id}>
              <span>{round.name}</span>
              <strong>{round.interviewerName}</strong>
              <p>面试时间：{round.scheduledAt}</p>
              <p>面试地点：{round.location}</p>
              <small>面试题：{round.interviewQuestion}</small>
            </div>
          ))}
        </div>

        <div className="candidate-guide-flow">
          {candidateGuide.arrivalSteps.map((step, index) => (
            <div className="candidate-guide-step" key={step.id}>
              <span>{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mini-chip-grid">
          {candidateGuideSummary.keywords.map((keyword) => (
            <span className="mini-chip on" key={keyword}>{keyword}</span>
          ))}
        </div>
      </Card>

      <div className="grid two">
        <Card title="候选人授权边界">
          <div className="consent-grid">
            {consentChecklist.items.map((scope) => (
              <div className={scope.requiredForMeeting ? 'consent-card required' : 'consent-card optional'} key={scope.id}>
                <span>{scope.requiredForMeeting ? '入会必要' : '按需授权'}</span>
                <strong>{scope.title}</strong>
                <p>{scope.purpose}</p>
              </div>
            ))}
          </div>
          <div className="notice">
            {consentChecklist.safetyNote}
          </div>
        </Card>

        <Card title="今日移动提醒队列">
          <div className="mobile-reminder-list">
            {defaultMobileReminderTasks.map((task) => {
              const route = routeMobileReminder(task)
              return (
                <div className={`mobile-reminder-row severity-${task.severity}`} key={task.id}>
                  <div>
                    <span>{mobileRoleLabels[task.role]} / {mobileReminderTypeLabels[task.type]}</span>
                    <strong>{task.title}</strong>
                    <p>{task.candidateName ?? '内部任务'} / {task.ownerName} / {new Date(task.scheduledAt).toLocaleString('zh-CN', { dateStyle: 'short', timeStyle: 'short' })}</p>
                    <small>{task.nextAction}</small>
                  </div>
                  <div>
                    <span className="badge">{task.severity === 'critical' ? '报警' : task.severity === 'warning' ? '待确认' : '普通'}</span>
                    <small>{route.primaryDevices.length}端触达</small>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid two">
        <Card title="会议录音回档案">
          <ol className="sop">
            <li>候选人扫码进入小程序或手机会议房间。</li>
            <li>系统展示身份、手机号、微信OpenID、录音转写等授权说明。</li>
            <li>授权后才允许录音、转写、生成纪要和评分报告。</li>
            <li>会议结束后自动生成面试摘要、关键词、能力图谱和作业建议。</li>
            <li>面试官与HR在手机端补充评分，回写初试、复试或终试档案。</li>
          </ol>
        </Card>

        <Card title="移动端SOP">
          <ol className="sop">
            {mobileWorkSopSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
      </div>
    </section>
  )
}

function AutoDispatchCenter() {
  const [threshold, setThreshold] = useState(80)
  const board = buildAutoDispatchBoard(
    defaultAutoDispatchCases.map((item) => ({
      ...item,
      threshold: item.roundId === 'first' ? Math.min(threshold, item.threshold) : item.threshold,
    })),
    new Date('2026-06-20T12:00:00+08:00'),
  )
  const primaryAlarm = board.alarmCases[0]
  const thresholdCases = board.items.filter((item) => item.decision === '入库储备')

  return (
    <section>
      <PageTitle
        title="自动分工 / 自动排班系统"
        subtitle="自动分配人事、面试官、时间、地点、会议平台和通知通道；面试条件变更必须双向确认，未确认先双向电话确认，再升级报警。"
        action={
          <>
            <span className="badge">阈值 {threshold} 分</span>
            <button className="button primary" type="button">生成今日排班</button>
          </>
        }
      />

      <div className="stat-grid">
        <Stat title="自动分工总览" value={board.summary.total} note="今日/明日/未来一周排班任务" color="blue" />
        <Stat title="已双向确认" value={board.summary.confirmed} note="双方已回复确认" color="green" />
        <Stat title="电话确认中" value={board.summary.phoneFollowup} note="电子确认不足，电话兜底" color="yellow" />
        <Stat title="报警待处理" value={board.summary.alarm} note="未通知到或通知后未回复" color="red" />
        <Stat title="低分入库" value={board.summary.underThreshold} note="低于阈值转储备" color="orange" />
      </div>

      {primaryAlarm && (
        <Card title="报警与弹窗">
          <div className="dispatch-alert-modal">
            <div className="dispatch-alert-icon">!</div>
            <div>
              <strong>{primaryAlarm.alertTitle}</strong>
              <p>{primaryAlarm.alertMessage}</p>
              <div className="mini-chip-grid">
                <span className="mini-chip on">候选人：{primaryAlarm.candidateName}</span>
                <span className="mini-chip">面试官：{primaryAlarm.interviewerName}</span>
                <span className="mini-chip">后备：{primaryAlarm.backupInterviewerName}</span>
                <span className="mini-chip">距开始 {primaryAlarm.minutesUntilStart} 分钟</span>
              </div>
            </div>
          </div>
          <div className="dispatch-emergency-actions">
            {primaryAlarm.nextActions.map((action) => (
              <span className="dispatch-emergency-action" key={action}>{action}</span>
            ))}
          </div>
        </Card>
      )}

      <div className="grid two">
        <Card title="阈值与入库">
          <label>
            <span>初试自动面试阈值：{threshold} 分以上安排面试，低于阈值进入储备/简历库</span>
            <input
              max={95}
              min={50}
              onChange={(event) => setThreshold(Number(event.target.value))}
              type="range"
              value={threshold}
            />
          </label>
          <div className="dispatch-threshold-list">
            {board.items.map((item) => (
              <div className={item.decision === '安排面试' ? 'dispatch-threshold-row pass' : 'dispatch-threshold-row reserve'} key={`${item.candidateId}-${item.roundId}`}>
                <div>
                  <strong>{item.candidateName} / {item.roundName}</strong>
                  <p>{item.score} 分 / 阈值 {item.threshold} / {item.changeReason}</p>
                </div>
                <span>{item.decision}</span>
              </div>
            ))}
          </div>
          {thresholdCases.length > 0 && (
            <div className="notice">
              低于阈值的候选人不会直接丢弃，会转入储备人才库、简历库或等待补充作业/证明材料。
            </div>
          )}
        </Card>

        <Card title="通知渠道">
          <div className="dispatch-channel-grid">
            {Object.entries(board.notificationCounts).map(([channel, count]) => (
              <div className="dispatch-channel-card" key={channel}>
                <span>{invitationChannelLabels[channel as InvitationChannelType]}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
          <div className="dispatch-metric-grid">
            <div><span>自动邀约</span><strong>{board.summary.invitations}</strong></div>
            <div><span>接受邀约</span><strong>{board.summary.acceptedInvitations}</strong></div>
            <div><span>收到简历</span><strong>{board.summary.resumes}</strong></div>
            <div><span>收到电话</span><strong>{board.summary.phones}</strong></div>
            <div><span>收到邮箱</span><strong>{board.summary.emails}</strong></div>
            <div><span>收到微信</span><strong>{board.summary.wechat}</strong></div>
            <div><span>交换微信</span><strong>{board.summary.wechatExchanged}</strong></div>
            <div><span>邮件/聊天回复</span><strong>{board.summary.replies}</strong></div>
            <div><span>聊天总量</span><strong>{board.summary.conversations}</strong></div>
            <div><span>受邀聊天</span><strong>{board.summary.acceptedChats}</strong></div>
          </div>
        </Card>
      </div>

      <Card title="双向确认与电话兜底">
        <div className="dispatch-board-grid">
          {board.items.map((item) => (
            <div className={`dispatch-card severity-${item.severity}`} key={`${item.candidateId}-${item.roundId}`}>
              <div className="dispatch-card-head">
                <div>
                  <strong>{item.candidateName} / {item.roundName}</strong>
                  <p>{item.changeType} / {item.interviewMode} / {item.platform}</p>
                </div>
                <span className={`badge dispatch-${item.severity}`}>{autoDispatchSeverityLabel(item.severity)}</span>
              </div>
              <div className="dispatch-info-grid">
                <div><span>时间</span><strong>{new Date(item.scheduledAt).toLocaleString('zh-CN', { dateStyle: 'short', timeStyle: 'short' })}</strong></div>
                <div><span>地点</span><strong>{item.location}</strong></div>
                <div><span>会议室</span><strong>{item.meetingRoom}</strong></div>
                <div><span>面试官</span><strong>{item.interviewerName}</strong></div>
                <div><span>后备面试官</span><strong>{item.backupInterviewerName ?? '待指定'}</strong></div>
                <div><span>通知</span><strong>{autoDispatchChannelSummary(item.notifiedChannels)}</strong></div>
              </div>
              <div className="dispatch-confirm-grid">
                <div className={item.candidateElectronicConfirmed ? 'confirm-pill done' : 'confirm-pill pending'}>
                  候选人电子确认：{item.candidateElectronicConfirmed ? '已确认' : '未确认'}
                </div>
                <div className={item.interviewerElectronicConfirmed ? 'confirm-pill done' : 'confirm-pill pending'}>
                  面试官电子确认：{item.interviewerElectronicConfirmed ? '已确认' : '未确认'}
                </div>
                <div className={item.candidatePhoneConfirmed ? 'confirm-pill done' : 'confirm-pill pending'}>
                  候选人电话确认：{item.candidatePhoneConfirmed ? '已确认' : '待确认'}
                </div>
                <div className={item.interviewerPhoneConfirmed ? 'confirm-pill done' : 'confirm-pill pending'}>
                  面试官电话确认：{item.interviewerPhoneConfirmed ? '已确认' : '待确认'}
                </div>
              </div>
              <div className="dispatch-card-foot">
                <span>{autoDispatchStageLabel(item.confirmationStage)}</span>
                <span>{item.phoneFollowupStatus}</span>
                <span>{item.decision}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid two">
        <Card title="后备面试官/后备面试人">
          <div className="timeline">
            {board.items.map((item) => (
              <div className="timeline-item" key={`backup-${item.candidateId}-${item.roundId}`}>
                <span className={`badge dispatch-${item.severity}`}>{item.severity === 'red' ? '急' : '备'}</span>
                <div>
                  <strong>{item.candidateName} / {item.interviewerName}</strong>
                  <p>后备面试官：{item.backupInterviewerName ?? '待指定'}；候选人未确认时同步备用联系人和备用邮箱/微信。</p>
                </div>
                <span className="muted">{item.minutesUntilStart}分钟</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="自动分工SOP">
          <ol className="sop">
            <li>系统按候选人分数、岗位阈值、岗位类型、面试轮次和面试官池生成初步排班。</li>
            <li>时间、地点、会议平台或面试条件发生变化时，必须候选人和面试官双方确认。</li>
            <li>任一方没有电子确认，系统进入双向电话确认：先候选人，再面试官，并记录通话结果。</li>
            <li>到了临近时间仍未通知到，或通知到但没有回复，系统标红、弹窗、报警，并启用后备面试官。</li>
            <li>应急通知覆盖微信、企微、电话、短信和邮件；取消、推迟、改时间、改地点、改条件都必须留痕。</li>
          </ol>
        </Card>
      </div>
    </section>
  )
}

function InvitationChannels() {
  const channelTypes = [
    { name: '邮件邀约', accounts: 5, provider: 'SMTP/企业邮箱/API邮件服务', status: '首选正式通道', metric: '待确认 24' },
    { name: '微信添加后邀约', accounts: 8, provider: '个人微信账号登记/人工确认', status: '人工确认', metric: '待添加 18' },
    { name: '企业微信邀约', accounts: 6, provider: '企业微信官方API/客户联系', status: '优先推荐', metric: '待跟进 42' },
    { name: '电话邀约', accounts: 4, provider: '云呼叫中心/外呼线路/人工电话', status: '预留接口', metric: '待拨打 36' },
    { name: '短信邀约', accounts: 3, provider: '阿里云/腾讯云/短信宝等', status: '可配置', metric: '今日可发 800' },
  ]
  const accountBindings = [
    { company: '黑卫士科技', channel: '邮件邀约', account: 'hr@heiwenshi.ai', dedicatedEmail: 'hr@heiwenshi.ai', owner: '陈HR', jobs: '全岗位', status: '已验证', secret: 'OAuth/SMTP已配置' },
    { company: '黑卫士科技', channel: '企业微信邀约', account: '企微-销售招聘组', dedicatedEmail: 'sales.hr@heiwenshi.ai', owner: '陈HR', jobs: '业务岗/营销岗', status: '已授权', secret: '已加密托管' },
    { company: '黑卫士市场中心', channel: '微信添加后邀约', account: '微信-内容招聘1号', dedicatedEmail: 'content.hr@heiwenshi.ai', owner: '赵HR', jobs: '自媒体/策划', status: '人工可用', secret: '不托管密码' },
    { company: '黑卫士市场中心', channel: '电话邀约', account: '云呼叫线路A', dedicatedEmail: 'content.hr@heiwenshi.ai', owner: '陈HR', jobs: '销售/客服/劳务', status: '预留', secret: 'Token待配置' },
    { company: '黑卫士智能硬件', channel: '短信邀约', account: '短信签名-黑卫士招聘', dedicatedEmail: 'hardware.hr@heiwenshi.ai', owner: '王主管', jobs: 'AI硬件/技术岗', status: '待余额复核', secret: 'API Key已隐藏' },
  ]
  const routingRules = [
    { job: '业务经理', company: '黑卫士科技', first: '企业微信邀约', backup: '短信 + 电话', owner: '陈HR' },
    { job: 'AI系统开发', company: '黑卫士智能硬件', first: '邮件邀约', backup: '企业微信', owner: '王主管' },
    { job: '自媒体创意制作', company: '黑卫士市场中心', first: '微信添加后邀约', backup: '邮件', owner: '赵HR' },
    { job: '合伙兼职/小时工', company: '黑卫士市场中心', first: '短信邀约', backup: '电话', owner: '陈HR' },
  ]

  return (
    <section>
      <PageTitle
        title="第三方邀约通道中心"
        subtitle="统一登记邮件、微信、企业微信、电话、短信等第三方邀约接口和账号绑定关系；邮件作为正式首选通道。"
        action={
          <>
            <button className="button">导入第三方账号</button>
            <button className="button primary">新增邀约通道</button>
          </>
        }
      />

      <Card title="第三方邀约通道总览">
        <div className="channel-overview-grid">
          {channelTypes.map((channel) => (
            <div className="channel-type-card" key={channel.name}>
              <div>
                <strong>{channel.name}</strong>
                <p>{channel.provider}</p>
              </div>
              <div className="channel-meta-row">
                <span className="badge">{channel.accounts}个账号</span>
                <span className={channel.status.includes('优先') || channel.status.includes('已') ? 'chip good' : 'chip warn'}>
                  {channel.status}
                </span>
              </div>
              <small>{channel.metric}</small>
            </div>
          ))}
        </div>
      </Card>

      <Card title="第三方账号录入">
        <div className="form-grid">
          <label>
            <span>公司主体</span>
            <select defaultValue="黑卫士科技">
              <option>黑卫士科技</option>
              <option>黑卫士智能硬件</option>
              <option>黑卫士市场中心</option>
              <option>新增公司主体</option>
            </select>
          </label>
          <label>
            <span>邀约通道</span>
            <select defaultValue="企业微信邀约">
              <option>短信邀约</option>
              <option>邮件邀约</option>
              <option>电话邀约</option>
              <option>微信添加后邀约</option>
              <option>企业微信邀约</option>
            </select>
          </label>
          <label>
            <span>账号名称</span>
            <input defaultValue="企微-销售招聘组" />
          </label>
          <label>
            <span>负责人</span>
            <input defaultValue="陈HR" />
          </label>
          <label>
            <span>适用岗位</span>
            <input defaultValue="业务岗、营销岗、客服岗" />
          </label>
          <label>
            <span>密钥/授权状态</span>
            <select defaultValue="后端加密配置">
              <option>后端加密配置</option>
              <option>OAuth授权</option>
              <option>人工确认，不托管密码</option>
              <option>待配置</option>
            </select>
          </label>
          <label className="wide">
            <span>第三方接口备注</span>
            <textarea defaultValue="短信填写供应商签名和模板；邮件填写SMTP/OAuth；电话填写云呼叫线路；微信采用人工确认；企业微信优先走官方客户联系能力。" />
          </label>
        </div>
        <div className="notice">
          这里是账号登记原型。正式后端会把 API Key、Secret、SMTP 密码放到加密密钥库，前端只保存账号别名、负责人、公司主体、适用岗位和配置状态。
        </div>
      </Card>

      <div className="grid two">
        <Card title="第三方账号绑定矩阵">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>公司主体</th>
                  <th>通道</th>
                  <th>账号名称</th>
                  <th>专用邮箱</th>
                  <th>负责人</th>
                  <th>适用岗位</th>
                  <th>状态</th>
                  <th>密钥状态</th>
                </tr>
              </thead>
              <tbody>
                {accountBindings.map((account) => (
                  <tr key={`${account.company}-${account.channel}-${account.account}`}>
                    <td>{account.company}</td>
                    <td>{account.channel}</td>
                    <td><strong>{account.account}</strong></td>
                    <td>{account.dedicatedEmail}</td>
                    <td>{account.owner}</td>
                    <td>{account.jobs}</td>
                    <td>{account.status}</td>
                    <td>{account.secret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="岗位与公司主体路由">
          <div className="routing-list">
            {routingRules.map((rule) => (
              <div className="routing-card" key={rule.job}>
                <div>
                  <strong>{rule.job}</strong>
                  <p>{rule.company} / 负责人：{rule.owner}</p>
                </div>
                <div className="mini-chip-grid">
                  <span className="mini-chip on">首选：{rule.first}</span>
                  <span className="mini-chip">备用：{rule.backup}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="接口安全与发送边界">
        <div className="security-rule-grid">
          <div>
            <ShieldCheck size={20} />
            <strong>密钥不明文展示</strong>
            <p>第三方 API Key、SMTP密码、企业微信 Secret 只在后端加密保存，前端只显示“已配置/待配置”。</p>
          </div>
          <div>
            <BadgeCheck size={20} />
            <strong>发送前人工确认</strong>
            <p>短信、邮件、电话、微信、企业微信邀约先进入待发送队列，HR确认后才触发第三方接口。</p>
          </div>
          <div>
            <Workflow size={20} />
            <strong>多账号可绑定</strong>
            <p>同一公司可绑定多个微信、邮箱、电话和企业微信账号；同一岗位可配置首选和备用通道。</p>
          </div>
          <div>
            <BarChart3 size={20} />
            <strong>全链路统计</strong>
            <p>记录发送量、送达、回复、加微信、接通、接受邀约和面试到场，进入日报周报月报。</p>
          </div>
        </div>
        <div className="notice">
          <strong>合规边界：</strong>
          微信和企业微信优先采用官方能力或人工确认流程；不托管个人微信明文密码，不做绕过平台或通讯软件风控的批量自动加人。
        </div>
      </Card>
    </section>
  )
}

const invitationProcessingAccounts: InvitationChannelAccount[] = [
  {
    accountName: 'hr@heiwenshi.ai',
    channelType: 'email',
    companyName: '黑卫士科技',
    credentialStatus: 'configured',
    dedicatedEmail: 'hr@heiwenshi.ai',
    id: 'email-main',
    jobScope: ['全岗位'],
    ownerName: '陈HR',
  },
  {
    accountName: '微信-业务招聘1号',
    channelType: 'wechat',
    companyName: '黑卫士科技',
    credentialStatus: 'needsReview',
    dedicatedEmail: 'hr@heiwenshi.ai',
    id: 'wechat-business',
    jobScope: ['业务经理', '营销岗'],
    ownerName: '陈HR',
  },
  {
    accountName: '企微-销售招聘组',
    channelType: 'wecom',
    companyName: '黑卫士科技',
    credentialStatus: 'configured',
    dedicatedEmail: 'sales.hr@heiwenshi.ai',
    id: 'wecom-sales',
    jobScope: ['业务经理', '营销岗'],
    ownerName: '陈HR',
  },
  {
    accountName: '云呼叫线路A',
    channelType: 'phone',
    companyName: '黑卫士市场中心',
    credentialStatus: 'needsReview',
    dedicatedEmail: 'content.hr@heiwenshi.ai',
    id: 'phone-market',
    jobScope: ['自媒体创意制作', '策划岗'],
    ownerName: '赵HR',
  },
  {
    accountName: '短信签名-黑卫士招聘',
    channelType: 'sms',
    companyName: '黑卫士智能硬件',
    credentialStatus: 'notConfigured',
    dedicatedEmail: 'hardware.hr@heiwenshi.ai',
    id: 'sms-hardware',
    jobScope: ['AI硬件产品经理', 'AI系统开发'],
    ownerName: '王主管',
  },
]

function MailWorkflow() {
  const mailStorage = browserLocalStorage()
  const [queueItems, setQueueItems] = useState<InvitationQueueRecord[]>(() =>
    readPersistedValue(mailStorage, localPersistenceKeys.invitationQueueRecords, defaultInvitationQueueRecords),
  )
  const [newInvitationRecord, setNewInvitationRecord] = useState({
    action: '邀约线上初试',
    candidate: '',
    channel: 'email' as InvitationChannelType,
    company: '黑卫士科技',
    job: '',
  })
  const sampleEmail = composeInvitationMessage({
    candidateName: '李晨',
    channelType: 'email',
    companyName: '黑卫士科技',
    contactAccount: 'hr@heiwenshi.ai',
    instructionModuleIds: defaultEmailInstructionModuleIds,
    jobName: '业务经理',
    stage: '初试邀约',
  })
  const sampleWechat = composeInvitationMessage({
    candidateName: '陈琳',
    channelType: 'wechat',
    companyName: '黑卫士市场中心',
    contactAccount: '微信-内容招聘1号',
    jobName: '自媒体创意制作',
    stage: '补充资料',
  })
  useEffect(() => {
    writePersistedValue(mailStorage, localPersistenceKeys.invitationQueueRecords, queueItems)
  }, [mailStorage, queueItems])

  const accountForChannel = (channel: InvitationChannelType) =>
    invitationProcessingAccounts.find((account) => account.channelType === channel)?.accountName ??
    invitationChannelLabels[channel]
  const addInvitationQueueRecord = () => {
    if (!newInvitationRecord.candidate.trim() || !newInvitationRecord.job.trim()) return

    const record = createInvitationQueueRecord({
      ...newInvitationRecord,
      account: accountForChannel(newInvitationRecord.channel),
      status: '待HR确认',
    })
    setQueueItems((items) => [record, ...items])
    setNewInvitationRecord((draft) => ({ ...draft, candidate: '', job: '' }))
  }
  const updateInvitationRecordStatus = (id: string, status: InvitationQueueStatus) => {
    setQueueItems((items) =>
      items.map((item) => (item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item)),
    )
  }

  return (
    <section>
      <PageTitle
        title="邀约处理系统"
        subtitle="邮件为首选正式通道，同时统一处理微信、企业微信、电话和短信回复；自动生成问候语、邮件正文和问答话术，HR确认后发送。"
        action={
          <>
            <button className="button">导入待回复</button>
            <button className="button primary">生成邀约话术</button>
          </>
        }
      />
      <div className="stat-grid">
        <Stat title="待确认邀约" value={queueItems.filter((item) => item.status.includes('待') || item.status === '人工复核').length} note="邮件/微信/企微合并" color="blue" />
        <Stat title="邮件优先" value="1st" note="正式沟通首选" color="green" />
        <Stat title="自动草稿" value={queueItems.length} note="待HR确认发送" color="yellow" />
        <Stat title="已回复" value={queueItems.filter((item) => item.status === '已接受' || item.status === '需改期').length} note="今日候选人响应" color="green" />
      </div>
      <div className="grid two">
        <Card title="邀约通道优先级">
          <div className="invitation-priority-grid">
            {invitationProcessingOrder.map((channelType, index) => (
              <div className="invitation-priority-card" key={channelType}>
                <span>{index + 1}</span>
                <strong>{invitationChannelLabels[channelType]}</strong>
                <p>
                  {channelType === 'email'
                    ? '正式邀约、简历接收、资料补充和面试通知首选邮件。'
                    : channelType === 'wechat'
                      ? '适合快速问候、补资料和拉近沟通，但关键内容回落邮件存档。'
                      : channelType === 'wecom'
                        ? '适合公司化沟通、客户联系能力和团队协同跟进。'
                        : channelType === 'phone'
                          ? '适合紧急确认时间、薪资和到场状态。'
                          : '适合提醒和短通知，不承载复杂沟通。'}
                </p>
              </div>
            ))}
          </div>
          <ol className="sop">
            <li>先按公司主体和岗位选择专用招聘账号。</li>
            <li>优先生成正式邮件邀约；微信、企微、电话、短信作为补充触达。</li>
            <li>AI生成问候语、邮件正文、补资料话术、复试邀约和婉拒话术。</li>
            <li>HR确认后发送，发送结果进入日报、周报、月报。</li>
          </ol>
        </Card>

        <Card title="公司专用账号绑定">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>公司主体</th>
                  <th>通道</th>
                  <th>专用账号</th>
                  <th>专用邮箱</th>
                  <th>负责人</th>
                  <th>校验</th>
                </tr>
              </thead>
              <tbody>
                {invitationProcessingAccounts.map((account) => {
                  const validation = validateDedicatedCompanyAccount(account)

                  return (
                    <tr key={account.id}>
                      <td>{account.companyName}</td>
                      <td>{invitationChannelLabels[account.channelType]}</td>
                      <td><strong>{account.accountName}</strong></td>
                      <td>{account.dedicatedEmail}</td>
                      <td>{account.ownerName}</td>
                      <td>
                        <span className={validation.ok ? 'chip good' : 'chip warn'}>
                          {validation.ok ? '正规绑定' : validation.warnings.join('、')}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="notice">
            一个专用招聘账号必须绑定一个公司主体和专用招聘邮箱；邮件是正式存档通道，微信、企微、电话、短信作为触达和补充。
          </div>
        </Card>
      </div>

      <Card title="自动问答话术库">
        <div className="reply-template-grid">
          <div>
            <MailCheck size={20} />
            <strong>邮件正式邀约</strong>
            <p>{sampleEmail.subject}</p>
            <pre>{sampleEmail.body}</pre>
          </div>
          <div>
            <MessageSquareText size={20} />
            <strong>微信/企微问候语</strong>
            <p>{sampleWechat.greeting}</p>
            <pre>{sampleWechat.body}</pre>
          </div>
          <div>
            <Bot size={20} />
            <strong>候选人常见问题</strong>
            <p>薪资、转正、福利、奖金、提成、晋升、作业、面试时间等从岗位知识库自动提取。</p>
            <div className="mini-chip-grid">
              {['薪资范围', '转正周期', '提成制度', '面试安排', '作品要求', '岗位职责'].map((item) => (
                <span className="mini-chip on" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card title="邮件固定指引模块">
        <div className="email-module-grid">
          {emailInstructionModules.map((module, index) => (
            <div className="email-module-card" key={module.id}>
              <span>{index + 1}</span>
              <strong>{module.title}</strong>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
        <div className="notice">
          这些模块可按岗位、初试/复试/终试、线上/线下面试和是否需要作业自由组合进正式邮件；微信和短信只发短提醒，完整指引回落到邮件存档。
        </div>
      </Card>

      <Card title="新增邀约预约记录">
        <div className="form-grid invitation-record-form">
          <label>
            <span>候选人</span>
            <input
              onChange={(event) => setNewInvitationRecord((draft) => ({ ...draft, candidate: event.target.value }))}
              placeholder="输入候选人姓名"
              value={newInvitationRecord.candidate}
            />
          </label>
          <label>
            <span>岗位</span>
            <input
              onChange={(event) => setNewInvitationRecord((draft) => ({ ...draft, job: event.target.value }))}
              placeholder="输入岗位名称"
              value={newInvitationRecord.job}
            />
          </label>
          <label>
            <span>公司主体</span>
            <input
              onChange={(event) => setNewInvitationRecord((draft) => ({ ...draft, company: event.target.value }))}
              value={newInvitationRecord.company}
            />
          </label>
          <label>
            <span>首选通道</span>
            <select
              onChange={(event) =>
                setNewInvitationRecord((draft) => ({
                  ...draft,
                  channel: event.target.value as InvitationChannelType,
                }))
              }
              value={newInvitationRecord.channel}
            >
              {invitationProcessingOrder.map((channelType) => (
                <option key={channelType} value={channelType}>{invitationChannelLabels[channelType]}</option>
              ))}
            </select>
          </label>
          <label className="wide">
            <span>邀约动作</span>
            <input
              onChange={(event) => setNewInvitationRecord((draft) => ({ ...draft, action: event.target.value }))}
              value={newInvitationRecord.action}
            />
          </label>
        </div>
        <div className="candidate-status-actions">
          <button
            className="button primary"
            disabled={!newInvitationRecord.candidate.trim() || !newInvitationRecord.job.trim()}
            onClick={addInvitationQueueRecord}
            type="button"
          >
            加入邀约队列
          </button>
          <span className="muted">新增后自动保存到本机，刷新页面后仍保留。</span>
        </div>
      </Card>

      <Card title="邀约处理队列">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>候选人</th>
                <th>岗位</th>
                <th>公司主体</th>
                <th>首选通道</th>
                <th>账号</th>
                <th>动作</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {queueItems.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.candidate}</strong></td>
                  <td>{item.job}</td>
                  <td>{item.company}</td>
                  <td>{invitationChannelLabels[item.channel]}</td>
                  <td>{item.account}</td>
                  <td>{item.action}</td>
                  <td>
                    <select
                      aria-label={`${item.candidate}邀约状态`}
                      onChange={(event) =>
                        updateInvitationRecordStatus(item.id, event.target.value as InvitationQueueStatus)
                      }
                      value={item.status}
                    >
                      {invitationQueueStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="notice">
          所有自动生成内容先进入待确认队列；系统负责写好话术和草稿，真正发送由HR确认或后端安全队列执行。
        </div>
      </Card>
    </section>
  )
}

function Reports({ candidates }: { candidates: Candidate[] }) {
  const target = 200
  const current = 128
  const color = dashboardColor(current, target)
  const [autoScroll, setAutoScroll] = useState(true)
  const [autoPage, setAutoPage] = useState(true)
  const [scrollSpeed, setScrollSpeed] = useState(3)
  const [page, setPage] = useState(1)
  const [popupSize, setPopupSize] = useState<ReportPopupSize>('half')
  const [tickerMode, setTickerMode] = useState<CandidateTickerMode>('summary')
  const pageSize = 3
  const pagedCandidates = paginateReportRows(candidates, page, pageSize)
  const highCandidates = highScoreCandidates(candidates, 80)
  const popupCandidate = highCandidates[0] ?? candidates[0]
  const groupedByPost = candidates.reduce<Record<string, Candidate[]>>((groups, candidate) => {
    groups[candidate.postName] = [...(groups[candidate.postName] ?? []), candidate]
    return groups
  }, {})
  const scrollDuration = reportScrollDuration(scrollSpeed)
  const goToPage = (nextPage: number) => {
    setPage(paginateReportRows(candidates, nextPage, pageSize).page)
  }

  return (
    <section>
      <PageTitle
        title="数据看板"
        subtitle="日报、周报、月报；支持岗位滚动窗口、手动/自动翻页、高分简历弹窗、简历摘要/完整简历/问候语/极简一行动态滚动。"
      />
      <div className="stat-grid">
        <Stat title="日目标" value={target} note="可后台配置" color="black" />
        <Stat title="今日完成" value={current} note={`颜色：${color}`} color={color} />
        <Stat title="平均综合分" value={Math.round(candidates.reduce((sum, c) => sum + c.totalScore, 0) / candidates.length)} note="候选池质量" color="green" />
        <Stat title="复试人数" value={candidates.filter((c) => c.status === '推荐复试').length} note="今日推荐" color="blue" />
        <Stat title="风险候选人" value={candidates.filter((c) => c.risks.length > 0).length} note="需HR核验" color="orange" />
      </div>

      <Card title="滚动与分页控制">
        <div className="report-control-grid">
          <div>
            <strong>滚动模式</strong>
            <div className="segmented-buttons">
              <button className={autoScroll ? 'segment active' : 'segment'} onClick={() => setAutoScroll(true)} type="button">
                <Play size={14} /> 自动滚动
              </button>
              <button className={!autoScroll ? 'segment active' : 'segment'} onClick={() => setAutoScroll(false)} type="button">
                <Pause size={14} /> 关闭滚动
              </button>
            </div>
          </div>
          <label>
            <span>滚动速度</span>
            <input
              max={5}
              min={1}
              onChange={(event) => setScrollSpeed(Number(event.target.value))}
              type="range"
              value={scrollSpeed}
            />
            <small>{scrollSpeed}档 / {scrollDuration}秒一轮</small>
          </label>
          <div>
            <strong>翻页</strong>
            <div className="posting-action-row">
              <button className="table-action" onClick={() => goToPage(page - 1)} type="button">上一页</button>
              <span className="badge">{pagedCandidates.page}/{pagedCandidates.totalPages}</span>
              <button className="table-action" onClick={() => goToPage(page + 1)} type="button">下一页</button>
              <button className={autoPage ? 'table-action active-action' : 'table-action'} onClick={() => setAutoPage((value) => !value)} type="button">
                {autoPage ? '自动翻页中' : '手动翻页'}
              </button>
            </div>
          </div>
          <div>
            <strong>弹窗尺寸</strong>
            <div className="posting-action-row">
              {[
                ['full', '全屏'],
                ['half', '1/2屏'],
                ['third', '1/3屏'],
                ['quarter', '1/4屏'],
              ].map(([size, label]) => (
                <button
                  className={popupSize === size ? 'table-action active-action' : 'table-action'}
                  key={size}
                  onClick={() => setPopupSize(size as ReportPopupSize)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card title="岗位滚动窗口">
        <div className="report-post-grid">
          {Object.entries(groupedByPost).map(([postName, postCandidates]) => {
            const size = postScrollSize(postCandidates.length)

            return (
              <div className={`report-post-panel ${size.className}`} key={postName}>
                <div className="report-post-head">
                  <div>
                    <strong>{postName}</strong>
                    <p>{postCandidates.length}人 / {size.className}窗口 / 最大高度{size.maxHeight}px</p>
                  </div>
                  <span className="badge">{autoScroll ? '滚动' : '手动'}</span>
                </div>
                <div
                  className={autoScroll ? 'report-scroll-list auto' : 'report-scroll-list'}
                  style={{ maxHeight: size.maxHeight, ['--scroll-duration' as string]: `${scrollDuration}s` }}
                >
                  {[...postCandidates, ...postCandidates].map((candidate, index) => (
                    <div className="report-scroll-row" key={`${postName}-${candidate.id}-${index}`}>
                      <strong>{candidate.name}</strong>
                      <span>{candidate.totalScore}分 / {candidate.status}</span>
                      <small>{candidate.agentSummary}</small>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card title="高分简历弹窗">
        <div className={`resume-popup-preview ${popupSizeClass(popupSize)}`}>
          <div className="resume-popup-head">
            <div>
              <strong>{popupCandidate.name} / {popupCandidate.postName}</strong>
              <p>综合 {popupCandidate.totalScore} 分 / {popupCandidate.totalLevel} 级 / {popupCandidate.status}</p>
            </div>
            <span className="badge level-S">高分自动弹窗</span>
          </div>
          <div className="resume-popup-body">
            <p>{popupCandidate.agentSummary}</p>
            <div className="mini-chip-grid">
              {popupCandidate.strengths.slice(0, 8).map((item) => (
                <span className="mini-chip on" key={item}>{item}</span>
              ))}
            </div>
            <pre>{buildCandidateTickerRows(popupCandidate, 'full')}</pre>
          </div>
        </div>
      </Card>

      <Card title="简历与问候语滚动">
        <div className="posting-action-row">
          {[
            ['summary', '简介简历'],
            ['full', '完整简历'],
            ['greeting', '问候语'],
            ['minimal', '极简一行'],
          ].map(([mode, label]) => (
            <button
              className={tickerMode === mode ? 'table-action active-action' : 'table-action'}
              key={mode}
              onClick={() => setTickerMode(mode as CandidateTickerMode)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className={autoScroll ? 'candidate-ticker auto' : 'candidate-ticker'}
          style={{ ['--scroll-duration' as string]: `${scrollDuration}s` }}
        >
          {[...pagedCandidates.items, ...pagedCandidates.items].map((candidate, index) => (
            <pre key={`${candidate.id}-${tickerMode}-${index}`}>{buildCandidateTickerRows(candidate, tickerMode)}</pre>
          ))}
        </div>
      </Card>

      <Card title="极简一行动态">
        <div className="ticker-line-list">
          {candidates.map((candidate) => (
            <div className="ticker-line" key={candidate.id}>
              <span>{candidate.name}</span>
              <strong>{candidate.postName}</strong>
              <span>{candidate.totalScore}分</span>
              <span>{candidate.status}</span>
              <span>{candidate.cooperationLevel}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="颜色规则">
        <div className="color-grid">
          <span className="color red">0或严重不足</span>
          <span className="color orange">低于目标60%</span>
          <span className="color yellow">目标60%-99%</span>
          <span className="color green">达到目标</span>
          <span className="color blue">超过目标150%</span>
          <span className="color black">严重风险</span>
        </div>
      </Card>
    </section>
  )
}

function PlatformPlan() {
  return (
    <section>
      <PageTitle title="融合系统多端路线" subtitle="同一套业务内核：Web/PWA先跑通，再封装Mac、Windows、Android、iOS/iPad和鸿蒙/小程序接口。" />
      <Card title="下载入口已并入端口Agent">
        <div className="notice">
          多端APP/PWA下载、短信验证码、邮件验证码、二维码扫码、下载链接、同权限验证码，统一放到端口Agent里生成和发送；本页只保留各端封装路线和优先级。
        </div>
      </Card>
      <Card title="平台路线">
        <div className="table-wrap">
          <table>
            <thead><tr><th>平台</th><th>优先级</th><th>状态</th></tr></thead>
            <tbody>
              {platformPlan.map((item) => (
                <tr key={item.platform}>
                  <td>{item.platform}</td>
                  <td>{item.priority}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}

function RiskComplianceCenter() {
  const [draftText, setDraftText] = useState(
    '我们不要本地人，也不要用塔罗牌、星座、生辰八字预测稳定性和性格；后台要看到所有人的用户名和密码；直接调查犯罪记录/征信/健康/证明人；系统要仿人操作，避免被平台识别。',
  )
  const detectedRisks = findRiskCorrections(draftText)
  const redCount = detectedRisks.filter((risk) => risk.severity === 'red').length
  const orangeCount = detectedRisks.filter((risk) => risk.severity === 'orange').length
  const yellowCount = detectedRisks.filter((risk) => risk.severity === 'yellow').length
  const safeCopyExamples = [
    {
      from: '预算有限时优先招本地人',
      to: '改成评估现居住地、通勤时间、通勤成本、是否需要租房/搬迁/安置成本、到岗稳定性和岗位适配度。',
    },
    {
      from: '直接调查犯罪记录、征信、学历、健康',
      to: '候选人主动提供学历证明、健康证、业绩佐证等材料；第三方核验必须先签署查询授权或背调同意文件。',
    },
    {
      from: '用塔罗牌、星座、八字预测稳定性和性格',
      to: '仅在候选人相信且明确愿意时作为自愿文化兴趣备注隔离保存，不参与评分；岗位判断改用结构化面试、履历验证和作业。',
    },
    {
      from: '后台看到所有人的用户名和密码',
      to: '系统可有最高权限做账号恢复、权限重置和联系方式修复；管理员不可查看明文密码、验证码或第三方密钥。',
    },
    {
      from: '绕过平台风控、避免被识别',
      to: '使用官方授权、人工确认、合理频率、平台允许接口和手动导入流程。',
    },
  ]

  return (
    <section>
      <PageTitle
        title="风险合规中心"
        subtitle="合并风险表达纠偏和安全合规边界，把口述需求、招聘SOP、账号权限、授权背调和平台规则统一标红、纠偏、留痕。"
      />
      <Card title="口述整理原则">
        <div className="risk-principle-grid">
          {oralRequirementRewritePrinciples.map((principle) => (
            <div className="risk-principle-card" key={principle.id}>
              <span>会议纪要纠偏</span>
              <strong>{principle.title}</strong>
              <p>{principle.description}</p>
            </div>
          ))}
        </div>
        <div className="notice risk-note">
          口头描述默认可能不完整、不严谨或带有临场表达，系统只做标红、改写和确认提醒；正式招聘标准必须由负责人确认后生效。
        </div>
      </Card>
      <Card title="口述需求风险扫描">
        <div className="risk-scan-panel">
          <label>
            <span>把会议口述、岗位要求或SOP草稿粘贴到这里</span>
            <textarea
              onChange={(event) => setDraftText(event.target.value)}
              value={draftText}
            />
          </label>
          <div className="risk-summary-grid">
            <div className="risk-summary-card risk-red">
              <span>高风险标红</span>
              <strong>{redCount}</strong>
            </div>
            <div className="risk-summary-card risk-orange">
              <span>中风险</span>
              <strong>{orangeCount}</strong>
            </div>
            <div className="risk-summary-card risk-yellow">
              <span>需注意</span>
              <strong>{yellowCount}</strong>
            </div>
          </div>
        </div>

        {detectedRisks.length ? (
          <div className="risk-result-list">
            {detectedRisks.map((risk) => (
              <div className={`risk-result-card risk-${risk.severity}`} key={risk.id}>
                <div className="risk-result-head">
                  <div>
                    <strong>{risk.category}</strong>
                    <p>命中表达：{risk.matchedPhrases.join('、')}</p>
                  </div>
                  <span className={`risk-badge risk-${risk.severity}`}>{riskSeverityLabel(risk.severity)}</span>
                </div>
                <p><b>风险原因：</b>{risk.reason}</p>
                <p><b>建议改成：</b>{risk.saferAlternative}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="notice">
            当前文本没有命中内置风险表达。正式版仍建议走人工复核和法务/合规确认。
          </div>
        )}
      </Card>

      <Card title="高风险表达纠偏表">
        <div className="risk-rule-grid">
          {riskCorrectionRules.map((rule) => (
            <div className={`risk-rule-card risk-${rule.severity}`} key={rule.id}>
              <div className="risk-result-head">
                <strong>{rule.category}</strong>
                <span className={`risk-badge risk-${rule.severity}`}>{riskSeverityLabel(rule.severity)}</span>
              </div>
              <p><b>原表达：</b>{rule.riskyPhrase}</p>
              <p><b>为什么有风险：</b>{rule.reason}</p>
              <p><b>安全说法：</b>{rule.saferAlternative}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="可改正表达模板">
        <div className="safe-copy-grid">
          {safeCopyExamples.map((example) => (
            <div className="safe-copy-card" key={example.from}>
              <span>把这类说法改掉</span>
              <strong>{example.from}</strong>
              <p>{example.to}</p>
            </div>
          ))}
        </div>
      </Card>

      <SecurityCompliance />
    </section>
  )
}

function PerformanceGoalCenter() {
  const [mode, setMode] = useState<PerformanceGoalMode>('achievement')
  const [roleName, setRoleName] = useState('人事招聘负责人')
  const framework = useMemo(() => buildRoleGoalFramework(roleName, mode), [mode, roleName])
  const summary = goalFrameworkSummary(framework)
  const indicators = flattenGoalIndicators(framework)
  const typeOrder: GoalIndicatorType[] = ['quantitative', 'cyclical', 'systematic', 'result']
  const trainingTask = framework.modules
    .flatMap((module) => module.tasks)
    .find((task) => task.id === 'team-training-system')
  const cycleIndicators = indicators.filter((indicator) => indicator.cadence)

  return (
    <section>
      <PageTitle
        title="成果目标 / OKR / 绩效考核"
        subtitle="把每个岗位拆成一级工作模块、二级关键事项、三级指标；指标按量化、周期化、系统化、业绩化管理。"
        action={
          <>
            <button className="button">AI提炼岗位目标</button>
            <button className="button primary">导出指标树</button>
          </>
        }
      />

      <Card title="成果目标命名">
        <div className="goal-mode-panel">
          <label>
            <span>岗位名称</span>
            <input
              onChange={(event) => setRoleName(event.target.value)}
              placeholder="输入岗位名称"
              value={roleName}
            />
          </label>
          <div className="goal-mode-grid">
            {(Object.keys(performanceGoalModeLabels) as PerformanceGoalMode[]).map((modeId) => (
              <button
                className={mode === modeId ? 'goal-mode-card active' : 'goal-mode-card'}
                key={modeId}
                onClick={() => setMode(modeId)}
                type="button"
              >
                <strong>{performanceGoalModeLabels[modeId]}</strong>
                <span>
                  {modeId === 'achievement' && '强调成果、目标、证据和岗位交付。'}
                  {modeId === 'okr' && '强调目标、关键结果、周期复盘。'}
                  {modeId === 'performance' && '强调考核、权重、评分和奖惩。'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="goal-summary-grid">
        <Stat title="一级模块" value={summary.moduleCount} note="岗位基础工作块" color="blue" />
        <Stat title="二级事项" value={summary.taskCount} note="每块的重要事情" color="green" />
        <Stat title="三级指标" value={summary.indicatorCount} note="可检查的目标" color="blue" />
        <Stat title="总权重" value={summary.totalWeight} note="正式版可折算100分" color="yellow" />
      </div>

      <Card title="岗位基础模块提炼">
        <div className="goal-module-grid">
          {framework.modules.map((module) => (
            <div className="goal-module-card" key={module.id}>
              <div>
                <strong>{module.title}</strong>
                <span>{moduleWeight(module)} 权重</span>
              </div>
              <p>{module.description}</p>
              <div className="chips">
                {module.tasks.map((task) => (
                  <span className="chip" key={task.id}>{task.title}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="三级指标树">
        <div className="goal-tree">
          {framework.modules.map((module) => (
            <div className="goal-tree-module" key={module.id}>
              <h3>{module.title}</h3>
              {module.tasks.map((task) => (
                <div className="goal-task-card" key={task.id}>
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                  </div>
                  {task.indicators.map((indicator) => (
                    <div className={`goal-indicator-row goal-${indicator.type}`} key={indicator.id}>
                      <span>{goalIndicatorTypeLabels[indicator.type]}</span>
                      <strong>{indicator.title}</strong>
                      <p>{indicator.target}</p>
                      <em>{indicator.cadence ? goalCadenceLabels[indicator.cadence] : '按节点'} / {indicator.weight}权重 / {indicator.evidence}</em>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <Card title="量化周期系统业绩">
        <div className="goal-type-grid">
          {typeOrder.map((type) => (
            <div className={`goal-type-card goal-${type}`} key={type}>
              <span>{goalIndicatorTypeLabels[type]}</span>
              <strong>{summary.typeCounts[type]}</strong>
              <p>
                {type === 'quantitative' && '能数清楚的工作，比如筛多少简历、触达多少人、沉淀多少人才。'}
                {type === 'cyclical' && '按每天、每周、每月、每季、每半年、每年重复发生的动作。'}
                {type === 'systematic' && '不能简单按件数算，但必须按步骤、证据和闭环质量检查。'}
                {type === 'result' && '最终要看业务结果，比如到面、录用、留存、关键岗位补位。'}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid two">
        <Card title="培训系统化拆解">
          {trainingTask && (
            <div className="goal-system-flow">
              {trainingTask.indicators.map((indicator, index) => (
                <div className="goal-system-step" key={indicator.id}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{indicator.title}</strong>
                    <p>{indicator.target}</p>
                    <em>{indicator.evidence}</em>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="周期动作清单">
          <div className="goal-cycle-grid">
            {cycleIndicators.slice(0, 9).map((indicator) => (
              <div className="goal-cycle-card" key={indicator.id}>
                <span>{indicator.cadence ? goalCadenceLabels[indicator.cadence] : '按节点'}</span>
                <strong>{indicator.title}</strong>
                <p>{indicator.moduleTitle} / {indicator.taskTitle}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="AI提炼接口预留">
        <div className="goal-ai-pipeline">
          <div><span>1</span><strong>岗位口述</strong><p>部门长说岗位、同行公司、关键成果和周期动作。</p></div>
          <div><span>2</span><strong>AI拆模块</strong><p>提炼部门管理、个人工作、个人业绩、部门业绩、技能成长。</p></div>
          <div><span>3</span><strong>生成指标</strong><p>三级指标自动分为量化、周期化、系统化、业绩化。</p></div>
          <div><span>4</span><strong>人工确认</strong><p>负责人调整权重、周期、证据和评分标准后发布。</p></div>
        </div>
      </Card>
    </section>
  )
}

function ContractCenter({ selected }: { selected: Candidate }) {
  const [activeType, setActiveType] = useState<ContractType>('service')
  const selectedTemplate = templateByType(activeType)
  const selectedSalary = salaryRangeText(selected)
  const draftVariables = {
    baseCompensation: selectedSalary,
    candidateName: selected.name,
    companyEntity: '黑卫士科技有限公司',
    performanceTarget: '从成果目标模块自动带入关键业绩指标',
    postName: selected.postName,
    startDate: '待面谈确认',
  }
  const memoItems: ContractMemoItem[] = [
    { content: '面试中谈妥的关键指标先进入备忘录，不直接改律师模板正文。', id: 'memo-1', scopeId: selectedTemplate.memoScopes[0]?.id ?? 'unknown' },
    { content: activeType === 'partner' ? '达到季度业绩门槛后进入分账测算。' : '转入正式合约前由法务复核。', id: 'memo-2', scopeId: selectedTemplate.memoScopes[1]?.id ?? 'unknown' },
  ]
  const draft = createContractDraft(activeType, draftVariables, memoItems)
  const memoReviews = memoReviewSummary(selectedTemplate, memoItems)
  const summary = contractDashboardSummary()

  return (
    <section>
      <PageTitle
        title="合约模块"
        subtitle="把面试谈妥的关键条件、成果目标和签约类型，转成律师固定模板变量、备忘录和审批流。"
        action={
          <>
            <button className="button">导入律师模板</button>
            <button className="button primary">生成待审合约包</button>
          </>
        }
      />

      <div className="contract-summary-grid">
        <Stat title="合约类型" value={summary.templateCount} note="劳务/劳动/事业部/合伙人" color="blue" />
        <Stat title="变量字段" value={summary.totalRequiredVariables} note="从候选人和成果目标带入" color="green" />
        <Stat title="备忘范围" value={summary.totalMemoScopes} note="额外约定不改模板正文" color="blue" />
        <Stat title="待法务审" value={summary.readyForLegalReview} note="变量完整后才进入" color="yellow" />
      </div>

      <Card title="四类合约流转">
        <div className="contract-type-grid">
          {contractTemplateCatalog.map((template) => (
            <button
              className={activeType === template.type ? 'contract-type-card active' : 'contract-type-card'}
              key={template.id}
              onClick={() => setActiveType(template.type)}
              type="button"
            >
              <strong>{contractTypeLabels[template.type]}</strong>
              <p>{template.useCase}</p>
              <span>{template.keyIndicators.slice(0, 3).join(' / ')}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card title="律师固定模板库">
        <div className="contract-template-panel">
          <div>
            <span className="mini-chip on">当前模板</span>
            <h3>{selectedTemplate.title}</h3>
            <p>{selectedTemplate.fixedTemplateNote}</p>
            <div className="chips">
              {selectedTemplate.keyIndicators.map((item) => (
                <span className="chip good" key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="contract-template-lock">
            <Lock size={22} />
            <strong>绿色模板锁定区</strong>
            <p>正式版只允许律师/法务维护模板正文；业务人员只填写变量和备忘录。</p>
          </div>
        </div>
      </Card>

      <Card title="变量数据填充">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>变量</th><th>来源</th><th>示例/当前值</th><th>状态</th></tr>
            </thead>
            <tbody>
              {selectedTemplate.variables.map((variableItem) => {
                const value = draft.variables[variableItem.id] || variableItem.example
                const missing = draft.missingVariables.some((item) => item.id === variableItem.id)
                return (
                  <tr key={variableItem.id}>
                    <td>{variableItem.label}</td>
                    <td>{variableItem.source}</td>
                    <td>{value}</td>
                    <td><span className={`contract-status ${missing ? 'warn' : 'done'}`}>{missing ? '待补' : '已填'}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="额外约定备忘录">
        <div className="contract-memo-grid">
          {selectedTemplate.memoScopes.map((scope) => (
            <div className={scope.allowed ? 'contract-memo-card allowed' : 'contract-memo-card blocked'} key={scope.id}>
              <span>{scope.allowed ? '允许备忘' : '禁止绕开'}</span>
              <strong>{scope.title}</strong>
              <p>{scope.description}</p>
            </div>
          ))}
        </div>
        <div className="contract-memo-review">
          {memoReviews.map((memo) => (
            <div className={memo.allowed ? 'memo-review-row allowed' : 'memo-review-row blocked'} key={memo.id}>
              <span>{memo.scopeTitle}</span>
              <p>{memo.content}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid two">
        <Card title="合约包生成预览">
          <div className="contract-draft-preview">
            <div>
              <span>签约对象</span>
              <strong>{selected.name}</strong>
              <p>{selected.postName} / {selectedSalary}</p>
            </div>
            <div>
              <span>合约类型</span>
              <strong>{contractTypeLabels[activeType]}</strong>
              <p>{draft.status === 'readyForLegalReview' ? '变量完整，等待法务复核。' : `仍有 ${draft.missingVariables.length} 个变量待补。`}</p>
            </div>
            <div>
              <span>合约组成</span>
              <strong>律师模板 + 变量表 + 备忘录</strong>
              <p>正式签署前需要法务、财务和授权负责人确认。</p>
            </div>
          </div>
        </Card>

        <Card title="审批与用章流程">
          <div className="contract-approval-flow">
            {contractWorkflowSteps.map((step, index) => (
              <div className="contract-step" key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className="contract-approval-tags">
            {selectedTemplate.approvals.map((approval) => (
              <span key={approval}>{approval}</span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

function SecurityCompliance() {
  return (
    <div className="risk-compliance-security-block">
      <div className="section-subtitle-block">
        <span>安全合规边界</span>
        <h3>账号、数据、授权和审计</h3>
        <p>系统涉及简历、录音、薪资佐证和候选人隐私，正式版必须接入权限、审计和授权机制。</p>
      </div>
      <div className="grid two">
        <Card title="已写入产品边界">
          <ul className="plain-list">
            <li>AI评分只做辅助，最终录用/淘汰必须人工确认。</li>
            <li>不保存第三方招聘平台账号密码。</li>
            <li>不做绕过平台风控的自动批量触达。</li>
            <li>音频、简历、工资条、绩效单需要鉴权和审计。</li>
          </ul>
        </Card>
        <Card title="正式后端必做">
          <ul className="plain-list">
            <li>密码哈希存储，API登录鉴权，角色权限控制。</li>
            <li>文件上传限制大小、类型和扩展名。</li>
            <li>敏感字段脱敏展示，导出和下载写审计日志。</li>
            <li>数据库参数化查询，所有输入做schema校验。</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  const workspaceCard = useWorkspaceCard(title)
  const sizeOptions: Array<{ label: string; size: LayoutItemSize }> = [
    { label: '小', size: 'compact' },
    { label: '中', size: 'normal' },
    { label: '大', size: 'wide' },
    { label: '满', size: 'full' },
  ]
  const ratioOptions: Array<{ label: string; ratio: LayoutItemRatio }> = [
    { label: '自', ratio: 'auto' },
    { label: '横', ratio: 'landscape' },
    { label: '竖', ratio: 'portrait' },
    { label: '标', ratio: 'standard' },
    { label: '方', ratio: 'square' },
  ]
  const scaleOptions: Array<{ label: string; scale: LayoutItemScale }> = [
    { label: '80', scale: 'xs' },
    { label: '90', scale: 'sm' },
    { label: '100', scale: 'md' },
    { label: '125', scale: 'lg' },
    { label: '150', scale: 'xl' },
  ]

  return (
    <div
      className={`card ${workspaceCard ? `layout-card ${workspaceCard.locked ? 'locked' : 'unlocked'} ${workspaceCard.sizeClass} ${workspaceCard.ratioClass} ${workspaceCard.scaleClass} ${workspaceCard.fractionClass}` : ''}`}
      data-layout-id={workspaceCard?.id}
      draggable={workspaceCard?.draggable ?? false}
      onDragEnd={workspaceCard?.onDragEnd}
      onDragOver={workspaceCard?.onDragOver}
      onDragStart={workspaceCard?.onDragStart}
      onDrop={workspaceCard?.onDrop}
      style={workspaceCard ? { order: workspaceCard.order } : undefined}
    >
      <div className="card-title">
        <h2>{title}</h2>
        <div className="card-title-actions">
          {action}
          {workspaceCard && !workspaceCard.locked && (
            <span className="resize-control" aria-label={`${title}模块尺寸`}>
              {sizeOptions.map((option) => (
                <button
                  className={workspaceCard.size === option.size ? 'active' : ''}
                  key={option.size}
                  onClick={() => workspaceCard.resize(option.size)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </span>
          )}
          {workspaceCard && !workspaceCard.locked && (
            <span className="resize-control ratio-control" aria-label={`${title}模块比例`}>
              {ratioOptions.map((option) => (
                <button
                  className={workspaceCard.ratio === option.ratio ? 'active' : ''}
                  key={option.ratio}
                  onClick={() => workspaceCard.reshape(option.ratio)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </span>
          )}
          {workspaceCard && !workspaceCard.locked && (
            <span className="resize-control scale-control" aria-label={`${title}模块等比缩放`}>
              {scaleOptions.map((option) => (
                <button
                  className={workspaceCard.scale === option.scale ? 'active' : ''}
                  key={option.scale}
                  onClick={() => workspaceCard.scaleCard(option.scale)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </span>
          )}
          {workspaceCard && (
            <span className="drag-handle" title={workspaceCard.locked ? '先解锁布局后拖拽' : '拖拽调整模块位置'}>
              <GripVertical size={15} />
            </span>
          )}
        </div>
      </div>
      {children}
      {workspaceCard && !workspaceCard.locked && (
        <button
          aria-label={`${title}右下角等比拖拽缩放`}
          className="grid-resize-handle"
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={workspaceCard.startGridResize}
          title="按住拖动，自动吸附到 1/8、1/4、1/3、1/2 或整行"
          type="button"
        >
          <span />
        </button>
      )}
    </div>
  )
}

function Stat({ title, value, note, color }: { title: string; value: string | number; note: string; color: string }) {
  const workspaceCard = useWorkspaceCard(title)
  const sizeOptions: Array<{ label: string; size: LayoutItemSize }> = [
    { label: '小', size: 'compact' },
    { label: '中', size: 'normal' },
    { label: '大', size: 'wide' },
    { label: '满', size: 'full' },
  ]
  const ratioOptions: Array<{ label: string; ratio: LayoutItemRatio }> = [
    { label: '自', ratio: 'auto' },
    { label: '横', ratio: 'landscape' },
    { label: '竖', ratio: 'portrait' },
    { label: '标', ratio: 'standard' },
    { label: '方', ratio: 'square' },
  ]
  const scaleOptions: Array<{ label: string; scale: LayoutItemScale }> = [
    { label: '80', scale: 'xs' },
    { label: '90', scale: 'sm' },
    { label: '100', scale: 'md' },
    { label: '125', scale: 'lg' },
    { label: '150', scale: 'xl' },
  ]

  return (
    <div
      className={`stat card accent-${color} ${workspaceCard ? `layout-card ${workspaceCard.locked ? 'locked' : 'unlocked'} ${workspaceCard.sizeClass} ${workspaceCard.ratioClass} ${workspaceCard.scaleClass} ${workspaceCard.fractionClass}` : ''}`}
      data-layout-id={workspaceCard?.id}
      draggable={workspaceCard?.draggable ?? false}
      onDragEnd={workspaceCard?.onDragEnd}
      onDragOver={workspaceCard?.onDragOver}
      onDragStart={workspaceCard?.onDragStart}
      onDrop={workspaceCard?.onDrop}
      style={workspaceCard ? { order: workspaceCard.order } : undefined}
    >
      <div className="stat-title-row">
        <span>{title}</span>
        <div className="card-title-actions">
          {workspaceCard && !workspaceCard.locked && (
            <span className="resize-control compact-resize" aria-label={`${title}模块尺寸`}>
              {sizeOptions.map((option) => (
                <button
                  className={workspaceCard.size === option.size ? 'active' : ''}
                  key={option.size}
                  onClick={() => workspaceCard.resize(option.size)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </span>
          )}
          {workspaceCard && !workspaceCard.locked && (
            <span className="resize-control compact-resize ratio-control" aria-label={`${title}模块比例`}>
              {ratioOptions.map((option) => (
                <button
                  className={workspaceCard.ratio === option.ratio ? 'active' : ''}
                  key={option.ratio}
                  onClick={() => workspaceCard.reshape(option.ratio)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </span>
          )}
          {workspaceCard && !workspaceCard.locked && (
            <span className="resize-control compact-resize scale-control" aria-label={`${title}模块等比缩放`}>
              {scaleOptions.map((option) => (
                <button
                  className={workspaceCard.scale === option.scale ? 'active' : ''}
                  key={option.scale}
                  onClick={() => workspaceCard.scaleCard(option.scale)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </span>
          )}
          {workspaceCard && (
            <span className="drag-handle" title={workspaceCard.locked ? '先解锁布局后拖拽' : '拖拽调整模块位置'}>
              <GripVertical size={15} />
            </span>
          )}
        </div>
      </div>
      <strong>{value}</strong>
      <p>{note}</p>
      {workspaceCard && !workspaceCard.locked && (
        <button
          aria-label={`${title}右下角等比拖拽缩放`}
          className="grid-resize-handle"
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={workspaceCard.startGridResize}
          title="按住拖动，自动吸附到 1/8、1/4、1/3、1/2 或整行"
          type="button"
        >
          <span />
        </button>
      )}
    </div>
  )
}

export default App
