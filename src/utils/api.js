const BASE_URL = "https://backend-vai1.onrender.com/api";

const PAGE_SIZE = 6;

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
  const data = JSON.stringify(groupData);
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
  return body;
}

export async function updateGroups(groupData, groupId) {
  const data = JSON.stringify(groupData);
  const response = await fetch(`${BASE_URL}/groups/${groupId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: data,
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    } else {
      throw new Error("데이터를 수정하는데 실패했습니다");
    }
  }
  const body = await response.json();
  return body;
}

export async function deleteGroups(password, groupId) {
  const data = JSON.stringify({ password: password });
  const response = await fetch(`${BASE_URL}/groups/${groupId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    } else {
      throw new Error("그룹 삭제에 실패햇습니다.");
    }
  }
  const body = await response.json();
  return body;
}

export async function verifyPassword(password, id, variant) {
  const data = JSON.stringify({ password: password });
  const response = await fetch(`${BASE_URL}/${variant}/${id}/verify-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    } else {
      throw new Error("비밀번호 확인에 실패했습니다.");
    }
  }

  const body = await response.json();
  return body;
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

export async function addLike(groupId) {
  const response = await fetch(`${BASE_URL}/groups/${groupId}/like`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("그룹 공감에 실패했습니다");
  }
}

export async function getPosts({
  page = 1,
  pageSize = PAGE_SIZE,
  sortBy = "mostLiked",
  isPublic = true,
  keyword = "",
  groupId = "",
}) {
  const query = `page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&keyword=${keyword}&isPublic=${isPublic}`;
  const response = await fetch(`${BASE_URL}/groups/${groupId}/posts?${query}`);
  if (!response.ok) {
    throw new Error("게시글 목록 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getPostDetail(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("존재하지 않는 게시물입니다.");
    }
    throw new Error("게시물 상세 정보를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function updatePost(postId, postData) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    } else if (response.status === 400) {
      throw new Error("잘못된 요청입니다.");
    } else {
      throw new Error("게시물 수정에 실패했습니다.");
    }
  }

  const body = await response.json();
  return body;
}

export async function deletePost(postId, password) {
  const data = JSON.stringify({ postPassword: password });
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "게시물 삭제에 실패했습니다.");
  }

  return true;
}

export async function getComment(postId, { page = 1, pageSize = 10 }) {
  const queryParams = `?page=${page}&pageSize=${pageSize}`;
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/comments${queryParams}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("존재하지 않는 게시물입니다.");
    }
    throw new Error("잘못된 요청입니다");
  }
  const body = await response.json();
  return body;
}

export const createComment = async (postId, commentData) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error("댓글 등록에 실패했습니다.");
  }

  return await response.json();
};

export async function updateComment(commentId, updatedData) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (response.status === 403) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  if (!response.ok) {
    throw new Error("댓글 수정에 실패했습니다.");
  }

  const body = await response.json();
  return body;
}

export async function deleteComment(commentId, password) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "댓글 삭제에 실패했습니다.");
  }
  return true;
}

export async function isPublic(groupId) {
  const response = await fetch(`${BASE_URL}/groups/${groupId}/is-public`);
  if (!response.ok) {
    throw new Error("그룹 공개 여부를 확인하는데 실패했습니다");
  }
  const body = await response.json();
  return body.isPublic;
}
