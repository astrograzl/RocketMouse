import Phaser from "phaser" // main engine
import {Scenes, Textures} from "./Global"
import LaserObstacle from "./LaserObstacle"
import RocketMouse from "./RocketMouse"

export default class Game extends Phaser.Scene {

    private coins!: Phaser.Physics.Arcade.StaticGroup
    private background!: Phaser.GameObjects.TileSprite
    private mouseHole!: Phaser.GameObjects.Image
    private w1ndow!: Phaser.GameObjects.Image
    private w2ndow!: Phaser.GameObjects.Image
    private bookc1se!: Phaser.GameObjects.Image
    private bookc2se!: Phaser.GameObjects.Image
    private cheese!: Phaser.GameObjects.Sprite
    private dog!: Phaser.GameObjects.Sprite
    private cat!: Phaser.GameObjects.Sprite
    private laser!: LaserObstacle
    private mouse!: RocketMouse

    constructor() {super(Scenes.Game)}

    init() {/* Void */}
    
    preload() {/* Booting */}
    
    create() {
        const {width, height} = this.scale // object destructuring

        // this.add.image(0, 0, "background").setOrigin(0)
        this.background = this.add.tileSprite(0, 0, width, height, Textures.Background)
                                    .setOrigin(0, 0).setScrollFactor(0, 0)
                                    
        this.mouseHole = this.add.image(Phaser.Math.Between(0, width), height-136, Textures.MouseHole)
        
        this.w1ndow = this.add.image(Phaser.Math.Between(0, width),
                                    Phaser.Math.Between(height/4, height/3),
                                    Textures.W1ndow)

        this.w2ndow = this.add.image(Phaser.Math.Between(width, 2*width),
                                    Phaser.Math.Between(height/4, height/3),
                                    Textures.W2ndow)

        this.bookc1se = this.add.image(Phaser.Math.Between(0, width), height-256, Textures.Bookc1se)

        this.bookc2se = this.add.image(Phaser.Math.Between(width, 2*width), height-350, Textures.Bookc2se)

        // beware of the dog
        this.dog = this.physics.add.staticSprite(Phaser.Math.Between(3*width, 5*width), height-96, Textures.Dog)

        // let the cat be
        this.cat = this.physics.add.staticSprite(this.bookc1se.x, 152, Textures.Cat)

        this.cheese = this.physics.add.staticSprite(Phaser.Math.Between(width, 3*width), height-64, Textures.Cheese)
                                        .setScale(0.5)

        // const mouse = this.physics.add.sprite(width/3, height-48, Textures.RocketMouse,
        //     "rocketmouse_fly01.png").setOrigin(0.5, 1).play(Animes.Run)
        this.mouse = new RocketMouse(this, width/3, height)
        this.add.existing(this.mouse)
        
        this.laser = new LaserObstacle(this, 3*width/5, height/10)
        this.add.existing(this.laser)

        this.coins = this.physics.add.staticGroup()
        
        this.physics.world.setBounds(0, 48, Number.MAX_SAFE_INTEGER, height-96)
        this.physics.add.overlap(this.mouse, this.laser, this.zipzap, undefined, this)
        this.physics.add.overlap(this.mouse, this.coins, this.jingle, undefined, this)
        this.physics.add.overlap(this.mouse, this.cheese, this.feedme, undefined, this)
        this.physics.add.overlap(this.mouse, this.dog, this.bark, undefined, this)
        this.physics.add.overlap(this.mouse, this.cat, this.meow, undefined, this)

        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
        this.cameras.main.startFollow(this.mouse)
        this.cameras.main.setFollowOffset(-512)
    }

    update() {
        this.background.setTilePosition(this.cameras.main.scrollX)
        this.laser.flash()
        this.wall()
    }

    zipzap() {console.log("~")
        this.mouse.death()
    }

    jingle(o1: Phaser.GameObjects.GameObject, o2: Phaser.GameObjects.GameObject) {console.log("*")
        const mouse = o1 as RocketMouse
        const coin = o2 as Phaser.Physics.Arcade.Sprite
        this.coins.killAndHide(coin)
        coin.disableBody()
        mouse.score += 100
    }

