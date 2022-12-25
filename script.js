(function(){
  
  const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
  w = 1000,
  h = 600,
  padding = 100,
  legendW = 600,
    legendH = 100,
    legendPadding = 20;

  // FETCH DATA
  d3.json(countyDataUrl)
    .then((data, err)=>{
      if(err){
        console.log(err)
      } else{
      countyData = topojson.feature(data, data.objects.counties).features
      console.log("county", data)

      // APPEND TOOLTIP
      const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
        
      
      // APPEND SVG
      const svg = d3.select("main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      
      // RENDER COUNTY MAP
      
      // SET SCALES
      const colorscale = d3.scaleSequential()
      .range([0, 100])
      .interpolator()

      
      // RENDER EDUCATION DATA
      d3.json(educationDataUrl)
        .then((educationData, err)=>{
          if(err){
        console.log(err)
          } else {
            console.log("education", educationData)
            
            // APPEND LEGEND
            const legendScale = d3.scaleLinear()
            .domain([0, 100])
            .range([legendPadding, legendW - legendPadding]);
              
            const legend = d3.select("main")
            .append("svg")
            .attr("id", "legend")
            .attr("width", legendW)
            .attr("height", legendH)
      
            const legendAxis = d3.axisBottom(legendScale)
      
            legend.append("g")
            .attr("transform", "translate(0," + (legendH - legendPadding) + ")")
            .call(legendAxis)
            .attr("id", "legend-axis");
          }
        });
        
      }
    });



  
})()