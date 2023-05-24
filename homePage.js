$(document).ready(function(){
    for(var i=2; i<=8; i++){
        if(i%2==1)
            continue
        var opt = $("<option value="+parseInt((i*i)/2)+"></option>")
        opt.text(parseInt((i*i)/2))
        $(".form-select").append(opt)        
    }

    $("#start-game").on({
        click: function(){            
            if(!isValid())
                return      
            var num = $(".form-select").find(":selected").text()    
            var name = $("#nickname").val() 
            window.location.replace('game-page.html?cards-number='+num + "?name=" + name);
            // $(document).html("index.html")    
        }
    })
  
    $("#nickname").on("keypress",function(event){        
        if(event.keyCode === 13){
            if(!isValid())
                return   
            $("#start-game").click()
        }
    })

})

function isValid(){
    if($(".form-select").find(":selected").text() == "Select number of card couples"){
        alert("Select cards amount")
        return false
    }
    if($("#nickname").val() == ""){
        alert("Enter Nickname")
        return false
    }    
    return true
}