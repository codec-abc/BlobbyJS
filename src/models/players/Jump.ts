/** @brief  Make the player jump. */
export class Jump {
    /** @brief  Position of the player. */
    private m_position: PIXI.Point ;

    /** @brief  Force of the jump. */
    private m_jumpForce: number ;

    /** @brief  Flag that indicates whether the player is currently jumping. */
    private m_isJumping: boolean ;

    /** @brief  Position of the player to be on ground. */
    private m_onGroundPosition: number ;

    /** @brief  Create a Jump behavior for Player. */
    constructor(position: PIXI.Point) {
        this.m_position = position ;
        this.m_onGroundPosition = position.y ;
    }

    /** @brief  Trigger the jump. */
    public trigger() : void {
        if (!this.m_isJumping) {
            this.m_jumpForce = -12 ;
            this.m_isJumping = true ;
            requestAnimationFrame(this.updateJump.bind(this)) ;
        }
    }

    /** @brief  Refresh the jump position of the player. */
    private updateJump() : void {
        this.m_position.y += this.m_jumpForce ;
        this.m_jumpForce += 0.5 ;

        if (this.m_position.y < this.m_onGroundPosition) {
            requestAnimationFrame(this.updateJump.bind(this)) ;
        }
        else {
            this.m_position.y = this.m_onGroundPosition ;
            this.m_isJumping = false ;
        }
    }
} ;
