class TargetButtons{
    btns;
    position;env;

    constructor(){
        this.btns = $(".btn_target");
        this.position = $(".location_position")
        this.env = $(".location_env")
        this.btns.on("click", (e)=>{this.onClick(e)});
    }

    onClick = (e) =>{
        const id = e.target.getAttribute("data-id");
        this.btns.addClass("btn-white");
        $(e.target).removeClass("btn-white");
        this.toggleDisplayId(this.position, id);
        this.toggleDisplayId(this.env, id);
    }

    toggleDisplayId = (elms, id) =>{
        elms.each(function(){
            if($(this).data("id") == id){
                $(this).removeClass("d-none");
                $(this).addClass("d-flex");
            }
            else{
                $(this).addClass("d-none");
                $(this).removeClass("d-flex");
            }
        });
    }
}

export default TargetButtons;