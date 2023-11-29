import React from "react";
import { Helmet } from "react-helmet";

type MetadataType = {
  title: string;
  description: string;
  url: string;
  // eslint-disable-next-line react/require-default-props
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
      <title> {title} - бесплатно смотреть аниме онлайн</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`${url}`} />
    </Helmet>
  );
}
