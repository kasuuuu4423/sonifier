class ScaleButton{
    plus;minus;valueElm;
    value=10;
    pOnClick;mOnClick;

    constructor(plus=()=>{}, minus=()=>{}){
        this.plus = $("#plus");
        this.minus = $("#minus");
        this.valueElm = $("#scale_value");

        this.pOnClick = plus;
        this.mOnClick = minus;

        this.plus.on("click", ()=>{
            this.valuePlus();
            plus();
        });
        this.minus.on("click", ()=>{
            this.valueMinus();
            minus();
        });
    }

    valueMinus = () =>{
        this.value *= 1.25;
        this.value = Math.round(this.value*10)/10;
        this.valueElm.text(this.value);
    }

    valuePlus = () =>{
        this.value *= 0.8;
        this.value = Math.round(this.value*10)/10;
        this.valueElm.text(this.value);
    }

    setOnClick = (plus, minus) => {
        this.plus.off("click", this.pOnClick);
        this.minus.off("click", this.mOnClick);
        this.pOnClick = plus;
        this.mOnClick = minus;
        this.plus.on("click", this.pOnClick);
        this.minus.on("click", this.mOnClick);
    }
}

export default ScaleButton;