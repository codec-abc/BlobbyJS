/**
 * @brief   Behavior of a Player.
 */
export class Behavior {
    /** @brief  Default max score to make Player win. */
    public static get DefaultMaxScore() : number {
        return 15 ;
    }

    /** @brief  Default speed to make Player move. */
    public static get DefaultSpeed() : number { return 8 ; }

    /**
     * @brief   Minimal coordinate on X axis the player can reach.
     */
    private m_minBound: number ;

    /**
     * @brief   Maximal coordinate on X axis the player can reach.
     */
    private m_maxBound: number ;

    /** @brief  Speed of the Player when moving. */
    private m_speed: number ;

    /** @brief  Current score of the Player. */
    private m_score: number ;

    /** @brief  Max score the Player must reach to win. */
    private m_maxScore: number ;


    /**
     * @brief   Create a new Behavior.
     * @param   startPosX   Position on X axis of the Player when created.
     * @param   bounds      Amount of pixel on left and right in which the player
     *                      can move.
     * @param   spriteWidth Width of the player sprite.
     * @param   speed       Speed of the Player when moving.
     * @param   maxScore    Score to make Player win.
     */
    constructor(
                startPosX: number,
                bounds: number,
                speed?: number,
                maxScore?: number
               ) {
        this.m_score = 0 ;

        this.m_minBound = startPosX - bounds ;
        this.m_maxBound = startPosX + bounds ;
        console.assert(this.m_minBound < this.m_maxBound) ;

        var isValidMaxScore: boolean ;
        isValidMaxScore = ((maxScore != undefined) && (maxScore > 0)) ;
        this.m_maxScore = isValidMaxScore ? maxScore : Behavior.DefaultMaxScore ;

        var isValidSpeed: boolean ;
        isValidSpeed = ((speed != undefined) && (speed > 1)) ;
        this.m_speed = isValidSpeed ? speed : Behavior.DefaultSpeed ;
    }

    /**
     * @brief   Make the Player score.
     * @param   points  Amount of points the Player has won.
     * @return  TRUE if the player has won the game, FALSE if not.
     */
    public score(points: number) : boolean {
        this.m_score += points ;
        return (this.m_score >= this.m_maxScore) ;
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
     * @brief   Get the score of the player.
     */
    public get Score() : number {
        return this.m_score ;
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
     * @brief   Width of the sprite.
     */
    public set SpriteWidth(width: number) {
        this.m_maxBound -= width ;
    }
} ;
