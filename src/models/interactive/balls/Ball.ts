import ElementDataModule = require('../../utils/ElementData');
import PlayerModule = require('../players/Player');


enum SideCollide {
    Top,
    Bottom,
    Left,
    Right
}


/**
 * @brief   A Ball can be shot by players.
 */
export class Ball extends PIXI.Sprite {
    /** @brief  Decrease of the force on Y axis. */
    private static get ForceDecrease() : number { return 0.5 ; }

    /** @brief  Maximal force toward ground that can be applied to the ball. */
    private static get MaxForceDown() : number { return -16 ; }

    /** @brief  Maximal force on sides that can be applied to the ball. */
    private static get MaxForceLateral() : number { return 5 ; }

    /** @brief  Base rotation speed. */
    private static get BaseRotationSpeed() : number { return 0.01 ; }


    /** @brief  Center on the bottom edge of the Ball. */
    private m_bottomCenter: PIXI.Point ;

    /** @brief  Bounds of the Ball: x = left/right, y = ground. */
    private m_bounds: PIXI.Point ;

    /** @brief  Force applied to the Ball on X and Y axis.*/
    private m_force: PIXI.Point ;

    /** @brief  Make the ball be updated. */
    private m_startUpdate: boolean ;

    /**
     * @brief   Coefficient of restitution to make the Ball bounce.
     *          To be set between 0 and 1 for realistic physics (!).
     */
    private m_restitution: number ;

    /** @brief  Friction on the ground. */
    private m_groundFriction: number ;

    /** @brief  Detect if the ball is on ground. */
    private m_isOnGround: boolean ;


