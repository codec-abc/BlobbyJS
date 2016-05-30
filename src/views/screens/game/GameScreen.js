"use strict";
const PlayerModule = require('../../../models/Player');
let Player = PlayerModule.Player;
const ScreenBase = require('../Screen');
let Screen = ScreenBase.Screen;
const ControlsManager = require('../../ControlsManager');
let Controls = ControlsManager.ControlsManager;
let Keyboard = ControlsManager.KeyboardControl;
let Mouse = ControlsManager.MouseControl;
let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
class GameScreen extends Screen {
    constructor() {
        super();
    }
    setup() {
        this.setupPhysics();
        this.setupControls();
    }
    setupPhysics() {
        this.m_engine = Engine.create(document.getElementById('GameScreen'));
        const playersSize = Matter.Vector.create(60, 80);
        const playersSpeed = 7;
        var firstPlayerPos = Matter.Vector.create(300, 540);
        this.m_firstPlayer = new Player(firstPlayerPos, playersSize, playersSpeed);
        this.m_firstPlayer.registerToPhysicsEngine(this.m_engine.world);
        var secondPlayerPos = Matter.Vector.create(600, 540);
        this.m_secondPlayer = new Player(firstPlayerPos, playersSize, playersSpeed);
        this.m_secondPlayer.registerToPhysicsEngine(this.m_engine.world);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        World.addBody(this.m_engine.world, ground);
        Engine.run(this.m_engine);
    }
    setupControls() {
        var firstPlayer = this.m_firstPlayer;
        this.addKeyboardCallback(Keyboard.LeftArrow, firstPlayer.moveLeft.bind(firstPlayer));
        this.addKeyboardCallback(Keyboard.RightArrow, firstPlayer.moveRight.bind(firstPlayer));
    }
}
;
$(document).ready(function () {
    var screen;
    screen = new GameScreen();
});
