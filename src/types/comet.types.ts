import * as THREE from 'three';

export type CometType = 'large' | 'medium';

export interface IComet {
  line: THREE.Line;
  startX: number;
  startY: number;
  speed: number;
  life: number;
  maxLife: number;
  originalPositions: Float32Array;
  color: THREE.Color;
  type: CometType;
}
