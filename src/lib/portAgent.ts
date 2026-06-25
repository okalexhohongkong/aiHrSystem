import { aiInterviewChannels } from './aiInvitationInterview'
import {
  buildMultiEndpointDistribution,
  type DistributionChannelType,
  type DistributionRecipient,
  type MultiEndpointDistributionPackage,
} from './platformDistribution'

export const portAgentMenuLabel = '端口Agent'

export type PortAgentHub = {
  agentCapabilities: string[]
  aiChannels: string[]
  deliveryChannels: MultiEndpointDistributionPackage['sendQueue']
  distributionPackage: MultiEndpointDistributionPackage
  summary: string
  title: string
}

export function buildPortAgentHub(input: {
  baseUrl: string
  channelTypes: DistributionChannelType[]
  recipient: DistributionRecipient
}): PortAgentHub {
  const distributionPackage = buildMultiEndpointDistribution(input)
  const agentCapabilities = ['Sales Skills', 'Tech Skills', 'AI邀约', 'AI文字面试', 'AI语音面试', '结构化回填']
  const aiChannels = aiInterviewChannels.map((channel) => channel.name)

  return {
    agentCapabilities,
    aiChannels,
    deliveryChannels: distributionPackage.sendQueue,
    distributionPackage,
    summary: `${portAgentMenuLabel}统一承载APP/PWA下载、短信/邮件/二维码/链接触达、AI邀约面试和Skills结构化回填。`,
    title: portAgentMenuLabel,
  }
}
