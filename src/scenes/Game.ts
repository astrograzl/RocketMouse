import Phaser from "phaser"
import {Scenes, Textures} from "../consts/Global"
import RocketMouse from "../game/RocketMouse"
import LaserObstacle from "../game/LaserObstacle"

export default class Game extends Phaser.Scene {

    private background!: Phaser.GameObjects.TileSprite
    private mouseHole!: Phaser.GameObjects.Image
    private w1ndow!: Phaser.GameObjects.Image
    private w2ndow!: Phaser.GameObjects.Image
    private bookc1se!: Phaser.GameObjects.Image
    private bookc2se!: Phaser.GameObjects.Image
    private laser!: LaserObstacle
    private mouse!: RocketMouse

    constructor() {super(Scenes.Game)}
    
    preload() {}
    
    create() {
        const width = this.scale.width
        const height = this.scale.height

        // this.add.image(0, 0, "background").setOrigin(0)
        this.background = this.add.tileSprite(0, 0, width, height, Textures.Background)
                                    .setOrigin(0, 0).setScrollFactor(0, 0)
        
        this.w1ndow = this.add.image(Phaser.Math.Between(0, width),
                                    Phaser.Math.Between(height/4, height/3),
                                    Textures.W1ndow)
        this.w2ndow = this.add.image(Phaser.Math.Between(width, 2*width),
                                    Phaser.Math.Between(height/4, height/3),
                                    Textures.W2ndow)
                                    
        this.mouseHole = this.add.image(Phaser.Math.Between(0, width), height-136, Textures.MouseHole)
        
        this.bookc1se = this.add.image(Phaser.Math.Between(0, width), height-256, Textures.Bookc1se)
        this.bookc2se = this.add.image(Phaser.Math.Between(width, 2*width), height-350, Textures.Bookc2se)

        // const mouse = this.physics.add.sprite(width/3, height-48, Textures.RocketMouse,
        //     "rocketmouse_fly01.png").setOrigin(0.5, 1).play(Animes.Run)
        this.mouse = new RocketMouse(this, width/3, height)
        this.add.existing(this.mouse)
        
        this.laser = new LaserObstacle(this, 3*width/5, height/10)
        this.add.existing(this.laser)
        
        this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height*0.94)
        this.physics.add.overlap(this.laser, this.mouse, this.zipzap, undefined, this)

        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
        this.cameras.main.startFollow(this.mouse)
    }

    update(t: number, dt: number) {
        this.background.setTilePosition(this.cameras.main.scrollX)
        if (t % 1001 == 1) console.log(t, dt)
        this.wall()
    }

    zipzap() {
        console.log("Bzzz")
        this.mouse.death()
    }

    wall() {
        const width = this.scale.width
        const height = this.scale.height
        const camX = this.cameras.main.scrollX

        if (this.mouseHole.x + this.mouseHole.width < camX)
            this.mouseHole.x = Phaser.Math.Between(camX + width, camX + 2*width)
        
            if (this.w1ndow.x + this.w1ndow.width < camX) {
            this.w1ndow.x = Phaser.Math.Between(this.w2ndow.x + width, this.w2ndow.x + 2*width)
            this.w1ndow.y = Phaser.Math.Between(height/4, height/3)
        }
        
        if (this.w2ndow.x + this.w2ndow.width < camX) {
            this.w2ndow.x = Phaser.Math.Between(this.w1ndow.x + width, this.w1ndow.x + 2*width)
            this.w2ndow.y = Phaser.Math.Between(height/4, height/3)
        }
        
        if (this.bookc1se.x + this.bookc1se.width < camX)
            this.bookc1se.x = Phaser.Math.Between(this.bookc2se.x + width, this.bookc2se.x + 2*width)
        
        if (this.bookc2se.x + this.bookc2se.width < camX)
            this.bookc2se.x = Phaser.Math.Between(this.bookc1se.x + width, this.bookc1se.x + 2*width)
        
        const laser = this.laser.body as Phaser.Physics.Arcade.StaticBody
        if (this.laser.x + laser.width < camX) {
            this.laser.x = Phaser.Math.Between(this.laser.x + width, this.laser.x + 2*width)
            this.laser.y = Phaser.Math.Between(0, 2*height/3)
            laser.position.x = this.laser.x + laser.offset.x
            laser.position.y = this.laser.y
        }
    }
}