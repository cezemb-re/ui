import {
  ReactNode,
  ReactElement,
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
  FunctionComponent,
  useMemo,
} from 'react';
import { useClickOutside } from '@cezembre/fronts';

export interface ModalComponentProps {
  id?: string;
  dismissModal: () => void;
}

export type ModalComponent = FunctionComponent<ModalComponentProps>;

export type ModalType = 'full' | 'overlay';

export interface Modal {
  id: string;
  type?: ModalType;
  component?: ModalComponent;
  onDismiss?: () => unknown;
  isActive?: boolean;
}

export interface ModalsState {
  modals: Modal[];
  popModal: (
    component: ModalComponent,
    type?: ModalType,
    onDismiss?: () => unknown,
  ) => string | undefined;
  dismissModal: (id: string) => void;
}

const Context = createContext<ModalsState>({
  modals: [],
  popModal: () => undefined,
  dismissModal: () => undefined,
});

export function useModals(): ModalsState {
  return useContext<ModalsState>(Context);
}

export interface ModalContainerProps {
  id: string;
  modal: Modal;
  dismissModal: () => void;
}

function ModalContainer({ id, modal, dismissModal }: ModalContainerProps): ReactElement {
  const modalElement = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    if (modal.isActive) {
      dismissModal();
      if (modal.onDismiss) {
        modal.onDismiss();
      }
    }
  }, [dismissModal, modal]);

  useClickOutside(modalElement, onClickOutside);

  return (
    <div className={`cezembre-ui-modal ${modal.type}`} id={id}>
      <div className="container">
        <div ref={modalElement}>
          {modal.component ? <modal.component id={modal.id} dismissModal={dismissModal} /> : null}
        </div>
      </div>
    </div>
  );
}

export interface ContextProps {
  children?: ReactNode;
}

export function ModalsContext({ children }: ContextProps): ReactElement {
  const [modals, setModals] = useState<Modal[]>([]);

  const popModal = useCallback(
    (
      component: ModalComponent,
      type: ModalType | undefined = 'full',
      onDismiss: (() => unknown) | undefined = undefined,
    ) => {
      const modal: Modal = {
        id: Math.random().toString(36).substring(5),
        component,
        type,
        onDismiss,
        isActive: true,
      };

      setModals((_modals: Modal[]) => [
        ..._modals.map((_modal) => ({ ..._modal, isActive: false })),
        modal,
      ]);

      return modal.id;
    },
    [setModals],
  );

  const dismissModal = useCallback(
    (id: string) => {
      setModals((_modals) => {
        const nextModals = [..._modals];
        const index = nextModals.findIndex((modal) => modal.id === id);
        if (index !== -1) {
          nextModals.splice(index, 1);
          if (nextModals.length) {
            nextModals[nextModals.length - 1].isActive = true;
          }
        }
        return nextModals;
      });
    },
    [setModals],
  );

  const value = useMemo(
    () => ({ modals, popModal, dismissModal }),
    [modals, popModal, dismissModal],
  );

  return (
    <Context.Provider value={value}>
      {children}
      {modals.map((modal: Modal) => (
        <ModalContainer
          key={modal.id}
          id={modal.id}
          modal={modal}
          dismissModal={() => dismissModal(modal.id)}
        />
      ))}
    </Context.Provider>
  );
}
