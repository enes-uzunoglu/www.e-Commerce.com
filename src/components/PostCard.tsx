import React from 'react';
import Image, { ImageProps } from 'next/image';

interface PostCardProps {
  category?: string;
  trending?: boolean;
  newPost?: boolean;
  title: string;
  description: string;
  date: string;
  commentsCount?: number;
  learnMoreLink: string;
  imageProps?: Omit<ImageProps, 'layout'>; // 'layout' hariç tüm ImageProps'larını al
}

const PostCard: React.FC<PostCardProps> = ({
  category,
  trending = false,
  newPost = false,
  title,
  description,
  date,
  commentsCount,
  learnMoreLink,
  imageProps,
}) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <div className="relative w-full h-60 md:h-72">
        {imageProps && imageProps.src ? (
          <Image
            {...imageProps}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Görsel Yok</span>
          </div>
        )}
        {newPost && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
            NEW
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {category && <span className="text-blue-500 text-sm">{category}</span>}
          {trending && <span className="text-green-500 text-sm">Trending</span>}
          {newPost && <span className="text-red-500 text-sm">New</span>}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
          {commentsCount !== undefined && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>{commentsCount} comments</span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <a href={learnMoreLink} className="text-blue-600 font-semibold text-sm hover:underline">
            Learn More
            <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;