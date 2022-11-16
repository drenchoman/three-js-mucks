import { useState } from 'react'
import reactLogo from './assets/react.svg'
import * as THREE from 'three'

import './App.css'

function App() {
  const scene = new THREE.Scene()
  const geometry = new THREE.BufferGeometry()

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  )
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  const material = new THREE.LineDashedMaterial({
    color: 'skyblue',
    linewidth: 20,
    scale: 10,
    dashSize: 3,
    gapSize: 1,
  })
  const MAX_POINTS = 500
  const positions = new Float32Array(MAX_POINTS * 3)
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const drawCount = 2
  geometry.setDrawRange(0, drawCount)

  const line = new THREE.Line(geometry, material)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  scene.add(line)

  function animate() {
    requestAnimationFrame(animate)

    const p = line.geometry.attributes.position.array

    let x, y, z, index
    x = y = z = index = 0

    for (let i = 0, l = MAX_POINTS; i < l; i++) {
      positions[index++] = x
      positions[index++] = y
      positions[index++] = z

      x += (Math.random() - 0.5) * 30
      y += (Math.random() - 0.5) * 30
      z += (Math.random() - 0.5) * 30
    }
    line.geometry.setDrawRange(0, 50)
    line.geometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera)
  }
  animate()

  return <></>
}

export default App
