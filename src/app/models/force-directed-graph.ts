import { EventEmitter } from '@angular/core';
import { D3Link } from './link';
import { D3Node } from './node';
import * as d3 from 'd3';
import { Subject } from "rxjs";

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<D3Node, D3Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: D3Node[] = [];
  public links: D3Link[] = [];
  public options;

  constructor(nodes, links, options: { width, height }) {
    this.nodes = nodes;
    this.links = links;
    this.options = options;
    this.initSimulation(options);
  }

  public connectNodes(source, target) {
    let link;

    if (!this.nodes[source] || !this.nodes[target]) {
      throw new Error('One of the nodes does not exist');
    }

    link = new D3Link(source, target, {});
    this.simulation.stop();
    this.links.push(link);
    this.simulation.alphaTarget(0.3).restart();
    this.initLinks();
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links',
      d3.forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation()
        .force('charge',
          d3.forceManyBody()
            .strength(d => FORCES.CHARGE * 15)
        )
        .force('collide',
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => 5).iterations(2)
        );

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', d3.forceCenter(
      options.width / 2,
      options.height / 2
    ));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}