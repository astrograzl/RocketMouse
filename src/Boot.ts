import Phaser from "phaser"
import {Animes, Scenes, Textures} from "./Global"

export default class Boot extends Phaser.Scene {

    constructor() {super(Scenes.Boot)}

    preload() {
        this.load.atlas(Textures.RocketMouse, "rocket-mouse.png", "rocket-mouse.json")
        this.load.image(Textures.Background, "bg_repeat_340x640.png")
        this.load.image(Textures.MouseHole, "object_mousehole.png")
        this.load.image(Textures.Bookc1se, "object_bookcase1.png")
        this.load.image(Textures.Bookc2se, "object_bookcase2.png")
        this.load.image(Textures.W1ndow, "object_window1.png")
        this.load.image(Textures.W2ndow, "object_window2.png")
        this.load.image(Textures.Stop, "object_laser_end.png")
        this.load.image(Textures.Laser, "object_laser.png")
    }

    create() {
        this.anims.create({
            key: Animes.Run,
            frames: this.anims.generateFrameNames(Textures.RocketMouse, {
                start: 1, end: 4, prefix: "rocketmouse_run", zeroPad: 2, suffix: ".png"}),
            frameRate: 10, repeat: -1})
        
        this.anims.create({
            key: Animes.Jet,
            frames: this.anims.generateFrameNames(Textures.RocketMouse, {
                start: 1, end: 2, prefix: "flame", suffix: ".png"}),
            frameRate: 10, repeat: -1})
        
        this.anims.create({
            key: Animes.Fly,
            frames: [{
                key: Textures.RocketMouse,
                frame: "rocketmouse_fly01.png"
            }]
        })
        
        this.anims.create({
            key: Animes.Fall,
            frames: [{
                key: Textures.RocketMouse,
                frame: "rocketmouse_fall01.png"
            }]
        })
        
        this.anims.create({
            key: Animes.Dead,
            frames: this.anims.generateFrameNames(Textures.RocketMouse, {
                start: 1, end: 2, prefix: "rocketmouse_dead", zeroPad: 2, suffix: ".png"}),
                frameRate: 10})
        
        this.scene.start(Scenes.Game)
    }
}