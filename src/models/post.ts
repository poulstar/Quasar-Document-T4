import { api } from 'src/boot/axios';
import { FetchResponse } from 'src/models/types';
import { AxiosResponse } from 'axios';

export class Post {
  public static serverRoute = 'https://openapi.poulstar.org/';

  static async myPosts(page: number, filter: string) {
    const response = await api.get<FetchResponse<Post>>(
      `api/my-posts?page=${page}&filter=${filter ?? ''}`
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('My Posts failed');
  }

  static async createPost(
    title: string,
    description: string,
    image: File,
    latitude: number,
    longitude: number
  ) {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    const response = await api.post<AxiosResponse>('api/create-post', data);
    if (response.status == 200) {
      return response;
    }
    throw Error('Created Failed');
  }

  static async updatePost(
    id: number,
    title: string,
    description: string,
    image: File,
    latitude: number,
    longitude: number
  ) {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    const response = await api.post<AxiosResponse>(
      `api/update-my-post/${id}`,
      data
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Updated Failed');
  }

  static async deletePost(id: number) {
    const response = await api.get<FetchResponse<Post>>(
      `api/delete-my-post/${id}`
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Deleted Failed');
  }

  static async allPostsForAdmin(page: number, filter: string) {
    const response = await api.get<FetchResponse<Post>>(
      `api/all-posts-for-admin?page=${page}&filter=${filter ?? ''}`
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('All Posts failed');
  }

  static async adminUpdatePost(
    id: number,
    title: string,
    description: string,
    image: File,
    latitude: number,
    longitude: number
  ) {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    const response = await api.post<AxiosResponse>(
      `api/update-post-by-admin/${id}`,
      data
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Update Failed');
  }

  static async adminDeletePost(id: number) {
    const response = await api.get<FetchResponse<Post>>(
      `api/delete-post-by-admin/${id}`
    );
    if (response.status == 200) {
      return response;
    }
    throw Error('Delete Failed');
  }

  static async allPostInDashboard(page: number, per_page: number) {
    const response = await api.get<FetchResponse<Post>>(
      `api/all-posts-for-dashboard?page=${page}&per_page=${per_page}`
    );
    if (response.status == 200) {
      const posts: any = [];
      const top_post: any = [];

      response.data.posts.data.forEach((post) => {
        posts.push({
          id: post.id,
          image: this.serverRoute + post.media[0].url,
          latitude: post.latitude,
          longitude: post.longitude,
          title: post.title,
          username: post.user.name,
          description: post.description,
          upVoteCount: post.up_vote_count,
        });
      });

      response.data.topPosts.forEach((post: any) => {
        top_post.push({
          id: post.id,
          image: this.serverRoute + post.media[0].url,
          title: post.title,
          description: post.description,
          latitude: post.latitude,
          longitude: post.longitude,
          username: post.user.name,
          email: post.user.email,
        });
      });

      return {
        posts: posts,
        page_data: {
          current_page: response.data.posts.current_page,
          last_page: response.data.posts.last_page,
        },
        top_post: top_post,
      };
    }
    throw Error('Request Failed');
  }

  static async likePost(id: number) {
    const response = await api.get<FetchResponse<Post>>(`api/posts/${id}/like`);
    if (response.status == 200) {
      return response;
    }
    throw Error('Deleted Failed');
  }

  static async postDetail(id: number) {
    const response = await api.get<FetchResponse<Post>>(`api/view-post/${id}`);
    if (response.status == 200) {
      const detail = {
        post_id: response.data.data.id,
        user_name: response.data.data.user.name,
        user_email: response.data.data.user.email,
        user_avatar: this.serverRoute + response.data.data.user.media[0].url,
        post_image: this.serverRoute + response.data.data.media[0].url,
        post_title: response.data.data.title,
        post_description: response.data.data.description,
        post_latitude: response.data.data.latitude,
        post_longitude: response.data.data.longitude,
        post_up_vote_count: response.data.data.up_vote_count,
        post_created_at: response.data.data.created_at,
        post_updated_at: response.data.data.updated_at,
      };
      return detail;
    }
    throw Error('Deleted Failed');
  }
}
