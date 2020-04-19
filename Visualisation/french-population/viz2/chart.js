const chartDiv = document.getElementById("chart-container");

const margin = {
    top: 10,
    right: 40,
    bottom: 150,
    left: 60
  },
  width = chartDiv.clientWidth * 0.95,
  height = chartDiv.clientHeight * 0.5,
  contextHeight = 50;
contextWidth = width;

const svg = d3.select("#chart-container").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", (height + margin.top + margin.bottom));

d3.csv('viz2.csv', createChart);

function createChart(data) {
  let regions = [];
  let charts = [];
  let maxDataPoint = 0;
  let minDataPoint = 100; // the init value just have to be big enough to be less than the highest revenue

  // Get regions
  for (let prop in data[0]) {
    if (data[0].hasOwnProperty(prop)) {
      if (prop != 'year') {
        regions.push(prop);
      }
    }
  };

  let regionsCount = regions.length;
  let startYear = data[0].year;
  let endYear = data[data.length - 1].year;
  let chartHeight = height * (1 / regionsCount);

  // Get max and min revenue bounds for Y-scale.
  data.map(d => {
    for (let prop in d) {
      if (d.hasOwnProperty(prop) && prop != 'year') {
        d[prop] = parseFloat(d[prop]);

        if (d[prop] > maxDataPoint) {
          maxDataPoint = d[prop];
        }

        if (d[prop] < minDataPoint) {
          minDataPoint = d[prop];
        }
      }
    }

    /* Convert "year" column to Date format to benefit
    from built-in D3 mechanisms for handling dates. */
    d.year = new Date(d.year, 0, 1);
  });

  for (let i = 0; i < regionsCount; i++) {
    charts.push(new Chart({
      data: data.slice(),
      id: i,
      name: regions[i],
      width: width,
      height: height * (1 / regionsCount),
      maxDataPoint: maxDataPoint,
      minDataPoint: minDataPoint,
      svg: svg,
      margin: margin,
      showBottomAxis: (i == regions.length - 1)
    }));

  }

  // Create a context for a brush
  var contextXScale = d3.scaleTime()
    .range([0, contextWidth])
    .domain(charts[0].xScale.domain());

  var contextAxis = d3.axisBottom(contextXScale)
    .tickSize(contextHeight)
    .tickPadding(-10);

  var contextArea = d3.area()
    .x(function(d) {
      return contextXScale(d.date);
    })
    .y0(contextHeight)
    .y1(0)
    .curve(d3.curveLinear);

  var brush = d3.brushX()
    .extent([
      [contextXScale.range()[0], 0],
      [contextXScale.range()[1], contextHeight]
    ])
    .on("brush", onBrush);

  let context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + (margin.left) + "," + (height + margin.top + chartHeight - 10) + ")");

  context.append("g")
    .attr("class", "x axis top")
    .attr("transform", "translate(0,0)")
    .call(contextAxis)

  context.append("g")
    .attr("class", "x brush")
    .call(brush)
    .selectAll("rect")
    .attr("y", 0)
    .attr("height", contextHeight);

  context.append("text")
    .attr("class", "instructions")
    .attr("transform", "translate(0," + (contextHeight + 20) + ")")
    .text('Click and drag above to zoom / pan the data');

  // Brush handler. Get time-range from a brush and pass it to the charts.
  function onBrush() {
    var b = d3.event.selection === null ? contextXScale.domain() : d3.event.selection.map(contextXScale.invert);
    for (var i = 0; i < regionsCount; i++) {
      charts[i].showOnly(b);
    }
  }
}

class Chart {
  constructor(options) {
    this.chartData = options.data;
    this.width = options.width;
    this.height = options.height;
    this.maxDataPoint = options.maxDataPoint;
    this.minDataPoint = options.minDataPoint;
    this.svg = options.svg;
    this.id = options.id;
    this.name = options.name;
    this.margin = options.margin;
    this.showBottomAxis = options.showBottomAxis;

    let localName = this.name;

    // Associate xScale with time
    this.xScale = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.chartData.map(function(d) {
        return d.year;
      })));

    // Bound yScale using minDataPoint and maxDataPoint
    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([this.minDataPoint, this.maxDataPoint]);
    let xS = this.xScale;
    let yS = this.yScale;

    /*
        Create the chart.
        Here we use 'curveLinear' interpolation.
        Play with the other ones: 'curveBasis', 'curveCardinal', 'curveStepBefore'.
        */
    this.area = d3.area()
      .x(function(d) {
        return xS(d.year);
      })
      .y0(this.height)
      .y1(function(d) {
        return yS(d[localName]);
      })
      .curve(d3.curveLinear);

    // Add the chart to the HTML page
    this.chartContainer = svg.append("g")
      .attr('class', this.name.toLowerCase())
      .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top + (this.height * this.id) + (10 * this.id)) + ")");

    this.chartContainer.append("path")
      .data([this.chartData])
      .attr("class", "chart")
      .attr("clip-path", "url(#clip-" + this.id + ")")
      .attr("d", this.area);

    this.xAxisTop = d3.axisBottom(this.xScale);
    this.xAxisBottom = d3.axisTop(this.xScale);
    // show only the top axis
    if (this.id == 0) {
      this.chartContainer.append("g")
        .attr("class", "x axis top")
        .attr("transform", "translate(0,0)")
        .call(this.xAxisTop);
    }

    // show only the bottom axis
    if (this.showBottomAxis) {
      this.chartContainer.append("g")
        .attr("class", "x axis bottom")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.xAxisBottom);
    }

    this.yAxis = d3.axisLeft(this.yScale).ticks(5);

    this.chartContainer.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(-15,0)")
      .call(this.yAxis);

    this.chartContainer.append("text")
      .attr("class", "region-title")
      .attr("transform", "translate(15,40)")
      .text(this.name);

  }
}

Chart.prototype.showOnly = function(b) {
  this.xScale.domain(b);
  this.chartContainer.select("path").data([this.chartData]).attr("d", this.area);
  this.chartContainer.select(".x.axis.top").call(this.xAxisTop);
  this.chartContainer.select(".x.axis.bottom").call(this.xAxisBottom);
}
