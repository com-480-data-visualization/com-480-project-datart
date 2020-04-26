const width = 850, height = 650;
revenue = [-0.0006017,0.0007958,0.0004412,0.00001389,-0.0006276,0.0003567,-0.0003784,-0.00003548]
migrantsRate = [-0.1951640,-0.1006791,0.0744296,0.05650,0.3091435,-0.0630517,-0.08118,-0.01711]
tauxChomage = [0.0292984,-0.2515104,-0.4201149 ,-0.06561,-0.1598621,-0.2385,-0.002633,1.1062898]
var textMenu = ["Revenue", "Migrant Rate", "Unemployment rate"]
var matching = {ExtRight : "#273568", Right : "#0058A2", Center : "#FCB731", Left : "#FF8080", ExtLeft: "#CA472B", Ind: "#808080"};
//Div of the tooltips
var div = d3.select("body").append("div")   
.attr("class", "tooltip")               
.style("opacity", 0);

var div2 = d3.select("body").append("div")   
.attr("class", "tooltip2")               
.style("opacity", 0);

function absMax(array){
	return Math.max(...array.map(a => Math.abs(a)))
}

function filterOutliers(someArray) {  

    // Copy the values, rather than operating on references to existing values
    var values = someArray.concat();

    // Then sort
    values.sort( function(a, b) {
    	return a - b;
    });

    /* Then find a generous IQR. This is generous because if (values.length / 4) 
     * is not an int, then really you should average the two elements on either 
     * side to find q1.
     */     
     var q1 = values[Math.floor((values.length / 4))];
    // Likewise for q3. 
    var q3 = values[Math.ceil((values.length * (3 / 4)))];
    var iqr = q3 - q1;

    // Then find min and max values
    var maxValue = q3 + iqr*1.5;
    var minValue = q1 - iqr*1.5;

    // Then filter anything beyond or beneath these values.
    var filteredValues = values.filter(function(x) {
    	return (x <= maxValue) && (x >= minValue);
    });

    // Then return

    return filteredValues;
}

var svg = d3.select("#dim")
.append("svg")
.attr("width", width)
.attr("height", height);
var scaleX = d3.scaleLinear()
.domain([-absMax(filterOutliers(revenue)), absMax(filterOutliers(revenue))])
.range([0, width - 200]);

