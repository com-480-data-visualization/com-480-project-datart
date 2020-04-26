const width = 710, height = 490;
const path = d3.geoPath();

// Projections for the different part of the French territory
const projection = d3.geoConicConformal()
.center([2.454071, 46.279229])
.scale(2600)
.translate([width/2 + 10, height / 2+10]);


const projectionMartinique = d3.geoEquirectangular()
.center([-61.01737976074219, 14.669954434092496])
.scale(11000)
.translate([50, 80]);

const projectionGuyane = d3.geoEquirectangular()
.center([-53.2177734375, 3.951940856157594])
.scale(1200)
.translate([50, 190]);

const projectionGuadeloupe = d3.geoEquirectangular()
.center([-61.435546875, 16.10651448462386])
.scale(5000)
.translate([50, 290]);

const projectionReunion = d3.geoEquirectangular()
.center([55.513916015625, -21.115249309963772])
.scale(5000)
.translate([40, 360]);

const projectionMayotte = d3.geoEquirectangular()
.center([45.051579894616,-12.701683919701])
.scale(9000)
.translate([40, 420]);


var degrade = {50:"#41B6C4",60:"#1D91C0",70:"#225EA8",80:"#0C2C84",90:"#091f5d"};//100,75,50,25,0
var degradeDark= {50:"#1e5c63",60:"#0e4860 ",70:"#102e54",80:"#051542",90:"#040f2e"};


var matching = {FN : "#273568", LR : "#0058A2", UMP : "#0058A2", LREM :"#FCB731", Modem : "#FCB731", PS : "#FF8080", LFI: "#CA472B"};
var matchingDark = {FN : "#131a33", LR : "#002b50", UMP : "#002b50", LREM :"#936202", Modem : "#936202", PS : "#be0000", LFI: "#642315"};
var legendText = ["Extreme Right", "Right" , "Center",  "Left", "Extreme Left"];
var legendColor = ["#273568 ", "#0058A2" , "#FCB731",  "#FF8080", "#CA472B"];
var legendNuancedColor = ["#41B6C4","#1D91C0","#225EA8","#0C2C84","#091f5d"];
var legendNuancedAxis = ["50%","60%","70%","80%","90%"]
var matchingCandidates = {FI: "LR", MÉ : "LFI", LE:"FN", CH: "UMP", JO :"PS", RO: "PS", HO : "PS", SA : "LR", MA : "LREM"}

//Format of the double digits
var format = d3.format(".2f")

//Div of the tooltips
var div = d3.select("body").append("div")   
.attr("class", "tooltip")               
.style("opacity", 0);

//Creation of the projection
path.projection(projection);

// Add of the general SVG
const svg = d3.select('#map').append("svg")
.attr("id", "svg")
.attr("width", width)
.attr("height", height);

const deps = svg.append("g");