    feedme(o1: Phaser.GameObjects.GameObject, o2: Phaser.GameObjects.GameObject) {console.log("@")
        const mouse = o1 as RocketMouse
        const cheese = o2 as Phaser.Physics.Arcade.Sprite
        const body = mouse.body as Phaser.Physics.Arcade.Body
        body.setVelocityX(body.velocity.x + 100)
        cheese.setVisible(false)
        cheese.disableBody()
        mouse.score += 1000
    }

    bark(o1: Phaser.GameObjects.GameObject, o2: Phaser.GameObjects.GameObject) {console.log("#")
        const mouse = o1 as RocketMouse
        const dog = o2 as Phaser.Physics.Arcade.Sprite
        mouse.score -= 10
    }

    meow(o1: Phaser.GameObjects.GameObject, o2: Phaser.GameObjects.GameObject) {console.log("%")
        const mouse = o1 as RocketMouse
        const cat = o2 as Phaser.Physics.Arcade.Sprite
        mouse.score += 10
    }

    coinsCast() {
        this.coins.children.each(child => {
            const coin = child as Phaser.Physics.Arcade.Sprite
            this.coins.killAndHide(coin)
            coin.body.enable = false
        })
        const {width, height} = this.scale
        const camX = this.cameras.main.scrollX
        const numero = Phaser.Math.Between(1, 10)
        let x = camX + width
        for (let i = 0; i < numero; ++i) {
            let y = height/2 + Phaser.Math.Between(-height/4, height/4)
            const coin = this.coins.get(x, y, Textures.Coin) as Phaser.Physics.Arcade.Sprite
            coin.setVisible(true)
            coin.setActive(true)
            // const body = coin.body as Phaser.Physics.Arcade.StaticBody
            coin.body.setCircle(coin.body.width/2)
            coin.body.enable = true
            coin.body.updateFromGameObject()
            x += 1.62 * coin.width
            // y -= 1.62 * coin.height
        }
    }

    wall() {
        const camX = this.cameras.main.scrollX
        const {width, height} = this.scale
        const offset = camX - width

        if (this.mouseHole.x < offset)
            this.mouseHole.x = Phaser.Math.Between(camX + width, camX + 2*width)
        
        if (this.w1ndow.x < offset) {
            this.w1ndow.x = Phaser.Math.Between(this.w2ndow.x + width, this.w2ndow.x + 2*width)
            this.w1ndow.y = Phaser.Math.Between(height/4, height/3)
        }

        if (this.w2ndow.x < offset) {
            this.w2ndow.x = Phaser.Math.Between(this.w1ndow.x + width, this.w1ndow.x + 2*width)
            this.w2ndow.y = Phaser.Math.Between(height/4, height/3)
        }

        if (this.bookc1se.x < offset) {
            this.bookc1se.x = Phaser.Math.Between(this.bookc2se.x + width, this.bookc2se.x + 2*width)
            if (Phaser.Math.Between(1, 6) == 4) {
                const cat = this.cat.body as Phaser.Physics.Arcade.StaticBody
                this.cat.x = this.bookc1se.x
                cat.position.x = this.cat.x + cat.offset.x
                cat.updateFromGameObject()    
            }
        }

        if (this.bookc2se.x < offset) {
            this.bookc2se.x = Phaser.Math.Between(this.bookc1se.x + width, this.bookc1se.x + 2*width)
            this.coinsCast()
        }

        if (this.cheese.x < offset) { // Michalson Lucky Number
            const cheese = this.cheese.body as Phaser.Physics.Arcade.StaticBody
            this.cheese.x = Phaser.Math.Between(camX+5*width, camX+9*width)
            cheese.position.x = this.cheese.x + cheese.offset.x
            cheese.enable = true
            cheese.updateFromGameObject()
            this.cheese.setVisible(true)
            this.cheese.setActive(true)
        }

        if (this.dog.x < offset) {
            const dog = this.dog.body as Phaser.Physics.Arcade.StaticBody
            this.dog.x = Phaser.Math.Between(camX+5*width, camX+9*width)
            dog.position.x = this.dog.x + dog.offset.x
            dog.updateFromGameObject()
        }

        if (this.laser.x < offset) {
            const laser = this.laser.body as Phaser.Physics.Arcade.StaticBody
            this.laser.x = Phaser.Math.Between(camX+width, camX+3*width)
            this.laser.y = Phaser.Math.Between(0, height/2)
            laser.position.x = this.laser.x + laser.offset.x
            laser.position.y = this.laser.y
        }
    }
}
