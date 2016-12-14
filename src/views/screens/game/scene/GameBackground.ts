import ElementDataModule = require('../../../../models/utils/ElementData');
let ElementData = ElementDataModule.ElementData ;

import ResourcesModule = require('../GameResources') ;
let Resources = ResourcesModule.GameResources ;

import NetViewModule = require('../interactive/NetView');
import NetControllerModule = require('../../../../controllers/NetController');

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
        return Resources.ImagesFolder + '/bg/bg.png'
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
     * @brief   The net that can have interactions with the ball and players.
     */
     private m_net: NetControllerModule.NetController ;

    /**
     * @brief   Create a new GameBackground.
     * @param   width   Width of the scene.
     * @param   height  Height of the scene.
     */
    constructor(width: number, height: number) {
        super() ;
        this.m_viewportSize = new PIXI.Point(width, height) ;

        var bgAssetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        bgAssetsLoader.add('Ground', GameBackground.GroundTexturePath) ;
        bgAssetsLoader.once('complete', this.onAssetsLoaded.bind(this)) ;
        bgAssetsLoader.load() ;
    }

    /**
     * @brief   Callback when assets are loaded.
     */
    private onAssetsLoaded() : void {
        this.setGround() ;
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

        NetViewModule.NetView.PreloadSprites() ;
        addEventListener(
            NetViewModule.NetView.NetLoadedEvent,
            this.setNet.bind(this)
        ) ;
    }

    /**
     * @brief   Set the net texture.
     */
    private setNet() : void {
        // Texture of the net.
        var netTexture: PIXI.Texture = PIXI.Texture.fromImage(GameBackground.NetTexturePath) ;

        // Position of the net.
        var netPosition: PIXI.Point = new PIXI.Point(
            (this.m_viewportSize.x / 2) - netTexture.width,
            this.m_viewportSize.y - netTexture.height - 20
        ) ;

        // Setup the net.
        var data: NetControllerModule.NetSetupData ;
        data = new NetControllerModule.NetSetupData(netPosition, netTexture) ;
        this.m_net = new NetControllerModule.NetController(data) ;

        this.addChild(this.m_net.View.NetSprite) ;

    }
} ;
