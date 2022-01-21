let show_instructions = false;

/*
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomColor() 
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(function()
{
    while(true)
    {
        await sleep(1000)
        $("#game-instruction-text").css("color", getRandomColor())
    }
})
*/

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

