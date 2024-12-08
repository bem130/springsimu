import { Vec3 } from "./vector3.js";
import { Point,Spring,Mass,SpringConstant,Length,Time } from "./model.js";
import { Render2 } from "./render.js";


let Points: Point[];
let Springs: Spring[];
let render: Render2;
let step: Time = 0.01;

function circle() { // 環状のモデル
    const mass: Mass = 1;
    const k: SpringConstant = 100;
    const l: Length = 10;
    const num = 50;
    Points = new Array(num).fill(0).map((x,i)=>new Point(new Vec3(Math.cos(Math.PI*2*i/num)*100,Math.sin(Math.PI*2*i/num)*100,0),mass));
    {
        Points[0].r[2] = Math.random()+3;
    }
    Springs = new Array(num-1).fill(0).map((x,i)=>new Spring(k,l,Points[i],Points[i+1]));
    Springs.push(new Spring(k,l,Points[0],Points[num-1]))

    step = 0.00001;
    render = new Render2(document.querySelector("#output")!,1800,800,[0,0],5);
}
function chainv() { // 鎖状のモデル
    const mass: Mass = 1;
    const k: SpringConstant = 10000;
    const l: Length = 5;
    const num = 500;
    Points = new Array(num).fill(0).map((x,i)=>new Point(new Vec3(i*10,1,0),mass));
    {
        Points[0].updatePosition = (t:Time)=>{Points[0].r.y = Math.sin(t*5)*100;};
        Points[num-1].m = 10000000000;
    }
    Springs = new Array(num-1).fill(0).map((x,i)=>new Spring(k,l,Points[i],Points[i+1]));

    step = 0.001;
    render = new Render2(document.querySelector("#output")!,1800,700,[2500,0],0.35);
}
function chainl() { // 鎖状のモデル
    const mass: Mass = 1;
    const k: SpringConstant = 10000;
    const l: Length = 5;
    const num = 500;
    Points = new Array(num).fill(0).map((x,i)=>new Point(new Vec3(i*10,1,0),mass));
    {
        Points[0].updatePosition = (t:Time)=>{Points[0].r.x = Math.sin(t*5)*100;};
        Points[num-1].m = 10000000000;
    }
    Springs = new Array(num-1).fill(0).map((x,i)=>new Spring(k,l,Points[i],Points[i+1]));

    step = 0.001;
    render = new Render2(document.querySelector("#output")!,1800,700,[2500,0],0.35);
}
function chainc() { // 鎖状のモデル
    const mass: Mass = 1;
    const k: SpringConstant = 10000;
    const l: Length = 5;
    const num = 500;
    Points = new Array(num).fill(0).map((x,i)=>new Point(new Vec3(i*10,1,0),mass));
    {
        Points[0].updatePosition = (t:Time)=>{Points[0].r.z = Math.cos(t*5)*100;Points[0].r.y = Math.sin(t*5)*100;};
        Points[num-1].m = 10000000000;
    }
    Springs = new Array(num-1).fill(0).map((x,i)=>new Spring(k,l,Points[i],Points[i+1]));

    step = 0.001;
    render = new Render2(document.querySelector("#output")!,1800,700,[2500,0],0.35);
}
function net() { // 網状のモデル
    const mass: Mass = 1;
    const k: SpringConstant = 5;
    const l: Length = 0;
    const numx = 100;
    const numy = 100;
    Points = new Array(numx*numy).fill(0).map((x,i)=>new Point(new Vec3((i%numx)*10,(i-i%numx)/numx*10,0),mass));
    Points[1+1*numx].updatePosition = (t:Time)=>{Points[1+1*numx].r.z = Math.sin(t*2)*500;};
    for (let y=0;y<numy;y++) {
        Points[0+y*numy].m = 10000000000;
        Points[(numx-1)+y*numy].m = 10000000000;
    }
    for (let x=0;x<numx;x++) {
        Points[x+0*numx].m = 10000000000;
        Points[x+(numy-1)*numx].m = 10000000000;
    }
    Springs = [];
    for (let x=0;x<numx;x++) {
        for (let y=0;y<numy-1;y++) {
            Springs.push(new Spring(k,l,Points[x+y*numx],Points[x+(y+1)*numx]));
        }
    }
    for (let x=0;x<numx-1;x++) {
        for (let y=0;y<numy;y++) {
            Springs.push(new Spring(k,l,Points[x+y*numx],Points[(x+1)+y*numx]));
        }
    }

    step = 0.01;
    render = new Render2(document.querySelector("#output")!,900,900,[500,500],0.8);
    // render = new Render2(document.querySelector("#output")!,900,900,[500,500],5);
    // render = new Render2(document.querySelector("#output")!,900,900,[0,0],5);
}

// circle();
// chainv();
// chainl();
// chainc();
net();

var speed = 1;

var t: Time = 0;
var before: Time = Number(new Date())+1000;
function loop() {
    var dt: Time = Number(new Date()) - before;
    before = Number(new Date());
    for (let i=0;i<dt/1000/step*speed;i++) {
        t += step;
        for (let spring of Springs) {
            spring.affect(step);
        }
        for (let point of Points) {
            point.updatePosition(t,step);
        }
    }
    render.render(t,Points,Springs);
    requestAnimationFrame(loop);
}

console.log(step);
loop();