

class EscalatieLicht {
    constructor() {
        this.state = "Hidden"
        this.t = 0;
    }

    show() {
        var geometry = new THREE.PlaneGeometry( 1.5, 1.5, 1 );
        this.plane = new THREE.Mesh( geometry, escalatieMaterial );
        this.plane.position.set(0,5,-1);
        this.plane.rotation.set(0,0,Math.PI);
        scene.add( this.plane );

        this.state = "GoingDown"
    }

    update(dt) {
        this.t += dt;
        switch (this.state) {
            case "Hidden":

                break;
            case "GoingDown":
                if (this.plane.position.y <= 3.5) {
                    this.state = "Shining"

                    this.spotLight = new THREE.SpotLight( 0x0000ff );
                    // this.spotLight.position.set(this.plane.position.x, this.plane.position.y, this.plane.position.z);
                    this.plane.add(this.spotLight);
                    this.plane.add(this.spotLight.target)

                    this.spotLight2 = new THREE.SpotLight( 0x0000ff );
                    // this.spotLight2.position.set(this.plane.position.x, this.plane.position.y, this.plane.position.z);
                    this.plane.add(this.spotLight2);
                    this.plane.add(this.spotLight2.target)
                }
                this.plane.position.y -= dt * ESCALATIE_SPEED;
                break;
            case "Shining":
                this.spotLight.target.position.x = Math.sin(this.t*ROTATION_SPEED);
                this.spotLight.target.position.z = Math.cos(this.t*ROTATION_SPEED);
                this.spotLight.target.position.y = 0.3;


                this.spotLight2.target.position.x = Math.sin(this.t*ROTATION_SPEED + Math.PI);
                this.spotLight2.target.position.z = Math.cos(this.t*ROTATION_SPEED + Math.PI);
                this.spotLight2.target.position.y = 0.3;
                break;
            default:

        }
    }
}
