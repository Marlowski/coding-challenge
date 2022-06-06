/**
 * Trying a complete random approach instead of cycling
 * through a fixed color palette. using a similarity check to
 * drastically reduce times where the new color looks very
 * similiar to the old one
 * @param {string} currentColor currently set color
 * @return {string} new Color
 */
export function randomColor(currentColor: string): string {
    let newColor: { r:number, g:number, b:number };
    const oldColor = stringRGBToJson(currentColor);

    let isSimiliar: boolean
    do {
        newColor = HSVtoRGB(randInt(101)/100);
        isSimiliar = checkSimilarity(newColor, oldColor);
    } while (!isSimiliar);
    return `rgb(${newColor.r},${newColor.g},${newColor.b})`;
}

function stringRGBToJson(input: string) {
    const inputAsArray = input.replace(/[^\d,]/g, '').split(',');
    return {r: Number(inputAsArray[0]), g: Number(inputAsArray[1]), b: Number(inputAsArray[2])};
}

function randInt(range: number): number {
    return Math.floor(Math.random() * range);
}

function checkSimilarity(newColor: { r: number, g:number, b:number }, oldColor: { r: number, g:number, b:number }) {
    const sumOldColor = oldColor.r + oldColor.g + oldColor.b;
    const sumNewColor = newColor.r + newColor.g + newColor.b;
    if(oldColor.r === newColor.r || oldColor.g === newColor.g || oldColor.b === newColor.b) {
        return false;
    }
    return sumNewColor - sumOldColor >= 50 || sumNewColor - sumOldColor <= -50;
}

//HSV usage for a biger possible color spectrum
//boldy stolen code
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