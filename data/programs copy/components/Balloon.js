import { map } from "../utils.js";

class Balloon{
    attrs;

    id;
    angle;
    x;y;
    horDistance;
    height;
    lat;lon
    dir;
    wave;
    time;

    locationPosition;
    locatoinEnv;
    balloonElm;
    maxDistance = 105;
    scale = 100;
    mapElm;
    distance;
    isOutside = false;

    /**
     * @param  {} attr id, x, y, angle, height, HorizontalDistance
     */
    constructor(attr={}){
        this.setAttrs(attr);
        this.balloonElm = $("#balloon").clone();
        this.balloonElm.removeClass("d-none");
        this.mapElm = $("#map");
        this.mapElm.append(this.balloonElm);

        this.locationPosition = $("#location_positions").children("#position_"+parseInt(this.id));
        this.locationEnv = $("#location_envs").children("#env_"+parseInt(this.id));

        this.angle = attr.angle??0;
        $("<div>").addClass([
            "angle",
            "font-xl",
            "position-absolute",
            "absolute-center",
            "top-3rem",
        ]).text("∠"+this.angle).appendTo(this.balloonElm);

        $("<div>").addClass([
            "id",
            "font-xl",
            "position-absolute",
            "absolute-center",
            "bottom--6rem",
        ]).text(this.id).appendTo(this.balloonElm);
        this.init();
    }

    init = () =>{
        this.setParams();
        this.scaling();
        this.calcDist();
        this.setPos();
        this.setShape();
    }

    setCoordinate = (x, y) =>{
        this.x = x;
        this.y = y;

        this.scaling();
        this.calcDist();
        this.setPos();
        this.setShape();
    }

    setScale = (scalePercentage) =>{
        this.scale = scalePercentage;

        this.scaling();
        this.calcDist();
        this.setPos();
        this.setShape();
    }

    setAttrs = (attr) =>{
        this.id=attr.id;
        this.horDistance = attr.horDistance??0;
        this.height = attr.height??0;
        this.x = attr.x??0;
        this.scaledX;
        this.y = attr.y??0;
        this.scaledY;
        this.dir = attr.dir;
        this.lat = attr.lat;
        this.lon = attr.lon;
        this.wave = attr.wave;
        this.time = attr.time;
    }

    scalePlus = () =>{
        this.setScale(this.scale*1.25);
    }

    scaleMinus = () =>{
        this.setScale(this.scale*0.8);
    }

    calcDist = () =>{
        this.distance = Math.sqrt(Math.pow(this.scaledX, 2) + Math.pow(this.scaledY, 2));
        if(this.distance > this.maxDistance){
            this.isOutside = true;
        }
        else{
            this.isOutside = false;
        }
    }
    
    setPos = () =>{
        if(!this.isOutside){
            const prosx = map(this.scaledX, -100, 100, 0, 100);
            const prosy = map(this.scaledY, -100, 100, 100, 0);
            this.balloonElm.css({top: prosy+"%", left:prosx+"%"});
            this.balloonElm.removeClass("is_outside");
        }
        else{
            const rad = this.getRad(this.scaledY, this.distance);
            const dis = this.scaledX > 0 ? this.maxDistance : -this.maxDistance;
            const nx = Math.cos(rad) * dis;
            const ny = Math.sin(rad) * this.maxDistance;
            const prosx = map(nx, -100, 100, 0, 100);
            const prosy = map(ny, -100, 100, 100, 0);
            this.balloonElm.css({top: prosy+"%", left: prosx+"%"});
            this.balloonElm.addClass("is_outside");
        }
    }

    setShape = () =>{
        if(!this.isOutside){
            this.balloonElm.children(".circle").removeClass("d-none");
            this.balloonElm.children(".triangle").addClass("d-none");
        }
        else{
            const add = this.scaledX > 0 ? 0 : 180;
            const deg = this.getDeg(this.scaledY, this.distance) + add;
            const tri = this.balloonElm.children(".triangle");
            const sign =  this.scaledX > 0 ? -1 : 1;
            tri.css({transform: "rotate(" + (sign * deg) + "deg)"});
            tri.removeClass("d-none");
            this.balloonElm.children(".circle").add("d-none");
        }
    }

    getDeg = (y, distance) =>{
        const rad = Math.asin(y / distance);
        return rad * (180 / Math.PI);
    }

    getRad = (y, distance) =>{
        return Math.asin(y / distance);
    }

    scaling = () =>{
        this.scaledX = this.x * this.scale*0.01;
        this.scaledY = this.y * this.scale*0.01;
        this.distance *= this.scale*0.01;

        this.distance = this.calcDist();
        this.setPos(this.scaledX, this.scaledY, this.distance);
        this.setShape(this.scaledX, this.scaledY, this.distance);
    }

    setParams = () =>{
        this.locationPosition.find(".lat").text(this.lat);
        this.locationPosition.find(".lon").text(this.lon);
        this.locationPosition.find(".dir").text(this.dir);
        
        this.locationEnv.find(".height").text(this.height);
        this.locationEnv.find(".horDistance").text(this.horDistance);
        this.locationEnv.find(".wave").text(this.wave);
        this.locationEnv.find(".time").text(this.time);
    }
}

export default Balloon;