//controls if instructions show
let show_instructions = false;

//controls the game title text color loop
let gameTextInterval = null;

//controls loop in control of current level
let levelInterval = null;

//pregame interval
let pregameTextInterval = null;

//controls if the game runs
let run = false;

//holds computer sequence
let computer_sequence = [];

//holds user sequence
let user_sequence = [];

//holds level 
let level = 1;

//holds animation speed
let speed = 700

//controls whether speed increases
let wasIncreased = false

//holds list of animal names corresponding with design
let animals = ["bird", "dog", "lion", "monkey"]

//leaderboard 

let leaderboard = null



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

function pregameRainbowText()
{
    $("#pregame-text").css("color", getRandomColor())
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
    $("#quit").hide()
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
            speed -= 30
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
            leaderboardManager()
            
            //changes game text to game over
            $("#game-text").text("GAME OVER!")

            //changes game text color to red
            $("#game-text").css("color", "rgb(255,0,0)")

            $("#start").text("Restart")
            $("#start").css("width", "fit-content")
            $("#start").show()
            $("#quit").show()

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

//going to initialize the leaderboard when document loads
let initLeaderboard = function()
{
    for(let i = 0; i < localStorage.length; i++)
    {
        alert(`${localStorage.key(i)} ${localStorage.getItem(localStorage.key(i))}`)
    }
}

//called when game is over,

let leaderboardManager = function()
{
    let str = localStorage.getItem("name") + " " + level

    let jsonData = JSON.stringify(str)

    if(localStorage.getItem("leaderboard") == null)
    {
        //iniitalize leaderboard
        localStorage.setItem("leaderboard", JSON.stringify(str))
    }
    else
    {
        let info = String(JSON.parse(localStorage.getItem("leaderboard"))).split(",")

        //if name in localstorage is in leaderboard
        if(getNameIndex(info) != -1)
        {
            let data = info[getNameIndex(info)].split(" ")

            if(level > Number(data[1]))
                data[1] = level
            
            info[getNameIndex(info)] = data.join(" ")
        }
        else
        {
            info.push(str)
        }
        
        let output = sortLeaderboard(info)

        localStorage.setItem("leaderboard", JSON.stringify(output))
    }
}

let getNameIndex = function(arr)
{
    let index = -1

    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].split(" ")[0] == localStorage.getItem("name"))
        {
            index = i
        }
    }

    return index
}

let sortLeaderboard = function(arr)
{
    output = [...arr]

    for(let i = 0; i < output.length; i++)
    {

        let currentPlayerLevel = output[i].split(" ")[1]

        for(let j = i + 1; j < output.length; j++)
        {
            let nextPlayerLevel = output[j].split(" ")[1]

            if(Number(nextPlayerLevel) > Number(currentPlayerLevel))
            {
                let temp = output[i]
                output[i] = output[j]
                output[j] = temp
            }
        }
        

    }

    return output
}

let testLeaderboard = function()
{
    leaderboard = document.getElementById("leaderboard")

    
    //start at index 1 since heading is in 0
    for(let i = 1; i <= 3; i++)
    {
        let row = leaderboard.insertRow(i)

        //columns of leaderboard
        for(let j = 0; j < 2; j++)
        {
            let cell = row.insertCell(j)

            $(cell).text(`Test ${i}`)
        }
    }
    
}

//when document loads set interval variables and add events for each image and start button
$(document).ready(function() 
{
    pregameTextInterval = setInterval(pregameRainbowText, 1000)
    gameTextInterval = setInterval(rainbowGameText, 1000)

    $("#pregame-next").click(function() 
    {
        let inputVal = $("#pregame-input")[0].value

        if(inputVal.length == 0)
            alert("Enter a valid username.")
        else
        {
            clearInterval(pregameTextInterval)
            localStorage.setItem("name", $("#pregame-input")[0].value)
            window.location.replace("index.html")
        }
    })

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

    $("#quit").click(function() 
    {
        window.location.replace("pregame.html")
    })

    $("img").addClass("unselectable")
})

