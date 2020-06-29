import { INodeMetadata } from './node';
import { ILinkMetadata } from './link';

export class Cell {
  public record: INodeMetadata;
  public position: number;
  public level: number;
  public row: Row;
  public properties = {
    width: 50,
    height: 50
  };

  constructor(question) {
    this.record = question;
  }

  get x() {
    return this.position * this.properties.width;
  }

  get y() {
    return (this.level - 1) * this.properties.height;
  }

  get labelX() {
    return this.y + this.properties.height / 3;
  }

  get labelY() {
    return this.x + this.properties.height / 3;
  }
}

export class Row {
  public nodes: Cell[];
  public level: number;

  constructor(level: number) {
    this.level = level;
    this.nodes = [];
  }

  public getVerticalShift(): number {
    return 0;
  }

  public addNode(node: Cell) {
    node.position = this.nodes.length;
    node.level = this.level;
    node.row = this;
    this.nodes.push(node);
  }
}

export class Questionnaire {
  private map = {};
  public rows: Row[];
  public links: ILinkMetadata[];
  private questions: INodeMetadata[];

  constructor(questions: INodeMetadata[], links: ILinkMetadata[] = []) {
    this.questions = questions;
    this.links = links;
    this.build();
  }

  build() {
    this.rows = [];
    this.questions.forEach(q => {
      const level = q.level;
      while (this.rows.length - 1 < level) {
        this.rows.push(new Row(this.rows.length + 1));
      }
      const node = new Cell(q);
      this.rows[level - 1].addNode(node);
      this.map[q.id] = node;
    });
    this.sort();
  }

  sort() {
    this.rows.forEach((row: Row) => {
      row.nodes.sort((a: Cell, b: Cell) => {
        if (a.record.weight < b.record.weight) {
          return -1;
        }
        if (a.record.weight > b.record.weight) {
          return 1;
        }
        return 0;
      });
      row.nodes.forEach((node: Cell, index: number) => {
        node.position = index;
      });
    });
  }

  getById(id): Cell {
    return this.map[id];
  }
}

