/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../../typings/matter/matter-js.d.ts"/>

import PlayerModule = require('../../../models/Player');
let Player = PlayerModule.Player ;

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

    /** @brief  First Player. */
    private m_firstPlayer: PlayerModule.Player ;

    /** @brief  Second Player. */
    private m_secondPlayer: PlayerModule.Player ;

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

        // Create players.
        const playersSize: Matter.Vector = Matter.Vector.create(60, 80) ;
        const playersSpeed: number = 7 ;

        var firstPlayerPos: Matter.Vector = Matter.Vector.create(300, 540) ;
        this.m_firstPlayer = new Player(firstPlayerPos, playersSize, playersSpeed) ;
        this.m_firstPlayer.registerToPhysicsEngine(this.m_engine.world) ;

        var secondPlayerPos: Matter.Vector = Matter.Vector.create(600, 540) ;
        this.m_secondPlayer = new Player(firstPlayerPos, playersSize, playersSpeed) ;
        this.m_secondPlayer.registerToPhysicsEngine(this.m_engine.world) ;

        // Create ground.
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // Add all of the bodies to the world.
        World.addBody(this.m_engine.world, ground) ;

        // Run the engine.
        Engine.run(this.m_engine) ;
    }

    /**
     * @brief   Set up controls (keyboard, mouse).
     */
    private setupControls() : void {
        var firstPlayer: PlayerModule.Player = this.m_firstPlayer ;

        this.addKeyboardCallback(
                                 Keyboard.LeftArrow,
                                 firstPlayer.moveLeft.bind(firstPlayer)
                                ) ;

        this.addKeyboardCallback(
                                 Keyboard.RightArrow,
                                 firstPlayer.moveRight.bind(firstPlayer)
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
