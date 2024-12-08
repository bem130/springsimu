import { Vec3 } from "./vector3.js";
class Point {
    constructor(initialPosition, mass) {
        this.r = initialPosition;
        this.v = new Vec3(0, 0, 0);
        this.m = mass;
    }
    addForce(f, step) {
        let a = f.scale(1 / this.m);
        this.v.Add(a.scale(step));
    }
    updatePosition(t, step) {
        this.r.Add(this.v.scale(step));
    }
}
class Spring {
    constructor(springConstant, naturalLength, point1, point2) {
        this.k = springConstant;
        this.l = naturalLength;
        this.point1 = point1;
        this.point2 = point2;
    }
    affect(step) {
        let sub = this.point2.r.subtract(this.point1.r);
        let f1 = sub.normalize().Scale(this.k * Math.abs(sub.length - this.l));
        this.point1.addForce(f1, step);
        this.point2.addForce(f1.flip, step);
    }
    get force() {
        let sub = this.point2.r.subtract(this.point1.r);
        let f1 = sub.normalize().Scale(this.k * Math.abs(sub.length - this.l));
        return f1;
    }
}
export { Point };
export { Spring };
