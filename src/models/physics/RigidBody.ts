// @TODO: Avoid cyclic dependency of modules.
import PhysicsEngineModule = require('./PhysicsEngine');

/**
 * @brief   A RigidBody is an entity that is submitted to physics (gravity,
 *          forces, etc).
 */
export abstract class RigidBody {
    /** @brief  Axis-aligned bounding box of the RigidBody. */
    private m_aabb: PIXI.Rectangle ;

    /** @brief  Area in which the RigidBody can move. */
    private m_area: PIXI.Rectangle ;

    /** @brief  Force applied to the RigidBody on X and Y axis.*/
    private m_force: PIXI.Point ;

    /**
     * @brief   Instanciation of a new RigidBody.
     * @param   aabb    Bounding box of the RigidBody.
     * @param   area    Area in which the RigidBody can move.
     */
    constructor(
                aabb: PIXI.Rectangle,
                area: PIXI.Rectangle
               ) {
        this.m_aabb = aabb ;
        this.m_area = area ;
        this.m_force = new PIXI.Point(0, 0) ;
    }

    /**
     * @brief   Remove the RigidBody.
     */
    public remove(): void {
        this.unregister() ;
    }

    /** @brief  Register the RigidBody to the PhysicsEngine. */
    private register(): void {
        const RegisterRigidBody: string = PhysicsEngineModule.PhysicsEngine.RegisterRigidBodyEvent ;

        var event: CustomEvent ;
        event = new CustomEvent(RegisterRigidBody, { 'detail': this }) ;
        dispatchEvent(event) ;
    }

    /** @brief  Unregister the RigidBody from the PhysicsEngine. */
    private unregister(): void {
        const UnregisterRigidBody: string = PhysicsEngineModule.PhysicsEngine.UnregisterRigidBodyEvent ;

        var event: CustomEvent ;
        event = new CustomEvent(UnregisterRigidBody, { 'detail': this }) ;
        dispatchEvent(event) ;
    }

    /** @brief  Get the AABB of the RigidBody. */
    public get AABB(): PIXI.Rectangle {
        return this.m_aabb ;
    }

    /** @brief  Set the AABB of the RigidBody. */
    public set AABB(aabb: PIXI.Rectangle) {
        this.m_aabb = aabb ;
    }
} ;
