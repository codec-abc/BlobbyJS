import ControlsManager = require('../ControlsManager');
import IUpdatableModule = require('../../interfaces/IUpdatable');
let Controls = ControlsManager.ControlsManager ;

/**
 * @brief   Abstract class that represents screens.
 */
export abstract class Screen implements IUpdatableModule.IUpdatable {
    /** @brief  Controls used on the screen. */
    private m_controls : ControlsManager.ControlsManager ;

    /**
     * @brief   Create a new Screen.
     */
    constructor() {
        this.m_controls = new Controls() ;
        this.setup() ;
    }

    /**
     * @brief   Set up the screen.
     */
    protected abstract setup() : void ;

    /**
     * @brief   Add control from keyboard.
     * @param   key         Keyboard key to bind to an action.
     * @param   callback    Function to be called when the key is pressed.
     */
    protected addKeyboardCallback(
                                  key: ControlsManager.KeyboardControl,
                                  callback: () => void
                                 ) : void {
        this.m_controls.addKeyboardCallback(key, callback) ;
    }

    /**
     * @brief   Add control from mouse.
     * @param   mouse       Mouse button to bind to an action.
     * @param   callback    Function to be called when the key is pressed.
     */
    protected addMouseCallback(
                               mouse: ControlsManager.MouseControl,
                               callback: () => void
                              ) : void {
        this.m_controls.addMouseCallback(mouse, callback) ;
    }

    /**
     * @brief   Update the object.
     */
    public update(): void {
        this.m_controls.update() ;
    } 

} ;