    /** @brief  Create a new Ball instance. */
    constructor(
                texture: string,
                bounds: PIXI.Point,
                restitution?: number,
                friction?: number
               ) {
        var spriteTexture: PIXI.Texture = PIXI.Texture.fromImage(texture) ;
        super(spriteTexture) ;

        this.m_startUpdate = false ;
        this.m_bounds = bounds ;
        this.m_force = new PIXI.Point(0, 0) ;
        this.m_isOnGround = false ;
        // Default restitution of a true volley ball on a steel surface.
        // See Principles of Biomechanics and Motion Analysis,
        // Iwan W. Griffiths.
        this.m_restitution = (restitution == undefined) ? 0.76 : restitution  ;
        this.m_groundFriction = (restitution == undefined) ? 0.7 : friction  ;

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
        // Set some missing values from the texture data.
        this.m_bottomCenter = new PIXI.Point(texture.width / 2, texture.height) ;

        this.m_bounds.y -= texture.height / 2 ;
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
     * @TODO    Split this method into several ones.
     */
    public update(
                  playerA: PlayerModule.Player,
                  playerB: PlayerModule.Player,
                  netData: ElementDataModule.ElementData
                 ) : void {
        // Apply forces from players
        var interactWithPlayerA: boolean = this.applyForceFromPlayer(playerA) ;
        if (interactWithPlayerA) {
            this.putOutsidePlayer(playerA) ;
            // alert(`Interaction w/ A... ${playerA.x}, ${playerA.y} || ${this.x}, ${this.y}`) ;
            this.m_startUpdate = true ;
        }

        var interactWithPlayerB: boolean = this.applyForceFromPlayer(playerB) ;
        if (interactWithPlayerB) {
            this.putOutsidePlayer(playerB) ;
            // alert(`Interaction w/ B... ${playerB.x}, ${playerB.y} || ${this.x}, ${this.y}`) ;
            this.m_startUpdate = true ;
        }

        if (this.m_startUpdate) {
            // Update the applied force on ball.
            if (this.m_force.y > Ball.MaxForceDown) {
                this.m_force.y -= Ball.ForceDecrease ;
            }

            // When the ball is going outside its available area, make it go in the
            // other way  (with a lower force).
            if (!this.isInXBounds()) {
                this.m_force.x = -this.m_force.x * 0.5 ;
            }

            // Update the position of the ball according to the force.
            if (this.position.y <= this.m_bounds.y) {
                this.position.y -= this.m_force.y ;
            }
            this.position.x += this.m_force.x ;

            // Make sure the ball is inside its available bounds area.
            if (!this.isInXBounds()) {
                var halfWidth: number = this.width / 2 ;
                if (this.position.x < halfWidth) {
                    this.position.x = halfWidth ;
                }
                else {
                    this.position.x = this.m_bounds.x - halfWidth ;
                }
            }
            else {
                // Interaction of the Ball with the net.
                this.applyForceFromNet(netData) ;
            }


            // Rotate the ball as it moves.
            this.rotation += Ball.BaseRotationSpeed * this.m_force.x ;

            // Make sure the ball cannot go lower than its bounds.
            if (this.position.y >= this.m_bounds.y) {
                this.position.y = this.m_bounds.y ;
                this.m_force.y = -(this.m_force.y) * this.m_restitution ;
                this.m_force.x *= this.m_groundFriction ;

                if (!this.m_isOnGround)
                {
                    if (this.position.x < (this.m_bounds.x / 2)) {
//                        playerB.Behavior.score(1) ;
                    }
                    else {
//                        playerA.Behavior.score(1) ;
                    }

                    setTimeout(() => {
                        this.m_startUpdate = false ;
                        this.m_isOnGround = false ;
                        this.m_force = new PIXI.Point(0, 0) ;
                        dispatchEvent(new Event("pointEnded"));
                    }, 1000);
                }

                // Send an event instead.
                this.m_isOnGround = true ;

            }

        }
    }

    /**
     * @brief   Apply force on the Ball when hitting the net.
     * @param   netBounds   Bounds of the net to make the Ball interact with it.
     */
    private applyForceFromNet(netData: ElementDataModule.ElementData) : boolean {
        var isPhysicsBall: boolean = (this.m_bottomCenter != undefined) && (!this.m_isOnGround) ;

        if (isPhysicsBall) {
            var ballXCenter: number = this.position.x ;
            var ballYCenter: number = this.position.y + (this.m_bottomCenter.y / 2) ;
            var collide: boolean = PIXI.Rectangle.intersect(netData.Bounds, this.getBounds()) ;

            if (collide) {
                var netXCenter: number = netData.X + (netData.Width / 2) ;
                var diffXCenters: number = ballXCenter - netXCenter ;
                var maxWidth: number = Math.max(netData.Width, this.width) ;

                var normDiffXCenter: number = diffXCenters / maxWidth ;

                if ((this.position.y + this.height) < netData.Y) {
                    this.m_force.y = -Math.abs(this.m_force.y) * this.m_restitution ;
                    this.position.y = netData.Y - this.height  ;
                }
                else {
                    if (this.m_force.x > 0) {
                        this.position.x = netData.X - this.width ;
                    }
                    else {
                        this.position.x = netData.X + netData.Width + this.width ;
                    }

                    this.m_force.x = -this.m_force.x ;
                }

                return true ;
            }
        }

        return false ;
    }

    /**
     * @brief   Apply force on the Ball according to the player position and
     *          forces (jump, move).
     * @param   player  The player for which check forces to apply on the Ball.
     * @return  TRUE when the Ball is in contact with the player, FALSE
     *          otherwise.
     */
    private applyForceFromPlayer(player: PlayerModule.Player) : boolean {
        var isPhysicsBall: boolean = (this.m_bottomCenter != undefined) && (!this.m_isOnGround) ;
/*
        if (isPhysicsBall) {
            var ballXCenter: number = this.position.x ;
            var ballYCenter: number = this.position.y + (this.m_bottomCenter.y / 2) ;
            var collide: boolean = PIXI.Rectangle.intersect(player.getBounds(), this.getBounds()) ;

            if (collide) {
                var playerXCenter: number = player.position.x + (player.width / 2) ;
                var diffXCenters: number = ballXCenter - playerXCenter ;
                var maxWidth: number = Math.max(player.width, this.width) ;

                var normDiffXCenter: number = diffXCenters / maxWidth ;
                this.m_force.x += (normDiffXCenter * Ball.MaxForceLateral) + player.MoveForce ;
                this.m_force.y = Math.abs(this.m_force.y - player.JumpForce) * 0.75 ;

                return true ;
            }
        }
*/
        return false ;
    }

    /**
     * @brief   Put the Ball outside the player when colliding.
     *          This puts the ball at the nearest border of the Player.
     * @param   player  The player for which get the Ball outside its bounds.
     */
    private putOutsidePlayer(player: PlayerModule.Player) : SideCollide {
        // Get points of the Ball bounds that are inside the player bounds.
        /*
        var points: PIXI.Point[] = this.getCollidingOfPointBallIntoPlayer(player) ;

        if (points.length == 1) {
            var point: PIXI.Point = points[0] ;

            // Compute deltas, offset of the ball inside the player.
            var deltaX: number = player.x - point.x ;
            var deltaY: number = player.y - point.y ;

            // Get the minimal ratio of delta on with or height.
            // It will be used to find on which axis the ball is aligned on the
            // player bounds.
            if ((deltaX / this.width) < (deltaY / this.height)) {
                // Align on X axis.
                // It is now required to check on which side (left or right).
                if (deltaX > (player.width)) {
                    this.position.x = player.x - this.width ;
                    this.m_force.x *= (this.m_force.x > 0) ? -1 : 1 ;
                    return SideCollide.Left ;
                }
                else {
                    this.position.x = player.x + player.width ;
                    this.m_force.x *= (this.m_force.x > 0) ? 1 : -1 ;
                    return SideCollide.Right ;
                }
            }
            else {
                // Align on Y axis.
                // It is now required to check on which side (top or bottom).
                if (deltaY > (player.height)) {
                    this.position.y = player.y - this.height ;
                    return SideCollide.Top ;
                }
                else {
                    this.position.y = player.y + player.height ;
                    return SideCollide.Bottom ;
                }
            }
        }
        else if (points.length == 2) {
            var point0X: number = points[0].x ;
            var point0Y: number = points[0].y ;
            var point1X: number = points[1].x ;
            var point1Y: number = points[1].y ;

            if (point0X == point1X) {
                // If points are aligned on X axis, make the ball go on right or
                // left.
                var deltaX: number = player.x - point0X ;

                if (deltaX < (player.width)) {
                    this.position.x = player.x - this.width ;
                    this.m_force.x *= (this.m_force.x > 0) ? -1 : 1 ;
                    return SideCollide.Left ;
                }
                else {
                    this.position.x = player.x + player.width ;
                    this.m_force.x *= (this.m_force.x > 0) ? 1 : -1 ;
                    return SideCollide.Right ;
                }
            }
            else if (point0Y == point1Y) {
                // If points are aligned on Y axis, make the ball go on top or
                // bottom.
                var deltaY: number = player.y - point0Y ;

                if (deltaY < (player.height)) {
                    this.position.y = player.y - this.height ;
                    return SideCollide.Top ;
                }
                else {
                    this.position.y = player.y + player.height ;
                    return SideCollide.Bottom ;
                }
            }
        }
        */
        return SideCollide.Bottom ;
    }

    /**
     * @brief   Get the list of points from the Ball bounds that are inside the
     *          player bounds.
     * @param   player  The player for which get the Ball outside its bounds.
     * @return  List of points from the Ball bounds that are inside the Player
     *          bounds.
     */
    private getCollidingOfPointBallIntoPlayer(player: PlayerModule.Player) : PIXI.Point[] {
        var ballPoints: PIXI.Point[] = [
                                        new PIXI.Point(this.x, this.y),
                                        new PIXI.Point(this.x + this.width, this.y),
                                        new PIXI.Point(this.x + this.width, this.y + this.height),
                                        new PIXI.Point(this.x, this.y + this.height),
                                       ] ;

        var collidingPoints: PIXI.Point[] = new Array() ;
        /*
        collidingPoints.forEach(
                                function(
                                         point: PIXI.Point,
                                         index: number,
                                         array: PIXI.Point[]
                                        ) {
            if (player.getBounds().contains(point.x, point.y)) {
                collidingPoints.push(point) ;
            }
        }) ;
        */
        return collidingPoints ;
    }

    /**
     * @brief   Check if the Ball is inside its bounds.
     * @return  TRUE if the Ball is inside its bounds area, FALSE if it is
     *          outside (totally or partially).
     */
    private isInXBounds() : boolean {
        var halfWidth: number = this.width / 2 ;
        return (this.position.x > halfWidth) && (this.position.x < (this.m_bounds.x) - halfWidth) ;
    }
} ;
