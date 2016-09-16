import PhysicsEventsModule = require('./PhysicsEvents');
import RigidBodyModule = require('./RigidBody');
import KinematicBodyModule = require('./KinematicBody');

let PhysicsEvents = PhysicsEventsModule.PhysicsEvents ;

/**
 * @brief   Physics engine to manage rigid bodies in the game.
 */
export class PhysicsEngine {
    /** @brief  Get the gravity force value. */
    private static get GravityForce(): number { return 9.8 ; }

    /** @brief  Gravity force applied on RigidBodies. */
    private m_gravity: number ;

    /** @brief  List of rigid bodies. */
    private m_rigidBodies: RigidBodyModule.RigidBody[] ;

    /** @brief  List of kinematic bodies. */
    private m_obstacles: KinematicBodyModule.KinematicBody[] ;

    /**
     * @brief   Instanciation of the PhysicsEngine.
     */
    constructor() {
        this.m_gravity = PhysicsEngine.GravityForce ;
        this.m_rigidBodies = [] ;
        this.m_obstacles = [] ;

        addEventListener(PhysicsEvents.RegisterRigidBodyEvent, this.addRigidBody.bind(this)) ;
        addEventListener(PhysicsEvents.UnregisterRigidBodyEvent, this.removeRigidBody.bind(this)) ;

        addEventListener(PhysicsEvents.RegisterObstacleEvent, this.addObstacle.bind(this)) ;
        addEventListener(PhysicsEvents.UnregisterObstacleEvent, this.removeObstacle.bind(this)) ;
    }

    /**
     * @brief   Update the PhysicsEngine and notify RigidBody instances when
     *          needed (collision, etc).
     */
    public update(): void {
        for (var rigid of this.m_rigidBodies) {
            if (rigid.IsSleeping) {
                continue ;
            }

            // for (var obstacle in this.m_obstacles) {
            var area: PIXI.Rectangle = rigid.Area ;
            var aabb: PIXI.Rectangle = rigid.AABB ;
            var position: PIXI.Point = rigid.Position ;

            var momentForce: number = (this.m_gravity * rigid.Weigth) / 10 ;
            rigid.Force.y += momentForce ;
            rigid.updatePositionOnY(rigid.Position.y + rigid.Force.y) ;
            // }
        }
    }

    /**
     * @brief   Register a RigidBody to the PhysicsEngine.
     * @param   event   Event containing the RigidBody to register.
     */
    private addRigidBody(event: CustomEvent): void {
        this.m_rigidBodies.push(event.detail) ;
    }

    /**
     * @brief   Unregister a RigidBody from the PhysicsEngine.
     * @param   event   Event containing the RigidBody to unregister.
     */
    private removeRigidBody(event: CustomEvent): void {
        var index: number = this.m_rigidBodies.indexOf(event.detail) ;

        if (index > -1) {
            this.m_rigidBodies.splice(index, 1) ;
        }
    }

    /**
     * @brief   Register an Obstacle to the PhysicsEngine.
     * @param   event   Event containing the Obstacle to register.
     */
    private addObstacle(event: CustomEvent): void {
        this.m_obstacles.push(event.detail) ;
    }

    /**
     * @brief   Unregister an Obstacle from the PhysicsEngine.
     * @param   event   Event containing the Obstacle to unregister.
     */
    private removeObstacle(event: CustomEvent): void {
        var index: number = this.m_obstacles.indexOf(event.detail) ;

        if (index > -1) {
            this.m_obstacles.splice(index, 1) ;
        }
    }
} ;
