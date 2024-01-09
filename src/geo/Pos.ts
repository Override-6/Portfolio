export interface Pos {
    x: number
    y: number
}

export const NULL_POS: Pos = { x: 0, y: 0 }

/**
 * Returns position of a relative to b
 * @param a
 * @param b
 */
export function relativeTo(a: Pos, b: Pos): Pos {
    return { x: a.x - b.x, y: a.y - b.y }
}

/**
 * Returns the middle position of the given rectangle
 * @param rect
 */
export function middlePos(rect: DOMRect): Pos {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

export function add(a: Pos, b: Pos): Pos {
    return { x: a.x + b.x, y: a.y + b.y }
}

export function minus(a: Pos, b: Pos): Pos {
    return { x: a.x - b.x, y: a.y - b.y }
}

export function mul(a: Pos, t: number): Pos {
    return { x: a.x * t, y: a.y * t }
}

export function distance(a: Pos, b: Pos): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

export function norm(vector: Pos): number {
    return distance(NULL_POS, vector)
}

/**
 * Returns the angle in radian between the two points
 * @param a
 * @param b
 */
export function angle(a: Pos, b: Pos): number {
    const r = relativeTo(a, b)
    return Math.atan2(r.x, r.y)
}

export function ratioWithinBase(pos: Pos, base: DOMRect): Pos {
    return {
        x: (pos.x - base.x) / base.width,
        y: (pos.y - base.y) / base.height,
    }
}

export function posWithinBase(ratio: Pos, base: DOMRect): Pos {
    return {
        x: ratio.x * base.width,
        y: ratio.y * base.height,
    }
}

export function middle(a: Pos, b: Pos): Pos {
    return {
        x: a.x / 2 + b.x / 2,
        y: a.y / 2 + b.y / 2,
    }
}

export function rotate(vec: Pos, rad: number): Pos {
    return {
        x: Math.cos(rad) * vec.x - Math.sin(rad) * vec.y,
        y: Math.sin(rad) * vec.x + Math.cos(rad) * vec.y,
    }
}
