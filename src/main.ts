import Phaser from 'phaser'

import Boot from "./scenes/Boot"
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
			debug: true,
		},
	},
	scene: [Boot, Game, HelloWorld],
}

export default new Phaser.Game(config)
