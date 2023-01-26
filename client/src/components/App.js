import '../App.css';
import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { Route, useLocation } from "react-router-dom";
import SlideRoutes from "react-slide-routes"
import Login from "./Login";
import MyProjects from "./MyProjects"
import NavBar from "./NavBar"
import Browse from "./Browse"
import ProfilePage from "./ProfilePage"
import ProjectPage from "./ProjectPage";
import Loading from "./Loading";
function App() {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [activeUserFollowers, setActiveUserFollowers] = useState(0);
  const [activeUserFollowing, setActiveUserFollowing] = useState(0);
  const [followerCache, setFollowerCache] = useState([])
  const [followingCache, setFollowingCache] = useState([])
  const [userProjects, setUserProjects] = useState([]);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const res = await Promise.all([
          fetch("/me"),
          fetch("/projects"),
          fetch("/users"),
        ]);
        const [userRes, projectsRes, usersRes] = res;
        if (userRes.ok) {
          const user = await userRes.json();
          setUser(user);
          setUserProjects(user.projects)
          setFollowerCache(user.followers);
          setFollowingCache(user.followees);
          setActiveUserFollowers(user.followers.length);
          setActiveUserFollowing(user.followees.length);
          setUserProjects(user.projects)
        }
        if (projectsRes.ok) {
          const projects = await projectsRes.json();
          setAllProjects(projects);
        }
        if (usersRes.ok) {
          const users = await usersRes.json();
          setAllUsers(users);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if(!socket) {
  //     const newSocket = io("http://localhost:5001");
  //     console.log(newSocket);
  //     setSocket(newSocket);
  //   }
  // },[socket])

  // useEffect(() => {
  //   if(user && socket) {
  //     socket.emit("newUser", user.username)
  //     socket.on("test", (msg) => {
  //       console.log(msg)
  //     })
  //   }
  // }, [user, socket]);

  // console.log(user)
  // console.log(allUsers)
  // console.log(allProjects)
  console.log(userProjects)
  console.log(socket)
  const location = useLocation();


  if (isLoading) return <Loading />
  if (!user) return <Login
    onLogin={setUser}
    setFollowerCache={setFollowerCache}
    setFollowingCache={setFollowingCache}
    setActiveUserFollowers={setActiveUserFollowers}
    setActiveUserFollowing={setActiveUserFollowing}
    setUserProjects={setUserProjects}
  />;

  console.log(allProjects)
  return (
    <>
      <NavBar
        socket={socket}
        user={user}
        setUser={setUser}
        followerCache={followerCache}
        setFollowerCache={setFollowerCache}
        followingCache={followingCache}
        setFollowingCache={setFollowingCache}
        userProjects={userProjects}
        setUserProjects={setUserProjects}
        allProjects={allProjects}
        setAllProjects={setAllProjects} 
      />
      <SlideRoutes location={location} duration={400}>
        <Route path='/' element={<MyProjects projects={userProjects}  setUserProjects={setUserProjects}/>} exact />
        <Route path='/browse' element={<Browse currentUser={user} users={allUsers} />} />
        {allUsers.map((userr) => {
          return <Route key={userr.id}
            direction="up"
            path={`/profile/${userr.id}`}
            element={<ProfilePage
              userProjects={userProjects}
              socket={socket}
              activeFollowers={activeUserFollowers}
              activeFollowing={activeUserFollowing}
              setActiveFollowers={setActiveUserFollowers}
              setActiveFollowing={setActiveUserFollowing}
              followerCache={followerCache}
              followingCache={followingCache}
              setFollowerCache={setFollowerCache}
              setFollowingCache={setFollowingCache}
              currentUser={user}
              user={userr} />
            }
          />
        })}
        {allProjects.map((project) => {
          return <Route key={project.id}
            direction="up"
            path={`/projects/${project.id}`}
            element={<ProjectPage
              user={user}
              project={project}
            />
            }
          />
        })}
      </SlideRoutes>
    </>
  );
}

export default App;
