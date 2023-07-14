import Phaser from "phaser"
import {Animes, Scenes, Textures} from "../consts/Global"

export default class Boot extends Phaser.Scene {
    constructor() {super(Scenes.Boot)}
    preload() {
        this.load.image(Textures.Background, "images/bg_repeat_340x640.png")
        this.load.atlas(Textures.RocketMouse, "rocket-mouse.png", "rocket-mouse.json")
    }
    create() {
        this.anims.create({
            key: Animes.Run,
            frames: this.anims.generateFrameNames(Textures.RocketMouse, {
                start: 1, end: 4, prefix: "rocketmouse_run", zeroPad: 2, suffix: ".png"}),
            frameRate: 10, repeat: -1})
        this.scene.start(Scenes.Game)}
}