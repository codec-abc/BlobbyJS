/**
 * @brief   A Ball can be shot by players.
 */
export class Ball extends PIXI.Sprite {
    /** @brief  Decrease of the force on Y axis. */
    private static get ForceDecrease() : number { return 0.5 ; }

    /** @brief  Maximal force toward ground that can be applied to the ball. */
    private static get MaxForceDown() : number { return -12 ; }

    /** @brief  Base rotation speed. */
    private static get BaseRotationSpeed() : number { return 0.01 ; }


    /** @brief  Bounds of the Ball: x = left/right, y = ground. */
    private m_bounds: PIXI.Point ;

    /** @brief  Force applied to the Ball on X and Y axis.*/
    private m_force: PIXI.Point ;

    private m_isOnGround: boolean ;


    /** @brief  Create a new Ball instance. */
    constructor(
                texture: string,
                bounds: PIXI.Point
               ) {
        var spriteTexture: PIXI.Texture = PIXI.Texture.fromImage(texture) ;
        super(spriteTexture) ;

        this.m_bounds = bounds ;
        this.m_force = new PIXI.Point(0, 0) ;
        this.m_isOnGround = false ;

        if (spriteTexture.baseTexture.hasLoaded) {
            this.onTextureUpdated(spriteTexture) ;
        }
        else {
            spriteTexture.addListener('update', this.onTextureUpdated.bind(this)) ;
        }
    }

    /**
     * @brief   Callback when the Player texture is loaded.
     */
    private onTextureUpdated(texture: PIXI.Texture) : void {
        this.m_bounds.y -= texture.height ;
        this.anchor.x = 0.5 ;
        this.anchor.y = 0.5 ;
    }

    /**
     * @brief   Reset the Ball at the provided position.
     * @param   position    Position at which the Ball is put.
     */
    public reset(position: PIXI.Point) {
        this.position = position ;
    }

    /**
     * @brief   Update the Ball.
     */
    public update() : void {
        if (this.m_force.y > Ball.MaxForceDown) {
            this.m_force.y -= Ball.ForceDecrease ;
        }

        if (this.position.y < this.m_bounds.y) {
            this.position.y -= this.m_force.y ;
            this.rotation += Ball.BaseRotationSpeed * (this.m_force.y) ;
        }
    }
} ;
