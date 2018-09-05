

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
    console.log(selectedItems);
    selectedItems.forEach(function (value, index) {
        selectedItems_names[index] = articlesTable[index].articleName;
    });



}