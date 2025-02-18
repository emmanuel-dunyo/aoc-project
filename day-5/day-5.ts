type Rule = {
  readonly before: number;
  readonly after: number;
};

class RuleClass implements Rule {
  readonly before: number;
  readonly after: number;

  constructor(ruleString: string) {
    const [before, after] = ruleString.split('|').map(Number);
    this.before = before;
    this.after = after;
  }
}

export class ManualPrinter {
  rules: Rule[] = [];
  updates: number[][] = [];

  constructor(data: string, updates: string) {
    data.split('\n').forEach((line) => {
      this.rules.push(new RuleClass(line));
    });

    this.updates = updates
      .split('\n')
      .map((updateLine) => updateLine.split(',').map(Number));
  }

  checkUpdateOrder(update: number[]): boolean {
    const isOrderedCorrectly = update
      .map((page, index) => {
        const pageRules = this.rules.filter(
          (r) => r.before === page || r.after === page
        );

        const check = pageRules.every((rule) => {
          if (rule.before === page) {
            const otherIndex = update.indexOf(rule.after);
            return otherIndex > -1 ? index < otherIndex : true;
          } else {
            const otherIndex = update.indexOf(rule.before);
            return otherIndex > -1 ? index > otherIndex : true;
          }
        });
        return check;
      })
      .every((check) => check);

    return isOrderedCorrectly;
  }

  getSumOfMiddlePages(): number {
    const correctUpdates = this.updates
      .map((update) => {
        if (this.checkUpdateOrder(update)) {
          return update;
        }
      })
      .filter(Boolean);

    const middlePage = correctUpdates.map((update) => {
      const pages = update || [];
      const value = pages[(pages.length / 2) | 0];
      return value;
    });
    return middlePage.map((num) => Number(num)).reduce((a, b) => a + b, 0);
  }

  reorderUpdate(update: number[]): number[] {
    return update.sort((a, b) => {
      for (const rule of this.rules) {
        if (a === rule.before && b === rule.after) return -1;
        if (a === rule.after && b === rule.before) return 1;
      }
      return 0;
    });
  }

  getSumOfIncorrectMiddlePages(): number {
    const reorderedUpdates = this.updates
      .map((update) => {
        if (!this.checkUpdateOrder(update)) {
          return this.reorderUpdate(update);
        }
      })
      .filter(Boolean);

    const middlePage = reorderedUpdates.map((update) => {
      const value = update ? update[(update.length / 2) | 0] : 0;
      return value;
    });
    return middlePage.map((num) => Number(num)).reduce((a, b) => a + b, 0);
  }
}
