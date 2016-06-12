import BehaviorModule = require('./Behavior');

/**
 * @brief   A PLayer is an entity that is controlled by the user.
 */
export class Player extends PIXI.Sprite {
    /** @brief  Behavior of the Player. */
    private m_behavior: BehaviorModule.Behavior ;

    /**
     * @brief   Create a new Player.
     * @param   texture     Path to the image of the Player.
     * @param   position    Position of the Player when created.
     * @param   speed       Speed of the Player when moving.
     * @param   maxScore    Score to make Player win.
     */
    constructor(
                texture: string,
                position: PIXI.Point,
                speed?: number,
                maxScore?: number
               ) {
        var spriteTexture: PIXI.Texture = PIXI.Texture.fromImage(texture) ;
        super(spriteTexture) ;
        this.position = position ;
        this.m_behavior = new BehaviorModule.Behavior(speed, maxScore) ;

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
    }

    /**
     * @brief   Move Player on left.
     */
    public moveLeft() : void {
    }

    /**
     * @brief   Move Player on right.
     */
    public moveRight() : void {
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
