import * as pegJs from 'pegjs';
import { Injectable } from "@angular/core";
import { ConfigApiService } from "./api";
import { IConfig } from "../models";

@Injectable()
export class ParserService {

  private config: IConfig;
  private boolParser;
  private stateParser;

  constructor(private configApi: ConfigApiService) {
    this.configApi.doRetrieveApiCall(null).subscribe(
      (config: IConfig) => {
        this.config = config;
        this.boolParser = pegJs.generate(this.config.bool_expression_rules);
        this.stateParser = pegJs.generate(this.config.state_expression_rules);
      }
    );
  }

  public buildBoolExpression(expression: string) {
    return this.boolParser.parse(expression);
  }

  public buildStateExpression(expression: string) {
    return this.stateParser.parse(expression);
  }

  public generate(expression) {
    return pegJs.generate(expression);
  }

  public getConfig(): object {
    return {...this.config};
  }
}
