import OuterWallModelModule = require('../models/interactive/net/OuterWall') ;

/**
 * @brief   Controller of a OuterWall.
 */
export class OuterWallController {
    /**
     * Fixed width of the wall.
     * @return {number} Width of the wall.
     */
    public static get Width(): number { return 1 ; }

    /**
     * Fixed height of the wall.
     * @return {number} Height of the wall.
     */
    public static get Height(): number { return Number.MAX_VALUE ; }


    /** @brief  Model of the OuterWall. */
    private m_model: OuterWallModelModule.OuterWall ;

    /**
     * @brief   Create a new instance of OuterWall.
     * @param   position    Position of the OuterWall.
     */
    constructor(position: PIXI.Point) {
        this.setModel(position) ;
    }

    /**
     * @brief   Set the model of the OuterWall.
     * @param   position    Position of the OuterWall.
     */
    private setModel(position: PIXI.Point): void {
        this.m_model = new OuterWallModelModule.OuterWall(position) ;

        this.m_model.AABB = new PIXI.Rectangle(
            0,
            0,
            OuterWallController.Width,
            OuterWallController.Height
        ) ;
    }
}
