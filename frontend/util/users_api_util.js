export const fetchUser = (id) => (
  $.ajax({
    url: `api/users/${id}`,
    method: "GET"
  })
);

export const updateUser = (user) => {
  return $.ajax({
    url: `api/users/${user.id}`,
    method: "PATCH",
    data:{
      user
    }
  })
}
