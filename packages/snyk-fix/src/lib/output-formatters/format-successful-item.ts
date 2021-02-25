import * as chalk from 'chalk';

import { EntityToFix, FixChangesSummary } from '../../types';
import { PADDING_SPACE } from './show-results-summary';

/*
 * Generate formatted output that describes what changes were applied, which failed.
 */
export function formatChangesSummary(
  entity: EntityToFix,
  changes: FixChangesSummary[],
): string {
  return `${PADDING_SPACE}${entity.scanResult.identity.targetFile}\n${changes.map((c) =>
    formatAppliedChange(c),
  )}`;
}

// TODO:
// write test for these
function formatAppliedChange(change: FixChangesSummary): string | null {
  if (change.success === true) {
    return `${PADDING_SPACE}${chalk.green('✔')} ${change.userMessage}`;
  }
  if (change.success === false) {
    return `${PADDING_SPACE}${chalk.red('x')} ${chalk.red(change.userMessage)}${
      change.tip
        ? `.\nTip:\`${change.tip}\``
        : undefined
    }`;
  }
  // not supported
  return null;
}
