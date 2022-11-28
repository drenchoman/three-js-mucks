import { useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import './App.css'
import { render } from 'react-dom'

function App() {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
 
    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30)
    mountRef.current.appendChild(renderer.domElement)
    renderer.render(scene, camera)

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
    const torus = new THREE.Mesh(geometry, material)
    scene.add(torus)

    const pointLight = new THREE.PointLight(0x00FF00)
    pointLight.position.set(5,5,20)

    const ambientLight = new THREE.AmbientLight(0xffffff)

    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50)

    scene.add(pointLight, ambientLight)
    scene.add(lightHelper)
    scene.add(gridHelper)

    const controls = new OrbitControls(camera, renderer.domElement)


    
    // scene


    // camera



    // animate
    function animate() {
      requestAnimationFrame(animate)
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
      controls.update()
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
