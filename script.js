(function() {

  const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
    countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
    w = 1000,
    h = 600,
    legendW = 300,
    legendH = 50,
    legendPadding = 20;

  // FETCH DATA
  d3.json(countyDataUrl)
    .then((data, err) => {
      if (err) {
        console.log(err)
      } else {
        data =
          countyData = topojson.feature(data, data.objects.counties).features

        // APPEND TOOLTIP
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("id", "tooltip");

        // APPEND SVG
        const svg = d3.select("main")
          .append("svg")
          .attr("width", w)
          .attr("height", h)

        // FETCH EDUCATION DATA
        d3.json(educationDataUrl)
          .then((educationData, err) => {
            if (err) {
              console.log(err)
            } else {
              const maxPercentage = d3.max(educationData, (x) => x.bachelorsOrHigher);

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
              for (let i = 0; i <= maxPercentage; i += 10) {
                dataArr.push(i)
              }

              legend.selectAll("rect")
                .data(dataArr)
                .enter()
                .append("rect")
                .attr("class", "legendCell")
                .attr("fill", d => colorScale(d))
                .attr("x", d => legendScale(d))
                // height - padding - rectHeight
                .attr("y", legendH - legendPadding - ((legendW - legendPadding * 2) / dataArr.length))
                // rectHeight
                .attr("height", (legendW - legendPadding * 2) / dataArr.length)
                // also rectHeight, because square
                .attr("width", (legendW - legendPadding * 2) / dataArr.length)

              // RENDER DATA
              svg.selectAll("path")
                .data(countyData)
                .enter()
                .append("path")
                .attr("d", d3.geoPath())
                .attr("class", "county")
                .attr("data-tooltip",(d) => {
                  let county = educationData.find((item)=>item.fips === d.id)
                  return `${county.area_name}, ${county.state}`
                })
                .attr("data-fips", (d) => d.id)
                .attr("data-education", (d) => {
                  let county = educationData.find((item)=>item.fips === d.id)
                  return county.bachelorsOrHigher
                })
                .attr("fill", (d) => {
                  let county = educationData.find((item)=>item.fips === d.id)
                  return colorScale(county.bachelorsOrHigher)
                })
                .on("mouseover", (e) => {
                  tooltip
                    .attr("data-education", e.target.attributes["data-education"].value)
                    .style("display", "block")
                    .style("left", `${e.pageX + 10}px`)
                    .style("top", `${e.pageY + 10}px`)
                    .html(
                    `
                      <p>${e.target.attributes["data-tooltip"].value}: ${e.target.attributes["data-education"].value} %</p>
                    `
                    )
                })
                .on("mouseout", () => {
                  tooltip.style("display", "none")
                })

              
              
            }
          });
      }
    });




})()