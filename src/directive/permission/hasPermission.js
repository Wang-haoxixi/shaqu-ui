import store from '@/store/';

function checkPermission(el, binding) {
    const {value} = binding;
    if (value) {
        const hasPermission = store.state.permissionList.some(function (permission) {
            return permission.uuid === value;
        });

        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
}

const hasPermission = {
    inserted(el, binding) {
        checkPermission(el, binding)
    },
    update(el, binding) {
        checkPermission(el, binding)
    }
};


export default hasPermission;
