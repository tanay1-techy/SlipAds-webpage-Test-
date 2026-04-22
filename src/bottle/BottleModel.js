import * as THREE from 'three';

/**
 * Creates a realistic water bottle model using LatheGeometry.
 * Returns a THREE.Group containing: bottle body, cap, and label sleeve.
 */
export function createBottleModel(labelTexture) {
  const group = new THREE.Group();

  // ---- Bottle body profile (right side of cross-section) ----
  const points = [];
  // Base (flat bottom)
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.42, 0));
  points.push(new THREE.Vector2(0.45, 0.02));
  // Lower body curve
  points.push(new THREE.Vector2(0.48, 0.08));
  points.push(new THREE.Vector2(0.50, 0.2));
  // Main body (straight)
  points.push(new THREE.Vector2(0.50, 0.8));
  points.push(new THREE.Vector2(0.50, 1.4));
  // Shoulder curve
  points.push(new THREE.Vector2(0.48, 1.55));
  points.push(new THREE.Vector2(0.43, 1.65));
  points.push(new THREE.Vector2(0.35, 1.75));
  // Neck taper
  points.push(new THREE.Vector2(0.22, 1.85));
  points.push(new THREE.Vector2(0.18, 1.90));
  // Neck straight
  points.push(new THREE.Vector2(0.18, 2.05));
  // Lip
  points.push(new THREE.Vector2(0.21, 2.06));
  points.push(new THREE.Vector2(0.21, 2.10));
  points.push(new THREE.Vector2(0.18, 2.10));
  points.push(new THREE.Vector2(0, 2.10));

  const bottleGeo = new THREE.LatheGeometry(points, 64);

  // Bottle material — translucent plastic
  const bottleMat = new THREE.MeshPhysicalMaterial({
    color: 0xd4eeff,
    transparent: true,
    opacity: 0.25,
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.92,
    thickness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide,
  });

  const bottle = new THREE.Mesh(bottleGeo, bottleMat);
  group.add(bottle);

  // ---- Water inside ----
  const waterPoints = [];
  waterPoints.push(new THREE.Vector2(0, 0.05));
  waterPoints.push(new THREE.Vector2(0.44, 0.05));
  waterPoints.push(new THREE.Vector2(0.46, 0.1));
  waterPoints.push(new THREE.Vector2(0.47, 0.2));
  waterPoints.push(new THREE.Vector2(0.47, 1.2));
  waterPoints.push(new THREE.Vector2(0, 1.2));

  const waterGeo = new THREE.LatheGeometry(waterPoints, 64);
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.95,
    thickness: 0.3,
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  group.add(water);

  // ---- Label sleeve (the slip) ----
  const labelRadius = 0.515;
  const labelHeight = 0.9;
  const labelBottom = 0.3;
  const labelGeo = new THREE.CylinderGeometry(labelRadius, labelRadius, labelHeight, 64, 1, true);

  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.35,
    metalness: 0.05,
    side: THREE.FrontSide,
  });

  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.y = labelBottom + labelHeight / 2;
  label.name = 'label';
  group.add(label);

  // ---- Cap ----
  const capPoints = [];
  capPoints.push(new THREE.Vector2(0, 2.10));
  capPoints.push(new THREE.Vector2(0.22, 2.10));
  capPoints.push(new THREE.Vector2(0.23, 2.12));
  capPoints.push(new THREE.Vector2(0.23, 2.30));
  capPoints.push(new THREE.Vector2(0.22, 2.32));
  capPoints.push(new THREE.Vector2(0.10, 2.34));
  capPoints.push(new THREE.Vector2(0, 2.34));

  const capGeo = new THREE.LatheGeometry(capPoints, 64);
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a3a,
    roughness: 0.3,
    metalness: 0.7,
  });
  const cap = new THREE.Mesh(capGeo, capMat);
  group.add(cap);

  // Center the model
  group.position.y = -1.1;

  return group;
}
