const REPOSITORY_OWNER = 'Decision-Management-Community';
const REPOSITORY_NAME = 'dm-community';
const GISCUS_CATEGORY_ID = 'DIC_kwDOTxocAM4DD6P8';
const NEWS_PATHNAME = /^\/news\/([^/]+)\/?$/;

const DISCUSSIONS_QUERY = `
  query GiscusDiscussionCounts($owner: String!, $name: String!, $categoryId: ID!, $after: String) {
    repository(owner: $owner, name: $name) {
      discussions(first: 50, after: $after, categoryId: $categoryId) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          title
          comments(first: 100) {
            totalCount
            nodes {
              replies(first: 50) {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Returns Giscus discussion totals keyed by News entry id. During local builds
 * and pull-request checks no token is required: legacy-comment counts still
 * render, while live Giscus totals are refreshed by the scheduled deployment.
 *
 * @returns {Promise<Record<string, number>>}
 */
export async function getGiscusNewsCommentCounts() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return {};

  /** @type {Record<string, number>} */
  const counts = {};
  let after = null;

  try {
    do {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'dm-community-news-comment-counts',
        },
        body: JSON.stringify({
          query: DISCUSSIONS_QUERY,
          variables: {
            owner: REPOSITORY_OWNER,
            name: REPOSITORY_NAME,
            categoryId: GISCUS_CATEGORY_ID,
            after,
          },
        }),
      });

      const payload = await response.json();
      const discussions = payload.data?.repository?.discussions;
      if (!response.ok || payload.errors || !discussions) {
        console.warn('Unable to refresh Giscus comment totals; using archived totals only.');
        return {};
      }

      for (const discussion of discussions.nodes) {
        const match = NEWS_PATHNAME.exec(discussion.title);
        if (match) {
          const replyCount = discussion.comments.nodes.reduce(
            (total, comment) => total + comment.replies.totalCount,
            0,
          );
          counts[match[1]] = discussion.comments.totalCount + replyCount;
        }
      }

      after = discussions.pageInfo.hasNextPage ? discussions.pageInfo.endCursor : null;
    } while (after);
  } catch {
    console.warn('Unable to refresh Giscus comment totals; using archived totals only.');
    return {};
  }

  return counts;
}
