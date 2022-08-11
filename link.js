class Link{
    constructor(a,b){
        this.link = Constraint.create({
            bodyA:a.body.bodies[a.body.bodies.length-1],
            bodyB:b,
            length: 10,
            stiffness: 0.3
        })
        World.add(world,this.link)
    }
    break()
    { 
        World.remove(world, this.link)
      this.link = null;
    }
}