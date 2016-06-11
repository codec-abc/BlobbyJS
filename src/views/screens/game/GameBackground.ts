/**
 * @brief   Class to manage the background of the game screen.
 */
export class GameBackground extends PIXI.Container {
    /** @brief  Path to resources. */
    public static get ResourcesFolder() { return '../../../../resources' ; } ;

    /** @brief  Ratio height / width on the background. */
    private m_heightWidthRatio: number ;

    /**
     * @brief   Create a new GameBackground.
     */
    constructor() {
        super() ;

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

        const resources: string = GameBackground.ResourcesFolder ;
        var groundTexture: PIXI.Texture = PIXI.Texture.fromImage(resources + '/img/bg/sand.png') ;
        groundTexture.scaleMode = PIXI.SCALE_MODES.LINEAR ;

        if (groundTexture.baseTexture.hasLoaded) {
            this.onTextureUpdated(groundTexture) ;
        }
        else {
            groundTexture.addListener('update', this.onTextureUpdated.bind(this)) ;
        }
    }

    /**
     * @brief   Callback when a texture is loaded.
     */
    private onTextureUpdated(texture: PIXI.Texture) : void {
        var sprite: PIXI.Sprite = new PIXI.Sprite(texture) ;
        this.addChild(sprite) ;

        this.m_heightWidthRatio = texture.height / texture.width ;
    }

    /**
     * @brief   Update the background on resize.
     */
    public updateOnResize(width: number, height: number) {
        this.width = width ;
        this.height = height * this.m_heightWidthRatio ;

        var bgHeight: number = this.height ;
        this.position.y = height - bgHeight ;
    }
} ;
