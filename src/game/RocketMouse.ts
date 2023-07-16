import Phaser from "phaser"
import {Animes, Textures, Mouse} from "../consts/Global"

export default class RocketMouse extends Phaser.GameObjects.Container {

    private cursor: Phaser.Types.Input.Keyboard.CursorKeys
    private flames: Phaser.GameObjects.Sprite
    private mouse: Phaser.GameObjects.Sprite
    private being = Mouse.Running

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
        body.setVelocityX(512) // run
        this.add(this.flames)
        this.add(this.mouse)
        this.jetpack(false)
    }

    jetpack(on: boolean) {
        this.flames.setVisible(on)
    }

    death() {
        switch (this.being) {
            case Mouse.Dead: break
            case Mouse.Running: this.being = Mouse.Killed; break
            case Mouse.Killed: this.jetpack(false); break
        }
    }

    preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body
        
        if (this.being == Mouse.Dead) return
        
        if (this.being == Mouse.Killed) {
            this.mouse.play(Animes.Dead)
            body.setAcceleration(-256, 0)
            if (body.velocity.x < 8) {
                body.setVelocity(0, 0)
                body.setAcceleration(0, 0)
                this.being = Mouse.Dead
                console.log("X")
            }
        }
        
        if (this.being == Mouse.Running) {
            if (body.blocked.down) {
                this.mouse.play(Animes.Run, true)
            } else if (body.velocity.y > 0) this.mouse.play(Animes.Fall, true)
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
}