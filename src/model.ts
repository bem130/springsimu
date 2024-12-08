import { Vec3 } from "./vector3.js";

export type Position = Vec3;
export type Velocity = Vec3;
export type Acceleration = Vec3;
export type Force = Vec3;
export type Mass = number;
export type SpringConstant = number;
export type Length = number;
export type Time = number;

class Point {
    r: Position;
    v: Velocity;
    m: Mass;

    constructor(initialPosition: Position,mass: Mass) {
        this.r = initialPosition;
        this.v = new Vec3(0,0,0);
        this.m = mass;
    }

    addForce(f: Force,step: Time) {
        let a: Acceleration = f.scale(1/this.m);
        this.v.Add(a.scale(step));
    }
    updatePosition(t: Time,step: Time) {
        this.r.Add(this.v.scale(step));
    }
}

class Spring {
    k: SpringConstant;
    l: number;
    point1: Point;
    point2: Point;
    constructor(springConstant: SpringConstant,naturalLength: Length,point1: Point,point2: Point) {
        this.k = springConstant;
        this.l = naturalLength;
        this.point1 = point1;
        this.point2 = point2;
    }
    affect(step: Time) {
        let sub = this.point2.r.subtract(this.point1.r);
        let f1 = sub.normalize().Scale(this.k*Math.abs(sub.length-this.l));
        this.point1.addForce(f1,step);
        this.point2.addForce(f1.flip,step);
    }
    get force(): Force {
        let sub = this.point2.r.subtract(this.point1.r);
        let f1 = sub.normalize().Scale(this.k*Math.abs(sub.length-this.l));
        return f1;
    }
}


export { Point };
export { Spring };