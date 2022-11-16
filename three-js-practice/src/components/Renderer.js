import React from 'react'
import * as THREE from 'three'
import Camera from './Camera'
import Scene from './Scene'

export default function Renderer() {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  renderer.render({ Scene, Camera })
}
