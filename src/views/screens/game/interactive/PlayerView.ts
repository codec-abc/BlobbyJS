import ResourcesModule = require('../GameResources') ;
let Resources = ResourcesModule.GameResources ;


/**
 * @brief   Graphical representation of a Player.
 */
export class PlayerView {
    /** @brief  Event sent when the players data are loaded. */
    public static get PlayersLoadedEvent() : string {
        return 'PlayersLoaded' ;
    }

    /** @brief  Path to the sprite texture of the left player. */
    public static get LeftPlayerPath(): string {
        return Resources.ImagesFolder + '/LeftPlayer.png' ;
    }

    /** @brief  Path to the sprite texture of the right player. */
    public static get RightPlayerPath(): string {
        return Resources.ImagesFolder + '/RightPlayer.png' ;
    }

    /** @brief  Offset to apply to the shadow on X axis. */
    private static ShadowXOffset: number ;

    /** @brief  Sprite of the Player. */
    private m_playerSprite: PIXI.Sprite ;

    /** @brief  Sprite of the shadow for the current Player. */
    private m_shadowSprite: PIXI.Sprite ;

    /**
     * @brief  Create a new instance of the PlayerView.
     * @param   texture     Texture of the PlayerView.
     * @param   position    Position of the PlayerView sprite when created.
     */
    constructor(
                texture: PIXI.Texture,
                position: PIXI.Point
               ) {
        this.m_playerSprite = new PIXI.Sprite(texture) ;
        this.m_shadowSprite = new PIXI.Sprite(Resources.ShadowTexture) ;
        this.m_shadowSprite.position.y = position.y + (this.m_playerSprite.height * 0.62) ;

        this.moveAt(position) ;
    }

    /** @brief  Preload players textures in order to synchronize loadings. */
    public static PreloadSprites() : void {
        var assetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        assetsLoader.add('FirstPlayer', PlayerView.LeftPlayerPath) ;
        assetsLoader.add('SecondPlayer', PlayerView.RightPlayerPath) ;
        assetsLoader.add('Shadow', Resources.ShadowPath) ;
        assetsLoader.once('complete', PlayerView.OnAssetsLoaded) ;
        assetsLoader.load() ;
    }

    /**
     * @brief   Send an event to the game view once all resources on PlayerViews
     *          are loaded.
     */
    private static OnAssetsLoaded() : void {
        Resources.ShadowTexture = PIXI.Texture.fromImage(Resources.ShadowPath) ;
        PlayerView.ShadowXOffset = Resources.ShadowTexture.width / 3.5 ;
        dispatchEvent(new Event(PlayerView.PlayersLoadedEvent)) ;
    }

    /**
     * @brief   Move the sprite of the PlayerView at the given position.
     * @param   position    Position of the sprite.
     */
    public moveAt(position: PIXI.Point) : void {
        this.m_playerSprite.position.x = position.x ;
        this.m_playerSprite.position.y = position.y ;

        // Adjust the shadow sprite position to the player sprite.
        this.m_shadowSprite.position.x = position.x - PlayerView.ShadowXOffset ;
        this.m_shadowSprite.alpha = this.m_shadowSprite.alpha = Math.max(0.2, position.y / this.m_shadowSprite.position.y) ;
    }

    /**
     * @brief   Get sprite of the Player.
     * @return  Sprite of the Player.
     */
    public get PlayerSprite(): PIXI.Sprite {
        return this.m_playerSprite ;
    }

    /**
     * @brief   Get sprite of the Player shadow.
     * @return  Sprite of the Player shadow.
     */
    public get ShadowSprite(): PIXI.Sprite {
        return this.m_shadowSprite ;
    }
} ;
