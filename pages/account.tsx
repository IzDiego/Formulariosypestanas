import React, {useState,useEffect}from "react";
import {useRouter} from "next-router";
import useAuth from "../pages/hooks/userAuth";
import {getMeApi} from "./api/User";


export default function Account (){
const [user, setUser] = useState(undefined);
const {auth, logout,setReloadUser} = useAuth();
const router = useRouter();

useEffect ( () =>{
(async () =>{
const response = await getMeApi(logout);
setUser(response || null);
})()
},[auth]);

if(user===undefined) return null;
if(!auth && !user){
    router.replace("/");
    return null;
}

return(
<Configuration user={user} logout={logout} setRaloadUser={setReloadUser}/>
);
}

function Configuration(props){
    const {user, logout, setReloadUser} = props;
return(
    <div className="acount__configuration">
     <div className="title">Configuración</div>
     <div className="data">     
     </div>
    </div>
)
}
