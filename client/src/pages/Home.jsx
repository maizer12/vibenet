import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { fetchAllPosts, fetchAllTags } from '../store/slices/postsSlice';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.postsSlice);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts.loading
            ? [...Array(5)].map((_, i) => <Post isLoading={true} key={i} />)
            : posts.data.map((e, i) => (
                <Post
                  id={e._id}
                  key={i}
                  title={e.title}
                  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                  user={e.user}
                  createdAt={'12 июня 2022 г.'}
                  viewsCount={e.viewsCount}
                  commentsCount={3}
                  tags={e.tags}
                  isEditable
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          {tags.loading ? <TagsBlock isLoading={true} /> : <TagsBlock items={tags.data} isLoading={false} />}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
