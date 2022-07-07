const BtnPref = () =>{
    const btn = $(".btn-ts");
    btn.on("click", function(){
        const modal = $(this).siblings(".dropdown-menu");
        modal.toggle();
    });
}

export default BtnPref;