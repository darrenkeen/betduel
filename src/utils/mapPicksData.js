export function mapPicksData(picks) {
  return picks.map((pick) => ({
    fixtureId: pick.id,
    selection: pick.selection,
  }));
}
