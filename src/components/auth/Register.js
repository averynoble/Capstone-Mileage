import React, { useState } from "react";
import { useHistory } from "react-router-dom";


export const Register = () => {
    const [registerUser, setRegisterUser] = useState({ firstName: "", lastName: "", email: ""})
    const [conflictDialog, setConflictDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...registerUser }
        newUser[event.target.id] = event.target.value
        setRegisterUser(newUser)
    }

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${registerUser.email}`)
        .then(res => res.json())
        .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
        .then((userExists) => {
            if  (!userExists) {
                fetch("http://localhost:8088/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: registerUser.email,
                        name: `${registerUser.firstName} ${registerUser.lastName}`
                    })
                })
                    .then(res => res.json())
                    .then(createdUser => {
                        if  (createdUser.hasOwnProperty("id")) {
                            sessionStorage.setItem("miles_user", createdUser.id)
                            history.push("/")
                        }
                })
            }
            else {
                setConflictDialog(true)
            }
        })
    }

    return (
        <main style={{ textAlign: "center"}}>
            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for application Name</h1>
                <fieldset>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" className="form-control" placeholder="First name" required autoFocus value={registerUser.firstName} onChange={handleInputChange} />
                </fieldset>

                <fieldset>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" className="form-control" placeholder="Last name" required value={registerUser.lastName} onChange={handleInputChange} />
                </fieldset>

                <fieldset>
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={registerUser.email} onChange={handleInputChange} />
                </fieldset>

                <fieldset>
                    <button type="submit">Sign in</button>
                </fieldset>
            </form>
        </main>
    )
}