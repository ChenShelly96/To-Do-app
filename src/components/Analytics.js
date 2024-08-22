// src/components/Analytics.js
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const Analytics = ({ taskData }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (taskData && d3Container.current) {
      // Set the dimensions and margins of the graph
      const margin = { top: 20, right: 30, bottom: 40, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // Append the svg object to the div called 'd3Container'
      const svg = d3.select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X axis: scale and draw
      const x = d3.scaleBand()
        .range([0, width])
        .domain(taskData.map(d => d.date))
        .padding(0.2);

      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y axis: scale and draw
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

      svg.append("g")
        .call(d3.axisLeft(y));

      // Bars
      svg.selectAll("mybar")
        .data(taskData)
        .join("rect")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.completionRate))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.completionRate))
        .attr("fill", "#69b3a2");
    }
  }, [taskData]);

  return (
    <div className="analytics-container">
      <div ref={d3Container} />
    </div>
  );
};

export default Analytics;
