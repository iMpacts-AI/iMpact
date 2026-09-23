/**
 * iMpact AI — Quantum Sector Matrix Router
 * Sovereign multi-model routing fabric ensuring zero third-party vendor leaks.
 * Author: Sheikh Saqib (iMpact AI)
 */

import { SectorDefinition } from '../types';

export class QuantumSectorRouter {
  private static readonly SECTORS: SectorDefinition[] = [
    {
      id: 'SECTOR_00',
      name: 'KERNEL AUTONOMOUS CORE',
      designation: 'SECTOR 00 // KERNEL AUTONOMOUS CORE',
      description: 'Local deterministic micro-kernel executing offline regex, system telemetry, and deterministic logic.',
      latencyTargetMs: 5,
      isLocal: true,
      capabilities: ['SYSTEM_TELEMETRY', 'OFFLINE_FALLBACK', 'DETERMINISTIC_RULES']
    },
    {
      id: 'SECTOR_01',
      name: 'HYPERION LPU CORE',
      designation: 'SECTOR 01 // HYPERION LPU CORE',
      description: 'Sub-second neural inference engine optimized for real-time natural language classification.',
      latencyTargetMs: 250,
      isLocal: false,
      capabilities: ['FAST_INFERENCE', 'INTENT_CLASSIFICATION', 'STREAMING']
    },
    {
      id: 'SECTOR_02',
      name: 'AETHER PERCEPTION MESH',
      designation: 'SECTOR 02 // AETHER PERCEPTION MESH',
      description: 'Deep multimodal visual synapse core analyzing 1080p display buffers and optical UI hierarchies.',
      latencyTargetMs: 1200,
      isLocal: false,
      capabilities: ['OPTICAL_VLM', 'SCREEN_GROUNDING', 'OCR']
    },
    {
      id: 'SECTOR_03',
      name: 'POLARIS SOVEREIGN NEXUS',
      designation: 'SECTOR 03 // POLARIS SOVEREIGN NEXUS',
      description: 'Autonomous agentic cluster synthesizing complex multi-stage DAG task plans and error recovery.',
      latencyTargetMs: 800,
      isLocal: false,
      capabilities: ['DAG_PLANNING', 'TOOL_ORCHESTRATION', 'AUTONOMOUS_RECOVERY']
    },
    {
      id: 'SECTOR_04',
      name: 'CHRONOS SYNTHESIS HUB',
      designation: 'SECTOR 04 // CHRONOS SYNTHESIS HUB',
      description: 'High-fidelity reasoning engine reserved for complex code generation and architectural synthesis.',
      latencyTargetMs: 2000,
      isLocal: false,
      capabilities: ['DEEP_REASONING', 'CODE_SYNTHESIS', 'ARCHITECTURAL_AUDIT']
    }
  ];

  public static getAvailableSectors(): SectorDefinition[] {
    return [...QuantumSectorRouter.SECTORS];
  }

  public static routeTask(intent: string, requiresVision: boolean = false): SectorDefinition {
    if (requiresVision) {
      return QuantumSectorRouter.SECTORS[2]; // Sector 02 Aether Perception
    }

    const intentLower = intent.toLowerCase();

    if (intentLower.includes('code') || intentLower.includes('architecture') || intentLower.includes('deep')) {
      return QuantumSectorRouter.SECTORS[4]; // Sector 04 Chronos Synthesis
    }

    if (intentLower.includes('plan') || intentLower.includes('workflow') || intentLower.includes('chain')) {
      return QuantumSectorRouter.SECTORS[3]; // Sector 03 Polaris Nexus
    }

    if (intentLower.includes('quick') || intentLower.includes('classify') || intentLower.includes('type')) {
      return QuantumSectorRouter.SECTORS[1]; // Sector 01 Hyperion Core
    }

    return QuantumSectorRouter.SECTORS[0]; // Sector 00 Kernel Core
  }
}
