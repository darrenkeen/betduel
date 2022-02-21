export function getOdds(selection, pick) {
  if (selection === 'HOME') {
    return pick.homeOdds;
  } else if (selection === 'AWAY') {
    return pick.awayOdds;
  }

  return pick.drawOdds;
}
