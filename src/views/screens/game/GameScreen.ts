import ScreenBase = require('../Screen');
import GameSceneModule = require('./GameScene');

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
    }
} ;

/**
 * @brief   JQuery main function.
 */
$(document).ready(function() {
    var screen : GameScreen ;
    screen = new GameScreen() ;
}) ;
