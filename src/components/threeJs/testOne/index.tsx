import * as THREE from 'three';
import './index.scss'

import { Button } from 'antd';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import floor from './image/floor纹理.jpg'
import grass_top from "./image/top.png";
import grass_side from "./image/side.png";
import grass_bottom from "./image/bottom.png";

export default function ThreeJsTestOne() {
    // 渲染3D组件
    const renderThree = () => {
        // 1. 创建渲染器,指定渲染的分辨率和尺寸,然后添加到指定容器中
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);    // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
        const element = document.getElementById('threeMain')
        element?.append(renderer.domElement)
        // document.getElementById('threeMain')?.appendChild(renderer.domElement);

        // 2. 创建场景
        let scene = new THREE.Scene();

        // 3. 创建相机
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(5, 5, 10);
        camera.lookAt(0, 0, 0);
        scene.add(camera);
        // camera.lookAt(new THREE.Vector3(0, 0, 0));

        // 4. 创建物体
        const axis = new THREE.AxesHelper(5);
        scene.add(axis);

        // 添加圆球
        // let sphere = new THREE.SphereGeometry(3, 6, 8)
        // let sphere = new THREE.SphereGeometry(3, 100, 100)
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0xffff00,
        //     opacity: 0.75
        // });
        // const cube = new THREE.Mesh(sphere, material);
        // scene.add(cube)

        // 添加立方体
        const geometry = new THREE.BoxGeometry(4, 4, 4);
        // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });  //  因为MeshBasicMaterial不受光源的影像，所以需要将Material改成MeshStandardMaterial
        //  初始化纹理加载器
        const textloader = new THREE.TextureLoader();
        // 添加立方体纹理
        const material = [
            new THREE.MeshBasicMaterial({
                map: textloader.load(grass_side),
            }),
            new THREE.MeshBasicMaterial({
                map: textloader.load(grass_side),
            }),
            new THREE.MeshBasicMaterial({
                map: textloader.load(grass_top),
            }),
            new THREE.MeshBasicMaterial({
                map: textloader.load(grass_bottom),
            }),
            new THREE.MeshBasicMaterial({
                map: textloader.load(grass_side),
            }),
            new THREE.MeshBasicMaterial({
                map: textloader.load(grass_side),
            }),
        ];
        const cube = new THREE.Mesh(geometry, material);
        cube.rotation.y = Math.PI / 4;
        scene.add(cube);

        // 添加光源
        // -------------------------------------
        // 环境光
        // const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        // scene.add(ambientLight);
        // 平行光
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);
        // -------------------------------------

        // 添加阴影
        // -------------------------------------
        //  渲染器能够渲染阴影效果
        renderer.shadowMap.enabled = true;

        //  该方向会投射阴影效果
        directionalLight.castShadow = true;

        //  立方体会产生影像效果
        cube.castShadow = true;

        //  新建了一个平面，该平面能够接受投射过来的阴影效果；
        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = -0.5 * Math.PI;
        planeMesh.position.set(0, -3, 0);
        planeMesh.receiveShadow = true;
        scene.add(planeMesh);

        //  方向光的辅助线
        const directionalLightHelper = new THREE.DirectionalLightHelper(
            directionalLight
        );
        scene.add(directionalLightHelper); // 辅助线
        // -------------------------------------

        // 地板添加纹理
        planeMaterial.map = textloader.load(floor)

        // 控制旋转角度
        const clock = new THREE.Clock();
        const animate = () => {
            // requestAnimationFrame(animate);
            // cube.rotation.y += 0.01;
            // renderer.render(scene, camera);

            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
            cube.rotation.y = elapsedTime * Math.PI; // 两秒自转一圈
            renderer.render(scene, camera);
        }
        animate()

        // 添加交互效果
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        //  渲染
        renderer.render(scene, camera);
    }

    return (
        <div className='threeMain' id='threeMain'>
            <Button className='testBtn' type="primary" onClick={() => renderThree()}>测试按钮</Button>
        </div>
    )
}