export function randomColor(): string {
    const color = HSVtoRGB(randInt(101)/100);
    return `rgb(${color.r},${color.g},${color.b})`;
}

function randInt(range: number): number {
    return Math.floor(Math.random() * range);
}

//HSV usage for a biger possible color spectrum
function HSVtoRGB(h: number) {
    const s = 0.99;
    const v = 0.99;
    let r=0, g=0, b=0, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}