import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, HashRouter} from "react-router-dom";
import LoginForm from "./humanResources/LoginForm";
import MainPage from "./humanResources/MainPage";
import ListEmployees from "./humanResources/ListEmployees";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewEmployee from "./humanResources/NewEmployee";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="login" element={<LoginForm/>}></Route>
            <Route path="main" element={<MainPage/>}></Route>
            <Route path="employees" element={<ListEmployees/>}></Route>
            <Route path="newemployee" element={<NewEmployee/>}></Route>
        </Routes>
    </HashRouter>
);

reportWebVitals();
