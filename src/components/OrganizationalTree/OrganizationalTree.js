import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const OrganizationalTree = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Set up dimensions and margins for the tree visualization
    const width = 1024;
    const height =768;
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
      
      const getChildCount = (node) => {
        if (!node.children) return 0;
        return node.children.reduce((count, child) => count + getChildCount(child), node.children.length);
      };

      const toggleChildren = (d) => {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      };
    
      const getTextWidth = (text, fontSize) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontSize}px sans-serif`;
        const metrics = context.measureText(text);
        return metrics.width;
      };
      
      // Update nodes
      const node = g.selectAll('g.node')
        .data(nodes, (d) => d.id || (d.id = ++i));
      
      const nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr('transform', (d) => `translate(${source.y0},${source.x0})`);
          
      // Name bounding box
      nodeEnter.append('rect')
        //.attr('x', (d) => d.children || d._children ? -getTextWidth(d.data.name, 12) / 2 - 68 : 8)
        .attr('x', (d) => d.children || d._children ? -getTextWidth(d.data.name, 12)-25 : 6)
        .attr('y', -8)
        .attr('width', (d) => getTextWidth(d.data.name, 12) + 20)
        .attr('height', 16)
        .attr('rx', 5)
        .attr('ry', 5)
        .style('fill', (d) => d.children || d._children ? '#7C95A5AD' : '#d2dde85e')
        .style('cursor', (d) => d.children || d._children ? 'pointer' : 'default')
        .on('click', (event, d) => {
          if (d.children || d._children) {
            toggleChildren(d);
          }
        });
      
      nodeEnter.append('circle')
        .attr('r', (d) => d.children || d._children ? 10 : 5)
        // TODO: you can make conditional colors with a function that compares supervisor workload
        .style('fill', (d) => d.children || d._children ? '#7C95A5' : '#D2DDE8')
        .style('cursor', (d) => d.children || d._children ? 'pointer' : 'default')
        .on('click', (event, d) => {
          if (d.children || d._children) {
            toggleChildren(d);
          }
        });
        
        nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('dx', '13px')
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#fff')
        .text((d) => d.children || d._children ? getChildCount(d) : '');
        
        nodeEnter.append('text')
          .attr('dy', '.35em')
          .attr('x', (d) => d.children || d._children ? -13 : 13)// Is this necessary?
          .attr('text-anchor', (d) => d.children || d._children ? 'end' : 'start')
          .style('fill', '#000')
          .style('font-size','12px')
          .text((d) => d.data.name);
        
      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate.transition()
        .duration(750)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      nodeUpdate.select('circle')
        .attr('r', (d) => d.children || d._children ? 10 : 5)
        .style('fill', (d) => d.children || d._children ? '#7C95A5' : '#D2DDE8');

      nodeUpdate.select('text')
        .attr('x', (d) => d.children || d._children ? -13 : 13)
        .style('fill', '#fff');

      node.exit().remove();

      // Update links
      // Custom path generator for angular links
      const diagonal = (source, target) => {
        const midX = (source.y + target.y) / 2;
        return `M ${source.y} ${source.x} C ${midX} ${source.x}, ${midX} ${target.x}, ${target.y} ${target.x}`;
      };

      // Update links
      const link = g.selectAll('path.link')
        .data(links, (d) => d.target.id);

      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', (d) => diagonal(d.source, d.target))
        .style('fill', 'none')
        .style('stroke', 'teal');

      const linkUpdate = linkEnter.merge(link);
      linkUpdate.transition()
        .duration(750)
        .attr('d', (d) => diagonal(d.source, d.target));

  
      link.exit().remove();
   
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
        <svg ref={svgRef} width="100%" height="768" />
      );
    };
    
    export default OrganizationalTree;
    
