import PhysicsModule = require('./Physics');

export class Ball {
    /** @brief  Manage physics of the Ball. */
    private m_physics: PhysicsModule.BallPhysics ;


    /** @brief  Create a new Ball instance. */
    constructor(
                aabb: PIXI.Rectangle,
                area: PIXI.Rectangle
               ) {
        // this.m_physics = new ...;
    }

    /**
     * @brief   Reset the Ball at the provided position.
     * @param   position    Position at which the Ball is put.
     */
    public reset(position: PIXI.Point) {
        //this.m_physics.AABB.x = position.x ;
        //this.m_physics.AABB.y = position.y ;
    }
} ;
