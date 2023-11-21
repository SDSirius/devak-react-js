// import { useEffect, useState } from 'react';
// import { UserServices } from "../services/UserServices";

// interface UserViewProps {
//     _id: string;
// }
 
// interface User {
//     _id: string;
//     name: string;
//     email: string;
//     file: string;
// }

// export const UserView: React.FC<UserViewProps> = ({ _id }) => {
//     const [user, setUser] = useState<User | undefined>(undefined);

//     useEffect(() => {
//         const userServices = new UserServices();
//         const getUser = async () => {
//             const response = await userServices.find(_id);
//             setUser(response.data);
//         };

//         getUser();
//     }, [_id]);

//     if (!user) {
//         return <div>Carregando...</div>;
//     }

//     return (
//         <div>
//             <p>{user.name}</p>
//         </div>
//     );
// };
