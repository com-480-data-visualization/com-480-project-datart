const width = 650, height = 525;
const path = d3.geoPath();

const projection = d3.geoConicConformal()
    .center([-0.321031550601001, 51.44599936325023])
    .scale(2300)
    .rotate(130)
    .translate([width/2-75, height/2+200 ]);
var matching = { Co : "#0058A2",  Li :"#FCB731",  La : "#FF8080", SN: "#CA472B"};
var matchingDark = { Co : "#002b50", Li :"#936202", La : "#be0000", SN: "#642315"};
var legendText = ["Extreme Right", "Right" , "Center",  "Left", "Extreme Left"];
var legendColor = ["#273568 ", "#0058A2" , "#FCB731",  "#FF8080", "#CA472B"];

path.projection(projection);

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

const svg = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);
const deps = svg.append("g");
   var format = d3.format(".2f")
function draw(){    
    d3.json('ukreg.json').then(function(geojson) {
        deps.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr('class', function(d){return d.properties.Region.replace(/\s/g,'');})
            .attr("d", function(d){ return path.projection(projection)(d); })
            .style("fill", function(d){
                switch(sliderStep.value()) {    
                case 2017:
                  return matching[d.properties["Party2017"][0]+d.properties["Party2017"][1]]; 
                  break;
                case 2015:
                  return matching[d.properties["Party2015"][0]+d.properties["Party2015"][1]]; 
                  break;
                  
                case 2010:
                  return matching[d.properties["Party2010"][0]+d.properties["Party2010"][1]]; 
                  break;
                  
                case 2005:
                   return matching[d.properties["Party2005"][0]+d.properties["Party2005"][1]]; 
                  break;
                  
                case 2001:
                  return matching[d.properties["Party2001"][0]+d.properties["Party2001"][1]]; 
                  break;
                  
                default:
                  return matching[d.properties["Parti2017"][0]+d.properties["Party2017"][1]];
                  break;
                }
            })
            .on("mouseover", function(d) {
                st = "." + d.properties.Region.replace(/\s/g,'');

                deps.select(st).style("fill", function(d){
                switch(sliderStep.value()) {    
                case 2017:
                  return matchingDark[d.properties["Party2017"][0]+d.properties["Party2017"][1]]; 
                  break;
                  
                case 2015:
                  return matchingDark[d.properties["Party2015"][0]+d.properties["Party2015"][1]]; 
                  break;
                  
                case 2010:
                  return matchingDark[d.properties["Party2010"][0]+d.properties["Party2010"][1]]; 
                  break;
                  
                case 2005:
                  return matchingDark[d.properties["Party2005"][0]+d.properties["Party2005"][1]]; 
                  break;

                case 2005:
                  return matchingDark[d.properties["Party2001"][0]+d.properties["Party2001"][1]]; 
                  break;
                  
                default:
                 return matchingDark[d.properties["Party2017"][0]+d.properties["Party2017"][1]]; 
                 break;

                }
            })
                    firstScore = ""
                     secondScore = ""
                     surnameFirst = ""
                     surnameSecond = ""

                  switch(sliderStep.value()) {    
                case 2017:
                    firstScore = "FirstScore2017"
                  secondScore = "SecondScore2017"
                  surnameFirst = "Party2017"
                  surnameSecond = "Party22017"
                  break;
                  
                case 2015:
                   firstScore = "FirstScore2015"
                  secondScore = "SecondScore2015"
                  surnameFirst = "Party2015"
                  surnameSecond = "Party22015"
                  break;
                  
                case 2010:
                  firstScore = "FirstScore2010"
                  secondScore = "SecondScore2010"
                  surnameFirst = "Party2010"
                  surnameSecond = "Party22010"
                  break;
                  
                case 2005:
                  firstScore = "FirstScore2005"
                  secondScore = "SecondScore2005"
                  surnameFirst = "Party2005"
                  surnameSecond = "Party22005"
                  break;
                case 2001:
                  firstScore = "FirstScore2001"
                  secondScore = "SecondScore2001"
                  surnameFirst = "Party2001"
                  surnameSecond = "Party22001"
                  break;
                  
                  
                default:
                  firstScore = "FirstScore2017"
                  secondScore = "SecondScore2017"
                  surnameFirst = "Party2017"
                  surnameSecond = "Party22017"
                  break;
                }
                div.transition()        
                    .duration(200)
                    .style("opacity", .9);      
                div.html('<h3> '+ d.properties.Region  + "</h3>"+ 
                    "<ul><li id = 'firstCandidate'>"+  d.properties[surnameFirst] + " : " + format(d.properties[firstScore])+"% </li>"
                    + "<li id = 'secondCandidate'> "+ d.properties[surnameSecond] + " : " + format(d.properties[secondScore])+"% </li></ul>")  
                    .style("left", (d3.event.pageX + 30) + "px")     
                    .style("top", (d3.event.pageY - 30) + "px")

                div.select("#firstCandidate")
                .style("border-left",function(){
                    temp =d.properties[surnameFirst]
                    color = matching[temp[0]+temp[1]]
                    return "solid " + color;    
                })
                .style("text-transform", "uppercase")

                div.select("#secondCandidate")
                .style("border-left",function(){
                    temp =d.properties[surnameSecond]
                    color = matching[temp[0]+temp[1]]
                    return "solid " + color;
                })
                .style("text-transform", "uppercase")
            })

            .on("mouseout", function(d) {
                st = "." + d.properties.Region.replace(/\s/g,'');
                deps.select(st)    
                .style("fill", function(d){
                 switch(sliderStep.value()) {    
                case 2017:
                  return matching[d.properties["Party2017"][0]+d.properties["Party2017"][1]]; 
                  break;
                  
                case 2012:
                  return matching[d.properties["Party2015"][0]+d.properties["Party2015"][1]]; 
                  break;
                  
                case 2007:
                  return matching[d.properties["Party2007"][0]+d.properties["Party2007"][1]]; 
                  break;
                  
                case 2002:
                  return matching[d.properties["Party2002"][0]+d.properties["Party2002"][1]]; 
                  break;
                  
                default:
                 return matching[d.properties["Party2017"][0]+d.properties["Party2017"][1]]; 
                 break;

                }
            })
               
                div.style("opacity", 0);
                div.html("")
                    .style("left", "-500px")
                    .style("top", "-500px");
            });
               
    });
}


