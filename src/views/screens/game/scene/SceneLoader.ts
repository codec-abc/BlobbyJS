/// <reference path="../../../../../typings/pixi/pixi.js.d.ts"/>

import SceneDataModule = require('./SceneData');
import GameForegroundModule = require('./GameForeground');
import GameBackgroundModule = require('./GameBackground');
import GameHUDModule = require('./GameHUD');

export class GameSceneLoader {
    /** @brief  Event sent when the scene is loaded. */
    public static get SceneLoadedEvent() : string {
        return 'SceneLoaded' ;
    }

    /** @brief  Flag to know if foreground is loaded. */
    private m_isLoadedForeground: boolean = false ;

    /** @brief  Foreground of the scene (players, ball, etc). */
    private m_foreground: GameForegroundModule.GameForeground ;

    /** @brief  Flag to know if background is loaded. */
    private m_isLoadedBackground: boolean = false ;

    /** @brief  Background of the scene (players, ball, etc). */
    private m_background: GameBackgroundModule.GameBackground ;

    /** @brief  Flag to know if background is loaded. */
    private m_isLoadedHUD: boolean = false ;

    /** @brief  HUD of the scene (scores, etc). */
    private m_hud: GameHUDModule.GameHUD ;

    /**
     * @brief   Create the GameSceneLoader.
     * @param   sceneData   Data required to generate the scene.
     */
    constructor(sceneData: SceneDataModule.SceneData) {
        this.loadBackground(sceneData) ;
        this.loadForeground(sceneData) ;
        this.loadHUD(sceneData) ;
    }

    /**
     * @brief   Load the foreground.
     * @param   sceneData   Data required to generate the scene.
     */
    private loadForeground(sceneData: SceneDataModule.SceneData): void {
        const ForegroundLoaded: string = GameForegroundModule.GameForeground.ForegroundLoadedEvent ;
        addEventListener(ForegroundLoaded, this.onLoadedForeground.bind(this)) ;
        this.m_foreground = new GameForegroundModule.GameForeground(sceneData) ;
    }

    /**
     * @brief   Trigger operations once foreground is fully loaded.
     */
    private onLoadedForeground(): void {
        this.m_isLoadedForeground = true ;
        this.notifyIfSceneLoaded() ;

        const ForegroundLoaded: string = GameForegroundModule.GameForeground.ForegroundLoadedEvent ;
        removeEventListener(ForegroundLoaded, this.onLoadedForeground.bind(this)) ;
    }

    /**
     * @brief   Load the background.
     * @param   sceneData   Data required to generate the scene.
     */
    private loadBackground(sceneData: SceneDataModule.SceneData): void {
        const BackgroundLoaded: string = GameBackgroundModule.GameBackground.BackgroundLoadedEvent ;
        addEventListener(BackgroundLoaded, this.onLoadedBackground.bind(this)) ;
        this.m_background = new GameBackgroundModule.GameBackground(sceneData.Width, sceneData.Height) ;
    }

    /**
     * @brief   Trigger operations once foreground is fully loaded.
     */
    private onLoadedBackground(): void {
        this.m_isLoadedBackground = true ;
        this.notifyIfSceneLoaded() ;

        const BackgroundLoaded: string = GameBackgroundModule.GameBackground.BackgroundLoadedEvent ;
        removeEventListener(BackgroundLoaded, this.onLoadedBackground.bind(this)) ;
    }

    /**
     * @brief   Load the game HUD.
     * @param   sceneData   Data required to generate the scene.
     */
    private loadHUD(sceneData: SceneDataModule.SceneData): void {
        const HUDLoaded: string = GameHUDModule.GameHUD.HUDLoadedEvent ;
        addEventListener(HUDLoaded, this.onLoadedHUD.bind(this)) ;
        this.m_hud = new GameHUDModule.GameHUD(sceneData.Width) ;
    }

    /**
     * @brief   Trigger operations once HUD is fully loaded.
     */
    private onLoadedHUD(): void {
        this.m_isLoadedHUD = true ;
        this.notifyIfSceneLoaded() ;

        const HUDLoaded: string = GameHUDModule.GameHUD.HUDLoadedEvent ;
        removeEventListener(HUDLoaded, this.onLoadedHUD.bind(this)) ;
    }

    /**
     * @brief   Notify listeners that the scene has been fully loaded.
     * */
    private notifyIfSceneLoaded(): void {
        if (this.m_isLoadedForeground
                && this.m_isLoadedBackground
                && this.m_isLoadedHUD) {
            // Notify the scene is loaded.
            dispatchEvent(new Event(GameSceneLoader.SceneLoadedEvent)) ;
        }
    }

    /** @brief  Foreground of the scene. */
    public get Foreground(): GameForegroundModule.GameForeground {
        return this.m_foreground ;
    }

    /** @brief  Background of the scene. */
    public get Background(): GameBackgroundModule.GameBackground {
        return this.m_background ;
    }

    /** @brief  HUD of the scene. */
    public get HUD(): GameHUDModule.GameHUD {
        return this.m_hud ;
    }
} ;
