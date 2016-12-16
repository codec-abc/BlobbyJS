/// <reference path="../../../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../../../typings/pixi/pixi.js.d.ts"/>

import SceneDataModule = require('./SceneData');
import SceneLoaderModule = require('./SceneLoader');
import GameForegroundModule = require('./GameForeground');
import ResourcesModule = require('../GameResources') ;
import PlayerControllerModule = require('../../../../controllers/PlayerController');
import PhysicsEngineModule = require('../../../../models/physics/PhysicsEngine');

let Resources = ResourcesModule.GameResources ;
let PhysicsEngine = PhysicsEngineModule.PhysicsEngine ;

/**
 * @brief   Scene of the game stage.
 */
export class GameScene extends PIXI.Container {
    /**
     * Get the initial width of the scene.
     * @return {number} Initial width of the scene.
     */
    private static get InitialWidth(): number { return 1024; }

    /**
     * Get the initial height of the scene.
     * @return {number} Initial height of the scene.
     */
    private static get InitialHeight(): number { return 640; }

    /**
     * Get the ratio to correctly render the renderer.
     * @return {number} Ratio width / height of the scene.
     */
    private static get Ratio(): number { return GameScene.InitialWidth / GameScene.InitialHeight; }


    /** @brief  Shared scene data. */
    private m_sceneData: SceneDataModule.SceneData ;

    /** @brief  Scene loader. */
    private m_sceneLoader: SceneLoaderModule.GameSceneLoader ;

    /** @brief  Renders the scene. */
    private m_renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer ;

    /** @brief  The physics engine to update all physics objects. */
    private m_physicsEngine: PhysicsEngineModule.PhysicsEngine ;

    /**
     * @brief   Create a new GameScene.
     */
    constructor() {
        super() ;

        var width: number = GameScene.InitialWidth ;
        var height: number =  GameScene.InitialHeight ;
        this.m_physicsEngine = new PhysicsEngineModule.PhysicsEngine() ;
        this.m_sceneData = new SceneDataModule.SceneData(width, height) ;
        this.m_sceneLoader = new SceneLoaderModule.GameSceneLoader(this.m_sceneData) ;
        addEventListener(
                         SceneLoaderModule.GameSceneLoader.SceneLoadedEvent,
                         this.onSceneLoaded.bind(this)
                        ) ;

        this.m_renderer = PIXI.autoDetectRenderer(width, height) ;
        $(window).resize(this.onResizedWindow.bind(this)) ;
        this.onResizedWindow() ;

        var parentContainer: JQuery = $('#GameCanvas') ;
        parentContainer.append(this.m_renderer.view) ;
    }

    private onResizedWindow(): void {
        var currentRatio: number = $(window).innerWidth() / $(window).innerHeight() ;
        if (currentRatio >= GameScene.Ratio) {
            var width = $(window).innerHeight() * GameScene.Ratio ;
            var height = $(window).innerHeight() ;
        }
        else {
            var width = $(window).innerWidth() ;
            var height = $(window).innerWidth() / GameScene.Ratio ;
        }
        this.m_renderer.view.style.width = width + 'px' ;
        this.m_renderer.view.style.height = height + 'px' ;
    }

    /**
     * @brief   Callback when scene is loaded.
     */
    private onSceneLoaded(): void {
        this.addChild(this.m_sceneLoader.Background) ;
        this.addChild(this.m_sceneLoader.Foreground) ;

        requestAnimationFrame(this.animate.bind(this)) ;
    }

    /**
     * @brief   Update the animation of the scene.
     */
    private animate(): void {
        this.m_physicsEngine.update() ;

        this.m_sceneLoader.Foreground.update() ;
        this.m_renderer.render(this) ;
        requestAnimationFrame(this.animate.bind(this)) ;
    }


   /*
    * @brief   Get the left player.
    */
   public get LeftPlayer(): PlayerControllerModule.PlayerController {
       return this.m_sceneLoader.Foreground.LeftPlayer ;
   }

   /*
    * @brief   Get the right player.
    */
   public get RightPlayer(): PlayerControllerModule.PlayerController {
       return this.m_sceneLoader.Foreground.RightPlayer ;
   }
} ;
