"use strict";
const ScreenBase = require('../Screen');
const GameSceneModule = require('./GameScene');
class GameScreen extends ScreenBase.Screen {
    constructor() {
        super();
    }
    setup() {
        this.m_scene = new GameSceneModule.GameScene();
    }
}
;
$(document).ready(function () {
    var screen;
    screen = new GameScreen();
});
