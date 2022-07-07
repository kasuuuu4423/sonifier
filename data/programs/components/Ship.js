class Ship{
    shipElm;
    dir;

    constructor(){
        this.shipElm = $("#ship");
    }

    setDir = (val) =>{
        this.dir = val;
        const transform = this.shipElm.css("transform");
        var values = transform.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');

        this.shipElm.css({
            transform: `translate(${values[4]}px, ${values[5]}px) rotate(${this.dir}deg)`,
        });
    }
}

export default Ship;