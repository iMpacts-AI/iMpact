/**
 * iMpact AI — Agentic Protocol Specifications
 * Standards for inter-agent communication, tool execution DAGs, and memory synchronization.
 * Author: Sheikh Saqib (iMpact AI)
 */

export interface ToolDAGNode {
  nodeId: string;
  toolName: string;
  arguments: Record<string, unknown>;
  dependencies: string[]; // nodeIds that must complete before this node executes
  timeoutMs?: number;
  retryCount?: number;
}

export interface ToolDAGPlan {
  planId: string;
  nodes: ToolDAGNode[];
  executionMode: 'SEQUENTIAL' | 'PARALLEL_SAFE' | 'ADAPTIVE';
  createdAt: number;
}

export interface MemoryRecord {
  id: string;
  key: string;
  value: unknown;
  source: 'USER_DIRECTIVE' | 'AGENT_OBSERVATION' | 'SYSTEM_TELEMETRY';
  confidence: number;
  timestamp: number;
  ttlSeconds?: number;
}

export class AgenticProtocols {
  /**
   * Resolves topological execution order for a Tool Directed Acyclic Graph (DAG)
   */
  public static resolveDAGOrder(nodes: ToolDAGNode[]): string[][] {
    const executed = new Set<string>();
    const layers: string[][] = [];
    let remaining = [...nodes];

    while (remaining.length > 0) {
      const currentLayer = remaining.filter(node =>
        node.dependencies.every(dep => executed.has(dep))
      );

      if (currentLayer.length === 0) {
        throw new Error('[CIRCULAR DAG ERROR] Circular or unresolvable dependencies detected in tool execution graph.');
      }

      const layerIds = currentLayer.map(n => n.nodeId);
      layers.push(layerIds);
      layerIds.forEach(id => executed.add(id));
      remaining = remaining.filter(n => !executed.has(n.nodeId));
    }

    return layers;
  }
}
