import { describe, expect, it } from 'vitest'
import {
  audioComplianceWarnings,
  buildAudioInterviewReport,
  buildMeetingArchivePackage,
  createAudioIntakeRecord,
  createMeetingAudioImportRequest,
  describeMeetingAccessCredential,
  extractInterviewSignals,
  interviewRoundLabels,
  isSupportedRecruitingPhone,
  matchCandidateFromAudio,
  meetingPlatformAdapters,
  meetingPlatformSupportsAccessMethod,
  recruitingPhoneDevices,
} from './audioIntake'

const transcript = [
  '您好，我是李晨，电话是13800001111。',
  '我之前做B端大客户销售，能讲清成交链路，去年个人业绩180万。',
  '我对AI硬件行业比较看好，也愿意学习产品知识。',
  '我平时喜欢跑步，工作节奏比较积极，能接受电话初试后限时作业。',
  '出生信息如果公司只是备注，我可以自愿说一下。',
].join('\n')

describe('audio intake from dedicated recruiting phones', () => {
  it('only treats company owned Xiaomi/OPPO/vivo devices as supported 1.2 recruiting phones', () => {
    expect(isSupportedRecruitingPhone(recruitingPhoneDevices[0])).toBe(true)
    expect(isSupportedRecruitingPhone({ ...recruitingPhoneDevices[0], brand: 'Huawei' })).toBe(false)
    expect(isSupportedRecruitingPhone({ ...recruitingPhoneDevices[0], companyOwned: false })).toBe(false)
  })

  it('creates an intake record with backend push path and consent warnings', () => {
    const record = createAudioIntakeRecord({
      candidateNameHint: '李晨',
      candidatePhoneHint: '13800001111',
      consentStatus: 'pending',
      deviceId: 'phone-xm-001',
      durationSeconds: 1260,
      fileName: 'call-lichen.m4a',
      fileUrl: 'https://files.example.com/call-lichen.m4a',
      pushedAt: '2026-06-19T11:00:00+08:00',
      sourceType: 'phone_call',
      transcript,
    })

    expect(record.backendPath).toBe('/api/audio-intake/recruiting-phone')
    expect(record.assignedHrName).toBe('陈HR')
    expect(record.department).toBe('人力资源部')
    expect(record.warnings).toContain(audioComplianceWarnings.consentRequired)
    expect(record.status).toBe('待授权确认')
  })

  it('matches candidate by phone first and name hint second', () => {
    const candidates = [
      { id: 1, name: '李晨', phone: '13800001111', postName: '业务经理' },
      { id: 2, name: '周敏', phone: '13900002222', postName: '财务经理' },
    ]

    expect(matchCandidateFromAudio({ candidatePhoneHint: '13800001111' }, candidates)).toMatchObject({
      candidateId: 1,
      confidence: '高',
    })
    expect(matchCandidateFromAudio({ candidateNameHint: '周敏' }, candidates)).toMatchObject({
      candidateId: 2,
      confidence: '中',
    })
  })

  it('extracts job-related interview signals while isolating voluntary cultural notes', () => {
    const signals = extractInterviewSignals(transcript)

    expect(signals.keywords).toEqual(expect.arrayContaining(['岗位认知', '产业认知', '能力证据', '积极配合']))
    expect(signals.mindMapNodes.some((node) => node.title === '岗位理解')).toBe(true)
    expect(signals.culturalNote.excludedFromScore).toBe(true)
    expect(signals.culturalNote.note).toContain('自愿披露')
  })

  it('isolates tarot and zodiac notes as voluntary cultural interests only', () => {
    const signals = extractInterviewSignals('候选人说自己相信塔罗牌和星座，愿意把它当作个人兴趣备注。')

    expect(signals.culturalNote.detected).toBe(true)
    expect(signals.culturalNote.excludedFromScore).toBe(true)
    expect(signals.culturalNote.note).toContain('塔罗牌')
  })

  it('builds a report with ability graph, communication graph and job match score', () => {
    const report = buildAudioInterviewReport({
      candidateName: '李晨',
      jobName: '业务经理',
      transcript,
    })

    expect(report.summary).toContain('李晨')
    expect(report.abilityGraph).toHaveLength(5)
    expect(report.communicationGraph).toHaveLength(5)
    expect(report.jobMatchScore).toBeGreaterThanOrEqual(70)
    expect(report.scoringBoundary).toContain('塔罗牌')
    expect(report.scoringBoundary).toContain('星座')
  })

  it('defines meeting recording adapters for common interview platforms', () => {
    expect(interviewRoundLabels).toMatchObject({
      final: '终试',
      first: '初试',
      second: '复试',
    })
    expect(meetingPlatformAdapters.map((adapter) => adapter.label)).toEqual(
      expect.arrayContaining(['腾讯会议', '钉钉会议', '企微会议', '飞书会议', '电话会议']),
    )
    expect(meetingPlatformSupportsAccessMethod('tencent_meeting', 'meeting_code')).toBe(true)
    expect(meetingPlatformSupportsAccessMethod('dingtalk_meeting', 'scan_qr')).toBe(true)
    expect(meetingPlatformSupportsAccessMethod('phone_conference', 'phone_bridge')).toBe(true)
  })

  it('creates a meeting recording import request with masked meeting code and round binding', () => {
    const request = createMeetingAudioImportRequest({
      accessMethod: 'room_password',
      candidateNameHint: '李晨',
      consentStatus: 'confirmed',
      hostName: '陈HR',
      meetingCode: '123 456 789',
      meetingLink: 'https://meeting.tencent.com/dm/secret-room',
      meetingPassword: '888999',
      meetingRoomName: '腾讯会议-业务经理初试',
      platformId: 'tencent_meeting',
      recordingAuthorization: 'confirmed',
      round: 'second',
      scheduledAt: '2026-06-19T15:00:00+08:00',
    })

    expect(request.backendPath).toBe('/api/audio-intake/meeting-recording/tencent-meeting')
    expect(request.meetingCodeMasked).toBe('*****6789')
    expect(request.meetingLinkMasked).toBe('https://meeting.tencent.com/***')
    expect(request.meetingPasswordMasked).toBe('**8999')
    expect(request.meetingRoomName).toBe('腾讯会议-业务经理初试')
    expect(describeMeetingAccessCredential(request)).toContain('会议室：腾讯会议-业务经理初试')
    expect(describeMeetingAccessCredential(request)).toContain('密码：**8999')
    expect(request.roundLabel).toBe('复试')
    expect(request.status).toBe('待拉取录音')
    expect(request.warnings.join('')).not.toContain('123 456 789')
    expect(request.warnings.join('')).not.toContain('888999')
    expect(request.warnings.join('')).not.toContain('secret-room')
  })

  it('keeps meeting imports waiting until candidate consent and platform recording authorization are confirmed', () => {
    const request = createMeetingAudioImportRequest({
      accessMethod: 'scan_qr',
      candidateNameHint: '周敏',
      consentStatus: 'pending',
      hostName: '王HR',
      platformId: 'feishu_meeting',
      qrPayload: 'feishu://meeting/secure-token',
      recordingAuthorization: 'pending',
      round: 'final',
      scheduledAt: '2026-06-20T10:00:00+08:00',
    })

    expect(request.status).toBe('待授权确认')
    expect(request.roundLabel).toBe('终试')
    expect(request.warnings).toContain(audioComplianceWarnings.consentRequired)
    expect(request.warnings).toContain(audioComplianceWarnings.meetingRecordingAuthRequired)
  })

  it('summarizes QR, room/password and meeting link access into an archive package', () => {
    const requests = [
      createMeetingAudioImportRequest({
        accessMethod: 'scan_qr',
        candidateNameHint: '李晨',
        consentStatus: 'confirmed',
        hostName: '陈HR',
        platformId: 'dingtalk_meeting',
        qrPayload: 'dingtalk://meeting/secure-token',
        recordingAuthorization: 'confirmed',
        round: 'first',
        scheduledAt: '2026-06-19T10:00:00+08:00',
      }),
      createMeetingAudioImportRequest({
        accessMethod: 'room_password',
        candidateNameHint: '李晨',
        consentStatus: 'confirmed',
        hostName: '业务部门长',
        meetingPassword: '123456',
        meetingRoomName: '企微会议-复试A',
        platformId: 'wecom_meeting',
        recordingAuthorization: 'confirmed',
        round: 'second',
        scheduledAt: '2026-06-20T10:00:00+08:00',
      }),
      createMeetingAudioImportRequest({
        accessMethod: 'meeting_link',
        candidateNameHint: '李晨',
        consentStatus: 'confirmed',
        hostName: '老板',
        meetingLink: 'https://vc.feishu.cn/j/abcdefg',
        platformId: 'feishu_meeting',
        recordingAuthorization: 'confirmed',
        round: 'final',
        scheduledAt: '2026-06-21T10:00:00+08:00',
      }),
    ]

    const archive = buildMeetingArchivePackage({
      aiSuggestions: ['建议复试追问个人真实业绩占比。'],
      candidateId: 1,
      candidateName: '李晨',
      meetingRequests: requests,
      minutes: '候选人能讲清成交链路和AI硬件行业兴趣。',
      outline: ['身份确认', '岗位经历', '业绩佐证', '下一步安排'],
      transcript,
    })

    expect(archive.accessSummary).toEqual(
      expect.arrayContaining([
        expect.stringContaining('扫码接入'),
        expect.stringContaining('会议室：企微会议-复试A'),
        expect.stringContaining('会议链接'),
      ]),
    )
    expect(archive.sections).toEqual(expect.arrayContaining(['录音原文', '转写纪要', '提炼大纲', 'AI分析建议']))
    expect(archive.archivePath).toBe('/api/audio-intake/meeting-archive/1')
    expect(archive.complianceNotes.join('')).toContain('不做静默入会')
  })
})
