import './index.scss'

interface Clouds {
    size?: "large" | "medium" | "small",
    direction?: "left" | "right"
}

export default function Cloud(props?: Clouds) {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    const defaultWidth = 2560;
    const defaultHeight = 1440;
    let proWidth = innerWidth / defaultWidth
    let proHeight = innerHeight / defaultHeight
    // 云朵尺寸
    let largeSize = {
        cloudWidth: `${450 * proWidth}px`,
        cloudHeight: `${262.5 * proHeight}px`,
        baseWidth: `${450 * proWidth}px`,
        baseHeight: `${150 * proHeight}px`,
        baseRadius: `75px`,
        leftWidth: `${240 * proWidth}px`,
        leftHeight: `${240 * proHeight}px`,
        leftTop: `0px`,
        leftright: `${45 * proWidth}px`,
        rightWidth: `${150 * proWidth}px`,
        rightHeight: `${150 * proHeight}px`,
        rightTop: `${45 * proHeight}px`,
        rightright: `${240 * proWidth}px`,
    }
    let mediumSize = {
        cloudWidth: `${300 * proWidth}px`,
        cloudHeight: `${175 * proHeight}px`,
        baseWidth: `${300 * proWidth}px`,
        baseHeight: `${100 * proHeight}px`,
        baseRadius: `50px`,
        leftWidth: `${160 * proWidth}px`,
        leftHeight: `${160 * proHeight}px`,
        leftTop: `0px`,
        leftright: `${30 * proWidth}px`,
        rightWidth: `${100 * proWidth}px`,
        rightHeight: `${100 * proHeight}px`,
        rightTop: `${30 * proHeight}px`,
        rightright: `${160 * proWidth}px`,
    }
    let smallSize = {
        cloudWidth: `${150 * proWidth}px`,
        cloudHeight: `${87.5 * proHeight}px`,
        baseWidth: `${150 * proWidth}px`,
        baseHeight: `${50 * proHeight}px`,
        baseRadius: `25px`,
        leftWidth: `${80 * proWidth}px`,
        leftHeight: `${80 * proHeight}px`,
        leftTop: `0px`,
        leftright: `${15 * proWidth}px`,
        rightWidth: `${50 * proWidth}px`,
        rightHeight: `${50 * proHeight}px`,
        rightTop: `${15 * proHeight}px`,
        rightright: `${80 * proWidth}px`,
    }

    let data = mediumSize
    if (props?.size == "large") {
        data = largeSize
    }
    if (props?.size == "small") {
        data = smallSize
    }

    // 云朵方向
    let direction = 1
    if (props?.direction == "left") {
        direction = -1
    }

    return (
        <div className="cloud" style={{ transform: `scaleX(${direction})`, width: data.cloudWidth, height: data.cloudHeight }}>
            <div className="cloud-base" style={{ width: data.baseWidth, height: data.baseHeight, borderRadius: data.baseRadius }}></div>
            <div className="cloud-left" style={{ width: data.leftWidth, height: data.leftHeight, top: data.leftTop, right: data.leftright }}></div>
            <div className="cloud-right" style={{ width: data.rightWidth, height: data.rightHeight, top: data.rightTop, right: data.rightright }}></div>
        </div>
    )
}