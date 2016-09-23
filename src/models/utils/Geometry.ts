export class Geometry {
    /**
     * @brief   Check if two rectangles intersect.
     * @param   first   First rectangle.
     * @param   first   First rectangle.
     * @return  TRUE if the rectangles intersect, FALSE otherwise.
     */
    public static Intersect(
                            first: PIXI.Rectangle,
                            second: PIXI.Rectangle
                           ) : boolean {
        // If the rectangle has no area, no intersection is possible.
        if (first.width <= 0 || first.height <= 0) {
            return false ;
        }
        // If the rectangle has no area, no intersection is possible.
        if (second.width <= 0 || second.height <= 0) {
            return false ;
        }

        var x0: number = first.x ;
        var y0: number = first.y ;

        var x1: number = second.x ;
        var y1: number = second.y ;

        return (x1 + second.width > x0)
                && (y1 + second.height > y0)
                && (x1 < x0 + first.width)
                && (y1 < y0 + first.height) ;
    }

    /**
     * @brief   Get the alignement of two rectangles as a float value.
     *          This value is a ratio, alignment of second rectangle over the
     *          height of the first one.
     *          The ratio is:
     *              - zero when the two rectangles are perfectly aligned on
     *                vertical axis;
     *              - negative if the second rectangle is under the first one;
     *              - positive if the second rectangle is over the first one.
     * @param   first   First rectangle.
     * @param   first   First rectangle.
     * @return  The ratio that indicates the position of the second rectangle
     *          relatively to the first one.
     */
    public static VerticalContact(
                                  first: PIXI.Rectangle,
                                  second: PIXI.Rectangle
                                 ) : number {
        var yCenter0: number = first.y + (first.height / 2) ;
        var yCenter1: number = second.y + (second.height / 2) ;
        var ratio: number = (yCenter1 - yCenter0) / first.height ;
        return ratio ;
    }

    /**
     * @brief   Get the alignement of two rectangles as a float value.
     *          This value is a ratio, alignment of second rectangle over the
     *          width of the first one.
     *          The ratio is:
     *              - zero when the two rectangles are perfectly aligned on
     *                horizontal axis;
     *              - negative if the second rectangle is under the first one;
     *              - positive if the second rectangle is over the first one.
     * @param   first   First rectangle.
     * @param   first   First rectangle.
     * @return  The ratio that indicates the position of the second rectangle
     *          relatively to the first one.
     */
    public static HorizontalContact(
                                    first: PIXI.Rectangle,
                                    second: PIXI.Rectangle
                                   ) : number {
        var xCenter0: number = first.x + (first.width / 2) ;
        var xCenter1: number = second.x + (second.width / 2) ;
        var ratio: number = (xCenter1 - xCenter0) / first.width ;
        return -ratio ;
    }
} ;
