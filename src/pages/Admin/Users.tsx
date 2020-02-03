import React from 'react';
import { addPageData } from '../../util/add-page-data';
import { withRouter } from 'react-router';
import { USERS } from '../../apollo-client/query/admin';
import { User as UserInterface } from '../../apollo-client/types/user';
import User, { UserLoading } from '../../components/User';
import useQueryHelper from '../../util/use-query-helper';
import { ME } from '../../apollo-client/query/user';

const slug = '/users';
const title = 'Users';

export default addPageData(withRouter(({ history }) => {
  const { loading, error, data: users } = useQueryHelper<UserInterface[]>(USERS, 'users');
  if (loading) {
    return (
      <>
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
      </>
    );
  }
  return (
    <>
      {users.map(({ name, cid }) => <User key={cid} name={name} onClick={() => history.push(`/admin/user-info/${cid}`)} />)}
    </>
  );
}), { slug, title });
