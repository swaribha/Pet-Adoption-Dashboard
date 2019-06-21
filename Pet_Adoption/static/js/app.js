function breedViz(catData, dogData) {
    var catBreedArray = [];
    catData.forEach(element => {
        catBreedArray.push(element.breed)
    });
    var occurences = {};
    for (var i = 0; i < catBreedArray.length; i++) {
        if (typeof occurences[catBreedArray[i]] == "undefined") {
            occurences[catBreedArray[i]] = 1;
        } else {
            occurences[catBreedArray[i]]++;
        }
    };
    var sortableCatBreed = [];
    for (var breed in occurences) {
        sortableCatBreed.push([breed, occurences[breed]]);
    }
    sortableCatBreed.sort(function (a, b) {
        return b[1] - a[1];
    });

    var dogBreedArray = [];
    dogData.forEach(element => {
        dogBreedArray.push(element.breed)
    });
    var occurencesDog = {};
    for (var i = 0; i < dogBreedArray.length; i++) {
        if (typeof occurencesDog[dogBreedArray[i]] == "undefined") {
            occurencesDog[dogBreedArray[i]] = 1;
        } else {
            occurencesDog[dogBreedArray[i]]++;
        }
    };
    var sortableDogBreed = [];
    for (var breed in occurencesDog) {
        sortableDogBreed.push([breed, occurencesDog[breed]]);
    }
    sortableDogBreed.sort(function (a, b) {
        return b[1] - a[1];
    });
    var ctx = document.getElementById('catViz');
    var catBreed = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [sortableCatBreed[0][1], sortableCatBreed[1][1], sortableCatBreed[2][1], sortableCatBreed[3][1], sortableCatBreed[4][1]],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#DAD2D8"]
            }],
            labels: [sortableCatBreed[0][0], sortableCatBreed[1][0], sortableCatBreed[2][0], sortableCatBreed[3][0], sortableCatBreed[4][0]]
        },
        options: {
            legend: {
                position: "bottom"
            }
        }
    });
    var ctx = document.getElementById('dogViz');
    var dogBreed = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [sortableDogBreed[0][1], sortableDogBreed[1][1], sortableDogBreed[2][1], sortableDogBreed[3][1], sortableDogBreed[4][1]],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#DAD2D8"]
            }],
            labels: [sortableDogBreed[0][0], sortableDogBreed[1][0], sortableDogBreed[2][0], sortableDogBreed[3][0], sortableDogBreed[4][0]]
        },
        options: {
            legend: {
                position: "bottom"
            }
        }
    });
};
d3.json("/cats").then(function (cats) {
    console.log(cats);
    d3.json("/dogs").then(function (dogs) {
        console.log(dogs);

        createMap(cats, dogs);

        createCharts(cats, dogs);

        createTagCloud_cats(cats);
        createTagCloud_dogs(dogs);

        // ageViz(cats, dogs);
        // sexViz(cats, dogs);
        // breedViz(cats, dogs)

    })
});
// var opts = new Set(['Age','Sex','Breed']);
// var options = Array.from(opts);
// options.unshift("");
// var option_list = d3.select("#selDataset");
// option_list.selectAll('option').data(options).enter()
//        .append('option').attr("value", function (d) { return d; }).text(function(d){ return d;});
$("#agePlots").show();
$("#sexPlots").hide();
$("#breedPlots").hide();
function selection(value) {
    if (value == 'Age') {
        $("#agePlots").show();
        $("#sexPlots").hide();
        $("#breedPlots").hide();
    }
    if (value == 'Sex') {
        $("#agePlots").hide();
        $("#sexPlots").show();
        $("#breedPlots").hide();
    }
    if (value == 'Breed') {
        $("#agePlots").hide();
        $("#sexPlots").hide();
        $("#breedPlots").show();
    }
};