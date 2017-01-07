import KinematicBodyModule = require('../../physics/KinematicBody');

/**
 * @brief   Behavior of a Player.
 */
export class Behavior extends KinematicBodyModule.KinematicBody {
    /** @brief  Event for moving player update position. */
    public static get MovePlayerUpdateEvent(): string { return 'MovePlayer' ; }

    /** @brief  Default speed to make Player move. */
    public static get DefaultSpeed() : number { return 12 ; }


    /** @brief  Initial position of the Player. */
    private m_initialPosition: PIXI.Point ;

    /** @brief  Force resulting of player moves. */
    private m_moveForce: number ;

    /** @brief  Speed of the Player when moving. */
    private m_speedFactor: number ;

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
        super(new PIXI.Point(position.x, position.y)) ;
        this.m_moveForce = 0 ;
        this.m_initialPosition = new PIXI.Point(position.x, position.y) ;

        this.m_speedFactor = Behavior.DefaultSpeed * speedFactor ;
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
        this.CurrentPosition.x += this.m_moveForce ;
        this.m_moveForce = 0 ;

        // Clamp the Player position.
        if (this.CurrentPosition.x < this.MinBound) {
            this.CurrentPosition.x = this.MinBound ;
        }
        else if (this.CurrentPosition.x > this.MaxBound) {
            this.CurrentPosition.x = this.MaxBound ;
        }

        dispatchEvent(new Event(Behavior.MovePlayerUpdateEvent)) ;
    }

    /**
     * @brief   Move Player on left.
     */
    public moveLeft() : void {
        if (this.CurrentPosition.x > this.MinBound) {
            this.m_moveForce = -this.SpeedFactor ;
            this.SpeedX = this.m_moveForce ;
        }
        else {
            this.m_moveForce = 0 ;
        }
    }

    /**
     * @brief   Move Player on right.
     */
    public moveRight() : void {
        if (this.CurrentPosition.x < this.MaxBound) {
            this.m_moveForce = this.SpeedFactor ;
            this.SpeedX = this.m_moveForce ;
        }
        else {
            this.m_moveForce = 0 ;
        }
    }

    /**
     * @brief   Reset the position of the Player.
     */
    public resetPosition() : void {
        this.CurrentPosition.x = this.m_initialPosition.x ;
        this.CurrentPosition.y = this.m_initialPosition.y ;
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
    public get SpeedFactor() : number {
        return this.m_speedFactor ;
    }

    /**
     * @brief   Set the speed of the player.
     */
    public set SpeedFactor(speedFactor: number) {
        this.m_speedFactor = speedFactor ;
    }

    /**
     * @brief   Get the force applied on the Player when moving.
     */
    public get MoveForce() : number {
        return this.m_moveForce ;
    }
} ;
