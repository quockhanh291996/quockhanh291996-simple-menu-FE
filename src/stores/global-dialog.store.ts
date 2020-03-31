import { Instance, types } from 'mobx-state-tree';

export const GlobalDialogStore = types
  .model({
    type:  types.optional(
      types.enumeration('tyoe', ['confirmation', 'error', 'info']),
      'info',
    ),
    isOpen: false,
    message: '',
  })
  .volatile(() => ({
    onConfirm: () => {},
  }))
  .actions((self) => ({
    open: () => {
      self.isOpen = true;
    },
    close: () => {
      self.isOpen = false;
    },
    setType: (newType: 'confirmation' | 'error' | 'info') => {
      self.type = newType;
    },
    setMessage: (message: string) => {
      self.message = message;
    },
    setConfirmCallback: (callback: () => void) => {
      self.onConfirm = callback;
    },
    reset: () => {
      self.message = '';
      self.isOpen = false;
      self.onConfirm = () => {};
    },
  }));

export type IGlobalDialogStore = Instance<typeof GlobalDialogStore>;

export const GlobalDialogStoreInstance = GlobalDialogStore.create();
