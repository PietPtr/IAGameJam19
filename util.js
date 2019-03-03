var seed = Math.random() * 51413;

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function randint(a, b) {
    return Math.floor(Math.random()*b) + a
}
