export const fetchUserData = async (ouid: string) => {
    try {
        const response = await fetch(`https://open.api.nexon.com/fconline/v1/user/basic?ouid=${ouid}`, {
            headers: {
                "x-nxopen-api-key": process.env.REACT_APP_API_KEY!,
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchUserDivision = async (ouid: string) => {
    try {
        const response = await fetch(`https://open.api.nexon.com/fconline/v1/user/maxdivision?ouid=${ouid}`, {
            headers: {
                "x-nxopen-api-key": process.env.REACT_APP_API_KEY!,
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};