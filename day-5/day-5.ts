export class ManualPrinter {
  rules: string[] = [];
  updates: string[] = [];

  constructor(rules: string, updates: string) {
    this.rules = rules.split('\n');
    this.updates = updates.split('\n');
  }

  checkUpdateOrder(update: string[]): boolean {
    const isOrderedCorrectly = update
      .map((page, index) => {
        const pageRules = this.rules.filter((r) => r.includes(page));

        const check = pageRules.every((rule) => {
          const order = rule.split('|');

          if (order[0] === page) {
            const otherIndex = update.indexOf(order[1]);
            return otherIndex > -1 ? index < otherIndex : true;
          } else {
            const otherIndex = update.indexOf(order[0]);
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
        if (this.checkUpdateOrder(update.split(','))) {
          return update;
        }
      })
      .filter(Boolean);

    const middlePage = correctUpdates.map((update) => {
      const pages = update?.split(',') || [];
      const value = pages[(pages.length / 2) | 0];
      return value;
    });
    return middlePage.map((num) => Number(num)).reduce((a, b) => a + b, 0);
  }

  reorderUpdate(update: string[]): string[] {
    return update.sort((a, b) => {
      for (const rule of this.rules) {
        const [beforePage, afterPage] = rule.split('|');

        if (a === beforePage && b === afterPage) return -1;
        if (a === afterPage && b === beforePage) return 1;
      }
      return 0;
    });
  }

  getSumOfIncorrectMiddlePages(): number {
    const reorderedUpdates = this.updates
      .map((update) => {
        const updatePages = update.split(',');
        if (!this.checkUpdateOrder(updatePages)) {
          return this.reorderUpdate(updatePages);
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
