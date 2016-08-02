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


    /** @brief  Sprite of the Player. */
    private m_sprite: PIXI.Sprite ;

    /**
     * @brief  Create a new instance of the PlayerView.
     * @param   texture     Texture of the PlayerView.
     * @param   position    Position of the PlayerView sprite when created.
     */
    constructor(
                texture: PIXI.Texture,
                position: PIXI.Point
               ) {
        this.m_sprite = new PIXI.Sprite(texture) ;
        this.moveAt(position) ;
    }


    /** @brief  Preload players textures in order to synchronize loadings. */
    public static PreloadSprites() : void {
        var assetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        assetsLoader.add('FirstPlayer', PlayerView.LeftPlayerPath) ;
        assetsLoader.add('SecondPlayer', PlayerView.RightPlayerPath) ;
        assetsLoader.once('complete', PlayerView.OnAssetsLoaded) ;
        assetsLoader.load() ;
    }

    /**
     * @brief   Send an event to the game view once all resources on PlayerViews
     *          are loaded.
     */
    private static OnAssetsLoaded() : void {
        dispatchEvent(new Event(PlayerView.PlayersLoadedEvent)) ;
    }

    /**
     * @brief   Move the sprite of the PlayerView at the given position.
     * @param   position    Position of the sprite.
     */
    public moveAt(position: PIXI.Point) : void {
        this.m_sprite.position.x = position.x ;
        this.m_sprite.position.y = position.y ;
    }

    /**
     * @brief   Get the sprite of the Player.
     * @return  Sprite of the Player.
     */
    public get Sprite(): PIXI.Sprite {
        return this.m_sprite ;
    }
} ;
