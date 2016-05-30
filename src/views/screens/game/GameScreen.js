"use strict";
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
        this.m_boxA = Bodies.rectangle(400, 540, 80, 80);
        this.m_boxA.isStatic = true;
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        boxB.isStatic = true;
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        World.add(this.m_engine.world, [this.m_boxA, boxB, ground]);
        Engine.run(this.m_engine);
    }
    setupControls() {
        this.addKeyboardCallback(Keyboard.LeftArrow, this.testMoveBoxLeft.bind(this));
        this.addKeyboardCallback(Keyboard.RightArrow, this.testMoveBoxRight.bind(this));
    }
    testMoveBoxLeft() {
        var force;
        force = Matter.Vector.create(-7, 0);
        Matter.Body.translate(this.m_boxA, force);
    }
    testMoveBoxRight() {
        var force;
        force = Matter.Vector.create(7, 0);
        Matter.Body.translate(this.m_boxA, force);
    }
}
;
$(document).ready(function () {
    var screen;
    screen = new GameScreen();
});
