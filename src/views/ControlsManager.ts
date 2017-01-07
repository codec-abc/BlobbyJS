/// <reference path="../../typings/jquery/jquery.d.ts"/>

import IUpdatableModule = require('../interfaces/IUpdatable');

/**
 * @brief   Association of a control name to its related callback.
 */
interface ControlCallback {
    [control: number]: () => void ;
} ;

export class ControlsManager implements IUpdatableModule.IUpdatable {
    /** @brief  List of all avalaible keyboard controls with their callback. */
    private m_keyboardCallbacks: ControlCallback = { } ;

    /** @brief  List of all avalaible mouse controls with their callback. */
    private m_mouseCallbacks: ControlCallback = { } ;

    /** @brief  List of active keyboard controls (key pressed). */
    private m_activeKeyboardControls: KeyboardControl[] = new Array() ;

    /** @brief  List of active mouse controls (key pressed). */
    private m_activeMouseControls: MouseControl[] = new Array() ;

    /**
     * @brief   Creation of a ControlsManager.
     */
    constructor() {
        this.setupKeyboard() ;
        this.setupMouse() ;
    }

    /**
     * @brief   Set up keyboard controls.
     */
    private setupKeyboard() : void {
        var self: ControlsManager = this ;

        // Only keydown is supported at the moment.
        $(window).keydown(function(e) {
            var controlCode: number = e.which ;
            var validControl: boolean ;
            validControl = ControlsManager.CheckValidKeyboardControl(controlCode) ;

            if (validControl) {
                var inArrayPos: number = self.m_activeKeyboardControls.indexOf(controlCode) ;
                var controlCallback: () => void = self.m_keyboardCallbacks[controlCode] ;
                var hasCallback: boolean = (controlCallback !== undefined) ;

                // Insert value if not in array.
                if (hasCallback && (inArrayPos < 0)) {
                    self.m_activeKeyboardControls.push(controlCode) ;
                }
            }

            e.preventDefault() ;
        }) ;

        // Remove the key from the pressed ones when it is released.
        $(window).keyup(function(e) {
            var controlCode: number = e.which ;
            var inArrayPos: number = self.m_activeKeyboardControls.indexOf(controlCode) ;

            if (inArrayPos > -1) {
                // Erase the value.
                self.m_activeKeyboardControls.splice(inArrayPos, 1) ;
            }
        }) ;
    }

    /**
     * @brief   Set up mouse controls.
     */
    private setupMouse() : void {
        var self: ControlsManager = this ;

        // Mouse buttons.
        $(window).mousedown(function(e) {
            var controlCode: number = e.which ;
            var validControl: boolean ;
            validControl = ControlsManager.CheckValidMouseControl(controlCode) ;

            if (validControl) {
                var controlCallback: () => void ;
                controlCallback = self.m_mouseCallbacks[controlCode] ;
                if (controlCallback != undefined) {
                    controlCallback() ;
                }
            }
        }) ;
    }

    /**
     * @brief   Loop to have smooth animations when using keyboard.
     */
    private keyboardLoop() : void {
        var self: ControlsManager = this ;
        this.m_activeKeyboardControls.forEach(
            function(
                     element: number,
                     index: number,
                     array: number[]
                    ) {
            self.m_keyboardCallbacks[element]() ;
        }) ;
    }

    /**
     * @brief   Update the object.
     */
    public update(): void {
        this.keyboardLoop() ;
    } 

    /**
     * @brief   Add a keyboard control with its callback.
     * @param   key         Keyboard key to bind to an action.
     * @param   callback    Function to be called when the key is pressed.
     * @warning Replace the previous callback if already defined for the
     *          provided control.
     */
    public addKeyboardCallback(
                               key: KeyboardControl,
                               callback: () => void
                              ) : void {
        this.m_keyboardCallbacks[key] = callback ;
    }

    /**
     * @brief   Add a mouse control with its callback.
     * @param   mouse       Mouse button to bind to an action.
     * @param   callback    Function to be called when the key is pressed.
     * @warning Replace the previous callback if already defined for the
     *          provided control.
     */
    public addMouseCallback(
                            mouse: MouseControl,
                            callback: () => void
                           ) : void {
        this.m_mouseCallbacks[mouse] = callback ;
    }

    /**
     * @brief   Check if the given value is defined in the keyboard controls
     *          enumeration.
     * @param   value   Value to check.
     * @warning TRUE if the value exists, FALSE else.
     */
    private static CheckValidKeyboardControl(value: number) : boolean {
        return KeyboardControl[value] != undefined ;
    }

    /**
     * @brief   Check if the given value is defined in the mouse controls
     *          enumeration.
     * @param   value   Value to check.
     * @warning TRUE if the value exists, FALSE else.
     */
    private static CheckValidMouseControl(value: number) : boolean {
        return MouseControl[value] != undefined ;
    }
} ;

/** @brief  Represent mouse button codes with more readable values. */
export enum MouseControl {
    LeftButton,
    MiddleButton,
    RightButton,
    AmountMouseControls
} ;

/** @brief  Represent keyboard key codes with more readable values. */
export enum KeyboardControl {
    Backspace   = 8,
    Tabulation  = 9,
    Enter       = 13,
    Shift       = 16,
    Ctrl        = 17,
    Alt         = 18,
    Escape      = 27,
    PageUp      = 33,
    PageDown    = 34,
    End         = 35,
    Home        = 36,
    LeftArrow,
    UpArrow,
    RightArrow,
    DownArrow,
    Insert      = 45,
    Delete      = 46,
    Key_0       = 48,
    Key_1,
    Key_2,
    Key_3,
    Key_4,
    Key_5,
    Key_6,
    Key_7,
    Key_8,
    Key_9,
    Key_A       = 65,
    Key_B,
    Key_C,
    Key_D,
    Key_E,
    Key_F,
    Key_G,
    Key_H,
    Key_I,
    Key_J,
    Key_K,
    Key_L,
    Key_M,
    Key_N,
    Key_O,
    Key_P,
    Key_Q,
    Key_R,
    Key_S,
    Key_T,
    Key_U,
    Key_V,
    Key_W,
    Key_X,
    Key_Y,
    Key_Z,
    Numpad_0    = 96,
    Numpad_1,
    Numpad_2,
    Numpad_3,
    Numpad_4,
    Numpad_5,
    Numpad_6,
    Numpad_7,
    Numpad_8,
    Numpad_9,
    Numpad_Mul,
    Numpad_Add,
    Numpad_Sub,
    Numpad_Point,
    Numpad_Divide,
    AmountKeyboardControls
} ;
