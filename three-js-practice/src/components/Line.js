import React from 'react'
import * as THREE from 'three'

export default function Line() {
  const material = new THREE.LineBasicMaterial({ color: 'skyblue' })
  const points = []
  points.push(new THREE.Vector3(-10, 0, 0))
  points.push(new THREE.Vector3(0, 10, 0))
  points.push(new THREE.Vector3(10, 0, 0))
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  const line = new THREE.Line(geometry, material)
  return line
}
