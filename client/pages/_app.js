/**
 * *_app.js
 * Next.js uses the App component to initialize pages.
 * This app component runs before any page gets ready for users to see
 * This is a perfect place to add yur bootstrap css so that it is available
 */

import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import TopNav from '../components/TopNav.js'

function MyApp ({Component,pageProps}) {
    return(
    <>
    <TopNav/>
    <Component {...pageProps} />;
    </>
    );
};

export default MyApp;