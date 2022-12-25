(function(){
  
  const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
  const countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

  // FETCH DATA
  d3.json(countyDataUrl)
    .then((data, err)=>{
      if(err){
        console.log(err)
      } else{
      console.log("county", data)

        // APPEND SVG

        // APPEND TOOLTIP

        // APPEND LEGEND

        // RENDER COUNTY MAP

        // SET SCALES

        // RENDER AXES
        
      d3.json(educationDataUrl)
        .then((educationData, err)=>{
          if(err){
        console.log(err)
          }else{
          console.log("education", educationData)
          }
        });

        // RENDER EDUCATION DATA
        
      }
    });



  
})()