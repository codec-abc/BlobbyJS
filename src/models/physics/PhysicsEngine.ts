import PhysicsEventsModule = require('./PhysicsEvents');
import RigidBodyModule = require('./RigidBody');
import KinematicBodyModule = require('./KinematicBody');
import GeometryModule = require('../../utils/Geometry');

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
    private static get NullThreshold(): number { return 0.1 ; }


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
            var rigidAbsoluteAABB: PIXI.Rectangle ;
            {
                var rigidPosition: PIXI.Point = rigid.Position ;
                var rigidAABB: PIXI.Rectangle = rigid.AABB ;
                rigidAbsoluteAABB = this.getAbsoluteAABB(rigidAABB, rigidPosition) ;
            }

            // List of kinematic bodies that are in contact with the rigid body.
            var obstaclesContact: Array<KinematicBodyModule.KinematicBody> = new Array() ;

            var isRigidFalling: boolean = true ;
            for (var obstacle of this.m_obstacles) {
                var kinematicAbsoluteAABB: PIXI.Rectangle ;
                {
                    var kinematicPosition: PIXI.Point = obstacle.CurrentPosition ;
                    var kinematicAABB: PIXI.Rectangle = obstacle.AABB ;
                    kinematicAbsoluteAABB = this.getAbsoluteAABB(kinematicAABB, kinematicPosition) ;
                }

                if (Geometry.Intersect(rigidAbsoluteAABB, kinematicAbsoluteAABB)) {
                    obstaclesContact.push(obstacle) ;

                    this.avoidIntersection(
                        rigid,
                        rigidAbsoluteAABB,
                        obstacle,
                        kinematicAbsoluteAABB
                    ) ;

                    var hasContact: boolean = this.computeCollision
                    (
                        rigid,
                        rigidAbsoluteAABB,
                        obstacle,
                        kinematicAbsoluteAABB
                    ) ;

                    isRigidFalling = isRigidFalling && !hasContact;
                }
            }

            // If the rigid body is touched by several kinematic bodies at the
            // same time, it can generate an instable physics behavior.
            if (obstaclesContact.length > 1) {
                this.correctCollisions(rigid, rigidAbsoluteAABB, obstaclesContact) ;
            }

            rigid.IsFalling = isRigidFalling ;

            // Do nothing if the rigid body is sleeping.
            if (rigid.IsSleeping) {
                continue ;
            }

            this.applyForces(rigid) ;
        }
    }

    /**
     * @brief   Avoid intersections of rigid body and obstacle: unexpected
     *          behavior in the physics engine.
     * @param   rigid                   The rigid body.
     * @param   rigidAbsoluteAABB       AABB of the rigid body at its absolute
     *                                  position.
     * @param   obstacle                The kinematic body.
     * @param   kinematicAbsoluteAABB   AABB of the kinematic body at its
     *                                  absolute position.
     */
    private avoidIntersection(
        rigid: RigidBodyModule.RigidBody,
        rigidAbsoluteAABB: PIXI.Rectangle,
        obstacle: KinematicBodyModule.KinematicBody,
        kinematicAbsoluteAABB: PIXI.Rectangle
    ): void {
        var centerRigid: PIXI.Point = Geometry.GetCenter(rigidAbsoluteAABB) ;
        var outsideAxes: GeometryModule.Axis[] = Geometry.IsOutside(centerRigid, kinematicAbsoluteAABB) ;

        if (outsideAxes.length == 1) {
            // At least one axis on which the center is outside the area of
            // obstacle.
            var axis: GeometryModule.Axis = outsideAxes[0] ;
            switch(axis) {
                case GeometryModule.Axis.PlusX:
                    var updatedX: number = obstacle.CurrentPosition.x + obstacle.AABB.width ;
                    rigid.updatePositionOnX(updatedX) ;
                    break ;

                case GeometryModule.Axis.MinusX:
                    var updatedX: number = obstacle.CurrentPosition.x - rigid.AABB.width ;
                    rigid.updatePositionOnX(updatedX) ;
                    break ;

                case GeometryModule.Axis.PlusY:
                    var updatedY: number = obstacle.CurrentPosition.y + obstacle.AABB.height ;
                    rigid.updatePositionOnY(updatedY) ;
                    break ;

                case GeometryModule.Axis.MinusY:
                    var updatedY: number = obstacle.CurrentPosition.y - rigid.AABB.height ;
                    rigid.updatePositionOnY(updatedY) ;
                    break ;
            }
        }
        else {
            // The center is either outside on both axes or inside the area of
            // obstacle on both axes.
        }
    }

    /**
     * Correction of the collisions on a rigid body when it is in contact with
     * several kinematic bodies at the same time.
     * @param   rigid                   The rigid body.
     * @param   rigidAbsoluteAABB       AABB of the rigid body at its absolute
     *                                  position.
     * @param   obstacles               List of obstacles in contact with the
     *                                  rigid body.
     */
    private correctCollisions(
        rigid: RigidBodyModule.RigidBody,
        rigidAbsoluteAABB: PIXI.Rectangle,
        obstacles: Array<KinematicBodyModule.KinematicBody>
    ): void {
        var fastestDirection: number = 0 ;
        var fastestObstacle: KinematicBodyModule.KinematicBody = obstacles[0] ;
        var slowestObstacle: KinematicBodyModule.KinematicBody = obstacles[0] ;

        // Search for the slowest and the fastest obstacles that are moving in
        // different directions (where at least one is moving).
        obstacles.forEach((obstacle: KinematicBodyModule.KinematicBody) => {
            fastestDirection = Math.sign(fastestObstacle.SpeedX) ;
            var slowestDirection: number = Math.sign(slowestObstacle.SpeedX) ;
            var currentDirection: number = Math.sign(obstacle.SpeedX) ;

            var speedFastest: number = Math.abs(fastestObstacle.SpeedX) ;
            var speedSlowest: number = Math.abs(slowestObstacle.SpeedX) ;
            var speedCurrent: number = Math.abs(obstacle.SpeedX) ;
            if ((speedCurrent > speedFastest)
                    && (currentDirection != slowestDirection)) {
                fastestObstacle = obstacle ;
            }
            else if ((speedCurrent < speedSlowest)
                        && (currentDirection != fastestDirection)) {
                slowestObstacle = obstacle ;
            }
        }) ;

        // Put the rigid body above the fastest kinematic body.
        rigid.updatePositionOnY(fastestObstacle.CurrentPosition.y - rigid.AABB.height) ;
        // Apply a force to mimic an expulsion.
        rigid.Force.y = Math.abs(fastestObstacle.SpeedX) ;
    }

    /**
     * @brief   Compute the collision between a rigid body and a kinematic body.
     * @param   rigid                   The rigid body.
     * @param   rigidAbsoluteAABB       AABB of the rigid body at its absolute
     *                                  position.
     * @param   obstacle                The kinematic body.
     * @param   kinematicAbsoluteAABB   AABB of the kinematic body at its
     *                                  absolute position.
     * @return  TRUE if the rigid body falls as the kinematic body is not just
     *          below (in contact). FALSE if the rigid body does not fall.
     */
    private computeCollision(
                             rigid: RigidBodyModule.RigidBody,
                             rigidAbsoluteAABB: PIXI.Rectangle,
                             obstacle: KinematicBodyModule.KinematicBody,
                             kinematicAbsoluteAABB: PIXI.Rectangle
                            ): boolean {
        const MaxForce: number = 5 ;

        // Force of X axis.
        if (!rigid.IsOnGround) {
            var ratioX: number = Geometry.HorizontalContact(rigidAbsoluteAABB, kinematicAbsoluteAABB) ;
            rigid.Force.x = (ratioX * MaxForce) ;
            rigid.Force.x = Math.min(rigid.Force.x, MaxForce) ;
        }

        if (Math.abs(rigid.Force.x) < PhysicsEngine.NullThreshold) {
            rigid.Force.x = Math.random() ;
        }

        // Force of Y axis.
        var ratioY: number = Geometry.VerticalContact(rigidAbsoluteAABB, kinematicAbsoluteAABB) ;
        if (Math.abs(obstacle.SpeedY) > PhysicsEngine.NullThreshold) {
            rigid.Force.y = -Math.abs(obstacle.SpeedY) ;
        }
        else if (Math.abs(ratioY) >= 1) {
            rigid.Force.y = -rigid.Force.y * rigid.Restitution ;
        }

        if (Math.abs(rigid.Force.y) < PhysicsEngine.NullThreshold) {
            rigid.Force.y = 0 ;
            return false ;
        }

        return true ;
    }

    /**
     * @brief   Apply forces on a rigid body.
     * @param   rigid   The rigid body.
     */
    private applyForces(rigid: RigidBodyModule.RigidBody): void {
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
            var momentForce: number = (this.m_gravity * rigid.Weigth) / 10 ;
            rigid.Force.y += momentForce ;
        }

        rigid.updatePositionOnY(rigid.Position.y + rigid.Force.y) ;
        rigid.updatePositionOnX(rigid.Position.x + rigid.Force.x) ;
    }

    /**
     * Compute the absolute AABB in world transformations.
     * @param  {PIXI.Rectangle} aabb     The AABB in local transformations.
     * @param  {PIXI.Point}     position Absolute position of the AABB.
     * @return {PIXI.Rectangle}          A copy of the AABB, with absolute
     *                                   position.
     */
    private getAbsoluteAABB(
        aabb: PIXI.Rectangle,
        position: PIXI.Point
    ) : PIXI.Rectangle {
        var absoluteAABB: PIXI.Rectangle = aabb.clone() ;
        absoluteAABB.x += position.x ;
        absoluteAABB.y += position.y ;
        return absoluteAABB ;
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
