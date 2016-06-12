"use strict";
;
class ControlsManager {
    constructor() {
        this.m_keyboardCallbacks = {};
        this.m_mouseCallbacks = {};
        this.m_activeKeyboardControls = new Array();
        this.m_activeMouseControls = new Array();
        this.setupKeyboard();
        this.setupMouse();
        requestAnimationFrame(this.keyboardLoop.bind(this));
    }
    setupKeyboard() {
        var self = this;
        $(window).keydown(function (e) {
            var controlCode = e.which;
            var validControl;
            validControl = ControlsManager.CheckValidKeyboardControl(controlCode);
            if (validControl) {
                var inArrayPos = self.m_activeKeyboardControls.indexOf(controlCode);
                var controlCallback = self.m_keyboardCallbacks[controlCode];
                var hasCallback = (controlCallback !== undefined);
                if (hasCallback && (inArrayPos < 0)) {
                    self.m_activeKeyboardControls.push(controlCode);
                }
            }
            e.preventDefault();
        });
        $(window).keyup(function (e) {
            var controlCode = e.which;
            var inArrayPos = self.m_activeKeyboardControls.indexOf(controlCode);
            if (inArrayPos > -1) {
                self.m_activeKeyboardControls.splice(inArrayPos, 1);
            }
        });
    }
    setupMouse() {
        var self = this;
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
    keyboardLoop() {
        requestAnimationFrame(this.keyboardLoop.bind(this));
        var self = this;
        this.m_activeKeyboardControls.forEach(function (element, index, array) {
            self.m_keyboardCallbacks[element]();
        });
    }
    addKeyboardCallback(key, callback) {
        this.m_keyboardCallbacks[key] = callback;
    }
    addMouseCallback(mouse, callback) {
        this.m_mouseCallbacks[mouse] = callback;
    }
    static CheckValidKeyboardControl(value) {
        return KeyboardControl[value] != undefined;
    }
    static CheckValidMouseControl(value) {
        return MouseControl[value] != undefined;
    }
}
exports.ControlsManager = ControlsManager;
;
(function (MouseControl) {
    MouseControl[MouseControl["LeftButton"] = 0] = "LeftButton";
    MouseControl[MouseControl["MiddleButton"] = 1] = "MiddleButton";
    MouseControl[MouseControl["RightButton"] = 2] = "RightButton";
    MouseControl[MouseControl["AmountMouseControls"] = 3] = "AmountMouseControls";
})(exports.MouseControl || (exports.MouseControl = {}));
var MouseControl = exports.MouseControl;
;
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
})(exports.KeyboardControl || (exports.KeyboardControl = {}));
var KeyboardControl = exports.KeyboardControl;
;
