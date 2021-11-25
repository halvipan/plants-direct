import { Input, Button } from "@chakra-ui/react"
import axios from "axios";
import React from "react"

export default function CreateUser({setLoading}) {
    const [userData, setUserData] = React.useState({uid: "", pass: ""})

    const handleChange = (event) => {
        setUserData({...userData, [event.target.id]: event.target.value})
    }

    const handleSubmit = async() => {
        setLoading(true)
        await axios.post(`/api/admins`, userData);
        setLoading(false)
    }

    return (
        <div style={{display:'flex' , flexDirection: 'column', width:'200px', alignContent:'center', gap:'10px'}}>
            <Input id='uid' placeholder="Username" onChange={handleChange}/>
            <Input id='pass' placeholder="Password" onChange={handleChange}/>
            <Button onClick={handleSubmit}>Create</Button>
        </div>
    )
}