import RigidBodyModule = require('../../physics/RigidBody');

/**
 * @brief   Class to handle the physics of the Ball.
 */
export class BallPhysics extends RigidBodyModule.RigidBody {
    /** @brief  Decrease of the force on Y axis. */
    private static get ForceDecrease(): number { return 0.5 ; }

    /** @brief  Maximal force toward ground that can be applied to the ball. */
    private static get MaxForceDown(): number { return -16 ; }

    /** @brief  Maximal force on sides that can be applied to the ball. */
    private static get MaxForceLateral(): number { return 5 ; }

    /** @brief  Friction of the ground of Ball. */
    private static get GroundFriction(): number { return 0.7 ; }

    /**
     * @brief   Coefficient of restitution to make the Ball bounce.
     *          To be set between 0 and 1 for realistic physics (!).
     *          Default restitution of a true volley ball on a steel surface.
     *          See Principles of Biomechanics and Motion Analysis,
     *          Iwan W. Griffiths.
     */
    private static get Restitution(): number { return 0.76 ; }


    /** @brief  Make the ball be updated. */
    private m_startUpdate: boolean ;

    /** @brief  Detect if the ball is on ground. */
    private m_isOnGround: boolean ;


    /** @brief  Create a new Ball physics instance. */
    constructor(
                aabb: PIXI.Rectangle,
                area: PIXI.Rectangle
               ) {
        super(aabb, area) ;
        this.m_startUpdate = false ;
        this.m_isOnGround = false ;
    }
} ;
