import React from 'react'
import * as THREE from 'three'
import Line from './Line'

export default function Camera() {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  )
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  return camera
}
