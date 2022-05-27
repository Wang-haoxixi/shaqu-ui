import hasPermission from './hasPermission';
import hasAnyPermissions from './hasAnyPermissions';

export default {
    install(Vue) {
        Vue.directive('hasPermission', hasPermission);
        Vue.directive('hasAnyPermissions', hasAnyPermissions)
    }
};

