var admin = ['zz0ggH3u/a4mw+TD','HfizPwd0Yl+zwTXQ','ISAqNcgRa8HFefo7','WZG1RuWRpImD/aTh']
function allplayer(){
    /*
    *查找世界所有玩家
    */
    world.say('__________start__________')
    var q = 1
    for(const p of world.querySelectorAll('player')){
        world.say(`${q}:${p.player.name}__${p.player.userKey}__${p.player.boxId}`)
        q+=1
    }
    q=1
        world.say('__________end__________')
    }

world.onChat(async ({ entity, message }) => {
    if (entity.isPlayer) {
        if (admin.includes(entity.player.userKey)) {
            if (message[0] == "$") {
            if (admin.includes(entity.player.userKey)) {
                try {
                    var code = eval(message.slice(1));
                    world.say(`~>${code}`)
                }
                catch (e) {
                    world.say(e)
                }
            }
        }
            if (message == '/tag') { entity.player.directMessage(`${entity.hasTag('in')}`)}//pornstar
            if (message == '/help') { entity.player.directMessage('亲爱的创作人员你好！特殊功能包含变大、变小、还原大小、飞行、解除飞行、隐身、现身、隐藏名字、显示名字、幽灵、解除幽灵、发光、还原发光、反光、还原反光、变红色、变蓝色、变绿色、变紫色、变黄色、变浅蓝色、还原颜色、全部还原、禁言(例如:禁言+禁言者名字)、解除禁言(例如:解除禁言+被禁言者名字、加速、减速)、管理室密码。') }//pornstar
            if (message == '/变大') { entity.plsayer.scale = 6; world.say(entity.player.name + '变大了') }
            if (message == '/变小') { entity.player.scale = 0.3; world.say(entity.player.name + '变小了') }
            if (message == '/还原大小') { entity.player.scale = 1; world.say(entity.player.name + '还原了大小') }
            if (message == '/飞行') { entity.player.canFly = true; world.say(entity.player.name + '开启了飞行模式') }
            if (message == '/解除飞行') { entity.player.canFly = false; world.say(entity.player.name + '关闭了飞行模式') }
            if (message == '/跳跃提升') { entity.player.jumpPower = 2; world.say(entity.player.name + '开启了跳跃提升') }
            
            if (message == '/加速') {
                entity.player.walkSpeed += 10000
                entity.player.runSpeed += 500
                entity.player.flySpeed += 700
                world.say(entity.player.name + '加速了')
            }
            if (message == '/减速') {
                entity.player.walkSpeed -= 10000
                entity.player.runSpeed -= 500
                entity.player.flySpeed -= 700
                world.say(entity.player.name + '减速了')
            }
            if (message == 'allplayer'){
                                allplayer()
            }
            if (message == '/隐身') { entity.player.invisible = true; world.say(entity.player.name + '隐身') }
            if (message == '/现身') { entity.player.invisible = false; world.say(entity.player.name + '现身了') }
            if (message == '/隐藏名字') { entity.player.showName = false; world.say(entity.player.name + '隐藏了名字') }
            if (message == '/显示名字') { entity.player.showName = true; world.say(entity.player.name + '显示了名字') }
            if (message == '/幽灵') { entity.player.spectator = true; world.say(entity.player.name + '开启了幽灵模式') }
            if (message == '/解除幽灵') { entity.player.spectator = false; world.say(entity.player.name + '关闭了幽灵模式') }
            if (message == '/发光') { entity.player.emissive = Infinity; world.say(entity.player.name + '开启了发光效果') }
            if (message == '/还原发光') { entity.player.emissive = 0; world.say(entity.player.name + '还原了发光效果') }
            if (message == '/反光') { entity.player.shininess = 1; world.say(entity.player.name + '开启了反光效果') }
            if (message == '/还原反光') { entity.player.shininess = 0; world.say(entity.player.name + '还原了反光效果') }
            if (message == '/变红色') { entity.player.color.set(1, 0, 0); world.say(entity.player.name + '变成了红色') }
            if (message == '/变蓝色') { entity.player.color.set(0, 0, 1); world.say(entity.player.name + '变成了蓝色') }
            if (message == '/变绿色') { entity.player.color.set(0, 1, 0); world.say(entity.player.name + '变成了绿色') }
            if (message == '/变紫色') { entity.player.color.set(1, 1, 0); world.say(entity.player.name + '变成了紫色') }
            if (message == '/变黄色') { entity.player.color.set(1, 0, 1); world.say(entity.player.name + '变成了黄色') }
            if (message == '/变浅蓝色') { entity.player.color.set(0, 1, 1); world.say(entity.player.name + '变成了浅蓝色') }
            if (message == '/还原颜色') { entity.player.color.set(1, 1, 1); world.say(entity.player.name + '还原了颜色') }
            if (message == '/无敌') { entity.hp = Infinity; world.say(entity.player.name + '无敌了') }
            if (message == '/无敌刺穿模') { entity.ha = Infinity; world.say(entity.player.name + '开启了无敌刺穿模') }
            //if (message == '取消打飞机') { entity.player.dafeiji = 5; world.say(entity.player.name + '你的攻击消失了') }
            if (message == '/取消无敌') { entity.hp = 100; world.say(entity.player.name + '取消无敌了') }
            if (message == '/还原') {
                entity.player.scale = 1
                entity.player.invisible = false
                entity.player.canFly = false
                entity.player.showName = true
                entity.player.spectator = false
                entity.player.emissive = 0
                entity.player.shininess = 0
                entity.player.jumpPower = 1
                entity.player.walkSpeed = 0.1
                entity.player.runSpeed = 0.5
                entity.player.flySpeed = 0.5
                entity.player.color.set(1, 1, 1)
                world.say(entity.player.name + '全部还原了')
            }
            if (message.startsWith('禁言')) {
                if (message.slice(2) == entity.player.name) {
                    entity.player.directMessage('无法禁言自己，请重新尝试！')
                } else if (admin.includes(message.slice(2))) {
                    entity.player.directMessage('不能禁言管理员');
                } else {
                    world.querySelectorAll('player').forEach((x) => {
                        if (x.player.name == message.slice(2)) {
                            x.player.directMessage('你已被管理员禁言，请等待管理员解除')
                            world.say('有人犯了错，被管理员禁言了！')
                            x.player.muted = true
                        }
                    })
                }
            }
            if (message.startsWith('解除禁言')) {
                if (message.slice(4) == entity.player.name) {
                    entity.player.directMessage('无法解除禁言自己，请重新尝试！')
                //} else if (admin.includes(message.slice(2))) {
                    //entity.player.directMessage('不能解除禁言管理员');
                } else {
                    world.querySelectorAll('player').forEach((x) => {
                        if (x.player.name == message.slice(4) && x.player.muted) {
                            x.player.directMessage('你已被管理员解除禁言')
                            world.say('有人被管理员解除禁言了！')
                            x.player.muted = false
                        }
                    })
                }
            }
            
            
            if (message.startsWith('踢')) {

                    world.querySelectorAll('player').forEach((x) => {                        
                        if (x.player.name == message.slice(1)){
                            if (!admin.includes(x.player.userKey)) {
                                x.player.directMessage('你被管理员踢了！')
                                world.say(x.player.name + ' 被管理员踢了')
                                x.player.kick()}
                            }
                        })
                    }
                
            
            if (message == '管理室密码') {
                entity.player.directMessage('进去密码:4624\n出来密码:4625');
            }
        }
    }
})
