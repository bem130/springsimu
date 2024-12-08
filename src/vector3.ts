class Vector3 {
    // キャメルケース: 新オブジェクトを作成
    // パスカルケース: 自身を変更
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // インデックスでのアクセス
    [index: number]: number;
    get [0](): number {
        return this.x;
    }
    set [0](value: number) {
        this.x = value;
    }
    get [1](): number {
        return this.y;
    }
    set [1](value: number) {
        this.y = value;
    }
    get [2](): number {
        return this.z;
    }
    set [2](value: number) {
        this.z = value;
    }

    // ベクトルの加算
    add(other: Vector3): Vector3 {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    Add(other: Vector3): this {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    // ベクトルの減算
    subtract(other: Vector3): Vector3 {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    Subtract(other: Vector3): this {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    // スカラー倍
    scale(scalar: number): Vector3 {
      return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    Scale(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    // ベクトルの反転
    get flip(): Vector3 {
        return new Vector3(-this.x,-this.y,-this.z);
    }
    Flip(): this {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    }

    // 内積
    dot(other: Vector3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    Dot(other: Vector3): number {
      return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    // 外積
    cross(other: Vector3): Vector3 {
        return new Vector3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }
    Cross(other: Vector3): this {
        const x = this.y * other.z - this.z * other.y;
        const y = this.z * other.x - this.x * other.z;
        const z = this.x * other.y - this.y * other.x;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    // ベクトルの長さ
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    // 正規化（単位ベクトル）
    normalize(): Vector3 {
        const len = this.length;
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.scale(1 / len);
    }
    Normalize(): this {
        const len = this.length;
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.Scale(1 / len);
    }

    // ベクトルの文字列表現
    toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}

export { Vector3 };
export { Vector3 as Vec3 };