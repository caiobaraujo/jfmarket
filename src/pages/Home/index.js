import React from "react";
import {Link} from "react-router-dom";

const Page = () => {
    return (
    <div>
       <h1>Pagina Home</h1>
    <hr/>
    <Link to="/about">Sobre</Link>
    </div>
    );
    }
   
    
export default Page;