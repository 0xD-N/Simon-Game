let show_instructions = false;
let started = false;
let interval = null;

function changeColor() 
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    $("#game-text").css("color", color)
}



$(document).ready(function() 
{
    interval = setInterval(changeColor, 1000)
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

