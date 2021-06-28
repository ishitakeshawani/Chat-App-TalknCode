import React,{ useRef,useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import { Avatar, ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
   
    const [loading,setLoading] = useState(true);

    const handleLogout = async() => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async(url) =>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg",{ type:'image/jpeg'})
    }


    useEffect(() => {
        if(!user){
            history.push('/');

            return;
        }
        //  console.log(user);
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id":"529d1eb8-7015-454c-8343-b44d234331a7",
                 "user-name":user.email,
                 "user-secret":user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                formdata.append('avatar',avatar,avatar.name);

                axios.post('https://api.chatengine.io/users/',formdata,{
                    headers:{"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}
                })
                .then(() => setLoading(false))
                .catch((error) => console.log(error.response))
            })
        })
    },[user,history]);

    if(!user) return 'Loading..';


    return  (
       <div className="chats-page">
           <div className="nav-bar">
               <div className="logo-tab">
                   Unichat
               </div>
               <div className="logout-tab" onClick={handleLogout}>
                   Logout
               </div>
           </div>
           <ChatEngine 
            height="calc{100vh - 66px)"
            projectID= {process.env.REACT_APP_CHAT_ENGINE_ID}
            userName={user.email}
            userSecret={user.uid}
           />

       </div>
    )
}

export default Chats;