function round(x, n) {
    return Math.round(x * n) / n;
}
class Render2 {
    constructor(canvas, width, height, center, scale) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = height;
        this.width = width;
        this.center = center;
        this.scale = scale;
        canvas.height = height;
        canvas.width = width;
        this.beforeRendering = null;
    }
    render(t, Points, Springs) {
        const dt = this.beforeRendering ? Number(new Date()) - this.beforeRendering : null;
        this.beforeRendering = Number(new Date());
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        {
            ctx.font = "20px Arial";
            ctx.strokeStyle = `rgb(0,0,0)`;
            ctx.fillStyle = `rgb(255,255,255)`;
            ctx.lineWidth = 3;
            if (dt) {
                const text = `fps: ${round(1000 / dt, 100)}`;
                ctx.strokeText(text, 10, 30);
                ctx.fillText(text, 10, 30);
            }
            {
                const text = `${round(t, 100)}s`;
                ctx.strokeText(text, this.width - 60, 30);
                ctx.fillText(text, this.width - 60, 30);
            }
        }
        const colorscale_s = 100 / Springs.length;
        for (let i_ in Springs) {
            const i = Number(i_);
            const spring = Springs[i];
            const forcecolor = 5 * Math.pow(1.001, spring.force.length);
            ctx.lineWidth = Math.max(Math.min(Math.pow(1.001, spring.force.length), 0.1), 5);
            ctx.strokeStyle = `rgba(${255 - i * 1 * colorscale_s + forcecolor},${255 - i * 4 * colorscale_s + forcecolor},${i * 3 * colorscale_s + forcecolor},0.2)`;
            ctx.beginPath();
            ctx.moveTo((spring.point1.r[0] - this.center[0]) * this.scale + this.width / 2, (spring.point1.r[1] - this.center[1]) * this.scale + this.height / 2);
            ctx.lineTo((spring.point2.r[0] - this.center[0]) * this.scale + this.width / 2, (spring.point2.r[1] - this.center[1]) * this.scale + this.height / 2);
            ctx.stroke();
        }
        const colorscale_p = 100 / Points.length;
        for (let i_ in Points) {
            const i = Number(i_);
            const point = Points[i];
            const heightcolor = 50 * Math.pow(1.01, point.r[2]);
            ctx.fillStyle = `rgb(${255 - i * 1 * colorscale_p + heightcolor},${255 - i * 4 * colorscale_p + heightcolor},${i * 3 * colorscale_p + heightcolor})`;
            ctx.beginPath();
            ctx.arc((point.r[0] - this.center[0]) * this.scale + this.width / 2, (point.r[1] - this.center[1]) * this.scale + this.height / 2, Math.max(Math.min(3 + point.r[2] * 0.01, 10), 0.1), 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
export { Render2 };
