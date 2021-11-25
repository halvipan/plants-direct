import { Input, Button } from "@chakra-ui/react"
import axios from "axios";
import React from "react"

export default function SignIn({setAuthd, setLoading,setMaster}) {
    const [userData, setUserData] = React.useState({uid: "", pass: ""})

    const handleChange = (event) => {
        setUserData({...userData, [event.target.id]: event.target.value})
    }

    const handleSubmit = async() => {
        setLoading(true)
        const response = await axios.post(`/api/authenticate`, userData);
        setAuthd(response.data.authd)
        setMaster(response.data.master)
        setLoading(false)
    }

    return (
        <div style={{display:'flex' , flexDirection: 'column', width:'200px', alignContent:'center', gap:'10px'}}>
            <Input id='uid' placeholder="Username" onChange={handleChange}/>
            <Input id='pass' placeholder="Password" onChange={handleChange}/>
            <Button onClick={handleSubmit}>Sign in</Button>
        </div>
    )
}