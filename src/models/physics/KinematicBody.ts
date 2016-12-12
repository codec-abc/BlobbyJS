import PhysicsEventsModule = require('./PhysicsEvents');

let PhysicsEvents = PhysicsEventsModule.PhysicsEvents ;

/**
 * @brief   A KinematicBody is a movable entity that is not affected by forces
 *          but can collide with RigidBody instances.
 */
export class KinematicBody {
    /** @brief  Axis-aligned bounding box of the KinematicBody. */
    private m_aabb: PIXI.Rectangle ;

    /** @brief  Current position of the Player. */
    private m_currentPosition: PIXI.Point ;

    /** @brief  Speed of the KinematicBody on X and Y axes. */
    private m_speed: PIXI.Point ;

    /**
     * @brief   Instanciation of a new KinematicBody.
     * @param   aabb    Bounding box of the KinematicBody.
     */
    constructor(position: PIXI.Point, aabb?: PIXI.Rectangle) {
        if (aabb != undefined) {
            this.m_aabb = aabb ;
        }
        else {
            this.m_aabb = new PIXI.Rectangle(0, 0, 0, 0) ;
        }
        this.m_currentPosition = position ;
        this.m_speed = new PIXI.Point(0, 0) ;
    }


    /**
     * @brief  Add the RigidBody to the physics engine.
     */
    public add(): void {
        this.register() ;
    }

    /**
     * @brief   Remove the RigidBody from the physics engine.
     */
    public remove(): void {
        this.unregister() ;
    }

    /** @brief  Register the KinematicBody to the PhysicsEngine. */
    private register(): void {
        const RegisterObstacle: string = PhysicsEvents.RegisterObstacleEvent ;

        var event: CustomEvent ;
        event = new CustomEvent(RegisterObstacle, { 'detail': this }) ;
        dispatchEvent(event) ;
    }

    /** @brief  Unregister the KinematicBody from the PhysicsEngine. */
    private unregister(): void {
        const UnregisterObstacle: string = PhysicsEvents.UnregisterObstacleEvent ;

        var event: CustomEvent ;
        event = new CustomEvent(UnregisterObstacle, { 'detail': this }) ;
        dispatchEvent(event) ;
    }

    /**
     * @brief   Get the current position of the Player.
     */
    public get CurrentPosition(): PIXI.Point {
        return this.m_currentPosition ;
    }

    /** @brief  Get the speed of the Kinematic Body on both X and Y axes. */
    public get Speed(): PIXI.Point {
        return this.m_speed ;
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

    /** @brief  Get the AABB of the KinematicBody. */
    public get AABB(): PIXI.Rectangle {
        return this.m_aabb ;
    }

    /** @brief  Set the AABB of the KinematicBody. */
    public set AABB(aabb: PIXI.Rectangle) {
        this.m_aabb = aabb ;
    }
} ;
