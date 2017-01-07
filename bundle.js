/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/node/node.d.ts"/>
	"use strict";
	const GameScreen = __webpack_require__(1);
	let gameScreen = new GameScreen.GameScreen();
	window.gameScreen = gameScreen; // set the game in a gameScreen property for debugging purpose
	var isRunningInElectron = window.isRunningInElectron;
	var modules = window.nodeModules;
	if (isRunningInElectron) { }


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
	"use strict";
	const ScreenBase = __webpack_require__(2);
	const GameSceneModule = __webpack_require__(4);
	const GameSceneLoaderModule = __webpack_require__(6);
	const ControlsManager = __webpack_require__(3);
	let Controls = ControlsManager.ControlsManager;
	let Keyboard = ControlsManager.KeyboardControl;
	let Mouse = ControlsManager.MouseControl;
	/**
	 * @brief   Game screen in which players can play.
	 */
	class GameScreen extends ScreenBase.Screen {
	    /**
	     * @brief   Creation of the GameScreen.
	     */
	    constructor() {
	        super();
	    }
	    /**
	     * @brief   Set up the screen.
	     */
	    setup() {
	        this.m_scene = new GameSceneModule.GameScene();
	        addEventListener(GameSceneLoaderModule.GameSceneLoader.SceneLoadedEvent, this.onSceneLoaded.bind(this));
	        this.m_intervalHandle = setInterval(this.frameTick.bind(this), 1000 / 60);
	    }
	    /**
	     * @brief   Set up controls once the scene is loaded.
	     */
	    onSceneLoaded() {
	        this.setupControls();
	    }
	    frameTick() {
	        this.m_scene.update();
	        this.update();
	    }
	    /**
	     * @brief   Set up controls (keyboard, mouse).
	     */
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
	exports.GameScreen = GameScreen;
	;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const ControlsManager = __webpack_require__(3);
	let Controls = ControlsManager.ControlsManager;
	/**
	 * @brief   Abstract class that represents screens.
	 */
	class Screen {
	    /**
	     * @brief   Create a new Screen.
	     */
	    constructor() {
	        this.m_controls = new Controls();
	        this.setup();
	    }
	    /**
	     * @brief   Add control from keyboard.
	     * @param   key         Keyboard key to bind to an action.
	     * @param   callback    Function to be called when the key is pressed.
	     */
	    addKeyboardCallback(key, callback) {
	        this.m_controls.addKeyboardCallback(key, callback);
	    }
	    /**
	     * @brief   Add control from mouse.
	     * @param   mouse       Mouse button to bind to an action.
	     * @param   callback    Function to be called when the key is pressed.
	     */
	    addMouseCallback(mouse, callback) {
	        this.m_controls.addMouseCallback(mouse, callback);
	    }
	    /**
	     * @brief   Update the object.
	     */
	    update() {
	        this.m_controls.update();
	    }
	}
	exports.Screen = Screen;
	;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/// <reference path="../../typings/jquery/jquery.d.ts"/>
	"use strict";
	;
	class ControlsManager {
	    /**
	     * @brief   Creation of a ControlsManager.
	     */
	    constructor() {
	        /** @brief  List of all avalaible keyboard controls with their callback. */
	        this.m_keyboardCallbacks = {};
	        /** @brief  List of all avalaible mouse controls with their callback. */
	        this.m_mouseCallbacks = {};
	        /** @brief  List of active keyboard controls (key pressed). */
	        this.m_activeKeyboardControls = new Array();
	        /** @brief  List of active mouse controls (key pressed). */
	        this.m_activeMouseControls = new Array();
	        this.setupKeyboard();
	        this.setupMouse();
	    }
	    /**
	     * @brief   Set up keyboard controls.
	     */
	    setupKeyboard() {
	        var self = this;
	        // Only keydown is supported at the moment.
	        $(window).keydown(function (e) {
	            var controlCode = e.which;
	            var validControl;
	            validControl = ControlsManager.CheckValidKeyboardControl(controlCode);
	            if (validControl) {
	                var inArrayPos = self.m_activeKeyboardControls.indexOf(controlCode);
	                var controlCallback = self.m_keyboardCallbacks[controlCode];
	                var hasCallback = (controlCallback !== undefined);
	                // Insert value if not in array.
	                if (hasCallback && (inArrayPos < 0)) {
	                    self.m_activeKeyboardControls.push(controlCode);
	                }
	            }
	            e.preventDefault();
	        });
	        // Remove the key from the pressed ones when it is released.
	        $(window).keyup(function (e) {
	            var controlCode = e.which;
	            var inArrayPos = self.m_activeKeyboardControls.indexOf(controlCode);
	            if (inArrayPos > -1) {
	                // Erase the value.
	                self.m_activeKeyboardControls.splice(inArrayPos, 1);
	            }
	        });
	    }
	    /**
	     * @brief   Set up mouse controls.
	     */
	    setupMouse() {
	        var self = this;
	        // Mouse buttons.
	        $(window).mousedown(function (e) {
	            var controlCode = e.which;
	            var validControl;
	            validControl = ControlsManager.CheckValidMouseControl(controlCode);
	            if (validControl) {
	                var controlCallback;
	                controlCallback = self.m_mouseCallbacks[controlCode];
	                if (controlCallback != undefined) {
	                    controlCallback();
	                }
	            }
	        });
	    }
	    /**
	     * @brief   Loop to have smooth animations when using keyboard.
	     */
	    keyboardLoop() {
	        var self = this;
	        this.m_activeKeyboardControls.forEach(function (element, index, array) {
	            self.m_keyboardCallbacks[element]();
	        });
	    }
	    /**
	     * @brief   Update the object.
	     */
	    update() {
	        this.keyboardLoop();
	    }
	    /**
	     * @brief   Add a keyboard control with its callback.
	     * @param   key         Keyboard key to bind to an action.
	     * @param   callback    Function to be called when the key is pressed.
	     * @warning Replace the previous callback if already defined for the
	     *          provided control.
	     */
	    addKeyboardCallback(key, callback) {
	        this.m_keyboardCallbacks[key] = callback;
	    }
	    /**
	     * @brief   Add a mouse control with its callback.
	     * @param   mouse       Mouse button to bind to an action.
	     * @param   callback    Function to be called when the key is pressed.
	     * @warning Replace the previous callback if already defined for the
	     *          provided control.
	     */
	    addMouseCallback(mouse, callback) {
	        this.m_mouseCallbacks[mouse] = callback;
	    }
	    /**
	     * @brief   Check if the given value is defined in the keyboard controls
	     *          enumeration.
	     * @param   value   Value to check.
	     * @warning TRUE if the value exists, FALSE else.
	     */
	    static CheckValidKeyboardControl(value) {
	        return KeyboardControl[value] != undefined;
	    }
	    /**
	     * @brief   Check if the given value is defined in the mouse controls
	     *          enumeration.
	     * @param   value   Value to check.
	     * @warning TRUE if the value exists, FALSE else.
	     */
	    static CheckValidMouseControl(value) {
	        return MouseControl[value] != undefined;
	    }
	}
	exports.ControlsManager = ControlsManager;
	;
	/** @brief  Represent mouse button codes with more readable values. */
	var MouseControl;
	(function (MouseControl) {
	    MouseControl[MouseControl["LeftButton"] = 0] = "LeftButton";
	    MouseControl[MouseControl["MiddleButton"] = 1] = "MiddleButton";
	    MouseControl[MouseControl["RightButton"] = 2] = "RightButton";
	    MouseControl[MouseControl["AmountMouseControls"] = 3] = "AmountMouseControls";
	})(MouseControl = exports.MouseControl || (exports.MouseControl = {}));
	;
	/** @brief  Represent keyboard key codes with more readable values. */
	var KeyboardControl;
	(function (KeyboardControl) {
	    KeyboardControl[KeyboardControl["Backspace"] = 8] = "Backspace";
	    KeyboardControl[KeyboardControl["Tabulation"] = 9] = "Tabulation";
	    KeyboardControl[KeyboardControl["Enter"] = 13] = "Enter";
	    KeyboardControl[KeyboardControl["Shift"] = 16] = "Shift";
	    KeyboardControl[KeyboardControl["Ctrl"] = 17] = "Ctrl";
	    KeyboardControl[KeyboardControl["Alt"] = 18] = "Alt";
	    KeyboardControl[KeyboardControl["Escape"] = 27] = "Escape";
	    KeyboardControl[KeyboardControl["PageUp"] = 33] = "PageUp";
	    KeyboardControl[KeyboardControl["PageDown"] = 34] = "PageDown";
	    KeyboardControl[KeyboardControl["End"] = 35] = "End";
	    KeyboardControl[KeyboardControl["Home"] = 36] = "Home";
	    KeyboardControl[KeyboardControl["LeftArrow"] = 37] = "LeftArrow";
	    KeyboardControl[KeyboardControl["UpArrow"] = 38] = "UpArrow";
	    KeyboardControl[KeyboardControl["RightArrow"] = 39] = "RightArrow";
	    KeyboardControl[KeyboardControl["DownArrow"] = 40] = "DownArrow";
	    KeyboardControl[KeyboardControl["Insert"] = 45] = "Insert";
	    KeyboardControl[KeyboardControl["Delete"] = 46] = "Delete";
	    KeyboardControl[KeyboardControl["Key_0"] = 48] = "Key_0";
	    KeyboardControl[KeyboardControl["Key_1"] = 49] = "Key_1";
	    KeyboardControl[KeyboardControl["Key_2"] = 50] = "Key_2";
	    KeyboardControl[KeyboardControl["Key_3"] = 51] = "Key_3";
	    KeyboardControl[KeyboardControl["Key_4"] = 52] = "Key_4";
	    KeyboardControl[KeyboardControl["Key_5"] = 53] = "Key_5";
	    KeyboardControl[KeyboardControl["Key_6"] = 54] = "Key_6";
	    KeyboardControl[KeyboardControl["Key_7"] = 55] = "Key_7";
	    KeyboardControl[KeyboardControl["Key_8"] = 56] = "Key_8";
	    KeyboardControl[KeyboardControl["Key_9"] = 57] = "Key_9";
	    KeyboardControl[KeyboardControl["Key_A"] = 65] = "Key_A";
	    KeyboardControl[KeyboardControl["Key_B"] = 66] = "Key_B";
	    KeyboardControl[KeyboardControl["Key_C"] = 67] = "Key_C";
	    KeyboardControl[KeyboardControl["Key_D"] = 68] = "Key_D";
	    KeyboardControl[KeyboardControl["Key_E"] = 69] = "Key_E";
	    KeyboardControl[KeyboardControl["Key_F"] = 70] = "Key_F";
	    KeyboardControl[KeyboardControl["Key_G"] = 71] = "Key_G";
	    KeyboardControl[KeyboardControl["Key_H"] = 72] = "Key_H";
	    KeyboardControl[KeyboardControl["Key_I"] = 73] = "Key_I";
	    KeyboardControl[KeyboardControl["Key_J"] = 74] = "Key_J";
	    KeyboardControl[KeyboardControl["Key_K"] = 75] = "Key_K";
	    KeyboardControl[KeyboardControl["Key_L"] = 76] = "Key_L";
	    KeyboardControl[KeyboardControl["Key_M"] = 77] = "Key_M";
	    KeyboardControl[KeyboardControl["Key_N"] = 78] = "Key_N";
	    KeyboardControl[KeyboardControl["Key_O"] = 79] = "Key_O";
	    KeyboardControl[KeyboardControl["Key_P"] = 80] = "Key_P";
	    KeyboardControl[KeyboardControl["Key_Q"] = 81] = "Key_Q";
	    KeyboardControl[KeyboardControl["Key_R"] = 82] = "Key_R";
	    KeyboardControl[KeyboardControl["Key_S"] = 83] = "Key_S";
	    KeyboardControl[KeyboardControl["Key_T"] = 84] = "Key_T";
	    KeyboardControl[KeyboardControl["Key_U"] = 85] = "Key_U";
	    KeyboardControl[KeyboardControl["Key_V"] = 86] = "Key_V";
	    KeyboardControl[KeyboardControl["Key_W"] = 87] = "Key_W";
	    KeyboardControl[KeyboardControl["Key_X"] = 88] = "Key_X";
	    KeyboardControl[KeyboardControl["Key_Y"] = 89] = "Key_Y";
	    KeyboardControl[KeyboardControl["Key_Z"] = 90] = "Key_Z";
	    KeyboardControl[KeyboardControl["Numpad_0"] = 96] = "Numpad_0";
	    KeyboardControl[KeyboardControl["Numpad_1"] = 97] = "Numpad_1";
	    KeyboardControl[KeyboardControl["Numpad_2"] = 98] = "Numpad_2";
	    KeyboardControl[KeyboardControl["Numpad_3"] = 99] = "Numpad_3";
	    KeyboardControl[KeyboardControl["Numpad_4"] = 100] = "Numpad_4";
	    KeyboardControl[KeyboardControl["Numpad_5"] = 101] = "Numpad_5";
	    KeyboardControl[KeyboardControl["Numpad_6"] = 102] = "Numpad_6";
	    KeyboardControl[KeyboardControl["Numpad_7"] = 103] = "Numpad_7";
	    KeyboardControl[KeyboardControl["Numpad_8"] = 104] = "Numpad_8";
	    KeyboardControl[KeyboardControl["Numpad_9"] = 105] = "Numpad_9";
	    KeyboardControl[KeyboardControl["Numpad_Mul"] = 106] = "Numpad_Mul";
	    KeyboardControl[KeyboardControl["Numpad_Add"] = 107] = "Numpad_Add";
	    KeyboardControl[KeyboardControl["Numpad_Sub"] = 108] = "Numpad_Sub";
	    KeyboardControl[KeyboardControl["Numpad_Point"] = 109] = "Numpad_Point";
	    KeyboardControl[KeyboardControl["Numpad_Divide"] = 110] = "Numpad_Divide";
	    KeyboardControl[KeyboardControl["AmountKeyboardControls"] = 111] = "AmountKeyboardControls";
	})(KeyboardControl = exports.KeyboardControl || (exports.KeyboardControl = {}));
	;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../../typings/jquery/jquery.d.ts"/>
	/// <reference path="../../../../../typings/pixi/pixi.js.d.ts"/>
	"use strict";
	const SceneDataModule = __webpack_require__(5);
	const SceneLoaderModule = __webpack_require__(6);
	const ResourcesModule = __webpack_require__(9);
	const PhysicsEngineModule = __webpack_require__(31);
	let Resources = ResourcesModule.GameResources;
	let PhysicsEngine = PhysicsEngineModule.PhysicsEngine;
	/**
	 * @brief   Scene of the game stage.
	 */
	class GameScene extends PIXI.Container {
	    /**
	     * Get the initial width of the scene.
	     * @return {number} Initial width of the scene.
	     */
	    static get InitialWidth() { return 1024; }
	    /**
	     * Get the initial height of the scene.
	     * @return {number} Initial height of the scene.
	     */
	    static get InitialHeight() { return 576; }
	    /**
	     * Get the ratio to correctly render the renderer.
	     * @return {number} Ratio width / height of the scene.
	     */
	    static get Ratio() { return GameScene.InitialWidth / GameScene.InitialHeight; }
	    /**
	     * @brief   Create a new GameScene.
	     */
	    constructor() {
	        super();
	        this.m_hasSceneFinishedLoading = false;
	        var width = GameScene.InitialWidth;
	        var height = GameScene.InitialHeight;
	        this.m_physicsEngine = new PhysicsEngineModule.PhysicsEngine();
	        this.m_sceneData = new SceneDataModule.SceneData(width, height);
	        this.m_sceneLoader = new SceneLoaderModule.GameSceneLoader(this.m_sceneData);
	        addEventListener(SceneLoaderModule.GameSceneLoader.SceneLoadedEvent, this.onSceneLoaded.bind(this));
	        this.m_renderer = PIXI.autoDetectRenderer(width, height);
	        $(window).resize(this.onResizedWindow.bind(this));
	        this.onResizedWindow();
	        var parentContainer = $('#GameCanvas');
	        parentContainer.append(this.m_renderer.view);
	    }
	    onResizedWindow() {
	        var currentRatio = $(window).innerWidth() / $(window).innerHeight();
	        if (currentRatio >= GameScene.Ratio) {
	            var width = $(window).innerHeight() * GameScene.Ratio;
	            var height = $(window).innerHeight();
	        }
	        else {
	            var width = $(window).innerWidth();
	            var height = $(window).innerWidth() / GameScene.Ratio;
	        }
	        this.m_renderer.view.style.width = width + 'px';
	        this.m_renderer.view.style.height = height + 'px';
	    }
	    /**
	     * @brief   Callback when scene is loaded.
	     */
	    onSceneLoaded() {
	        this.addChild(this.m_sceneLoader.Background);
	        this.addChild(this.m_sceneLoader.Foreground);
	        this.addChild(this.m_sceneLoader.HUD);
	        this.m_hasSceneFinishedLoading = true;
	    }
	    /**
	     * @brief   Update the animation of the scene.
	     */
	    animate() {
	        if (this.m_hasSceneFinishedLoading) {
	            this.m_physicsEngine.update();
	            this.m_sceneLoader.Foreground.update();
	            this.m_sceneLoader.HUD.update();
	            this.m_renderer.render(this);
	        }
	    }
	    /*
	     * @brief   Get the left player.
	     */
	    get LeftPlayer() {
	        return this.m_sceneLoader.Foreground.LeftPlayer;
	    }
	    /*
	     * @brief   Get the right player.
	     */
	    get RightPlayer() {
	        return this.m_sceneLoader.Foreground.RightPlayer;
	    }
	    /**
	      * @brief   Update the object.
	      */
	    update() {
	        this.animate();
	    }
	}
	exports.GameScene = GameScene;
	;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @brief   Shared scene data.
	 */
	class SceneData {
	    /** @brief  Offset from bottom of the scene to make players be on ground. */
	    static get PlayersOffset() { return 32; }
	    /**
	     * @brief   Create a new instance of the SceneData.
	     */
	    constructor(width, height) {
	        this.m_width = width;
	        this.m_height = height;
	    }
	    /** @brief  Get the width of the scene. */
	    get Width() { return this.m_width; }
	    /** @brief  Get the height of the scene. */
	    get Height() { return this.m_height; }
	}
	exports.SceneData = SceneData;
	;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../../typings/pixi/pixi.js.d.ts"/>
	"use strict";
	const GameForegroundModule = __webpack_require__(7);
	const GameBackgroundModule = __webpack_require__(28);
	const GameHUDModule = __webpack_require__(30);
	class GameSceneLoader {
	    /**
	     * @brief   Create the GameSceneLoader.
	     * @param   sceneData   Data required to generate the scene.
	     */
	    constructor(sceneData) {
	        /** @brief  Flag to know if foreground is loaded. */
	        this.m_isLoadedForeground = false;
	        /** @brief  Flag to know if background is loaded. */
	        this.m_isLoadedBackground = false;
	        /** @brief  Flag to know if background is loaded. */
	        this.m_isLoadedHUD = false;
	        this.loadBackground(sceneData);
	        this.loadForeground(sceneData);
	        this.loadHUD(sceneData);
	    }
	    /** @brief  Event sent when the scene is loaded. */
	    static get SceneLoadedEvent() {
	        return 'SceneLoaded';
	    }
	    /**
	     * @brief   Load the foreground.
	     * @param   sceneData   Data required to generate the scene.
	     */
	    loadForeground(sceneData) {
	        const ForegroundLoaded = GameForegroundModule.GameForeground.ForegroundLoadedEvent;
	        addEventListener(ForegroundLoaded, this.onLoadedForeground.bind(this));
	        this.m_foreground = new GameForegroundModule.GameForeground(sceneData);
	    }
	    /**
	     * @brief   Trigger operations once foreground is fully loaded.
	     */
	    onLoadedForeground() {
	        this.m_isLoadedForeground = true;
	        this.notifyIfSceneLoaded();
	        const ForegroundLoaded = GameForegroundModule.GameForeground.ForegroundLoadedEvent;
	        removeEventListener(ForegroundLoaded, this.onLoadedForeground.bind(this));
	    }
	    /**
	     * @brief   Load the background.
	     * @param   sceneData   Data required to generate the scene.
	     */
	    loadBackground(sceneData) {
	        const BackgroundLoaded = GameBackgroundModule.GameBackground.BackgroundLoadedEvent;
	        addEventListener(BackgroundLoaded, this.onLoadedBackground.bind(this));
	        this.m_background = new GameBackgroundModule.GameBackground(sceneData.Width, sceneData.Height);
	    }
	    /**
	     * @brief   Trigger operations once foreground is fully loaded.
	     */
	    onLoadedBackground() {
	        this.m_isLoadedBackground = true;
	        this.notifyIfSceneLoaded();
	        const BackgroundLoaded = GameBackgroundModule.GameBackground.BackgroundLoadedEvent;
	        removeEventListener(BackgroundLoaded, this.onLoadedBackground.bind(this));
	    }
	    /**
	     * @brief   Load the game HUD.
	     * @param   sceneData   Data required to generate the scene.
	     */
	    loadHUD(sceneData) {
	        const HUDLoaded = GameHUDModule.GameHUD.HUDLoadedEvent;
	        addEventListener(HUDLoaded, this.onLoadedHUD.bind(this));
	        this.m_hud = new GameHUDModule.GameHUD(sceneData.Width);
	    }
	    /**
	     * @brief   Trigger operations once HUD is fully loaded.
	     */
	    onLoadedHUD() {
	        this.m_isLoadedHUD = true;
	        this.notifyIfSceneLoaded();
	        const HUDLoaded = GameHUDModule.GameHUD.HUDLoadedEvent;
	        removeEventListener(HUDLoaded, this.onLoadedHUD.bind(this));
	    }
	    /**
	     * @brief   Notify listeners that the scene has been fully loaded.
	     * */
	    notifyIfSceneLoaded() {
	        if (this.m_isLoadedForeground
	            && this.m_isLoadedBackground
	            && this.m_isLoadedHUD) {
	            // Notify the scene is loaded.
	            dispatchEvent(new Event(GameSceneLoader.SceneLoadedEvent));
	        }
	    }
	    /** @brief  Foreground of the scene. */
	    get Foreground() {
	        return this.m_foreground;
	    }
	    /** @brief  Background of the scene. */
	    get Background() {
	        return this.m_background;
	    }
	    /** @brief  HUD of the scene. */
	    get HUD() {
	        return this.m_hud;
	    }
	}
	exports.GameSceneLoader = GameSceneLoader;
	;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const SceneDataModule = __webpack_require__(5);
	const PlayerViewModule = __webpack_require__(8);
	const PlayerControllerModule = __webpack_require__(10);
	const BallViewModule = __webpack_require__(17);
	const BallControllerModule = __webpack_require__(19);
	const NetViewModule = __webpack_require__(23);
	const NetControllerModule = __webpack_require__(24);
	const OuterWallControllerModule = __webpack_require__(26);
	class GameForeground extends PIXI.Container {
	    /** @brief  Event sent when the foreground is loaded. */
	    static get ForegroundLoadedEvent() {
	        return 'ForegroundLoaded';
	    }
	    /**
	     * @brief   Create a new instance of GameForeground.
	     */
	    constructor(data) {
	        super();
	        this.m_sceneData = data;
	        this.m_outerWalls = new Array();
	        // Be sure the net is loaded before players.
	        NetViewModule.NetView.PreloadSprites();
	        addEventListener(NetViewModule.NetView.NetLoadedEvent, this.onLoadedNet.bind(this));
	    }
	    onLoadedNet() {
	        // Texture of the net.
	        var netTexture = PIXI.Texture.fromImage(NetViewModule.NetView.NetPath);
	        // Position of the net.
	        var netPosition = new PIXI.Point((this.m_sceneData.Width / 2) - netTexture.width, this.m_sceneData.Height - netTexture.height - 20);
	        // Setup the net.
	        var data;
	        data = new NetControllerModule.NetSetupData(netPosition, netTexture);
	        this.m_net = new NetControllerModule.NetController(data);
	        this.addChild(this.m_net.View.NetSprite);
	        // Set up the outer walls.
	        this.setupOuterWalls();
	        // Load and set players.
	        PlayerViewModule.PlayerView.PreloadSprites();
	        addEventListener(PlayerViewModule.PlayerView.PlayersLoadedEvent, this.onLoadedPlayers.bind(this));
	        // Load and set the ball.
	        BallViewModule.BallView.PreloadSprites();
	        addEventListener(BallViewModule.BallView.BallLoadedEvent, this.onLoadedBall.bind(this));
	    }
	    /**NetPosition - NetWidth
	     * @brief   Creation of the Players when their relative data are fully
	     *          loaded.
	     */
	    onLoadedPlayers() {
	        const SceneWidth = this.m_sceneData.Width;
	        const NetPosition = this.m_net.View.NetSprite.x;
	        const NetWidth = this.m_net.View.NetSprite.width;
	        const PositionXStep = SceneWidth / 4;
	        const PositionY = this.m_sceneData.Height - SceneDataModule.SceneData.PlayersOffset;
	        // Set up the left player.
	        {
	            const TexturePlayer = PlayerViewModule.PlayerView.LeftPlayerPath;
	            let playerData;
	            playerData = GameForeground.PlayerData;
	            // Compute the area in which the player can move.
	            var areaX = 0;
	            var areaY = 0;
	            var areaWidth = NetPosition;
	            var areaHeight = this.m_sceneData.Height;
	            playerData.Area = new PIXI.Rectangle(areaX, areaY, areaWidth, areaHeight);
	            playerData.Position = new PIXI.Point(PositionXStep, PositionY);
	            playerData.Texture = PIXI.Texture.fromImage(TexturePlayer);
	            this.m_leftPlayer = new PlayerControllerModule.PlayerController(playerData);
	            this.addChild(this.m_leftPlayer.View.ShadowSprite);
	            this.addChild(this.m_leftPlayer.View.PlayerSprite);
	        }
	        // Set up the right player.
	        {
	            const TexturePlayer = PlayerViewModule.PlayerView.RightPlayerPath;
	            let playerData;
	            playerData = GameForeground.PlayerData;
	            // Compute the area in which the player can move.
	            var areaX = NetPosition + NetWidth;
	            var areaY = 0;
	            var areaWidth = (SceneWidth / 2) - (NetWidth / 2);
	            var areaHeight = this.m_sceneData.Height;
	            playerData.Area = new PIXI.Rectangle(areaX, areaY, areaWidth, areaHeight);
	            playerData.Position = new PIXI.Point(PositionXStep * 3, PositionY);
	            playerData.Texture = PIXI.Texture.fromImage(TexturePlayer);
	            this.m_rightPlayer = new PlayerControllerModule.PlayerController(playerData);
	            this.addChild(this.m_rightPlayer.View.ShadowSprite);
	            this.addChild(this.m_rightPlayer.View.PlayerSprite);
	        }
	        // Notify the foreground is loaded and ready to be updated/rendered.
	        dispatchEvent(new Event(GameForeground.ForegroundLoadedEvent));
	    }
	    /**
	    * @brief   Creation of the Ball when its data are loaded.
	    */
	    onLoadedBall() {
	        const PositionY = this.m_sceneData.Height - SceneDataModule.SceneData.PlayersOffset;
	        const BallTexture = BallViewModule.BallView.BallPath;
	        let ballData;
	        ballData = new BallControllerModule.BallSetupData();
	        ballData.Position = new PIXI.Point(0, PositionY);
	        ;
	        ballData.SpeedFactor = 5;
	        ballData.Area = new PIXI.Rectangle(0, 0, this.m_sceneData.Width, PositionY);
	        this.m_ball = new BallControllerModule.BallController(ballData);
	        this.addChild(this.m_ball.View.ShadowSprite);
	        this.addChild(this.m_ball.View.BallSprite);
	        this.m_ball.reset(new PIXI.Point(250, 120));
	    }
	    /**
	     * Set up the outer walls of the game area.
	     */
	    setupOuterWalls() {
	        var leftWallPosition = new PIXI.Point(0, -this.m_sceneData.Height);
	        var leftOuterWall = new OuterWallControllerModule.OuterWallController(leftWallPosition);
	        this.m_outerWalls.push(leftOuterWall);
	        var rightWallPosition = new PIXI.Point(this.m_sceneData.Width, -this.m_sceneData.Height);
	        var rightOuterWall = new OuterWallControllerModule.OuterWallController(rightWallPosition);
	        this.m_outerWalls.push(rightOuterWall);
	    }
	    /**
	     * @brief   Get a Player data.
	     * @return  A new Player data.
	     */
	    static get PlayerData() {
	        let playerData;
	        playerData = new PlayerControllerModule.PlayerSetupData();
	        playerData.SpeedFactor = 1;
	        playerData.MaxScore = 15;
	        return playerData;
	    }
	    /**
	     * @brief   Get the left player.
	     */
	    get LeftPlayer() {
	        return this.m_leftPlayer;
	    }
	    /**
	     * @brief   Get the right player.
	     */
	    get RightPlayer() {
	        return this.m_rightPlayer;
	    }
	    /**
	     * @brief   Update the object.
	     */
	    update() {
	        if (this.m_leftPlayer) {
	            this.m_leftPlayer.update();
	        }
	        if (this.m_rightPlayer) {
	            this.m_rightPlayer.update();
	        }
	        if (this.m_ball) {
	            this.m_ball.update();
	        }
	    }
	}
	exports.GameForeground = GameForeground;
	;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const ResourcesModule = __webpack_require__(9);
	let Resources = ResourcesModule.GameResources;
	/**
	 * @brief   Graphical representation of a Player.
	 */
	class PlayerView {
	    /** @brief  Event sent when the players data are loaded. */
	    static get PlayersLoadedEvent() {
	        return 'PlayersLoaded';
	    }
	    /** @brief  Path to the sprite texture of the left player. */
	    static get LeftPlayerPath() {
	        return Resources.ImagesFolder + '/LeftPlayer.png';
	    }
	    /** @brief  Path to the sprite texture of the right player. */
	    static get RightPlayerPath() {
	        return Resources.ImagesFolder + '/RightPlayer.png';
	    }
	    /**
	     * @brief  Create a new instance of the PlayerView.
	     * @param   texture     Texture of the PlayerView.
	     * @param   position    Position of the PlayerView sprite when created.
	     */
	    constructor(texture, position) {
	        this.m_playerSprite = new PIXI.Sprite(texture);
	        this.m_shadowSprite = new PIXI.Sprite(Resources.ShadowTexture);
	        this.m_shadowSprite.position.y = position.y + (this.m_playerSprite.height * 0.62);
	        this.moveAt(position);
	    }
	    /** @brief  Preload players textures in order to synchronize loadings. */
	    static PreloadSprites() {
	        var assetsLoader = new PIXI.loaders.Loader();
	        assetsLoader.add('FirstPlayer', PlayerView.LeftPlayerPath);
	        assetsLoader.add('SecondPlayer', PlayerView.RightPlayerPath);
	        assetsLoader.add('Shadow', Resources.ShadowPath);
	        assetsLoader.once('complete', PlayerView.OnAssetsLoaded);
	        assetsLoader.load();
	    }
	    /**
	     * @brief   Send an event to the game view once all resources on PlayerViews
	     *          are loaded.
	     */
	    static OnAssetsLoaded() {
	        Resources.ShadowTexture = PIXI.Texture.fromImage(Resources.ShadowPath);
	        PlayerView.ShadowXOffset = Resources.ShadowTexture.width / 3.5;
	        dispatchEvent(new Event(PlayerView.PlayersLoadedEvent));
	    }
	    /**
	     * @brief   Move the sprite of the PlayerView at the given position.
	     * @param   position    Position of the sprite.
	     */
	    moveAt(position) {
	        this.m_playerSprite.position.x = position.x;
	        this.m_playerSprite.position.y = position.y;
	        // Adjust the shadow sprite position to the player sprite.
	        this.m_shadowSprite.position.x = position.x - PlayerView.ShadowXOffset;
	        this.m_shadowSprite.alpha = this.m_shadowSprite.alpha = Math.max(0.2, position.y / this.m_shadowSprite.position.y);
	    }
	    /**
	     * @brief   Get sprite of the Player.
	     * @return  Sprite of the Player.
	     */
	    get PlayerSprite() {
	        return this.m_playerSprite;
	    }
	    /**
	     * @brief   Get sprite of the Player shadow.
	     * @return  Sprite of the Player shadow.
	     */
	    get ShadowSprite() {
	        return this.m_shadowSprite;
	    }
	}
	exports.PlayerView = PlayerView;
	;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	class GameResources {
	    /** @brief  Path to resources. */
	    static get ResourcesFolder() {
	        return './resources';
	    }
	    ;
	    /** @brief  Path to image resources. */
	    static get ImagesFolder() {
	        return GameResources.ResourcesFolder + '/img';
	    }
	    ;
	    /** @brief  Path to fonts resources. */
	    static get FontsFolder() {
	        return GameResources.ResourcesFolder + '/fonts';
	    }
	    ;
	    /** @brief  Path to the sprite texture of the shadow. */
	    static get ShadowPath() {
	        return GameResources.ImagesFolder + '/Shadow.png';
	    }
	}
	exports.GameResources = GameResources;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const PlayerViewModule = __webpack_require__(8);
	const PlayerModelModule = __webpack_require__(11);
	const JumpPlayerModelModule = __webpack_require__(15);
	const BehaviorPlayerModelModule = __webpack_require__(12);
	/**
	 * @brief   Data to set up a Player.
	 */
	class PlayerSetupData {
	    /** @brief  Create a new instance of PlayerSetupData. */
	    constructor() { }
	    /** @brief  Get and set the position of the Player. */
	    get Position() { return this.m_position; }
	    set Position(position) { this.m_position = position.clone(); }
	    /** @brief  Get and set the area in which the Player can move. */
	    get Area() { return this.m_area; }
	    set Area(area) { this.m_area = area.clone(); }
	    /** @brief  Get and set the speed factor to move the Player. */
	    get SpeedFactor() { return this.m_speedFactor; }
	    set SpeedFactor(factor) { this.m_speedFactor = factor; }
	    /** @brief  Get and set the max score to make the Player win. */
	    get MaxScore() { return this.m_maxScore; }
	    set MaxScore(score) { this.m_maxScore = score; }
	    /** @brief  Get and set the texture of the Player. */
	    get Texture() { return this.m_texture; }
	    set Texture(texture) { this.m_texture = texture; }
	    /**
	     * @brief  Get the real position of the Player using both provided position
	     *         and the height of the player sprite.
	     */
	    get RealPosition() {
	        return new PIXI.Point(this.m_position.x - (this.m_texture.width / 2), this.m_position.y - this.m_texture.height);
	    }
	}
	exports.PlayerSetupData = PlayerSetupData;
	;
	/**
	 * @brief   Controller of a Player.
	 */
	class PlayerController {
	    /**
	     * @brief   Create a new instance of PlayerController.
	     * @param   position    Position of the PlayerView sprite when created.
	     */
	    constructor(data) {
	        this.setModel(data);
	        this.setTexture(data);
	        addEventListener(BehaviorPlayerModelModule.Behavior.MovePlayerUpdateEvent, this.updateView.bind(this));
	        addEventListener(JumpPlayerModelModule.Jump.JumpPlayerUpdateEvent, this.updateView.bind(this));
	    }
	    /**
	     * @brief   Set the model of the Player.
	     */
	    setModel(data) {
	        this.m_model = new PlayerModelModule.Player(data.RealPosition, data.SpeedFactor, data.MaxScore);
	    }
	    /**
	     * @brief   Set the texture of the Player. Can be changed while playing.
	     * @param   texture     Path to the texture of the Player.
	     */
	    setTexture(data) {
	        var position = this.m_model.Behavior.CurrentPosition;
	        this.m_view = new PlayerViewModule.PlayerView(data.Texture, position);
	        data.Area.width -= data.Texture.width;
	        this.m_model.Behavior.setBounds(data.Area);
	        this.m_model.Behavior.AABB = new PIXI.Rectangle(0, 0, data.Texture.width, data.Texture.height);
	    }
	    /**
	     * @brief   Update the view to fit model data.
	     */
	    updateView() {
	        this.m_view.moveAt(this.m_model.Behavior.CurrentPosition);
	    }
	    /**
	     * @brief   Update the Player.
	     */
	    update() {
	        if (this.m_model != undefined) {
	            this.m_model.update();
	        }
	    }
	    /**
	     * @brief   Move the Player on left.
	     */
	    moveLeft() {
	        if (this.m_model != undefined) {
	            this.m_model.Behavior.moveLeft();
	        }
	    }
	    /**
	     * @brief   Move the Player on right.
	     */
	    moveRight() {
	        if (this.m_model != undefined) {
	            this.m_model.Behavior.moveRight();
	        }
	    }
	    /**
	     * @brief   Make the Player jump.
	     */
	    jump() {
	        if (this.m_model != undefined) {
	            this.m_model.jump();
	        }
	    }
	    /**
	     * @brief   Get the view of the Player.
	     * @return  View of the Player.
	     */
	    get View() {
	        return this.m_view;
	    }
	}
	exports.PlayerController = PlayerController;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const BehaviorModule = __webpack_require__(12);
	const JumpModule = __webpack_require__(15);
	const ScoringModule = __webpack_require__(16);
	/**
	 * @brief   A Player is an entity that is controlled by the user.
	 */
	class Player {
	    /**
	     * @brief   Create a new Player.
	     * @param   texture     Path to the image of the Player.
	     * @param   position    Position of the Player when created.
	     * @param   speed       Speed of the Player when moving.
	     * @param   maxScore    Score to make Player win.
	     */
	    constructor(position, speedFactor, maxScore) {
	        this.m_scoring = new ScoringModule.Scoring(maxScore);
	        this.m_behavior = new BehaviorModule.Behavior(position, speedFactor);
	        this.m_jump = new JumpModule.Jump(this.m_behavior.CurrentPosition, this.m_behavior.Speed);
	        this.m_behavior.add();
	    }
	    /**
	     * @brief   Make player jump.
	     */
	    jump() {
	        this.m_jump.trigger();
	    }
	    /** @brief  Make the player score one point. */
	    score() {
	        this.m_scoring.score(1);
	    }
	    /**
	     * @brief   Get the force applied on the player when jumping.
	     */
	    get JumpForce() {
	        return this.m_jump.Force;
	    }
	    /**
	     * @brief   Get the behavior of the Player.
	     */
	    get Behavior() {
	        return this.m_behavior;
	    }
	    /** @brief  Set the AABB of the Ball. */
	    set AABB(aabb) {
	        this.m_behavior.AABB = aabb;
	    }
	    /**
	     * Get the score of the Player.
	     * @return {number} Current score of the Player.
	     */
	    get ScorePoints() {
	        return this.m_scoring.CurrentPoints;
	    }
	    /**
	     * @brief   Update the object.
	     */
	    update() {
	        this.m_jump.update();
	        this.Behavior.update();
	    }
	}
	exports.Player = Player;
	;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const KinematicBodyModule = __webpack_require__(13);
	/**
	 * @brief   Behavior of a Player.
	 */
	class Behavior extends KinematicBodyModule.KinematicBody {
	    /** @brief  Event for moving player update position. */
	    static get MovePlayerUpdateEvent() { return 'MovePlayer'; }
	    /** @brief  Default speed to make Player move. */
	    static get DefaultSpeed() { return 12; }
	    /**
	     * @brief   Create a new Behavior.
	     * @param   startPosX   Position on X axis of the Player when created.
	     * @param   speed       Speed of the Player when moving.
	     */
	    constructor(position, speedFactor) {
	        super(new PIXI.Point(position.x, position.y));
	        this.m_moveForce = 0;
	        this.m_initialPosition = new PIXI.Point(position.x, position.y);
	        this.m_speedFactor = Behavior.DefaultSpeed * speedFactor;
	    }
	    /**
	     * @brief   Set the bounds of the player.
	     * @param   bounds      Amount of pixel on left and right in which the
	     *                      player can move.
	     */
	    setBounds(bounds) {
	        this.m_minBound = bounds.x;
	        this.m_maxBound = bounds.x + bounds.width;
	        console.assert(this.m_minBound < this.m_maxBound);
	    }
	    /**
	     * @brief   Update the Player behavior.
	     */
	    update() {
	        this.CurrentPosition.x += this.m_moveForce;
	        this.m_moveForce = 0;
	        // Clamp the Player position.
	        if (this.CurrentPosition.x < this.MinBound) {
	            this.CurrentPosition.x = this.MinBound;
	        }
	        else if (this.CurrentPosition.x > this.MaxBound) {
	            this.CurrentPosition.x = this.MaxBound;
	        }
	        dispatchEvent(new Event(Behavior.MovePlayerUpdateEvent));
	    }
	    /**
	     * @brief   Move Player on left.
	     */
	    moveLeft() {
	        if (this.CurrentPosition.x > this.MinBound) {
	            this.m_moveForce = -this.SpeedFactor;
	            this.SpeedX = this.m_moveForce;
	        }
	        else {
	            this.m_moveForce = 0;
	        }
	    }
	    /**
	     * @brief   Move Player on right.
	     */
	    moveRight() {
	        if (this.CurrentPosition.x < this.MaxBound) {
	            this.m_moveForce = this.SpeedFactor;
	            this.SpeedX = this.m_moveForce;
	        }
	        else {
	            this.m_moveForce = 0;
	        }
	    }
	    /**
	     * @brief   Reset the position of the Player.
	     */
	    resetPosition() {
	        this.CurrentPosition.x = this.m_initialPosition.x;
	        this.CurrentPosition.y = this.m_initialPosition.y;
	    }
	    /**
	     * @brief   Get the minimal coordinate on X axis the player can reach.
	     */
	    get MinBound() {
	        return this.m_minBound;
	    }
	    /**
	     * @brief   Get the maximal coordinate on X axis the player can reach.
	     */
	    get MaxBound() {
	        return this.m_maxBound;
	    }
	    /**
	     * @brief   Get the speed of the player.
	     */
	    get SpeedFactor() {
	        return this.m_speedFactor;
	    }
	    /**
	     * @brief   Set the speed of the player.
	     */
	    set SpeedFactor(speedFactor) {
	        this.m_speedFactor = speedFactor;
	    }
	    /**
	     * @brief   Get the force applied on the Player when moving.
	     */
	    get MoveForce() {
	        return this.m_moveForce;
	    }
	}
	exports.Behavior = Behavior;
	;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const PhysicsEventsModule = __webpack_require__(14);
	let PhysicsEvents = PhysicsEventsModule.PhysicsEvents;
	/**
	 * @brief   A KinematicBody is a movable entity that is not affected by forces
	 *          but can collide with RigidBody instances.
	 */
	class KinematicBody {
	    /**
	     * @brief   Instanciation of a new KinematicBody.
	     * @param   aabb    Bounding box of the KinematicBody.
	     */
	    constructor(position, aabb) {
	        if (aabb != undefined) {
	            this.m_aabb = aabb;
	        }
	        else {
	            this.m_aabb = new PIXI.Rectangle(0, 0, 0, 0);
	        }
	        this.m_currentPosition = position;
	        this.m_speed = new PIXI.Point(0, 0);
	    }
	    /**
	     * @brief  Add the RigidBody to the physics engine.
	     */
	    add() {
	        this.register();
	    }
	    /**
	     * @brief   Remove the RigidBody from the physics engine.
	     */
	    remove() {
	        this.unregister();
	    }
	    /** @brief  Register the KinematicBody to the PhysicsEngine. */
	    register() {
	        const RegisterObstacle = PhysicsEvents.RegisterObstacleEvent;
	        var event;
	        event = new CustomEvent(RegisterObstacle, { 'detail': this });
	        dispatchEvent(event);
	    }
	    /** @brief  Unregister the KinematicBody from the PhysicsEngine. */
	    unregister() {
	        const UnregisterObstacle = PhysicsEvents.UnregisterObstacleEvent;
	        var event;
	        event = new CustomEvent(UnregisterObstacle, { 'detail': this });
	        dispatchEvent(event);
	    }
	    /**
	     * @brief   Get the current position of the Player.
	     */
	    get CurrentPosition() {
	        return this.m_currentPosition;
	    }
	    /** @brief  Get the speed of the Kinematic Body on both X and Y axes. */
	    get Speed() {
	        return this.m_speed;
	    }
	    /** @brief  Get the speed of the KinematicBody on X axis. */
	    get SpeedX() {
	        return this.m_speed.x;
	    }
	    /** @brief  Set the speed of the KinematicBody on X axis. */
	    set SpeedX(x) {
	        this.m_speed.x = x;
	    }
	    /** @brief  Get the speed of the KinematicBody on Y axis. */
	    get SpeedY() {
	        return this.m_speed.y;
	    }
	    /** @brief  Set the speed of the KinematicBody on Y axis. */
	    set SpeedY(y) {
	        this.m_speed.y = y;
	    }
	    /** @brief  Get the AABB of the KinematicBody. */
	    get AABB() {
	        return this.m_aabb;
	    }
	    /** @brief  Set the AABB of the KinematicBody. */
	    set AABB(aabb) {
	        this.m_aabb = aabb;
	    }
	}
	exports.KinematicBody = KinematicBody;
	;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Events for physics engine.
	 */
	class PhysicsEvents {
	    /** @brief  Event to register a RigidBody. */
	    static get RegisterRigidBodyEvent() { return 'RegisterRigidBody'; }
	    /** @brief  Event to unregister a RigidBody. */
	    static get UnregisterRigidBodyEvent() { return 'UnregisterRigidBody'; }
	    /** @brief  Event to register an Obstacle. */
	    static get RegisterObstacleEvent() { return 'RegisterObstacle'; }
	    /** @brief  Event to unregister an Obstacle. */
	    static get UnregisterObstacleEvent() { return 'UnregisterObstacle'; }
	}
	exports.PhysicsEvents = PhysicsEvents;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @brief   Make the player jump.
	 */
	class Jump {
	    /** @brief  Event for jumping player update position. */
	    static get JumpPlayerUpdateEvent() { return 'JumpPlayer'; }
	    /** @brief  Initial jump force when a jump is started. */
	    static get InitialJumpForce() { return -14; }
	    /** @brief  Decrease of the jump force. */
	    static get JumpForceDecrease() { return 0.7; }
	    /** @brief  Maximum amount of jumps that can be made at the same time. */
	    static get MaxJumps() { return 2; }
	    static get AmountFrameBeforeJump() { return 16; }
	    /** @brief  Create a Jump behavior for Player. */
	    constructor(position, speed) {
	        this.m_position = position;
	        this.m_onGroundPosition = position.y;
	        this.m_speed = speed;
	        this.m_amountJumps = 0;
	        this.m_speed.y = 0;
	        this.m_shouldUpdateJumpOnUpdate = false;
	        // Used to enable the first jump.
	        this.m_framesSinceLastJump = Jump.AmountFrameBeforeJump;
	    }
	    /** @brief  Trigger the jump. */
	    trigger() {
	        if ((this.m_framesSinceLastJump >= Jump.AmountFrameBeforeJump)
	            && (this.m_amountJumps < Jump.MaxJumps)) {
	            this.m_speed.y = Jump.InitialJumpForce;
	            this.m_amountJumps++;
	            this.m_framesSinceLastJump = 0;
	            if (this.m_amountJumps == 1) {
	                this.m_shouldUpdateJumpOnUpdate = true;
	            }
	        }
	    }
	    /** @brief  Refresh the jump position of the player. */
	    updateJump() {
	        this.m_position.y += this.m_speed.y;
	        this.m_speed.y += Jump.JumpForceDecrease;
	        dispatchEvent(new Event(Jump.JumpPlayerUpdateEvent));
	        if (this.m_position.y < this.m_onGroundPosition) {
	            this.m_framesSinceLastJump++;
	            this.m_shouldUpdateJumpOnUpdate = true;
	        }
	        else {
	            this.m_position.y = this.m_onGroundPosition;
	            this.m_amountJumps = 0;
	            this.m_speed.y = 0;
	            this.m_framesSinceLastJump = Jump.AmountFrameBeforeJump;
	            this.m_shouldUpdateJumpOnUpdate = false;
	        }
	    }
	    /** @brief  Get the force applied on Player for jumping. */
	    get Force() {
	        return this.m_speed.y;
	    }
	    /**
	     * @brief   Update the object.
	     */
	    update() {
	        if (this.m_shouldUpdateJumpOnUpdate) {
	            this.updateJump();
	        }
	    }
	}
	exports.Jump = Jump;
	;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @brief   Manage the scoring of a Player.
	 */
	class Scoring {
	    /** @brief  Default max score to make Player win. */
	    static get DefaultMaxPoints() {
	        return 15;
	    }
	    /**
	     * @brief   Create a new instance of Scoring.
	     * @param   maxPoints   Score to make Player win.
	     */
	    constructor(maxPoints) {
	        this.m_points = 0;
	        if (maxPoints != null) {
	            this.m_maxPoints = maxPoints;
	        }
	        else {
	            this.m_maxPoints = Scoring.DefaultMaxPoints;
	        }
	    }
	    /**
	     * @brief   Make the Player score.
	     * @param   points  Amount of points the Player has won.
	     * @return  TRUE if the player has won the game, FALSE if not.
	     */
	    score(points) {
	        this.m_points += points;
	        return (this.m_points >= this.m_maxPoints);
	    }
	    /**
	     * @brief   Get the score of the player.
	     */
	    get CurrentPoints() {
	        return this.m_points;
	    }
	}
	exports.Scoring = Scoring;
	;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const ResourcesModule = __webpack_require__(9);
	let Resources = ResourcesModule.GameResources;
	const GeometryModule = __webpack_require__(18);
	let Geometry = GeometryModule.Geometry;
	/**
	 * @brief   Graphical representation of the Ball.
	 */
	class BallView {
	    /** @brief  Event sent when the ball data are loaded. */
	    static get BallLoadedEvent() {
	        return 'BallLoaded';
	    }
	    /** @brief  Base rotation speed. */
	    static get BaseRotationSpeed() { return 0.01; }
	    /** @brief  Path to the sprite texture of the ball. */
	    static get BallPath() {
	        return Resources.ImagesFolder + '/Ball.png';
	    }
	    /**
	     * @brief  Create a new instance of the BallView.
	     * @param   texture     Texture of the BallView.
	     * @param   position    Position of the BallView sprite when created.
	     */
	    constructor(texture, position) {
	        this.m_yOnGround = position.y;
	        this.m_ballSprite = new PIXI.Sprite(texture);
	        this.m_ballSprite.pivot = Geometry.GetCenter(this.m_ballSprite.getLocalBounds());
	        this.m_shadowSprite = new PIXI.Sprite(Resources.ShadowTexture);
	        this.m_shadowSprite.position.y = position.y - (this.m_ballSprite.width / 2);
	        this.moveAt(position);
	    }
	    /** @brief  Preload ball textures in order to synchronize loadings. */
	    static PreloadSprites() {
	        var assetsLoader = new PIXI.loaders.Loader();
	        assetsLoader.add('Ball', BallView.BallPath);
	        assetsLoader.add('Shadow', Resources.ShadowPath);
	        assetsLoader.once('complete', BallView.OnAssetsLoaded.bind(this));
	        assetsLoader.load();
	    }
	    /**
	     * @brief   Send an event to the game view once all resources on BallView
	     *          are loaded.
	     */
	    static OnAssetsLoaded() {
	        BallView.ShadowXOffset = Resources.ShadowTexture.width / 2;
	        dispatchEvent(new Event(BallView.BallLoadedEvent));
	    }
	    /**
	     * @brief   Move the sprite of the BallView at the given position.
	     * @param   position    Position of the ball.
	     */
	    moveAt(position) {
	        this.m_ballSprite.position.x = position.x;
	        this.m_ballSprite.position.y = position.y;
	        this.m_shadowSprite.position.x = this.m_ballSprite.position.x - BallView.ShadowXOffset;
	        this.m_shadowSprite.alpha = Math.max(0.2, position.y / this.m_yOnGround);
	    }
	    /**
	     * Rotate the sprite of the ball.
	     * @param {number} angle Angle to apply to the sprite.
	     */
	    rotate(angle) {
	        this.m_ballSprite.rotation = angle;
	    }
	    /**
	     * @brief   Get sprite of the Ball.
	     * @return  Sprite of the Ball.
	     */
	    get BallSprite() {
	        return this.m_ballSprite;
	    }
	    /**
	     * @brief   Get sprite of the Player shadow.
	     * @return  Sprite of the Player shadow.
	     */
	    get ShadowSprite() {
	        return this.m_shadowSprite;
	    }
	}
	exports.BallView = BallView;
	;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Axis and direction.
	 */
	var Axis;
	(function (Axis) {
	    Axis[Axis["None"] = 0] = "None";
	    Axis[Axis["PlusX"] = 1] = "PlusX";
	    Axis[Axis["PlusY"] = 2] = "PlusY";
	    Axis[Axis["MinusX"] = 17] = "MinusX";
	    Axis[Axis["MinusY"] = 18] = "MinusY";
	})(Axis = exports.Axis || (exports.Axis = {}));
	;
	class Geometry {
	    /**
	     * @brief   Check if two rectangles intersect.
	     * @param   first   First rectangle.
	     * @param   second  Second rectangle
	     * @return  TRUE if the rectangles intersect, FALSE otherwise.
	     */
	    static Intersect(first, second) {
	        // If the rectangle has no area, no intersection is possible.
	        if (first.width <= 0 || first.height <= 0) {
	            return false;
	        }
	        // If the rectangle has no area, no intersection is possible.
	        if (second.width <= 0 || second.height <= 0) {
	            return false;
	        }
	        var x0 = first.x;
	        var y0 = first.y;
	        var x1 = second.x;
	        var y1 = second.y;
	        return (x1 + second.width > x0)
	            && (y1 + second.height > y0)
	            && (x1 < x0 + first.width)
	            && (y1 < y0 + first.height);
	    }
	    /**
	     * Check if a point is outside a rectangle. The returned value indicates on
	     * which axes the point is ouside compared to the center of the rectangle.
	     * @param  {PIXI.Point}     pt  The point to check if it is outside.
	     * @param  {PIXI.Rectangle} rec The rectangle for which the point is tested.
	     * @return {Array<Axis>}        Axes on which the point is outside the
	     *                              rectangle.
	     */
	    static IsOutside(pt, rec) {
	        var result = new Array();
	        // Is the point outside on X axis?
	        if (pt.x < (rec.x)) {
	            result.push(Axis.MinusX);
	        }
	        else if (pt.x > (rec.x + rec.width)) {
	            result.push(Axis.PlusX);
	        }
	        // Is the point outside on Y axis?
	        if (pt.y < (rec.y)) {
	            result.push(Axis.MinusY);
	        }
	        else if (pt.y > (rec.y + rec.height)) {
	            result.push(Axis.PlusY);
	        }
	        return result;
	    }
	    /**
	     * Get the center of a rectangle. This is based on the position of the
	     * rectangle.
	     * @param  {PIXI.Rectangle} rec The rectangle to get center of.
	     * @return {PIXI.Point}         The center point of the rectangle.
	     */
	    static GetCenter(rec) {
	        var topX = rec.x;
	        var bottomX = rec.x + rec.width;
	        var centerX = (bottomX + topX) / 2;
	        var topY = rec.y;
	        var bottomY = rec.y + rec.height;
	        var centerY = (bottomY + topY) / 2;
	        return new PIXI.Point(centerX, centerY);
	    }
	    /**
	     * @brief   Get the alignement of two rectangles as a float value.
	     *          This value is a ratio, alignment of second rectangle over the
	     *          height of the first one.
	     *          The ratio is:
	     *              - zero when the two rectangles are perfectly aligned on
	     *                vertical axis;
	     *              - negative if the second rectangle is under the first one;
	     *              - positive if the second rectangle is over the first one.
	     * @param   first   First rectangle.
	     * @param   second  Second rectangle.
	     * @return  The ratio that indicates the position of the second rectangle
	     *          relatively to the first one.
	     */
	    static VerticalContact(first, second) {
	        var yCenter0 = first.y + (first.height / 2);
	        var yCenter1 = second.y + (second.height / 2);
	        var ratio = (yCenter1 - yCenter0) / first.height;
	        return ratio;
	    }
	    /**
	     * @brief   Get the alignement of two rectangles as a float value.
	     *          This value is a ratio, alignment of second rectangle over the
	     *          width of the first one.
	     *          The ratio is:
	     *              - zero when the two rectangles are perfectly aligned on
	     *                horizontal axis;
	     *              - negative if the second rectangle is under the first one;
	     *              - positive if the second rectangle is over the first one.
	     * @param   first   First rectangle.
	     * @param   second  Second rectangle.
	     * @return  The ratio that indicates the position of the second rectangle
	     *          relatively to the first one.
	     */
	    static HorizontalContact(first, second) {
	        var xCenter0 = first.x + (first.width / 2);
	        var xCenter1 = second.x + (second.width / 2);
	        var ratio = (xCenter1 - xCenter0) / first.width;
	        return -ratio;
	    }
	}
	exports.Geometry = Geometry;
	;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const BallViewModule = __webpack_require__(17);
	const BallModule = __webpack_require__(20);
	/**
	 * @brief   Data to set up a Ball.
	 */
	class BallSetupData {
	    /** @brief  Create a new instance of BallSetupData. */
	    constructor() { }
	    /** @brief  Get and set the position of the Ball. */
	    get Position() { return this.m_position; }
	    set Position(position) { this.m_position = position.clone(); }
	    /** @brief  Get and set the area in which the Ball can move. */
	    get Area() { return this.m_area; }
	    set Area(area) { this.m_area = area.clone(); }
	    /** @brief  Get and set the speed factor to move the Ball. */
	    get SpeedFactor() { return this.m_speedFactor; }
	    set SpeedFactor(factor) { this.m_speedFactor = factor; }
	}
	exports.BallSetupData = BallSetupData;
	;
	/**
	 * @brief   Controller of a Ball.
	 */
	class BallController {
	    /**
	     * @brief   Create a new instance of BallController.
	     * @param   position    Position of the BallView sprite when created.
	     */
	    constructor(data) {
	        this.setTexture(data);
	        this.setModel(data);
	    }
	    /**
	     * @brief   General update of the Ball.
	     */
	    update() {
	        this.m_model.update();
	        this.m_view.moveAt(this.m_model.CenterPosition);
	        this.m_view.rotate(this.m_model.SpeedY / 2);
	    }
	    /**
	     * Reset the position of the Ball.
	     * @param {PIXI.Point} position The new position of the Ball.
	     */
	    reset(position) {
	        this.m_model.reset(position);
	        this.m_view.moveAt(this.m_model.CenterPosition);
	    }
	    /**
	     * @brief   Set the model of the Ball.
	     */
	    setModel(data) {
	        this.m_model = new BallModule.Ball(data.Position, data.Area);
	        this.m_model.AABB = this.m_view.BallSprite.getBounds();
	    }
	    /**
	     * @brief   Set the texture of the Ball. Can be changed while playing.
	     * @param   texture     Path to the texture of the Ball.
	     */
	    setTexture(data) {
	        var texturePath = BallViewModule.BallView.BallPath;
	        var texture = PIXI.Texture.fromImage(texturePath);
	        this.m_view = new BallViewModule.BallView(texture, data.Position);
	        data.Area.width -= this.m_view.BallSprite.width;
	    }
	    /**
	     * @brief   Get the view of the Ball.
	     * @return  View of the Ball.
	     */
	    get View() {
	        return this.m_view;
	    }
	}
	exports.BallController = BallController;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const PhysicsModule = __webpack_require__(21);
	const GeometryModule = __webpack_require__(18);
	let Geometry = GeometryModule.Geometry;
	class Ball {
	    /** @brief  Create a new Ball instance. */
	    constructor(position, area) {
	        this.m_physics = new PhysicsModule.BallPhysics(position, area);
	        this.m_physics.add();
	    }
	    /**
	     * @brief   Update the ball logics.
	     */
	    update() {
	        if (this.m_physics.IsOnGround) {
	        }
	    }
	    /**
	     * @brief   Reset the Ball at the provided position.
	     * @param   position    Position at which the Ball is put.
	     */
	    reset(position) {
	        this.m_physics.Position.x = position.x;
	        this.m_physics.Position.y = position.y;
	    }
	    /** @brief  Get the position of the Ball. */
	    get Position() {
	        return this.m_physics.Position;
	    }
	    /** @brief  Get the center position of the Ball. */
	    get CenterPosition() {
	        var center = Geometry.GetCenter(this.m_physics.AABB);
	        var centerAbsolute = new PIXI.Point();
	        centerAbsolute.x = center.x + this.m_physics.Position.x;
	        centerAbsolute.y = center.y + this.m_physics.Position.y;
	        return centerAbsolute;
	    }
	    /**
	     * Get the speed of the ball on Y axis.
	     * @return {number} Speed of the ball on Y axis.
	     */
	    get SpeedY() {
	        return this.m_physics.Force.y;
	    }
	    /** @brief  Set the AABB of the Ball. */
	    set AABB(aabb) {
	        this.m_physics.AABB = aabb;
	    }
	}
	exports.Ball = Ball;
	;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const RigidBodyModule = __webpack_require__(22);
	/**
	 * @brief   Class to handle the physics of the Ball.
	 */
	class BallPhysics extends RigidBodyModule.RigidBody {
	    /** @brief  Weight of the Ball. */
	    static get Weigth() { return 0.27; }
	    /** @brief  Decrease of the force on Y axis. */
	    static get ForceDecrease() { return 0.5; }
	    /** @brief  Maximal force toward ground that can be applied to the ball. */
	    static get MaxForceDown() { return -16; }
	    /** @brief  Maximal force on sides that can be applied to the ball. */
	    static get MaxForceLateral() { return 5; }
	    /** @brief  Friction of the ground of Ball. */
	    static get GroundFriction() { return 0.7; }
	    /**
	     * @brief   Coefficient of restitution to make the Ball bounce.
	     *          To be set between 0 and 1 for realistic physics (!).
	     *          Default restitution of a true volley ball on a steel surface.
	     *          See Principles of Biomechanics and Motion Analysis,
	     *          Iwan W. Griffiths.
	     */
	    static get Restitution() { return 0.76; }
	    /**
	     * @brief  Create a new Ball physics instance.
	     * @param   position    Initial position of the object.
	     * @param   area        Area in which the object can move.
	     */
	    constructor(position, area) {
	        super(area, BallPhysics.Weigth, BallPhysics.Restitution);
	        this.OpenHeight = true;
	        this.setPosition(position);
	    }
	}
	exports.BallPhysics = BallPhysics;
	;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const PhysicsEventsModule = __webpack_require__(14);
	let PhysicsEvents = PhysicsEventsModule.PhysicsEvents;
	/**
	 * @brief   A RigidBody is an entity that is submitted to physics (gravity,
	 *          forces, etc).
	 */
	class RigidBody {
	    /**
	     * @brief   Instanciation of a new RigidBody.
	     * @param   area        Area in which the RigidBody can move.
	     * @param   weigth      Weigth of the RigidBody.
	     * @param   restitution Coefficient of restitution to make the RigidBody
	     *                      bounce.
	     */
	    constructor(area, weigth, restitution) {
	        this.m_area = area;
	        this.m_weight = weigth;
	        this.m_restitution = restitution;
	        this.m_isOnGround = false;
	        this.m_force = new PIXI.Point(0, 0);
	        this.m_position = new PIXI.Point(0, 0);
	    }
	    /**
	     * @brief  Add the RigidBody to the physics engine.
	     */
	    add() {
	        this.register();
	    }
	    /**
	     * @brief   Remove the RigidBody from the physics engine.
	     */
	    remove() {
	        this.unregister();
	    }
	    /** @brief  Register the RigidBody to the PhysicsEngine. */
	    register() {
	        const RegisterRigidBody = PhysicsEvents.RegisterRigidBodyEvent;
	        var event;
	        event = new CustomEvent(RegisterRigidBody, { 'detail': this });
	        dispatchEvent(event);
	    }
	    /** @brief  Unregister the RigidBody from the PhysicsEngine. */
	    unregister() {
	        const UnregisterRigidBody = PhysicsEvents.UnregisterRigidBodyEvent;
	        var event;
	        event = new CustomEvent(UnregisterRigidBody, { 'detail': this });
	        dispatchEvent(event);
	    }
	    /**
	     * @brief   Update the position of the RigidBody on X axis.
	     * @param   x   Position of the RigidBody on X axis.
	     */
	    updatePositionOnX(x) {
	        this.m_position.x = x;
	    }
	    /**
	     * @brief   Update the position of the RigidBody on Y axis.
	     * @param   x   Position of the RigidBody on Y axis.
	     */
	    updatePositionOnY(y) {
	        this.m_position.y = y;
	        var bottom = this.Position.y + this.AABB.height;
	        if (bottom >= this.Area.height) {
	            this.Force.y = 0;
	            this.Position.y = this.Area.height - this.AABB.height;
	            this.m_isOnGround = true;
	        }
	        else {
	            this.m_isOnGround = false;
	        }
	    }
	    /** @brief  Get the position of the RigidBody. */
	    get Position() {
	        return this.m_position;
	    }
	    /** @brief  Set the position of the RigidBody. */
	    setPosition(position) {
	        this.m_position = position.clone();
	    }
	    /** @brief  Get the AABB of the RigidBody. */
	    get AABB() {
	        return this.m_aabb;
	    }
	    /** @brief  Set the AABB of the RigidBody. */
	    set AABB(aabb) {
	        this.m_aabb = aabb;
	    }
	    /** @brief  Get the area in which the RigidBody can move. */
	    get Area() {
	        return this.m_area;
	    }
	    /** @brief  Get the force applied on the RigidBody, on axes X and Y. */
	    get Force() {
	        return this.m_force;
	    }
	    /** @brief  Get the weigth of the RigidBody. */
	    get Weigth() {
	        return this.m_weight;
	    }
	    /** @brief  Get the restitution of the RigidBody. */
	    get Restitution() {
	        return this.m_restitution;
	    }
	    /** @brief  Set the restitution of the RigidBody. */
	    set Restitution(restitution) {
	        this.m_restitution = restitution;
	    }
	    /** @brief  If TRUE, no matter if the body exits screen from top. */
	    get OpenHeight() {
	        return this.m_openHeight;
	    }
	    /** @brief  If TRUE, no matter if the body exits screen from top. */
	    set OpenHeight(openHeight) {
	        this.m_openHeight = openHeight;
	    }
	    /** @brief  A RigidBody sleeps when no force is applied on it. */
	    get IsSleeping() {
	        return (this.Force.x == 0)
	            && (this.Force.y == 0)
	            && (this.m_isOnGround);
	    }
	    /** @brief  If TRUE, the RigidBody is on ground. */
	    get IsOnGround() {
	        return this.m_isOnGround;
	    }
	    /** @brief  TRUE if the RigidBody is falling, FALSE otherwise. */
	    get IsFalling() {
	        return this.m_isFalling;
	    }
	    /** @brief  TRUE if the RigidBody is falling, FALSE otherwise. */
	    set IsFalling(falling) {
	        this.m_isFalling = falling;
	    }
	}
	exports.RigidBody = RigidBody;
	;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const ResourcesModule = __webpack_require__(9);
	let Resources = ResourcesModule.GameResources;
	/**
	 * @brief   Graphical representation of the Net.
	 */
	class NetView {
	    /** @brief  Event sent when the Net data are loaded. */
	    static get NetLoadedEvent() {
	        return 'NetLoaded';
	    }
	    /** @brief  Path to the sprite texture of the Net. */
	    static get NetPath() {
	        return Resources.ImagesFolder + '/bg/net.png';
	    }
	    /**
	     * @brief  Create a new instance of the BallView.
	     * @param   texture     Texture of the BallView.
	     * @param   position    Position of the BallView sprite when created.
	     */
	    constructor(texture, position) {
	        this.m_netSprite = new PIXI.Sprite(texture);
	        this.m_netSprite.position.x = position.x;
	        this.m_netSprite.position.y = position.y;
	    }
	    /** @brief  Preload net textures in order to synchronize loadings. */
	    static PreloadSprites() {
	        var assetsLoader = new PIXI.loaders.Loader();
	        assetsLoader.add('Net', NetView.NetPath);
	        assetsLoader.once('complete', NetView.OnAssetsLoaded);
	        assetsLoader.load();
	    }
	    /**
	     * @brief   Send an event to the game view once all resources on NetView
	     *          are loaded.
	     */
	    static OnAssetsLoaded() {
	        dispatchEvent(new Event(NetView.NetLoadedEvent));
	    }
	    /**
	     * @brief   Get sprite of the Net.
	     * @return  Sprite of the Net.
	     */
	    get NetSprite() {
	        return this.m_netSprite;
	    }
	}
	exports.NetView = NetView;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const NetViewModule = __webpack_require__(23);
	const NetModelModule = __webpack_require__(25);
	/**
	 * @brief   Data to set up a Net.
	 */
	class NetSetupData {
	    /**
	     * Create a new NetSetupData.
	     * @param  {PIXI.Point}   position Position of the Net to create.
	     * @param  {PIXI.Texture} texture  Texture of the Net to create.
	     */
	    constructor(position, texture) {
	        this.m_position = position;
	        this.m_texture = texture;
	    }
	    /** @brief  Get and set the position of the Net. */
	    get Position() { return this.m_position; }
	    /** @brief  Get and set the texture of the Net. */
	    get Texture() { return this.m_texture; }
	    /**
	     * @brief  Get the real position of the Net using both provided position
	     *         and the height of the Net sprite.
	     */
	    get RealPosition() {
	        var realPosition = this.m_position.clone();
	        realPosition.x += this.m_texture.width / 2;
	        return realPosition;
	    }
	}
	exports.NetSetupData = NetSetupData;
	;
	/**
	 * @brief   Controller of a Net.
	 */
	class NetController {
	    /**
	     * @brief   Create a new instance of NetController.
	     * @param   data    Required data to setup the net.
	     */
	    constructor(data) {
	        this.setModel(data);
	        this.setTexture(data);
	    }
	    /**
	     * @brief   Set the model of the Net.
	     */
	    setModel(data) {
	        this.m_model = new NetModelModule.Net(data.RealPosition);
	    }
	    /**
	     * @brief   Set the texture of the Net. Can be changed while playing.
	     * @param   texture     Path to the texture of the Net.
	     */
	    setTexture(data) {
	        var position = this.m_model.CurrentPosition;
	        this.m_view = new NetViewModule.NetView(data.Texture, position);
	        this.m_model.AABB = new PIXI.Rectangle(0, 0, data.Texture.width, data.Texture.height);
	    }
	    /**
	     * @brief   Get the view of the Net.
	     * @return  View of the Net.
	     */
	    get View() {
	        return this.m_view;
	    }
	}
	exports.NetController = NetController;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const KinematicBodyModule = __webpack_require__(13);
	/**
	 * @brief   A Net is at the middle of the game area.
	 *          Each Player"has" to jump to send the ball in the area of its
	 *          opponent.
	 */
	class Net extends KinematicBodyModule.KinematicBody {
	    /**
	     * Create a new Net instance and register it to the PhysicsEngine.
	     * @param  {PIXI.Point} position Position of the Net.
	     */
	    constructor(position) {
	        super(position);
	        this.add();
	    }
	}
	exports.Net = Net;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const OuterWallModelModule = __webpack_require__(27);
	/**
	 * @brief   Controller of a OuterWall.
	 */
	class OuterWallController {
	    /**
	     * Fixed width of the wall.
	     * @return {number} Width of the wall.
	     */
	    static get Width() { return 1; }
	    /**
	     * Fixed height of the wall.
	     * @return {number} Height of the wall.
	     */
	    static get Height() { return Number.MAX_VALUE; }
	    /**
	     * @brief   Create a new instance of OuterWall.
	     * @param   position    Position of the OuterWall.
	     */
	    constructor(position) {
	        this.setModel(position);
	    }
	    /**
	     * @brief   Set the model of the OuterWall.
	     * @param   position    Position of the OuterWall.
	     */
	    setModel(position) {
	        this.m_model = new OuterWallModelModule.OuterWall(position);
	        this.m_model.AABB = new PIXI.Rectangle(0, 0, OuterWallController.Width, OuterWallController.Height);
	    }
	}
	exports.OuterWallController = OuterWallController;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const KinematicBodyModule = __webpack_require__(13);
	/**
	 * @brief   An OuterWall defines the end of the game area. The ball bounces on
	 *          them (even if not they are not visible) to stay visible on screen.
	 */
	class OuterWall extends KinematicBodyModule.KinematicBody {
	    /**
	     * Create a new Net instance and register it to the PhysicsEngine.
	     * @param  {PIXI.Point} position Position of the Net.
	     */
	    constructor(position) {
	        super(position);
	        this.add();
	    }
	}
	exports.OuterWall = OuterWall;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const ElementDataModule = __webpack_require__(29);
	let ElementData = ElementDataModule.ElementData;
	const ResourcesModule = __webpack_require__(9);
	let Resources = ResourcesModule.GameResources;
	/**
	 * @brief   Class to manage the background of the game screen.
	 */
	class GameBackground extends PIXI.Container {
	    /** @brief  Event sent when the background is loaded. */
	    static get BackgroundLoadedEvent() {
	        return 'BackgroundLoaded';
	    }
	    /** @brief  Path to the ground texture. */
	    static get GroundTexturePath() {
	        return Resources.ImagesFolder + '/bg/bg.png';
	    }
	    ;
	    /**
	     * @brief   Create a new GameBackground.
	     * @param   width   Width of the scene.
	     * @param   height  Height of the scene.
	     */
	    constructor(width, height) {
	        super();
	        this.m_viewportSize = new PIXI.Point(width, height);
	        var bgAssetsLoader = new PIXI.loaders.Loader();
	        bgAssetsLoader.add('Ground', GameBackground.GroundTexturePath);
	        bgAssetsLoader.once('complete', this.onAssetsLoaded.bind(this));
	        bgAssetsLoader.load();
	    }
	    /**
	     * @brief   Callback when assets are loaded.
	     */
	    onAssetsLoaded() {
	        this.setGround();
	        dispatchEvent(new Event(GameBackground.BackgroundLoadedEvent));
	    }
	    /**
	     * @brief   Set the ground texture.
	     */
	    setGround() {
	        var texture = PIXI.Texture.fromImage(GameBackground.GroundTexturePath);
	        var sprite = new PIXI.Sprite(texture);
	        this.addChild(sprite);
	        sprite.position.y = this.m_viewportSize.y - texture.baseTexture.height;
	    }
	}
	exports.GameBackground = GameBackground;
	;


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	/** @brief  Deep copy of element data as position or size. */
	class ElementData {
	    /**
	     * @brief   Create a new instance of ElementData.
	     *          This copies data from given parameters.
	     * @param   position    Position of the element on screen.
	     * @param   width       Width of the element.
	     * @param   height      Height of the element.
	     */
	    constructor(position, width, height) {
	        this.m_position = new PIXI.Point(position.x, position.y);
	        this.m_size = new PIXI.Point(width, height);
	        this.m_bounds = new PIXI.Rectangle(position.x, position.y, width, height);
	    }
	    /** @brief  Get position of the element on X axis. */
	    get X() {
	        return this.m_position.x;
	    }
	    /** @brief  Get position of the element on Y axis. */
	    get Y() {
	        return this.m_position.y;
	    }
	    /** @brief  Get width of the element. */
	    get Width() {
	        return this.m_size.x;
	    }
	    /** @brief  Get height of the element. */
	    get Height() {
	        return this.m_size.y;
	    }
	    /** @brief  Get the bounds of the element with absolute transformation. */
	    get Bounds() {
	        return this.m_bounds;
	    }
	}
	exports.ElementData = ElementData;
	;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const ResourcesModule = __webpack_require__(9);
	let Resources = ResourcesModule.GameResources;
	/**
	 * @brief   Class to manage the HUD on the game screen.
	 */
	class GameHUD extends PIXI.Container {
	    /** @brief  Event sent when the foreground is loaded. */
	    static get HUDLoadedEvent() {
	        return 'GameHUDLoaded';
	    }
	    /** @brief  Default text on left. */
	    static get LeftScoreDefaultText() {
	        return "Player #1";
	    }
	    /** @brief  Default text on right. */
	    static get RightScoreDefaultText() {
	        return "Player #2";
	    }
	    /**
	     * Create the HUD of the game.
	     * @param  {number} sceneWidth Width of the scene.
	     */
	    constructor(sceneWidth) {
	        super();
	        var assetsLoader = new PIXI.loaders.Loader();
	        assetsLoader.add("SomeTimeLater", Resources.FontsFolder + "/SomeTimeLater.otf");
	        assetsLoader.once("complete", this.onLoadedFonts.bind(this, sceneWidth));
	        assetsLoader.load();
	    }
	    /**
	     * Create elements of the HUD that depend on loaded resources.
	     * @param {number} sceneWidth Width of the scene.
	     */
	    onLoadedFonts(sceneWidth) {
	        const TextOffset = 20;
	        // Set the style of the scores.
	        var style = { font: "32px SomeTimeLater", fill: "white", };
	        // Set the texts of the scores.
	        var textLeft = GameHUD.LeftScoreDefaultText + " 00";
	        this.m_leftScoring = new PIXI.Text(textLeft, style);
	        this.m_leftScoring.position.set(TextOffset, TextOffset);
	        this.addChild(this.m_leftScoring);
	        var textRight = GameHUD.RightScoreDefaultText + " 00";
	        this.m_rightScoring = new PIXI.Text(textRight, style);
	        this.m_rightScoring.position.set(sceneWidth - TextOffset - this.m_rightScoring.width, TextOffset);
	        this.addChild(this.m_rightScoring);
	        // Notify the HUD is loaded and ready to be updated/rendered.
	        dispatchEvent(new Event(GameHUD.HUDLoadedEvent));
	    }
	    /**
	     * @brief   Update the object.
	     */
	    update() {
	        this.m_leftScoring.text = GameHUD.LeftScoreDefaultText + " : " + "0";
	        this.m_rightScoring.text = GameHUD.RightScoreDefaultText + " : " + "0";
	    }
	}
	exports.GameHUD = GameHUD;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const PhysicsEventsModule = __webpack_require__(14);
	const GeometryModule = __webpack_require__(18);
	let PhysicsEvents = PhysicsEventsModule.PhysicsEvents;
	let Geometry = GeometryModule.Geometry;
	/**
	 * @brief   Physics engine to manage rigid bodies in the game.
	 */
	class PhysicsEngine {
	    /** @brief  Friction applied on rigid bodies. */
	    static get Friction() { return 0.01; }
	    /** @brief  Get the gravity force value. */
	    static get GravityForce() { return 9.8; }
	    /** @brief  Threshold to consider no force is applied anymore. */
	    static get NullThreshold() { return 0.1; }
	    /**
	     * @brief   Instanciation of the PhysicsEngine.
	     */
	    constructor() {
	        this.m_gravity = PhysicsEngine.GravityForce;
	        this.m_rigidBodies = [];
	        this.m_obstacles = [];
	        addEventListener(PhysicsEvents.RegisterRigidBodyEvent, this.addRigidBody.bind(this));
	        addEventListener(PhysicsEvents.UnregisterRigidBodyEvent, this.removeRigidBody.bind(this));
	        addEventListener(PhysicsEvents.RegisterObstacleEvent, this.addObstacle.bind(this));
	        addEventListener(PhysicsEvents.UnregisterObstacleEvent, this.removeObstacle.bind(this));
	    }
	    /**
	     * @brief   Update the PhysicsEngine and notify RigidBody instances when
	     *          needed (collision, etc).
	     */
	    update() {
	        for (var rigid of this.m_rigidBodies) {
	            var rigidAbsoluteAABB;
	            {
	                var rigidPosition = rigid.Position;
	                var rigidAABB = rigid.AABB;
	                rigidAbsoluteAABB = this.getAbsoluteAABB(rigidAABB, rigidPosition);
	            }
	            // List of kinematic bodies that are in contact with the rigid body.
	            var obstaclesContact = new Array();
	            var isRigidFalling = true;
	            for (var obstacle of this.m_obstacles) {
	                var kinematicAbsoluteAABB;
	                {
	                    var kinematicPosition = obstacle.CurrentPosition;
	                    var kinematicAABB = obstacle.AABB;
	                    kinematicAbsoluteAABB = this.getAbsoluteAABB(kinematicAABB, kinematicPosition);
	                }
	                if (Geometry.Intersect(rigidAbsoluteAABB, kinematicAbsoluteAABB)) {
	                    obstaclesContact.push(obstacle);
	                    this.avoidIntersection(rigid, rigidAbsoluteAABB, obstacle, kinematicAbsoluteAABB);
	                    var hasContact = this.computeCollision(rigid, rigidAbsoluteAABB, obstacle, kinematicAbsoluteAABB);
	                    isRigidFalling = isRigidFalling && !hasContact;
	                }
	            }
	            // If the rigid body is touched by several kinematic bodies at the
	            // same time, it can generate an instable physics behavior.
	            if (obstaclesContact.length > 1) {
	                this.correctCollisions(rigid, rigidAbsoluteAABB, obstaclesContact);
	            }
	            rigid.IsFalling = isRigidFalling;
	            // Do nothing if the rigid body is sleeping.
	            if (rigid.IsSleeping) {
	                continue;
	            }
	            this.applyForces(rigid);
	        }
	    }
	    /**
	     * @brief   Avoid intersections of rigid body and obstacle: unexpected
	     *          behavior in the physics engine.
	     * @param   rigid                   The rigid body.
	     * @param   rigidAbsoluteAABB       AABB of the rigid body at its absolute
	     *                                  position.
	     * @param   obstacle                The kinematic body.
	     * @param   kinematicAbsoluteAABB   AABB of the kinematic body at its
	     *                                  absolute position.
	     */
	    avoidIntersection(rigid, rigidAbsoluteAABB, obstacle, kinematicAbsoluteAABB) {
	        var centerRigid = Geometry.GetCenter(rigidAbsoluteAABB);
	        var outsideAxes = Geometry.IsOutside(centerRigid, kinematicAbsoluteAABB);
	        if (outsideAxes.length == 1) {
	            // At least one axis on which the center is outside the area of
	            // obstacle.
	            var axis = outsideAxes[0];
	            switch (axis) {
	                case GeometryModule.Axis.PlusX:
	                    var updatedX = obstacle.CurrentPosition.x + obstacle.AABB.width;
	                    rigid.updatePositionOnX(updatedX);
	                    break;
	                case GeometryModule.Axis.MinusX:
	                    var updatedX = obstacle.CurrentPosition.x - rigid.AABB.width;
	                    rigid.updatePositionOnX(updatedX);
	                    break;
	                case GeometryModule.Axis.PlusY:
	                    var updatedY = obstacle.CurrentPosition.y + obstacle.AABB.height;
	                    rigid.updatePositionOnY(updatedY);
	                    break;
	                case GeometryModule.Axis.MinusY:
	                    var updatedY = obstacle.CurrentPosition.y - rigid.AABB.height;
	                    rigid.updatePositionOnY(updatedY);
	                    break;
	            }
	        }
	        else {
	        }
	    }
	    /**
	     * Correction of the collisions on a rigid body when it is in contact with
	     * several kinematic bodies at the same time.
	     * @param   rigid                   The rigid body.
	     * @param   rigidAbsoluteAABB       AABB of the rigid body at its absolute
	     *                                  position.
	     * @param   obstacles               List of obstacles in contact with the
	     *                                  rigid body.
	     */
	    correctCollisions(rigid, rigidAbsoluteAABB, obstacles) {
	        var fastestDirection = 0;
	        var fastestObstacle = obstacles[0];
	        var slowestObstacle = obstacles[0];
	        // Search for the slowest and the fastest obstacles that are moving in
	        // different directions (where at least one is moving).
	        obstacles.forEach((obstacle) => {
	            fastestDirection = Math.sign(fastestObstacle.SpeedX);
	            var slowestDirection = Math.sign(slowestObstacle.SpeedX);
	            var currentDirection = Math.sign(obstacle.SpeedX);
	            var speedFastest = Math.abs(fastestObstacle.SpeedX);
	            var speedSlowest = Math.abs(slowestObstacle.SpeedX);
	            var speedCurrent = Math.abs(obstacle.SpeedX);
	            if ((speedCurrent > speedFastest)
	                && (currentDirection != slowestDirection)) {
	                fastestObstacle = obstacle;
	            }
	            else if ((speedCurrent < speedSlowest)
	                && (currentDirection != fastestDirection)) {
	                slowestObstacle = obstacle;
	            }
	        });
	        // Put the rigid body above the fastest kinematic body.
	        rigid.updatePositionOnY(fastestObstacle.CurrentPosition.y - rigid.AABB.height);
	        // Apply a force to mimic an expulsion.
	        rigid.Force.y = Math.abs(fastestObstacle.SpeedX);
	    }
	    /**
	     * @brief   Compute the collision between a rigid body and a kinematic body.
	     * @param   rigid                   The rigid body.
	     * @param   rigidAbsoluteAABB       AABB of the rigid body at its absolute
	     *                                  position.
	     * @param   obstacle                The kinematic body.
	     * @param   kinematicAbsoluteAABB   AABB of the kinematic body at its
	     *                                  absolute position.
	     * @return  TRUE if the rigid body falls as the kinematic body is not just
	     *          below (in contact). FALSE if the rigid body does not fall.
	     */
	    computeCollision(rigid, rigidAbsoluteAABB, obstacle, kinematicAbsoluteAABB) {
	        const MaxForce = 10;
	        // Force of X axis.
	        if (!rigid.IsOnGround) {
	            var ratioX = Geometry.HorizontalContact(rigidAbsoluteAABB, kinematicAbsoluteAABB);
	            rigid.Force.x = (ratioX * MaxForce);
	            rigid.Force.x = Math.min(rigid.Force.x, MaxForce);
	        }
	        if (Math.abs(rigid.Force.x) < PhysicsEngine.NullThreshold) {
	            rigid.Force.x = Math.random();
	        }
	        // Force of Y axis.
	        var ratioY = Geometry.VerticalContact(rigidAbsoluteAABB, kinematicAbsoluteAABB);
	        if (Math.abs(obstacle.SpeedY) > PhysicsEngine.NullThreshold) {
	            rigid.Force.y = -Math.abs(obstacle.SpeedY);
	        }
	        else if (Math.abs(ratioY) >= 1) {
	            rigid.Force.y = -rigid.Force.y * rigid.Restitution;
	        }
	        if (Math.abs(rigid.Force.y) < PhysicsEngine.NullThreshold) {
	            rigid.Force.y = 0;
	            return false;
	        }
	        return true;
	    }
	    /**
	     * @brief   Apply forces on a rigid body.
	     * @param   rigid   The rigid body.
	     */
	    applyForces(rigid) {
	        // Apply friction on the ball when it is on ground.
	        if (rigid.IsOnGround) {
	            if (rigid.Force.x > 0) {
	                rigid.Force.x -= PhysicsEngine.Friction;
	            }
	            else if (rigid.Force.x < 0) {
	                rigid.Force.x += PhysicsEngine.Friction;
	            }
	            // Stop completely the ball if the move is close to the
	            // threshold.
	            if (Math.abs(rigid.Force.x) < PhysicsEngine.Friction) {
	                rigid.Force.x = 0;
	            }
	        }
	        // Apply physics on the rigid body.
	        if (rigid.IsFalling) {
	            var momentForce = (this.m_gravity * rigid.Weigth) / 10;
	            rigid.Force.y += momentForce;
	        }
	        rigid.updatePositionOnY(rigid.Position.y + rigid.Force.y);
	        rigid.updatePositionOnX(rigid.Position.x + rigid.Force.x);
	    }
	    /**
	     * Compute the absolute AABB in world transformations.
	     * @param  {PIXI.Rectangle} aabb     The AABB in local transformations.
	     * @param  {PIXI.Point}     position Absolute position of the AABB.
	     * @return {PIXI.Rectangle}          A copy of the AABB, with absolute
	     *                                   position.
	     */
	    getAbsoluteAABB(aabb, position) {
	        var absoluteAABB = aabb.clone();
	        absoluteAABB.x += position.x;
	        absoluteAABB.y += position.y;
	        return absoluteAABB;
	    }
	    /**
	     * @brief   Register a RigidBody to the PhysicsEngine.
	     * @param   event   Event containing the RigidBody to register.
	     */
	    addRigidBody(event) {
	        this.m_rigidBodies.push(event.detail);
	    }
	    /**
	     * @brief   Unregister a RigidBody from the PhysicsEngine.
	     * @param   event   Event containing the RigidBody to unregister.
	     */
	    removeRigidBody(event) {
	        var index = this.m_rigidBodies.indexOf(event.detail);
	        if (index > -1) {
	            this.m_rigidBodies.splice(index, 1);
	        }
	    }
	    /**
	     * @brief   Register an Obstacle to the PhysicsEngine.
	     * @param   event   Event containing the Obstacle to register.
	     */
	    addObstacle(event) {
	        this.m_obstacles.push(event.detail);
	    }
	    /**
	     * @brief   Unregister an Obstacle from the PhysicsEngine.
	     * @param   event   Event containing the Obstacle to unregister.
	     */
	    removeObstacle(event) {
	        var index = this.m_obstacles.indexOf(event.detail);
	        if (index > -1) {
	            this.m_obstacles.splice(index, 1);
	        }
	    }
	}
	exports.PhysicsEngine = PhysicsEngine;
	;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map