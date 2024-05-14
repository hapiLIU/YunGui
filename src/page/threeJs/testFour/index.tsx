import * as THREE from 'three';
import './index.scss'
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as d3 from 'd3';

import jsonData from './DataV.json'

export default function ThreeJsTestFour() {
    const mountRef: any = useRef(null);

    // 墨卡托投影转换
    const projection: any = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

    // 地图材质颜色
    const COLOR_ARR = ['#0465BD', '#357bcb', '#3a7abd',]

    useEffect(() => {
        if (!mountRef.current) return;

        // 创建渲染器,指定渲染的分辨率和尺寸,然后添加到指定容器中
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.shadowMap.enabled = true;    //开启阴影
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.setPixelRatio(window.devicePixelRatio);
        // 清除背景色，透明背景
        renderer.setClearColor(0xffffff, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);    // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
        const element = document.getElementById('threeFourMain')
        element?.append(renderer.domElement)
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();
        scene.background = null;
        const lightProbe = new THREE.LightProbe();
        scene.add(lightProbe);
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );
        camera.position.set(0, -40, 70);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        // 添加光源:环境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // 处理地图数据
        scene.add(generateGeometry(jsonData))

        // 创建十字辅助线
        // const helper = new THREE.CameraHelper(camera)
        // scene.add(helper)

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate()
        // 创建 OrbitControls 来控制相机  
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update()

        //  渲染
        renderer.render(scene, camera);
    })

    const generateGeometry = (jsonData: any) => {
        // 初始化一个地图对象
        const map = new THREE.Object3D()

        jsonData.features.forEach((elem: any, index: number) => {
            // 定一个省份3D对象
            const province: any = new THREE.Object3D()
            // 每个的 坐标 数组
            const coordinates = elem.geometry.coordinates
            const color = COLOR_ARR[index % COLOR_ARR.length];
            // 循环坐标数组
            coordinates.forEach((multiPolygon: any[]) => {
                multiPolygon.forEach((polygon: string | any[]) => {
                    const shape = new THREE.Shape()
                    const lineMaterial = new THREE.LineBasicMaterial({
                        color: 'white',
                        linewidth: 2
                    })
                    const lineGeometry = new THREE.BufferGeometry()
                    const point = []

                    for (let i = 0; i < polygon.length; i++) {
                        const [x, y] = projection(polygon[i])
                        if (i === 0) {
                            shape.moveTo(x, -y)
                        }
                        shape.lineTo(x, -y)
                        point.push(new THREE.Vector3(x, -y, 4.01))
                    }
                    lineGeometry.setFromPoints(point)

                    const extrudeSettings = {
                        depth: 10,
                        bevelEnabled: false,
                    }

                    const geometry = new THREE.ExtrudeGeometry(
                        shape,
                        extrudeSettings
                    )
                    // 平面部分材质
                    const material = new THREE.MeshBasicMaterial({
                        color: color,
                        transparent: true,
                        opacity: 0.6,
                    })
                    // 拉高部分材质
                    const material1 = new THREE.MeshBasicMaterial({
                        color: color,
                        transparent: true,
                        opacity: 0.5,
                    })

                    // 将省份的属性 加进来
                    province.properties = elem.properties

                    const mesh = new THREE.Mesh(geometry, [material, material1])
                    province.add(mesh)
                    const line = new THREE.Line(lineGeometry, lineMaterial)
                    province.add(line)
                })
            })
            map.add(province)
        })
        return map
    }

    return (
        <div className='threeFourMain' id='threeFourMain' ref={mountRef}></div>
    )
}