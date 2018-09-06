var recipes = [];

$(document).ready(function () {
    GetAllRecipes();
});

function ChooseRecipe()
{
    var selectedItems = [];
    var idSelector = function () { return this.id; };
    var checked_checkboxes = $(":checkbox:checked").map(idSelector).get();

    checked_checkboxes.forEach(function (value, index) {
        var number = value.substr("checkbox".length - value.length);
        selectedItems[index] = articlesTable[number].id;
    });
    var selectedItems_names = [];

    selectedItems.forEach(function (value, index) {
        selectedItems_names[index] = articlesTable[articlesTable.findIndex(x => x.id === value)].articleName;
    });
    
    var dinnerNumbers = WhichRecipe(selectedItems_names, recipes);

    console.log(dinnerNumbers);
}

function ContainsAll(array1, array2) {
    return array1.every(elem => array2.indexOf(elem) > -1)
}

function GetAllRecipes() {
    for (var k = 0; k < 16; k++) {
        $.getJSON("/recipes/dinners/dinner" + (k + 1) + ".json", function (json) {
            recipes.push(json);
        });
    }
}

function WhichRecipe(selectedItems_names, recipes) {
    var dinnerNumbers = [];

    for (var k = 0; k < recipes.length; k++) {
        if (ContainsAll(selectedItems_names, recipes[k].components))
            dinnerNumbers.push(k);
    }
    
    return dinnerNumbers;
}