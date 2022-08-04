import { FifoStrategy } from "./FifoStrategy";
import { MatchedStrategy } from "./MatchedStrategy";

export class StrategyFactory {

  private constructor() { }

  static create(strategy: string) {
    switch (strategy) {
      case 'MATCHED':
        return new MatchedStrategy();
      case 'FIFO':
        return new FifoStrategy();
      default:
        return new FifoStrategy();
    }
  }
}
