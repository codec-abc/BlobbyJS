import KinematicBodyModule = require('../../physics/KinematicBody');

/**
 * @brief   An OuterWall defines the end of the game area. The ball bounces on
 *          them (even if not they are not visible) to stay visible on screen.
 */
export class OuterWall extends KinematicBodyModule.KinematicBody {
    /**
     * Create a new Net instance and register it to the PhysicsEngine.
     * @param  {PIXI.Point} position Position of the Net.
     */
    constructor(position: PIXI.Point) {
        super(position) ;
        this.add() ;
    }
}
