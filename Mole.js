
class Mole {
    constructor(position, key) {
        var geometry = new THREE.PlaneGeometry( 1.5, 1.5, 1 );
        this.plane = new THREE.Mesh( geometry, moleMaterial );
        this.plane.position.set(position.x, -0.5, position.z);
        scene.add( this.plane );

        var geometry = new THREE.PlaneGeometry(0.5, 0.5, 1);
        this.vodka = new THREE.Mesh(geometry, vodkaMaterial);
        // this.vodka.position.set(position.x, position.y, position.z+0.1);
        // scene.add(this.vodka);
        this.plane.add(this.vodka);
        this.score = 0;


        this.state = "Under";
        this.key = key;

        this.t = 0;

        document.addEventListener("keypress", (e) => {
            if (e.code == this.key) {
                if (gamestate != "DeadFalling" && gamestate != "End") {
                    if (this.state == "Waiting") {
                        this.state = "Giving";

                        score += this.score;

                        if (this.score > 40) {
                            for (var i = 0; i < 4; i++) {
                                new Emoji("fire", randint(100, 400), randint(0, 8)-4, randint(1.5, 3), -1);
                            }
                        } else if (this.score > 30) {
                            var emoji = Math.random() > 0.5 ? "hundred" : "ok";
                            new Emoji(emoji, 250, randint(0, 8)-4, randint(1.5, 3), -1);
                        }
                    } else {
                        var emoji = Math.random() > 0.5 ? "cry" : "coldsweat";
                        new Emoji(emoji, 170, this.plane.position.x + randint(0, 2)-1, 2, this.plane.position.z + randint(0, 2) - 1)

                        score = score - 40 < 0 ? 0 : score - 40;
                    }
                }
            }
        });
    }

    newShot() {
        if (this.state == "Under") {
            this.state = "GoingUp";
        }
    }

    ready() {
        return this.state == "Under"
    }

    update(dt) {
        this.t += dt;

        switch (this.state) {
            case "Under":
                break;
            case "GoingUp":
                if (this.plane.position.y >= 1) {
                    this.state = "Waiting";
                }

                var newpos = this.plane.position.y + MOVESPEED * dt;
                if (newpos > 1) {
                    newpos = 1;
                }
                this.plane.position.y = newpos;
                this.score = 44.3;
                break;
            case "Waiting":
                if (this.plane.position.y > 1) {
                    this.plane.position.y = 1;
                }

                this.score /= 1.03;

                break;
            case "Giving":

                if (this.vodka.position.y > controls.object.position.y + 1) {
                    this.state = "GoingDown";
                }

                this.vodkaDir = new THREE.Vector3(0, 0, 0);
                this.vodkaDir.subVectors(controls.object.position, this.plane.position).normalize();
                this.vodkaDir.y -= 0.1;
                this.vodka.position.x += this.vodkaDir.x * dt * VODKASPEED;
                this.vodka.position.y += this.vodkaDir.y * dt * VODKASPEED;
                this.vodka.position.z += this.vodkaDir.z * dt * VODKASPEED;
                this.prevVodkaPos = this.vodka.position.clone();
                break;
            case "GoingDown":
                if (this.plane.position.y <= -0.5) {
                    this.vodka.position.x = 0;
                    this.vodka.position.y = 0;
                    this.vodka.position.z = 0.1;
                    this.state = "Under"
                }

                this.plane.position.y -= MOVESPEED * dt;
                break;
            default:

        }
    }
}
