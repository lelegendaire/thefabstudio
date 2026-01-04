import * as THREE from 'three'

export const preloadTexture = (url) =>
  new Promise((resolve) => {
    new THREE.TextureLoader().load(url, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.userData = { size: new THREE.Vector2(texture.image.width, texture.image.height) };
      resolve(texture);
    })
  })

export const preloadFont = (url) =>
  fetch(url).then(() => true)
