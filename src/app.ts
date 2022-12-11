const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const light = 'rgb(255, 206, 158)';
const dark = 'rgb(209, 139, 71)';

type ColorPalette = 'light' | 'dark';

drawGrid();
frame();
smiley();
checker();

function drawGrid() {
    ctx.lineWidth = 1;

    for (let x = 20; x < WIDTH; x += 20) {
        ctx.save();
        ctx.strokeStyle = `rgba(0, 0, 0, ${x % 100 == 0 ? '0.5' : '0.2'})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    
    for (let y = 20; y < HEIGHT; y += 20) {
        ctx.save();
        ctx.strokeStyle = `rgba(0, 0, 0, ${y % 100 == 0 ? '0.5' : '0.2'})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }    
}

function frame() {
    ctx.beginPath();
    ctx.lineWidth = 50;
    ctx.strokeStyle = dark;
    ctx.rect(75, 75, 450, 450);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.rect(100, 100, 400, 400);
    ctx.stroke();
    ctx.closePath();
}

function smiley() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(700, 100, 80, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(700, 100, 60, 0, 1 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(670, 70, 10, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(730, 70, 10, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath();
}

function rect(file: number, rank: number, color: string) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(file * 50 + 100, rank * 50 + 100, 50, 50);
    ctx.fill();
    ctx.closePath();
}

function checker() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (row % 2 == 0) {
                if (col % 2 == 0) {
                    rect(col, row, dark)
                } else {
                    rect(col, row, light)
                }
            } else {
                if (col % 2 == 0) {
                    rect(col, row, light)
                } else {
                    rect(col, row, dark)
                }
            }
        }
    }
}