/**
 * iMpact AI — Security Boundary & Path Containment
 * Zero-trust protection against unauthorized filesystem mutations and system corruption.
 * Author: Sheikh Saqib (iMpact AI)
 */

import { SecurityBoundaryPolicy, RiskLevel } from '../types';

export class BoundaryContainment {
  private static defaultPolicy: SecurityBoundaryPolicy = {
    allowlistedPaths: [
      process.env.USERPROFILE || 'C:\\Users',
      'C:\\Projects',
      'C:\\Workspace'
    ],
    denylistedPaths: [
      'C:\\Windows',
      'C:\\Windows\\System32',
      'C:\\Windows\\SysWOW64',
      'C:\\Program Files\\Windows Defender',
      'C:\\Boot',
      'C:\\Recovery'
    ],
    protectedWindowsRoots: [
      'C:\\Windows',
      'C:\\Windows\\System32'
    ],
    maxExecutionTimeMs: 15000,
    requireHumanApprovalForCritical: true,
    allowDestructiveCommands: false
  };

  private policy: SecurityBoundaryPolicy;

  constructor(customPolicy?: Partial<SecurityBoundaryPolicy>) {
    this.policy = { ...BoundaryContainment.defaultPolicy, ...customPolicy };
  }

  public isPathProtected(targetPath: string): boolean {
    const normalized = targetPath.replace(/[\/\\]+/g, '\\').toLowerCase();
    return this.policy.denylistedPaths.some(p => normalized.startsWith(p.toLowerCase()));
  }

  public evaluateActionRisk(actionType: string, target?: string): RiskLevel {
    const act = actionType.toUpperCase();

    if (act.includes('DELETE') || act.includes('FORMAT') || act.includes('REGISTRY') || act.includes('DROP')) {
      return 'CRITICAL';
    }

    if (target && this.isPathProtected(target)) {
      return 'CRITICAL';
    }

    if (act.includes('WRITE') || act.includes('EXECUTE') || act.includes('SPAWN') || act.includes('KILL')) {
      return 'MODERATE_RISK';
    }

    if (act.includes('CLICK') || act.includes('TYPE') || act.includes('HOTKEY') || act.includes('FOCUS')) {
      return 'LOW_RISK';
    }

    return 'READ_ONLY';
  }

  public getPolicy(): SecurityBoundaryPolicy {
    return this.policy;
  }
}
