import PhysicsEventsModule = require('./PhysicsEvents');

let PhysicsEvents = PhysicsEventsModule.PhysicsEvents ;

/**
 * @brief   A RigidBody is an entity that is submitted to physics (gravity,
 *          forces, etc).
 */
export abstract class RigidBody {
    /** @brief  Position of the RigidBody. */
    private m_position: PIXI.Point ;

    /** @brief  Axis-aligned bounding box of the RigidBody. */
    private m_aabb: PIXI.Rectangle ;

    /** @brief  Area in which the RigidBody can move. */
    private m_area: PIXI.Rectangle ;

    /** @brief  Force applied to the RigidBody on X and Y axis.*/
    private m_force: PIXI.Point ;

    /** @brief  Weigth of the RigidBody. */
    private m_weight: number ;

    /** @brief  If TRUE, no matter if the body exits screen from top. */
    private m_openHeight: boolean ;

    /**
     * @brief   Coefficient of restitution to make the RigidBody bounce.
     *          To be set between 0 and 1 for realistic physics with attenuation
     *          of bounce height through time.
     */
    private m_restitution: number ;

    /**
     * @brief  Detect if the ball is on ground.
     */
    private m_isOnGround: boolean ;

    /**
     * @brief   Instanciation of a new RigidBody.
     * @param   area        Area in which the RigidBody can move.
     * @param   weigth      Weigth of the RigidBody.
     * @param   restitution Coefficient of restitution to make the RigidBody
     *                      bounce.
     */
    constructor(
                area: PIXI.Rectangle,
                weigth: number,
                restitution: number
               ) {
        this.m_area = area ;
        this.m_weight = weigth ;
        this.m_restitution = restitution;
        this.m_isOnGround = false ;
        this.m_force = new PIXI.Point(0, 0) ;
        this.m_position = new PIXI.Point(0, 0) ;
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

    /** @brief  Register the RigidBody to the PhysicsEngine. */
    private register(): void {
        const RegisterRigidBody: string = PhysicsEvents.RegisterRigidBodyEvent ;

        var event: CustomEvent ;
        event = new CustomEvent(RegisterRigidBody, { 'detail': this }) ;
        dispatchEvent(event) ;
    }

    /** @brief  Unregister the RigidBody from the PhysicsEngine. */
    private unregister(): void {
        const UnregisterRigidBody: string = PhysicsEvents.UnregisterRigidBodyEvent ;

        var event: CustomEvent ;
        event = new CustomEvent(UnregisterRigidBody, { 'detail': this }) ;
        dispatchEvent(event) ;
    }

    /**
     * @brief   Update the position of the RigidBody on X axis.
     * @param   x   Position of the RigidBody on X axis.
     */
    public updatePositionOnX(x: number): void {
        this.m_position.x = x ;
    }

    /**
     * @brief   Update the position of the RigidBody on Y axis.
     * @param   x   Position of the RigidBody on Y axis.
     */
    public updatePositionOnY(y: number): void {
        this.m_position.y = y ;

        var bottom: number = this.Position.y + this.AABB.height ;
        if (bottom >= this.Area.height) {
            this.Force.y = 0 ;
            this.Position.y = this.Area.height - this.AABB.height ;
            this.m_isOnGround = true ;
        }
        else {
            this.m_isOnGround = false ;
        }
    }

    /** @brief  Get the position of the RigidBody. */
    public get Position(): PIXI.Point {
        return this.m_position ;
    }

    /** @brief  Set the position of the RigidBody. */
    protected setPosition(position: PIXI.Point): void {
        this.m_position = position.clone() ;
    }

    /** @brief  Get the AABB of the RigidBody. */
    public get AABB(): PIXI.Rectangle {
        return this.m_aabb ;
    }

    /** @brief  Set the AABB of the RigidBody. */
    public set AABB(aabb: PIXI.Rectangle) {
        this.m_aabb = aabb ;
    }

    /** @brief  Get the area in which the RigidBody can move. */
    public get Area(): PIXI.Rectangle {
        return this.m_area ;
    }

    /** @brief  Get the force applied on the RigidBody, on axes X and Y. */
    public get Force(): PIXI.Point {
        return this.m_force ;
    }

    /** @brief  Get the weigth of the RigidBody. */
    public get Weigth(): number {
        return this.m_weight ;
    }

    /** @brief  Get the restitution of the RigidBody. */
    public get Restitution(): number {
        return this.m_restitution ;
    }

    /** @brief  Set the restitution of the RigidBody. */
    public set Restitution(restitution: number) {
        this.m_restitution = restitution ;
    }

    /** @brief  If TRUE, no matter if the body exits screen from top. */
    public get OpenHeight(): boolean {
        return this.m_openHeight ;
    }

    /** @brief  If TRUE, no matter if the body exits screen from top. */
    public set OpenHeight(openHeight: boolean) {
        this.m_openHeight = openHeight ;
    }

    /** @brief  A RigidBody sleeps when no force is applied on it. */
    public get IsSleeping(): boolean {
        return (this.Force.x == 0)
                    && (this.Force.y == 0)
                    && (this.m_isOnGround) ;
    }

    /** @brief  If TRUE, the RigidBody is on ground. */
    public get IsOnGround(): boolean {
        return this.m_isOnGround ;
    }
} ;
