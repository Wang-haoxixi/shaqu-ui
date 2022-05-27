const recast = require("recast");

const ORIGINAL_URL_FIELD_NAME = "originalUrl";
const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const API_FIELD_NAME = "$api";
const AUTHORITIES_FIELD_NAME = "authorities";


// const getRouteTree = (routes) => {
//   let routes_ = [];
//   routes.map(function (item) {
//     let items = {};
//     if (item.children) {
//       items.children = getRouteData(item.children);
//     }
//     items.path = item.path;
//     items.name = item.name;
//     items.uuid = item.uuid || "";
//     items.authority = item.authority || "";
//     if (items.uuid) {
//       routes_.push(items);
//     }
//   });
//   return routes_;
// };

async function getComponentList(routes, api) {
  const list = [];
  routes = routes || []
  for (var key in routes) {
    const route = routes[key];
    if (route.uuid) {
      const component = await getComponent(route, api) || {};
      const children = await getComponentList(route.children || [], api) || [];
      list.push({
        path: route.path,
        name: route.name,
        uuid: route.uuid,
        [AUTHORITIES_FIELD_NAME]: component.authorities,
        children: children,
      });
    } else {
      console.warn(`节点未配置 uuid : ${route.name} ${route.path}`);
      // throw new Error(`节点未配置 uuid : ${route.name} ${route.path}`)
    }
  }
  return list;
}

async function getComponent(route, api) {
  var component;
  if ("object".includes(typeof route.component)) {
    component = route.component;
  } else {
    const _component = route.component();
    if (_component instanceof Promise) {
      component = (await _component).default
    } else {
      console.error("该 component 不是 Promise :" + component);
    }
  }
  if (component) {
    component.authorities = getAuthoritiesByComponent(component, api)
    return component
  }
  return null;
}


function getAuthoritiesByComponent(component, api) {
  var authorities = [];
  for (const key in component) {
    if (!"render".includes(key)) {
      if ("function".includes(typeof component[key])) {
        const componentFunction = component[key];
        const list = getAuthoritiesByComponentFunction(componentFunction, api);
        authorities = authorities.concat(list)
      }
    }
  }
  for (const key in component.methods) {
    const componentFunction = component.methods[key]
    const list = getAuthoritiesByComponentFunction(componentFunction, api)
    authorities = authorities.concat(list);
  }
  return authorities;
}

function getAuthoritiesByComponentFunction(componentFunction, api) {
  const authorities = [];
  const funString = componentFunction.toString()
  if (funString.includes(API_FIELD_NAME)) {
    const AST = recast.parse(funString);
    AST.tokens.forEach((it, index) => {
      if (API_FIELD_NAME.includes(it.value)) {
        const apiFileName = AST.tokens[index + 2].value
        const apiFunctionName = AST.tokens[index + 4].value;
        const authority = getAuthorityByApiFunction(api[apiFileName][apiFunctionName],funString)
        if (authority) {
          authorities.push(authority)
        }
      }
    })
  }
  return authorities;
}


function getAuthorityByApiFunction(apiFunction,funString) {
  var method, pattern;
  const apiFunctionString = apiFunction?apiFunction.toString():'';
  const AST = recast.parse(apiFunctionString);
  AST.tokens.forEach((it, index) => {
    if ("Identifier".includes(it.type) && ORIGINAL_URL_FIELD_NAME.includes(it.value)) {
      pattern = AST.tokens[index + 2].value.replaceAll("\"", "").replaceAll("'", "");
    }
    if ("String".includes(it.type)) {
      const value = it.value.replaceAll("\"", "").replaceAll("'", "").toUpperCase()
      if (HTTP_METHODS.includes(value)) {
        method = value;
      }
    }
  })
  if (method && pattern) {
    return method + " " + pattern;
  } else {
    console.error(`API 函数未配置 originalUrl : \n${apiFunctionString}`,funString);
  }
}

export default {
  getComponentList
}