var scaleY = d3.scaleLinear()
.domain([-absMax(filterOutliers(tauxChomage)), absMax(filterOutliers(tauxChomage))])
.range([height-100, 0]);
   // Add scales to axis
   var x_axis = d3.axisBottom()
   .scale(scaleX)
             .tickValues([]);
             var y_axis = d3.axisLeft()
                   .scale(scaleY).tickValues([]);

    //Append group and insert axis
    svg.append("g")
    .attr("id","xaxis")
    .attr("transform","translate(20,"+((height-100)/2+50)+")")
    .call(x_axis);
    svg.append("g")
    .attr("id","yaxis")
    .attr("transform", "translate( "+(width - 200)/2+",50)")
    .call(y_axis);

    d3.json("data.json").then(function(d){

    	circle1 = svg.selectAll("boule")
    	.data(d.Feuil1)
    	.enter()
    	.append("circle")
    	.attr("cx", function (d) {
    		return scaleX(d.Revenue)+27; 
    	} )
    	.attr("cy", function (d) { 
    		difference = tauxChomage.filter(x => !filterOutliers(tauxChomage).includes(x));
    		if(difference == d.TauxChomage){
    			t = (absMax(filterOutliers(tauxChomage)) - 10/100*absMax(filterOutliers(tauxChomage)))
    			return scaleY(t)+27
    		}
    		return scaleY(d.TauxChomage)+27; 
    	} )
    	.style("fill", function(d) { return matching[d.Parti]; })
    	.attr("r","29")
    	.style("display",function(d){if(d.CoefRT == 0){return "none"}})






    	circle2 = svg.selectAll("boule2")
    	.data(d.Feuil1)
    	.enter()
    	.append("circle")
    	.attr("cx", function (d) {
    		difference = revenue.filter(x => !filterOutliers(revenue).includes(x));
    		if(difference == d.revenue){
    			t = (absMax(filterOutliers(revenue)) - 10/100*absMax(filterOutliers(revenue)))
    			return scaleX(t)+27
    		}
    		return scaleX(d.Revenue)+27; 
    	} )
    	.attr("cy", function (d) { 
    		difference = tauxChomage.filter(x => !filterOutliers(tauxChomage).includes(x));
    		if(difference == d.TauxChomage){
    			t = (absMax(filterOutliers(tauxChomage)) - 10/100*absMax(filterOutliers(tauxChomage)))
    			return scaleY(t)+27
    		}
    		return scaleY(d.TauxChomage)+27; 
    	} )
    	.style("fill", "none")
    	.attr("r","33")
    	.attr("stroke",function(d){return matching[d.Parti]})
    	.attr("stroke-width","2") 
    	.style("display",function(d){if(d.CoefRT != 2){return "none"}})





    	candidatesCircle = 	svg
    	.selectAll("dot")
    	.data(d.Feuil1)
    	.enter()
    	.append('g')
    	.append('image')
    	.attr("xlink:href",function(d){return d.Parti+".png"})
    	.attr("height",54)
    	.attr("width",54)
    	.attr("id",function(d){return "circle"+d.Parti;})
    	.attr("x", function (d) {
    		return scaleX(d.Revenue); 
    	} )
    	.attr("y", function (d) { 
    		difference = tauxChomage.filter(x => !filterOutliers(tauxChomage).includes(x));
    		if(difference == d.TauxChomage){
    			t = (absMax(filterOutliers(tauxChomage)) - 10/100*absMax(filterOutliers(tauxChomage)))
    			return scaleY(t)
    		}
    		return scaleY(d.TauxChomage); 
    	} )
    	.on("mouseover", function(d) {	   
    	 	  if(d.Parti == "Ind"){
    	 	  	 	 	  div.transition()  //Make the tooltip appear      
    	 	  .duration(200)
    	 	  .style("opacity", 1);
  			div.html( "<h3 style='color: "+matching[d.Parti]+"'>"+ d.PartiName+"</h3>"+"</h4><h4>Candidates:<span> "+d.Candidat+"</span></h4>"
    	 	  	+"<h4>Election score (2017): <span>"+d.Score+"%</span></h4>"+"<h4>Partisan departments: <span>"+d.Department+"</span></h4>")  
                  .style("left", (d3.event.pageX + 30) + "px")  //Placement of the tooltip compared to the mouse   
                  .style("top", (d3.event.pageY - 30) + "px")
    	 	  }else if(d.Parti == "Abstention" || d.Parti == "White"){
    	 	  	div2.transition()  //Make the tooltip appear      
    	 	  .duration(200)
    	 	  .style("opacity", 1);
  			div2.html( "<h3 style='color: "+matching[d.Parti]+"'>"+ d.PartiName+"</h3>"+"<h4 style='text-align: left;'>"
    	 	  	+"<h4>Election score (2017): <span>"+d.Score+"%</span></h4>"+"<h4>Partisan departments: <span>"+d.Department+"</span></h4>")  
                  .style("left", (d3.event.pageX + 30) + "px")  //Placement of the tooltip compared to the mouse   
                  .style("top", (d3.event.pageY - 30) + "px")
    	 	  }else{
    	 	  	 	 	  div.transition()  //Make the tooltip appear      
    	 	  .duration(200)
    	 	  .style("opacity", 1);
    	 	  div.html( "<h3 style='color: "+matching[d.Parti]+"'>"+ d.Candidat+"</h3>"+"<h4 style='text-align: left;'>"+d.PartiName+"</h4><h4>Position:<span> "+d.Side+"</span></h4>"
    	 	  	+"<h4>Election score (2017): <span>"+d.Score+"%</span></h4>"+"<h4>Partisan departments: <span>"+d.Department+"</span></h4>")  
                  .style("left", (d3.event.pageX + 30) + "px")  //Placement of the tooltip compared to the mouse   
                  .style("top", (d3.event.pageY - 30) + "px")
             
    		}
 })
    	.on("mouseout", function(d) {
    	  	  div.style("opacity", 0)//Tooltip diseapear
    	  	  .style("left", "-500px")
    	  	  .style("top", "-500px");

    	  	   div2.style("opacity", 0)//Tooltip diseapear
    	  	  .style("left", "-500px")
    	  	  .style("top", "-500px");

    	  	})


    })


    function appendLegend(){

    	svg.append("text")             
    	.attr("x",width-216)
    	.attr("y",height/5-110)
    	.style("text-anchor", "left")
    	.style("fill", "dark")
    	.style("font-weight","bold")
    	.style("text-decoration","underline")
    	.text("Statistical significance:");


    	svg.append("text")             
    	.attr("x",width-160)
    	.attr("y",height/5-67)
    	.style("text-anchor", "left")
    	.style("fill", "dark")
    	.style("font-weight","bold")

    	.text("Non significant");

    	svg.append("text")             
    	.attr("x",width-160)
    	.attr("y",height/5)
    	.style("text-anchor", "left")
    	.style("fill", "dark")
    	.style("font-weight","bold")
    	.text("Significant");

    	svg.append("text")             
    	.attr("x",width-160)
    	.attr("y",height/5+70)
    	.style("text-anchor", "left")
    	.style("fill", "dark")
    	.style("font-weight","bold")
    	.text("Highly significant");



    	svg.append("image")
    	.attr("xlink:href","Empty.png")
    	.attr("height",40)
    	.attr("width",40)
    	.attr("x",width-217)
    	.attr("y",height/5-69-24)

    	svg.append("image")
    	.attr("xlink:href","Empty.png")
    	.attr("height",40)
    	.attr("width",40)
    	.attr("x",width-217)
    	.attr("y",height/5-27)


    	svg.append("image")
    	.attr("xlink:href","Empty.png")
    	.attr("height",40)
    	.attr("width",40)
    	.attr("x",width-217)
    	.attr("y",height/5+69-27)


    	svg
    	.append("circle")
    	.attr("cx", width-197)
    	.attr("cy", height/5-7)
    	.style("fill", "none")
    	.attr("stroke","#273568")
    	.attr("stroke-width","2") 
    	.attr("r","20")

    	svg
    	.append("circle")
    	.attr("cx", width-197)
    	.attr("cy", height/5+62)
    	.style("fill", "none")
    	.attr("stroke","#273568")
    	.attr("stroke-width","2") 
    	.attr("r","20")

    	
    	svg
    	.append("circle")
    	.attr("cx", width-197)
    	.attr("cy", height/5+62)
    	.style("fill", "none")
    	.attr("stroke","#273568")
    	.attr("stroke-width","2") 
    	.attr("r","26")

    	
    }

    function appendLabels(){

    	svg.append("text") 
    	.attr("id","xlabel")            
    	.attr("x",2.55*width/3-80)
    	.attr("y",height/2+30)
    	.style("text-anchor", "left")
    	.style("fill", "dark")
    	.style("font-weight","bold")
    	.text(function(d){return $('#Xpick')[0].value});

    	svg.append("text")     	
    	.attr("id","ylabel")            
    	.attr("x",width/2-150)
    	.attr("y",35)
    	.style("text-anchor", "left")
    	.style("fill", "dark")
    	.style("font-weight","bold")
    	.text(function(d){return $('#Ypick')[0].value});
    }

    appendLegend()
    appendLabels()

    $('#Xpick').on("change",function(d){
    	svg.selectAll("#xlabel").remove()

    	appendLabels()
    	var xdata;
    	var select;
    	switch(d.target.value){
    		case "Migrants Rate":
    		xdata = migrantsRate;
    		select = "MigrantsRate";
    		break;
    		case "Revenue":
    		xdata = revenue
    		select = "Revenue"
    		break;
    		case "Unemployment Rate":
    		xdata = tauxChomage;
    		select = "TauxChomage";
    		break;

    		default:
    		xdata = revenue;
    		select = "Revenue";
    		break;
    	} 
    var scaleX = d3.scaleLinear()
	.domain([-absMax(filterOutliers(xdata)), absMax(filterOutliers(xdata))])
	.range([0, width - 200]);

	   var x_axis = d3.axisBottom()
   .scale(scaleX)
              .tickValues([]);
 	svg.select("#xaxis").remove()
                svg.append("g")

    .attr("id","xaxis")
    .attr("transform","translate(20,"+((height-100)/2+50)+")")
    .call(x_axis);

    candidatesCircle.transition().duration(1000)
    .attr("x", function (d) {
    		difference = xdata.filter(x => !filterOutliers(xdata).includes(x));
    		if(difference == d[select]){
    			t = (absMax(filterOutliers(xdata)) - 10/100*absMax(filterOutliers(xdata)))
    			return scaleX(t)
    		}
    		return scaleX(d[select]); 

    	} )
    	
    circle1.transition().duration(1000)
    .attr("cx", function (d) {
    		difference = xdata.filter(x => !filterOutliers(xdata).includes(x));
    		if(difference == d[select]){
    			t = (absMax(filterOutliers(xdata)) - 10/100*absMax(filterOutliers(xdata)))
    			return scaleX(t)+27
    		}
    		return scaleX(d[select])+27; 
    	} )

   	circle2.transition().duration(1000)
   	.attr("cx", function (d) {
    		difference = xdata.filter(x => !filterOutliers(xdata).includes(x));
    		if(difference == d[select]){
    			t = (absMax(filterOutliers(xdata)) - 10/100*absMax(filterOutliers(xdata)))
    			return scaleX(t)+27
    		}
    		return scaleX(d[select])+27; 
    	} )


});

