// find most frequent cat names and dog names

var width = 330;
var height = 330;

var colorblues = d3.scaleLinear()
    .domain([1,30])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#0061b3"), d3.rgb('#4dadff')]);

var colorgreens = d3.scaleLinear()
    .domain([1,60])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#4C9A2A"), d3.rgb('#1E5631')]);

function createTagCloud_cats(petdata){
    
    var wordsMap = createWordMap(petdata);
    var frequency_list = getMostFrequent(wordsMap, 20);
    //console.log(frequency_list);
    
    d3.layout.cloud().size([width, height])
        .words(frequency_list)
        .padding(10)
        .rotate(0)
        .fontSize(function(d) { return 10*d.size; })
        .on("end", draw_cats)
        .start();  
}

function draw_cats(words) {
          
    var svg = d3.select("#wordcloud-cats")
                .append("svg")
                .attr("width", width)
                .attr("height", height)

    var group = svg.append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")" + "scale(0.85)");

    group.selectAll("text")
        .attr("text-anchor", "middle")
        .data(words)
        .enter().append("text")
        .style("font-family", "Archivo Black")
        .style("font-size", function(d) { return (d.size-1) + "px"; })
        .style("fill", function(d, i) { return colorblues(i); })
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on('mouseover', function(d){

            //console.log(d);
            var g = group.append('g')
                        .attr('id', 'counts');
            
            g.append('text')
                .attr('x', d.x+(10+d.width)/2)
                .attr('y', d.y-d.height/2)
                .attr('text-anchor', 'right')
                .attr('font-size', '18px')
                .text(function() { return d.size; })

                var bbox = g.node().getBBox();
                var bboxPadding = 5;

            var rect = g.insert('rect', ':first-child')
                .attr('x', bbox.x)
                .attr('y', bbox.y)
                .attr('width', bbox.width + bboxPadding)
                .attr('height', bbox.height + bboxPadding)
                .attr('rx', 10)
                .attr('ry', 10)
                .attr('fill', 'white')
                .attr('fill-opacity',.8);   
                    
        })
        .on('mouseout', function(d){
            d3.select('#counts').remove();
        });
}

function createTagCloud_dogs(petdata){
    
    var wordsMap = createWordMap(petdata);
    var frequency_list = getMostFrequent(wordsMap, 20);
    //console.log(frequency_list);
    
    d3.layout.cloud().size([width, height])
        .words(frequency_list)
        .padding(10)
        .rotate(0)
        .fontSize(function(d) { return 10*d.size; })
        .on("end", draw_dogs)
        .start();  
}

function draw_dogs(words) {
         
    var svg = d3.select("#wordcloud-dogs")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    var group = svg.append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")" + "scale(0.85)");

    group.selectAll("text")
        .attr("text-anchor", "middle")
        .data(words)
        .enter().append("text")
        .style("font-family", "Archivo Black")
        .style("font-size", function(d) { return (d.size-1) + "px"; })
        .style("fill", function(d, i) { return colorblues(i); })
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on('mouseover', function(d){

            //console.log(d);
            var g = group.append('g')
                         .attr('id', 'counts');
            
            g.append('text')
                .attr('x', d.x+(10+d.width)/2)
                .attr('y', d.y-d.height/2)
                .attr('text-anchor', 'right')
                .attr('font-size', '18px')
                .text(function() { return d.size; })

                var bbox = g.node().getBBox();
                var bboxPadding = 5;

            var rect = g.insert('rect', ':first-child')
                .attr('x', bbox.x)
                .attr('y', bbox.y)
                .attr('width', bbox.width + bboxPadding)
                .attr('height', bbox.height + bboxPadding)
                .attr('rx', 10)
                .attr('ry', 10)
                .attr('fill', 'white')
                .attr('fill-opacity',.8);   
                    
        })
        .on('mouseout', function(d){
            d3.select('#counts').remove();
        });
            
}

function createWordMap(data){

    var wordsMap = {};
    data.forEach(function(key){
        if(wordsMap.hasOwnProperty(key.pet_name)){
            wordsMap[key.pet_name]++;
        } else {
            wordsMap[key.pet_name] = 1;
        }
    })
    return wordsMap;
};

function getMostFrequent(wordsMap, num){
    // sort in descending order
    // return top 10
    var descOrderArray = [];
    descOrderArray = Object.keys(wordsMap).map(function (key) {
        return {
        text: key,
        size: wordsMap[key]
        };
    });

    descOrderArray.sort(function (a, b) {
        return b.size - a.size;
    });
    return descOrderArray.slice(0, num);
}