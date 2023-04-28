import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SkillsTree = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Set up dimensions and margins for the tree visualization
    const width = 800;
    const height =600;
    const margin = { top: 10, right: 10, bottom: 10, left: 150 };
    let i= 0;
    // Clear the SVG in case it was previously rendered
    d3.select(svgRef.current).selectAll('*').remove();

    // Create the tree layout
    const tree = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    // Convert the data to a hierarchy
    const root = d3.hierarchy(data);
    root.x0 = height / 2;
    root.y0 = 0;

    // Compute the tree layout
    tree(root);

    // Create a SVG group (g) element to hold the tree visualization
    const g = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Function to update the tree visualization
    const update = (source) => {
      // Compute the tree layout with the new data
      tree(root);

      // Get the tree nodes and links
      const nodes = root.descendants();
      const links = root.links();

      // Update nodes
      const node = g.selectAll('g.node')
        .data(nodes, (d) => d.id || (d.id = ++i));

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`);

      nodeEnter.append('circle')
        .attr('r', 10)
        .style('fill', (d) => d._children ? 'lightsteelblue' : '#fff');

      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', (d) => d.children || d._children ? -13 : 13)
        .attr('text-anchor', (d) => d.children || d._children ? 'end' : 'start')
        .text((d) => d.data.name);

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate.transition()
        .duration(750)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      nodeUpdate.select('circle')
        .attr('r', 10)
        .style('fill', (d) => d._children ? 'lightsteelblue' : '#fff');

      nodeUpdate.select('text')
        .attr('x', (d) => d.children || d._children ? -13 : 13);

      node.exit().remove();

      // Update links
      const link = g.selectAll('path.link')
        .data(links, (d) => d.target.id);

      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x));

          const linkUpdate = linkEnter.merge(link);
    
          linkUpdate.transition()
            .duration(750)
            .attr('d', d3.linkHorizontal()
              .x((d) => d.y)
              .y((d) => d.x));
    
          link.exit().remove();
        };
    
        // Initialize the tree visualization
        update(root);
      }, [data]);
    
      return (
        <svg ref={svgRef} width="1024" height="768" />
      );
    };
    
    export default SkillsTree;
    
