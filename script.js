const btn = document.getElementById("btn")
const recepies = document.getElementById("recepies")


btn.addEventListener("click",()=>{
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response =>response.json()).then(data => getData(data))



const getData = (data) =>{


   const ingredients = [];

   for(i=1;i<=20;i++){
    if(data.meals[0][`strIngredient${i}`] && data.meals[0][`strMeasure${i}`] !== ""){
        ingredients.push(data.meals[0][`strIngredient${i}`]  + " - " + data.meals[0][`strMeasure${i}`] )
    }else{
        break;
    }

   }

    recepies.innerHTML = `
    <div class="meal-flex">
    <div class="meal" >
    ${data.meals[0].strMeal ? `<h1 class="meal-title" >${data.meals[0].strMeal}</h1>` : ""}
    ${data.meals[0].strArea ? `<h3 class="meal-area" > From: ${data.meals[0].strArea}</h3>` : ""}
    ${data.meals[0].strCategory ? `<h3 class="meal-category">Category: ${data.meals[0].strCategory}</h3>` : ""}
  
    </div>
    </div>

<div class="meal-body">
<div>
<div class="media">
${data.meals[0].strMealThumb ? `<img src="${data.meals[0].strMealThumb}">` : ""}

</div>
${data.meals[0].strYoutube ?
    `<h3 class = "recipe-video">Recipe video</h3>
    <div class="video">
    
    <iframe src="https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(-11)}"></iframe>
    </div>`:""}
    </div>

<div class="meal-description">
<div>

<h3 class="meal-instructions" >Ingredients:</h3>

<div class="ingredients">


<ul>
${ingredients.map(ingredient => 
   `<li>${ingredient}</li>`).join("")}
</ul>
</div>
</div>
<div>

<h3 class="meal-instructions">Cooking Instructions: </h3>
<div class="cooking-instructions" >
<p>${data.meals[0].strInstructions}</p>
</div>
</div>
</div>

</div>
    `

}

})