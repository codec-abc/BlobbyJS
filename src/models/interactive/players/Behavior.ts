/**
 * @brief   Behavior of a Player.
 */
export class Behavior {
    /** @brief  Default speed to make Player move. */
    public static get DefaultSpeed() : number { return 8 ; }

    /** @brief  Initial position of the Player. */
    private m_initialPosition: PIXI.Point ;

    /** @brief  Current position of the Player. */
    private m_currentPosition: PIXI.Point ;

    /** @brief  Force resulting of player moves. */
    private m_moveForce: number ;

    /** @brief  Speed of the Player when moving. */
    private m_speed: number ;

    /** @brief  Minimal coordinate on X axis the player can reach. */
    private m_minBound: number ;

    /** @brief  Maximal coordinate on X axis the player can reach. */
    private m_maxBound: number ;


    /**
     * @brief   Create a new Behavior.
     * @param   startPosX   Position on X axis of the Player when created.
     * @param   speed       Speed of the Player when moving.
     */
    constructor(
                position: PIXI.Point,
                speedFactor: number
               ) {
        this.m_moveForce = 0 ;
        this.m_initialPosition = new PIXI.Point(position.x, position.y) ;
        this.m_currentPosition = new PIXI.Point(position.x, position.y) ;

        this.m_speed = Behavior.DefaultSpeed * speedFactor ;
    }

    /**
     * @brief   Set the bounds of the player.
     * @param   bounds      Amount of pixel on left and right in which the
     *                      player can move.
     */
    public setBounds(bounds: PIXI.Rectangle): void {
        this.m_minBound = bounds.x ;
        this.m_maxBound = bounds.x + bounds.width ;
        console.assert(this.m_minBound < this.m_maxBound) ;
    }

    /**
     * @brief   Update the Player behavior.
     */
    public update() : void {
        this.m_currentPosition.x += this.m_moveForce ;
        this.m_moveForce = 0 ;
    }

    /**
     * @brief   Move Player on left.
     */
    public moveLeft() : void {
        if (this.m_currentPosition.x > this.MinBound) {
            this.m_moveForce = -this.Speed ;
        }
        else {
            this.m_moveForce = 0 ;
        }
    }

    /**
     * @brief   Move Player on right.
     */
    public moveRight() : void {
        if (this.m_currentPosition.x < this.MaxBound) {
            this.m_moveForce = this.Speed ;
        }
        else {
            this.m_moveForce = 0 ;
        }
    }

    /**
     * @brief   Reset the position of the Player.
     */
    public resetPosition() : void {
        this.m_currentPosition.x = this.m_initialPosition.x ;
        this.m_currentPosition.y = this.m_initialPosition.y ;
    }

    /**
     * @brief   Get the current position of the Player.
     */
    public get CurrentPosition(): PIXI.Point {
        return this.m_currentPosition ;
    }

    /**
     * @brief   Get the minimal coordinate on X axis the player can reach.
     */
    public get MinBound() : number {
        return this.m_minBound ;
    }

    /**
     * @brief   Get the maximal coordinate on X axis the player can reach.
     */
    public get MaxBound() : number {
        return this.m_maxBound ;
    }

    /**
     * @brief   Get the speed of the player.
     */
    public get Speed() : number {
        return this.m_speed ;
    }

    /**
     * @brief   Set the speed of the player.
     */
    public set Speed(speed: number) {
        this.m_speed = speed ;
    }

    /**
     * @brief   Get the force applied on the Player when moving.
     */
    public get MoveForce() : number {
        return this.m_moveForce ;
    }
} ;
