import {addConsole, setGauge, setVersions, setGaugeValue, setRssi, setSatellite, setPorts, setRates, setShipDir, setShipInfo, targetPosition, toggleLamp, consoleBottom} from "./functions.js";

$(()=>{
    const attrs = [
        {
            id: "0001",
            x: 35,
            y: -70,
            angle: 219,
            horDistance: 215,
            height: 3200,
            lat: 121243.079635,
            lon: 141.3468401,
            dir: 135,
            wave: 23532,
            time: "14:33:33"
        },
        {
            id: "0002",
            x: -45,
            y: 45,
            angle: 304,
            horDistance: 2115,
            height: 32090,
            lat: 43.07234239635,
            lon: 141.34432468401,
            dir: 15,
        },
        {
            id: "0003",
            x: 100,
            y: 100,
            angle: 10,
            horDistance: 2115,
            height: 32090,
            lat: 43.0792342635,
            lon: 141.564633468401,
            dir: 185,
        },
    ];

    const versions = {
        app: "1.0.0",
        node: "14.16.0",
        chrome: "91.0.4472.164",
        electron: "13.6.9",
    };

    /*
    preference
    */
    //setVersions(versions);
    //setShipInfo(10,10,10);
    // setPorts("GPS", [200,300,400]);
    // setPorts("LORA", [200,300,400]);
    // setRates("GPS", [200324,302340,423400]);
    // setRates("LORA", [202430,302340,400234]);
    // toggleLamp("GPS");
    // toggleLamp("LORA");

    /*
    Location
    */
    //targetPosition(attrs);
    //setShipDir(45);

    /*
    Graph
    */
    // setGauge(22,22,22,22);
    // setGaugeValue(22,22,22,22);
    // setRssi(-50);
    // setSatellite(12);

    /*
    Console
    */
    // addConsole("$GPGSV,3,1,09,20,80,346,15,15,66,337,28,24,53,203,21,13,49,039,28*79");
    // consoleBottom();
});
