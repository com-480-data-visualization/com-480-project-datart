const width = 650, height = 525;
const path = d3.geoPath();


const projection = d3.geoConicConformal()
    .center([2.454071, 46.279229])
    .scale(2600)
    .translate([width/2 + 10, height / 2+10]);


const projectionMartinique = d3.geoEquirectangular()
    .center([-61.01737976074219, 14.669954434092496])
    .scale(11000)
    .translate([50, 120]);

const projectionGuyane = d3.geoEquirectangular()
    .center([-53.2177734375, 3.951940856157594])
    .scale(1200)
    .translate([50, 230]);

const projectionGuadeloupe = d3.geoEquirectangular()
    .center([-61.435546875, 16.10651448462386])
    .scale(5000)
    .translate([50, 340]);

const projectionReunion = d3.geoEquirectangular()
    .center([55.513916015625, -21.115249309963772])
    .scale(5000)
    .translate([40, 410]);

const projectionMayotte = d3.geoEquirectangular()
    .center([45.051579894616,-12.701683919701])
    .scale(9000)
    .translate([40, 470]);

var matching = {FN : "#273568", LR : "#0058A2", UMP : "#0058A2", LREM :"#FCB731", Modem : "#FCB731", PS : "#FF8080", LFI: "#CA472B"};
var matchingDark = {FN : "#131a33", LR : "#002b50", UMP : "#002b50", LREM :"#936202", Modem : "#936202", PS : "#be0000", LFI: "#642315"};
var legendText = ["Extreme Right", "Right" , "Center",  "Left", "Extreme Left"];
var legendColor = ["#273568 ", "#0058A2" , "#FCB731",  "#FF8080", "#CA472B"];
var matchingCandidates = {FI: "LR", MÉ : "LFI", LE:"FN", CH: "UMP", JO :"PS", RO: "PS", HO : "PS", SA : "LR", MA : "LREM"}

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);


path.projection(projection);


const svg = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);

const deps = svg.append("g");


