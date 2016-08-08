/// <reference path="../../../../typings/jquery/jquery.d.ts"/>

import ScreenBase = require('../Screen');
import GameSceneModule = require('./scene/GameScene');
import GameSceneLoaderModule = require('./scene/SceneLoader');

import ControlsManager = require('../../ControlsManager');
let Controls = ControlsManager.ControlsManager ;
let Keyboard = ControlsManager.KeyboardControl ;
let Mouse = ControlsManager.MouseControl ;

import PlayerControllerModule = require('../../../controllers/PlayerController');

/**
 * @brief   Game screen in which players can play.
 */
class GameScreen extends ScreenBase.Screen {
    /**
     * @brief   Scene of the game stage.
     */
    private m_scene: GameSceneModule.GameScene ;

    /**
     * @brief   Creation of the GameScreen.
     */
    constructor() {
        super() ;
    }

    /**
     * @brief   Set up the screen.
     */
    protected setup() : void {
        this.m_scene = new GameSceneModule.GameScene() ;

        addEventListener(
                         GameSceneLoaderModule.GameSceneLoader.SceneLoadedEvent,
                         this.onSceneLoaded.bind(this)
                        ) ;
    }

    /**
     * @brief   Set up controls once the scene is loaded.
     */
    private onSceneLoaded() : void {
        this.setupControls() ;
    }

    /**
     * @brief   Set up controls (keyboard, mouse).
     */
    private setupControls() : void {
        var leftPlayer: PlayerControllerModule.PlayerController = this.m_scene.LeftPlayer ;
        this.addKeyboardCallback(
                                 Keyboard.Key_S,
                                 leftPlayer.moveLeft.bind(leftPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.Key_F,
                                 leftPlayer.moveRight.bind(leftPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.Key_E,
                                 leftPlayer.jump.bind(leftPlayer)
                                ) ;


        var rightPlayer: PlayerControllerModule.PlayerController = this.m_scene.RightPlayer ;
        this.addKeyboardCallback(
                                 Keyboard.LeftArrow,
                                 rightPlayer.moveLeft.bind(rightPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.RightArrow,
                                 rightPlayer.moveRight.bind(rightPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.UpArrow,
                                 rightPlayer.jump.bind(rightPlayer)
                                ) ;
    }
} ;

export {GameScreen};