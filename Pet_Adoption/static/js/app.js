d3.json("/cats").then(function(cats){
    console.log(cats);
    d3.json("/dogs").then(function(dogs){
        console.log(dogs);
        
        createMap(cats, dogs);

        
    })
})
