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
       const svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
        
        // RENDER COUNTY MAP

        // SET SCALES

        // RENDER AXES
        
      d3.json(educationDataUrl)
        .then((educationData, err)=>{
          if(err){
        console.log(err)
          }else{
          console.log("education", educationData)
        // RENDER EDUCATION DATA
          }
        });

        // APPEND LEGEND
        
      }
    });



  
})()