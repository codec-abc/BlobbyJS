import PhysicsModule = require('./BallPhysics');


export class Ball {
    /** @brief  Manage physics of the Ball. */
    private m_physics: PhysicsModule.BallPhysics ;

    /** @brief  Create a new Ball instance. */
    constructor(position: PIXI.Point, area: PIXI.Rectangle) {
        this.m_physics = new PhysicsModule.BallPhysics(position, area);
        this.m_physics.add() ;
    }

    /**
     * @brief   Update the ball logics.
     */
    public update(): void {
        if (this.m_physics.IsOnGround) {
            // TODO: Make the player win according to the side of the ball on
            // screen.
        }
    }

    /**
     * @brief   Reset the Ball at the provided position.
     * @param   position    Position at which the Ball is put.
     */
    public reset(position: PIXI.Point): void {
        this.m_physics.AABB.x = position.x ;
        this.m_physics.AABB.y = position.y ;
    }


    /** @brief  Get the position of the Ball. */
    public get Position(): PIXI.Point {
        return this.m_physics.Position ;
    }

    /** @brief  Set the AABB of the Ball. */
    public set AABB(aabb: PIXI.Rectangle) {
        this.m_physics.AABB = aabb ;
    }
} ;
