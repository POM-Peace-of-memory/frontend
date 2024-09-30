const BASE_URL = "https://613508a7-d02f-4d83-9103-b857cae37561.mock.pstmn.io";

export async function getGroups({
  page = 1,
  pageSize = 2,
  sortBy = "mostLiked",
  isPublic = true,
  keyword = "",
}) {
  const query = `page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&isPublic=${isPublic}&keyword=${keyword}`;
  const response = await fetch(`${BASE_URL}/groups?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function createGroups(groupData) {
  const response = await fetch(`${BASE_URL}/groups`, {
    method: "POST",
    body: groupData,
  });
  if (!response.ok) {
    throw new Error("데이터를 생성하는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/image`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("이미지 업로드에 실패했습니다");
  }
  const result = await response.json();
  return result.imageUrl;
}
