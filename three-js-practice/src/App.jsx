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
    const makeBox = (color) => {
      const geometry = new THREE.PlaneGeometry(5, 10)
      const material = new THREE.MeshStandardMaterial({
        color: `${color}`,
      })
      const cone = new THREE.Mesh(geometry, material)
    
      
      return cone
    }

    const setShape = (amount, direction, color, position) => {
      return {amount, direction, color, position}
    }
    const s1 = setShape(0.01, 'x', 'blue', 0)
    const s2 = setShape(0.01, 'x', 'yellow', 13)
    const s3 = setShape(0.01, 'y', 'green', -13)
    const s4 = setShape(0.01, 'y', 'pink', 13)
    const s5 = setShape(0.01, 'z', 'aqua', -13)
    )

    const shapes = [s1,s2,s3,s4,s5]

    const allShapes = shapes.map((shape) => {
    return makeBox(shape.color)
    
  })
console.log(allShapes);
    // const cone = makeBox('blue', 0)
    // const box = makeBox('yellow', 15)
    // const c = makeBox('green', -15)
    // const b = makeBox('pink', 15)
    // const d = makeBox('firebrick', -15)
    

    const light = new THREE.AmbientLight(0x404040, 20) // soft white light
    scene.add(light)



    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    scene.add(directionalLight)

    // scene.add(cone)
    // scene.add(box)
    // scene.add(c)
    // scene.add(b)
    // scene.add(d)

    function rotate(name) {
      name.rotation.x += 0.01
      name.rotation.y += 0.01
      name.rotation.z -= 0.02
    }

    function move(name, amount, direction){
      name.position.setX(amount)
      switch (direction) {
        case 'x':
          name.position.setX(amount)
          
          break;
        case 'y':
        name.position.setY(amount)
        break;

        case 'z':
          name.position.setZ(amount)
          break;
      
        default:
          break;
      }
    }

    function moveShit(name, amount, direction, color, position){
      rotate(name)
      move(name, amount, direction)
    }

   

    // animate
    function animate() {
      requestAnimationFrame(animate)
      shapes.forEach((shape) => moveShit(shape,  0.01, 'left'))
     
     

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
