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
<div class="media">
${data.meals[0].strMealThumb ? `<img src="${data.meals[0].strMealThumb}">` : ""}

${data.meals[0].strYoutube ?
`<div class="video">
<h3>Recipe video</h3>
<iframe src="https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(-11)}"></iframe>
</div>`:""}
</div>

<div class="meal-description">
<div class="ingredients">

<h3>Ingredients:</h3>

<ul>
${ingredients.map(ingredient => 
   `<li>${ingredient}</li>`).join("")}
</ul>

</div>

<div class="cooking-instructions" >
<h3>Cooking Instructions: </h3>
<p>${data.meals[0].strInstructions}</p>
</div>
</div>

</div>

    `

}

})