import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2" style={{background:'#001529'}}>
      <Item
        style={{color:'whitesmoke'}}
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link  href="/">
          <a style={{color:'whitesmoke'}}>Home</a>
        </Link>
      </Item>

      {/* {user && user.role && user.role.includes("Instructor") ? (
        <Item
          style={{color:'whitesmoke'}}
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">
            <a style={{color:'whitesmoke'}} >Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
          style={{color:'whitesmoke'}}
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">
            <a style={{color:'whitesmoke'}}>Become Instructor</a>
          </Link>
        </Item>
      )} */}

      {user === null && (
        <>
          <Item
            className="ms-auto"
            style={{color:'whitesmoke'}}
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a style={{color:'whitesmoke'}}>Login</a>
            </Link>
          </Item>

          <Item
            className="ml-auto"
            style={{color:'whitesmoke'}}
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a style={{color:'whitesmoke'}}>Register</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
        style={{color:"whitesmoke"}}
          icon={<UserOutlined />}
          title={user && user.name}
          className="ms-auto"
        >
          <ItemGroup>
            <Item key="/user" style={{color:"whitesmoke"}}>
              <Link href="/user">
                <a style={{color:'black'}}>Dashboard</a>
              </Link>
            </Item>
            <Item onClick={logout}>Logout</Item>
          </ItemGroup>
        </SubMenu>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
          style={{color:'whitesmoke'}}
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className=""
        >
          <Link href="/instructor">
            <a style={{color:'whitesmoke'}}>Admin</a>
          </Link>
        </Item>
      )}
    </Menu>
  );
};

export default TopNav;
