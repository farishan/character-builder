var _battleInterval = 100;

function Character(data){
	this.name = data.name;
	this.hp = data.hp;
	this.max_hp = data.hp;
	this.dmg = data.dmg;
	this.exp = data.exp;
	this.attack = function(target){
		target.hp -= this.dmg;
	}

	return this;
}

var _player = new Character({
	name: 'Faris',
	hp: 15,
	dmg: 1,
	exp: 0
});

var enemy1 = new Character({
	name: 'Enemi',
	hp: 10,
	dmg: 1,
	exp: 10
});

var enemy2 = new Character({
	name: 'Enemiiii',
	hp: 20,
	dmg: 1,
	exp: 10
});

console.log(_player)

var app = new Vue({
	el: '#app',
	data: function(){
		return {
			player: _player,
			enemy: enemy2
		}
	},
	mounted(){
		this.battle();
	},
	methods: {
		battle(){
			var self = this;
			self.player.attack(self.enemy);
			self.enemy.attack(self.player);

			if(self.player.hp > 0 && self.enemy.hp > 0){
				setTimeout(function(){
					self.battle();
				}, _battleInterval);
			}

			if(self.player.hp <= 0){
				console.log('player.dead');
				this.battleResult(false);
			}

			if(self.enemy.hp <= 0){
				console.log('enemy.dead');
				this.battleResult(true);
			}
		},
		battleResult(res){
			if(res){
				this.player.exp += this.enemy.exp;
			}
			this.resetHp();
		},
		resetHp(){
			this.player.hp = this.player.max_hp;
			this.enemy.hp = this.enemy.max_hp;
		}
	}
})