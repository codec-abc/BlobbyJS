import BallViewModule = require('../views/screens/game/interactive/BallView') ;

/**
 * @brief   Data to set up a Ball.
 */
export class BallSetupData {
    /** @brief  Position of the Ball. */
    private m_position: PIXI.Point ;

    /** @brief  Area of the screen in which the Ball can move. */
    private m_area: PIXI.Rectangle ;

    /** @brief  Speed factor of the Ball. */
    private m_speedFactor: number ;


    /** @brief  Create a new instance of BallSetupData. */
    constructor() {}

    /** @brief  Get and set the position of the Ball. */
    public get Position(): PIXI.Point { return this.m_position ; }
    public set Position(position: PIXI.Point) { this.m_position = position.clone() ; }

    /** @brief  Get and set the area in which the Ball can move. */
    public get Area(): PIXI.Rectangle { return this.m_area ; }
    public set Area(area: PIXI.Rectangle) { this.m_area = area.clone() ; }

    /** @brief  Get and set the speed factor to move the Ball. */
    public get SpeedFactor(): number { return this.m_speedFactor ; }
    public set SpeedFactor(factor: number) { this.m_speedFactor = factor ; }
} ;


/**
 * @brief   Controller of a Ball.
 */
export class PlayerController {
    /** @brief  View of the Ball. */
    private m_view: BallViewModule.BallView ;

    /** @brief  Model of the Ball. */
    private m_model: PlayerModelModule.Player ;
}
