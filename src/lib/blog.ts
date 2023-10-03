import React from "react";

interface BlogMetadata {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
}

interface BlogContentProps {
  metadata: BlogMetadata;
}

interface BlogPost {
  metadata: BlogMetadata;
  content: React.FC<BlogContentProps>;
}

export function makeBlogPost(
  metadata: BlogMetadata,
  content: React.FC<BlogContentProps>
): BlogPost {
  return {
    metadata,
    content,
  };
}
