import SceneDataModule = require('./SceneData');
import PlayerViewModule = require('../interactive/PlayerView');
import PlayerControllerModule = require('../../../../controllers/PlayerController');
import BallViewModule = require('../interactive/BallView');
import BallControllerModule = require('../../../../controllers/BallController');
import IUpdatableModule = require('../../../interfaces/IUpdatable');

export class GameForeground extends PIXI.Container
                            implements IUpdatableModule.IUpdatable {
    /** @brief  Event sent when the foreground is loaded. */
    public static get ForegroundLoadedEvent() : string {
        return 'ForegroundLoaded' ;
    }


    /** @brief  Shared scene data. */
    private m_sceneData: SceneDataModule.SceneData ;

    /** @brief  Player on the left side of the screen. */
    private m_leftPlayer: PlayerControllerModule.PlayerController ;

    /** @brief  Player on the right side of the screen. */
    private m_rightPlayer: PlayerControllerModule.PlayerController ;

    /** @brief  Volley ball. */
    private m_ball: BallControllerModule.BallController ;

    /**
     * @brief   Create a new instance of GameForeground.
     */
    constructor(data: SceneDataModule.SceneData) {
        super() ;

        this.m_sceneData = data ;

        PlayerViewModule.PlayerView.PreloadSprites() ;
        addEventListener(
                         PlayerViewModule.PlayerView.PlayersLoadedEvent,
                         this.onLoadedPlayers.bind(this)
                        ) ;

        BallViewModule.BallView.PreloadSprites() ;
        addEventListener(
                         BallViewModule.BallView.BallLoadedEvent,
                         this.onLoadedBall.bind(this)
                        ) ;
    }

    /**
     * @brief   Creation of the Players when their relative data are fully
     *          loaded.
     */
    private onLoadedPlayers() : void {
        const SceneWidth: number = this.m_sceneData.Width ;
        const HalfSceneWidth: number = SceneWidth / 2 ;
        const PositionXStep: number = HalfSceneWidth / 2 ;
        const PositionY: number = this.m_sceneData.Height - SceneDataModule.SceneData.PlayersOffset ;

        // Set up the left player.
        {
            const TexturePlayer: string = PlayerViewModule.PlayerView.LeftPlayerPath ;

            let playerData: PlayerControllerModule.PlayerSetupData ;
            playerData = GameForeground.PlayerData ;

            playerData.Position = new PIXI.Point(PositionXStep, PositionY) ;
            playerData.Area = new PIXI.Rectangle(0, 0, HalfSceneWidth, PositionXStep) ;
            playerData.Texture = PIXI.Texture.fromImage(TexturePlayer) ;
            this.m_leftPlayer = new PlayerControllerModule.PlayerController(playerData) ;
            this.addChild(this.m_leftPlayer.View.PlayerShadowSprite) ;
            this.addChild(this.m_leftPlayer.View.PlayerSprite) ;
        }

        // Set up the right player.
        {
            const TexturePlayer = PlayerViewModule.PlayerView.RightPlayerPath ;

            let playerData: PlayerControllerModule.PlayerSetupData ;
            playerData = GameForeground.PlayerData ;

            playerData.Position = new PIXI.Point(PositionXStep * 3, PositionY) ;
            playerData.Area = new PIXI.Rectangle(HalfSceneWidth, 0, HalfSceneWidth, PositionXStep) ;
            playerData.Texture = PIXI.Texture.fromImage(TexturePlayer) ;
            this.m_rightPlayer = new PlayerControllerModule.PlayerController(playerData) ;
            this.addChild(this.m_rightPlayer.View.PlayerShadowSprite) ;
            this.addChild(this.m_rightPlayer.View.PlayerSprite) ;
        }

        // Notify the foreground is loaded and ready to be updated/rendered.
        dispatchEvent(new Event(GameForeground.ForegroundLoadedEvent)) ;
    }

    /**
     * @brief   Get a Player data.
     * @return  A new Player data.
     */
    private static get PlayerData(): PlayerControllerModule.PlayerSetupData {
        let playerData: PlayerControllerModule.PlayerSetupData ;
        playerData = new PlayerControllerModule.PlayerSetupData() ;
        playerData.SpeedFactor = 1 ;
        playerData.MaxScore = 15 ;
        return playerData ;
    }

    /**
    * @brief   Creation of the Ball when its data are loaded.
    */
    private onLoadedBall() : void {
        const PositionY: number = this.m_sceneData.Height - SceneDataModule.SceneData.PlayersOffset ;
        const BallPosition: PIXI.Point = new PIXI.Point(250, 120) ;
        const BallTexture: string = BallViewModule.BallView.BallPath ;

        let ballData: BallControllerModule.BallSetupData ;
        ballData = new BallControllerModule.BallSetupData() ;
        ballData.Position = BallPosition ;
        ballData.SpeedFactor = 5 ;
        ballData.Area = new PIXI.Rectangle(
                                           0, 0,
                                           this.m_sceneData.Width, PositionY
                                          ) ;

        this.m_ball = new BallControllerModule.BallController(ballData) ;
        this.addChild(this.m_ball.View.BallSprite) ;
    }

    /**
     * @brief   Get the left player.
     */
    public get LeftPlayer(): PlayerControllerModule.PlayerController {
        return this.m_leftPlayer ;
    }

    /**
     * @brief   Get the right player.
     */
    public get RightPlayer(): PlayerControllerModule.PlayerController {
        return this.m_rightPlayer ;
    }

    /**
     * @brief   Update the object.
     */
    public update(): void {
        this.m_leftPlayer.update() ;
        this.m_rightPlayer.update() ;
        this.m_ball.update() ;
    }
} ;
