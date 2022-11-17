import { useState, useEffect } from "react"


import { auth } from "../services/firebase"
import { onAuthStateChanged } from "firebase/auth"

const logar = () => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])

    return { currentUser }
}

export default logar

