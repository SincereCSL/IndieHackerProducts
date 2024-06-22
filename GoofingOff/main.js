
// 1.加载视频 放在页面中
// 2.给视频图截图
// 3.把视频截图放在icon的link标签上
    // 使用canvas 绘图

// 实现逻辑

class Moyu{
    constructor(width='100',name='FunnyVideos') {
        this.width = width
        this.name = name
        this.timer = null
        this.faviconWidth = this.faviconHeight = 32
    }
    initVideo(){
        let video = document.createElement('video')
        video.width = this.width
        video.controls = 'controls'
        video.src = './video/'+this.name +'.mp4'
        video.crossOrign = 'anonymous'
        document.body.appendChild(video)
        this.video = video

        this.bindVideoEvent()
    }
    bindVideoEvent(){
        // video相关事件
        const video = this.video
        video.addEventListener('play',()=>{
            //视频转向图标
            this.videoToFavicon()
        })
        //视频加载完成之后
        video.addEventListener('canplay',()=>{
            // 视频扩展例如：视频进度条、视频的音量、视频播放位置控制

            //视频音量控制
            video.volume = 0.5
            setTimeout(()=>{
                video.play()
            },500)
        })

    }
    videoToFavicon(){
        //终止条件
        if(this.video.ended){
            return
        }
        const context = this.canvas.getContext('2d')
        // 清空上一张截图
        context.clearRect(0,0,this.faviconWidth,this.faviconHeight)
        // 绘制新图
        context.drawImage(this.video,0,0,this.faviconWidth,this.faviconHeight)

        // 定期画图
        this.timer = setTimeout(()=>{
            this.videoToFavicon()
        },50)
        this.setFavicon()
    }
    setFavicon(){
        // 设置图标：将截完的图放在图标上
        const url = this.canvas.toDataURL('image/png')
        // document.querySelector('#image').src = url

        // 找到head中的link标签，rel属性有icon的 设置一下href 属性
        const icons = [...document.querySelector('head').querySelectorAll('link')]
                            .filter(link=>{
                                const rel = link.getAttribute('rel') || ''
                                return rel.indexOf('icon')> -1
                            })
        if(icons.length){
            // 如果有icons 直接设置
            icons.forEach(icons => icons.setAttribute('href',url))
        }else {
            // 如果没有有icons 就新建一个
            const icon = document.createElement('link')
            link.setAttribute('ref','shortcut icon')
            link.setAttribute('href',url)
            document.querySelector('head').appendChild(icon)
        }
    }
    initCanvas(){
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.canvas.height = 32
    }
    init(){
        this.initVideo()
        this.initCanvas()
    }

}
const m = new Moyu(videoWidth,videoName)
m.init()
