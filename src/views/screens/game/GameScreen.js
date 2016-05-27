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
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        World.add(this.m_engine.world, [boxA, boxB, ground]);
        Engine.run(this.m_engine);
    }
    setupControls() {
        this.addKeyboardCallback(Keyboard.Escape, function () {
            alert('Hi, it is Echap key test!');
        });
    }
}
;
$(document).ready(function () {
    var screen;
    screen = new GameScreen();
});
