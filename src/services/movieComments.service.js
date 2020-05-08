import ApiService from "./api.service";
import { PER_PAGE_COMMENTS } from "../shared/const";

const commentsUrl = {
  getCurrentComments: "movies/$id/comments?page=%page&size=%size",
  createComment: "movies/$id/createComment",
};

const movieCommentsService = {
  getCurrentComments(id, page) {
    let url = commentsUrl.getCurrentComments
      .replace("$id", id)
      .replace("%page", page)
      .replace("%size", PER_PAGE_COMMENTS);
    return ApiService.get(url);
  },
  createNewComment(id, description) {
    let url = commentsUrl.createComment.replace("$id", id);

    return ApiService.post(url, {
      description: description,
    });
  },
};

export default movieCommentsService;
