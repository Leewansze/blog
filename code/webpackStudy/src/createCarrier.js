import avatar from "./assets/carrier.png";

function createCarrier () {
    var img = new Image();
    img.src = avatar;
    img.className = 'avatar';
    var app = document.getElementById("app");
    app.appendChild(img);
}

export default createCarrier;

