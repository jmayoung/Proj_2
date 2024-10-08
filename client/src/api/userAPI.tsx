import auth from '../utils/auth';

const getUsers = async () => {
    try{
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.getToken()}`
            }
        });
        const data = await response.json();

        if(!response.ok) {
            throw new Error('Invalid user API response, check network tab!');
        }
        return data;

    } catch(err) {
        console.log('Error from data retrieval:', err);
        return[];
    }
}

export { getUsers };