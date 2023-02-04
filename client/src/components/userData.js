import React from 'react'

export const userData = (data) => {
    return (
        <div>
            <h1>Name: {data.username}</h1>
            <h1>Surname: {data.surName}</h1>
        </div>
    )
};
export default userData