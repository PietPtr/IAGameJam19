

class Emoji {
    constructor(emoji, delay, x, y, z) {
        const EMOJI =  {
            fire: litMaterial,
            ok: okMaterial,
            hundred: hundredMaterial,
            coldsweat: coldsweatMaterial,
            cry: cryMaterial
        }

        if (EMOJI[emoji] == undefined) {
            console.log("emoji not found");
        }

        var sprite = new THREE.Sprite( EMOJI[emoji] );
        sprite.position.set(x, y, z);
        scene.add(sprite);

        setTimeout(() => {
            scene.remove(sprite);
        }, delay)
    }
}
