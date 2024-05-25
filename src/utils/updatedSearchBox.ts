export const addSearchBox = (now:string,prev:string[] ) => {
    const updatedData = [now, ...prev.filter(data => data !== now)].slice(0, 5);
    localStorage.setItem('searched', JSON.stringify(updatedData));
}

export const deleteSearchBox = (now:string,prev:string[]) => {
    const updatedData = prev.filter(nickname => nickname !== now)
    localStorage.setItem('searched',JSON.stringify(updatedData))
    return updatedData;
}