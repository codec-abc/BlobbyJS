import ElementDataModule = require('../../../../utils/ElementData');
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
        return Resources.ImagesFolder + '/bg/bg.png'
    } ;

    /**
     * @brief   Size of the viewport, used to set background elements at their
     *          right position.
     */
    private m_viewportSize: PIXI.Point ;

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
    }
} ;
