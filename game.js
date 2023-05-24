
var card1 = null
var card2 = null
var couplesFound = 0
var cardsAmount = 0
var imgIdCounter = 100
var page = window.location.href
var stopwatchOff = false
var timer = null
var processingCard = false;

$(document).ready(function(){
    profileSetup()
    startGame()
    initButtons()
})

function initVars(){
    card1 = null
    card2 = null
    couplesFound = 0
    cardsAmount = 0
    imgIdCounter = 100
    page = window.location.href
    stopwatchOff = false
    timer = null
}

function startGame(){
    stopClock()
    initVars()
    $(".row").empty();
    initView()
    // hideAllImages()
    var timerDuration = 1000; // Set the duration in milliseconds
    setTimeout(hideAllImages, timerDuration);
    setTimeout(stopWatchInit, timerDuration);
}

function initButtons(){
    $("#play-again").on("click", startGame)
    $("#leave-game").on("click", function(){
        window.location.replace("index.html")
    })
}

function profileSetup(){    
    var name = page.split('?')[2].split('=')[1]
    $(".card-header").text(name)
}

function stopWatchInit(){    
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    
    // Function to start the stopwatch
    function startStopwatch() {        
        timer = setInterval(updateStopwatch, 1000);            
    }

    // Function to update the stopwatch display
    function updateStopwatch() {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        // Display the updated time
        $("#hours").text(padTime(hours));
        $("#minutes").text(padTime(minutes));
        $("#seconds").text(padTime(seconds));
    }

    // Function to pad the time with leading zeros
    function padTime(time) {
        return time.toString().padStart(2, "0");
    }    

    // Start the stopwatch when the page loads
    console.log(stopwatchOff)
    if(!stopwatchOff){
        startStopwatch();
    }        
}

function stopClock(){
    stopwatchOff = true
    clearInterval(timer)
}

function initView(){    
    cardsAmount = parseInt(page.split('?')[1].split('=')[1])
    var cards = []
    
    for(var i=1; i<=cardsAmount; i++){
        imgIdCounter += 10
        var img = $("<img>", {
            // "class": "col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12",
            "id":"img",
            "src": "https://picsum.photos/id/"+ imgIdCounter +"/100/100",
            "display": 'block'          
        });

        var card = $("<div>", {
            "class": "col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12",
            "id": "game-card"
        });
        card.append(img)
        card.attr('value',i)
        card.on("click", handleClick)

        cards.push(card)        
        cards.push(card.clone(true))        
    }
    shuffleArray(cards)

    for(var i=0; i<cards.length; i++){
        $(".row").append(cards[i])
    }
}

function hideAllImages() {
    $(".col-xxl-1").children('img').hide();
}

function hide2Images(card1, card2){
    card1.children('img').hide();
    card2.children('img').hide();
}

function showImages(card) {
    card.children('img').show();
}

function makeUnclickable(){
    var cards = $(".row").find(".col-xxl-1.col-xl-2.col-lg-3.col-md-4.col-sm-6.col-xs-12");
    cards.css("pointer-events", "none")
    console.log(cards)
}

function makeClickable(){
    var cards = $(".row").find(".col-xxl-1.col-xl-2.col-lg-3.col-md-4.col-sm-6.col-xs-12");
    cards.css("pointer-events", "auto")
}

function handleClick(){    
    if(card1 == null){
        card1 = $(this)
        card1.toggleClass("flipped")
        console.log(card1.attr('value'))
        showImages(card1)
    }else{
        card2 = $(this)    
        showImages(card2)
        if(card1.attr('value') == card2.attr('value')){            
            showImages(card1)
            showImages(card2)
            couplesFound += 1            
            card1.off("click")
            card2.off("click")
        }else{
            makeUnclickable()
            setTimeout(hide2Images,1000,card1, card2)
            setTimeout(makeClickable,1000)
        }        
    }
    if(card1!=null && card2!=null){
        card1 = null;
        card2 = null;
    }
    if(couplesFound == cardsAmount){
        setTimeout(()=>{
            stopClock()        
            alert("You win")
        },100)
        
    }

}

const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}