import axios from 'axios';
import Cookies from 'js-cookie';

const isDevelopment = process.env.APP_ENV !== 'production';
const isProductionApp = process.env.APP_ENV === 'production';
const apiUrl = process.env.API_URL;
const localToken = localStorage.getItem('__users__isLoggedIn');
export const setAuthCookie = () => {
  return Cookies.set(
    isDevelopment
      ? 'test__users__isLoggedIn'
      : isProductionApp
      ? '__users__isLoggedIn'
      : `${process.env.APP_ENV}__users__isLoggedIn`,
    'true',
    { expires: 1 },
  );
};

export const removeAuthCookie = () => {
  return Cookies.remove(
    isDevelopment
      ? 'test__users__isLoggedIn'
      : isProductionApp
      ? '__users__isLoggedIn'
      : `${process.env.APP_ENV}__users__isLoggedIn`,
  );
};

export const isLoggedIn = () => {
  return Boolean(
    Cookies.get(
      isDevelopment
        ? 'test__users__isLoggedIn'
        : isProductionApp
        ? '__users__isLoggedIn'
        : `${process.env.APP_ENV}__users__isLoggedIn`,
    ),
  );
};
// export const isLoggedIn = () => {
//   return Boolean(
//     Cookies.get(
//       isDevelopment || isProductionApp
//         ? '__admin__isLoggedIn'
//         : `${APP_ENV}__admin__isLoggedIn`,
//     ),
//   );
// };

const unauthorizedHandler = () => {
  Cookies.remove(
    isDevelopment
      ? 'test__users__isLoggedIn'
      : isProductionApp
      ? '__users__isLoggedIn'
      : `${process.env.APP_ENV}__users__isLoggedIn`,
  );
  window.location.href = '/';
};

const responseFormatter = (status, data, error) => {
  return { status, data, error };
};

export async function postData(url, data) {
  const route_url = apiUrl + url;
  const response = await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
    })
    .catch((e) => e.response);

  return response;
}

export async function postAuthData(url, data) {
  const route_url = apiUrl + url;
  // const token = Cookies.get('__users__isLoggedIn');
  const response = await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localToken}`,
      },
    })
    .catch((e) => e.response);
  return response;
}
export async function deleteAuthData(url) {
  const route_url = apiUrl + url;
  // const token = Cookies.get('__users__isLoggedIn');
  const response = await axios
    .delete(route_url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localToken}`,
      },
    })
    .catch((e) => e.response);

  return response;
}
export async function getAuthData(url) {
  const route_url = apiUrl + url;
  // const token = Cookies.get('__users__isLoggedIn');
  const response = await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localToken}`,
      },
    })
    .catch((e) => e.response);

  return response;
}

// export const postApiReq = async (url, data) => {
//   const route_url = apiUrl + url;
//   return await axios
//     .post(route_url, data, {
//       headers: {
//         Accept: 'application/json',
//       },
//       withCredentials: true,
//     })
//     .then((response) => {
//       return responseFormatter(true, response.data, null);
//     })
//     .catch((e) => {
//       if (e?.response?.status === 403) {
//         unauthorizedHandler();
//       } else if (e) {
//         return responseFormatter(false, null, e?.response?.data || null);
//       } else {
//         return responseFormatter(false, null, e?.response?.data || null);
//       }
//     });
// };
export const deleteApiReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .delete(
      route_url,

      {
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        data,
      },
    )
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        // Cookies.remove(`${NETWORK}AdminLoggedIn`);
        // window.location.href = '/';
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const patchApiReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .patch(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        unauthorizedHandler;
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const getApiReq = async (url) => {
  const route_url = apiUrl + url;
  return await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e.response.status === 401) {
        unauthorizedHandler;
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export async function getData(url) {
  const route_url = apiUrl + url;
  const response = await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
      },
    })
    .catch((e) => e);

  return response;
}

// export const getFileUrl = async (data) => {
//   var fileInfo = {};
//   await postApiReq('/upload', data)
//     .then((res) => {
//       fileInfo = res;
//     })
//     .catch((e) => {
//
//     });

//   return fileInfo;
// };

export const postReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const getReq = async (url) => {
  const route_url = API_URL + url;
  return await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const putApiReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .put(route_url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localToken}`, // Add the token to the headers
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        unauthorizedHandler(); // Call the handler function properly
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
