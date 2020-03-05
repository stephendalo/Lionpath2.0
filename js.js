let data = "";
let pic = "";
let foodTitle = "";
let food = "";
let change = "";


function accessData()
{
    const request = new XMLHttpRequest();

    food = document.querySelector("#foodBox").value;
    request.open("GET", "https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/" + "?q=" + food, true);
    
    document.querySelector("#foodList").options.length = 0;

    request.onload = function() {
        data = JSON.parse(this.response);
        if (request.status == 200) {
            data.results.forEach(eat => {
                let option = document.createElement("option");
                let optionText = document.createTextNode(eat.title);
    
                option.appendChild(optionText);
                document.querySelector("#foodList").appendChild(option);
                //console.log(eat);
            });
        } else {
            console.log(`Error occured. Status: ${request.status}`);
        }
    }
    const picRequest = new XMLHttpRequest();
    picRequest.open("GET", "https://api.giphy.com/v1/gifs/search?api_key=QzDxEceYXHivSgYaj485zQXSUCv2wpyJ&q="+ food +"&limit=25&offset=0&rating=G&lang=en", true);

    picRequest.onload = function() {
        pic = JSON.parse(this.response);
        if (picRequest.status == 200) {
            change = pic.data[1].images.downsized_large.url;
            document.querySelector("#change").src = change;
        } else {
            console.log(`Error occured. Status: ${picRequest.status}`);
        }
    }
    picRequest.send();
    request.send();

}

function getItemSelected()
{
    document.querySelector("#description").innerHTML = "";

    let selectedIndex = document.querySelector("#foodList").selectedIndex;
    // let description = document.createElement("p");
    let textDescription = document.createTextNode(data.results[selectedIndex].ingredients);

    foodTitle = data.results[selectedIndex].title;

    let temp = data.results[selectedIndex].ingredients;
    let ingredients = new Array();
    ingredients = temp.split(',');

    let table = document.getElementById("myTable");

    while(table.rows.length > 1) {
        table.deleteRow(1);
      }

    let i = ingredients.length;
    ingredients.forEach(ingredient => {
        let row = table.insertRow(1);
        let cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = i;
        cell2.innerHTML = ingredient;
        i--;
    });



    // description.appendChild(textDescription);
    document.querySelector("#description").appendChild(description);
}

function changeColour(value)
{
    let color = document.body.style.backgroundColor;
    switch(value)
    {
        case 'Aqua':
            color = "#7FDBFF";
        break;
        case 'Teal':
            color = "#39CCCC";
        break;
        case 'Lime':
            color = "#01FF70";
        break;
    }
    document.body.style.backgroundColor = color;
}