class Pool extends Phaser.Group {
  constructor(game, spriteType, instances, name){
    super(game, game.world, name)
    this.game = game
    this.spriteType = spriteType

    const maxInstances = 30

    if(instances > 0){
      let sprite
      for(var toAdd = 0; toAdd < maxInstances; toAdd++) {
        sprite = this.add(new spriteType(game))
      }
    }
    return this
  }

  create(x,y,data){
    let obj = this.getFirstExists(false)
    if(!obj){
      obj = new this.spriteType(this.game)
      this.add(obj, true)
    }

    return obj.spawn(x, y, data)
  }
}
export default Pool
