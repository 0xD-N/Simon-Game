let show_instructions = false;
let started = false;
let gameTextInterval = null;
let levelInterval = null;
let run = false;
let computer_sequence = [];
let user_sequence = [];
let i = 0;
let level = 1;

let animals = ["bird", "dog", "lion", "monkey"]


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

function rainbowGameText() 
{
    $("#game-text").css("color", getRandomColor())
}

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

let addSequence = function()
{
    computer_sequence.push(Number(1 + Math.random() * 3).toFixed(0))
}

let playSequence = function()
{
    for(let i = 0; i < computer_sequence.length; i++)
    {
        alert(Number(computer_sequence[i]).toFixed(0))
    }
}

let begin = function()
{
    $("#start").hide()

    $("#game-text").text(`Level ${level}`)
    
    run=true

    addSequence()

    playSequence()
}

let logic = function(num)
{
    if(run)
    {
        user_sequence.push(num)

        if(!checkSequence())
        {
            $("#game-text").text("GAME OVER!")
            clearInterval(gameTextInterval)
            run = false;
        }
        else
        {
            if(user_sequence.length == computer_sequence.length)
            {
                user_sequence = []
                addSequence()
                level += 1
                playSequence()
            }
        }
    }
    
}

let setLevel = function()
{
    if(run)
    {
        $("#game-text").text(`Level ${level}`)
    }
}

$(document).ready(function() 
{
    gameTextInterval = setInterval(rainbowGameText, 1000)
    levelInterval = setInterval(setLevel, 1000)
    $("#start").click(function() 
    {
        begin()
    })
    
    $("#bird").click(function()
    {
        logic(1)
    });
    $("#dog").click(function()
    {
        logic(2);
    });
    $("#lion").click(function()
    {
        logic(3);
    });
    $("#monkey").click(function()
    {
        logic(4)
    })
})


