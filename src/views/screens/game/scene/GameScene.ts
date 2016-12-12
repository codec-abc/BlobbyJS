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

        var width: number = $(window).innerWidth() ;
        var height: number =  $(window).innerHeight() ;
        this.m_physicsEngine = new PhysicsEngineModule.PhysicsEngine() ;
        this.m_sceneData = new SceneDataModule.SceneData(width, height) ;
        this.m_sceneLoader = new SceneLoaderModule.GameSceneLoader(this.m_sceneData) ;
        addEventListener(
                         SceneLoaderModule.GameSceneLoader.SceneLoadedEvent,
                         this.onSceneLoaded.bind(this)
                        ) ;

        this.m_renderer = PIXI.autoDetectRenderer(width, height) ;

        var parentContainer: JQuery = $('#GameCanvas') ;
        parentContainer.append(this.m_renderer.view) ;
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
