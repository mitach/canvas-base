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
labels();
button('Let it snow', {x: 640, y: 280});

const assets: { [name: string]: any } = {
    bkImg: '/assets/bk.png',
    wkImg: '/assets/wk.png'
};

let toLoad = Object.keys(assets).length;

for (let name in assets) {
    const img = new Image();
    img.src = assets[name]
    assets[name] = img;
    img.addEventListener('load', assetLoaded);
}

function assetLoaded() {
    toLoad--;
    if (toLoad == 0) {
        drawKings();
    }
}

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
            row % 2 == 0 
            ?   rect(col, row, col % 2 == 0 ? light : dark)
            :   rect(col, row, col % 2 == 0 ? dark : light);
        }
    }
}

function labels() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
    let xPos = 125;
    let yPos = 125;

    ctx.beginPath();
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let letter of letters) {
        ctx.fillText(letter, xPos, 75);
        ctx.fillText(letter, xPos, 525);
        xPos += 50
    }

    for (let number of numbers) {
        ctx.fillText(number, 75, yPos);
        ctx.fillText(number, 525, yPos);
        yPos += 50
    }
    ctx.closePath();
}

function drawKings() {
    for (let king in assets) {
        if (king == 'bkImg') {
            ctx.drawImage(assets[king], 300, 100, 50, 50)
        } else if (king == 'wkImg') {
            ctx.drawImage(assets[king], 300, 450, 50, 50)
        }
    }
}

function button(label: string, pos: {x: number, y: number}) {
    ctx.beginPath();
    ctx.lineWidth = 40;;
    ctx.lineCap = 'round';
    ctx.strokeStyle = dark;
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + 120, pos.y);
    ctx.stroke();

    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, pos.x + 60, pos.y);

    ctx.closePath();
}