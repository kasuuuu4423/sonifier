import Balloon from "./Balloon.js";

class Map{
    map;

    constructor(attrs){
        const balloons = [];
        for(let i = 0; i < attrs.length; i++){
            balloons.push(new Balloon(attrs[i]));
            balloons[i].setScale(200);
        }
        this.map = $("#map");
    }
}

export default Map;