//Main function drawing the card
function draw(round = 1){
    d3.json('reg.json').then(function(geojson) {//Load the GeoJSON
      deps.selectAll("path")
      .data(geojson.features)
      .enter()    
      .append("path")
            .attr('class', function(d){return d.properties.nom[0] + d.properties.nom[1]  + d.properties.nom[2];})//Assign na class name to each region. 3 first letters taken to avoid spaces
            .style("fill", function(d){//Fill the region by the color of the party depending of the year
             if(round == 1){
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
            }if(round == 3){
                switch(sliderStep.value()) {    
                case 2017:
                x = format(d.properties.second["FirstScore"])
                return degrade[Math.round(x / 10,0) * 10]; 
                break;

                case 2012:
                x = format(d.properties.second["FirstScore0"])
                return degrade[Math.round(x / 10,0) * 10];
                break;

                case 2007:
                x = format(d.properties.second["FirstScore1"])
                return degrade[Math.round(x / 10,0) * 10];
                break;

                case 2002:
                 x = format(d.properties.second["FirstScore2"])
                return degrade[Math.round(x / 10,0) * 10];
                break;

                default:
                x = format(d.properties.second["FirstScore"])
                return degrade[Math.round(x / 10,0) * 10]; 
                break;
              }
            }else{
              switch(sliderStep.value()) {    
                case 2017:
                return matching[d.properties.second["Parti"]]; 
                break;

                case 2012:
                return matching[d.properties.second["Parti0"]]; 
                break;

                case 2007:
                return matching[d.properties.second["Parti1"]]; 
                break;

                case 2002:
                return matching[d.properties.second["Parti2"]]; 
                break;

                default:
                return matching[d.properties.second["Parti"]];
                break;
              }
            }
          })


            .attr("d", function(d){//Load the different paths
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
                st = "." + d.properties.nom[0] + d.properties.nom[1]  + d.properties.nom[2] //Select the region
                deps.select(st).style("fill", function(d){//Darken the region selected 
                  if(round == 1){
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
                  }if(round == 3){
                     switch(sliderStep.value()) {    
                case 2017:
                x = format(d.properties.second["FirstScore"])
                return degradeDark[Math.round(x / 10,0) * 10]; 
                break;

                case 2012:
                x = format(d.properties.second["FirstScore0"])
                return degradeDark[Math.round(x / 10,0) * 10];
                break;

                case 2007:
                x = format(d.properties.second["FirstScore1"])
                return degradeDark[Math.round(x / 10,0) * 10];
                break;

                case 2002:
                x = format(d.properties.second["FirstScore2"])
                console.log(d.properties.nom,x,Math.round(x / 10,0) * 10)
                return degradeDark[Math.round(x / 10,0) * 10];
                break;

                default:
                x = format(d.properties.second["FirstScore"])
                return degradeDark[Math.round(x / 10,0) * 10]; 
                break;
              }
                  }else{
                   switch(sliderStep.value()) {    
                    case 2017:
                    return matchingDark[d.properties.second["Parti"]]; 
                    break;

                    case 2012:
                    return matchingDark[d.properties.second["Parti0"]]; 
                    break;

                    case 2007:
                    return matchingDark[d.properties.second["Parti1"]]; 
                    break;

                    case 2002:
                    return matchingDark[d.properties.second["Parti2"]]; 
                    break;

                    default:
                    return matchingDark[d.properties.seonc["Parti"]];
                    break;
                  }
                }
              })


                div.transition()  //Make the tooltip appear      
                .duration(200)
                .style("opacity", 1);

                firstScore = ""
                secondScore = ""
                surnameFirst = ""
                surnameSecond = ""

                switch(sliderStep.value()) {//Define where to select in the JSON according to the year 
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

                if(round == 1){
              //Content of the tooltip
              div.html( "<h3 id = 'region'> "+ d.properties.nom+ "</h3>"+ 
                "<ul><li id = 'firstCandidate'>"+  d.properties[surnameFirst] + ": " + format(d.properties[firstScore])+"% </li>"
                + "<li id = 'secondCandidate'> "+ d.properties[surnameSecond] + ": " + format(d.properties[secondScore])+"% </li></ul>")  
                  .style("left", (d3.event.pageX + 30) + "px")  //Placement of the tooltip compared to the mouse   
                  .style("top", (d3.event.pageY - 30) + "px")

                //Lines next to candidates names
                div.select("#firstCandidate").style("border-left",function(){
                  temp =d.properties[surnameFirst][0] + d.properties[surnameFirst][1]
                  color = matching[matchingCandidates[temp]]
                  return "solid " + color;
                })

                //Lines next to candidates names
                div.select("#secondCandidate").style("border-left",function(){
                  temp =d.properties[surnameSecond][0] + d.properties[surnameSecond][1]
                  color = matching[matchingCandidates[temp]]
                  return "solid " + color;
                })
              }else{
               div.html( "<h3 id = 'region'> "+ d.properties.nom+ "</h3>"+ 
                "<ul><li id = 'firstCandidate'>"+  d.properties.second[surnameFirst] + ": " + format(d.properties.second[firstScore])+"% </li>"
                + "<li id = 'secondCandidate'> "+ d.properties.second[surnameSecond] + ": " + format(d.properties.second[secondScore])+"% </li></ul>")  
                  .style("left", (d3.event.pageX + 30) + "px")  //Placement of the tooltip compared to the mouse   
                  .style("top", (d3.event.pageY - 30) + "px")

                //Lines next to candidates names
                div.select("#firstCandidate").style("border-left",function(){
                  temp =d.properties.second[surnameFirst][0] + d.properties.second[surnameFirst][1]
                  color = matching[matchingCandidates[temp]]
                  return "solid " + color;
                })

                //Lines next to candidates names
                div.select("#secondCandidate").style("border-left",function(){
                  temp =d.properties.second[surnameSecond][0] + d.properties.second[surnameSecond][1]
                  color = matching[matchingCandidates[temp]]
                  return "solid " + color;
                }

                )}
              })

              .on("mouseout", function(d) {
                st = "." + d.properties.nom[0] + d.properties.nom[1]  + d.properties.nom[2]
                deps.select(st)    
                    .style("fill", function(d){//Fill the previous selected region back to its original colour

                      if(round == 1){
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


                      }if(round == 3){
                         switch(sliderStep.value()) {    
                case 2017:
                x = format(d.properties.second["FirstScore"])
                return degrade[Math.round(x / 10,0) * 10]; 
                break;

                case 2012:
                x = format(d.properties.second["FirstScore0"])
                return degrade[Math.round(x / 10,0) * 10];
                break;

                case 2007:
                x = format(d.properties.second["FirstScore1"])
                return degrade[Math.round(x / 10,0) * 10];
                break;

                case 2002:
                 x = format(d.properties.second["FirstScore2"])
                return degrade[Math.round(x / 10,0) * 10];
                break;

                default:
                x = format(d.properties.second["FirstScore"])
                return degrade[Math.round(x / 10,0) * 10]; 
                break;
              }
                    
                      }else{
                        switch(sliderStep.value()) {    
                          case 2017:
                          return matching[d.properties.second["Parti"]]; 
                          break;

                          case 2012:
                          return matching[d.properties.second["Parti0"]]; 
                          break;

                          case 2007:
                          return matching[d.properties.second["Parti1"]]; 
                          break;

                          case 2002:
                          return matching[d.properties.second["Parti2"]]; 
                          break;

                          default:
                          return matching[d.properties.second["Parti"]];
                          break;
                        }
                      }
                    })
                div.style("opacity", 0)//Tooltip diseapear
                .style("left", "-500px")
                .style("top", "-500px");
              })


})
}



data = [2002,2007,2012,2017]//Data of the sliders
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
        deps.selectAll("path").remove();//Redraw on slider move
        draw(checkState())  
        deps.selectAll("#textLegend").remove()
        deps.selectAll("#rectLegend").remove()
        appendLegend()
      });


