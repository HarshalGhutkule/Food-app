
async function showLatest(url){

    try{
        let responce = await fetch(url);
        let data = await responce.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

let appendData = (data,location) => {
    data.forEach(({strMeal,strMealThumb},index)=>{
        let div = document.createElement("div");
        div.setAttribute("class","productBox");

        let img = document.createElement("img");
        img.src = strMealThumb;

        let p = document.createElement("p");
        p.innerText = strMeal;

        div.append(img,p);
        location.append(div);

        div.addEventListener("click",function(){
            let preData = [];
            preData.push(data[index])
            localStorage.setItem("mealData",JSON.stringify(preData));
            window.location.href = "home.html";

        })
    })
}

let randomData = (data,location) => {
    location.innerHTML = null;
    let {strMealThumb,strMeal,strInstructions,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strMeasure1,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strMeasure7,strMeasure8,strYoutube} = data[0];
        let div1 = document.createElement("div");
        div1.setAttribute("id","imageDiv");

        let img = document.createElement("img");
        img.src = strMealThumb;
        img.style.height = "100%";
        img.style.width = "100%";

        div1.append(img);

        let div2 = document.createElement("div");
        div2.setAttribute("id","descrip");

        let h2 = document.createElement("h2");
        h2.innerText = strMeal;

        let p1 = document.createElement("p");
        p1.innerHTML = `<b>Instructions:</b>  ${strInstructions}`;

        let p2 = document.createElement("p");
        p2.innerHTML = `<b>Ingredient:</b>   ${strIngredient1}-${strMeasure1}, ${strIngredient2}-${strMeasure2}, ${strIngredient3}-${strMeasure3}, ${strIngredient4}-${strMeasure4}, ${strIngredient5}-${strMeasure5}, ${strIngredient6}-${strMeasure6}, ${strIngredient7}-${strMeasure7}, ${strIngredient8}-${strMeasure8}`;

        let a = document.createElement("a");
        a.href = strYoutube;
        a.innerText = "Watch on YouTube";

        div2.append(h2,p1,p2,a);
        location.append(div1,div2);
}

export {showLatest,appendData,randomData}