export const fetchUserId = async (nickname:string):Promise<string> => {
  try {
    const urlString = `https://open.api.nexon.com/fconline/v1/id?nickname=${encodeURIComponent(nickname)}`;
    const response = await fetch(urlString, {
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        "x-nxopen-api-key": process.env.REACT_APP_API_KEY!,
      }
    });

    if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');

    const data = await response.json();
    return await data.ouid
  } catch (error) {
    console.error('사용자 ID를 가져오는 데 실패:', error);
    throw error
  }
};