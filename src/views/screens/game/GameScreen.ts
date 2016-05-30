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

    /** @brief  Box that is moved with keyboard. */
    private m_boxA: Matter.Body ;

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
        this.m_boxA = Bodies.rectangle(400, 540, 80, 80);
        this.m_boxA.isStatic = true ;
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        boxB.isStatic = true ;
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // Add all of the bodies to the world.
        World.add(this.m_engine.world, [this.m_boxA, boxB, ground]) ;

        // Run the engine.
        Engine.run(this.m_engine) ;
    }

    /**
     * @brief   Set up controls (keyboard, mouse).
     */
    private setupControls() : void {
        this.addKeyboardCallback(
                                 Keyboard.LeftArrow,
                                 this.testMoveBoxLeft.bind(this)) ;

        this.addKeyboardCallback(
                                 Keyboard.RightArrow,
                                 this.testMoveBoxRight.bind(this)) ;
    }


    /** @brief  Just a test. */
    private testMoveBoxLeft() : void {
        var force: Matter.Vector ;
        force = Matter.Vector.create(-7, 0) ;
        Matter.Body.translate(this.m_boxA, force) ;
    }

    /** @brief  Just a test. */
    private testMoveBoxRight() : void {
        var force: Matter.Vector ;
        force = Matter.Vector.create(7, 0) ;
        Matter.Body.translate(this.m_boxA, force) ;
    }
} ;

/**
 * @brief   JQuery main function.
 */
$(document).ready(function() {
    var screen : GameScreen ;
    screen = new GameScreen() ;
}) ;
