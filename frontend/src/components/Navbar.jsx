import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { Logout, authUser } = useAuthStore();
  return (
    <div className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg  bg-gray-500/50  flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold">Chat </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm bg-gray-500/50 gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4 " />
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm  bg-gray-500/50  gap-2 transition-colors`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={Logout}
                  className="btn btn-sm  bg-gray-500/50  gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
