import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { IonButton, IonInput } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import FlexColumn from '../components/FlexColumn';
import FlexCell from '../components/FlexCell';
import LargeCopy from '../components/LargeCopy';
import SmallCopy from '../components/SmallCopy';
import { useFakeLogin } from '../util/etc-network-util';
import { ME } from '../apollo-client/query/user';
import useLazyQueryHelper from '../util/use-lazy-query-helper';
import { LoadingContext } from '../contexts/LoadingContext';
import { ToastContext } from '../contexts/ToastContext';

const Half = styled(FlexCell)`
  position: relative;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 600px;
  padding-left: 20px;
  padding-right: 20px;
`;

const PageDoesNotExist: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const [ query ] = useFakeLogin();
  const [ getMe, { loading: loadingMe, error: errorMe, data: me } ] = useLazyQueryHelper(ME, 'me', {
    fetchPolicy: 'network-only'
  });
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  if (history.action !== 'REPLACE' && !loadingMe && !me && !errorMe) {
    getMe();
    showLoadingScreen();
    return <></>;
  }
  if (loadingMe) {
    return <></>;
  }
  hideLoadingScreen();
  if (me) {
    return <Redirect to="/main" />;
  }
  return (
    <FlexColumn centered shouldInflate>
      <Half shouldInflate>
        <FlexColumn shouldInflate alignBottom centeredHorizontal>
          <PageWrapper>
            <LargeCopy centered>(Logo goes here)</LargeCopy>
          </PageWrapper>
        </FlexColumn>
      </Half>
      <Half shouldInflate>
        <FlexColumn shouldInflate centeredHorizontal>
          <FormContainer>
            {!loadingMe && (
              <>
                <SmallCopy>Please enter your email and password from ZenPlanner</SmallCopy>
                <IonInput placeholder="Email" type="text" onIonChange={(e) => setUsername((e as any).target.value)} />
                <IonInput placeholder="Password" type="password" onIonChange={(e) => setPassword((e as any).target.value)} />
                <IonButton expand="block" color="primary" onClick={() => {
                  showLoadingScreen();
                  query(username, password)
                    .then(() => history.replace('/main'))
                    .catch((e) => {
                      if (e.appError) {
                        showToast({
                          color: 'danger',
                          message: 'Your username and password were not recognized.'
                        });
                      } else if (e.networkError) {
                        showToast({
                          color: 'danger',
                          message: 'Cannot connect to the internet!'
                        });
                      }
                    })
                    .finally(hideLoadingScreen);
                }}>Log in</IonButton>
              </>
            )}
          </FormContainer>
        </FlexColumn>
      </Half>
    </FlexColumn>
  );
};

export default withRouter(PageDoesNotExist);
