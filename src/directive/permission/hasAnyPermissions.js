import store from '@/store/';

function checkPermission(el, binding) {
    const {value} = binding;
    if (value) {
        const hasPermission = store.state.permissionList.some(function (permission) {
            if (value.constructor === Array) {
                return value.includes(permission.parentUuid);
            } else {
                return permission.parentUuid === value;
            }
        });
        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
}

const hasAnyPermissions = {
    inserted(el, binding) {
        checkPermission(el, binding)
    },
    update(el, binding) {
        checkPermission(el, binding)
    }
};

hasAnyPermissions.install = function (Vue) {
    Vue.directive('hasAnyPermissions', hasAnyPermissions);
}

export default hasAnyPermissions;
