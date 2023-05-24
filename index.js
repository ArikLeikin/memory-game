

$(document).ready(function(){
    const row = $(".row")
    $("#img").on("click", function(){
        console.log('Clicked button');
        $("#img").text("clicked")
        
    })

    $("#showBtn").on({
        click: ()=>{
            // row.show(1000);
            $("#panel").slideDown("slow");
            row.css("visibility", "visible");
            
        }
    })
    
    $("#hideBtn").on({
        click: ()=>{
            // row.hide(1000);
            $("#panel").slideUp("slow");
            row.css("visibility", "hidden");
            // row.fadeOut("slow")
        }
    })

    $("#fadeToggle").on({
        click: ()=>{
            $("#panel").toggle("slow");
            row.fadeToggle(1000)
        }
    })
    
    
    
})




