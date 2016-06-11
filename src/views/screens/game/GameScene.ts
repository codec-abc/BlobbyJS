/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../../typings/pixi/pixi.js.d.ts"/>

import Background = require('./GameBackground');

// import ControlsManager = require('../../ControlsManager');
// let Controls = ControlsManager.ControlsManager ;
// let Keyboard = ControlsManager.KeyboardControl ;
// let Mouse = ControlsManager.MouseControl ;

export class GameScene {
    /** @brief  Contains graphics elements. */
    private m_scene: PIXI.Container ;

    /** @brief  Background of the scene. */
    private m_background: Background.GameBackground ;

    /** @brief  Renders the scene. */
    private m_renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer ;

    /**
     * @brief   Create a new GameScene.
     */
    constructor() {
        var parentContainer: JQuery = $('body') ;

        this.m_scene = new PIXI.Container() ;
        this.m_renderer = PIXI.autoDetectRenderer(320, 240) ;

        parentContainer.append(this.m_renderer.view) ;
        this.animate() ;
        this.setBackground() ;

        var self : GameScene = this ;
        $(window).on('resize', self.resize.bind(self)) ;
    }

    /**
     * @brief   Set the background picture of the scene.
     */
    private setBackground() : void {
        this.m_renderer.backgroundColor = 0x0A9BFC ;

        this.m_background = new Background.GameBackground() ;
        this.m_scene.addChild(this.m_background) ;

        var bgHeight: number = this.m_background.height ;
        this.m_background.position.y = $(window).innerHeight() - bgHeight ;
    }

    /**
     * @brief   Update the animation of the scene.
     */
    private animate() : void {
        requestAnimationFrame(this.animate.bind(this)) ;
        this.m_renderer.render(this.m_scene) ;
    }

    /**
     * @brief   Resize the scene renderer.
     */
    private resize() : void {
        var windowWidth: number = $(window).innerWidth() ;
        var windowHeight: number = $(window).innerHeight() ;
        this.m_renderer.resize(windowWidth, windowHeight) ;
        this.m_background.updateOnResize(windowWidth, windowHeight) ;
    }

    // /**
    //  * @brief   Set up controls (keyboard, mouse).
    //  */
    // private setupControls() : void {
    //     var firstPlayer: PlayerModule.Player = this.m_firstPlayer ;
    //
    //     this.addKeyboardCallback(
    //                              Keyboard.LeftArrow,
    //                              firstPlayer.moveLeft.bind(firstPlayer)
    //                             ) ;
    //
    //     this.addKeyboardCallback(
    //                              Keyboard.RightArrow,
    //                              firstPlayer.moveRight.bind(firstPlayer)
    //                             ) ;
    // }
} ;
