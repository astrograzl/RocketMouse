import Phaser from "phaser"
import {Animes, Textures} from "../consts/Global"

export default class RocketMouse extends Phaser.GameObjects.Container {

    private cursor: Phaser.Types.Input.Keyboard.CursorKeys
    private flames: Phaser.GameObjects.Sprite
    private mouse: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        scene.physics.add.existing(this)
        this.cursor = scene.input.keyboard.createCursorKeys()
        this.flames = scene.add.sprite(-63, -15, Textures.RocketMouse).play(Animes.Jet)
        this.mouse = scene.add.sprite(0, 0, Textures.RocketMouse).play(Animes.Run).setOrigin(0.5, 1)
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setOffset(-0.5*this.mouse.width, -this.mouse.height)
        body.setSize(this.mouse.width, this.mouse.height)
        body.setCollideWorldBounds(true)
        body.setVelocityX(512)
        this.jetpack(false)
        this.add(this.flames)
        this.add(this.mouse)
    }

    jetpack(on: boolean) {
        this.flames.setVisible(on)
    }

    preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body
        if (body.blocked.down) this.mouse.play(Animes.Run, true)
        else if (body.velocity.y > 0) this.mouse.play(Animes.Fall, true)
        if (this.cursor.space?.isDown) {
            this.jetpack(true)
            body.setAccelerationY(-600)
            this.mouse.play(Animes.Fly, true)
        } else {
            this.jetpack(false)
            body.setAccelerationY(0)
        }
    }
}