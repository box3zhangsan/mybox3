require('./admin.js')
require('./kick.js')
require('./han.js')
require('./mu.js')
console.clear()

function dialogContent() {
    const allPlayerEntities = world.querySelectorAll('player');
    const sortedPlayerEntities = allPlayerEntities.sort((a, b)=>  b.exp - a.exp);
        let content = "";
    for(const entity of sortedPlayerEntities ) {

        content = content + `${entity.player.name}有${entity.exp}经验\n`
    }
    return content
}

world.onClick(({entity,button,clicker,distance})=>{
    if (button === Box3ButtonType.ACTION0){
            if (distance<clicker.gongju){
                if (!clicker.player.dead){
                    if(!entity.isPlayer){
        entity.hurt(clicker.gongli,{attacker:clicker})
    }
    else{
        if (clicker.hasTag('in')){
            if (entity.hasTag('in')){
                entity.hurt(clicker.gongli-entity.fangli*0.01,{attacker:clicker})
            }
        }
    }
    }
    
    }}
})

world.onDie(async({ entity,attacker }) => { // 等待事件需要用 async
    if (entity.isPlayer){
        attacker.exp+=10
        attacker.coin+=20
        for (let t = 1; t <= 5; t++) {
        entity.player.directMessage(`倒计时 ${String(5 - t)} 秒后复活`);
        await sleep(1000);
    }

    entity.player.forceRespawn();  // 让玩家重生
        
        }
else{
    if (entity.hasTag('han')){
        attacker.exp+=3
        attacker.coin+=5
    }
    if (entity.hasTag('mu')){
        attacker.exp+=3
        attacker.coin+=5
    }
    entity.destroy()
}
});

