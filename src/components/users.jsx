import React, {useState} from "react"
import api from "../api"

const Users = () => {
    const [users, setUser] = useState(api.users.fetchAll());
   
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1))
        if (number > 4 && number < 15) return 'человек тусанет'
        if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека таусанут'
        if (lastOne === 1) return 'человек тусанет'
        return 'человек тусанет'
    };
    const handleDeleteUser = (id) => {
        setUser((prevState) => prevState.filter((user) => user._id !== id))
    };
    
    return (
        <>
            <h2>
                <span
                    class={
                        "badge bg-" + (users.length > 0 ? "primary" : "danger")
                    }
                >
                    
                    {users.length > 0
                        ? `${users.length + ' ' + renderPhrase(users.length)} с тобой`
                        : 'Никто с тобой не тусанет'}
                </span>
            </h2>
            {users.length > 0 && (
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качество</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретились</th>
                            <th scope="col">Оценка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map((item) => (
                                        <span
                                            class={"badge m-1 bg-" + item.color}
                                            key={item._id}
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}</td>
                                <td>
                                    <button
                                        class='btn btn-danger'
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Users;