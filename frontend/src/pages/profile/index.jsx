import React from "react";
import { useGetMyArticles } from "../../hooks/useGetMyArticles";
import { useAuth } from "../../context/AuthContext.jsx";
import { Card } from "../../components/index.js";
import {
  StyledProfile,
  InfoSection,
  InfoContainer,
  StyleTitle,
  StyleText,
} from "./styled.js";
import SkeletonCard from "../../components/Skeleton/SkeletonCard.jsx";
const Profile = () => {
  const { user, loading: userLoading } = useAuth();
  const { myArticles, loading: myArticlesLoading, error } = useGetMyArticles();
  const myArticlesCount = myArticles.length;
  return (
    <StyledProfile>
      <InfoSection>
        <StyleTitle>Informations</StyleTitle>
        {userLoading ? (
          <p>Loading user...</p>
        ) : (
          <InfoContainer>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.createdAt && (
              <p>
                <strong>Member since:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </InfoContainer>
        )}
      </InfoSection>
      <StyleTitle>Mes publications</StyleTitle>
      {myArticlesLoading ? (
        <div style={{ display: "flex" }}>
          {[0, 1].map((i) => (
            <SkeletonCard key={i} keyIdx={i} />
          ))}
        </div>
      ) : (
        (() => {
          return (
            <>
              <Card
                articles={myArticles}
                loading={myArticlesLoading}
                error={error}
              />
            </>
          );
        })()
      )}
    </StyledProfile>
  );
};

export default Profile;
