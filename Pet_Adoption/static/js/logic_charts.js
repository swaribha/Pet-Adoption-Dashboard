// catData = d3.json("/cats")
// dogData = d3.json("/dogs")

// console.log(petdata);
// console.log(catData)
function createCharts(catData, dogData) {
    // Count number of male and female cats
    var catMale = 0;
    var catFemale = 0;
    for (var i = 0; i < catData.length; ++i) {
        if (catData[i].sex == "Male")
            catMale++;
        if (catData[i].sex == "Female")
            catFemale++;
    };
    console.log(catMale);
    console.log(catFemale);

    // Count number of each category of age for cats
    var catKitten = 0;
    var catYoung = 0;
    var catAdult = 0;
    var catSenior = 0;
    for (var i = 0; i < catData.length; ++i) {
        if (catData[i].age == "kitten")
            catKitten++;
        if (catData[i].age == "young")
            catYoung++;
        if (catData[i].age == "adult")
            catAdult++;
        if (catData[i].age == "senior")
            catSenior++;
    };
    console.log(catKitten);
    console.log(catYoung);
    console.log(catAdult);
    console.log(catSenior);

    // Count number of cats that are spayed/neutered
    var catFixed = 0;
    var catNotFixed = 0;
    for (var i = 0; i < catData.length; ++i) {
        if (catData[i]["Spayed / Neutered"] == "yes")
            catFixed++;
        if (catData[i]["Spayed / Neutered"] == "")
            catNotFixed++;
    };
    console.log(catFixed);
    console.log(catNotFixed);

    // Get data for cat breeds

    var catBreedArray = [];
    catData.forEach(element => {
        catBreedArray.push(element.breed)
    });
    console.log(catBreedArray);

    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    // }
    // var uniqueCatBreeds = catBreedArray.filter(onlyUnique);
    // console.log(uniqueCatBreeds);

    var occurences = {};
    for (var i = 0; i < catBreedArray.length; i++) {
        if (typeof occurences[catBreedArray[i]] == "undefined") {
            occurences[catBreedArray[i]] = 1;
        } else {
            occurences[catBreedArray[i]]++;
        }
    };
    console.log(occurences);

    var sortableCatBreed = [];
    for (var breed in occurences) {
        sortableCatBreed.push([breed, occurences[breed]]);
    }
    sortableCatBreed.sort(function (a, b) {
        return b[1] - a[1];
    });
    console.log(sortableCatBreed);


    // Data for cat name

    var catNameArray = [];
    catData.forEach(element => {
        catNameArray.push(element.pet_name)
    });
    console.log(catBreedArray);

    var occurencesName = {};
    for (var i = 0; i < catNameArray.length; i++) {
        if (typeof occurencesName[catNameArray[i]] == "undefined") {
            occurencesName[catNameArray[i]] = 1;
        } else {
            occurencesName[catNameArray[i]]++;
        }
    };
    console.log(occurencesName);

    var sortableCatName = [];
    for (var name in occurencesName) {
        sortableCatName.push([name, occurencesName[name]]);
    }
    sortableCatName.sort(function (a, b) {
        return b[1] - a[1];
    });
    console.log(sortableCatName);


    // Make chart for cat genders
    var ctx = document.getElementById('catGender');
    var catGender = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [catMale, catFemale],
                backgroundColor: ["#143642", "#0F8B8D"]
            }],
            labels: ["Male", "Female"],
        },
        options: {
            title: {
                display: true,
                text: "Cat"
            },
            legend: {
                position: "bottom"
            }
        }
    });

    // Make chart for cat ages
    var ctx = document.getElementById('catAge');
    var catAge = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [catKitten, catYoung, catAdult, catSenior],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A"]
            }],
            labels: ["Kitten", "Young", "Adult", "Senior"]
        },
        options: {
            title: {
                display: true,
                text: "Cat"
            },
            legend: {
                position: "bottom"
            }
        },
    });

    // // Make chart for cat fixed
    // var ctx = document.getElementById('catProcedure');
    // var catProcedure = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //         datasets: [{
    //             data: [catFixed, catNotFixed],
    //             backgroundColor: ["#143642", "#0F8B8D"]
    //         }],
    //         labels: ["Fixed", "Not Fixed"]
    //     },
    //     options: {
    //         legend: {
    //             position: "below"
    //         }
    //     }
    // });

    // Make chart for cat breed
    var ctx = document.getElementById('catBreed');
    var catBreed = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [sortableCatBreed[0][1], sortableCatBreed[1][1], sortableCatBreed[2][1], sortableCatBreed[3][1], sortableCatBreed[4][1]],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#C97B84"]
            }],
            labels: [sortableCatBreed[0][0], sortableCatBreed[1][0], sortableCatBreed[2][0], sortableCatBreed[3][0], sortableCatBreed[4][0]]
        },
        options: {
            title: {
                display: true,
                text: "Cat"
            },
            legend: {
                position: "bottom"
            }
        }
    });



    // Dog gender data and chart construction
    var dogMale = 0;
    var dogFemale = 0;
    for (var i = 0; i < dogData.length; ++i) {
        if (dogData[i].sex == "Male")
            dogMale++;
        if (dogData[i].sex == "Female")
            dogFemale++;
    };
    console.log(dogMale);
    console.log(dogFemale);

    var ctx = document.getElementById('dogGender');
    var dogGender = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [dogMale, dogFemale],
                backgroundColor: ["#143642", "#0F8B8D"]
            }],
            labels: ["Male", "Female"],
        },
        options: {
            title: {
                display: true,
                text: "Dog"
            },
            legend: {
                position: "bottom"
            }
        }
    });

    // Count number of each category of age for dogs and make chart
    var dogPuppy = 0;
    var dogYoung = 0;
    var dogAdult = 0;
    var dogSenior = 0;
    for (var i = 0; i < dogData.length; ++i) {
        if (dogData[i].age == "puppy")
            dogPuppy++;
        if (dogData[i].age == "young")
            dogYoung++;
        if (dogData[i].age == "adult")
            dogAdult++;
        if (dogData[i].age == "senior")
            dogSenior++;
    };
    console.log(dogPuppy);
    console.log(dogYoung);
    console.log(dogAdult);
    console.log(dogSenior);

    var ctx = document.getElementById('dogAge');
    var dogAge = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [dogPuppy, dogYoung, dogAdult, dogSenior],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A"]
            }],
            labels: ["Puppy", "Young", "Adult", "Senior"],
        },
        options: {
            title: {
                display: true,
                text: "Dog"
            },
            legend: {
                position: "bottom"
            }
        }
    });


    // Get data for dog breeds

    var dogBreedArray = [];
    dogData.forEach(element => {
        dogBreedArray.push(element.breed)
    });
    console.log(dogBreedArray);

    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    // }
    // var uniqueCatBreeds = catBreedArray.filter(onlyUnique);
    // console.log(uniqueCatBreeds);

    var occurencesDog = {};
    for (var i = 0; i < dogBreedArray.length; i++) {
        if (typeof occurencesDog[dogBreedArray[i]] == "undefined") {
            occurencesDog[dogBreedArray[i]] = 1;
        } else {
            occurencesDog[dogBreedArray[i]]++;
        }
    };
    console.log(occurencesDog);

    var sortableDogBreed = [];
    for (var breed in occurencesDog) {
        sortableDogBreed.push([breed, occurencesDog[breed]]);
    }
    sortableDogBreed.sort(function (a, b) {
        return b[1] - a[1];
    });
    console.log(sortableDogBreed);

    var ctx = document.getElementById('dogBreed');
    var dogBreed = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [sortableDogBreed[0][1], sortableDogBreed[1][1], sortableDogBreed[2][1], sortableDogBreed[3][1], sortableDogBreed[4][1]],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#C97B84"]
            }],
            labels: [sortableDogBreed[0][0], sortableDogBreed[1][0], sortableDogBreed[2][0], sortableDogBreed[3][0], sortableDogBreed[4][0]]
        },
        options: {
            title: {
                display: true,
                text: "Dog"
            },
            legend: {
                position: "bottom"
            }
        }
    });
};

