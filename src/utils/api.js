// const BASE_URL = "https://d25099c5-86ab-44ab-95e4-dcb3a3f97104.mock.pstmn.io";
const BASE_URL = "https://backend-vai1.onrender.com/api";
const PAGE_SIZE = 8;

export async function getGroups({
  page = 1,
  pageSize = PAGE_SIZE,
  sortBy = "mostLiked",
  isPublic = true,
}) {
  const query = `page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&isPublic=${isPublic}`;
  const response = await fetch(`${BASE_URL}/groups?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function createGroups(groupData) {
  let data = JSON.stringify(groupData);
  console.log(`Request body: ${data}`);
  const response = await fetch(`${BASE_URL}/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: data,
  });
  if (!response.ok) {
    throw new Error("데이터를 생성하는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function verifyPassword(password, groupId) {
  let data = JSON.stringify({ password: password });
  const response = await fetch(
    `${BASE_URL}/groups/${groupId}/verify-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("비밀번호 확인에 실패햇습니다.");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function updateGroups(groupData, groupId) {
  try {
    await verifyPassword(groupData.password, groupId);
    let data = JSON.stringify(groupData);
    console.log(`Request body: ${data}`);
    const response = await fetch(`${BASE_URL}/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    });
    if (!response.ok) {
      throw new Error("데이터를 수정하는데 실패했습니다");
    }
    const body = await response.json();
    console.log(body);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://backend-vai1.onrender.com/api/image`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("이미지 업로드에 실패했습니다");
  }
  const result = await response.json();
  console.log(result.imageUrl);
  return result.imageUrl;
}

export async function getGroupDetails(groupId) {
  const response = await fetch(`${BASE_URL}/groups/${groupId}`);
  if (!response.ok) {
    throw new Error("그룹 상세 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getPosts({
  page = 1,
  pageSize = PAGE_SIZE,
  sortBy = "mostLiked",
  isPublic = true,
  keyword = "",
  groupId = 0,
}) {
  const query = `page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&isPublic=${isPublic}&keyword=${keyword}&groupId=${groupId}`;
  const response = await fetch(`${BASE_URL}/groups/${groupId}/posts?${query}`);
  if (!response.ok) {
    throw new Error("게시글 목록 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
