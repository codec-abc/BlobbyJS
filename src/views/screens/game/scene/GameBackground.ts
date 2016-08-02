import ElementDataModule = require('../../../../models/utils/ElementData');
let ElementData = ElementDataModule.ElementData ;

import ResourcesModule = require('../GameResources') ;
let Resources = ResourcesModule.GameResources ;

/**
 * @brief   Class to manage the background of the game screen.
 */
export class GameBackground extends PIXI.Container {
    /** @brief  Event sent when the background is loaded. */
    public static get BackgroundLoadedEvent() : string {
        return 'BackgroundLoaded' ;
    }

    /** @brief  Path to the ground texture. */
    private static get GroundTexturePath() : string {
        return Resources.ImagesFolder + '/bg/sand.png'
    } ;

    /** @brief  Path to the net texture. */
    private static get NetTexturePath() : string {
        return Resources.ImagesFolder + '/bg/net.png'
    } ;

    /**
     * @brief   Size of the viewport, used to set background elements at their
     *          right position.
     */
    private m_viewportSize: PIXI.Point ;

    /**
     * @brief   Sprite of the net that can have interactions with the ball and
     *          players.
     */
    private m_net: PIXI.Sprite ;

    /** @brief  Some data on the net element. */
    private m_netData: ElementDataModule.ElementData ;

    /**
     * @brief   Create a new GameBackground.
     */
    constructor(viewportSize: PIXI.Point) {
        super() ;
        this.m_viewportSize = viewportSize ;

        var bgAssetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        bgAssetsLoader.add('Ground', GameBackground.GroundTexturePath) ;
        bgAssetsLoader.add('Net', GameBackground.NetTexturePath) ;
        bgAssetsLoader.once('complete', this.onAssetsLoaded.bind(this)) ;
        bgAssetsLoader.load() ;
    }

    /**
     * @brief   Callback when assets are loaded.
     */
    private onAssetsLoaded() : void {
        this.setGround() ;
        this.setNet() ;

        dispatchEvent(new Event(GameBackground.BackgroundLoadedEvent)) ;
    }

    /**
     * @brief   Set the ground texture.
     */
    private setGround() : void {
        var texture: PIXI.Texture = PIXI.Texture.fromImage(GameBackground.GroundTexturePath) ;
        var sprite: PIXI.Sprite = new PIXI.Sprite(texture) ;
        this.addChild(sprite) ;
        sprite.position.y = this.m_viewportSize.y - texture.baseTexture.height ;
    }

    /**
     * @brief   Set the net texture.
     */
    private setNet() : void {
        var texture: PIXI.Texture = PIXI.Texture.fromImage(GameBackground.NetTexturePath) ;
        this.m_net = new PIXI.Sprite(texture) ;
        this.addChild(this.m_net) ;
        this.m_net.position.x = (this.m_viewportSize.x - texture.baseTexture.width) / 2 ;
        this.m_net.position.y = this.m_viewportSize.y - texture.baseTexture.height - 12 ;

        this.m_netData = new ElementData(
                                         this.m_net.position,
                                         this.m_net.width,
                                         this.m_net.height
                                        ) ;
    }

    /**
     * @brief   Get data on the net shape.
     */
    public get NetData() : ElementDataModule.ElementData {
        return this.m_netData ;
    }
} ;
