import React from "react";
import styles from "./profile.module"
import { useAuth0 } from "../../react-auth0-wrapper";
import Loader from "../Loader"

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  );
};

export default Profile;
