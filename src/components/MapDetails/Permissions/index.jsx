// @flow
import React from 'react';
import type { PermissionsProps as IProps } from './types';
import { ContainerTab, ContentTitle } from '../styles';
import { ContentParagraph } from './styles';
import * as mapSecurityUsersActions from '../../../redux/mapSecurityUsers/action';
import { useDispatch, useSelector } from 'react-redux';
import AclsTable from './AclsTable';
import MapGroupsTable from './MapGroupsTable';
import { MapSecurityUser } from '../../../redux/mapSecurityUsers/types';

const Permissions = ({ map, groups, roles }: IProps): React$Element<any> => {
  const dispatch = useDispatch();
  const { users, isFetching, mapId } = useSelector(
    ({ mapSecurityUsers: state }) => {
      // refresh state when changing between maps
      return !state?.mapId || map.id == state.mapId
        ? state
        : { isFetching: true };
    },
  );

  let mapGroups = map.mapGroups;

  React.useEffect(() => {
    if (!users || 0 == users.length) {
      dispatch(
        mapSecurityUsersActions.ACTION_GET_MAP_SECURITY_USERS_REQUESTED(map.id),
      );
    }
  }, []);

  const updateAcl = (user: MapSecurityUser) => {
    dispatch(
      mapSecurityUsersActions.ACTION_UPDATE_MAP_SECURITY_USERS_REQUESTED(
        map.id,
        { users: [user] },
      ),
    );
  };

  const deleteSecurityUser = (user: MapSecurityUser) => {
    dispatch(
      mapSecurityUsersActions.ACTION_DELETE_MAP_SECURITY_USERS_REQUESTED(
        map.id,
        user.userId,
      ),
    );
  };

  console.log(`# groups ${groups.length}`);
  console.log(`# roles ${roles.length}`);

  return (
    <ContainerTab>
      <ContentTitle>Map Group Editor</ContentTitle>
      <ContentParagraph>Assign the map to one or more groups.</ContentParagraph>

      <MapGroupsTable
        groups={groups}
        map={map}
        users={users}
        updateAcl={updateAcl}
        deleteSecurityUser={deleteSecurityUser}
        mapId={map.id}
      />

      {(users?.length > 0 || !isFetching) && (
        <AclsTable
          users={users}
          updateAcl={updateAcl}
          deleteSecurityUser={deleteSecurityUser}
          mapId={map.id}
        />
      )}
    </ContainerTab>
  );
};

export default Permissions;
