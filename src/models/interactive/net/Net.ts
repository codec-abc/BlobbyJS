import KinematicBodyModule = require('../../physics/KinematicBody');

/**
 * @brief   A Net is at the middle of the game area.
 *          Each Player"has" to jump to send the ball in the area of its
 *          opponent.
 */
export class Net extends KinematicBodyModule.KinematicBody {
    /**
     * Create a new Net instance and register it to the PhysicsEngine.
     * @param  {PIXI.Point} position Position of the Net.
     */
    constructor(position: PIXI.Point) {
        super(position) ;
        this.add() ;
    }
}