// function ageViz(catData, dogData) {
//     // Count number of each category of age for cats
//     var catKitten = 0;
//     var catYoung = 0;
//     var catAdult = 0;
//     var catSenior = 0;
//     for (var i = 0; i < catData.length; ++i) {
//         if (catData[i].age == "kitten")
//             catKitten++;
//         if (catData[i].age == "young")
//             catYoung++;
//         if (catData[i].age == "adult")
//             catAdult++;
//         if (catData[i].age == "senior")
//             catSenior++;
//     };
//     var dogPuppy = 0;
//     var dogYoung = 0;
//     var dogAdult = 0;
//     var dogSenior = 0;
//     for (var i = 0; i < dogData.length; ++i) {
//         if (dogData[i].age == "puppy")
//             dogPuppy++;
//         if (dogData[i].age == "young")
//             dogYoung++;
//         if (dogData[i].age == "adult")
//             dogAdult++;
//         if (dogData[i].age == "senior")
//             dogSenior++;
//     };
//     // Make chart for cat ages
//     var ctx = document.getElementById('catViz');
//     var catAge = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [catKitten, catYoung, catAdult, catSenior],
//                 backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A"]
//             }],
//             labels: ["Kitten", "Young", "Adult", "Senior"]
//         },
//         options: {
//             legend: {
//                 position: "bottom"
//             }
//         },
//     });
//     var ctx = document.getElementById('dogViz');
//     var dogAge = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [dogPuppy, dogYoung, dogAdult, dogSenior],
//                 backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A"]
//             }],
//             labels: ["Puppy", "Young", "Adult", "Senior"],
//         },
//         options: {
//             legend: {
//                 position: "bottom"
//             }
//         }
//     });
// };

