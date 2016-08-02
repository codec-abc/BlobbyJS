module PIXI.Rectangle {
    export function intersect(
                              first: PIXI.Rectangle,
                              second: PIXI.Rectangle
                             ) : boolean {
        return (second.width > 0) && (second.height > 0) &&
                    (first.width > 0) && (first.height > 0) &&
                    (second.x < first.x + first.width) && (second.x + second.width > first.x) &&
                    (first.y < second.y + second.height) && (first.y + first.height > second.y) ;
    }
} ;
