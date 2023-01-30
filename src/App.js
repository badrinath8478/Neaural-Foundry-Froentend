import Login from "./Login";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Anchor, Button, Group, Text, UnstyledButton } from "@mantine/core"
import { useLocalStorage } from '@mantine/hooks';

import OtpInput from "./OtpVerify";
import "./styles.css";
import Signup from "./Signup";
import Home from "./Home";
import MovieSearch from "./MovieSearch";
import AddReview from "./AddReview";
export default function App() {
  const [user, setUser, removeUser] = useLocalStorage({ key: 'mruser', defaultValue: { isLoggedin: false, authToken: null, userid: null } });
  return (
    <div className="App">
      <Router>
        <Group position="apart">
          <Text size="md" weight="bold">MovieReviews</Text>
          {user.isLoggedin ? <Group><UnstyledButton><NavLink style={(isActive) => (isActive.isActive ? { textDecoration: "underline", color: "green" } : { color: "grey" })}
            to={"/"} >MyReviews</NavLink></UnstyledButton>
            <UnstyledButton><NavLink style={(isActive) => (isActive.isActive ? { textDecoration: "underline", color: "green" } : { color: "grey" })}
              to={"/addreview"}>add review</NavLink></UnstyledButton> </Group>
            : ""}
          <Group>
            {user.isLoggedin ? <Button onClick={() => {
              removeUser()
            }}><NavLink to={"/signup"} style={{ textDecoration: "none", color: "inherit" }} >Logout</NavLink></Button> : (<Group><Button><NavLink to={"/login"} style={{ textDecoration: "none", color: "inherit" }} >Login</NavLink></Button>
              <Button><NavLink to={"/signup"} style={{ textDecoration: "none", color: "inherit" }} >Signup</NavLink></Button></Group>
            )}
          </Group>
        </Group>

        <Routes>
          <Route path="/" element={user.isLoggedin ? <Home /> : <div>Please login or signup to continue</div>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />}>
          </Route>
          <Route path="verifyotp" element={<OtpInput />} />
          <Route path="/addreview" element={user.isLoggedin ? <MovieSearch /> : <div>Please login or signup to continue</div>}></Route>
          <Route path="/addMovie/:id" element={user.isLoggedin ? <AddReview /> : <div>Please login or signup to continue</div>} />

        </Routes>
      </Router></div >
  );
}