// function sexViz(catData, dogData) {
//     var catMale = 0;
//     var catFemale = 0;
//     for (var i = 0; i < catData.length; ++i) {
//         if (catData[i].sex == "Male")
//             catMale++;
//         if (catData[i].sex == "Female")
//             catFemale++;
//     };

//     var dogMale = 0;
//     var dogFemale = 0;
//     for (var i = 0; i < dogData.length; ++i) {
//         if (dogData[i].sex == "Male")
//             dogMale++;
//         if (dogData[i].sex == "Female")
//             dogFemale++;
//     };
//     var ctx = document.getElementById('catViz');
//     var catGender = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [catMale, catFemale],
//                 backgroundColor: ["#143642", "#0F8B8D"]
//             }],
//             labels: ["Male", "Female"],
//         },
//         options: {
//             legend: {
//                 position: "bottom"
//             }
//         }
//     });
//     var ctx = document.getElementById('dogViz');
//     var dogGender = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [dogMale, dogFemale],
//                 backgroundColor: ["#143642", "#0F8B8D"]
//             }],
//             labels: ["Male", "Female"],
//         },
//         options: {
//             legend: {
//                 position: "bottom"
//             }
//         }
//     });
// };
// function breedViz(catData, dogData) {
//     var catBreedArray = [];
//     catData.forEach(element => {
//         catBreedArray.push(element.breed)
//     });
//     var occurences = {};
//     for (var i = 0; i < catBreedArray.length; i++) {
//         if (typeof occurences[catBreedArray[i]] == "undefined") {
//             occurences[catBreedArray[i]] = 1;
//         } else {
//             occurences[catBreedArray[i]]++;
//         }
//     };
//     var sortableCatBreed = [];
//     for (var breed in occurences) {
//         sortableCatBreed.push([breed, occurences[breed]]);
//     }
//     sortableCatBreed.sort(function (a, b) {
//         return b[1] - a[1];
//     });

//     var dogBreedArray = [];
//     dogData.forEach(element => {
//         dogBreedArray.push(element.breed)
//     });
//     var occurencesDog = {};
//     for (var i = 0; i < dogBreedArray.length; i++) {
//         if (typeof occurencesDog[dogBreedArray[i]] == "undefined") {
//             occurencesDog[dogBreedArray[i]] = 1;
//         } else {
//             occurencesDog[dogBreedArray[i]]++;
//         }
//     };
//     var sortableDogBreed = [];
//     for (var breed in occurencesDog) {
//         sortableDogBreed.push([breed, occurencesDog[breed]]);
//     }
//     sortableDogBreed.sort(function (a, b) {
//         return b[1] - a[1];
//     });
//     var ctx = document.getElementById('catViz');
//     var catBreed = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [sortableCatBreed[0][1], sortableCatBreed[1][1], sortableCatBreed[2][1], sortableCatBreed[3][1], sortableCatBreed[4][1]],
//                 backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#DAD2D8"]
//             }],
//             labels: [sortableCatBreed[0][0], sortableCatBreed[1][0], sortableCatBreed[2][0], sortableCatBreed[3][0], sortableCatBreed[4][0]]
//         },
//         options: {
//             legend: {
//                 position: "bottom"
//             }
//         }
//     });
//     var ctx = document.getElementById('dogViz');
//     var dogBreed = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [sortableDogBreed[0][1], sortableDogBreed[1][1], sortableDogBreed[2][1], sortableDogBreed[3][1], sortableDogBreed[4][1]],
//                 backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#DAD2D8"]
//             }],
//             labels: [sortableDogBreed[0][0], sortableDogBreed[1][0], sortableDogBreed[2][0], sortableDogBreed[3][0], sortableDogBreed[4][0]]
//         },
//         options: {
//             legend: {
//                 position: "bottom"
//             }
//         }
//     });
// }
