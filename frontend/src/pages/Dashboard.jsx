import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  if (!userId) navigate("/signin");

  return (
    <div className="">
      <Header userName={userName} />
      <hr />
      <Balance />
      <Users />
    </div>
  );
}

export default Dashboard;

function Header({ userName }) {
  return (
    <div className="flex flex-row px-4 py-2 justify-between items-center">
      <h1 className="font-bold text-lg">Payment App</h1>
      <div className="flex flex-row gap-4">
        <p className="text-lg">Hello, {userName}</p>
        <button className="rounded-2xl bg-slate-300 h-7 w-7">U</button>
      </div>
    </div>
  );
}

function Balance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function getBalance() {
      try {
        const response = await axios.get("/api/v1/account/balance", {
          withCredentials: true,
        });

        console.log("Dashboard component. b alance response - ", response);

        setBalance(response.data.balance);
      } catch (error) {
        console.error(
          "Dashboard component. error fetching balance... full error - ",
          error
        );
      }
    }

    getBalance();
  }, []);

  return <div className="p-4">Your Balance: {balance}</div>;
}

function Users() {
  return (
    <div>
      <SearchUsers />
      <DisplayUsers />
    </div>
  );
}

function SearchUsers() {
  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        className="border border-1 border-slate-600 mx-4 p-1 pl-2 w-1/4 rounded-lg box-content"
      />
    </div>
  );
}

function DisplayUsers() {
  return (
    <ul className="list-none flex flex-col p-4 gap-2">
      {[0, 1, 2].map((i, index) => (
        <li key={index} className="flex flex-row justify-between">
          <p>UserName</p>
          <button className="text-slate-200 bg-slate-800 px-3 py-1 rounded-lg">
            Send Money
          </button>
        </li>
      ))}
    </ul>
  );
}
