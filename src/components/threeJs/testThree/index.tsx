import * as THREE from 'three';
import './index.scss'
import { useEffect, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Button, Input } from 'antd';

export default function ThreeJsTestThree() {
    const [lightColor, setLightColor] = useState("aqua")

    // 基础threejs写法
    // useEffect(() => {
    //     // 创建渲染器,指定渲染的分辨率和尺寸,然后添加到指定容器中
    //     const renderer = new THREE.WebGLRenderer()
    //     // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    //     renderer.setSize(window.innerWidth, window.innerHeight)
    //     // 设置渲染器能渲染阴影shadowMap
    //     renderer.shadowMap.enabled = true
    //     // 获取元素并添加为渲染器
    //     const element = document.getElementById('threeThreeMain')
    //     element?.append(renderer.domElement)
    //     // 创建3D场景对象Scene
    //     const scene = new THREE.Scene()
    //     // 创建相机camera
    //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)   // 透明相机（视野，宽高比，近平面距离，远平面距离）
    //     // 设置相机位置
    //     camera.position.set(5, 5, 10)
    //     // 设置相机指向位置
    //     camera.lookAt(0, 0, 0)
    //     // 将相机添加至场景
    //     scene.add(camera)
    //     // 创建坐标轴axis
    //     const axis = new THREE.AxesHelper(5)
    //     // 将坐标轴添加至场景
    //     scene.add(axis)
    //     // 创建立方体geometry
    //     const geometry = new THREE.BoxGeometry(2, 2, 2)
    //     // 给立方体增加材质material
    //     // const material = new THREE.MeshBasicMaterial({ color: "red" })  //  光不会影响基础材质
    //     const material = new THREE.MeshPhysicalMaterial({ color: "green" })
    //     // 合成新的网格对象cube
    //     const cube = new THREE.Mesh(geometry, material)
    //     cube.rotation.y = Math.PI / 4;
    //     // 设置立方体能产生阴影
    //     cube.castShadow = true
    //     // 将立方体添加至场景
    //     scene.add(cube)
    //     // 创建平行光directionalLight
    //     const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    //     // 设置光的位置
    //     directionalLight.position.set(10, 10, 10)
    //     // 设置光的方向会投射阴影
    //     directionalLight.castShadow = true
    //     // 将光添加至场景
    //     scene.add(directionalLight)
    //     // 方向光的辅助线directionalLightHelper 并添加至场景
    //     const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
    //     scene.add(directionalLightHelper)
    //     // 创建动画效果
    //     const animate = () => {
    //         requestAnimationFrame(animate)
    //         renderer.render(scene, camera)
    //     }
    //     animate()
    //     // 添加交互效果controls
    //     const controls = new OrbitControls(camera, renderer.domElement)
    //     controls.update()
    //     // 新添加平台
    //     const planeGeometry = new THREE.PlaneGeometry(40, 40)
    //     const planeMaterial = new THREE.MeshStandardMaterial({ color: "#fff" })
    //     const planeCube = new THREE.Mesh(planeGeometry, planeMaterial)
    //     scene.add(planeCube)
    //     planeCube.rotation.x = -0.5 * Math.PI   //  设置平台旋转角度
    //     planeCube.position.set(0, -10, 0)  //  设置平台位置
    //     planeCube.receiveShadow = true  //  设置平台能接收阴影
    //     //  渲染
    //     renderer.render(scene, camera)
    // })

    // 星空
    useEffect(() => {
        // 创建渲染器,指定渲染的分辨率和尺寸,然后添加到指定容器中
        const renderer = new THREE.WebGLRenderer()
        // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
        renderer.setSize(window.innerWidth, window.innerHeight)
        // 设置渲染器能渲染阴影shadowMap
        renderer.shadowMap.enabled = true
        // 获取元素并添加为渲染器
        const element = document.getElementById('threeThreeMain')
        element?.append(renderer.domElement)
        // 创建3D场景对象Scene
        const scene = new THREE.Scene()
        // 创建相机camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)   // 透明相机（视野，宽高比，近平面距离，远平面距离）
        // 设置相机位置
        camera.position.set(10, 10, 5)
        // 设置相机指向位置
        camera.lookAt(0, 0, 0)
        // 将相机添加至场景
        scene.add(camera)
        // 创建坐标轴axis
        // const axis = new THREE.AxesHelper(5)
        // 将坐标轴添加至场景
        // scene.add(axis)
        // 创建动画效果
        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()
        // 添加交互效果controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.update()
        window.addEventListener('resize', () => {
            //  更新相机宽高比
            camera.aspect = window.innerWidth / window.innerHeight;
            // 修改相机矩阵(就是摄像机的视野以及渲染画面的范围)
            camera.updateProjectionMatrix();
            // 更新渲染器尺寸
            renderer.setSize(window.innerWidth, window.innerHeight)
            // 设置渲染器的像素比
            renderer.setPixelRatio(window.devicePixelRatio)
        })
        // 创建BufferGeometry对象
        const pointBuffer = new THREE.BufferGeometry();
        // // 定义顶点位置。有x,y,z坐标
        // let particlePositions = new Float32Array([1, 1, 1])
        // // 将顶点数据添加到BufferGeometry。第二个参数itemSize=3,因为每个顶点都是一个三元组。
        // pointBuffer.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        // //创建一个 PointsMaterial 材质，设置其颜色和大小
        // const pointMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
        // // 创建一个 Points 对象，并将其添加到场景中
        // const point = new THREE.Points(pointBuffer, pointMaterial);
        // scene.add(point);
        // 星星数量，可随意设置。
        const count = 1000;
        // 设置顶点数组。每个粒子都是个三元组（x,y,z坐标）
        const particlePositions = new Float32Array(count * 3);
        // 设置粒子颜色。设置rgb。
        const colors = new Float32Array(count * 3);
        for (let i = 1; i <= count * 3; i++) {
            // 范围：-50 到 50。这个可根据需求设置。
            particlePositions[i] = (Math.random() - 0.5) * 100;
            colors[i] = Math.random()
        }
        // 设置属性
        pointBuffer.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        pointBuffer.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        // 创建一个点材质
        const pointMaterial = new THREE.PointsMaterial()
        pointMaterial.size = 0.1;
        pointMaterial.vertexColors = true;
        pointMaterial.color = new THREE.Color("rgb(255,255,255)");
        // 创建点
        const points = new THREE.Points(pointBuffer, pointMaterial);
        // 控制是否将对象的深度值写入深度缓冲区
        pointMaterial.depthWrite = false;
        //重叠部分 混合模式
        pointMaterial.blending = THREE.AdditiveBlending;
        // 是否使用顶点着色器，默认值为false
        pointMaterial.vertexColors = true;
        scene.add(points);
        // const line = new THREE.Line(pointBuffer, pointMaterial);    // 连接线
        // scene.add(line);
        // const lineLoop = new THREE.LineLoop(pointBuffer, pointMaterial);    // 封闭的连续线
        // scene.add(lineLoop);
        // const lineSegments = new THREE.LineSegments(pointBuffer, pointMaterial);    // 两个独立的线段
        // scene.add(lineSegments);
        let clock = new THREE.Clock();
        //渲染函数
        function render() {
            let time = clock.getDelta()
            points.position.x += time;
            // 加个边界判断，不然一会就都飞出去了。
            if (points.position.x > 40) {
                points.position.x = 0;
            }
            points.rotation.x += time * 0.1;
            // 阻尼
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(render)
        }
        render()
        //  渲染
        renderer.render(scene, camera)
    }, [])

    // document.getElementById("run1").addEventListener('animationend', () => {
    //     console.log('11')
    // })
    useEffect(() => {
        setTimeout(() => {
            // let str = "#"
            // let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
            // for (let i = 0; i < 6; i++) {
            //     str += arr[Math.floor(Math.random() * 16)];
            // }
            // setLightColor(str)

            let r = Math.round(Math.random() * 255);
            let g = Math.round(Math.random() * 255);
            let b = Math.round(Math.random() * 255);
            setLightColor(`rgb(${r},${g},${b})`)
        }, 990)
    }, [lightColor])

    return (
        <div className='threeThreeMain' id='threeThreeMain'>
            <div className='box'>
                <span style={{ color: "#fff", fontSize: "24px", marginTop: '10px' }}>欢迎登录</span>
                <Input style={{ width: "70%" }} placeholder="账户" />
                <Input.Password style={{ width: "70%" }} placeholder="密码" />
                <div className='btn'>
                    <Button ghost>注册账户</Button>
                    <Button ghost>登录</Button>
                </div>
                <div id='run1' className='run1' style={{ backgroundColor: lightColor }}></div>
                <div className='run2' style={{ backgroundColor: lightColor }}></div>
                <div className='run3' style={{ backgroundColor: lightColor }}></div>
                <div className='run4' style={{ backgroundColor: lightColor }}></div>
            </div>
        </div>
    )
}