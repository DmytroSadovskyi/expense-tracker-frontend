import {Router} from "../../pages/Router";
import {Header} from "../Header";
import {Footer} from "../Footer";

export const MainLayout = () =>{
    return (
        <>
        <Header/>
        <Router/>
        <Footer/>
        </>
    )
}