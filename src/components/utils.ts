// @flow
import { SCOPED_OBJECTS, config } from '../config';

export const redirectToPlayer =
  (mapId: number, nodeId: number): Function =>
    (): void => {
      window.open(
        `${config.PLAYER_PUBLIC_URL}/${mapId}/${nodeId}`,
      );
    };

export default {
  redirectToPlayer,
};
