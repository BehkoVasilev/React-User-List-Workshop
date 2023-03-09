const baseUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    
    return result.users;
}

export const getOne = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`);
    const result = await response.json();
    
    return result.user;
}

export const addOne = async (data) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };