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
    const makeBox = () => {
      const geometry = new THREE.BoxGeometry(2, 3, 3)
      const material = new THREE.MeshStandardMaterial({
        color: 'blue',
        metalness: 0.5,
      })
      const cone = new THREE.Mesh(geometry, material)
      return cone
    }
    const cone = makeBox()
    const box = makeBox()
    const c = makeBox()
    const b = makeBox()
    const d = makeBox()
    box.position.x = 10
    c.position.x = -10
    b.position.y = 10
    d.position.y = -10

    const light = new THREE.AmbientLight(0x404040) // soft white light
    scene.add(light)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
    scene.add(directionalLight)

    scene.add(cone)
    scene.add(box)
    scene.add(c)
    scene.add(b)
    scene.add(d)

    function rotate(name) {
      name.rotation.x += 0.01
      name.rotation.y += 0.01
      name.rotation.z -= 0.02
    }

    // animate
    function animate() {
      requestAnimationFrame(animate)

      rotate(cone)
      rotate(box)
      rotate(c)
      rotate(b)
      rotate(d)
      b.position.y += 0.01
      d.position.y -= 0.01
      box.position.x += 0.01
      c.position.x -= 0.01
      cone.position.z += 0.02

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
