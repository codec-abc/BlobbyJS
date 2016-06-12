import ResourcesModule = require('./GameResources') ;
let Resources = ResourcesModule.GameResources ;

/**
 * @brief   Class to manage the background of the game screen.
 */
export class GameBackground extends PIXI.Container {
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
     * @brief   Create a new GameBackground.
     */
    constructor(viewportSize: PIXI.Point) {
        super() ;
        this.m_viewportSize = viewportSize ;

        // TODO: When several images for background will have to be loaded:
        // var assetsToLoad = [ "stone.png"];
        // // create a new loader
        // loader = new PIXI.AssetLoader(assetsToLoad);
        // // use callback
        // loader.onComplete = onAssetsLoaded
        // //begin load
        // loader.load();
        //
        // function onAssetsLoaded()
        // {
        //       var texture = PIXI.Texture.fromImage("stone.png");
        //       var sprite  = new PIXI.Sprite(texture);
        //       // this will log the correct width and height as the image was preloaded into the pixi.js cache
        //       console.log(stone.width + ', ' + stone.height);
        // }
        const images: string = Resources.ImagesFolder ;

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
        var sprite: PIXI.Sprite = new PIXI.Sprite(texture) ;
        this.addChild(sprite) ;
        sprite.position.x = (this.m_viewportSize.x - texture.baseTexture.width) / 2 ;
        sprite.position.y = this.m_viewportSize.y - texture.baseTexture.height - 12 ;
    }
} ;
