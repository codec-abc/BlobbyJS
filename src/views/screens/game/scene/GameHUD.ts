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

    /** @brief  Default text on left. */
    public static get LeftScoreDefaultText() : string {
        return "Player #1" ;
    }

    /** @brief  Default text on right. */
    public static get RightScoreDefaultText() : string {
        return "Player #2" ;
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
        var textLeft: string = GameHUD.LeftScoreDefaultText + " 00" ;
        this.m_leftScoring = new PIXI.Text(textLeft, style) ;
        this.m_leftScoring.position.set(TextOffset, TextOffset) ;
        this.addChild(this.m_leftScoring) ;

        var textRight: string = GameHUD.RightScoreDefaultText + " 00" ;
        this.m_rightScoring = new PIXI.Text(textRight, style) ;
        this.m_rightScoring.position.set(
            sceneWidth - TextOffset - this.m_rightScoring.width,
            TextOffset
        ) ;
        this.addChild(this.m_rightScoring) ;

        // Notify the HUD is loaded and ready to be updated/rendered.
        dispatchEvent(new Event(GameHUD.HUDLoadedEvent)) ;
    }

    /**
     * @brief   Update the object.
     */
    public update(): void {
        this.m_leftScoring.text = GameHUD.LeftScoreDefaultText + " : " + "0" ;
        this.m_rightScoring.text = GameHUD.RightScoreDefaultText + " : " + "0" ;
    }
}
