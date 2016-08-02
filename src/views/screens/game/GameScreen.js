"use strict";
const ScreenBase = require('../Screen');
const GameSceneModule = require('./scene/GameScene');
const GameSceneLoaderModule = require('./scene/SceneLoader');
const ControlsManager = require('../../ControlsManager');
let Controls = ControlsManager.ControlsManager;
let Keyboard = ControlsManager.KeyboardControl;
let Mouse = ControlsManager.MouseControl;
class GameScreen extends ScreenBase.Screen {
    constructor() {
        super();
    }
    setup() {
        this.m_scene = new GameSceneModule.GameScene();
        addEventListener(GameSceneLoaderModule.GameSceneLoader.SceneLoadedEvent, this.onSceneLoaded.bind(this));
    }
    onSceneLoaded() {
        this.setupControls();
    }
    setupControls() {
        var leftPlayer = this.m_scene.LeftPlayer;
        this.addKeyboardCallback(Keyboard.Key_S, leftPlayer.moveLeft.bind(leftPlayer));
        this.addKeyboardCallback(Keyboard.Key_F, leftPlayer.moveRight.bind(leftPlayer));
        this.addKeyboardCallback(Keyboard.Key_E, leftPlayer.jump.bind(leftPlayer));
        var rightPlayer = this.m_scene.RightPlayer;
        this.addKeyboardCallback(Keyboard.LeftArrow, rightPlayer.moveLeft.bind(rightPlayer));
        this.addKeyboardCallback(Keyboard.RightArrow, rightPlayer.moveRight.bind(rightPlayer));
        this.addKeyboardCallback(Keyboard.UpArrow, rightPlayer.jump.bind(rightPlayer));
    }
}
;
$(document).ready(function () {
    var screen;
    screen = new GameScreen();
});
