import { describe, expect, it } from 'vitest'
import {
  hrFunctionModules,
  permissionLevelLabels,
  permissionLevels,
  summarizeHrPermissionSystem,
} from './hrPermissions'

describe('HR permission system', () => {
  it('defines four permission levels from absolute authority to execution layer', () => {
    expect(permissionLevels.map((level) => level.id)).toEqual(['absolute', 'hr-executive', 'module-manager', 'execution'])
    expect(permissionLevelLabels.absolute).toBe('绝对权限')
    expect(permissionLevels[0].roles).toEqual(expect.arrayContaining(['老板', '总工程师', '平台管理员']))
    expect(permissionLevels[3].roles).toEqual(expect.arrayContaining(['招聘专员', '规划专员', '培训专员', '绩效专员', '薪酬专员']))
  })

  it('fills the HR module map beyond the six common modules', () => {
    expect(hrFunctionModules.map((module) => module.name)).toEqual(
      expect.arrayContaining([
        '人力资源战略',
        '人力资源规划',
        '招聘配置',
        '绩效管理',
        '培训发展',
        '薪酬福利',
        '员工关系',
        '企业文化',
        '组织发展',
        '干部/人才梯队',
        'HR数据与合规',
      ]),
    )
    expect(hrFunctionModules.every((module) => module.managerRole && module.executorRole)).toBe(true)
  })

  it('summarizes levels and modules for the admin console', () => {
    const summary = summarizeHrPermissionSystem()

    expect(summary).toContain('4级权限')
    expect(summary).toContain('11个HR模块')
  })
})
