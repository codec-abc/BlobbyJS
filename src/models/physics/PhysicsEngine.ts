import PhysicsEventsModule = require('./PhysicsEvents');
import RigidBodyModule = require('./RigidBody');
import KinematicBodyModule = require('./KinematicBody');
import GeometryModule = require('../utils/Geometry');

let PhysicsEvents = PhysicsEventsModule.PhysicsEvents ;
let Geometry = GeometryModule.Geometry ;

/**
 * @brief   Physics engine to manage rigid bodies in the game.
 */
export class PhysicsEngine {
    /** @brief  Friction applied on rigid bodies. */
    private static get Friction(): number { return 0.01 ; }

    /** @brief  Get the gravity force value. */
    private static get GravityForce(): number { return 9.8 ; }

    /** @brief  Threshold to consider no force is applied anymore. */
    private static get NullForceThreshold(): number { return 0.1 ; }


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
            var rigidPosition: PIXI.Point = rigid.Position ;
            var rigidAABB: PIXI.Rectangle = rigid.AABB ;
            var rigidAbsoluteAABB = rigidAABB.clone() ;
            rigidAbsoluteAABB.x += rigidPosition.x ;
            rigidAbsoluteAABB.y += rigidPosition.y ;

            var isRigidFalling: boolean = true ;
            for (var obstacle of this.m_obstacles) {
                var kinematicAbsoluteAABB = obstacle.AABB.clone() ;
                kinematicAbsoluteAABB.x += obstacle.CurrentPosition.x ;
                kinematicAbsoluteAABB.y += obstacle.CurrentPosition.y ;

                if (Geometry.Intersect(rigidAbsoluteAABB, kinematicAbsoluteAABB)) {
                    // Force of X axis.
                    var ratioX: number = Geometry.HorizontalContact(rigidAbsoluteAABB, kinematicAbsoluteAABB) ;
                    rigid.Force.x = ratioX ;

                    if (Math.abs(rigid.Force.x) < PhysicsEngine.NullForceThreshold) {
                        rigid.Force.x = 0 ;
                    }

                    // Force of Y axis.
                    var ratioY: number = Geometry.VerticalContact(rigidAbsoluteAABB, kinematicAbsoluteAABB) ;
                    rigid.Force.y = -rigid.Force.y * rigid.Restitution * ratioY ;

                    if (Math.abs(rigid.Force.y) < PhysicsEngine.NullForceThreshold) {
                        rigid.Force.y = 0 ;
                        isRigidFalling = false ;
                    }
                }
            }
            rigid.IsFalling = isRigidFalling ;

            // Do nothing if the rigid body is sleeping.
            if (rigid.IsSleeping) {
                continue ;
            }

            // Apply friction on the ball when it is on ground.
            if (rigid.IsOnGround) {
                if (rigid.Force.x > 0) {
                    rigid.Force.x -= PhysicsEngine.Friction ;
                }
                else if (rigid.Force.x < 0) {
                    rigid.Force.x += PhysicsEngine.Friction ;
                }

                // Stop completely the ball if the move is close to the
                // threshold.
                if (Math.abs(rigid.Force.x) < PhysicsEngine.Friction) {
                    rigid.Force.x = 0 ;
                }
            }

            // Apply physics on the rigid body.
            if (rigid.IsFalling) {
                var area: PIXI.Rectangle = rigid.Area ;
                var momentForce: number = (this.m_gravity * rigid.Weigth) / 10 ;
                rigid.Force.y += momentForce ;
                rigid.updatePositionOnY(rigid.Position.y + rigid.Force.y) ;

                rigid.updatePositionOnX(rigid.Position.x + rigid.Force.x) ;
            }
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
