/** @brief  Deep copy of element data as position or size. */
export class ElementData {
    /** @brief  Absolute position of the element on screen. */
    m_position: PIXI.Point ;

    /** @brief  Size of the element. */
    m_size: PIXI.Point ;

    /** @brief  Bounds of the element with absolute position. */
    m_bounds: PIXI.Rectangle ;


    /**
     * @brief   Create a new instance of ElementData.
     *          This copies data from given parameters.
     * @param   position    Position of the element on screen.
     * @param   width       Width of the element.
     * @param   height      Height of the element.
     */
    constructor(position: PIXI.Point, width: number, height: number) {
        this.m_position = new PIXI.Point(position.x, position.y) ;
        this.m_size = new PIXI.Point(width, height) ;
        this.m_bounds = new PIXI.Rectangle(position.x, position.y, width, height) ;
    }


    /** @brief  Get position of the element on X axis. */
    public get X(): number {
        return this.m_position.x ;
    }

    /** @brief  Get position of the element on Y axis. */
    public get Y(): number {
        return this.m_position.y ;
    }

    /** @brief  Get width of the element. */
    public get Width(): number {
        return this.m_size.x ;
    }

    /** @brief  Get height of the element. */
    public get Height(): number {
        return this.m_size.y ;
    }

    /** @brief  Get the bounds of the element with absolute transformation. */
    public get Bounds() : PIXI.Rectangle {
        return this.m_bounds ;
    }
} ;
