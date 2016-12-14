import KinematicBodyModule = require('../../physics/KinematicBody');

/**
 * @brief   A Player is an entity that is controlled by the user.
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
