import BehaviorModule = require('./Behavior');
import JumpModule = require('./Jump');
import ScoringModule = require('./Scoring');
import IUpdatableModule = require('../../../interfaces/IUpdatable');

/**
 * @brief   A Player is an entity that is controlled by the user.
 */
export class Player implements IUpdatableModule.IUpdatable {
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
     * @param   speed       Speed of the Player when moving.
     * @param   maxScore    Score to make Player win.
     */
    constructor(
                position: PIXI.Point,
                speedFactor: number,
                maxScore: number
               ) {
        this.m_scoring = new ScoringModule.Scoring(maxScore) ;
        this.m_behavior = new BehaviorModule.Behavior(position, speedFactor) ;
        this.m_jump = new JumpModule.Jump(this.m_behavior.CurrentPosition, this.m_behavior.Speed) ;

        this.m_behavior.add() ;
    }

    /**
     * @brief   Make player jump.
     */
    public jump() : void {
        this.m_jump.trigger() ;
    }

    /** @brief  Make the player score one point. */
    public score(): void {
        this.m_scoring.score(1) ;
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

    /** @brief  Set the AABB of the Ball. */
    public set AABB(aabb: PIXI.Rectangle) {
        this.m_behavior.AABB = aabb ;
    }

    /**
     * Get the score of the Player.
     * @return {number} Current score of the Player.
     */
    public get ScorePoints(): number {
        return this.m_scoring.CurrentPoints ;
    }

    /**
     * @brief   Update the object.
     */
    public update(): void {
        this.m_jump.update();
        this.Behavior.update() ;
    }
} ;
