d3.csv("epi2018scorescurrentbaselinev01.csv", d3.autoType).then(data => {
    console.log(data);
  
    /** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth * 0.9,
    height = window.innerHeight / 9.0,
    paddingInner = 0.3,
    margin = { top: 10, bottom: 40, left: 40, right: 40 };
  
  
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.Country))
      .range([margin.left, width - margin.right])
      .paddingInner(paddingInner);
  
  
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.EPIcurrent)])
      .range([height - margin.bottom, margin.top]);
  
    // reference for d3.axis: https://github.com/d3/d3-axis
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
  
    /** MAIN CODE */
    const svg = d3
      .select("#d3-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // append rects
    const rect = svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => yScale(d.EPIcurrent))
      .attr("x", d => xScale(d.Country))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.EPIcurrent))
      .attr("fill", "rgb(90, 0, 0)")
  
    // append text

   

      svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
      
  });
