import { createSelector } from "reselect";

const menusSelector = (state) => state.menus;
const idSelector = (state) => state.router.location.pathname.split('/menu/')[1];

export const getMenus = createSelector(
  [menusSelector],
  state => state.list
)

export const getMenusId = createSelector(
  [idSelector],
  state => state
)