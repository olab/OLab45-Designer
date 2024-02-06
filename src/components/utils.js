// @flow
export const redirectToPlayer =
  (mapId: number, nodeId: number): Function =>
  (): void => {
    window.open(
      `${process.env.PLAYER_PUBLIC_URL}/${mapId}/${nodeId}`,
    );
  };

export default {
  redirectToPlayer,
};
