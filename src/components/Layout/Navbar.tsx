import React, { useState } from "react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks";
import { Home, LogIn, LogOut, Wallet } from "lucide-react";
import { logout } from "@multiversx/sdk-dapp/utils";
import { ConnetionButtons } from "./ConnetionButtons";
import { Link } from "react-router-dom";
import { Button } from "../../libComponents/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../libComponents/Tooltip";

export const Navbar: React.FC = () => {
  const { address } = useGetAccountInfo();
  const isLoggedIn = Boolean(address);
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    <nav className="text-white text-xl">
      <div className="flex flex-row justify-around items-center h-32">
        <Link to={"/"} className="flex flex-row">
          <div className="flex flex-col font-mono">
            <span className="text-xl -mb-2">DEMO</span>
            <span className="text-3xl font-bold text-[hsl(200,100%,60%)]">ITH</span>
          </div>
          <span className="text-2xl font-semibold rotate-90 text-end -ml-6 text-[hsl(280,100%,60%)] font-mono">
            SDK
          </span>
        </Link>
        <div className="flex gap-5">
          <Link to="/">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent backdrop-blur border-0 shadow-inner shadow-white hover:shadow-slate-400">
              <Home />
            </Button>
          </Link>
          {isLoggedIn ? (
            <Link to="/wallet">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent backdrop-blur border-0 shadow-inner shadow-white hover:shadow-slate-400">
                <Wallet />
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        {!isLoggedIn ? (
          <div className="connect-wallet-container">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent backdrop-blur border-0 shadow-inner shadow-white hover:shadow-slate-400"
              onClick={() => setIsShown(!isShown)}>
              <LogIn />
            </Button>
            <ConnetionButtons isShown={isShown} />
          </div>
        ) : (
          <div className="flex flex-row">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent backdrop-blur border-0 shadow-inner shadow-white hover:shadow-slate-400"
                  onClick={() => logout("/")}>
                  <LogOut />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-transparent backdrop-blur text-white">
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </nav>
  );
};
