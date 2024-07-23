import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const VRScene = () => {
  const containerRef = useRef();

  useEffect(() => {
    let camera, scene, renderer;

    const init = () => {
      // Inisialisasi renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      renderer.xr.setReferenceSpaceType('local');
      containerRef.current.appendChild(renderer.domElement);

      // Tambahkan VRButton ke DOM
      containerRef.current.appendChild(VRButton.createButton(renderer));

      // Inisialisasi scene dan kamera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0, 1.6, 0);

      // Pembuatan skybox dengan gambar panorama 360 derajat
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); // Invers untuk memasang gambar di bagian dalam

      // Memuat tekstur dari file gambar dan menerapkannya pada sphere
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('/texture.png', (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const skyBox = new THREE.Mesh(geometry, material);
        scene.add(skyBox);
      });

      // Handle resize
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onWindowResize, false);

      // Animation loop
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    init();

    // Cleanup saat komponen unmount
    return () => {
      window.removeEventListener('resize', init);
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default VRScene;
