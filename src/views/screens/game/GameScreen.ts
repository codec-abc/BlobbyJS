import ScreenBase = require('../Screen');
import GameSceneModule = require('./GameScene');
import PlayerModule = require('../../../models/players/Player');

import ControlsManager = require('../../ControlsManager');
let Controls = ControlsManager.ControlsManager ;
let Keyboard = ControlsManager.KeyboardControl ;
let Mouse = ControlsManager.MouseControl ;

/**
 * @brief   Game screen in which players can play.
 */
class GameScreen extends ScreenBase.Screen {
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
        this.setupControls() ;
    }

    /**
     * @brief   Set up controls (keyboard, mouse).
     */
    private setupControls() : void {
        var firstPlayer: PlayerModule.Player = this.m_scene.PlayerA ;
        this.addKeyboardCallback(
                                 Keyboard.LeftArrow,
                                 firstPlayer.moveLeft.bind(firstPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.RightArrow,
                                 firstPlayer.moveRight.bind(firstPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.UpArrow,
                                 firstPlayer.jump.bind(firstPlayer)
                                ) ;


        var secondPlayer: PlayerModule.Player = this.m_scene.PlayerB ;
        this.addKeyboardCallback(
                                 Keyboard.Key_S,
                                 secondPlayer.moveLeft.bind(secondPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.Key_F,
                                 secondPlayer.moveRight.bind(secondPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.Key_E,
                                 secondPlayer.jump.bind(secondPlayer)
                                ) ;
    }
} ;

/**
 * @brief   JQuery main function.
 */
$(document).ready(function() {
    var screen : GameScreen ;
    screen = new GameScreen() ;
}) ;
