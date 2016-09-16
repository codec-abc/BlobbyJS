import BallViewModule = require('../views/screens/game/interactive/BallView') ;
import BallModule = require('../models/interactive/balls/Ball');

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
export class BallController {
    /** @brief  View of the Ball. */
    private m_view: BallViewModule.BallView ;

    /** @brief  Model of the Ball. */
    private m_model: BallModule.Ball ;

    /**
     * @brief   Create a new instance of BallController.
     * @param   position    Position of the BallView sprite when created.
     */
    constructor(data: BallSetupData) {
        this.setTexture(data) ;
        this.setModel(data) ;
    }

    /**
     * @brief   General update of the Ball.
     */
    public update(): void {
        this.m_model.update() ;
        this.m_view.moveAt(this.m_model.Position) ;
    }

    /**
     * @brief   Set the model of the Ball.
     */
    private setModel(data: BallSetupData): void {
        this.m_model = new BallModule.Ball(data.Position, data.Area) ;
        this.m_model.AABB = this.m_view.BallSprite.getBounds() ;
    }

    /**
     * @brief   Set the texture of the Ball. Can be changed while playing.
     * @param   texture     Path to the texture of the Ball.
     */
    private setTexture(data: BallSetupData): void {
        var texturePath: string = BallViewModule.BallView.BallPath ;
        var texture: PIXI.Texture = PIXI.Texture.fromImage(texturePath) ;
        this.m_view = new BallViewModule.BallView(texture, data.Position) ;

        data.Area.width -= this.m_view.BallSprite.width ;
    }

    /**
     * @brief   Get the view of the Ball.
     * @return  View of the Ball.
     */
    public get View(): BallViewModule.BallView {
        return this.m_view ;
    }
}