function draw(){
    d3.json('reg.json').then(function(geojson) {
        deps.selectAll("path")
            .data(geojson.features)
            .enter()    
            .append("path")
            .attr('class', function(d){return d.properties.nom[0] + d.properties.nom[1]  + d.properties.nom[2];})
            .style("fill", function(d){
                switch(sliderStep.value()) {    
                case 2017:
                  return matching[d.properties["Parti"]]; 
                  break;
                  
                case 2012:
                  return matching[d.properties["Parti0"]]; 
                  break;
                  
                case 2007:
                   return matching[d.properties["Parti1"]]; 
                  break;
                  
                case 2002:
                  return matching[d.properties["Parti2"]]; 
                  break;
                  
                default:
                  return matching[d.properties["Parti"]];
                  break;
                }
            })
               
            .attr("d", function(d){
                switch(d.properties.nom) {    
                case "Martinique":
                  return path.projection(projectionMartinique)(d);  
                  break;
                  
                case "Guyane":
                  return path.projection(projectionGuyane)(d);  
                  break;
                  
                case "Guadeloupe":
                  return path.projection(projectionGuadeloupe)(d);
                  break;
                  
                case "La Réunion":
                  return path.projection(projectionReunion)(d);
                  break;
                  
                case "Mayotte":
                  return path.projection(projectionMayotte)(d);
                  break;

                default:
                  return path.projection(projection)(d);
                  break;
                }
            })
           

            .on("mouseover", function(d) {
                st = "." + d.properties.nom[0] + d.properties.nom[1]  + d.properties.nom[2]
               
                deps.select(st).style("fill", function(d){
                switch(sliderStep.value()) {    
                case 2017:
                  return matchingDark[d.properties["Parti"]]; 
                  break;
                  
                case 2012:
                  return matchingDark[d.properties["Parti0"]]; 
                  break;
                  
                case 2007:
                   return matchingDark[d.properties["Parti1"]]; 
                  break;
                  
                case 2002:
                  return matchingDark[d.properties["Parti2"]]; 
                  break;
                  
                default:
                  return matchingDark[d.properties["Parti"]];
                  break;
                }
            })

                div.transition()        
                    .duration(200)
                    .style("opacity", 1);
                     firstScore = ""
                     secondScore = ""
                     surnameFirst = ""
                     surnameSecond = ""

                  switch(sliderStep.value()) {    
                case 2017:
                  firstScore = "FirstScore"
                  secondScore = "SecondScore"
                  surnameFirst = "Surname"
                  surnameSecond = "Surname27"
                  break;
                  
                case 2012:
                  firstScore = "FirstScore0"
                  secondScore = "Second Score0"
                  surnameFirst = "Surname0"
                  surnameSecond = "Surname20"
                  break;
                  
                case 2007:
                  firstScore = "FirstScore1"
                  secondScore = "Second Score1"
                  surnameFirst = "Surname1"
                  surnameSecond = "Surname21"
                  break;
                  
                case 2002:
                  firstScore = "FirstScore2"
                  secondScore = "Second Score2"
                  surnameFirst = "Surname2"
                  surnameSecond = "Surname22"
                  break;
                  
                default:
                  firstScore = "FirstScore"
                  secondScore = "SecondScore"
                  surnameFirst = "Surname"
                  surnameSecond = "Surname27"
                  break;
                }
                var format = d3.format(".2f")

              
               div.html( '<h3> '+ d.properties.nom+ "</h3>"+ 
                "<ul><li id = 'firstCandidate'>"+  d.properties[surnameFirst] + " : " + format(d.properties[firstScore])+"% </li>"
                + "<li id = 'secondCandidate'> "+ d.properties[surnameSecond] + " : " + format(d.properties[secondScore])+"% </li></ul>")  
                    .style("left", (d3.event.pageX + 30) + "px")     
                    .style("top", (d3.event.pageY - 30) + "px")

                div.select("#firstCandidate").style("border-left",function(){
                    temp =d.properties[surnameFirst][0] + d.properties[surnameFirst][1]
                    color = matching[matchingCandidates[temp]]
                    return "solid " + color;
                })

                 div.select("#secondCandidate").style("border-left",function(){
                    temp =d.properties[surnameSecond][0] + d.properties[surnameSecond][1]
                    color = matching[matchingCandidates[temp]]
                    return "solid " + color;
                })

            }) 
            .on("mouseout", function(d) {
                st = "." + d.properties.nom[0] + d.properties.nom[1]  + d.properties.nom[2]
                deps.select(st)    
                .style("fill", function(d){
                switch(sliderStep.value()) {    
                case 2017:
                  return matching[d.properties["Parti"]]; 
                  break;
                  
                case 2012:
                  return matching[d.properties["Parti0"]]; 
                  break;
                  
                case 2007:
                   return matching[d.properties["Parti1"]]; 
                  break;
                  
                case 2002:
                  return matching[d.properties["Parti2"]]; 
                  break;
                  
                default:
                  return matching[d.properties["Parti"]];
                  break;
                }
            })
               

                div.style("opacity", 0)
             
                .style("left", "-500px")
                .style("top", "-500px");
            });
    });


}



data = [2002,2007,2012,2017]
  var sliderStep = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickValues(data)
    .tickFormat(d3.format('d'))
    .ticks(5)
    .step(5)
    .default(2017)
    .on("onchange", function() {
        deps.selectAll("path").remove();
        draw()  
});
    

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
        .text("Results 1st round of French election per region 2002 - 2017");

    deps.append("text")
        .attr("x", (3*width / 4))
        .attr("y", height-20)
        .attr("text-anchor", "middle")
        .style("fill", "#929292")
        .style("font-weight", "200")
        .style("font-size", "12px")
        .text("(source : INSEE - Ministère de l'Intérieur Français)");
}


var size = 15   
deps.selectAll("dots")
  .data(legendColor)
  .enter()
  .append("rect")
    .attr("x", 3*width / 4+ 40)
    .attr("y", function(d,i){ return height/2 - 30 + i*(size+5)}) 
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return d})

    deps.selectAll("labels")
  .data(legendText)
  .enter()
  .append("text")
    .attr("x", 3*width / 4+ 40  + size*1.2)
    .attr("y", function(d,i){ return height/2 - 30 + i*(size+5) + (size/2)}) 
    .style("fill", function(d,i){ return legendColor[i]})
    .text(function(d){return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .attr("font-size",12 )
    .attr("font", "Helvetica");

appendTitle()
draw()
