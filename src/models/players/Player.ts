import BehaviorModule = require('./Behavior');

/**
 * @brief   A Player is an entity that is controlled by the user.
 */
export class Player extends PIXI.Sprite {
    /** @brief  Behavior of the Player. */
    private m_behavior: BehaviorModule.Behavior ;

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
                texture: string,
                position: PIXI.Point,
                bounds: number,
                speed?: number,
                maxScore?: number
               ) {
        var spriteTexture: PIXI.Texture = PIXI.Texture.fromImage(texture) ;
        super(spriteTexture) ;
        this.position = position ;
        this.m_behavior = new BehaviorModule.Behavior(
                                                      position.x,
                                                      bounds,
                                                      speed,
                                                      maxScore
                                                     ) ;

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
        this.position.x -= texture.width / 2 ;
        this.position.y -= texture.height ;

        // UGLY...
        this.m_behavior.SpriteWidth = texture.width ;
    }

    /**
     * @brief   Move Player on left.
     */
    public moveLeft() : void {
        if (this.position.x > this.m_behavior.MinBound) {
            this.position.x -= this.m_behavior.Speed ;
        }
    }

    /**
     * @brief   Move Player on right.
     */
    public moveRight() : void {
        if (this.position.x < this.m_behavior.MaxBound) {
            this.position.x += this.m_behavior.Speed ;
        }
    }

    /**
     * @brief   Make player jump.
     */
    public jump() : void {
        // @TODO
    }

    /**
     * @brief   Get the behavior of the Player.
     */
    public get Behavior() : BehaviorModule.Behavior {
        return this.m_behavior ;
    }
} ;
