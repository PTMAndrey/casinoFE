import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers = {
  // 'Content-Type': 'multipart/form-data',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
};

// access control axios
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// ---------------------------- Calls ----------------------------------

// login  authenticate
export const login = async (email, password) => {
  try {
    const response = await axios.get(
      "/utilizator/login?email=" + email + "&parola=" + password
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const register = async (data) => {
  try {
    const response = await axios.post('/utilizator/add',data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get user by id
export const getUserById = async (id) => {
  try {
    const response = await axios.get("/utilizator/getByID?id=" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};


// get all games
export const getAllJocuri = async () => {
  try {
    const response = await axios.get("/jocuri/getAll");
    return response;
  } catch (error) {
    console.log(error);
  }
};


// place bet
export const placeBet = async (data) => {
  try {
    const response = await axios.post("/pariuri/add",data);
    return response;
  } catch (error) {
    console.log(error);
  }
};



// adauga cod referal de la parinte
export const addCodReferal = async (data) => {
  try {
    const response = await axios.put("/utilizator/adaugaReferal?id="+data.id+"&codulMeuReferal="+data.codReferal);
    return response;
  } catch (error) {
    console.log(error);
  }
};


// schimba codul meu referal
export const actualizeazaCodulMeuReferal = async (data) => {
  try {
    const response = await axios.put("/utilizator/actualizareReferalulMeu?id="+data.id+"&codulMeuReferal="+data.codReferal);
    return response;
  } catch (error) {
    console.log(error);
  }
};


// deposit
export const depunereBani = async (data) => {
  try {
    const response = await axios.post("/depuneri/add",data);
    return response;
  } catch (error) {
    console.log(error);
  }
};



// retragere
export const retragereBani = async (data) => {
  try {
    const response = await axios.post("/retrageri/add",data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