///////////////////////////////////////////////////////////////////////:

    $('#Ypick').on("change",function(d){
    	svg.selectAll("#ylabel").remove()
    	appendLabels()

    	var ydata;
    	var select;
    	switch(d.target.value){
    		case "Migrants Rate":
    		ydata = migrantsRate;
    		select = "MigrantsRate";
    		break;
    		case "Revenue":
    		ydata = revenue
    		select = "Revenue"
    		break;
    		case "Unemployment Rate":
    		ydata = tauxChomage;
    		select = "TauxChomage";
    		break;
    		default:
    		ydata = revenue;
    		select = "Revenue";
    		break;
    	} 

    	var scaleY = d3.scaleLinear()
    	.domain([-absMax(filterOutliers(ydata)), absMax(filterOutliers(ydata))])
    	.range([height-100, 0])
		
             var y_axis = d3.axisLeft()
                   .scale(scaleY).tickValues([]);


                   candidatesCircle.transition().duration(1000)

                   .attr("y", function (d) { 
                   	console.log(d)
                   	difference = ydata.filter(x => !filterOutliers(ydata).includes(x));
                   	if(difference == d[select]){
                   		t = (absMax(filterOutliers(ydata)) - 10/100*absMax(filterOutliers(ydata)))
                   		return scaleY(t)
                   	}
                   	return scaleY(d[select]); 
                   } )

                   svg.select("#yaxis").remove()

                   svg.append("g")
                   .attr("id","yaxis")
                   .attr("transform", "translate( "+(width - 200)/2+",50)")
                   .call(y_axis);

                   circle1.transition().duration(1000)
                   .attr("cy", function (d) { 
                   	difference = ydata.filter(x => !filterOutliers(ydata).includes(x));
                   	if(difference == d[select]){
                   		t = (absMax(filterOutliers(ydata)) - 10/100*absMax(filterOutliers(ydata)))
                   		return scaleY(t)+27
                   	}
                   	return scaleY(d[select])+27; 
                   } )

                   circle2.transition().duration(1000)
                   .attr("cy", function (d) { 
                   	difference = ydata.filter(x => !filterOutliers(ydata).includes(x));
                   	if(difference == d[select]){
                   		t = (absMax(filterOutliers(ydata)) - 10/100*absMax(filterOutliers(ydata)))
                   		return scaleY(t)+27
                   	}
                   	return scaleY(d[select])+27; 
                   } )


               });