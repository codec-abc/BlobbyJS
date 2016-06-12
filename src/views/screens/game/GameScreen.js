"use strict";
const ScreenBase = require('../Screen');
const GameSceneModule = require('./GameScene');
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
        this.setupControls();
    }
    setupControls() {
        var firstPlayer = this.m_scene.PlayerA;
        this.addKeyboardCallback(Keyboard.LeftArrow, firstPlayer.moveLeft.bind(firstPlayer));
        this.addKeyboardCallback(Keyboard.RightArrow, firstPlayer.moveRight.bind(firstPlayer));
        var secondPlayer = this.m_scene.PlayerB;
        this.addKeyboardCallback(Keyboard.Key_S, secondPlayer.moveLeft.bind(secondPlayer));
        this.addKeyboardCallback(Keyboard.Key_F, secondPlayer.moveRight.bind(secondPlayer));
    }
}
;
$(document).ready(function () {
    var screen;
    screen = new GameScreen();
});
