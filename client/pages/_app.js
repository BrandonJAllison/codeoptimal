/**
 * *_app.js
 * Next.js uses the App component to initialize pages.
 * This app component runs before any page gets ready for users to see
 * This is a perfect place to add yur bootstrap css so that it is available
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from '../components/TopNav.js';
import {Provider} from "../context";


function MyApp ({Component,pageProps}) {
    return(
    <Provider>
    <ToastContainer position="top-center"/>
    <TopNav/>
    <Component {...pageProps} style={{background:'#333'}} />
    </Provider>
    );
};

export default MyApp;