//controls if instructions show
let show_instructions = false;

//controls the game title text color loop
let gameTextInterval = null;

//controls loop in control of current level
let levelInterval = null;

//controls if the game runs
let run = false;

//holds computer sequence
let computer_sequence = [];

//holds user sequence
let user_sequence = [];

//holds level 
let level = 1;

//holds animation speed
let speed = 800

//controls whether speed increases
let wasIncreased = false

//holds list of animal names corresponding with design
let animals = ["bird", "dog", "lion", "monkey"]

//generates a random hex color for title
function getRandomColor() 
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color
}

//changes game text color to a random color
function rainbowGameText() 
{
    $("#game-text").css("color", getRandomColor())
}

//controls instructions
let instructions = function()
{
    if(show_instructions)
    {
        $("#game-instruction-text").css("font-size", "0em")
        show_instructions = false
    }
    else
    {
        $("#game-instruction-text").css("font-size", "2em")
        show_instructions = true
    }
}


//chenges game text to corresponding level
let setLevel = function()
{
    if(run)
    {
        $("#game-text").text(`Level ${level}`)
    }
}

//checks if user sequence matches computers
let checkSequence = function()
{
    let equal = true
    for(let i = 0; i < user_sequence.length; i++)
    {
        if((user_sequence[i] == computer_sequence[i]) == false)
            equal = false
    }
    return equal
}

//adds random animal to computer sequence
let addSequence = function()
{
    computer_sequence.push(Number(1 + Math.random() * 3).toFixed(0))
}

//displays the computer sequence to the user
let playSequence = async function(j = 0)
{
    if(j == computer_sequence.length)
    {
        return
    }
    else
    {
        let animal = animals[computer_sequence[j] - 1]
        let animalAudio = new Audio(`sounds/${animal}.mp3`)
        animalAudio.play()
        $(`#${animal}`).animate({opacity: 0.4}, speed, function()
        {
            $(this).css("opacity", "1")
            animalAudio.pause()
            playSequence(j + 1)
        })
    }
}

//initializes the game after start button is pressed. 

//start button gets hidden

//game text is set to the current level

//run is set to true

//animal is added to computer sequence

//plays the sequence to get the user started 
let begin = function()
{
    $("#start").hide()
    $("#game-text").text(`Level ${level}`)

    gameTextInterval = setInterval(rainbowGameText, 1000)
    levelInterval = setInterval(setLevel, 500)
    levelSpeedInterval = setInterval(increaseSpeed, 500)

    computer_sequence = []
    user_sequence = []

    run=true

    addSequence()

    playSequence()

}

//increases speed every 3 rounds
let increaseSpeed = function()
{
    if(level % 2 == 0)
    {
        if(wasIncreased == false)
        {
            speed -= 75
            wasIncreased = true
        }

    }
    else
        wasIncreased = false
}

//controls game logic
let logic = function(num)
{
    if(run)
    {
        //if button is clicked its associated number is passed as num

        //number is pushed to user_sequence
        user_sequence.push(num)

        //if the sequence doesn't match the computers
        if(!checkSequence())
        {
            //stops game rainbow text
            clearInterval(gameTextInterval)
            clearInterval(levelSpeedInterval)
            clearInterval(levelInterval)
            
            //changes game text to game over
            $("#game-text").text("GAME OVER!")

            //changes game text color to red
            $("#game-text").css("color", "rgb(255,0,0)")

            $("#start").text("Restart")
            $("#start").css("width", "fit-content")
            $("#start").show()

            //game can no longer run
            run = false;
            level = 1;
            speed = 800;
            gameWasRan = true

            let Aud = new Audio("sounds/game-over.wav")
            Aud.play()
        }
        //if it does match the computers
        else
        {
            //if the length of the user sequence matches the computer's, clear the user's and add a new animal element
            if(user_sequence.length == computer_sequence.length)
            {
                user_sequence = []
                addSequence()

                //new level 
                level += 1

                //plays new computer sequence
                setTimeout(playSequence, 1000)
            }
        }
    }
    
}

//when document loads set interval variables and add events for each image and start button
$(document).ready(function() 
{
    gameTextInterval = setInterval(rainbowGameText, 1000)

    $("#start").click(function() 
    {
        //if start button clicked, this function is called
        begin()
    })
    
    $("#bird").click(function()
    {
        if(run)
        {
            //plays animal audio when clicked and then animates it, and finally goes into the logic (brains of program)
            let animal = animals[1 - 1]
            let animalAudio = new Audio(`sounds/${animal}.mp3`)
            animalAudio.play()
            $(this).animate({opacity: 0.4}, speed, function()
            {
                $(this).css("opacity", "1")
                animalAudio.pause()
                logic(1)
            })
        }
    });   
    $("#dog").click(function()
    {
        if(run)
        {
            //plays animal audio when clicked and then animates it, and finally goes into the logic (brains of program)
            let animal = animals[2 - 1]
            let animalAudio = new Audio(`sounds/${animal}.mp3`)
            animalAudio.play()
            $(this).animate({opacity: 0.4}, speed, function()
            {
                $(this).css("opacity", "1")
                animalAudio.pause()
                logic(2);
            }) 
        }
    });

    $("#lion").click(function()
    {
        if(run)
        {
            //plays animal audio when clicked and then animates it, and finally goes into the logic (brains of program)
            let animal = animals[3 - 1]
            let animalAudio = new Audio(`sounds/${animal}.mp3`)
            animalAudio.play()
            $(this).animate({opacity: 0.4}, speed, function()
            {
                $(this).css("opacity", "1")
                animalAudio.pause()
                logic(3);
            })
        }
    });
    $("#monkey").click(function()
    {
        if(run)
        {
            //plays animal audio when clicked and then animates it, and finally goes into the logic (brains of program)
            let animal = animals[4 - 1]
            let animalAudio = new Audio(`sounds/${animal}.mp3`)
            animalAudio.play()
            $(this).animate({opacity: 0.4}, speed, function()
            {
                $(this).css("opacity", "1")
                animalAudio.pause()
                logic(4)
            })
        }
    })

    $("img").addClass("unselectable")
})

