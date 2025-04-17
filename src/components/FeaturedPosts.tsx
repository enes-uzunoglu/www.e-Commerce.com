import React from 'react';
import PostCard from './PostCard';

const FeaturedPosts: React.FC = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:px-36">
      <PostCard
        category="English Department"
        title="Graphic Design"
        description="We focus on ergonomics and meeting you where you work. It's only a keystroke away."
        date="22h"
        learnMoreLink="#"
        newPost={true}
        commentsCount={15}
        imageProps={{
          src: 'https://picsum.photos/400/600?random=11',
          alt: "Graphic Design Course 1",
          // width: 400, // Kaldırıldı
          // height: 600, // Kaldırıldı
        }}
      />
      <PostCard
        category="English Department"
        title="Graphic Design"
        description="We focus on ergonomics and meeting you where you work. It's only a keystroke away."
        date="22h"
        learnMoreLink="#"
        newPost={true}
        commentsCount={94}
        imageProps={{
          src: 'https://picsum.photos/400/600?random=12',
          alt: "Graphic Design Course 2",
          // width: 400, // Kaldırıldı
          // height: 600, // Kaldırıldı
        }}
      />
    </div>
  );
};

export default FeaturedPosts;