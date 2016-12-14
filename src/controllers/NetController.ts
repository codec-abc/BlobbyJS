import NetViewModule = require('../views/screens/game/interactive/NetView') ;
import NetModelModule = require('../models/interactive/net/Net') ;

/**
 * @brief   Data to set up a Net.
 */
export class NetSetupData {
    /** @brief  Position of the Net. */
    private m_position: PIXI.Point ;

    /** @brief  Texture of the Net. */
    private m_texture: PIXI.Texture ;

    /**
     * Create a new NetSetupData.
     * @param  {PIXI.Point}   position Position of the Net to create.
     * @param  {PIXI.Texture} texture  Texture of the Net to create.
     */
    constructor(position: PIXI.Point, texture: PIXI.Texture) {
        this.m_position = position ;
        this.m_texture = texture ;
    }

    /** @brief  Get and set the position of the Net. */
    public get Position(): PIXI.Point { return this.m_position ; }

    /** @brief  Get and set the texture of the Net. */
    public get Texture(): PIXI.Texture { return this.m_texture ; }

    /**
     * @brief  Get the real position of the Net using both provided position
     *         and the height of the Net sprite.
     */
    public get RealPosition(): PIXI.Point {
        return this.m_position ;
    }
} ;

/**
 * @brief   Controller of a Net.
 */
export class NetController {
    /** @brief  View of the Net. */
    private m_view: NetViewModule.NetView ;

    /** @brief  Model of the Net. */
    private m_model: NetModelModule.Net ;

    /**
     * @brief   Create a new instance of NetController.
     * @param   data    Required data to setup the net.
     */
    constructor(data: NetSetupData) {
        this.setModel(data) ;
        this.setTexture(data) ;
    }

    /**
     * @brief   Set the model of the Net.
     */
    private setModel(data: NetSetupData): void {
        this.m_model = new NetModelModule.Net(data.RealPosition) ;
    }

    /**
     * @brief   Set the texture of the Net. Can be changed while playing.
     * @param   texture     Path to the texture of the Net.
     */
    private setTexture(data: NetSetupData): void {
        var position: PIXI.Point = this.m_model.CurrentPosition ;
        this.m_view = new NetViewModule.NetView(data.Texture, position) ;
        this.m_model.AABB = new PIXI.Rectangle(
            0, 0,
            data.Texture.width,
            data.Texture.height
        ) ;
    }

    /**
     * @brief   Get the view of the Net.
     * @return  View of the Net.
     */
    public get View(): NetViewModule.NetView {
        return this.m_view ;
    }
}
