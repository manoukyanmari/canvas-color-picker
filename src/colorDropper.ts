import './style.css';

/**
 * Separate canvas class to generate the canvas
 */
class LargeCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', 'canvas');
        this.canvas.width = 4000;
        this.canvas.height = 4000;

        // Append the canvas to the body in our case
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        
        const ctx = this.context;
        const img = new Image();
        img.crossOrigin = "anonymous";  // This enables CORS
        img.src = "./assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg";       
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
}

/**
 * Color Dropper Class to handle the dropper's functionality on appropriate mouse events
 */
class ColorDropper {
    canvas: HTMLCanvasElement;
    dropperIcon: HTMLImageElement;
    colorPicker: ColorPicker;
    colorPreview: ColorPreview;
    newImage?: HTMLImageElement;
    window?: Window;
    colorPreviewUpper: HTMLDivElement;

    constructor() {

        new LargeCanvas();

        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.dropperIcon = document.getElementById('dropper') as HTMLImageElement;
        this.colorPreviewUpper = document.getElementById('color-preview-upper') as HTMLParagraphElement;
    
        this.colorPicker = new ColorPicker(this.canvas);
        this.colorPreview = new ColorPreview();

        this.bindEvents();
    }

    bindEvents() {
        this.dropperIcon.addEventListener('click', () => this.colorPicker.toggleActive());
        this.canvas.addEventListener('mousemove', (e) => this.onCanvasMouseMove(e));
        this.canvas.addEventListener('click', () => this.onCanvasClick());
        this.canvas.addEventListener('contextmenu', (e) => this.onMouseRightClick(e));
        document.addEventListener('keydown', (e) => this.onKeyDown(e))
    }

    onCanvasMouseMove(event: MouseEvent) {
        const hexContainer = document.getElementById('color-preview');
        hexContainer.style.backgroundImage = "./assets/selected-color.svg"
        if (this.colorPicker.isActive()) {
            this.canvas.style.cursor = "url('./assets/dropper-canvas.png'), auto";
            this.dropperIcon.src = './assets/dropper-active.png';
            hexContainer.style.display = 'flex';
            const color = this.colorPicker.getColorAt(event.pageX, event.pageY);
            this.colorPreview.showColor(color);

            hexContainer.style.transform = 'translateY('+(event.clientY-156)+'px)';
            hexContainer.style.transform += 'translateX('+(event.clientX - 14)+'px)';
        }
    }

    onCanvasClick () {
        const chosenColorCode = document.getElementById('color-code-upper');
        const colorPreviewUpper = document.getElementById('color-preview-upper');
        if (this.colorPicker.isActive()) {
            chosenColorCode.textContent = this.colorPreview.colorCode.innerText;
            colorPreviewUpper.style.backgroundColor = document.getElementById('color-preview').style.backgroundColor;
            
        }
    }

    onMouseRightClick (e: any) {
        if (this.colorPicker.isActive()) {
            this.colorPicker.toggleActive();
            e.preventDefault()
        }
    }

    onKeyDown (e: any) {
        console.log(e,'e');
        if (this.colorPicker.isActive() && e.key === 'Escape') {
                this.colorPicker.toggleActive();
        }
    }
}

/**
 * Actual Color Picker functionality
 */
class ColorPicker {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    dropperIcon: HTMLImageElement;
    active: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.active = false;
        this.dropperIcon = document.getElementById("dropper") as HTMLImageElement;
    }

    toggleActive() {
        this.active = !this.active;

        if(!this.active){
            const hexContainer = document.getElementById('color-preview');
            hexContainer.style.display = 'none';
            this.canvas.style.cursor = "default";
            this.dropperIcon.src = './assets/dropper.png';
        }
    }

    isActive(): boolean {
        return this.active;
    }

    getColorAt(x: number, y: number): string {
        const pixel = this.context.getImageData(x - this.canvas.offsetLeft, y - this.canvas.offsetTop, 1, 1);
        return this.rgbToHex(pixel.data[0], pixel.data[1], pixel.data[2]);
    }

    private rgbToHex(r: number, g: number, b: number): string {
        const hex = (color: number) => {
            const hex = color.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + hex(r) + hex(g) + hex(b);
    }
}

/**
 * Color Preview when hovered over canvas with color picker
 */
class ColorPreview {
    colorPreview: HTMLDivElement;
    colorCode: HTMLParagraphElement;

    constructor() {
        this.colorPreview = document.getElementById('color-preview') as HTMLDivElement;
        this.colorCode = document.getElementById('color-code') as HTMLParagraphElement;
     }

    showColor(hexCode: string) {
        this.colorPreview.style.backgroundColor = hexCode;
        this.colorCode.textContent = hexCode;
    }
}

new ColorDropper();