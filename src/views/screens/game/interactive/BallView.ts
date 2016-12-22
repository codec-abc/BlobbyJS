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

    /** @brief  Offset to apply to the shadow on X axis. */
    private static ShadowXOffset: number ;

    /** @brief  Position on Y axis of the Ball on ground. */
    private m_yOnGround: number ;

    /** @brief  Sprite of the Ball. */
    private m_ballSprite: PIXI.Sprite ;

    /** @brief  Sprite of the shadow for the Ball. */
    private m_shadowSprite: PIXI.Sprite ;


    /**
     * @brief  Create a new instance of the BallView.
     * @param   texture     Texture of the BallView.
     * @param   position    Position of the BallView sprite when created.
     */
    constructor(
                texture: PIXI.Texture,
                position: PIXI.Point
               ) {
        this.m_yOnGround = position.y ;

        this.m_ballSprite = new PIXI.Sprite(texture) ;
        this.m_ballSprite.pivot = Geometry.GetCenter(this.m_ballSprite.getLocalBounds()) ;

        this.m_shadowSprite = new PIXI.Sprite(Resources.ShadowTexture) ;
        this.m_shadowSprite.position.y = position.y - (this.m_ballSprite.width / 2) ;

        this.moveAt(position) ;
    }

    /** @brief  Preload ball textures in order to synchronize loadings. */
    public static PreloadSprites() : void {
        var assetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        assetsLoader.add('Ball', BallView.BallPath) ;
        assetsLoader.add('Shadow', Resources.ShadowPath) ;
        assetsLoader.once('complete', BallView.OnAssetsLoaded.bind(this)) ;
        assetsLoader.load() ;
    }

    /**
     * @brief   Send an event to the game view once all resources on BallView
     *          are loaded.
     */
    private static OnAssetsLoaded() : void {
        BallView.ShadowXOffset = Resources.ShadowTexture.width / 2 ;
        dispatchEvent(new Event(BallView.BallLoadedEvent)) ;
    }

    /**
     * @brief   Move the sprite of the BallView at the given position.
     * @param   position    Position of the ball.
     */
    public moveAt(position: PIXI.Point) : void {
        this.m_ballSprite.position.x = position.x ;
        this.m_ballSprite.position.y = position.y ;

        this.m_shadowSprite.position.x = this.m_ballSprite.position.x - BallView.ShadowXOffset ;

        this.m_shadowSprite.alpha = position.y / this.m_yOnGround ;
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

    /**
     * @brief   Get sprite of the Player shadow.
     * @return  Sprite of the Player shadow.
     */
    public get ShadowSprite(): PIXI.Sprite {
        return this.m_shadowSprite ;
    }
} ;
