"use strict";
const ControlsManager = require('../ControlsManager');
let Controls = ControlsManager.ControlsManager;
class Screen {
    constructor() {
        this.m_controls = new Controls();
        this.setup();
    }
    addKeyboardCallback(key, callback) {
        this.m_controls.addKeyboardCallback(key, callback);
    }
    addMouseCallback(mouse, callback) {
        this.m_controls.addMouseCallback(mouse, callback);
    }
}
exports.Screen = Screen;
;
