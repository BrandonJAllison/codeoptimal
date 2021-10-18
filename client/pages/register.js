import {useState} from 'react'
import axios from 'axios'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.table({name, email, password})

        const {data} = await axios.post(`http://localhost:8000/api/register`, {name, email, password})
        console.log('REGISTER RESPONSE', data)
    }

    return(
        <>
        
        <h1 className="jumbotron bg-primary square text-center">User Registration</h1>
   
        <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control mb-4 p-4" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" required />
                <input type="email" className="form-control mb-4 p-4" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required />
                <input type="password" className="form-control mb-4 p-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" required />
                <br/>
                <button type="submit" className="btn btn-block btn-primary p-2">Submit</button>
            </form>
        </div>
        
        
        </>
    )
}

export default Register;