import { createContext, useState } from 'react'

export const PostDetails = createContext(null)

export default function Context ({children}){
    const [view,setView] = useState('null')
    return (
        <PostDetails.Provider value={{view,setView}}>
            {children}
        </PostDetails.Provider>
    )
}