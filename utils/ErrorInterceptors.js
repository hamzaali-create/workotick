import { message } from "antd";
import { historyRouter } from "../components/HistoryRouter";
import { outsideStore, updateOrganization } from "./helpers";
import { updateUser } from "../features/auth/authSlice";
import Api from "./Axios";

const activeOrg = JSON.parse(localStorage.getItem('activeOrg'));

const errorInterceptor = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        handleUnauthenticatedError();
        break;
      case 403:
        handleForbiddenError(error.response.data.data, error.response.data.message);
        break;
      case 404:
        handleNotFoundError(error.response.data.data, error.response.data.message);
        break;
      default:
        console.error('An unexpected error occurred:', error.message);
    }
  }

  return Promise.reject(error);
};

const handleUnauthenticatedError = () => {
  message.error('Unauthenticated');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  historyRouter('/login');
};

const handleForbiddenError = (data, msg) => {

  if (data) {
    message.error(msg)
    if (data.has_access === false) {
      updateOrganization(activeOrg.id)
        .then(() => historyRouter('/'))
        .catch((errors) => console.error(errors));
    } else if (data.is_suspended === true || data.is_member === false) {
      historyRouter('/organization');
    } else if (data.is_missing === true) {
      updateOrganization(activeOrg.id)
        .then(() => historyRouter('/organization'))
        .catch((errors) => console.error(errors));
    }
  }
};

const handleNotFoundError = (data, msg) => {

  if (!data) return
  message.error(msg)

  if (data.is_deleted) {
    Api.get('/me').then(({ data }) => {
      outsideStore.dispatch(updateUser(data.data))
      historyRouter('/organization')
    }).catch((error) => {
      console.error(error);
    })
  }
}

export default errorInterceptor;