function lv(exp){
if(exp<100){
    return '萌新'
    //entity.player.hp = 100
}
else if(exp<1000){
    return '入门'
    //entity.player.hp = 300
}
else if(exp<3000){
    return '一般'
    //entity.player.hp = 500
}
else if(exp<7000){
    return '上游'
    //entity.player.hp = 800
}
else if(exp<20000){
    return '高手'
    //entity.player.hp = 1000
}
else if(exp<100000){
    return '大佬'
    //entity.player.hp = 1500
}
else if(exp>100000){
    return '顶尖'
    //entity.player.hp = 20000
}
}
async function selectReturn(player,value,mon){
    var name=value
    var select=await player.player.dialog({
        type:'select',
        title:name,
        content:'请问是否购买'+name+' : '+mon+'元',
        options:["购买","取消"]
    })
    if(!select||select.index==null)return false;
    if(select.index==0&&player.coin>=mon){
        player.player.dialog({
            type:'text',
            content:'购买成功~'
        })
        player.coin-=mon
        add(player.item,value)
        return true;
    }
    if(select.index==1){
        return false;
    }
    if(select.index==0&&player.coin<mon){
        player.player.dialog({
            type:'text',
            content:'你的钱不够'
        })
        return false;
    }
}
var wu=[
    {name:'拳击手套',money:10,gongli:10,gongju:2,fangli:0,shao:'基础的拳击手套，适合近距离格斗',hp:0},
    {name:'画戟',money:30,gongli:13,gongju:4,fangli:0,shao:'画戟，长枪改造而成，距离更远',hp:0},
    {name:'绷带',money:5,gongli:0,gongju:0,fangli:0,shao:'增加30hp',hp:30},
    {name:'高级医药箱',money:20,gongli:0,gongju:0,fangli:0,shao:'增加100hp',hp:100},
    {name:'灵芝汤',money:100,gongli:0,gongju:0,fangli:0,shao:'增加500hp',hp:500},
    {name:'神剑',money:10000000000000,gongli:1000000000,gongju:100000000,fangli:100000000,shao:'管理之剑',hp:0},
    {name:'森林药水',money:5,gongli:0,gongju:0,fangli:0,shao:'使血量变为最大血量80%',hp:0}
]
var zhuang=['拳击手套','画戟','神剑']
var yi=['绷带','高级医药箱','灵芝汤']
var nojiaoyi=['神剑']
world.gravity = -0.3
world.onPlayerJoin ( ({ entity }) => {
    //entity.enableDamage=true
    
    var admin = ['zz0ggH3u/a4mw+TD','ISAqNcgRa8HFefo7','HfizPwd0Yl+zwTXQ','WZG1RuWRpImD/aTh']
    entity.enableInteract=true
   entity.interactRadius = 2;
    entity.interactColor=new Box3RGBColor(0,0,1)
    entity.enableDamage = true
    entity.coin = 0 //钱
    entity.exp = 0 
    entity.rid = 0
    entity.item = []
    entity.player.muted=false
    entity.gong=''
    entity.fang=''
    entity.gongli=0
    entity.fangli=0
    entity.it = [0,0,0]
    entity.hasTag('no')
    entity.zhuangbei = []//口袋里的货品
    //loadUser(entity)
    if (admin.includes(entity.player.userKey)) {
        entity.coin = 100000003320;
        entity.exp = 1000002320000;
        world.say(`作者  ${entity.player.name}  来了！`)
        entity.item=['拳击手套','画戟','绷带','绷带','高级医药箱','灵芝汤','神剑','森林药水']
        world.gravity = -0.1
        entity.maxHp=2000000
        entity.hp=entity.maxHp
        //entity.enableDamage=false
        entity.rid=1
    }
    
    else{
    
    entity.coin = 0 //钱
    entity.exp = 0 //废品
    entity.rid = 0
    entity.item = []
    entity.gong=''
    entity.fang=''
    entity.gongli=0
    entity.gongju=0
    entity.fangli=0

    entity.it = [0,0,0]
    entity.zhuangbei = []//口袋里的货品
    loadUser(entity)
    }
    entity.zhu = '无'
    entity.player.directMessage(`${entity.player.name},欢迎来到${world.projectName}`)
    if (entity.rid==0){
    entity.player.dialog({
        type:Box3DialogType.TEXT,
        content:'欢迎来到这里！你可以先从大厅的NPC那里领取拳套，沿着地面红色箭头走可以到达寒冰谷（刷怪），祝你过的愉快！'
    })}
    entity.interactRadius = 2;
    entity.interactColor=new Box3RGBColor(0,0,1)
    entity.player.onPress(async ({ button }) => { //每当有按钮被按下
        if (button == Box3ButtonType.ACTION1) {
            if (Math.random>0.19){
                world.say('不用尝试挑战作者，作者是不能受伤害的')
            }
            const se = await entity.player.dialog({
                type:Box3DialogType.SELECT,
                title:entity.player.name,
                content:`${entity.player.name}的个人信息：\n${entity.hp}hp/${entity.maxHp}hp \n攻击武器：${entity.gong}\n你有${entity.coin}元，\n${entity.exp}经验\n称号：${lv(entity.exp)}\n\n道具：[${entity.item}]\nuserKey : ${entity.player.userKey}`,
                options:['保存','道具','俯视地图','更新日志']
            })
            if (se){
            if (se.value == '保存'){
                await saveUser(entity)
            }
            if (se.value==='更新日志'){
                entity.player.dialog({
                    type:Box3DialogType.TEXT,
                    content:
                    `
                    v.2（当前） 加入新怪物和交易系统
                    v.1 第一个版本
                    `
                })
            }
            if (se.value == '道具'){
                const s = await entity.player.dialog({
                    type:Box3DialogType.SELECT,
                    titie:'物品列表',
                    options:entity.item,
                })
                if (s){
                    for(var q of wu){
                        if (q.name == s.value){
                    const a=await entity.player.dialog({
                        type:Box3DialogType.SELECT,
                        title:q.name,
                        content:`${q.name}: \n${q.shao}\n回血 ： ${q.hp}\n攻击力 ： ${q.gongli}\n距离 ： ${q.gongju}\n防御力 : ${q.fangli}`,
                        options:['装备','卸下','丢弃']
                    })
                    if(a){
                        
                        if (a.value=='装备'){
                              if(has(zhuang,s.value)){
                            entity.gong=q.name
                            entity.gongju=q.gongju
                            entity.gongli=q.gongli
                            entity.fangli=q.fangli
                            entity.fan=q.fan
                            entity.player.directMessage('装备成功')
                        }
                        else if(has(yi,s.value)){
                            entity.hp+=q.hp
                            if(entity.hp>=entity.maxHp){
                                entity.hp = entity.maxHp
                            }
                            del(entity.item,s.value)
                            entity.player.directMessage(`回血至${entity.hp}hp/${entity.maxHp}hp`)
                        }
                        else if(s.value =='森林药水'){
                            del(entity.item,'森林药水')
                            entity.hp=entity.maxHp*0.8
                        }
                        else {
                            entity.player.directMessage('不可装备')
                        }}
                        if (a.value=='卸下'){
                            
                            entity.gong=''
                            entity.gongju=0
                            entity.gongli=0
                            entity.fangli=0
                            entity.fan=0
                        }
                        if (a.value=='丢弃'){
                            del(entity.item,q.name)
                        }

                    }}}
                }
            }
            if (se.value == '俯视地图'){
                const a = await entity.player.dialog({
                    type:Box3DialogType.TEXT,
                    content:'建议将视野距离调到高',
                    lookEye:new Box3Vector3(128,270,128),
                    lookTarget:new Box3Vector3(128,8,128),
                    lookUp : new Box3Vector3(1, 0, 0)
                })
                if (a){

                }
            }
        }}

})
})
//entity:发起者

