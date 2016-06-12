/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../../typings/pixi/pixi.js.d.ts"/>

import PlayerModule = require('../../../models/players/Player');
import Background = require('./GameBackground');
import ResourcesModule = require('./GameResources') ;
let Resources = ResourcesModule.GameResources ;

export class GameScene extends PIXI.Container {
    /** @brief  Size of the scene. */
    private m_size: PIXI.Point ;

    /** @brief  Renders the scene. */
    private m_renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer ;

    /** @brief  Background of the scene. */
    private m_background: Background.GameBackground ;

    /** @brief  First player. */
    private m_playerA: PlayerModule.Player ;

    /** @brief  Second player. */
    private m_playerB: PlayerModule.Player ;


    /**
     * @brief   Create a new GameScene.
     */
    constructor() {
        super() ;

        this.m_size = new PIXI.Point() ;
        this.m_size.x = $(window).innerWidth() ;
        this.m_size.y = $(window).innerHeight() ;

        var parentContainer: JQuery = $('body') ;
        this.m_renderer = PIXI.autoDetectRenderer(this.m_size.x, this.m_size.y) ;

        parentContainer.append(this.m_renderer.view) ;
        requestAnimationFrame(this.animate.bind(this)) ;

        this.setBackground() ;
        this.setPlayers() ;
    }

    /**
     * @brief   Set the background picture of the scene.
     */
    private setBackground() : void {
        this.m_renderer.backgroundColor = 0x0A9BFC ;
        var backgroundSize: PIXI.Point = new PIXI.Point(
                                                        this.m_size.x,
                                                        this.m_size.y
                                                       ) ;

        this.m_background = new Background.GameBackground(backgroundSize) ;
        this.addChild(this.m_background) ;
    }

    /**
     * @brief   Set the players in the scene.
     */
    private setPlayers() : void {
        var playerBaseline: number = $(window).innerHeight() - 32 ;
        var playerBounds: number = $(window).innerWidth() / 4 ;

        // First player at the left position.
        var playerAPosX: number = (this.m_renderer.width * 0.25) ;
        var playerAPosition: PIXI.Point = new PIXI.Point(playerAPosX, playerBaseline) ;

        var playerAImage: string = Resources.ImagesFolder + '/FirstPlayer.png' ;
        this.m_playerA = new PlayerModule.Player(playerAImage, playerAPosition, playerBounds) ;
        this.addChild(this.m_playerA) ;

        // Second player at the right position.
        var playerBPosX: number = (this.m_renderer.width * 0.75) ;
        var playerBPosition: PIXI.Point = new PIXI.Point(playerBPosX, playerBaseline) ;

        var playerBImage: string = Resources.ImagesFolder + '/SecondPlayer.png' ;
        this.m_playerB = new PlayerModule.Player(playerBImage, playerBPosition, playerBounds) ;
        this.addChild(this.m_playerB) ;
    }

    /**
     * @brief   Update the animation of the scene.
     */
    private animate() : void {
        requestAnimationFrame(this.animate.bind(this)) ;
        this.m_renderer.render(this) ;
    }

    /**
     * @brief   Get the first player.
     */
    public get PlayerA() : PlayerModule.Player {
        return this.m_playerA ;
    }

    /**
     * @brief   Get the second player.
     */
    public get PlayerB() : PlayerModule.Player {
        return this.m_playerB ;
    }
} ;
