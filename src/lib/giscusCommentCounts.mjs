const REPOSITORY_OWNER = 'Decision-Management-Community';
const REPOSITORY_NAME = 'dm-community';
const GISCUS_CATEGORY_ID = 'DIC_kwDOTxocAM4DD6P8';
const CONTENT_PATHNAME = /^\/(news|resources\/articles)\/([^/]+)\/?$/;

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
              bodyText
              replies(first: 50) {
                totalCount
                nodes {
                  bodyText
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Returns Giscus discussion totals and text keyed by content entry id. During
 * local builds and pull-request checks no token is required, while Giscus data
 * is refreshed by the scheduled deployment.
 *
 * @typedef {{ count: number, searchText: string }} GiscusCommentData
 * @typedef {Record<string, GiscusCommentData>} GiscusCommentsByEntry
 */
async function getGiscusContentComments() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { news: {}, articles: {} };

  /** @type {{ news: GiscusCommentsByEntry, articles: GiscusCommentsByEntry }} */
  const commentsByCollection = { news: {}, articles: {} };
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
        console.warn('Unable to refresh Giscus comments.');
        return { news: {}, articles: {} };
      }

      for (const discussion of discussions.nodes) {
        const match = CONTENT_PATHNAME.exec(discussion.title);
        if (match) {
          const collection = match[1] === 'news' ? 'news' : 'articles';
          const replyCount = discussion.comments.nodes.reduce(
            (total, comment) => total + comment.replies.totalCount,
            0,
          );
          const searchText = discussion.comments.nodes
            .flatMap((comment) => [comment.bodyText, ...comment.replies.nodes.map((reply) => reply.bodyText)])
            .filter(Boolean)
            .join(' ');
          commentsByCollection[collection][match[2]] = {
            count: discussion.comments.totalCount + replyCount,
            searchText,
          };
        }
      }

      after = discussions.pageInfo.hasNextPage ? discussions.pageInfo.endCursor : null;
    } while (after);
  } catch {
    console.warn('Unable to refresh Giscus comments.');
    return { news: {}, articles: {} };
  }

  return commentsByCollection;
}

let commentsPromise;

function loadGiscusContentComments() {
  commentsPromise ??= getGiscusContentComments();
  return commentsPromise;
}

/** @returns {Promise<GiscusCommentsByEntry>} */
export async function getGiscusNewsComments() {
  return (await loadGiscusContentComments()).news;
}

/** @returns {Promise<GiscusCommentsByEntry>} */
export async function getGiscusArticleComments() {
  return (await loadGiscusContentComments()).articles;
}
