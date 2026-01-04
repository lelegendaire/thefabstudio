"use client"
import { useEffect, useRef,useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap';
import {X} from "lucide-react"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CopyBloc from "./components/Copy_bloc";
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
export default function Projects() {
    const canvasRef = useRef(null)
    const projetDivRef = useRef(null) // 🟢 nouvelle ref pour ton div Projet
    const sceneRef = useRef(null)
    const cameraRef = useRef(null)
    const rendererRef = useRef(null)
    const cubesGroupRef = useRef(null)
    const isDragging = useRef(false)
    const previousMousePosition = useRef({ x: 0, y: 0 })
    const hoveredCube = useRef(null)
    const raycaster = useRef(new THREE.Raycaster())
    const mouse = useRef(new THREE.Vector2())
    const selectedCube = useRef(null)
   // État pour stocker les données du projet sélectionné
    const [selectedProject, setSelectedProject] = useState(null)
  
   
    // Données des projets
    const projectsData = [
        { 
            id: 1, 
            title: "Projet de développement web", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 2, 
            title: "Application mobile", 
              title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 3, 
            title: "Site e-commerce", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 4, 
            title: "Dashboard analytics", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 5, 
            title: "Plateforme SaaS", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 6, 
            title: "Jeu vidéo 3D", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 7, 
            title: "Portfolio interactif", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 8, 
            title: "CRM sur mesure", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 9, 
            title: "Application IA", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 10, 
            title: "Site vitrine", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 11, 
            title: "Marketplace", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        },
        { 
            id: 12, 
            title: "App de streaming", 
            title_description: ["Application web moderne avec React et Three.js","Esse consequat","Nulla incididunt"],
            description: ["Occaecat amet in ut dolore minim consectetur.","Laborum exercitation excepteur elit Lorem quis laboris dolor nisi incididunt.","Ipsum proident consectetur dolor proident pariatur."],
            link: "#"
        }
    ]
    const projectImages = [
        '/medias/StudioLens.png',
        '/medias/StudioSongFab.png',
        '/medias/F1.png',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    ]

  

    // Détection mobile
   
   

    // Initialisation Three.js - se re-déclenche quand isMobile change
    useEffect(() => {
        if (!canvasRef.current) return
        const isMobile = window.innerWidth < 768
        console.log(isMobile ? 2 : 1)
        // Scene
        const scene = new THREE.Scene()
        sceneRef.current = scene
        // Camera
        const camera = new THREE.PerspectiveCamera(
            isMobile ? 85 : 75,
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.z = isMobile ? 10 : 8
        camera.position.y = 0
        cameraRef.current = camera

        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvasRef.current,
            antialias: true, 
            alpha: true,
            
        })
       
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight*(isMobile ? 2 : 1))
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0); 
        rendererRef.current = renderer

        // Group pour les cubes
        const cubesGroup = new THREE.Group()
        cubesGroupRef.current = cubesGroup
        scene.add(cubesGroup)
        // TextureLoader
        const textureLoader = new THREE.TextureLoader()
        // Créer un cercle de cubes
        const numCubes = 12
        const radius = isMobile ? 5 : 4 // Cercle plus grand sur mobile
         const geometry = new THREE.BoxGeometry(
            isMobile ? 0.4 : 0.5,
            isMobile ? 2.5 : 3,
            isMobile ? 1.5 : 2
        )
        
        const colors = [
            0x000000, 0xf1f1f1, 0x751213, 0x3b82f6,
            0x6366f1, 0x8b5cf6, 0xec4899, 0xf43f5e,
            0xef4444, 0xf97316, 0xf59e0b, 0x10b981
        ]

        for (let i = 0; i < numCubes; i++) {
            const angle = (i / numCubes) * Math.PI * 2
            
             // Charger la texture pour ce projet
                         const texture = textureLoader.load(projectImages[i], (tex) => {
                // Une fois l'image chargée, calculer le ratio pour le mode "cover"
                 const faceWidth = isMobile ? 1.5 : 2
                const faceHeight = isMobile ? 2.5 : 3
                const faceAspect = faceWidth / faceHeight // 2/3 = 0.666
                
                const imgAspect = tex.image.width / tex.image.height
                
                // Mode "cover" : on veut remplir toute la face
                if (imgAspect > faceAspect) {
                    // Image plus large : elle doit être ajustée en hauteur
                    const scale = imgAspect / faceAspect
                    tex.repeat.set(1/scale, 1)
                    tex.offset.set((1 - 1/scale) / 2, 0)
                } else {
                    // Image plus haute : elle doit être ajustée en largeur
                    const scale = faceAspect / imgAspect
                    tex.repeat.set(1, 1/scale)
                    tex.offset.set(0, (1 - 1/scale) / 2)
                }
                tex.needsUpdate = true
            })
            texture.colorSpace = THREE.SRGBColorSpace
            
            // Créer les matériaux : texture sur les faces longues (gauche et droite), couleur sur les autres
            const materials = [
                new THREE.MeshStandardMaterial({ map: texture }), // right (face longue avec image)
                new THREE.MeshStandardMaterial({ map: texture }), // left (face longue avec image)
                new THREE.MeshStandardMaterial({ color: colors[i] }), // top
                new THREE.MeshStandardMaterial({ color: colors[i] }), // bottom
                new THREE.MeshStandardMaterial({ color: colors[i] }), // front
                new THREE.MeshStandardMaterial({ color: colors[i] }), // back
            ]
            
            const cube = new THREE.Mesh(geometry, materials)
            
            // Position sur le cercle
            const circleX = Math.cos(angle) * radius
            const circleZ = Math.sin(angle) * radius
            
            cube.position.x = circleX
            cube.position.z = circleZ
            
            cube.lookAt(0, 0, 0)
            
            // Stocker les données d'origine pour le hover
            cube.userData = {
                originalScale: 1,
                targetScale: 1,
                originalColors: materials.map((m, idx) => idx === 4 ? null : m.color.getHex()),
                isHovered: false,
                originalPosition: { x: circleX, y: 0, z: circleZ },
                targetPosition: { x: circleX, y: 0, z: circleZ },
                originalRotation: { x: cube.rotation.x, y: cube.rotation.y, z: cube.rotation.z },
                targetRotation: { x: cube.rotation.x, y: cube.rotation.y, z: cube.rotation.z },
                isSelected: false,
                projectIndex: i,
            }
            
            cubesGroup.add(cube)
        }

        scene.fog = new THREE.Fog(0xf0f0f0, 3, isMobile ? 15 : 13)


        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
        directionalLight2.position.set(-5, -5, -5)
        scene.add(directionalLight2)

        // Animation
        const animate = () => {
            requestAnimationFrame(animate)
       
            
            // Animer le scale et la position des cubes
            cubesGroup.children.forEach(cube => {
                // Scale animation
                const currentScale = cube.scale.x
                const targetScale = cube.userData.targetScale
                const newScale = currentScale + (targetScale - currentScale) * 0.1
                cube.scale.set(newScale, newScale, newScale)
                
                // Position animation
                if (cube.userData.useWorldCoordinates) {
                    // Convertir la position cible en coordonnées locales du groupe
                    const targetWorldPos = new THREE.Vector3(
                        cube.userData.targetPosition.x,
                        cube.userData.targetPosition.y,
                        cube.userData.targetPosition.z
                    )
                    const targetLocalPos = cubesGroup.worldToLocal(targetWorldPos.clone())
                    
                    cube.position.x += (targetLocalPos.x - cube.position.x) * 0.1
                    cube.position.y += (targetLocalPos.y - cube.position.y) * 0.1
                    cube.position.z += (targetLocalPos.z - cube.position.z) * 0.1
                } else {
                    cube.position.x += (cube.userData.targetPosition.x - cube.position.x) * 0.1
                    cube.position.y += (cube.userData.targetPosition.y - cube.position.y) * 0.1
                    cube.position.z += (cube.userData.targetPosition.z - cube.position.z) * 0.1
                }
                
                // Rotation animation
                if (cube.userData.useWorldCoordinates) {
                    // Convertir la rotation cible en rotation locale
                    const groupRotationInverse = -cubesGroup.rotation.y
                    const targetLocalRotY = cube.userData.targetRotation.y + groupRotationInverse
                    
                    cube.rotation.x += (cube.userData.targetRotation.x - cube.rotation.x) * 0.1
                    cube.rotation.y += (targetLocalRotY - cube.rotation.y) * 0.1
                    cube.rotation.z += (cube.userData.targetRotation.z - cube.rotation.z) * 0.1
                } else {
                    cube.rotation.x += (cube.userData.targetRotation.x - cube.rotation.x) * 0.1
                    cube.rotation.y += (cube.userData.targetRotation.y - cube.rotation.y) * 0.1
                    cube.rotation.z += (cube.userData.targetRotation.z - cube.rotation.z) * 0.1
                }
            })
            
            // Animer l'opacité du texte
           
            
            renderer.render(scene, camera)
        }
        animate()
        let previousIndex = -1; //
  // ✅ ScrollTrigger créé une seule fois ici
  ScrollTrigger.create({
    trigger: ".static_div",
    start: "top top",
    end: `+=${window.innerHeight * (isMobile ? 5 : 7)}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      if (cubesGroupRef.current && !selectedCube.current && !isDragging.current) {
        const numCubes = cubesGroupRef.current.children.length;
      const rotation = self.progress * Math.PI * (isMobile ? 3 : 4);
      cubesGroupRef.current.rotation.y = rotation;

      const totalRotation = Math.PI * 2;
      const step = totalRotation / numCubes;

      let currentIndex = Math.floor((rotation % totalRotation) / step);
      if (currentIndex < 0) currentIndex = 0;

      let counterValue = (currentIndex % numCubes) + 1;

      if (counterValue !== previousIndex) {
        const counterContainer = document.getElementById("project-counter");
        if (counterContainer) {
          const newNumber = String(counterValue).padStart(2, "0");

          // Crée un nouvel élément
          const newSpan = document.createElement("span");
          newSpan.textContent = newNumber;
          newSpan.style.transform = "translateY(100%)";
          newSpan.style.transition = "transform 0.4s ease-out";

          // Ajoute le nouveau span
          counterContainer.appendChild(newSpan);

          // Anime le défilement vertical
          requestAnimationFrame(() => {
            const spans = counterContainer.querySelectorAll("span");
            spans.forEach((s, i) => {
              s.style.transform = `translateY(${(i - (spans.length - 1)) * 100}%)`;
            });
          });

          // Supprime les anciens nombres après l’animation
          setTimeout(() => {
            const spans = counterContainer.querySelectorAll("span");
            if (spans.length > 1) spans[0].remove();
          }, 500);
        }

        previousIndex = counterValue;
      }
    }
    if (self.progress === 1 ){
        handleDeselectCube()
    }
    },
  })
        // Mouse events pour drag
        const handleMouseDown = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX
            const clientY = e.touches ? e.touches[0].clientY : e.clientY
            const rect = canvasRef.current.getBoundingClientRect()
            mouse.current.x = ((clientX - rect.left) / rect.width) * 2 - 1
            mouse.current.y = -((clientY - rect.top) / rect.height) * 2 + 1
            
            // Vérifier si on clique sur un cube
            raycaster.current.setFromCamera(mouse.current, camera)
            const intersects = raycaster.current.intersectObjects(cubesGroup.children)
            
            if (intersects.length > 0) {
                const clickedCube = intersects[0].object
                
                // Si on clique sur le cube déjà sélectionné, le désélectionner
                if (selectedCube.current === clickedCube) {
                    
                    // Retour à la position d'origine
                    clickedCube.userData.targetPosition = { ...clickedCube.userData.originalPosition }
                    clickedCube.userData.targetRotation = { ...clickedCube.userData.originalRotation }
                    clickedCube.userData.targetScale = 1
                    clickedCube.userData.isSelected = false
                    clickedCube.userData.useWorldCoordinates = false
                    selectedCube.current = null
                    
                    gsap.to(projetDivRef.current, {
            y: "100%",
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => setSelectedProject(null)  // <-- fermeture finale
            
          });
          return;
                } else {
                    // Désélectionner l'ancien cube si existant
                    if (selectedCube.current) {
                        selectedCube.current.userData.targetPosition = { ...selectedCube.current.userData.originalPosition }
                        selectedCube.current.userData.targetRotation = { ...selectedCube.current.userData.originalRotation }
                        selectedCube.current.userData.targetScale = 1
                        selectedCube.current.userData.isSelected = false
                        selectedCube.current.userData.useWorldCoordinates = false
                    }
                    
                    // Sélectionner le nouveau cube
                    selectedCube.current = clickedCube
                    clickedCube.userData.isSelected = true
                   
                    const index = clickedCube.userData.projectIndex;
                    setSelectedProject({image: projectImages[index],data: projectsData[index]})
                    gsap.fromTo(projetDivRef.current,
                    { y: "100%", opacity: 0 },
                    { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
                    )

                    // Calculer la position du cube dans l'espace monde (en tenant compte de la rotation du groupe)
                    const worldPosition = new THREE.Vector3()
                    clickedCube.getWorldPosition(worldPosition)
                    
                    // Calculer la rotation du cube dans l'espace monde
                    const worldQuaternion = new THREE.Quaternion()
                    clickedCube.getWorldQuaternion(worldQuaternion)
                    const worldEuler = new THREE.Euler().setFromQuaternion(worldQuaternion)
                    
                    // Position à gauche face à nous, en coordonnées monde
                    clickedCube.userData.targetPosition = { x: 0, y: 0, z: 5 }
                    clickedCube.userData.targetRotation = { x: 0, y: Math.PI / 2, z: 0 }
                    clickedCube.userData.targetScale = isMobile ? 1.3 : 1.5
                    clickedCube.userData.useWorldCoordinates = true
                   
                    
                }
            } else {
                isDragging.current = true
                previousMousePosition.current = { x: clientX, y: clientY }
                canvasRef.current.style.cursor = 'grabbing'
            }
        }

        const handleMouseMove = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX
            const clientY = e.touches ? e.touches[0].clientY : e.clientY
            // Calculer la position de la souris en coordonnées normalisées
            const rect = canvasRef.current.getBoundingClientRect()
            mouse.current.x = ((clientX - rect.left) / rect.width) * 2 - 1
            mouse.current.y = -((clientY - rect.top) / rect.height) * 2 + 1

            if (isDragging.current && cubesGroupRef.current) {
                const deltaX = clientX - previousMousePosition.current.x
                const deltaY = clientY - previousMousePosition.current.y

                cubesGroupRef.current.rotation.y += deltaX * 0.01
                cubesGroupRef.current.rotation.x += deltaY * 0.01

                previousMousePosition.current = { x: clientX, y: clientY }
            } else if (!selectedCube.current) {
                // Raycasting pour détecter le hover
                raycaster.current.setFromCamera(mouse.current, camera)
                const intersects = raycaster.current.intersectObjects(cubesGroup.children)

                // Réinitialiser l'ancien cube hover
                if (hoveredCube.current && (intersects.length === 0 || intersects[0].object !== hoveredCube.current)) {
                    if (!hoveredCube.current.userData.isSelected) {
                        hoveredCube.current.userData.targetScale = 1
                    }
                    hoveredCube.current.userData.isHovered = false
                    hoveredCube.current.material.forEach((mat, index) => {
                        if (index !== 0 && index !== 1 && hoveredCube.current.userData.originalColors[index]) {
                            mat.color.setHex(hoveredCube.current.userData.originalColors[index])
                        }                        mat.emissive.setHex(0x000000)
                    })
                    hoveredCube.current = null
                    canvasRef.current.style.cursor = 'grab'
                }

                // Appliquer l'effet hover au nouveau cube
                if (intersects.length > 0) {
                    const cube = intersects[0].object
                    if (cube !== hoveredCube.current && !cube.userData.isSelected) {
                        hoveredCube.current = cube
                        cube.userData.targetScale = 1.3
                        cube.userData.isHovered = true
                        
                        // Éclaircir la couleur et ajouter un effet émissif
                        cube.material.forEach((mat, index) => {
                            if (index !== 0 && index !== 1 && cube.userData.originalColors[index]) {
                                const originalColor = new THREE.Color(cube.userData.originalColors[index])
                                const lighterColor = originalColor.clone().lerp(new THREE.Color(0xffffff), 0.3)
                                mat.color.copy(lighterColor)
                                mat.emissive.setHex(cube.userData.originalColors[index])
                                mat.emissiveIntensity = 0
                            }
                        })
                        
                        canvasRef.current.style.cursor = 'pointer'
                    }
                }
            }
        }

        const handleMouseUp = () => {
            isDragging.current = false
            if (!isMobile) canvasRef.current.style.cursor = 'grab'
        }

        canvasRef.current.addEventListener('mousedown', handleMouseDown)
        canvasRef.current.addEventListener('touchstart', handleMouseDown, { passive: true })
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('touchmove', handleMouseMove, { passive: true })
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('touchend', handleMouseUp)

        // Responsive
        const handleResize = () => {
            if (!canvasRef.current) return
            const width = canvasRef.current.clientWidth
            const height = canvasRef.current.clientHeight
            
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        }
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            canvasRef.current?.removeEventListener('mousedown', handleMouseDown)
            canvasRef.current?.removeEventListener('touchstart', handleMouseDown)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('touchmove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('touchend', handleMouseUp)
            geometry.dispose()
          
            cubesGroup.children.forEach(cube => {
                cube.geometry.dispose()
                cube.material.forEach(m => m.dispose())
            })
            renderer.dispose()
        }
    }, [])
     
 // Fonction pour désélectionner le cube
    const handleDeselectCube = () => {
        if (selectedCube.current) {
            selectedCube.current.userData.targetPosition = { ...selectedCube.current.userData.originalPosition }
            selectedCube.current.userData.targetRotation = { ...selectedCube.current.userData.originalRotation }
            selectedCube.current.userData.targetScale = 1
            selectedCube.current.userData.isSelected = false
            selectedCube.current.userData.useWorldCoordinates = false
            selectedCube.current = null
            
            gsap.to(projetDivRef.current, {
                y: "100%",
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    projetDivRef.current.style.display = "none"
                    setSelectedProject(null)
                }
            })
        }
    }
    return (
        <section id="project_section" className="h-full bg-white p-2 sm:p-4 flex flex-col ">
            <h1 className="font-bold text-4xl sm:text-6xl lg:text-8xl text-black mb-4 sm:mb-8 font-[Satoshi] mr-auto">Our projects</h1>
            <div className="static_div flex-1 relative rounded-lg shadow-2xl" style={{backgroundColor: "#f0f0f0", backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.05) 2px, transparent 0)", backgroundSize: "30px 30px", backgroundPosition: "-5px -5px",}}>
               <div 
  id="project-counter-container" 
  className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4 z-20"
>
  <span className="w-4 sm:w-8 h-[1px] bg-black"></span>

  <div className="overflow-hidden h-[30px] sm:h-[40px] flex items-center justify-center">
    <div id="project-counter" className="text-black text-2xl sm:text-3xl  font-[Satoshi] flex flex-col">
      <span>01</span>
    </div>
  </div>

  <span className="w-4 sm:w-8 h-[1px] bg-black"></span>
</div>

                <canvas 
                    ref={canvasRef} 
                    className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
                    
                />
            </div>
           {selectedProject && (
  <div 
    ref={projetDivRef}
    className="Projet overflow-y-scroll bg-white sm:w-[98%] w-screen rounded-4xl top-4 sm:left-4 left-0 shadow-2xl fixed sm:h-[96%] h-screen text-white flex items-start pt-4 justify-center font-[Satoshi]"
    style={{ transform: 'translateY(100%)', opacity: 0 }}
  >
      <button 
        onClick={handleDeselectCube}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors cursor-pointer z-50 p-2 hover:bg-[#b98d6b85] rounded-2xl"
      >
         <X size={ 32} />
      </button>

      <div className='project_div h-auto relative flex justify-start items-center flex-col sm:gap-[3rem] gap-5'>

        {/* HERO IMAGE */}
        <div className='hero_project_div relative sm:h-[90vh] h-full sm:w-[95vw] w-84 rounded-2xl overflow-hidden'
             style={{ boxShadow: "rgba(185, 141, 107, 0.5) 1px 10px 20px, rgba(185, 141, 107, 0.2) 0px 0px 0px 10px" }}>
            <img 
              src={selectedProject.image}
              className="w-full h-full object-cover"
            />
        </div>

        {/* DESCRIPTION */}
        <div className='description relative sm:h-[90vh] h-full w-87 sm:w-[95vw] bg-amber-50 rounded-2xl overflow-hidden text-black sm:p-10 p-3'>

          <h1 className="sm:text-5xl text-2xl font-bold text-center mb-10">{selectedProject.data.title}</h1>

          <div className="flex flex-wrap sm:gap-6 gap-3 justify-center">

            {selectedProject.data.title_description.map((item, i) => (
              <div key={i} className="sm:w-[300px] w-80 flex flex-col sm:gap-2 gap-0.5">

                
                  <h2 className="sm:text-xl text-base font-semibold">{item}</h2>
                

                
                  <p className="sm:text-base text-xs text-black opacity-80 mt-2">
                    {selectedProject.data.description[i]}
                  </p>
                

              </div>
            ))}

          </div>

          <div className="flex justify-center">
            <button className="mt-10 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
              Voir le projet
            </button>
          </div>

        </div>

      </div>
  </div>
)}

            <style jsx>{`
    .Projet::-webkit-scrollbar {
      width: 8px !important;
    }
    .Projet::-webkit-scrollbar-track {
      background: #f3f4f6 !important;
    }
    .Projet::-webkit-scrollbar-thumb {
      background: #9ca3af;
      border-radius: 4px;
    }
    .block-line-wrapper{
      margin: 0 auto;
      position: relative;
      width: max-content;
      display: block;
    }
    .block-line{
      position: relative;
      display: block
    }
    .block-revealer{
      position: absolute;
      top: 0;
      left: 0;
      width: 101%;
      height: 101%;
      pointer-events: none;
      will-change: transform;
      z-index: 1;
      }
  `}</style>
        </section>
    )
}