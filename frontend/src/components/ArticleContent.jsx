import React from "react";

export default function ArticleContent({
  content,
  asHtml = false,
  className,
  style,
}) {
  if (!content) return <em>Aucun contenu</em>;

  if (asHtml) {
    // caller must sanitize if content originates from users
    return (
      <div
        className={className}
        style={{ textAlign: "left", whiteSpace: "normal", ...style }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        textAlign: "left",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        ...style,
      }}
    >
      {content}
    </div>
  );
}
