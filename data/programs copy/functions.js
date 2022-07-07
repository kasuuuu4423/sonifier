import Balloon from "./components/Balloon.js";
import Gauge from "./components/Gauge.js";
import Ship from "./components/Ship.js";
import TargetButtons from "./components/TargetButtons.js";
import ScaleButton from "./components/ScaleButton.js";
import BtnPref from "./components/BtnPref.js";

BtnPref();

const balloons = [];
const tb = new TargetButtons();
const sb = new ScaleButton();
export const targetPosition = (attrs) =>{
    if(balloons.length == 0){
        for(let i = 0; i < attrs.length; i++){
            balloons.push(new Balloon(attrs[i]));
        }
        sb.setOnClick(()=>{
            for(let i = 0; i < balloons.length; i++){
                balloons[i].scalePlus();
            }
        },
        ()=>{
            for(let i = 0; i < balloons.length; i++){
                balloons[i].scaleMinus();
            }
        });
    }
    else{
        for(let i = 0; i < balloons.length; i++){
            balloons[i].setAttrs(attrs[i]);
            balloons[i].init();
        }
    }
}

const ship = new Ship();
export const setShipDir = (dir) =>{
    ship.setDir(dir);
}

const temp = new Gauge("#temp");
const oxy = new Gauge("#oxy");
const press = new Gauge("#press");
const bombe = new Gauge("#bombe");
export const setGauge = (tempPosition, oxyPosition, pressPosition, bombePosition) =>{
    temp.setPosition(tempPosition);
    oxy.setPosition(oxyPosition);
    press.setPosition(pressPosition);
    bombe.setPosition(bombePosition);
}

export const setGaugeValue = (tempValue, oxyValue, pressValue, bombeValue)=>{
    temp.setValue(tempValue);
    oxy.setValue(oxyValue);
    press.setValue(pressValue);
    bombe.setValue(bombeValue);
}

export const setVersions = (values) =>{
    $("#v_app").text(values.app);
    $("#v_node").text(values.node);
    $("#v_chrome").text(values.chrome);
    $("#v_electron").text(values.electron);
}

export const setSatellite = (value) =>{
    const satellite = $("#satellite");
    satellite.text(value);
}

export const setRssi = (value) =>{
    const rssi = $("#rssi");
    rssi.text(value);
}

export const setShipInfo = (lat, lon, height) =>{
    if($("main").attr("class").split(" ")[0] == "preference"){
        $("#lat").text(lat);
        $("#lon").text(lon);
        $("#height").text(height);
    }
}

export const addConsole = (text) =>{
    $("<p>").text(text).appendTo($("#console_content"));
}

export const setPorts = (name, ports) =>{
    const portElm = $("#port_"+name);
    ports.forEach((port)=>{
        $("<option>").text(port).appendTo(portElm);
    });
}

export const setRates = (name, rates) =>{
    const rateElm = $("#rate_"+name);
    rates.forEach((rate)=>{
        $("<option>").text(rate).appendTo(rateElm);
    });
}

export const toggleLamp = (name) =>{
    const lampElm = $("#lamp_"+name);
    lampElm.toggleClass("active");
}

export const consoleBottom = () =>{
    const consoleElm = $("#console_content");
    const parent = consoleElm.parent();
    parent.scrollTop(consoleElm.height());
}