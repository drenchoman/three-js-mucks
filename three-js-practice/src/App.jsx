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
    camera.position.set(0, 0, 100)

    // geometry
    const geometry = new THREE.BoxGeometry(5, 5, 5)
    const material = new THREE.MeshStandardMaterial({ color: 'skyblue' })
    const cone = new THREE.Mesh(geometry, material)

    const light = new THREE.AmbientLight(0x404040) // soft white light
    scene.add(light)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(directionalLight)

    scene.add(cone)

    // animate
    function animate() {
      requestAnimationFrame(animate)
      cone.rotation.x += 0.01
      cone.rotation.y += 0.01
      renderer.render(scene, camera)
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