for (const npc of world.querySelectorAll('.NPC')){
    npc.enableInteract = true
    npc.interactHint = npc.id;
    npc.interactRadius = 3;
    if (npc.id == "新手指导"){
        npc.onInteract(({entity})=>{
            if (entity.rid == 0){
                textDialog(entity,'欢迎来到这里。在这里，你可以去打怪。给你一个拳击手套。')
            add(entity.item,'拳击手套')
            entity.rid +=1
            }
            
        })
    }
    if (npc.id == '武器店售货员'){
        npc.onInteract(async({entity})=>{
            const sel = await entity.player.dialog({
                type:Box3DialogType.SELECT,
                title:npc.id,
                options:['画戟','拳击手套']
            })
            if(sel){
                for(p of wu){
                    if (p.name == sel.value){
                        selectReturn(entity,p.name,p.money)
                    }
                }
            }
        })
    }
    if (npc.id == '报名'){
        npc.onInteract(async({entity})=>{
            entity.addTag('in')
            entity.removeTag('no')
            entity.position.copy(new Box3Vector3(173,16,196))
            entity.enableInteract=false
        })
    }
    if (npc.id == '退出'){
        npc.onInteract(async({entity})=>{
            await sleep(2000)
            entity.addTag('no')
            entity.removeTag('in')
            entity.position.copy(new Box3Vector3(184,10,208))
             entity.enableInteract=true
        })
    }
    if (npc.id == '医生'){
        npc.onInteract(async({entity})=>{
            const sel = await entity.player.dialog({
                type:Box3DialogType.SELECT,
                title:npc.id,
                options:['治疗（100）元']
            })
            if(sel){
                if  (entity.coin>100){
                    entity.hp=entity.maxHp
                    entity.player.directMessage('回血成功')
                }
            }
        })
    }
    if (npc.id == '药店售货员'){
        npc.onInteract(async({entity})=>{
            const sel = await entity.player.dialog({
                type:Box3DialogType.SELECT,
                title:npc.id,
                options:['高级医药箱','绷带','灵芝汤']
            })
            if(sel){
                for(p of wu){
                    if (p.name == sel.value){
                        selectReturn(entity,p.name,p.money)
                    }
                }
            }
        })
    }
    if (npc.id == '森林隐士'){
        npc.onInteract(async({entity})=>{
            const sel = await entity.player.dialog({
                type:Box3DialogType.SELECT,
                title:npc.id,
                options:['森林药水']
            })
            if(sel){
                for(p of wu){
                    if (p.name == sel.value){
                        selectReturn(entity,p.name,p.money)
                    }
                }
            }
        })
    }
    if (npc.id == "公告栏"){
        npc.onInteract(({entity})=>{ 
        textDialog(entity,'欢迎来到这里。在这里，你可以去打怪。\n未来更新内容（在战斗场中，你可以去和怪物战斗，并获得钱币和经验。\n钱币可以购买武器，经验可以升级。\n你可以去乱斗场中，与他人对战。当人数大于10人时有机会去神秘商店。）')
        })
    }
    if (npc.id == "排行榜"){
        npc.onInteract(({entity})=>{ 
        textDialog(entity,dialogContent(),'排行榜')
        })
    }
    if (npc.id == "传送器"){
        npc.onInteract(async({ entity }) =>{
            const resultas=await entity.player.dialog({
                type: Box3DialogType.SELECT,
                title: "传送器",
                titleTextColor: new Box3RGBAColor(0, 0, 0,1),
                titleBackgroundColor: new Box3RGBAColor(0.968, 0.702, 0.392, 1),
                content: `你好，${entity.player.name},您要去哪?`, 
                options:["1楼","2楼","3楼"],
                contentTextColor:  new Box3RGBAColor(0, 0, 0, 1), 
                contentBackgroundColor: new Box3RGBAColor(1, 1, 1, 1),
            })
        if (resultas){
            if(resultas.value == '1楼'){
                entity.position.copy(new Box3Vector3(228,10,150))
            }
            if(resultas.value == '2楼'){
                entity.position.copy(new Box3Vector3(211,20,147))
            }
            if(resultas.value == '3楼'){
                entity.position.copy(new Box3Vector3(214,26,144))
            }
        }
              })
    }
    if(npc.id == '更新介绍员'){
        npc.onInteract(async({ entity }) =>{
            const gengxin = await entity.player.dialog({
                type:Box3DialogType.SELECT,
                title:"介绍员",
                titleTextColor: new Box3RGBAColor(0, 0, 0,1),
                titleBackgroundColor: new Box3RGBAColor(0.968, 0.702, 0.392, 1),
                content: `你好，${entity.player.name},请问你要了解哪一版的更新内容？`, 
                options:['v.1','v.2'],
                contentTextColor:  new Box3RGBAColor(0, 0, 0, 1), 
                contentBackgroundColor: new Box3RGBAColor(1, 1, 1, 1),
            })
            if(gengxin){
                if(gengxin.value == 'v.1'){
                    entity.player.dialog({
                        type:Box3DialogType.TEXT,
                        content:
                        `
                        制作了新手装备
                        完成了刷怪
                        建设了新手商店
                        铺盖了药店和医院
                        简单建设了竞技场（后期优化）
                        堆砌好了城墙
                        制作了管理员装备和第二个新手装备
                        优化了管理员代码
                        `
                    })
                }
                if(gengxin.value == 'v.2'){
                    entity.player.dialog({
                        type:Box3DialogType.TEXT,
                        content:
                        `
                        制作了新城区
                        堆好了围墙
                        制作了新刷怪
                        完成了新药品
                        `
                    })
                }
            }
            
        })
    }
}
world.onInteract(async({entity,targetEntity})=>{
    if (targetEntity.isPlayer){
        const a = targetEntity
        a.interactHint = '';    // 进入互动范围时提示的文字
        a.interactRadius = 2.5;
        const s = await entity.player.dialog({
                type: Box3DialogType.SELECT, //对话框类型为选择框
                
                content: `${a.player.name}\n${a.coin}元, ${a.exp}经验\nuserKey : ${a.player.userKey}`,
                options: ['私信','个人主页','交易']
            })
            if (s){
                if (s.value == '个人主页'){
                    if (a.player.userKey){
                    entity.player.link(`https://box3.codemao.cn/u/${a.player.boxId}`)
                    }
                    else{
                        entity.player.directMessage(`${a.player.name}是游客！`)
                    }
                }
                if (s.value == '私信'){
                    const m = await entity.player.dialog({
                        type:Box3DialogType.INPUT,
                        content:'私信内容',
                    })
                    entity.player.directMessage('发送成功')
                    a.player.directMessage(`${entity.player.name}向你发送私信：${m}`)
                }
                if (s.value == '交易'){
                    entity.player.directMessage('需要对方同意,价格为1.2倍,为防止其他请求，需等待5秒')
                    await sleep(5000)
                    const m = await entity.player.dialog({
                        type:Box3DialogType.SELECT,
                        title:'购买',
                        options:a.item,
                        content:'需要对方同意,价格为1.2倍'
                    })
                    if(m){
                        if(!nojiaoyi.includes(m.value)){
                        for(var p of wu){
                            if (p.name==m.value){
                                const b = await a.player.dialog({
                                    type:Box3DialogType.SELECT,
                                    title:'售出',
                                    content:`${entity.player.name}请求卖给ta${m.value}`,
                                    options:['yes','no']
                                })
                                if(b){
                                    if(b.value == 'yes'){
                                        del(a.item,m.value)
                                        add(entity.item,m.value)
                                        var o = p.mom
                                        entity.money-=1.2*o
                                        a.money+=1.2*o
                                    }
                                    if(b.value == 'no'){
                                        a.player.directMessage('对方拒绝')
                                    }
                                }
                            }
                        }
                        
                        }
                    }
                }
            }
    }
    
})


