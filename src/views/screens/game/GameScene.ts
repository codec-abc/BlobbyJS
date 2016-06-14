/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../../typings/pixi/pixi.js.d.ts"/>

import PlayerModule = require('../../../models/players/Player');
import BallModule = require('../../../models/balls/Ball');
import Background = require('./GameBackground');
import ResourcesModule = require('./GameResources') ;
let Resources = ResourcesModule.GameResources ;

export class GameScene extends PIXI.Container {
    /** @brief  Event sent when the scene is loaded. */
    public static get SceneLoadedEvent() : string {
        return 'SceneLoaded' ;
    }

    /** @brief  Baseline of players and ball from the bottom of viewport. */
    private static get Offset() : number {
        return 32 ;
    }


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

    /** @brief  Ball that players try to send to their respective opponent. */
    private m_ball: BallModule.Ball ;


    /**
     * @brief   Create a new GameScene.
     */
    constructor() {
        super() ;

        this.m_size = new PIXI.Point() ;
        this.m_size.x = $(window).innerWidth() ;
        this.m_size.y = $(window).innerHeight() ;
        this.m_renderer = PIXI.autoDetectRenderer(this.m_size.x, this.m_size.y) ;

        this.setBackground() ;

        // Background contains important elements for players and ball bounds
        // definition.
        // As background is asynchonously loaded, an event is required here.
        addEventListener(
                         Background.GameBackground.BackgroundLoadedEvent,
                         this.onBackgroundLoaded.bind(this)
                        ) ;
    }

    /**
     * @brief   Continue stting up the scene once the background is loaded.
     * @param   e   Event that is sent by the background.
     */
    private onBackgroundLoaded(e: Event) : void {
        e.stopPropagation() ;

        this.setPlayers() ;
        this.setBall() ;

        var parentContainer: JQuery = $('body') ;
        parentContainer.append(this.m_renderer.view) ;
        requestAnimationFrame(this.animate.bind(this)) ;

        dispatchEvent(new Event(GameScene.SceneLoadedEvent)) ;
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
        var playerBaseline: number = $(window).innerHeight() - GameScene.Offset ;
        var playerBounds: number = ($(window).innerWidth() / 4) - this.m_background.NetBounds.width / 2  ;

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
     * @brief   Set the ball in the scene.
     */
    private setBall() : void {
        var playerBaseline: number = $(window).innerHeight() - GameScene.Offset ;
        var ballBounds: number = $(window).innerWidth() ;
        var ballImage: string = Resources.ImagesFolder + '/Ball.png' ;

        this.m_ball = new BallModule.Ball(
                                          ballImage,
                                          new PIXI.Point(ballBounds, playerBaseline)
                                         ) ;

        // Set the ball position.
        const PowerRand: number = 1000 ;
        var rand: number = (Math.random() * PowerRand) ;
        if (rand > (PowerRand / 2)) {
            // Put ball above Player A to start match.
            this.m_ball.position.x = this.m_playerA.position.x ;
        }
        else {
            // Put ball above Player B to start match.
            this.m_ball.position.x = this.m_playerB.position.x ;
        }

        this.m_ball.position.y = GameScene.Offset * 3 ;

        this.addChild(this.m_ball) ;
    }

    /**
     * @brief   Update the animation of the scene.
     */
    private animate() : void {
        requestAnimationFrame(this.animate.bind(this)) ;
        this.m_ball.update() ;
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
