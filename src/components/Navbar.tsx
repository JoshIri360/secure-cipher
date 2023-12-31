import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../@/components/ui/navigation-menu";
import React from "react";
import { Button } from "../../@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import Logo from "../assets/images/icon1.svg";

export default function Navbar() {
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (
    <div className="flex items-center">
      <NavigationMenu className="flex justify-between content-between max-w-none">
        <a href="#">
          <img src={Logo} alt="logo" className="w-16 h-16" />
        </a>
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center gap-4">
            {isLoggedin ? (
              <>
                <Link to={"/upload"}>
                  <NavigationMenuLink>Upload</NavigationMenuLink>
                </Link>
                <Link to={"/download"}>
                  <NavigationMenuLink>Download</NavigationMenuLink>
                </Link>
                <NavigationMenuLink>
                  <Button
                    className="hover:bg-primary hover:text-white"
                    variant="outline"
                    onClick={() => {
                      auth.signOut();
                      navigate("/");
                    }}>
                    Log Out
                  </Button>
                </NavigationMenuLink>
              </>
            ) : (
              <>
                <Link to={"/"}>
                  <NavigationMenuLink>Home</NavigationMenuLink>
                </Link>
                <NavigationMenuLink href="#how">About</NavigationMenuLink>
                <Link to={"/signup"}>
                  <NavigationMenuLink>
                    <Button
                      className="hover:bg-primary hover:text-white"
                      variant="outline">
                      Sign Up
                    </Button>
                  </NavigationMenuLink>
                </Link>
                <Link to={"/login"}>
                  <NavigationMenuLink>
                    <Button
                      className="hover:bg-primary hover:text-white"
                      variant="outline">
                      Log In
                    </Button>
                  </NavigationMenuLink>
                </Link>
              </>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
