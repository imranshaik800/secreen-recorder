let video = document.querySelector("video")
let recordBtnCont = document.querySelector(".record-btn-container");
let recordBtn = document.querySelector(".record-button")
let timertext = document.querySelector(".timer")
let timersection = document.querySelector(".timer-section")
let capturebtncont = document.querySelector(".capture-btn-container")
let capturebtn = document.querySelector(".capturebtn")



let recordFlag = false
let recorder ;
let chunks = [];

let constrains = {
    audio:true,
    video:true
}

navigator.mediaDevices.getUserMedia(constrains)
.then((stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream)
    recorder.addEventListener("start",(e)=>{
        chunks = []
    })
    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data)
    })
    recorder.addEventListener("stop",(e)=>{
        let blob = new Blob(chunks,{type:"video/mp4"})
        let videoURl = URL.createObjectURL(blob)
        let a = document.createElement("a");
        a.href = videoURl
        a.download = "stream.mp4"
        a.click()
       
    })

    recordBtnCont.addEventListener("click",(e)=>{
        if(!recorder) return;
        recordFlag = !recordFlag
        if (recordFlag){
            recorder.start()
            recordBtn.classList.add("scale-record")
            TimerStart()
        } else {
            recorder.stop()
            recordBtn.classList.remove("scale-record")
            clear()
        }
    })
}) 



capturebtncont.addEventListener("click",(e)=>{
    capturebtncont.classList.add("scale-capture")
    let canvas = document.createElement("canvas")
    let tool = canvas.getContext("2d");
    tool.drawImage(video,0,0,canvas.width,canvas.height);
    canvas.width = video.width;
    canvas.height = canvas.height ;
    let imageURL = canvas.toDataURL('image/png');




    let a = document.createElement('a');
    a.href = imageURL 
    a.download = "Image.png"
    a.click()
})


let timer = 0
let timerstart ;
function TimerStart() {
    timersection.style.display = "block"
        function Timer() {

        let totalseconds = timer
        let hours = Number.parseInt((totalseconds/3600))
        let secondscount = (totalseconds%3600)
        let minutes = Number.parseInt((secondscount/60))
        let seconds = Number.parseInt(secondscount%60)
   
        seconds = (seconds<= 9) ? `0${seconds}` : seconds
        minutes = (minutes <= 9) ? `0${minutes}` : minutes 
        hours = (hours <= 9) ? `0${hours}` : hours
       
        timertext.innerText = `${hours}:${minutes}:${seconds}` 
        timer++;

    } 
    timerstart = setInterval(Timer,1000)
}

function clear() {
    clearInterval(timerstart)
    
}








