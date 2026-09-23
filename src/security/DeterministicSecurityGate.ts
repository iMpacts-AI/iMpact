/**
 * iMpact AI — Deterministic Security Gate
 * Strict hardware and software authorization kernel for autonomous agents.
 * Author: Sheikh Saqib (iMpact AI)
 */

import { AgentAction, RiskLevel } from '../types';
import { BoundaryContainment } from './BoundaryContainment';

export class DeterministicSecurityGate {
  private containment: BoundaryContainment;
  private isEstopActive: boolean = false;
  private estopReason?: string;

  constructor(containment?: BoundaryContainment) {
    this.containment = containment || new BoundaryContainment();
  }

  public triggerEmergencyStop(reason: string = 'Operator Emergency Stop Initiated'): void {
    this.isEstopActive = true;
    this.estopReason = reason;
  }

  public resetEmergencyStop(): void {
    this.isEstopActive = false;
    this.estopReason = undefined;
  }

  public isEmergencyStopped(): boolean {
    return this.isEstopActive;
  }

  public authorizeAction(action: AgentAction): { allowed: boolean; reason?: string; risk: RiskLevel } {
    if (this.isEstopActive) {
      return {
        allowed: false,
        reason: `[ESTOP ACTIVE] Execution prohibited: ${this.estopReason}`,
        risk: 'CRITICAL'
      };
    }

    const calculatedRisk = this.containment.evaluateActionRisk(action.type, action.target);

    if (calculatedRisk === 'CRITICAL') {
      return {
        allowed: false,
        reason: `[SECURITY INTERVENTION] Action '${action.type}' targeting '${action.target}' is classified as CRITICAL and blocked by policy.`,
        risk: 'CRITICAL'
      };
    }

    return {
      allowed: true,
      risk: calculatedRisk
    };
  }
}
