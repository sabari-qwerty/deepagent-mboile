import { DrawerActions, useNavigation } from "@react-navigation/native";

export const useDrawer = () => {
  const navigation = useNavigation();

  const open = () => navigation.dispatch(DrawerActions.openDrawer());

  const close = () => navigation.dispatch(DrawerActions.closeDrawer());

  const toggle = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return {
    open,
    close,
    toggle,
  };
};
