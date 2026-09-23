/**
 * iMpact AI — Kinetic Operating System Driver Specification
 * Native hardware actuation abstractions for sub-25ms OS automation.
 * Author: Sheikh Saqib (iMpact AI)
 */

export interface ScreenCoordinates {
  x: number;
  y: number;
}

export interface MouseTrajectory {
  origin: ScreenCoordinates;
  destination: ScreenCoordinates;
  durationMs: number;
  points: ScreenCoordinates[];
}

export class KineticDriver {
  /**
   * Generates a human-like sinusoidal or bezier trajectory between two screen points.
   * Prevents bot detection and creates observable visual feedback in live demonstrations.
   */
  public static calculateTrajectory(
    start: ScreenCoordinates,
    end: ScreenCoordinates,
    steps: number = 8
  ): MouseTrajectory {
    const points: ScreenCoordinates[] = [];
    const dist = Math.hypot(end.x - start.x, end.y - start.y);
    const actualSteps = Math.max(3, Math.min(steps, Math.round(dist / 40)));

    for (let i = 1; i <= actualSteps; i++) {
      const t = i / actualSteps;
      // Sinusoidal ease-out curve
      const ease = Math.sin((t * Math.PI) / 2);
      const curX = Math.round(start.x + (end.x - start.x) * ease);
      const curY = Math.round(start.y + (end.y - start.y) * ease);
      points.push({ x: curX, y: curY });
    }

    return {
      origin: start,
      destination: end,
      durationMs: actualSteps * 10,
      points
    };
  }

  /**
   * Validates target coordinates against display boundaries
   */
  public static validateCoordinates(
    coords: ScreenCoordinates,
    displayBounds: { width: number; height: number } = { width: 1920, height: 1080 }
  ): boolean {
    return (
      coords.x >= 0 &&
      coords.x <= displayBounds.width &&
      coords.y >= 0 &&
      coords.y <= displayBounds.height
    );
  }
}
