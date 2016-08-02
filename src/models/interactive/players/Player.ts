import BehaviorModule = require('./Behavior');
import JumpModule = require('./Jump');
import ScoringModule = require('./Scoring');

/**
 * @brief   A Player is an entity that is controlled by the user.
 */
export class Player {
    /** @brief  Score management of the Player. */
    private m_scoring: ScoringModule.Scoring ;

    /** @brief  Behavior of the Player. */
    private m_behavior: BehaviorModule.Behavior ;

    /** @brief  Handle the jump behavior of the player. */
    private m_jump: JumpModule.Jump ;

    /**
     * @brief   Create a new Player.
     * @param   texture     Path to the image of the Player.
     * @param   position    Position of the Player when created.
     * @param   bounds      Amount of pixel on left and right in which the player
     *                      can move.
     * @param   speed       Speed of the Player when moving.
     * @param   maxScore    Score to make Player win.
     */
    constructor(
                position: PIXI.Point,
                area: PIXI.Rectangle,
                speedFactor: number,
                maxScore: number
               ) {
        this.m_scoring = new ScoringModule.Scoring(maxScore) ;
        this.m_behavior = new BehaviorModule.Behavior(position, speedFactor) ;
        this.m_jump = new JumpModule.Jump(position) ;
    }

    /**
     * @brief   Make player jump.
     */
    public jump() : void {
        this.m_jump.trigger() ;
    }

    /**
     * @brief   Get the force applied on the player when jumping.
     */
    public get JumpForce() : number {
        return this.m_jump.Force ;
    }

    /**
     * @brief   Get the behavior of the Player.
     */
    public get Behavior() : BehaviorModule.Behavior {
        return this.m_behavior ;
    }
} ;
