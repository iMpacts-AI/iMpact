/**
 * iMpact AI Core Framework — Comprehensive Verification Test Suite
 * Tests: SovereignKernel, ExecutionLifecycle, DeterministicSecurityGate,
 * BoundaryContainment, QuantumSectorRouter, KineticDriver, and AgenticProtocols.
 * Author: Sheikh Saqib (iMpact AI)
 */

import { SovereignKernel } from '../src/kernel/SovereignKernel';
import { DeterministicSecurityGate } from '../src/security/DeterministicSecurityGate';
import { BoundaryContainment } from '../src/security/BoundaryContainment';
import { QuantumSectorRouter } from '../src/routing/QuantumSectorRouter';
import { KineticDriver } from '../src/kinetic/KineticDriver';
import { AgenticProtocols, ToolDAGNode } from '../src/protocols/AgenticProtocols';

async function runTestSuite() {
  console.log('=== RUNNING IMPACT AI CORE FRAMEWORK VERIFICATION SUITE ===');
  let passed = 0;
  let failed = 0;

  function assert(condition: any, message: string) {
    if (Boolean(condition)) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Boundary Containment & Security Gate
  {
    const containment = new BoundaryContainment();
    assert(containment.isPathProtected('C:\\Windows\\System32\\cmd.exe'), 'Correctly identifies protected Windows root path');
    assert(!containment.isPathProtected('C:\\Users\\User\\Documents\\notes.txt'), 'Allows standard user directory paths');

    const gate = new DeterministicSecurityGate(containment);
    const safeAction = { id: 'act_1', type: 'MOUSE_CLICK', confidence: 0.95, riskLevel: 'LOW_RISK' as const, reason: 'Click test' };
    const authSafe = gate.authorizeAction(safeAction);
    assert(authSafe.allowed, 'Authorizes low-risk action');

    const criticalAction = { id: 'act_2', type: 'FORMAT_DISK', target: 'C:\\Windows', confidence: 0.95, riskLevel: 'CRITICAL' as const, reason: 'Destructive test' };
    const authCritical = gate.authorizeAction(criticalAction);
    assert(!authCritical.allowed, 'Blocks critical destructive action');

    // Emergency Stop
    gate.triggerEmergencyStop('Hardware Estop Triggered');
    assert(gate.isEmergencyStopped(), 'Reports active emergency stop state');
    const authDuringEstop = gate.authorizeAction(safeAction);
    assert(!authDuringEstop.allowed, 'Rejects all actions while emergency stop is active');
    gate.resetEmergencyStop();
    assert(!gate.isEmergencyStopped(), 'Resets emergency stop cleanly');
  }

  // 2. Sovereign Kernel & OPAV Lifecycle
  {
    const kernel = new SovereignKernel();
    assert(kernel.getLifecycle().getStage() === 'OBSERVE', 'Kernel initializes at OBSERVE lifecycle stage');

    const task = await kernel.submitTask({
      id: 'task_001',
      naturalLanguageInstruction: 'Open document editor and record telemetry',
      origin: 'CLI_OPERATOR',
      timestamp: Date.now()
    });

    assert(task.actions.length === 2, 'Kernel synthesizes multi-step plan');
    assert(kernel.getLifecycle().getStage() === 'GATE', 'Kernel transitions through PLAN to GATE');

    const results = await kernel.executePlan(task);
    assert(results.length === 2 && results.every(r => r.verified), 'Executes and verifies all plan actions');
    assert(task.status === 'VERIFIED', 'Task status marked as VERIFIED');
    assert(kernel.getLifecycle().getStage() === 'COMPLETED', 'Lifecycle transitions to COMPLETED');
  }

  // 3. Quantum Sector Matrix Routing
  {
    const sectors = QuantumSectorRouter.getAvailableSectors();
    assert(sectors.length === 5, 'Provides 5 distinct proprietary quantum sectors');

    const visionSector = QuantumSectorRouter.routeTask('Analyze screen buffer', true);
    assert(visionSector.id === 'SECTOR_02', 'Routes vision requests to Sector 02 Aether Perception Mesh');

    const codeSector = QuantumSectorRouter.routeTask('Synthesize deep architectural code');
    assert(codeSector.id === 'SECTOR_04', 'Routes deep reasoning to Sector 04 Chronos Synthesis Hub');

    const offlineSector = QuantumSectorRouter.routeTask('System status query');
    assert(offlineSector.id === 'SECTOR_00', 'Routes standard telemetry to Sector 00 Kernel Core');
  }

  // 4. Kinetic Driver
  {
    const traj = KineticDriver.calculateTrajectory({ x: 100, y: 100 }, { x: 800, y: 600 });
    assert(traj.points.length >= 3, 'Calculates multi-point interpolated kinetic cursor trajectory');
    assert(
      KineticDriver.validateCoordinates({ x: 960, y: 540 }),
      'Validates 1080p desktop display coordinates'
    );
    assert(
      !KineticDriver.validateCoordinates({ x: 2500, y: 1500 }),
      'Rejects out-of-bounds coordinates'
    );
  }

  // 5. Agentic Protocols & Tool DAG Execution
  {
    const nodes: ToolDAGNode[] = [
      { nodeId: 'node_1', toolName: 'system.get_info', arguments: {}, dependencies: [] },
      { nodeId: 'node_2', toolName: 'system.get_cpu', arguments: {}, dependencies: [] },
      { nodeId: 'node_3', toolName: 'report.generate', arguments: {}, dependencies: ['node_1', 'node_2'] }
    ];

    const order = AgenticProtocols.resolveDAGOrder(nodes);
    assert(order.length === 2, 'Resolves 2-tier DAG execution layers');
    assert(order[0].includes('node_1') && order[0].includes('node_2'), 'Layer 1 runs independent tasks in parallel');
    assert(order[1].includes('node_3'), 'Layer 2 runs dependent task sequentially');
  }

  console.log(`\n==================================================`);
  console.log(`RESULTS: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error(err);
  process.exit(1);
});