var gStep = d3
.select('div#slider-step')
.append('svg')
.attr('width', 1000)
.attr('height', 75)
.append('g')
    .attr('transform', 'translate(25 ,30)');//Create and position slider

    gStep.call(sliderStep);


function appendTitle(){//Create title and subtitle of the graphic
  
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

//Create legend
function appendLegend(){
    var size = 15  
  if(checkState() == 3){
   deps.selectAll("dots")
  .data(legendNuancedColor)
  .enter()
  .append("rect")
  .attr("id","rectLegend")
  .attr("x", 3*width / 4+ 40)
  .attr("y", function(d,i){ return height/2 - 30 + i*(size+5)}) 
  .attr("width", size)
  .attr("height", size)
  .style("fill", function(d){return d})

 deps.selectAll("labels")
  .data(legendNuancedAxis)
  .enter()
  .append("text")
  .attr("id","textLegend")
  .attr("x", 3*width / 4+ 40  + size*1.2)
  .attr("y", function(d,i){ return height/2 - 30 + i*(size+5) + (size/2)}) 
  .style("fill", function(d,i){ return legendNuancedColor[i]})
  .text(function(d){return d})
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")
  .attr("font-size",12 )
  .attr("font", "Helvetica");

 deps.append("text")
 .attr("id","textLegend")
  .attr("x", 3*width / 4+ 40)
  .attr("y", height/2 - 55 )
  .attr("text-anchor", "left")
  .style("fill", "#929292")
  .style("font-weight", "200")  
  .style("font-size", "12px") 
  .text("Pourcentage of votes to:"); 
deps.append("text")
.attr("id","textLegend")
  .attr("x", 3*width / 4+ 40)
  .attr("y", height/2 - 40 )
  .attr("text-anchor", "left")
  .style("fill", "dark")
  .style("font-weight", "bold")  
  .style("font-size", "12px") 
  .text(function(){
    switch(sliderStep.value()){

    case 2017:
    return "Emmanuel Macron";
    break;

    case 2012:
    return "Francois Hollande";
    break;

    case 2007:
    return "Nicolas Sarkozy";
    break;

    case 2002:
    return "Jacques Chirac";
    break;
    default:
    return "Emmanuel Macron";
    break;
  }
  });  



  }else{
    
  deps.selectAll("dots")
  .data(legendColor)
  .enter()
  .append("rect")
  .attr("id","rectLegend")
  .attr("x", 3*width / 4+ 40)
  .attr("y", function(d,i){ return height/2 - 30 + i*(size+5)}) 
  .attr("width", size)
  .attr("height", size)
  .style("fill", function(d){return d})

  deps.selectAll("labels")
  .data(legendText)
  .enter()
  .append("text")
  .attr("id","textLegend")
  .attr("x", 3*width / 4+ 40  + size*1.2)
  .attr("y", function(d,i){ return height/2 - 30 + i*(size+5) + (size/2)}) 
  .style("fill", function(d,i){ return legendColor[i]})
  .text(function(d){return d})
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")
  .attr("font-size",12 )
  .attr("font", "Helvetica");
  }
 
}
appendLegend()
//appendTitle()
draw()



$('input#option1').on("change",function(d){
  deps.selectAll("path").remove();//Redraw on slider move
   deps.selectAll("#textLegend").remove()
  deps.selectAll("#rectLegend").remove()
  appendLegend()
  draw(1)  
  
});

$('input#option2').on("change",function(d){
  deps.selectAll("path").remove();//Redraw on slider move
   deps.selectAll("#textLegend").remove()
        deps.selectAll("#rectLegend").remove()
        appendLegend()
  draw(2)  
});

$('input#option3').on("change",function(d){
  deps.selectAll("path").remove();//Redraw on slider move
   deps.selectAll("#textLegend").remove()
        deps.selectAll("#rectLegend").remove()
        appendLegend()
  draw(3)  
});


function checkState(){
   checkbox1 = $('input#option1')
   checkbox2 = $('input#option2')
   if (checkbox1.is(':checked'))  {
    return 1;   
   }
   if(checkbox2.is(':checked')){
    return 2;
   }else {
     return 3;
   }
}

