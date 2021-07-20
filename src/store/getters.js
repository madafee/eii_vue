const getters = {
  sidebar: state => state.app.sidebar,
  authorization: state => state.user.authorization,
  userdata: state => state.user.userdata,
  roles: state => state.user.roles,
  roleslist: state => state.user.roleslist,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
