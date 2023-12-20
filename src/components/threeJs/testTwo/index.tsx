import * as THREE from 'three';
import './index.scss'
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import map from './image/world.jpg'
import map from './image/map.webp'

export default function ThreeJsTestTwo() {

    useEffect(() => {
        // 创建渲染器,指定渲染的分辨率和尺寸,然后添加到指定容器中
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);    // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
        const element = document.getElementById('threeTwoMain')
        element?.append(renderer.domElement)
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(5, 5, 10);
        camera.lookAt(0, 0, 0);
        scene.add(camera);
        // 创建坐标轴
        // const axis = new THREE.AxesHelper(5);
        // scene.add(axis);
        // 添加立方体
        // const geometry = new THREE.BoxGeometry(2, 2, 2);
        // const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
        // const cube = new THREE.Mesh(geometry, material);
        // cube.rotation.y = Math.PI / 2;
        // scene.add(cube);
        // 添加球体
        const geometry = new THREE.SphereGeometry(4, 50, 50)
        const textloader = new THREE.TextureLoader(); //  初始化纹理加载器
        const material = new THREE.MeshBasicMaterial({ map: textloader.load(map), transparent: true });
        // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        cube.rotation.y = Math.PI / 4;
        scene.add(cube);
        // 平行光
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        const clock = new THREE.Clock();    // 控制旋转角度
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
            // cube.rotation.y = elapsedTime * Math.PI * 5;
            cube.rotation.y = elapsedTime * Math.PI / 5;
            renderer.render(scene, camera);
        }
        animate()

        // 添加交互效果
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        //  渲染
        renderer.render(scene, camera);
    })

    return (
        <div className='threeTwoMain' id='threeTwoMain'></div>
    )
}