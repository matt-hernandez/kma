import React, { createContext, useContext, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { IonModal } from '@ionic/react';
import { useStateHelper, listenerTypes } from '../util/use-state-helper';
import { AcceptAnyReturnVoid } from '../util/interface-overrides';
import { TaskCommitConfirmationModal, GenericModal, DevToolsModal } from './Modals';

type ModalType = 'TASK_CONFIRM_COMMIT' | 'DEV_TOOLS' | '';

interface ModalConfig {
  type: ModalType;
  content: any;
  onConfirm?: AcceptAnyReturnVoid;
  onDismiss?: AcceptAnyReturnVoid;
  manualDismiss?: boolean
}

export const ModalContext = createContext({
  shouldShowModal: false,
  showModal: (config: ModalConfig) => {},
  hideModalRef: { current: () => {} },
  config: ({ type: '', content: <></> } as ModalConfig)
});

const Provider = ModalContext.Provider;

const ModalPadding = styled.div`
  padding: 20px;
`;

export const ModalProvider: React.FunctionComponent = ({children}) => {
  const [ shouldShowModal, showModal, hideModal ] = useStateHelper(false, listenerTypes.TOGGLE_MANUALLY);
  const hideModalRef = useRef(hideModal);
  hideModalRef.current = hideModal;
  const [ config, setConfig ] = useState<ModalConfig>({ type: '', content: <></> } as ModalConfig);
  return (
    <Provider value={{
      shouldShowModal,
      showModal(
        config
      ) {
        setConfig(config);
        showModal();
      },
      hideModalRef,
      config
    }}>
      {children}
    </Provider>
  )
};

const ModalWrapper: React.FunctionComponent = () => {
  const { shouldShowModal, config, hideModalRef } = useContext(ModalContext);
  const { type } = config;
  let ModalComponent: React.FunctionComponent<any> = GenericModal;
  if (type === 'TASK_CONFIRM_COMMIT') {
    ModalComponent = TaskCommitConfirmationModal;
  } else if (type === 'DEV_TOOLS') {
    ModalComponent = DevToolsModal;
  }
  return (
    <>
      {shouldShowModal && (
        <IonModal isOpen={shouldShowModal} onDidDismiss={() => {
          hideModalRef.current();
        }}>
          <ModalPadding>
            <ModalComponent {...config} hideModal={hideModalRef.current} />
          </ModalPadding>
        </IonModal>
      )}
    </>
  );
};

export default ModalWrapper;
