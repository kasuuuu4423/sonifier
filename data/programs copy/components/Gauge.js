class Gauge{
    gauge;
    position;
    val;

    constructor(selector){
        this.gauge = $(selector);
    }

    setPosition = (pos) =>{
        this.position = pos;
        const scale = this.gauge.children(".scale");
        scale.css({
            left: this.position + "%",
        });
    }

    setValue = (val) =>{
        this.val = val;
        const valueElm = this.gauge.parents(".graph_env").find(".graph_env_value");
        valueElm.text(this.val);
    }
}

export default Gauge;