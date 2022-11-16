import React from 'react'
import * as THREE from 'three'
import Line from './Line'
export default function Scene() {
  const scene = new THREE.Scene()
  scene.add(Line)

  return scene
}
