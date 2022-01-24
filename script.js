let show_instructions = false;
let started = false;
let gameTextInterval = null;

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



$(document).ready(function() 
{
    gameTextInterval = setInterval(rainbowGameText, 1000)
})


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

