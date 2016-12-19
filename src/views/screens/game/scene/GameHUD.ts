import SceneDataModule = require('./SceneData');

import ResourcesModule = require('../GameResources') ;
let Resources = ResourcesModule.GameResources ;

/**
 * @brief   Class to manage the HUD on the game screen.
 */
export class GameHUD extends PIXI.Container {
    /** @brief  Event sent when the foreground is loaded. */
    public static get HUDLoadedEvent() : string {
        return 'GameHUDLoaded' ;
    }

    /** Scoring of the left player. */
    private m_leftScoring: PIXI.Text ;

    /** Scoring of the right player. */
    private m_rightScoring: PIXI.Text ;

    /**
     * Create the HUD of the game.
     * @param  {number} sceneWidth Width of the scene.
     */
    constructor(sceneWidth: number) {
        super() ;

        var assetsLoader: PIXI.loaders.Loader = new PIXI.loaders.Loader() ;
        assetsLoader.add("SomeTimeLater", Resources.FontsFolder + "/SomeTimeLater.otf") ;
        assetsLoader.once("complete", this.onLoadedFonts.bind(this, sceneWidth)) ;
        assetsLoader.load() ;
    }

    /**
     * Create elements of the HUD that depend on loaded resources.
     * @param {number} sceneWidth Width of the scene.
     */
    private onLoadedFonts(sceneWidth: number): void {
        const TextOffset: number = 20 ;

        // Set the style of the scores.
        var style: Object = { font : "32px SomeTimeLater", fill: "white", };

        // Set the texts of the scores.
        this.m_leftScoring = new PIXI.Text("Player 1", style) ;
        this.m_leftScoring.position.set(TextOffset, TextOffset) ;
        this.addChild(this.m_leftScoring) ;

        this.m_rightScoring = new PIXI.Text("Player 2", style) ;
        this.m_rightScoring.position.set(
            sceneWidth - TextOffset - this.m_rightScoring.width,
            TextOffset
        ) ;
        this.addChild(this.m_rightScoring) ;

        // Notify the HUD is loaded and ready to be updated/rendered.
        dispatchEvent(new Event(GameHUD.HUDLoadedEvent)) ;
    }
}