data = [2001,2005,2010,2015,2017]
  var sliderStep = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .default(2017)
    .tickFormat(d3.format('d'))
    .displayValue(false)
    .on("onchange", function(val) {
        deps.select('#value').text(val)
        deps.selectAll("path").remove();
        draw()  
});
    
  sliderStep.tickValues(data).marks(data)

  var gStep = d3
    .select('div#slider-step')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gStep.call(sliderStep);

function appendTitle(){
    deps.append("text")
        .attr("x", 20)
        .attr("y", 25)
        .attr("text-anchor", "left")
        .style("fill", "dark")
        .text("Results 1st round of UK election per region 2001 - 2017");

    deps.append("text")
        .attr("x", (3*width / 4))
        .attr("y", height-20)
        .attr("text-anchor", "middle")
        .style("fill", "#929292")
        .style("font-weight", "200")
        .style("font-size", "12px")
        .text("(source : UK Government)");
}




var size = 15   
deps.selectAll("dots")
  .data(legendColor)
  .enter()
  .append("rect")
    .attr("x", width / 2+ 80)
    .attr("y", function(d,i){ return height/2 - 30 + i*(size+5)}) 
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return d})

    deps.selectAll("labels")
  .data(legendText)
  .enter()
  .append("text")
    .attr("x", width / 2+ 80  + size*1.2)
    .attr("y", function(d,i){ return height/2 - 30 + i*(size+5) + (size/2)}) 
    .style("fill", function(d,i){ return legendColor[i]})
    .text(function(d){return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .attr("font-size",12 )
    .attr("font", "Helvetica");


appendTitle()
draw()



