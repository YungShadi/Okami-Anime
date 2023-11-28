import React from "react";
import { Helmet } from "react-helmet";

type MetadataType = {
  title: string;
  description: string;
  url: string;
  image?: string;
};
export default function Metadata({
  title,
  description,
  url,
  image,
}: MetadataType) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`${url}`} />
    </Helmet>
  );
}
