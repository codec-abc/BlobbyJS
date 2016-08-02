import SceneDataModule = require('./SceneData');
import PlayerViewModule = require('../interactive/PlayerView');
import PlayerControllerModule = require('../../../../controllers/PlayerController');
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
    }

    /**
     * @brief   Creation of the Players when their relative data are fully
     *          loaded.
     */
    private onLoadedPlayers() : void {
        const sceneWidth: number = this.m_sceneData.Width ;
        const halfSceneWidth: number = sceneWidth / 2 ;
        const positionXStep: number = halfSceneWidth / 2 ;
        const positionY: number = this.m_sceneData.Height - SceneDataModule.SceneData.PlayersOffset ;

        // Set up the left player.
        {
            const texturePlayer = PlayerViewModule.PlayerView.LeftPlayerPath ;

            let playerData: PlayerControllerModule.PlayerSetupData ;
            playerData = GameForeground.PlayerData ;

            playerData.Position = new PIXI.Point(positionXStep, positionY) ;
            playerData.Area = new PIXI.Rectangle(0, 0, halfSceneWidth, positionXStep) ;
            playerData.Texture = PIXI.Texture.fromImage(texturePlayer) ;
            this.m_leftPlayer = new PlayerControllerModule.PlayerController(playerData) ;
            this.addChild(this.m_leftPlayer.View.Sprite) ;
        }

        // Set up the right player.
        {
            const texturePlayer = PlayerViewModule.PlayerView.RightPlayerPath ;

            let playerData: PlayerControllerModule.PlayerSetupData ;
            playerData = GameForeground.PlayerData ;

            playerData.Position = new PIXI.Point(positionXStep * 3, positionY) ;
            playerData.Area = new PIXI.Rectangle(halfSceneWidth, 0, halfSceneWidth, positionXStep) ;
            playerData.Texture = PIXI.Texture.fromImage(texturePlayer) ;
            this.m_rightPlayer = new PlayerControllerModule.PlayerController(playerData) ;
            this.addChild(this.m_rightPlayer.View.Sprite) ;
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
        //@TODO: Update ball too.
    }
} ;
