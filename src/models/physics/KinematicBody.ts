/**
 * @brief   A KinematicBody is a movable entity that is not affected by forces
 *          but can collide with RigidBody instances.
 */
export class KinematicBody {
    /** @brief  Axis-aligned bounding box of the KinematicBody. */
    private m_aabb: PIXI.Rectangle ;

    /** @brief  Speed of the KinematicBody on X and Y axes. */
    private m_speed: PIXI.Point ;

    /**
     * @brief   Instanciation of a new KinematicBody.
     * @param   aabb    Bounding box of the KinematicBody.
     */
    constructor(aabb: PIXI.Rectangle) {
        this.m_aabb = aabb ;
        this.m_speed = new PIXI.Point(0, 0) ;
    }

    /** @brief  Get the speed of the KinematicBody on X axis. */
    public get SpeedX(): number {
        return this.m_speed.x ;
    }

    /** @brief  Set the speed of the KinematicBody on X axis. */
    public set SpeedX(x: number) {
        this.m_speed.x = x ;
    }

    /** @brief  Get the speed of the KinematicBody on Y axis. */
    public get SpeedY(): number {
        return this.m_speed.y ;
    }

    /** @brief  Set the speed of the KinematicBody on Y axis. */
    public set SpeedY(y: number) {
        this.m_speed.y = y ;
    }
} ;
