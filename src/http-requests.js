const serverUrl = 'http://localhost:5555';

export async function getMealList() {
    const response = await fetch(serverUrl + '/meals');
    const resData = await response.json();
    console.log('Meals data ' + resData);
    

    if (!response.ok) {
        throw new Error('Failed to fetch meals');
    }

    return resData;
}

export async function submitCustomerInfo(reqBody) {
    const response = await fetch(serverUrl + '/orders', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to submit customer information');
    }

    return resData;
}
