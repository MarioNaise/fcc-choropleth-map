(function(){
  
  const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
  w = 1000,
  h = 600,
  padding = 100,
  legendW = 300,
  legendH = 50,
  legendPadding = 20;

  // FETCH DATA
  d3.json(countyDataUrl)
    .then((data, err)=>{
      if(err){
        console.log(err)
      } else {
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
      
      // RENDER COUNTY MAP
      
    
      
      // RENDER EDUCATION DATA
      d3.json(educationDataUrl)
        .then((educationData, err)=>{
          if(err){
        console.log(err)
          } else {
          console.log("education", educationData)
          const maxPercentage = d3.max(educationData, (x)=>x.bachelorsOrHigher);

          // COLORSCALE
          const colorScale = d3.scaleSequential()
          .domain([0, maxPercentage])
          .interpolator(d3.interpolateGreens);
           
          // APPEND LEGEND
          const legendScale = d3.scaleLinear()
          .domain([0, maxPercentage])
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

          // LEGEND CELLS
          let dataArr = [];
          for(let i = 0; i <= maxPercentage; i += 10){
            dataArr.push(i)
          }
      
          legend.selectAll("rect")
          .data(dataArr)
          .enter()
          .append("rect")
          .attr("class", "legendCell")
          .attr("fill", d => colorScale(d))
          .attr("x", d => legendScale(d))
          .attr("y", legendH-legendPadding-((legendW - legendPadding*2)/dataArr.length))
          .attr("height", (legendW - legendPadding*2)/dataArr.length)
          .attr("width", (legendW - legendPadding*2)/dataArr.length)
            
          }
          
        });
        
      }
    });



  
})()