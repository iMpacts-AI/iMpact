/**
 * iMpact AI — Core System Types & Interfaces
 * Sovereign Autonomous Operating Systems & Agentic Infrastructure
 * Author: Sheikh Saqib (iMpact AI)
 */

export type RiskLevel = 'READ_ONLY' | 'LOW_RISK' | 'MODERATE_RISK' | 'CRITICAL';

export type LifecycleStage = 'OBSERVE' | 'PLAN' | 'GATE' | 'ACT' | 'VERIFY' | 'COMPLETED' | 'FAILED' | 'ESTOPPED';

export interface SectorDefinition {
  id: string;
  name: string;
  designation: string;
  description: string;
  latencyTargetMs: number;
  isLocal: boolean;
  capabilities: string[];
}

export interface SecurityBoundaryPolicy {
  allowlistedPaths: string[];
  denylistedPaths: string[];
  protectedWindowsRoots: string[];
  maxExecutionTimeMs: number;
  requireHumanApprovalForCritical: boolean;
  allowDestructiveCommands: boolean;
}

export interface AgentTaskRequest {
  id: string;
  naturalLanguageInstruction: string;
  origin: string;
  timestamp: number;
  priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'REALTIME';
  context?: Record<string, unknown>;
}

export interface AgentAction {
  id: string;
  type: string;
  target?: string;
  parameters?: Record<string, unknown>;
  riskLevel: RiskLevel;
  confidence: number;
  reason: string;
}

export interface TaskExecutionPlan {
  taskId: string;
  instruction: string;
  actions: AgentAction[];
  overallRisk: RiskLevel;
  createdAt: number;
  status: 'PENDING' | 'EXECUTING' | 'VERIFIED' | 'FAILED';
}

export interface ActionVerificationResult {
  actionId: string;
  verified: boolean;
  observedDiffMs?: number;
  error?: string;
  postconditionsMet: boolean;
}
