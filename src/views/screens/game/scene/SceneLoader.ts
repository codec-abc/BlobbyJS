/// <reference path="../../../../../typings/pixi/pixi.js.d.ts"/>

import SceneDataModule = require('./SceneData');
import GameForegroundModule = require('./GameForeground');

export class GameSceneLoader {
    /** @brief  Event sent when the scene is loaded. */
    public static get SceneLoadedEvent() : string {
        return 'SceneLoaded' ;
    }

    /** @brief  Flag to know if foreground is loaded. */
    private m_isLoadedForeground: boolean = false ;

    /** @brief  Foreground of the scene (players, ball, etc). */
    private m_foreground: GameForegroundModule.GameForeground ;

    /**
     * @brief   Create the GameSceneLoader.
     * @param   sceneData   Data required to generate the scene.
     */
    constructor(sceneData: SceneDataModule.SceneData) {
        this.loadForeground(sceneData) ;
    }

    /**
     * @brief   Load the foreground.
     * @param   sceneData   Data required to generate the scene.
     */
    private loadForeground(sceneData: SceneDataModule.SceneData): void {
        this.m_foreground = new GameForegroundModule.GameForeground(sceneData) ;
        const ForegroundLoaded: string = GameForegroundModule.GameForeground.ForegroundLoadedEvent ;
        addEventListener(ForegroundLoaded, this.onLoadedForeground.bind(this)) ;
    }

    /**
     * @brief   Trigger operations once foreground is fully loaded.
     */
    private onLoadedForeground(): void {
        this.m_isLoadedForeground = true ;
        this.notifyIfSceneLoaded() ;
    }

    /**
     * @brief   Notify listeners that the scene has been fully loaded.
     * */
    private notifyIfSceneLoaded(): void {
        if (this.m_isLoadedForeground) {
            // Notify the scene is loaded.
            dispatchEvent(new Event(GameSceneLoader.SceneLoadedEvent)) ;
        }
    }

    /** @brief  Foreground of the scene. */
    public get Foreground(): GameForegroundModule.GameForeground {
        return this.m_foreground ;
    }
} ;
