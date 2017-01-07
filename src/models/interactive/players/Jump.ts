import IUpdatableModule = require('../../../interfaces/IUpdatable');

/**
 * @brief   Make the player jump.
 */
export class Jump implements IUpdatableModule.IUpdatable {
    /** @brief  Event for jumping player update position. */
    public static get JumpPlayerUpdateEvent(): string { return 'JumpPlayer' ; }

    /** @brief  Initial jump force when a jump is started. */
    private static get InitialJumpForce() : number { return -14 ; }

    /** @brief  Decrease of the jump force. */
    private static get JumpForceDecrease() : number { return 0.7 ; }

    /** @brief  Maximum amount of jumps that can be made at the same time. */
    private static get MaxJumps() : number { return 2 ; }

    private static get AmountFrameBeforeJump() : number { return 16 ; }


    /** @brief  Position of the player. */
    private m_position: PIXI.Point ;

    /** @brief  Speed of the player. */
    private m_speed: PIXI.Point ;

    /** @brief  Force of the jump. */
    private m_jumpForce: number ;

    private m_amountJumps: number ;

    private m_framesSinceLastJump: number ;

    /** @brief Flag that indicate if we should call the updateJump in the main loop. */
    private m_shouldUpdateJumpOnUpdate : boolean;

    /** @brief  Position of the player to be on ground. */
    private m_onGroundPosition: number ;

    /** @brief  Create a Jump behavior for Player. */
    constructor(position: PIXI.Point, speed: PIXI.Point) {
        this.m_position = position ;
        this.m_onGroundPosition = position.y ;
        this.m_speed = speed ;
        this.m_amountJumps = 0 ;
        this.m_speed.y = 0 ;
        this.m_shouldUpdateJumpOnUpdate = false;

        // Used to enable the first jump.
        this.m_framesSinceLastJump = Jump.AmountFrameBeforeJump ;
    }

    /** @brief  Trigger the jump. */
    public trigger() : void {
        if ((this.m_framesSinceLastJump >= Jump.AmountFrameBeforeJump)
                && (this.m_amountJumps < Jump.MaxJumps)) {
            this.m_speed.y = Jump.InitialJumpForce ;
            this.m_amountJumps++ ;
            this.m_framesSinceLastJump = 0 ;

            if (this.m_amountJumps == 1) {
                this.m_shouldUpdateJumpOnUpdate = true ;
            }
        }
    }

    /** @brief  Refresh the jump position of the player. */
    private updateJump() : void {
        this.m_position.y += this.m_speed.y ;
        this.m_speed.y += Jump.JumpForceDecrease ;
        dispatchEvent(new Event(Jump.JumpPlayerUpdateEvent)) ;

        if (this.m_position.y < this.m_onGroundPosition) {
            this.m_framesSinceLastJump++ ;
            this.m_shouldUpdateJumpOnUpdate = true ;
        }
        else {
            this.m_position.y = this.m_onGroundPosition ;
            this.m_amountJumps = 0 ;
            this.m_speed.y = 0 ;
            this.m_framesSinceLastJump = Jump.AmountFrameBeforeJump ;
             this.m_shouldUpdateJumpOnUpdate = false ;
        }
    }

    /** @brief  Get the force applied on Player for jumping. */
    public get Force() : number {
        return this.m_speed.y ;
    }

    /**
     * @brief   Update the object.
     */
    public update(): void {
        if (this.m_shouldUpdateJumpOnUpdate) {
            this.updateJump();
        }

    }
} ;
