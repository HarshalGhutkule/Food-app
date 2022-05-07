
function navbar(){
    return `<div id="navbar">
        <a href="home.html">Home</a>
        <div id="SearchDiv">
            <input id="searchHere" type="text" placeholder="Search Here">
        </div>
        <div id="searchResult"></div>
        <div id="menu">
            <a href="latest.html">Latest</a>
            <a href="random.html">Recipe of the day</a>
            <a href="">Log In</a>
            <a href="">Sign Up</a>
        </div>
    </div>
    `
}


import {showLatest} from "../Scripts/append.js";

let wait;

let debounce = () => {
    
    if(wait){
        clearTimeout(wait);
    }

    wait = setTimeout(function(){
        showSearch();
    },1000)
}

let url;

async function showSearch(){
    try{
        let input = document.getElementById("searchHere").value;

        document.getElementById("searchResult").style.display = "block";

        if(input.length <= 2){
            document.getElementById("searchResult").style.display = "none";
            return false;
        }

        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

        let responce = await fetch(url);

        let data = await responce.json();

        showResult(data.meals);
    }
    catch(err){
        console.log(err);
    }
}

let showResult = (arr) => {

    document.getElementById("searchResult").innerHTML = null;

    if(arr === undefined){
        return false;
    }
    arr.forEach(({strMealThumb,strMeal,strTags})=>{
        let div = document.createElement("div");
        div.setAttribute("class","resultDiv");

        let imgdiv = document.createElement("div");
        imgdiv.setAttribute("class","imgDiv");

        let img = document.createElement("img");
        img.src = strMealThumb;
        img.style.height = "150px";

        imgdiv.append(img);

        let textdiv = document.createElement("div");
        textdiv.setAttribute("class","textDiv");

        let ptag1 = document.createElement("p");
        ptag1.innerText = strMeal;

        let ptag2 = document.createElement("p");
        ptag2.innerText = strTags;

        textdiv.append(ptag1,ptag2);

        div.append(imgdiv,textdiv);
        document.getElementById("searchResult").append(div);

        div.addEventListener("click",function(){
            
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`;

            let responce = showLatest(url);
            responce.then((res)=>{
                localStorage.setItem("mealData",JSON.stringify(res.meals));
                window.location.href = "home.html";
            })
            .catch((err)=>{
                console.log(err);
            })
        })

    })
}


export {navbar,debounce};