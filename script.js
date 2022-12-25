(function(){
  
  const educationData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
  const countyData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
  
  d3.json(countyData)
    .then((data)=>{
      console.log("county", data)
    });

  d3.json(educationData)
    .then((data)=>{
      console.log("education", data)
    });


  
})()