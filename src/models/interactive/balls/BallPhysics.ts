import RigidBodyModule = require('../../physics/RigidBody');

/**
 * @brief   Class to handle the physics of the Ball.
 */
export class BallPhysics extends RigidBodyModule.RigidBody {
    /** @brief  Weight of the Ball. */
    private static get Weigth(): number { return 0.27 ; }

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


    /**
     * @brief  Create a new Ball physics instance.
     * @param   position    Initial position of the object.
     * @param   area        Area in which the object can move.
     */
    constructor(position: PIXI.Point, area: PIXI.Rectangle) {
        super(area, BallPhysics.Weigth, BallPhysics.Restitution) ;
        this.OpenHeight = true ;

        this.setPosition(position) ;
    }
} ;
