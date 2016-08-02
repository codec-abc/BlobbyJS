/**
 * @brief   Make the player jump.
 */
export class Jump {
    /** @brief  Initial jump force when a jump is started. */
    private static get InitialJumpForce() : number { return -14 ; }

    /** @brief  Decrease of the jump force. */
    private static get JumpForceDecrease() : number { return 0.7 ; }

    /** @brief  Maximum amount of jumps that can be made at the same time. */
    private static get MaxJumps() : number { return 2 ; }

    private static get AmountFrameBeforeJump() : number { return 16 ; }


    /** @brief  Position of the player. */
    private m_position: PIXI.Point ;

    /** @brief  Force of the jump. */
    private m_jumpForce: number ;

    /** @brief  Flag that indicates whether the player is currently jumping. */
    private m_amountJumps: number ;

    private m_framesSinceLastJump: number ;

    /** @brief  Position of the player to be on ground. */
    private m_onGroundPosition: number ;

    /** @brief  Create a Jump behavior for Player. */
    constructor(position: PIXI.Point) {
        this.m_position = position ;
        this.m_onGroundPosition = position.y ;
        this.m_amountJumps = 0 ;
        this.m_jumpForce = 0 ;

        // Used to enable the first jump.
        this.m_framesSinceLastJump = Jump.AmountFrameBeforeJump ;
    }

    /** @brief  Trigger the jump. */
    public trigger() : void {
        if ((this.m_framesSinceLastJump >= Jump.AmountFrameBeforeJump)
                && (this.m_amountJumps < Jump.MaxJumps)) {
            this.m_jumpForce = Jump.InitialJumpForce ;
            this.m_amountJumps++ ;
            this.m_framesSinceLastJump = 0 ;

            console.log(this.m_framesSinceLastJump) ;

            if (this.m_amountJumps == 1) {
                requestAnimationFrame(this.updateJump.bind(this)) ;
            }
        }
    }

    /** @brief  Refresh the jump position of the player. */
    private updateJump() : void {
        this.m_position.y += this.m_jumpForce ;
        this.m_jumpForce += Jump.JumpForceDecrease ;

        if (this.m_position.y < this.m_onGroundPosition) {
            this.m_framesSinceLastJump++ ;
            requestAnimationFrame(this.updateJump.bind(this)) ;
        }
        else {
            this.m_position.y = this.m_onGroundPosition ;
            this.m_amountJumps = 0 ;
            this.m_jumpForce = 0 ;
            this.m_framesSinceLastJump = Jump.AmountFrameBeforeJump ;
        }
    }

    /** @brief  Get the force applied on Player for juming. */
    public get Force() : number {
        return this.m_jumpForce ;
    }
} ;
