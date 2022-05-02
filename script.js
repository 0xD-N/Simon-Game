//controls if instructions show
let show_instructions = false;

//let show_leaderboard = false;

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

//let leaderboard = null

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

/*
let leaderboard_visibility = function()
{
    if(show_leaderboard)
    {
        $("#leaderboard").hide()
        show_instructions = false
    }
    else
    {
        $("#leaderboard").show()
        show_instructions = true
    }
}
*/


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

//increases speed every 2 rounds
let increaseSpeed = function()
{
    if(level % 2 == 0)
    {
        if(wasIncreased == false)
        {
            speed -= 20
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
            //leaderboardManager()
            //initLeaderboard()
            
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


/*
//called when game is over. Manages the order of the leaderboard

let leaderboardManager = function()
{
    //get username and current level
    let str = localStorage.getItem("name") + " " + level

    let output = null

    //if no leaderboard key exists then make a new leaderboard key and give it the value of str
    if(localStorage.getItem("leaderboard") == null)
    {
        //iniitalize leaderboard
        
        //json is used to convert the string object into an jSON object that is represented as a string
        localStorage.setItem("leaderboard", JSON.stringify(str))
    }
    //if leaderboard exists
    else
    {
        //convert JSON into an object and casts object into a string, and finally splits the string based on commas (commas provided by JSON)
        let info = String(JSON.parse(localStorage.getItem("leaderboard"))).split(",")
        

        //function that determins if name in localstorage is in leaderboard (so we just update value instead of writing new players multiple times to localStorage)
        if(getNameIndex(info) != -1)
        {
            let data = info[getNameIndex(info)].split(" ")

            if(level > Number(data[1]))
                data[1] = level
            
            info[getNameIndex(info)] = data.join(" ")
        }
        else
        {
            //add current player information to info string array
            info.push(str)
        }
        
        //store sorted String array (by level) in output
        output = sortLeaderboard(info)

        //converts string array into a JSON string and stores it in leaderboard
        //(JSON ONLY STORES STRINGS SO JSON IS USED TO OUR ADVANTAGE)
        localStorage.setItem("leaderboard", JSON.stringify(output))

    }
}
*/

/*
//gets index of name from leaderboard. -1 if not found
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
*/
/*
//sorts leaderboard by level. Each element storeed in arr is space seperated (name, level). Ex: ("Player 8")
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
*/
/*
//going to initialize the leaderboard when document loads
let initLeaderboard = function()
{
   
    //used to determine whether the current file is the index.html and not the pregame file
    let path = window.location.pathname;
    let page = path.split("/").pop();

    if(page != "index.html")
        return
    else
    {
        let leaderboard = document.getElementById("leaderboard") 
        
        //gets JSON string from the leaderboard key in localStorage and converts it to a string, and finally splits each value by a comma
        let leaderboardData = String(JSON.parse(localStorage.getItem("leaderboard"))).split(",")

        //important to have to prevent from adding new values to old table
       while(leaderboard.rows.length > 1 && leaderboard.rows.length != 0)
           leaderboard.deleteRow(-1)
        
        //start at index 1 since heading is in 0
        for(let i = 1; i < leaderboardData.length + 1; i++)
        { 

            //max values i'll show is 5
            if(i == 5) break;

            let row = leaderboard.insertRow(i)

            //columns of leaderboard
            for(let j = 0; j < 2; j++)
            {
                let cell = row.insertCell(j)

                if(j == 0)
                    $(cell).text(leaderboardData[i - 1].split(" ")[0])
                else if(j == 1)
                    $(cell).text(leaderboardData[i - 1].split(" ")[1])
            }
        }

    }
    
}
*/
//when document loads set interval variables and add events for each image and start button
$(document).ready(function() 
{
    pregameTextInterval = setInterval(pregameRainbowText, 1000)
    gameTextInterval = setInterval(rainbowGameText, 1000)

    /*
    //if there's already a leaderboard then initiaize it. 
    if(localStorage.getItem("leaderboard") != null)
        initLeaderboard()
    */
    
    $("#pregame-next").click(function() 
    {
        let inputVal = $("#pregame-input")[0].value
        
        if(inputVal.length == 0)
            $("#pregame-error").text("Enter a valid username")
        else if(inputVal.includes(" "))
            $("#pregame-error").text("Username must include no spaces")
        else
        {
            clearInterval(pregameTextInterval)
            localStorage.setItem("name", $("#pregame-input")[0].value)
            window.location.replace("game.html")
        }
    })

    $("#start").click(function() 
    {
        //if start button clicked, this function is called
        setTimeout(begin, 400)
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
        window.location.replace("index.html")
    })

    $("img").addClass("unselectable")
})