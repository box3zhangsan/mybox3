

for(let i=0;i<5;i++){
    const a = world.createEntity({
         mesh:'mesh/han.vb',
        position:new Box3Vector3(241+ 7*Math.random(), 23, 241+7*Math.random()),
        meshScale:new Box3Vector3(0.05,0.05,0.05),
        collides:true,
        fixed:false,
        gravity:true
    })
    a.addTag('han')
    a.enableDamage=true
     a.onEntityContact(({other})=>{
    
        if (other.isPlayer){
        other.hurt(17-other.fangli*0.01)
    }
    
})
}
async function selectReturn(player,value,mon){
    var name=value.slice(0,value.indexOf(":"));
    var select=await player.player.dialog({
        type:Box3DialogType.SELECT,
        title:name,
        content:'请问是否购买'+name,
        options:["购买","取消"]
    })
    if(!select||select.index==null)return false;
    if(select.index==0&&player.money>=mon){
        player.player.dialog({
            type:'text',
            content:'购买成功~',
        })
        player.coin-=mon         //在干嘛呢，商店？
        return true;
    }
    if(select.index==1){
        return false;
    }
    if(select.index==0&&player.money<mon){
        player.player.dialog({
            type:'text',
            content:'你的钱不够'
        })
        return false;
    }
}
async function main(){//等等我要搞缩进
    for(;;){
        if (world.querySelectorAll('.han').length<6){
for(let i=0;i<1;i++){
    const a = world.createEntity({
        mesh:'mesh/han.vb',
        position:new Box3Vector3(241+ 7*Math.random(), 23, 241+7*Math.random()),
        meshScale:new Box3Vector3(0.05,0.05,0.05),
        collides:true,
        fixed:false,
        gravity:true
        
    })
    a.addTag('han')
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
