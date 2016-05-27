/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../../typings/matter/matter-js.d.ts"/>

import ScreenBase = require('../Screen');
let Screen = ScreenBase.Screen ;

import ControlsManager = require('../../ControlsManager');
let Controls = ControlsManager.ControlsManager ;
let Keyboard = ControlsManager.KeyboardControl ;
let Mouse = ControlsManager.MouseControl ;

let Engine = Matter.Engine ;
let World = Matter.World ;
let Bodies = Matter.Bodies ;

/**
 * @brief   Game screen in which players can play.
 */
class GameScreen extends Screen {
    /** @brief  Matter.JS engine mainly used for physics simulation. */
    private m_engine: Matter.Engine ;

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
        this.setupPhysics() ;
        this.setupControls() ;
    }

    /**
     * @brief   Set up the physics engine.
     */
    private setupPhysics() : void {
        // Create a Matter.js engine.
        this.m_engine = Engine.create(document.getElementById('GameScreen')) ;

        // Create two boxes and a ground.
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // Add all of the bodies to the world.
        World.add(this.m_engine.world, [boxA, boxB, ground]) ;

        // Run the engine.
        Engine.run(this.m_engine) ;
    }

    /**
     * @brief   Set up controls (keyboard, mouse).
     */
    private setupControls() : void {
        this.addKeyboardCallback(
                                 Keyboard.Escape,
                                 function() { alert('Hi, it is Echap key test!');
                                }) ;
    }
} ;

/**
 * @brief   JQuery main function.
 */
$(document).ready(function() {
    var screen : GameScreen ;
    screen = new GameScreen() ;
}) ;
