
for(let i=0;i<5;i++){
    const a = world.createEntity({
         mesh:'mesh/mu.vb',
        position:new Box3Vector3(11+ 6*Math.random(), 11, 11+7*Math.random()),
        meshScale:new Box3Vector3(0.05,0.05,0.05),
        collides:true,
        fixed:false,
        gravity:true
    })
    a.addTag('mu')
    a.enableDamage=true
    a.onEntityContact(({other})=>{
    
        if (other.isPlayer){
        other.hurt(17-other.fangli*0.01)
    }
    
})
}

async function main(){//等等我要搞缩进
    for(;;){
        if (world.querySelectorAll('.mu').length<6){
for(let i=0;i<1;i++){
    const a = world.createEntity({
        mesh:'mesh/mu.vb',
        position:new Box3Vector3(11+ 7*Math.random(),11 , 11+9*Math.random()),
        meshScale:new Box3Vector3(0.05,0.05,0.05),
        collides:true,
        fixed:false,
        gravity:true
        
    })
    a.addTag('mu')
    a.enableDamage=true
     a.onEntityContact(({other})=>{
    
        if (other.isPlayer){
        other.hurt(17-other.fangli*0.01)
    }
    
})
}
        }
        await sleep(1000)
    }
}
main()
