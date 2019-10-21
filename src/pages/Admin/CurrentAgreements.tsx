import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { addPageData } from '../../util/add-page-data';
import { ALL_CURRENT_AGREEMENTS } from '../../constants/graphql/admin';
import AgreementForAdmin from '../../components/AgreementForAdmin';
import { AgreementForAdmin as AgreementForAdminInterface } from '../../util/state';

const slug = '/agreements/current';
const title = 'Current Tasks';

export default addPageData(() => {
  const { loading, error, data } = useQuery(ALL_CURRENT_AGREEMENTS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const tasks: AgreementForAdminInterface[] = data.allCurrentAgreements;

  return (
    <div>
      {tasks.map((task) => (
        <AgreementForAdmin {...task} />
      ))}
    </div>
  )
}, { slug, title });
