var kick_id = []
var kick_name = []
world.onPlayerJoin(({ entity }) => {
    if (!kick_name.includes(entity.player.name)) return
    entity.player.kick()
    if (!kick_id.includes(entity.player.userKey))return
    entity.player.kick()
})
