const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const knot = new THREE.Mesh(geometry, material)
scene.add(knot)

camera.position.z = 100

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  knot.rotation.x += 0.01
  knot.rotation.y += 0.01
}
animate()
