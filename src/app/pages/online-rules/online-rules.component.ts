import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service';

@Component({
  selector: 'app-online-rules',
  templateUrl: './online-rules.component.html',
  styleUrls: ['./online-rules.component.scss']
})
export class OnlineRulesComponent implements OnInit {

  public expression: string;
  public rules = '';
  private compiledParser: any = null;
  public resultInstance: object = null;
  public errors: string;
  public existingRules: Array<object> = [
    {name: 'bool_expression_rules', title: 'Boolean Rules'},
    {name: 'state_expression_rules', title: 'Statement Rules'},
  ];

  constructor(private parser: ParserService) {
  }

  ngOnInit() {
    this.expression = 'state.health + 20';
  }

  build() {
    this.errors = null;
    try {
      this.compiledParser = this.parser.generate(this.rules);
    } catch (e) {
      this.compiledParser = null;
      this.errors = e.toString();
    }
    if (this.compiledParser) {
      try {
        this.resultInstance = this.compiledParser.parse(this.expression);
      } catch (e) {
        this.resultInstance = e.toString();
      }
    }
  }

  public rulesSelected(value: string) {
    this.rules = this.parser.getConfig()[value];
    this.build();
  }

}
