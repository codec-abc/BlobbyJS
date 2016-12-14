import ResourcesModule = require('../GameResources') ;
let Resources = ResourcesModule.GameResources ;

/**
 * @brief   Graphical representation of the Net.
 */
export class NetView {
    /** @brief  Event sent when the Net data are loaded. */
    public static get NetLoadedEvent() : string {
        return 'NetLoaded' ;
    }

    /** @brief  Path to the sprite texture of the Net. */
    public static get NetPath(): string {
        return Resources.ImagesFolder + '/bg/net.png' ;
    }

    /** @brief  Sprite of the Net. */
    private m_netSprite: PIXI.Sprite ;

    /**
     * @brief  Create a new instance of the BallView.
     * @param   texture     Texture of the BallView.
     * @param   position    Position of the BallView sprite when created.
     */
    constructor(
                texture: PIXI.Texture,
                position: PIXI.Point
               ) {
        this.m_netSprite = new PIXI.Sprite(texture) ;

        this.m_netSprite.position.x = position.x ;
        this.m_netSprite.position.y = position.y ;
    }

    /** @brief  Preload net textures in order to synchronize loadings. */
    public static PreloadSprites() : void {
        var assetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        assetsLoader.add('Net', NetView.NetPath) ;
        assetsLoader.once('complete', NetView.OnAssetsLoaded) ;
        assetsLoader.load() ;
    }

    /**
     * @brief   Send an event to the game view once all resources on NetView
     *          are loaded.
     */
    private static OnAssetsLoaded() : void {
        dispatchEvent(new Event(NetView.NetLoadedEvent)) ;
    }

    /**
     * @brief   Get sprite of the Net.
     * @return  Sprite of the Net.
     */
    public get NetSprite(): PIXI.Sprite {
        return this.m_netSprite ;
    }
}
