export function getCalculatedOdds(picks) {
  const totalOdds = picks.reduce((total, curr) => {
    if (total === 0) {
      return curr.odds;
    }

    return parseFloat(total * curr.odds);
  }, 0);
  return totalOdds;
}
