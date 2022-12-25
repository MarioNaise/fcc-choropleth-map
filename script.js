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
      console.log("county", countyData)

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
        
      // SET SCALES
      const colorScale = d3.scaleSequential()
      .domain([0, 100])
      .interpolator(d3.interpolateGreens);

      // APPEND LEGEND
      const svg = d3.select("main")
      .append("svg")
      .attr("width", legendW)
      .attr("height", legendH)

      // RENDER COUNTY MAP
        
      d3.json(educationDataUrl)
        .then((educationData, err)=>{
          if(err){
        console.log(err)
          } else {
          console.log("education", educationData)
        // RENDER EDUCATION DATA
          }
        });
        
      }
    });



  
})()