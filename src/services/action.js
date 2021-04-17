import ApiTypes from './types';
import {defaultURL, authenticateURL, noteURL} from './url';

export const SignupUser = (user) => async (dispatch) => {
  const url = defaultURL;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        name: user.name,
        mobile: user.mobile,
        socialId: user.socialId,
      }),
    });
    const result = await response.json();
    if (result.status === true) {
      dispatch({
        type: ApiTypes.CREATE_USER,
        id: result.body.id,
      });
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = (data, status) => async (dispatch) => {
  const url = authenticateURL;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const result = await response.json();
    console.log('Login', result);
    if (result.status) {
      status(result.status);
      dispatch({
        type: ApiTypes.LOGIN_USER,
        id: result.id,
      });
    } else {
      status(result.message);
      console.log('Error : ', result.message);
    }
  } catch (error) {
    console.log(error);
  }
};
export const LoginGoogle = (socialId, status) => async (dispatch) => {
  const url = authenticateURL;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialId,
      }),
    });
    const result = await response.json();
    console.log('Login', result);
    if (result.status) {
      status(result.status);
      dispatch({
        type: ApiTypes.SOCIAL_USER,
        id: result.id,
      });
    } else {
      status(result.message);
      console.log('Error : ', result.message);
    }
  } catch (error) {
    console.log(error);
  }
};
export const Notes = (data, id) => async (dispatch) => {
  const url = noteURL + id;
  console.log('Notesurl', url);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes: [
          {
            title: data.title,
            data: data.data,
          },
        ],
      }),
    });
    const result = await response.json();
    console.log('Notes', result);
    if (result.status === true) {
      dispatch({
        type: ApiTypes.NOTES,
        payload: result.data,
      });
    } else {
      console.log('Error : ', result.message);
    }
  } catch (error) {
    console.log('Bug', error);
  }
};
export const NotesGet = (id) => async (dispatch) => {
  const url = noteURL + id;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log('NotesGet', result);
    if (result.status === true) {
      // const resultFinal = result.response.reduce(
      //   (accumulator, currentValue) => {
      //     var newtitle = currentValue.title;
      //     var data = currentValue.data;
      //     var flag = true;
      //     accumulator.map((item, index) => {
      //       if (newtitle === item.title) {
      //         flag = false;
      //         accumulator[index].data.push(data);
      //       }
      //     });
      //     if (flag) {
      //       accumulator.push({title: newtitle, data: [data]});
      //     }
      //     return accumulator;
      //   },
      //   [],
      // );
      dispatch({
        type: ApiTypes.GETNOTES,
        payload: result,
      });
    } else {
      console.log('Error : ', result.message);
    }
  } catch (error) {
    console.log('Bug', error);
  }
};
export const Delete = (id, noteid) => async (dispatch) => {
  const url = noteURL + id + '/' + noteid;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log('shdkaj', result);
    if (result.status === true) {
      dispatch({
        type: ApiTypes.DELETENOTES,
        payload: result,
      });
    } else {
      console.log('Error : ', result.message);
    }
  } catch (error) {
    console.log('Bug', error);
  }
};
export const DarkMode = () => {
  return {
    type: ApiTypes.DARK_MODE,
  };
};
