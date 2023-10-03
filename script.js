document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submitIngredients");
    submitButton.addEventListener("click", () => {
        const selectedIngredients = document.getElementById("selectedIngredients");
        // Crea un arreglo con los ingredientes seleccionados
        const selectedIngredientsArray = [];
        selectedIngredients.childNodes.forEach((selectedIngredient) => {
            if (selectedIngredient.textContent.trim() != "") {
                selectedIngredientsArray.push(selectedIngredient.textContent.trim());
            }
        });
        console.log(selectedIngredientsArray);
        // Enviar selectedIngredients al backend a través de una solicitud HTTP (POST)
        // Puedes utilizar la función fetch para esto.
        // Luego, muestra la receta sugerida en la interfaz de usuario.
        fetch('http://127.0.0.1:5000/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(selectedIngredientsArray)
        })
        .then(console.log('Enviado'))
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            // Managging the response doing split where is a /n
            let recipe = data["recipe"];
            let recipeSplit = recipe.split('\n');

            const recipelabel = document.getElementById("recipeDisplay");
            recipelabel.innerHTML = "";

            recipeSplit.forEach(element => {
                if (element != "") {
                    if (element == recipeSplit[0]) {
                        const label = document.createElement("label");
                        label.innerHTML = `<h2 id=${element}>${element}</h2>`;
                        recipelabel.appendChild(label);
                    }
                    const label = document.createElement("label");
                    label.innerHTML = `<p id=${element}>${element}</p>`;	
                    recipelabel.appendChild(label);
                }
            });            
        })
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById("categorySelect");
    const ingredientsList = document.getElementById("ingredientsList");
    const selectedIngredients = document.getElementById("selectedIngredients");
    
    // Ingredientes por categoría
    const ingredientData = {
        'frutas': ['Manzana', 'Naranja', 'Plátano', 'Frutillas', 'Arándanos', 'Frambuesas', 'Kiwi', 'Limón',
            'Piña', 'Pera', 'Uva', 'Melón', 'Sandía', 'Cerezas', 'Mango', 'Durazno', 'Damasco', 'Ciruela',
            'Palta', 'Membrillo'],
        'vegetales': ['Tomate', 'Lechuga', 'Repollo', 'Zanahoria', 'Papa', 'Zapallo', 'Zapallo Italiano',
            'Pepino', 'Ajo', 'Cebolla', 'Brocoli', 'Coliflor', 'Apio', 'Ají', 'Albahaca', 'Cebollin', 'Rabano',
            'Betarraga', 'Berenjena', 'Pimiento', 'Alcachofa', 'Poroto Verde', 'Maíz', 'Espárrago',
            'Champiñón', 'Acelga', 'Espinaca', 'Arvejas', 'Porotos', 'Lentejas', 'Garbanzos', 'Aceitunas',
            'Perejil', 'Cilantro', 'Puerro'],
        "frutos-secos": ['Almendras', 'Nueces', 'Maní', 'Pistacho', 'Semillas de Zapallo', 'Semillas de Girasol', 
            'Linaza', 'Castañas', 'Avellanas', 'Coco'],
        "pan-y-cereales": ['Avena', 'Arroz', 'Trigo', 'Harina', 'Maicena', 'Quinoa', 'Cebada', 'Centeno',
            'Pan', 'Pasta'],
        "lacteos": ['Leche', 'Queso Amarillo','Queso Fresco', 'Yogurt'],
        "carnes-y-proteicos": ['Huevos', 'Vacuno', 'Pollo', 'Pavo', 'Cerdo', 'Cordero', 'Pescado Blanco',
            'Pescado Rojo', 'Tocino', 'Jamón', 'Salame', 'Salchicha'],
        "grasas": ['Mantequilla', 'Margarina', 'Aceite Vegetal', 'Aceite de Oliva', 'Aceite de Coco'],
        "condimentos-y-saborizantes": ['Azúcar', 'Sal', 'Pimienta', 'Paprika', 'Comino', 'Bicarbonato',
            'Cacao', 'Miel', 'Te', 'Café', 'Vinagre', 'Aceto Balsamico', 'Vainilla', 'Cúrcuma', 'Menta', 'Canela',
            'Romero', 'Mostaza', 'Jengibre', 'Orégano']
    };

    // Actualiza la lista de ingredientes al cambiar la categoría seleccionada
    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        const ingredients = ingredientData[selectedCategory];

        // Limpia la lista actual de ingredientes
        ingredientsList.innerHTML = "";

        // Llena la lista con los ingredientes de la categoría seleccionada
        ingredients.forEach((ingredient) => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="checkbox" name="ingredient" value="${ingredient}">
                ${ingredient}
            `;
            // Si el ingrediente ya está seleccionado, marca el checkbox
            selectedIngredients.childNodes.forEach((selectedIngredient) => {
                if (selectedIngredient.nodeType == label.nodeType) {
                    if (selectedIngredient.textContent.trim() == ingredient) {
                        label.querySelector("input").checked = true;
                }}
                
            });            
            ingredientsList.appendChild(label);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const selectedIngredients = document.getElementById("selectedIngredients");
    const ingredientsList = document.getElementById("ingredientsList");

    
    function ChangeSelectedIngredients(event) {
        const checkbox = event.target;
        const ingredient = checkbox.value;
        // Si el checkbox está seleccionado, agrega el ingrediente a la lista de ingredientes seleccionados
        if (checkbox.checked) {
            const label = document.createElement("label");
            label.innerHTML = `
                <li id="${ingredient}" value="${ingredient}" >
                ${ingredient}
            `;
            selectedIngredients.appendChild(label);
        // Si el checkbox no está seleccionado, elimina el ingrediente de la lista de ingredientes seleccionados
        } else {
            const label = document.getElementById(ingredient);
            selectedIngredients.childNodes.forEach((selectedIngredient) => {
                if (selectedIngredient.nodeType == label.nodeType) {
                    if (selectedIngredient.textContent.trim() == ingredient) {
                        selectedIngredients.removeChild(selectedIngredient);
                    }
                }
            });
        }
    }

    // Agrega o elimina un ingrediente a la lista de ingredientes seleccionados
    ingredientsList.addEventListener("change", (event) => {
        ChangeSelectedIngredients(event);
    });
});