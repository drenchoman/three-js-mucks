import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import spaceImg from '../../public/space.jpeg'
import oscarImg from '../../public/pic.jpeg'
import moonImg from '../../public/moon.jpg'
import textureImg from '../../public/purp.jpeg'

export default function Three() {
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

    scene.add(ambientLight)
    // scene.add(lightHelper)
    scene.add(gridHelper)

    const controls = new OrbitControls(camera, renderer.domElement)


    function addStar() {
      const geometry = new THREE.SphereGeometry(0.05, 24, 24)
      const material = new THREE.MeshStandardMaterial({color: 0xFFE8E8})
      const star = new THREE.Mesh(geometry, material)
      const [x, y, z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z)
      scene.add(star)
    }
    Array(200).fill().forEach(addStar)

    const spaceTexture = new THREE.TextureLoader().load(spaceImg)
    scene.background = spaceTexture
    
    const oscarTexture = new THREE.TextureLoader().load(oscarImg)

    const oscar = new THREE.Mesh(
      new THREE.BoxGeometry(3,3,3),
      new THREE.MeshBasicMaterial({map:oscarTexture})
    )

    scene.add(oscar)

    const moonTexture = new THREE.TextureLoader().load(moonImg)
    const bumps = new THREE.TextureLoader().load(textureImg)

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: bumps
      })
    )
    moon.position.setX(10)
    moon.position.setY(17)
    scene.add(moon)
    



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

  return (
    <div ref={mountRef}>

    </div>
  )
}
