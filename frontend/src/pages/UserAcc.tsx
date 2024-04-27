import '../../../static/systemadmin/css/UserAcc.css';
import Header from './Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserBox from './UserBox';
import { User } from './UserBox';

const sampleUsers = [
  { id: "1", name: "John", role: "Admin" },
  { id: "2", name: "Jane", role: "User" },
  // Add more sample user objects as needed
];

// Combined Component
const UserAccount = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from the API endpoint when component mounts
    const fetchData = async () => {
      try {
        // const response = await axios.get('API_ENDPOINT_URL');
        // setUsers(response.data);
        setUsers(sampleUsers);

      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs only once after the first render

  return (
    <div>
        <Header userRole={'sysad'}/>

        {/* User Account Section */}
        <section>
            <h1 id="userAcc">User Accounts</h1>
            <div id="userList">
              {users.map(user => (
                  <UserBox key={user.id} user={user} />
              ))}
            </div>
        </section>
    </div>
  );
};

export default UserAccount;