export function getTeam(pick) {
  if (pick.selection === 'HOME') {
    return pick.homeTeam;
  } else if (pick.selection === 'AWAY') {
    return pick.awayTeam;
  }

  return 'Draw';
}
