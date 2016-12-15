import ResourcesModule = require('../GameResources') ;
let Resources = ResourcesModule.GameResources ;

import GeometryModule = require('../../../../utils/Geometry') ;
let Geometry = GeometryModule.Geometry ;

/**
 * @brief   Graphical representation of the Ball.
 */
export class BallView {
    /** @brief  Event sent when the ball data are loaded. */
    public static get BallLoadedEvent() : string {
        return 'BallLoaded' ;
    }

    /** @brief  Base rotation speed. */
    private static get BaseRotationSpeed(): number { return 0.01 ; }

    /** @brief  Path to the sprite texture of the ball. */
    public static get BallPath(): string {
        return Resources.ImagesFolder + '/Ball.png' ;
    }

    /** @brief  Sprite of the Ball. */
    private m_ballSprite: PIXI.Sprite ;


    /**
     * @brief  Create a new instance of the BallView.
     * @param   texture     Texture of the BallView.
     * @param   position    Position of the BallView sprite when created.
     */
    constructor(
                texture: PIXI.Texture,
                position: PIXI.Point
               ) {
        this.m_ballSprite = new PIXI.Sprite(texture) ;
        this.m_ballSprite.pivot = Geometry.GetCenter(this.m_ballSprite.getLocalBounds()) ;
        this.moveAt(position) ;
    }

    /** @brief  Preload ball textures in order to synchronize loadings. */
    public static PreloadSprites() : void {
        var assetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        assetsLoader.add('FirstPlayer', BallView.BallPath) ;
        assetsLoader.once('complete', BallView.OnAssetsLoaded) ;
        assetsLoader.load() ;
    }

    /**
     * @brief   Send an event to the game view once all resources on BallView
     *          are loaded.
     */
    private static OnAssetsLoaded() : void {
        dispatchEvent(new Event(BallView.BallLoadedEvent)) ;
    }

    /**
     * @brief   Move the sprite of the BallView at the given position.
     * @param   position    Position of the ball.
     */
    public moveAt(position: PIXI.Point) : void {
        this.m_ballSprite.position.x = position.x ;
        this.m_ballSprite.position.y = position.y ;
    }

    /**
     * Rotate the sprite of the ball.
     * @param {number} angle Angle to apply to the sprite.
     */
    public rotate(angle: number) : void {
        this.m_ballSprite.rotation = angle ;
    }

    /**
     * @brief   Get sprite of the Ball.
     * @return  Sprite of the Ball.
     */
    public get BallSprite(): PIXI.Sprite {
        return this.m_ballSprite ;
    }
} ;
