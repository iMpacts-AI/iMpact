/**
 * iMpact AI — Observe-Plan-Act-Verify (OPAV) Lifecycle State Machine
 * Author: Sheikh Saqib (iMpact AI)
 */

import { LifecycleStage } from '../types';

export class ExecutionLifecycle {
  private currentStage: LifecycleStage = 'OBSERVE';
  private stageHistory: Array<{ stage: LifecycleStage; timestamp: number; context?: string }> = [];

  constructor() {
    this.recordTransition('OBSERVE', 'Lifecycle initialized at observation state');
  }

  public getStage(): LifecycleStage {
    return this.currentStage;
  }

  public transition(nextStage: LifecycleStage, context?: string): void {
    const validTransitions: Record<LifecycleStage, LifecycleStage[]> = {
      OBSERVE: ['PLAN', 'FAILED', 'ESTOPPED'],
      PLAN: ['GATE', 'FAILED', 'ESTOPPED'],
      GATE: ['ACT', 'FAILED', 'ESTOPPED'],
      ACT: ['VERIFY', 'FAILED', 'ESTOPPED'],
      VERIFY: ['OBSERVE', 'COMPLETED', 'FAILED', 'ESTOPPED'],
      COMPLETED: ['OBSERVE'],
      FAILED: ['OBSERVE'],
      ESTOPPED: ['OBSERVE']
    };

    const allowed = validTransitions[this.currentStage];
    if (!allowed.includes(nextStage)) {
      throw new Error(`[INVALID LIFECYCLE TRANSITION] Cannot transition from '${this.currentStage}' to '${nextStage}'.`);
    }

    this.currentStage = nextStage;
    this.recordTransition(nextStage, context);
  }

  private recordTransition(stage: LifecycleStage, context?: string): void {
    this.stageHistory.push({
      stage,
      timestamp: Date.now(),
      context
    });
  }

  public getHistory(): Array<{ stage: LifecycleStage; timestamp: number; context?: string }> {
    return [...this.stageHistory];
  }
}
