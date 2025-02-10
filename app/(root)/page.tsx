import TotalBalanceBox from "@/components/TotalBalanceBox";
import HeaderBox from "@/components/ui/HeaderBox";
import React from "react";
import RightSideBar from "@/components/RightSidebar";
import { LassoSelect } from "lucide-react";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const HOME = async () => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transaction efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
       <RightSideBar 
       user={loggedIn}
       transactions={[]}
       banks={[{currentBalance:1250.35},{ currentBalance:1900.15}]}
       />
    </section>
  );
};

export default HOME;
