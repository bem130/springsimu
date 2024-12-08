class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get [0]() {
        return this.x;
    }
    set [0](value) {
        this.x = value;
    }
    get [1]() {
        return this.y;
    }
    set [1](value) {
        this.y = value;
    }
    get [2]() {
        return this.z;
    }
    set [2](value) {
        this.z = value;
    }
    // ベクトルの加算
    add(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    Add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }
    // ベクトルの減算
    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    Subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }
    // スカラー倍
    scale(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    Scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    // ベクトルの反転
    get flip() {
        return new Vector3(-this.x, -this.y, -this.z);
    }
    Flip() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    }
    // 内積
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    Dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    // 外積
    cross(other) {
        return new Vector3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    }
    Cross(other) {
        const x = this.y * other.z - this.z * other.y;
        const y = this.z * other.x - this.x * other.z;
        const z = this.x * other.y - this.y * other.x;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    // ベクトルの長さ
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    // 正規化（単位ベクトル）
    normalize() {
        const len = this.length;
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.scale(1 / len);
    }
    Normalize() {
        const len = this.length;
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.Scale(1 / len);
    }
    // ベクトルの文字列表現
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}
export { Vector3 };
export { Vector3 as Vec3 };
