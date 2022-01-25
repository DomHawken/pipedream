import reddit from "../../reddit.app.mjs";
import get from "lodash/get.js";
import { axios } from "@pipedream/platform";

export default {
  type: "action",
  key: "reddit-list-subreddits-by-query",
  version: "0.0.1",
  name: "List Subreddits by Query",
  description: "List subreddits based on a search criteria. [See the docs here](https://www.reddit.com/dev/api/#GET_subreddits_search)",
  props: {
    reddit,
    subreddit: {
      propDefinition: [
        reddit,
        "subreddit",
      ],
      description: "Search subreddit titles, and select a subreddit if \"Structured Mode\" is enabled.",
    },
    limit: {
      propDefinition: [
        reddit,
        "limit",
      ],
    },
    before: {
      propDefinition: [
        reddit,
        "before",
      ],
    },
    after: {
      propDefinition: [
        reddit,
        "after",
      ],
    },
    count: {
      propDefinition: [
        reddit,
        "count",
      ],
    },
    sort: {
      propDefinition: [
        reddit,
        "sort",
      ],
    },
    srDetails: {
      propDefinition: [
        reddit,
        "includeSubredditDetails",
      ],
    },
  },
  async run({ $ }) {
    const params = {
      q: get(this.subreddit, "value", this.subreddit),
      limit: this.limit,
      sort: this.sort,
      sr_detail: this.srDetails,
      before: this.before,
      after: this.after,
      count: this.count,
    };

    const res = await axios($, this.reddit._getAxiosParams({
      method: "GET",
      path: "/subreddits/search",
      params,
    }));

    $.export("$summary", "Subreddits successfully fetched");
    return res;
  },
};
