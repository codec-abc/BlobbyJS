/// <reference path="../../../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../../../typings/pixi/pixi.js.d.ts"/>

// import PlayerModule = require('../../../models/players/Player');
// import BallModule = require('../../../models/balls/Ball');
// import Background = require('./GameBackground');
import ResourcesModule = require('../GameResources') ;
let Resources = ResourcesModule.GameResources ;
//
//
export class GameScene extends PIXI.Container {
//     /** @brief  Event sent when the scene is loaded. */
//     public static get SceneLoadedEvent() : string {
//         return 'SceneLoaded' ;
//     }
//
//     /** @brief  Event sent when the scene is loaded. */
//     public static get PlayersLoadedEvent() : string {
//         return 'PlayersLoaded' ;
//     }
//
//     /** @brief  Baseline of players and ball from the bottom of viewport. */
//     private static get Offset() : number {
//         return 32 ;
//     }
//
//
//     /** @brief  Size of the scene. */
//     private m_size: PIXI.Point ;
//
//     /** @brief  Renders the scene. */
//     private m_renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer ;
//
//     /** @brief  Background of the scene. */
//     private m_background: Background.GameBackground ;
//
//
//     /** @brief  First player. */
//     private m_playerA: PlayerModule.Player ;
//
//     /** @brief  Second player. */
//     private m_playerB: PlayerModule.Player ;
//
//     /** @brief  Ball that players try to send to their respective opponent. */
//     private m_ball: BallModule.Ball ;
//
//
//     private m_textScorePlayerA: PIXI.Text ;
//     private m_textScorePlayerB: PIXI.Text ;
//
//     private m_ballIndicator: PIXI.Graphics ;
//
//
//     /**
//      * @brief   Create a new GameScene.
//      */
//     constructor() {
//         super() ;
//
//         this.m_size = new PIXI.Point() ;
//         this.m_size.x = $(window).innerWidth() ;
//         this.m_size.y = $(window).innerHeight() ;
//         this.m_renderer = PIXI.autoDetectRenderer(this.m_size.x, this.m_size.y) ;
//
//         this.setBackground() ;
//
//         // Background contains important elements for players and ball bounds
//         // definition.
//         // As background is asynchonously loaded, an event is required here.
//         addEventListener(
//                          Background.GameBackground.BackgroundLoadedEvent,
//                          this.onBackgroundLoaded.bind(this)
//                         ) ;
//
//         this.setScoreTexts() ;
//
//        addEventListener("pointEnded", () => {this.resetPositions();});
//
//        this.m_ballIndicator = new PIXI.Graphics() ;
//        this.m_ballIndicator.beginFill(0xFFFFFF) ;
//        this.m_ballIndicator.drawCircle(0, 12, 4) ;
//        this.addChild(this.m_ballIndicator) ;
//     }
//
//     /**
//      * @brief   Continue stting up the scene once the background is loaded.
//      * @param   e   Event that is sent by the background.
//      */
//     private onBackgroundLoaded(e: Event) : void {
//         e.stopPropagation() ;
//
//         var parentContainer: JQuery = $('body') ;
//         parentContainer.append(this.m_renderer.view) ;
//         PlayerModule.Player.PreloadSprites() ;
//
//         addEventListener(
//                          PlayerModule.Player.PlayersLoadedEvent,
//                          this.onPlayersLoaded.bind(this)
//                         ) ;
//     }
//     private onPlayersLoaded(e: Event) : void {
//         e.stopPropagation() ;
//
//         this.setPlayers() ;
//         this.setBall() ;
//         dispatchEvent(new Event(GameScene.SceneLoadedEvent)) ;
//
//         requestAnimationFrame(this.animate.bind(this)) ;
//     }
//
//     private setScoreTexts() : void {
//         this.m_textScorePlayerA = new PIXI.Text('0') ;
//         this.m_textScorePlayerA.x = 30 ;
//         this.m_textScorePlayerA.y = 30 ;
//         this.addChild(this.m_textScorePlayerA) ;
//
//         this.m_textScorePlayerB = new PIXI.Text('0') ;
//         this.m_textScorePlayerB.x = this.m_renderer.width -30 ;
//         this.m_textScorePlayerB.y = 30 ;
//         this.addChild(this.m_textScorePlayerB) ;
//     }
//
//     /**
//      * @brief   Set the background picture of the scene.
//      */
//     private setBackground() : void {
//         this.m_renderer.backgroundColor = 0x0A9BFC ;
//         var backgroundSize: PIXI.Point = new PIXI.Point(
//                                                         this.m_size.x,
//                                                         this.m_size.y
//                                                        ) ;
//
//         this.m_background = new Background.GameBackground(backgroundSize) ;
//         this.addChild(this.m_background) ;
//     }
//
//     /**
//      * @brief   Set the players in the scene.
//      */
//     private setPlayers() : void {
//         var playerBaseline: number = $(window).innerHeight() - GameScene.Offset ;
//         var playerBounds: number = ($(window).innerWidth() / 4) - this.m_background.NetData.Width / 2  ;
//
//         // First player at the left position.
//         var playerAPosX: number = (this.m_renderer.width * 0.25) ;
//         var playerAPosition: PIXI.Point = new PIXI.Point(playerAPosX, playerBaseline) ;
//
//         // var playerAImage: string = Resources.ImagesFolder + '/FirstPlayer.png' ;
//         this.m_playerA = new PlayerModule.Player(PlayerModule.Player.PlayerAPath, playerAPosition, playerBounds) ;
//         this.addChild(this.m_playerA) ;
//
//         // Second player at the right position.
//         var playerBPosX: number = (this.m_renderer.width * 0.75) ;
//         var playerBPosition: PIXI.Point = new PIXI.Point(playerBPosX, playerBaseline) ;
//
//         // var playerBImage: string = Resources.ImagesFolder + '/SecondPlayer.png' ;
//         this.m_playerB = new PlayerModule.Player(PlayerModule.Player.PlayerBPath, playerBPosition, playerBounds) ;
//         this.addChild(this.m_playerB) ;
//     }
//
//     /**
//      * @brief   Set the ball in the scene.
//      */
//     private setBall() : void {
//         var playerBaseline: number = $(window).innerHeight() - GameScene.Offset ;
//         var ballBounds: number = $(window).innerWidth() ;
//         var ballImage: string = Resources.ImagesFolder + '/Ball.png' ;
//
//         this.m_ball = new BallModule.Ball(
//                                           ballImage,
//                                           new PIXI.Point(ballBounds, playerBaseline)
//                                          ) ;
//         this.resetBallPosition();
//         this.addChild(this.m_ball) ;
//     }
//
//     private resetBallPosition() : void {
//         var totalScore : number= this.m_playerA.Behavior.Score + this.m_playerB.Behavior.Score;
//
//         if (totalScore % 2 == 0) {
//             // Put ball above Player A to start match.
//             this.m_ball.position.x = this.m_playerA.position.x ;
//         }
//         else {
//             // Put ball above Player B to start match.
//             this.m_ball.position.x = this.m_playerB.position.x ;
//         }
//
//         this.m_ball.position.y = GameScene.Offset * 8 ;
//     }
//
//     private resetPositions() : void {
//         this.m_textScorePlayerA.text = this.m_playerA.Behavior.Score.toString() ;
//         this.m_textScorePlayerB.text = this.m_playerB.Behavior.Score.toString() ;
//
//         this.m_playerA.resetPosition();
//         this.m_playerB.resetPosition();
//         this.resetBallPosition();
//     }
//
//     /**
//      * @brief   Update the animation of the scene.
//      */
//     private animate() : void {
//         requestAnimationFrame(this.animate.bind(this)) ;
//
//         this.m_playerA.update() ;
//         this.m_playerB.update() ;
//         this.m_ball.update(
//                            this.m_playerA,
//                            this.m_playerB,
//                            this.m_background.NetData
//                           ) ;
//
//         if (this.m_ball.position.y < 0) {
//             this.m_ballIndicator.position.x = this.m_ball.position.x ;
//             this.m_ballIndicator.visible = true ;
//         }
//         else {
//             this.m_ballIndicator.visible = false ;
//         }
//
//         this.m_renderer.render(this) ;
//     }
//
//     /**
//      * @brief   Get the first player.
//      */
//     public get PlayerA() : PlayerModule.Player {
//         return this.m_playerA ;
//     }
//
//     /**
//      * @brief   Get the second player.
//      */
//     public get PlayerB() : PlayerModule.Player {
//         return this.m_playerB ;
//     }
} ;
