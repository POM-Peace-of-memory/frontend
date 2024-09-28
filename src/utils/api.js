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
  const body = await response.json();
  console.log(query);
  console.log(body);
  return body;
}