async function initTable() {//创建玩家数据表
    return await db.sql`
        CREATE TABLE IF NOT EXISTS "player" (
            "coin" INT NOT NULL,--金币
            "exp" INT NOT NULL,--经验
            "rid" INT NOT NULL,--经验
            "item" TEXT NOT NULL,--物品列表
            "it" TEXT NOT NULL,--物品列表
            "userKey" CHAR(16) PRIMARY KEY UNIQUE NOT NULL --用户识别码
        )
    `;
}
function textDialog(entity, content, title) {
    return entity.player.dialog({ //弹出对话框
        type: Box3DialogType.TEXT, //对话框类型为纯文本
        content, //文本内容
        title, //对话框左上角标题内容
    })
}
function del(list,item){
    var a = list.indexOf(item)
    list.splice(a,1)    
}
function has(list,item){
    var a = list.indexOf(item)
    if (a == -1){
        return false
    }
    else{
        return true
    }

}

function add(list,item){
    list[list.length]=item
}
world.onPlayerLeave(async({entity})=>{
    saveUser(entity)
    if (entity.player.userKey == 'zz0ggH3u/a4mw+TD'){
        world.gravity = -0.3
    }
})
async function saveUser(user) {//玩家存档
    await db.sql`
        INSERT INTO "player" (-- player虽然是小写, 建议统一用""包住
            "exp",-- 经验
            "coin",-- 金币
            "rid",
            "it",
            "item",-- 道具
            "userKey"-- 用户识别码
        ) VALUES (
            ${user.exp}, --尝试新建经验值
            ${user.coin}, --尝试新建金币值
            ${user.rid},
            ${JSON.stringify(user.it)},
            ${JSON.stringify(user.item)}, --尝试新建道具值
            ${user.player.userKey} --尝试新建当前玩家识别码
        )
        ON CONFLICT("userKey") -- 如果已经存在同样的用户识别码
        DO UPDATE SET
            "exp"=excluded."exp",-- 更新经验值
            "coin"=excluded."coin",-- 虽然是小写, 建议统一用""包住
            "rid"=excluded."rid",
            "it"=excluded."it",
            "item"=excluded."item"-- 虽然是小写, 建议统一用""包住
    `
}
async function loadUser(user) {//玩家读档
    const [data] = await db.sql`SELECT * FROM "player" WHERE "userKey"=${user.player.userKey} LIMIT 1`
    if (data) {//如果这个玩家已经有存档
        user.exp = data.exp
        user.coin = data.coin
        user.rid = data.rid
        user.it = JSON.parse(data.it)
        user.item = JSON.parse(data.item)
    }
    else {//玩家无存档
        saveUser(user)
    }
}
async function deleteUser(user) {//删除玩家存档
    await db.sql`DELETE FROM "player" WHERE "userKey"=${user.player.userKey}`
}
async function showAllPlaySideUser() {//显示游玩端玩家数据, 地图发布后运行才不会报错
    for (const e of await db.sql`SELECT * FROM "player"`) {
        console.log(JSON.stringify(e))
    }
}
async function showAllEditSideUser() {//显示编辑端玩家数据
    for (const e of await db.sql`SELECT * FROM edit."player"`) {
        console.log(JSON.stringify(e))
    }
}

async function poll(fn, msg) {//无限轮询执行sql语句直到成功
    while (true) {
        try {
            return await fn()//一旦成功执行, 停止无限轮询, 并返回查询结果
        } catch (e) {
            const m = e.message//需要简略显示的异常消息
            //sql偶尔会执行超时, 但如果反复显示timeout 15秒以上一直不停, 大概是数据库出了故障只能等官方修复
            if (m.includes('timeout')) {
                world.say(m)
            }
            else {
                world.say(msg || e.stack)//如果sql执行出错, 广播错误消息, 用来排查错误原因
            }
        }
        await sleep(2000) //每2秒重试一次
    }
}
poll(initTable, '等待pg数据库启动中...')

