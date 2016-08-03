import PlayerViewModule = require('../views/screens/game/interactive/PlayerView') ;
import PlayerModelModule = require('../models/interactive/players/Player') ;
import JumpPlayerModelModule = require('../models/interactive/players/Jump') ;
import BehaviorPlayerModelModule = require('../models/interactive/players/Behavior') ;

/**
 * @brief   Data to set up a Player.
 */
export class PlayerSetupData {
    /** @brief  Position of the Player. */
    private m_position: PIXI.Point ;

    /** @brief  Area of the screen in which the Player can move. */
    private m_area: PIXI.Rectangle ;

    /** @brief  Speed factor of the Player. */
    private m_speedFactor: number ;

    /** @brief  Maximal score the Player must reach to win the game. */
    private m_maxScore: number ;

    /** @brief  Texture of the Player. */
    private m_texture: PIXI.Texture ;

    /** @brief  Create a new instance of PlayerSetupData. */
    constructor() {}

    /** @brief  Get and set the position of the Player. */
    public get Position(): PIXI.Point { return this.m_position ; }
    public set Position(position: PIXI.Point) { this.m_position = position.clone() ; }

    /** @brief  Get and set the area in which the Player can move. */
    public get Area(): PIXI.Rectangle { return this.m_area ; }
    public set Area(area: PIXI.Rectangle) { this.m_area = area.clone() ; }

    /** @brief  Get and set the speed factor to move the Player. */
    public get SpeedFactor(): number { return this.m_speedFactor ; }
    public set SpeedFactor(factor: number) { this.m_speedFactor = factor ; }

    /** @brief  Get and set the max score to make the Player win. */
    public get MaxScore(): number { return this.m_maxScore ; }
    public set MaxScore(score: number) { this.m_maxScore = score ; }

    /** @brief  Get and set the texture of the Player. */
    public get Texture(): PIXI.Texture { return this.m_texture ; }
    public set Texture(texture: PIXI.Texture) { this.m_texture = texture ; }

    /**
     * @brief  Get the real position of the Player using both provided position
     *         and the height of the player sprite.
     */
    public get RealPosition(): PIXI.Point {
        return new PIXI.Point(
                              this.m_position.x - (this.m_texture.width / 2),
                              this.m_position.y - this.m_texture.height
                             ) ;
    }
} ;

/**
 * @brief   Controller of a Player.
 */
export class PlayerController {
    /** @brief  View of the Player. */
    private m_view: PlayerViewModule.PlayerView ;

    /** @brief  Model of the Player. */
    private m_model: PlayerModelModule.Player ;

    /**
     * @brief   Create a new instance of PlayerController.
     * @param   position    Position of the PlayerView sprite when created.
     */
    constructor(data: PlayerSetupData) {
        this.setModel(data) ;
        this.setTexture(data) ;

        addEventListener(
                         BehaviorPlayerModelModule.Behavior.MovePlayerUpdateEvent,
                         this.updateView.bind(this)
                        ) ;

        addEventListener(
                         JumpPlayerModelModule.Jump.JumpPlayerUpdateEvent,
                         this.updateView.bind(this)
                        ) ;
    }

    /**
     * @brief   Set the model of the Player.
     */
    private setModel(data: PlayerSetupData): void {
        this.m_model = new PlayerModelModule.Player(
                                                    data.RealPosition,
                                                    data.Area,
                                                    data.SpeedFactor,
                                                    data.MaxScore
                                                   ) ;
    }

    /**
     * @brief   Set the texture of the Player. Can be changed while playing.
     * @param   texture     Path to the texture of the Player.
     */
    private setTexture(data: PlayerSetupData): void {
        var position: PIXI.Point = this.m_model.Behavior.CurrentPosition ;
        this.m_view = new PlayerViewModule.PlayerView(
                                                      data.Texture,
                                                      position
                                                     ) ;
        data.Area.width -= data.Texture.width ;
        this.m_model.Behavior.setBounds(data.Area) ;
    }

    /**
     * @brief   Update the view to fit model data.
     */
    private updateView(): void {
        this.m_view.moveAt(this.m_model.Behavior.CurrentPosition) ;
    }

    /**
     * @brief   Update the Player.
     */
    public update(): void {
        if (this.m_model != undefined) {
            this.m_model.Behavior.update() ;
        }
    }

    /**
     * @brief   Move the Player on left.
     */
    public moveLeft(): void {
        if (this.m_model != undefined) {
            this.m_model.Behavior.moveLeft() ;
        }
    }

    /**
     * @brief   Move the Player on right.
     */
    public moveRight(): void {
        if (this.m_model != undefined) {
            this.m_model.Behavior.moveRight() ;
        }
    }

    /**
     * @brief   Make the Player jump.
     */
    public jump(): void {
        if (this.m_model != undefined) {
            this.m_model.jump() ;
        }
    }

    /**
     * @brief   Get the view of the Player.
     * @return  View of the Player.
     */
    public get View(): PlayerViewModule.PlayerView {
        return this.m_view ;
    }
}
