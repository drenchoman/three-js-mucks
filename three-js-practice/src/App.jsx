import { useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import * as THREE from 'three'

import './App.css'

function App() {
  const mountRef = useRef(null)

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)
    // scene
    const scene = new THREE.Scene()

    // camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    camera.position.set(0, 0, 1000)

    // geometry
    const geometry = new THREE.BufferGeometry()
    const MAX_POINTS = 1000
    let drawCount = 2

    // attributes
    const positions = new Float32Array(MAX_POINTS * 3) // 3 vertices per point
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // drawcalls
    drawCount = 0 // draw the first 2 points, only
    geometry.setDrawRange(0, drawCount)

    // material
    const material = new THREE.LineBasicMaterial({ color: 'skyblue' })

    // line
    const line = new THREE.Line(geometry, material)
    scene.add(line)

    // update positions
    updatePositions()

    // update positions
    function updatePositions() {
      const positions = line.geometry.attributes.position.array

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
    }

    // animate
    function animate() {
      requestAnimationFrame(animate)

      drawCount = (drawCount + 1) % MAX_POINTS

      line.geometry.setDrawRange(0, drawCount)
      renderer.render(scene, camera)

      if (drawCount === 0) {
        // periodically, generate new data

        updatePositions()

        line.geometry.attributes.position.needsUpdate = true // required after the first render

        line.material.color.setHSL(Math.random(), 1, 0.5)
      }
    }

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onWindowResize, false)
    animate()

    return () => mountRef.current.removeChild(renderer.domElement)
  }, [])

  return <div ref={mountRef}></div>
}

export default App
