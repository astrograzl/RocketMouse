import Phaser from 'phaser'

import Game from "./scenes/Game"
import HelloWorld from './scenes/HelloWorld'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1840,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [Game, HelloWorld],
}

export default new Phaser.Game(config)
