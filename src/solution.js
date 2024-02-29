import * as THREE from 'three'
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

// GUI - for debugging
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

var loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
    console.log('Loaded')
}

loadingManager.onError = (err) => {
    console.log(err);
}

var textureLoader = new THREE.TextureLoader(loadingManager)

const texture = textureLoader.load('R0010121.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshBasicMaterial({
    map: texture
});

const geometry = new THREE.SphereGeometry(1000, 100, 100)
// invert the geometry on the x-axis so that all of the faces point inward
geometry.scale(-1, 1, 1)

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
scene.add(camera)
camera.position.z = 5

const controls = new OrbitControls(camera, canvas)
controls.enableZoom = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

//Handle Events
window.addEventListener('resize', () => {

    //sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock = new THREE.Clock()

function animate() {
    renderer.render(scene, camera)
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()