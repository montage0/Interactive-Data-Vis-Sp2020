// load in csv
d3.csv("speed.csv").then(data => {
    // once the data loads, console log it
    console.log("data", data);
  
    // select the `table` container in the HTML
    const table = d3.select("#d3-table");
  
    /** HEADER */
    const thead = table.append("thead");
    thead
      .append("tr")
      .append("th")
      .attr("colspan", "3")
      .text("THE FAST AND THE PONDEROUS");
  
    thead
      .append("tr")
      .selectAll("th")
      .data(data.columns)
      .join("td")
      .text(d => d);
  
    /** BODY */
    // rows
    const rows = table
      .append("tbody")
      .selectAll("tr")
      .data(data)
      .join("tr");
 

    // cells
    rows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      // update the below logic to apply to your dataset
      .attr("class", d => +d < 1 ? 'slow' : null)
      .attr("class", d => +d > 150 ? 'fast' : null)
      .text(d => d);

  });
  