// @flow
import React from 'react';
import type { PermissionsProps as IProps } from './types';
import { ContainerTab, ContentTitle } from '../styles';
import { ContentParagraph } from './styles';
import * as mapGroupsActions from '../../../redux/mapGroups/action';
import { useDispatch, useSelector } from 'react-redux';
import GroupsTable from './GroupsTable';
import { MapGroup } from '../../../redux/mapGroups/types';

const Permissions = ({ map }: IProps): React$Element<any> => {
  const dispatch = useDispatch();

  const isFetching = useSelector((state) => state.isFetching);
  const groups = useSelector((state) => state.groups);
  const mapGroups = useSelector((state) => state.mapGroups);

  // const { mapGroups, groups, isFetching, mapId } = useSelector(
  //   ({ mapGroups: state }) => {
  //     // refresh state when changing between maps
  //     return !state?.mapId || map.id == state.mapId
  //       ? state
  //       : { isFetching: true };
  //   },
  // );

  React.useEffect(() => {
    if (!groups || 0 == groups.length) {
      dispatch(mapGroupsActions.ACTION_GET_GROUPS_REQUESTED());
      dispatch(mapGroupsActions.ACTION_GET_MAP_GROUPS_REQUESTED(map.id));
    }
  }, []);

  const updateGroup = (mapGroups: MapGroups) => {
    dispatch(
      mapGroupsActions.ACTION_UPDATE_MAP_GROUPS_REQUESTED(map.id, {
        mapGroups: [mapGroups],
      }),
    );
  };

  return (
    <ContainerTab>
      <ContentTitle>Map Groups Editor</ContentTitle>
      <ContentParagraph>Assign groups to this map.</ContentParagraph>

      {(groups?.length > 0 || !isFetching) && (
        <GroupsTable mapGroups={mapGroups} groups={groups} mapId={map.id} />
      )}
    </ContainerTab>
  );
};

export default Permissions;
