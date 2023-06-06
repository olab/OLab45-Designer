// @flow
import React from 'react';
import type { PermissionsProps as IProps } from './types';
import { ContainerTab, ContentTitle } from '../styles';
import { ContentParagraph } from './styles';
import * as mapSecurityUsersActions from '../../../redux/mapSecurityUsers/action';
import { useDispatch, useSelector } from 'react-redux';
import AclsTable from './AclsTable';
import { MapSecurityUser } from '../../../redux/mapSecurityUsers/types';

const Permissions = ({ map }: IProps): React$Element<any> => {
  const dispatch = useDispatch();
  const { users, isFetching } = useSelector((state) => state.mapSecurityUsers);

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

  return (
    <ContainerTab>
      <ContentTitle>Map Permissions Editor</ContentTitle>
      <ContentParagraph>
        Invite other authors to help manage this map.
      </ContentParagraph>

      {(users.length > 0 || !isFetching) && (
        <AclsTable users={users} updateAcl={updateAcl} />
      )}
    </ContainerTab>
  );
};

export default Permissions;
